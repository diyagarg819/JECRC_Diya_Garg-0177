namespace LogiTrack.Application.DTOs;

// ── Shipment DTOs ──────────────────────────────────────────────
public class ShipmentDto
{
    public Guid Id { get; set; }
    public string TrackingNumber { get; set; } = string.Empty;
    public string Origin { get; set; } = string.Empty;
    public string Destination { get; set; } = string.Empty;
    public DateTime CreatedAt { get; set; }
    public DateTime? EstimatedDelivery { get; set; }
    public DateTime? ActualDelivery { get; set; }
    public string Status { get; set; } = string.Empty;
    public string ShippingMethod { get; set; } = string.Empty;
    public decimal Weight { get; set; }
    public string? CustomerName { get; set; }
    public string? DriverName { get; set; }
    public string? VehicleName { get; set; }
    public List<TrackingEventDto> TrackingEvents { get; set; } = new();
}

public class CreateShipmentDto
{
    public string Origin { get; set; } = string.Empty;
    public string Destination { get; set; } = string.Empty;
    public DateTime? EstimatedDelivery { get; set; }
    public string ShippingMethod { get; set; } = "Standard";
    public decimal Weight { get; set; }
    public Guid CustomerId { get; set; }
    public Guid? VehicleId { get; set; }
    public Guid? DriverId { get; set; }
    public List<CreateShipmentItemDto> Items { get; set; } = new();
}

public class CreateShipmentItemDto
{
    public string Name { get; set; } = string.Empty;
    public int Quantity { get; set; }
    public decimal Weight { get; set; }
    public string? Barcode { get; set; }
}

