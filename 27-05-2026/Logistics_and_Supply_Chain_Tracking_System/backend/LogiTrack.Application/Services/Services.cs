using AutoMapper;
using LogiTrack.Application.DTOs;
using LogiTrack.Application.Interfaces;
using LogiTrack.Core.Entities;
using LogiTrack.Core.Interfaces;

namespace LogiTrack.Application.Services;

public class ShipmentService : IShipmentService
{
    private readonly IUnitOfWork _uow;
    private readonly IMapper _mapper;

    public ShipmentService(IUnitOfWork uow, IMapper mapper)
    {
        _uow = uow;
        _mapper = mapper;
    }

    public async Task<PagedResult<ShipmentDto>> GetShipmentsAsync(int page, int pageSize, string? status = null)
    {
        var shipments = await _uow.Shipments.GetShipmentsWithDetailsAsync(page, pageSize);
        var total = await _uow.Shipments.GetTotalCountAsync();
        return new PagedResult<ShipmentDto>
        {
            Items = _mapper.Map<IEnumerable<ShipmentDto>>(shipments),
            TotalCount = total,
            Page = page,
            PageSize = pageSize
        };
    }

    public async Task<ShipmentDto?> GetShipmentByIdAsync(Guid id)
    {
        var shipment = await _uow.Shipments.GetByIdAsync(id);
        return shipment == null ? null : _mapper.Map<ShipmentDto>(shipment);
    }

    public async Task<ShipmentDto?> TrackShipmentAsync(string trackingNumber)
    {
        var shipment = await _uow.Shipments.GetByTrackingNumberAsync(trackingNumber);
        return shipment == null ? null : _mapper.Map<ShipmentDto>(shipment);
    }

    public async Task<ShipmentDto> CreateShipmentAsync(CreateShipmentDto dto)
    {
        var shipment = _mapper.Map<Shipment>(dto);
        shipment.TrackingNumber = GenerateTrackingNumber();
        shipment.TrackingEvents.Add(new TrackingEvent
        {
            Description = "Shipment created",
            Status = Core.Enums.ShipmentStatus.Pending,
            Location = dto.Origin
        });
        await _uow.Shipments.AddAsync(shipment);
        await _uow.SaveChangesAsync();
        return _mapper.Map<ShipmentDto>(shipment);
    }

    public async Task<ShipmentDto> UpdateShipmentStatusAsync(Guid id, string status)
    {
        var shipment = await _uow.Shipments.GetByIdAsync(id)
            ?? throw new KeyNotFoundException($"Shipment {id} not found");
        if (Enum.TryParse<Core.Enums.ShipmentStatus>(status, true, out var parsed))
            shipment.Status = parsed;
        shipment.TrackingEvents.Add(new TrackingEvent
        {
            Description = $"Status updated to {status}",
            Status = parsed,
            Location = shipment.Destination
        });
        await _uow.Shipments.UpdateAsync(shipment);
        await _uow.SaveChangesAsync();
        return _mapper.Map<ShipmentDto>(shipment);
    }

    public async Task AssignDriverAndVehicleAsync(Guid shipmentId, Guid driverId, Guid vehicleId)
    {
        var shipment = await _uow.Shipments.GetByIdAsync(shipmentId)
            ?? throw new KeyNotFoundException($"Shipment {shipmentId} not found");
        shipment.DriverId = driverId;
        shipment.VehicleId = vehicleId;
        await _uow.Shipments.UpdateAsync(shipment);
        await _uow.SaveChangesAsync();
    }

    public async Task<bool> DeleteShipmentAsync(Guid id)
    {
        await _uow.Shipments.DeleteAsync(id);
        await _uow.SaveChangesAsync();
        return true;
    }

    private static string GenerateTrackingNumber() =>
        $"LT{DateTime.UtcNow:yyyyMMdd}{Random.Shared.Next(10000, 99999)}";
}

public class VehicleService : IVehicleService
{
    private readonly IUnitOfWork _uow;
    private readonly IMapper _mapper;

    public VehicleService(IUnitOfWork uow, IMapper mapper)
    {
        _uow = uow;
        _mapper = mapper;
    }

