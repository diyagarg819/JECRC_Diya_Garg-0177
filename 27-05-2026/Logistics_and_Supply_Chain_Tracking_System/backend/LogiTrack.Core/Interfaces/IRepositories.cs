using LogiTrack.Core.Entities;

namespace LogiTrack.Core.Interfaces;

public interface IRepository<T> where T : class
{
    Task<T?> GetByIdAsync(Guid id);
    Task<IEnumerable<T>> GetAllAsync();
    Task<T> AddAsync(T entity);
    Task UpdateAsync(T entity);
    Task DeleteAsync(Guid id);
}

public interface IShipmentRepository : IRepository<Shipment>
{
    Task<IEnumerable<Shipment>> GetByCustomerIdAsync(Guid customerId);
    Task<IEnumerable<Shipment>> GetByStatusAsync(ShipmentStatus status);
    Task<Shipment?> GetByTrackingNumberAsync(string trackingNumber);
    Task<IEnumerable<Shipment>> GetActiveShipmentsAsync();
    Task<IEnumerable<Shipment>> GetShipmentsWithDetailsAsync(int page, int pageSize);
    Task<int> GetTotalCountAsync();
    Task<Dictionary<string, int>> GetShipmentsByStatusCountAsync();
}

public interface IVehicleRepository : IRepository<Vehicle>
{
    Task<IEnumerable<Vehicle>> GetActiveVehiclesAsync();
    Task<IEnumerable<Vehicle>> GetByStatusAsync(VehicleStatus status);
    Task UpdateLocationAsync(Guid vehicleId, double lat, double lng, double? speed);
    Task<IEnumerable<VehicleTelemetry>> GetTelemetryAsync(Guid vehicleId, DateTime from, DateTime to);
    Task<Dictionary<string, int>> GetFleetStatusSummaryAsync();
}

public interface IDriverRepository : IRepository<Driver>
{
    Task<IEnumerable<Driver>> GetAvailableDriversAsync();
    Task<IEnumerable<Driver>> GetByStatusAsync(DriverStatus status);
}

public interface IWarehouseRepository : IRepository<Warehouse>
{
    Task<IEnumerable<InventoryItem>> GetInventoryAsync(Guid warehouseId);
    Task<InventoryItem?> GetInventoryByBarcodeAsync(string barcode);
    Task UpdateInventoryQuantityAsync(Guid itemId, int quantity);
    Task<IEnumerable<InventoryItem>> GetLowStockItemsAsync();
}

public interface IRouteRepository : IRepository<Route>
{
    Task<Route?> GetRouteWithWaypointsAsync(Guid routeId);
    Task<IEnumerable<Route>> GetRoutesBetweenAsync(string origin, string destination);
}

public interface ICustomerRepository : IRepository<Customer>
{
    Task<Customer?> GetByEmailAsync(string email);
    Task<IEnumerable<Customer>> GetActiveCustomersAsync();
}

public interface IUnitOfWork : IDisposable
{
    IShipmentRepository Shipments { get; }
    IVehicleRepository Vehicles { get; }
    IDriverRepository Drivers { get; }
    IWarehouseRepository Warehouses { get; }
    IRouteRepository Routes { get; }
    ICustomerRepository Customers { get; }
    Task<int> SaveChangesAsync();
}