public class TrackingEventDto
{
    public Guid Id { get; set; }
    public DateTime Timestamp { get; set; }
    public double Latitude { get; set; }
    public double Longitude { get; set; }
    public string Location { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string Status { get; set; } = string.Empty;
}

// ── Vehicle DTOs ───────────────────────────────────────────────
public class VehicleDto
{
    public Guid Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string LicensePlate { get; set; } = string.Empty;
    public string Type { get; set; } = string.Empty;
    public string Make { get; set; } = string.Empty;
    public string Model { get; set; } = string.Empty;
    public int Year { get; set; }
    public string Status { get; set; } = string.Empty;
    public double CurrentLatitude { get; set; }
    public double CurrentLongitude { get; set; }
    public double? CurrentSpeed { get; set; }
    public decimal FuelLevel { get; set; }
    public decimal MaxLoadCapacity { get; set; }
    public decimal CurrentLoad { get; set; }
    public string? AssignedDriverName { get; set; }
    public DateTime? NextMaintenanceDate { get; set; }
    public DateTime UpdatedAt { get; set; }
}

public class CreateVehicleDto
{
    public string Name { get; set; } = string.Empty;
    public string LicensePlate { get; set; } = string.Empty;
    public string Type { get; set; } = string.Empty;
    public string Make { get; set; } = string.Empty;
    public string Model { get; set; } = string.Empty;
    public int Year { get; set; }
    public decimal MaxLoadCapacity { get; set; }
    public string? IoTDeviceId { get; set; }
}

public class VehicleLocationUpdateDto
{
    public Guid VehicleId { get; set; }
    public double Latitude { get; set; }
    public double Longitude { get; set; }
    public double? Speed { get; set; }
    public double FuelLevel { get; set; }
    public bool EngineOn { get; set; }
}

// ── Driver DTOs ────────────────────────────────────────────────
public class DriverDto
{
    public Guid Id { get; set; }
    public string FirstName { get; set; } = string.Empty;
    public string LastName { get; set; } = string.Empty;
    public string FullName => $"{FirstName} {LastName}";
    public string Email { get; set; } = string.Empty;
    public string Phone { get; set; } = string.Empty;
    public string LicenseNumber { get; set; } = string.Empty;
    public DateTime LicenseExpiry { get; set; }
    public string Status { get; set; } = string.Empty;
    public double Rating { get; set; }
    public int TotalDeliveries { get; set; }
    public string? PhotoUrl { get; set; }
    public string? AssignedVehicle { get; set; }
}

public class CreateDriverDto
{
    public string FirstName { get; set; } = string.Empty;
    public string LastName { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string Phone { get; set; } = string.Empty;
    public string LicenseNumber { get; set; } = string.Empty;
    public DateTime LicenseExpiry { get; set; }
}

// ── Warehouse DTOs ─────────────────────────────────────────────
public class WarehouseDto
{
    public Guid Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Address { get; set; } = string.Empty;
    public double Latitude { get; set; }
    public double Longitude { get; set; }
    public decimal TotalCapacity { get; set; }
    public decimal UsedCapacity { get; set; }
    public decimal CapacityPercentage => TotalCapacity > 0 ? (UsedCapacity / TotalCapacity) * 100 : 0;
    public string ManagerName { get; set; } = string.Empty;
    public bool IsActive { get; set; }
}

public class InventoryItemDto
{
    public Guid Id { get; set; }
    public string SKU { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public string Category { get; set; } = string.Empty;
    public int Quantity { get; set; }
    public int MinStockLevel { get; set; }
    public bool IsLowStock => Quantity <= MinStockLevel;
    public string Location { get; set; } = string.Empty;
    public string WarehouseName { get; set; } = string.Empty;
}

// ── Route DTOs ─────────────────────────────────────────────────
public class RouteDto
{
    public Guid Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Origin { get; set; } = string.Empty;
    public string Destination { get; set; } = string.Empty;
    public double OriginLat { get; set; }
    public double OriginLng { get; set; }
    public double DestinationLat { get; set; }
    public double DestinationLng { get; set; }
    public double DistanceKm { get; set; }
    public int EstimatedDurationMinutes { get; set; }
    public decimal FuelCostEstimate { get; set; }
    public bool IsOptimized { get; set; }
    public List<WaypointDto> Waypoints { get; set; } = new();
}

public class WaypointDto
{
    public int Order { get; set; }
    public string Name { get; set; } = string.Empty;
    public double Latitude { get; set; }
    public double Longitude { get; set; }
}

public class OptimizeRouteRequestDto
{
    public string Origin { get; set; } = string.Empty;
    public string Destination { get; set; } = string.Empty;
    public List<WaypointDto> Waypoints { get; set; } = new();
    public bool AvoidTolls { get; set; }
    public bool AvoidHighways { get; set; }
}

// ── Analytics DTOs ─────────────────────────────────────────────
public class DashboardSummaryDto
{
    public int TotalOrders { get; set; }
    public int PickupReady { get; set; }
    public int InTransit { get; set; }
    public int Delivered { get; set; }
    public int TotalVehicles { get; set; }
    public int ActiveVehicles { get; set; }
    public int InMaintenanceVehicles { get; set; }
    public int AvailableDrivers { get; set; }
    public decimal TotalRevenue { get; set; }
    public List<ChartDataPoint> OrderTrend { get; set; } = new();
    public List<ShipmentMethodBreakdown> ShippingMethods { get; set; } = new();
    public List<RecentDeliveryDto> RecentDeliveries { get; set; } = new();
}

public class ChartDataPoint
{
    public string Label { get; set; } = string.Empty;
    public double Value { get; set; }
}

public class ShipmentMethodBreakdown
{
    public string Method { get; set; } = string.Empty;
    public int Count { get; set; }
    public double Percentage { get; set; }
}

public class RecentDeliveryDto
{
    public string TrackingNumber { get; set; } = string.Empty;
    public string CustomerName { get; set; } = string.Empty;
    public string Destination { get; set; } = string.Empty;
    public DateTime DeliveredAt { get; set; }
}

// ── Customer DTOs ──────────────────────────────────────────────
public class CustomerDto
{
    public Guid Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string Phone { get; set; } = string.Empty;
    public string Address { get; set; } = string.Empty;
    public string City { get; set; } = string.Empty;
    public string Country { get; set; } = string.Empty;
    public int TotalShipments { get; set; }
}

public class PagedResult<T>
{
    public IEnumerable<T> Items { get; set; } = Enumerable.Empty<T>();
    public int TotalCount { get; set; }
    public int Page { get; set; }
    public int PageSize { get; set; }
    public int TotalPages => (int)Math.Ceiling((double)TotalCount / PageSize);
}
