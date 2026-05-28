using LogiTrack.Application.DTOs;

namespace LogiTrack.Application.Interfaces;

public interface IShipmentService
{
    Task<PagedResult<ShipmentDto>> GetShipmentsAsync(int page, int pageSize, string? status = null);
    Task<ShipmentDto?> GetShipmentByIdAsync(Guid id);
    Task<ShipmentDto?> TrackShipmentAsync(string trackingNumber);
    Task<ShipmentDto> CreateShipmentAsync(CreateShipmentDto dto);
    Task<ShipmentDto> UpdateShipmentStatusAsync(Guid id, string status);
    Task AssignDriverAndVehicleAsync(Guid shipmentId, Guid driverId, Guid vehicleId);
    Task<bool> DeleteShipmentAsync(Guid id);
}

public interface IVehicleService
{
    Task<IEnumerable<VehicleDto>> GetAllVehiclesAsync();
    Task<VehicleDto?> GetVehicleByIdAsync(Guid id);
    Task<VehicleDto> CreateVehicleAsync(CreateVehicleDto dto);
    Task<VehicleDto> UpdateVehicleAsync(Guid id, CreateVehicleDto dto);
    Task ProcessTelemetryAsync(VehicleLocationUpdateDto dto);
    Task<Dictionary<string, int>> GetFleetStatusSummaryAsync();
    Task<bool> DeleteVehicleAsync(Guid id);
}

public interface IDriverService
{
    Task<IEnumerable<DriverDto>> GetAllDriversAsync();
    Task<DriverDto?> GetDriverByIdAsync(Guid id);
    Task<IEnumerable<DriverDto>> GetAvailableDriversAsync();
    Task<DriverDto> CreateDriverAsync(CreateDriverDto dto);
    Task<DriverDto> UpdateDriverAsync(Guid id, CreateDriverDto dto);
    Task AssignVehicleAsync(Guid driverId, Guid vehicleId);
    Task<bool> DeleteDriverAsync(Guid id);
}

public interface IWarehouseService
{
    Task<IEnumerable<WarehouseDto>> GetAllWarehousesAsync();
    Task<WarehouseDto?> GetWarehouseByIdAsync(Guid id);
    Task<IEnumerable<InventoryItemDto>> GetInventoryAsync(Guid warehouseId);
    Task<InventoryItemDto?> ScanBarcodeAsync(string barcode);
    Task UpdateInventoryAsync(Guid itemId, int quantityChange);
    Task<IEnumerable<InventoryItemDto>> GetLowStockAlertsAsync();
}

public interface IRouteService
{
    Task<IEnumerable<RouteDto>> GetAllRoutesAsync();
    Task<RouteDto?> GetRouteByIdAsync(Guid id);
    Task<RouteDto> OptimizeRouteAsync(OptimizeRouteRequestDto request);
    Task<RouteDto> CreateRouteAsync(RouteDto dto);
}

public interface IAnalyticsService
{
    Task<DashboardSummaryDto> GetDashboardSummaryAsync();
    Task<IEnumerable<ChartDataPoint>> GetDeliveryTrendAsync(int days);
    Task<IEnumerable<ChartDataPoint>> GetFuelConsumptionTrendAsync(int days);
    Task<IEnumerable<ChartDataPoint>> GetRevenueByMonthAsync(int months);
}
