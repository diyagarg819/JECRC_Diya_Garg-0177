using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Logging;

namespace HRMS.API.SignalR
{
    public class NotificationHub : Hub
    {
        private readonly ILogger<NotificationHub> _logger;

        public NotificationHub(ILogger<NotificationHub> logger)
        {
            _logger = logger;
        }

        public override async Task OnConnectedAsync()
        {
            var tenantHeader = Context.GetHttpContext()?.Request.Headers["X-Tenant-Id"].ToString();
            string groupName = string.IsNullOrEmpty(tenantHeader) ? "default" : tenantHeader;

            await Groups.AddToGroupAsync(Context.ConnectionId, groupName);
            _logger.LogInformation("Client {ConnectionId} connected and joined group {GroupName}", Context.ConnectionId, groupName);

            await base.OnConnectedAsync();
        }

        public override async Task OnDisconnectedAsync(Exception? exception)
        {
            _logger.LogInformation("Client {ConnectionId} disconnected.", Context.ConnectionId);
            await base.OnDisconnectedAsync(exception);
        }

        public async Task SendNotification(string tenantId, string title, string message)
        {
            await Clients.Group(tenantId).SendAsync("ReceiveNotification", title, message);
        }
    }
}
