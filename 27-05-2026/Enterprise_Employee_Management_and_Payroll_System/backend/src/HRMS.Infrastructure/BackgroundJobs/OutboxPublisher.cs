using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using HRMS.Core.Entities;
using HRMS.Infrastructure.Data;

namespace HRMS.Infrastructure.BackgroundJobs
{
    public class OutboxPublisher : BackgroundService
    {
        private readonly IServiceProvider _serviceProvider;
        private readonly ILogger<OutboxPublisher> _logger;

        public OutboxPublisher(IServiceProvider serviceProvider, ILogger<OutboxPublisher> logger)
        {
            _serviceProvider = serviceProvider;
            _logger = logger;
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            _logger.LogInformation("Outbox Publisher Service is starting.");

            while (!stoppingToken.IsCancellationRequested)
            {
                try
                {
                    await ProcessOutboxMessagesAsync(stoppingToken);
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, "Error occurred while processing outbox messages.");
                }

                await Task.Delay(TimeSpan.FromSeconds(5), stoppingToken);
            }

            _logger.LogInformation("Outbox Publisher Service is stopping.");
        }

        private async Task ProcessOutboxMessagesAsync(CancellationToken stoppingToken)
        {
            using var scope = _serviceProvider.CreateScope();
            var dbContext = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();

            // Bypass global query filters to see messages for ALL tenants
            var messages = await dbContext.OutboxMessages
                .IgnoreQueryFilters()
                .Where(m => m.ProcessedAt == null)
                .OrderBy(m => m.CreatedAt)
                .Take(20)
                .ToListAsync(stoppingToken);

            if (messages.Count == 0) return;

            _logger.LogInformation("Found {Count} unprocessed outbox messages.", messages.Count);

            foreach (var message in messages)
            {
                try
                {
                    _logger.LogInformation("Publishing event {EventType} for Tenant {TenantId} (Message ID: {MessageId}). Payload: {Payload}", 
                        message.EventType, message.TenantId, message.Id, message.Payload);

                    // Here we would use MassTransit / RabbitMQ to publish the message:
                    // await _publishEndpoint.Publish(deserializedPayload);
                    // For this enterprise starter, we simulate a reliable publish.

                    message.ProcessedAt = DateTimeOffset.UtcNow;
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, "Failed to process outbox message {MessageId}.", message.Id);
                    message.Error = ex.ToString();
                }
            }

            await dbContext.SaveChangesAsync(stoppingToken);
        }
    }
}
