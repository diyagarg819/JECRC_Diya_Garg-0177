namespace LogiTrack.Core.Enums;

public enum ShipmentStatus
{
    Pending = 0,
    PickupReady = 1,
    PickedUp = 2,
    InTransit = 3,
    OutForDelivery = 4,
    Delivered = 5,
    Failed = 6,
    Cancelled = 7,
    Returned = 8
}

public enum VehicleStatus
{
    Active = 0,
    InService = 1,
    NeedRepair = 2,
    Idle = 3,
    InMaintenance = 4,
    Retired = 5
}

public enum DriverStatus
{
    Available = 0,
    OnRoute = 1,
    OnBreak = 2,
    OffDuty = 3,
    Unavailable = 4
}
