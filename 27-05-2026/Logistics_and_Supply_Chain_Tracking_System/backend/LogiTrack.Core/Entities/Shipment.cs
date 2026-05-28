namespace LogiTrack.Core.Entities;

public class Shipment
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public string TrackingNumber { get; set; } = string.Empty;
    public string Origin { get; set; } = string.Empty;
    public string Destination { get; set; } = string.Empty;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime? EstimatedDelivery { get; set; }
    public DateTime? ActualDelivery { get; set; }
    public ShipmentStatus Status { get; set; } = ShipmentStatus.Pending;
    public string ShippingMethod { get; set; } = "Standard";
    public decimal Weight { get; set; }
    public decimal Volume { get; set; }
    public string? Notes { get; set; }

    // Foreign keys
    public Guid CustomerId { get; set; }
    public Customer Customer { get; set; } = null!;
    public Guid? VehicleId { get; set; }
    public Vehicle? Vehicle { get; set; }
    public Guid? DriverId { get; set; }
    public Driver? Driver { get; set; }
    public Guid? RouteId { get; set; }
    public Route? Route { get; set; }

    public ICollection<ShipmentItem> Items { get; set; } = new List<ShipmentItem>();
    public ICollection<TrackingEvent> TrackingEvents { get; set; } = new List<TrackingEvent>();
}

public class ShipmentItem
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public Guid ShipmentId { get; set; }
    public Shipment Shipment { get; set; } = null!;
    public string Name { get; set; } = string.Empty;
    public int Quantity { get; set; }
    public decimal Weight { get; set; }
    public string? Barcode { get; set; }
    public Guid? WarehouseId { get; set; }
    public Warehouse? Warehouse { get; set; }
}

public class TrackingEvent
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public Guid ShipmentId { get; set; }
    public Shipment Shipment { get; set; } = null!;
    public DateTime Timestamp { get; set; } = DateTime.UtcNow;
    public double Latitude { get; set; }
    public double Longitude { get; set; }
    public string Location { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public ShipmentStatus Status { get; set; }
}
