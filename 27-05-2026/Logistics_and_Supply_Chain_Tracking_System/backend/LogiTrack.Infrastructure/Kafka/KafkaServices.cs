using Confluent.Kafka;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using System.Text.Json;
using LogiTrack.Application.DTOs;
using LogiTrack.Application.Interfaces;
using LogiTrack.Infrastructure.Hubs;
using Microsoft.AspNetCore.SignalR;

namespace LogiTrack.Infrastructure.Kafka;

public class KafkaProducerService
{
    private readonly IProducer<string, string> _producer;
    private readonly ILogger<KafkaProducerService> _logger;

    public KafkaProducerService(IConfiguration config, ILogger<KafkaProducerService> logger)
    {
        _logger = logger;
        var producerConfig = new ProducerConfig
        {
            BootstrapServers = config["Kafka:BootstrapServers"] ?? "localhost:9092"
        };
        _producer = new ProducerBuilder<string, string>(producerConfig).Build();
    }

    public async Task PublishVehicleTelemetryAsync(VehicleLocationUpdateDto dto)
    {
        var message = new Message<string, string>
        {
            Key = dto.VehicleId.ToString(),
            Value = JsonSerializer.Serialize(dto)
        };
        await _producer.ProduceAsync("vehicle-telemetry", message);
        _logger.LogDebug("Published telemetry for vehicle {VehicleId}", dto.VehicleId);
    }

    public async Task PublishShipmentEventAsync(string trackingNumber, string status, string location)
    {
        var payload = new { TrackingNumber = trackingNumber, Status = status, Location = location, Timestamp = DateTime.UtcNow };
        var message = new Message<string, string>
        {
            Key = trackingNumber,
            Value = JsonSerializer.Serialize(payload)
        };
        await _producer.ProduceAsync("shipment-events", message);
    }
}

public class VehicleTelemetryConsumer : BackgroundService
{
    private readonly IConsumer<string, string> _consumer;
    private readonly ILogger<VehicleTelemetryConsumer> _logger;
    private readonly IHubContext<TrackingHub> _hub;
    private readonly IVehicleService _vehicleService;

    public VehicleTelemetryConsumer(
        IConfiguration config,
        ILogger<VehicleTelemetryConsumer> logger,
        IHubContext<TrackingHub> hub,
        IVehicleService vehicleService)
    {
        _logger = logger;
        _hub = hub;
        _vehicleService = vehicleService;

        var consumerConfig = new ConsumerConfig
        {
            BootstrapServers = config["Kafka:BootstrapServers"] ?? "localhost:9092",
            GroupId = "logitrack-telemetry-group",
            AutoOffsetReset = AutoOffsetReset.Latest
        };
        _consumer = new ConsumerBuilder<string, string>(consumerConfig).Build();
    }

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        _consumer.Subscribe("vehicle-telemetry");
        _logger.LogInformation("Kafka telemetry consumer started");

        while (!stoppingToken.IsCancellationRequested)
        {
            try
            {
                var result = _consumer.Consume(TimeSpan.FromMilliseconds(500));
                if (result?.Message?.Value == null) continue;

                var dto = JsonSerializer.Deserialize<VehicleLocationUpdateDto>(result.Message.Value);
                if (dto == null) continue;

                await _vehicleService.ProcessTelemetryAsync(dto);

                var hubMessage = new VehicleLocationMessage(
                    dto.VehicleId.ToString(),
                    "Vehicle",
                    dto.Latitude,
                    dto.Longitude,
                    dto.Speed,
                    (double)dto.FuelLevel,
                    dto.EngineOn ? "Active" : "Idle",
                    DateTime.UtcNow);

                await _hub.Clients.Group("fleet").SendAsync("VehicleLocationUpdated", hubMessage, stoppingToken);
                await _hub.Clients.Group($"vehicle-{dto.VehicleId}").SendAsync("VehicleLocationUpdated", hubMessage, stoppingToken);
            }
            catch (OperationCanceledException) { break; }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error processing telemetry message");
                await Task.Delay(1000, stoppingToken);
            }
        }
        _consumer.Close();
    }
}
