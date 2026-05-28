using LogiTrack.Application.DTOs;
using LogiTrack.Application.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace LogiTrack.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ShipmentsController : ControllerBase
{
    private readonly IShipmentService _svc;
    public ShipmentsController(IShipmentService svc) => _svc = svc;

    [HttpGet]
    public async Task<IActionResult> GetAll([FromQuery] int page = 1, [FromQuery] int pageSize = 20, [FromQuery] string? status = null)
        => Ok(await _svc.GetShipmentsAsync(page, pageSize, status));

    [HttpGet("{id:guid}")]
    public async Task<IActionResult> GetById(Guid id)
    {
        var result = await _svc.GetShipmentByIdAsync(id);
        return result == null ? NotFound() : Ok(result);
    }

    [HttpGet("track/{trackingNumber}")]
    public async Task<IActionResult> Track(string trackingNumber)
    {
        var result = await _svc.TrackShipmentAsync(trackingNumber);
        return result == null ? NotFound(new { message = $"Tracking number {trackingNumber} not found" }) : Ok(result);
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateShipmentDto dto)
    {
        var result = await _svc.CreateShipmentAsync(dto);
        return CreatedAtAction(nameof(GetById), new { id = result.Id }, result);
    }

    [HttpPatch("{id:guid}/status")]
    public async Task<IActionResult> UpdateStatus(Guid id, [FromBody] UpdateStatusRequest req)
        => Ok(await _svc.UpdateShipmentStatusAsync(id, req.Status));

    [HttpPost("{id:guid}/assign")]
    public async Task<IActionResult> Assign(Guid id, [FromBody] AssignRequest req)
    {
        await _svc.AssignDriverAndVehicleAsync(id, req.DriverId, req.VehicleId);
        return NoContent();
    }

    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> Delete(Guid id)
    {
        await _svc.DeleteShipmentAsync(id);
        return NoContent();
    }
}

public record UpdateStatusRequest(string Status);
public record AssignRequest(Guid DriverId, Guid VehicleId);

[ApiController]
[Route("api/[controller]")]
public class VehiclesController : ControllerBase
{
    private readonly IVehicleService _svc;
    public VehiclesController(IVehicleService svc) => _svc = svc;

    [HttpGet]
    public async Task<IActionResult> GetAll() => Ok(await _svc.GetAllVehiclesAsync());

    [HttpGet("{id:guid}")]
    public async Task<IActionResult> GetById(Guid id)
    {
        var result = await _svc.GetVehicleByIdAsync(id);
        return result == null ? NotFound() : Ok(result);
    }

    [HttpGet("fleet-summary")]
    public async Task<IActionResult> FleetSummary() => Ok(await _svc.GetFleetStatusSummaryAsync());

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateVehicleDto dto)
    {
        var result = await _svc.CreateVehicleAsync(dto);
        return CreatedAtAction(nameof(GetById), new { id = result.Id }, result);
    }

    [HttpPut("{id:guid}")]
    public async Task<IActionResult> Update(Guid id, [FromBody] CreateVehicleDto dto)
        => Ok(await _svc.UpdateVehicleAsync(id, dto));

    [HttpPost("telemetry")]
    public async Task<IActionResult> Telemetry([FromBody] VehicleLocationUpdateDto dto)
    {
        await _svc.ProcessTelemetryAsync(dto);
        return NoContent();
    }

    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> Delete(Guid id)
    {
        await _svc.DeleteVehicleAsync(id);
        return NoContent();
    }
}

[ApiController]
[Route("api/[controller]")]
public class AnalyticsController : ControllerBase
{
    private readonly IAnalyticsService _svc;
    public AnalyticsController(IAnalyticsService svc) => _svc = svc;

    [HttpGet("dashboard")]
    public async Task<IActionResult> Dashboard() => Ok(await _svc.GetDashboardSummaryAsync());

    [HttpGet("delivery-trend")]
    public async Task<IActionResult> DeliveryTrend([FromQuery] int days = 30)
        => Ok(await _svc.GetDeliveryTrendAsync(days));

    [HttpGet("fuel-trend")]
    public async Task<IActionResult> FuelTrend([FromQuery] int days = 30)
        => Ok(await _svc.GetFuelConsumptionTrendAsync(days));

    [HttpGet("revenue")]
    public async Task<IActionResult> Revenue([FromQuery] int months = 12)
        => Ok(await _svc.GetRevenueByMonthAsync(months));
}

[ApiController]
[Route("api/[controller]")]
public class DriversController : ControllerBase
{
    [HttpGet]
    public IActionResult GetAll() => Ok(new[] {
        new { Id = Guid.NewGuid(), FirstName = "Jimmy", LastName = "Dente", Status = "OnRoute", Rating = 4.8, TotalDeliveries = 342 },
        new { Id = Guid.NewGuid(), FirstName = "Maria", LastName = "Santos", Status = "Available", Rating = 4.9, TotalDeliveries = 512 }
    });
}

[ApiController]
[Route("api/[controller]")]
public class WarehousesController : ControllerBase
{
    [HttpGet]
    public IActionResult GetAll() => Ok(new[] {
        new { Id = Guid.NewGuid(), Name = "Central Warehouse NYC", Address = "789 Dock Rd, New York", TotalCapacity = 10000, UsedCapacity = 6500 }
    });

    [HttpGet("{id:guid}/inventory")]
    public IActionResult GetInventory(Guid id) => Ok(Array.Empty<object>());
}

[ApiController]
[Route("api/[controller]")]
public class RoutesController : ControllerBase
{
    [HttpGet]
    public IActionResult GetAll() => Ok(Array.Empty<object>());

    [HttpPost("optimize")]
    public IActionResult Optimize([FromBody] OptimizeRouteRequestDto dto)
        => Ok(new RouteDto
        {
            Id = Guid.NewGuid(),
            Name = $"{dto.Origin} → {dto.Destination}",
            Origin = dto.Origin,
            Destination = dto.Destination,
            DistanceKm = 850,
            EstimatedDurationMinutes = 720,
            FuelCostEstimate = 120,
            IsOptimized = true
        });
}
