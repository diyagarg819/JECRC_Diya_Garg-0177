namespace LogiTrack.Core.Entities;

public class Vehicle
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public string Name { get; set; } = string.Empty;
    public string LicensePlate { get; set; } = string.Empty;
    public string Type { get; set; } = string.Empty; // Truck, Van, SUV
    public string Make { get; set; } = string.Empty;
    public string Model { get; set; } = string.Empty;
    public int Year { get; set; }
    public VehicleStatus Status { get; set; } = VehicleStatus.Active;
    public double CurrentLatitude { get; set; }
    public double CurrentLongitude { get; set; }
    public double? CurrentSpeed { get; set; }
    public decimal FuelLevel { get; set; }
    public decimal MaxLoadCapacity { get; set; }
    public decimal CurrentLoad { get; set; }
    public DateTime? LastMaintenanceDate { get; set; }
    public DateTime? NextMaintenanceDate { get; set; }
    public string? IoTDeviceId { get; set; }
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

    public Guid? AssignedDriverId { get; set; }
    public Driver? AssignedDriver { get; set; }
    public ICollection<Shipment> Shipments { get; set; } = new List<Shipment>();
    public ICollection<VehicleTelemetry> Telemetry { get; set; } = new List<VehicleTelemetry>();
}

public class VehicleTelemetry
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public Guid VehicleId { get; set; }
    public Vehicle Vehicle { get; set; } = null!;
    public DateTime Timestamp { get; set; } = DateTime.UtcNow;
    public double Latitude { get; set; }
    public double Longitude { get; set; }
    public double Speed { get; set; }
    public double FuelLevel { get; set; }
    public double EngineTemp { get; set; }
    public bool EngineOn { get; set; }
    public string? AlertType { get; set; }
}

public class Driver
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public string FirstName { get; set; } = string.Empty;
    public string LastName { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string Phone { get; set; } = string.Empty;
    public string LicenseNumber { get; set; } = string.Empty;
    public DateTime LicenseExpiry { get; set; }
    public DriverStatus Status { get; set; } = DriverStatus.Available;
    public double Rating { get; set; } = 5.0;
    public int TotalDeliveries { get; set; }
    public string? PhotoUrl { get; set; }

    public Vehicle? Vehicle { get; set; }
    public ICollection<Shipment> Shipments { get; set; } = new List<Shipment>();
}

public class Route
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public string Name { get; set; } = string.Empty;
    public string Origin { get; set; } = string.Empty;
    public string Destination { get; set; } = string.Empty;
    public double OriginLat { get; set; }
    public double OriginLng { get; set; }
    public double DestinationLat { get; set; }
    public double DestinationLng { get; set; }
    public double DistanceKm { get; set; }
    public int EstimatedDurationMinutes { get; set; }
    public string? PolylineEncoded { get; set; }
    public decimal FuelCostEstimate { get; set; }
    public bool IsOptimized { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    public ICollection<Shipment> Shipments { get; set; } = new List<Shipment>();
    public ICollection<RouteWaypoint> Waypoints { get; set; } = new List<RouteWaypoint>();
}

public class RouteWaypoint
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public Guid RouteId { get; set; }
    public Route Route { get; set; } = null!;
    public int Order { get; set; }
    public string Name { get; set; } = string.Empty;
    public double Latitude { get; set; }
    public double Longitude { get; set; }
    public string? Notes { get; set; }
}

public class Warehouse
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public string Name { get; set; } = string.Empty;
    public string Address { get; set; } = string.Empty;
    public double Latitude { get; set; }
    public double Longitude { get; set; }
    public decimal TotalCapacity { get; set; }
    public decimal UsedCapacity { get; set; }
    public string ManagerName { get; set; } = string.Empty;
    public string Phone { get; set; } = string.Empty;
    public bool IsActive { get; set; } = true;

    public ICollection<InventoryItem> Inventory { get; set; } = new List<InventoryItem>();
}

public class InventoryItem
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public Guid WarehouseId { get; set; }
    public Warehouse Warehouse { get; set; } = null!;
    public string SKU { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public string Category { get; set; } = string.Empty;
    public int Quantity { get; set; }
    public int MinStockLevel { get; set; }
    public string? BarcodeData { get; set; }
    public decimal UnitWeight { get; set; }
    public string Location { get; set; } = string.Empty; // Aisle-Shelf
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
}

public class Customer
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public string Name { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string Phone { get; set; } = string.Empty;
    public string Address { get; set; } = string.Empty;
    public string City { get; set; } = string.Empty;
    public string Country { get; set; } = string.Empty;
    public bool IsActive { get; set; } = true;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    public ICollection<Shipment> Shipments { get; set; } = new List<Shipment>();
}
