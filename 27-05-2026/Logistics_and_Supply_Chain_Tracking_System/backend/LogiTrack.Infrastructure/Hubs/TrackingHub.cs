using Microsoft.AspNetCore.SignalR;

namespace LogiTrack.Infrastructure.Hubs;

public class TrackingHub : Hub
{
    public async Task JoinShipmentGroup(string trackingNumber) =>
        await Groups.AddToGroupAsync(Context.ConnectionId, $"shipment-{trackingNumber}");

    public async Task LeaveShipmentGroup(string trackingNumber) =>
        await Groups.RemoveFromGroupAsync(Context.ConnectionId, $"shipment-{trackingNumber}");

    public async Task JoinVehicleGroup(string vehicleId) =>
        await Groups.AddToGroupAsync(Context.ConnectionId, $"vehicle-{vehicleId}");

    public async Task JoinFleetRoom() =>
        await Groups.AddToGroupAsync(Context.ConnectionId, "fleet");
}

public interface ITrackingHubClient
{
    Task VehicleLocationUpdated(VehicleLocationMessage message);
    Task ShipmentStatusUpdated(ShipmentStatusMessage message);
    Task FleetAlertReceived(FleetAlertMessage message);
}

public record VehicleLocationMessage(
    string VehicleId,
    string VehicleName,
    double Latitude,
    double Longitude,
    double? Speed,
    double FuelLevel,
    string Status,
    DateTime Timestamp);

public record ShipmentStatusMessage(
    string ShipmentId,
    string TrackingNumber,
    string Status,
    string Location,
    string Description,
    DateTime Timestamp);

public record FleetAlertMessage(
    string VehicleId,
    string AlertType,
    string Message,
    DateTime Timestamp);