    public async Task<IEnumerable<VehicleDto>> GetAllVehiclesAsync()
    {
        var vehicles = await _uow.Vehicles.GetAllAsync();
        return _mapper.Map<IEnumerable<VehicleDto>>(vehicles);
    }

    public async Task<VehicleDto?> GetVehicleByIdAsync(Guid id)
    {
        var v = await _uow.Vehicles.GetByIdAsync(id);
        return v == null ? null : _mapper.Map<VehicleDto>(v);
    }

    public async Task<VehicleDto> CreateVehicleAsync(CreateVehicleDto dto)
    {
        var vehicle = _mapper.Map<Vehicle>(dto);
        await _uow.Vehicles.AddAsync(vehicle);
        await _uow.SaveChangesAsync();
        return _mapper.Map<VehicleDto>(vehicle);
    }

    public async Task<VehicleDto> UpdateVehicleAsync(Guid id, CreateVehicleDto dto)
    {
        var vehicle = await _uow.Vehicles.GetByIdAsync(id)
            ?? throw new KeyNotFoundException($"Vehicle {id} not found");
        _mapper.Map(dto, vehicle);
        await _uow.Vehicles.UpdateAsync(vehicle);
        await _uow.SaveChangesAsync();
        return _mapper.Map<VehicleDto>(vehicle);
    }

    public async Task ProcessTelemetryAsync(VehicleLocationUpdateDto dto)
    {
        await _uow.Vehicles.UpdateLocationAsync(dto.VehicleId, dto.Latitude, dto.Longitude, dto.Speed);
        await _uow.SaveChangesAsync();
    }

    public async Task<Dictionary<string, int>> GetFleetStatusSummaryAsync() =>
        await _uow.Vehicles.GetFleetStatusSummaryAsync();

    public async Task<bool> DeleteVehicleAsync(Guid id)
    {
        await _uow.Vehicles.DeleteAsync(id);
        await _uow.SaveChangesAsync();
        return true;
    }
}

public class AnalyticsService : IAnalyticsService
{
    private readonly IUnitOfWork _uow;

    public AnalyticsService(IUnitOfWork uow) => _uow = uow;

    public async Task<DashboardSummaryDto> GetDashboardSummaryAsync()
    {
        var statusCounts = await _uow.Shipments.GetShipmentsByStatusCountAsync();
        var fleetStatus = await _uow.Vehicles.GetFleetStatusSummaryAsync();

        return new DashboardSummaryDto
        {
            TotalOrders = statusCounts.Values.Sum(),
            PickupReady = statusCounts.GetValueOrDefault("PickupReady"),
            InTransit = statusCounts.GetValueOrDefault("InTransit"),
            Delivered = statusCounts.GetValueOrDefault("Delivered"),
            TotalVehicles = fleetStatus.Values.Sum(),
            ActiveVehicles = fleetStatus.GetValueOrDefault("Active"),
            InMaintenanceVehicles = fleetStatus.GetValueOrDefault("InMaintenance"),
            OrderTrend = GenerateMockTrend(30),
            ShippingMethods = new List<ShipmentMethodBreakdown>
            {
                new() { Method = "Standard", Count = 380, Percentage = 76 },
                new() { Method = "Fast", Count = 410, Percentage = 82 },
                new() { Method = "Express", Count = 340, Percentage = 68 },
            }
        };
    }

    public Task<IEnumerable<ChartDataPoint>> GetDeliveryTrendAsync(int days) =>
        Task.FromResult((IEnumerable<ChartDataPoint>)GenerateMockTrend(days));

    public Task<IEnumerable<ChartDataPoint>> GetFuelConsumptionTrendAsync(int days) =>
        Task.FromResult((IEnumerable<ChartDataPoint>)GenerateMockTrend(days, 200, 400));

    public Task<IEnumerable<ChartDataPoint>> GetRevenueByMonthAsync(int months) =>
        Task.FromResult((IEnumerable<ChartDataPoint>)GenerateMockTrend(months, 50000, 150000));

    private static List<ChartDataPoint> GenerateMockTrend(int count, double min = 100, double max = 500)
    {
        var rng = Random.Shared;
        return Enumerable.Range(1, count)
            .Select(i => new ChartDataPoint { Label = i.ToString(), Value = rng.Next((int)min, (int)max) })
            .ToList();
    }
}
