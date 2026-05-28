using LogiTrack.Core.Entities;
using LogiTrack.Core.Interfaces;
using LogiTrack.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace LogiTrack.Infrastructure.Repositories;

public class Repository<T> : IRepository<T> where T : class
{
    protected readonly AppDbContext _ctx;
    public Repository(AppDbContext ctx) => _ctx = ctx;

    public async Task<T?> GetByIdAsync(Guid id) => await _ctx.Set<T>().FindAsync(id);
    public async Task<IEnumerable<T>> GetAllAsync() => await _ctx.Set<T>().ToListAsync();
    public async Task<T> AddAsync(T entity) { await _ctx.Set<T>().AddAsync(entity); return entity; }
    public Task UpdateAsync(T entity) { _ctx.Set<T>().Update(entity); return Task.CompletedTask; }
    public async Task DeleteAsync(Guid id)
    {
        var entity = await GetByIdAsync(id);
        if (entity != null) _ctx.Set<T>().Remove(entity);
    }
}

public class ShipmentRepository : Repository<Shipment>, IShipmentRepository
{
    public ShipmentRepository(AppDbContext ctx) : base(ctx) { }

    public async Task<IEnumerable<Shipment>> GetByCustomerIdAsync(Guid customerId) =>
        await _ctx.Shipments.Where(s => s.CustomerId == customerId).ToListAsync();

    public async Task<IEnumerable<Shipment>> GetByStatusAsync(ShipmentStatus status) =>
        await _ctx.Shipments.Where(s => s.Status == status).ToListAsync();

    public async Task<Shipment?> GetByTrackingNumberAsync(string trackingNumber) =>
        await _ctx.Shipments
            .Include(s => s.TrackingEvents)
            .Include(s => s.Customer)
            .Include(s => s.Driver)
            .Include(s => s.Vehicle)
            .FirstOrDefaultAsync(s => s.TrackingNumber == trackingNumber);

    public async Task<IEnumerable<Shipment>> GetActiveShipmentsAsync() =>
        await _ctx.Shipments
            .Where(s => s.Status != ShipmentStatus.Delivered && s.Status != ShipmentStatus.Cancelled)
            .Include(s => s.Vehicle)
            .Include(s => s.Driver)
            .ToListAsync();

    public async Task<IEnumerable<Shipment>> GetShipmentsWithDetailsAsync(int page, int pageSize) =>
        await _ctx.Shipments
            .Include(s => s.Customer)
            .Include(s => s.Driver)
            .Include(s => s.Vehicle)
            .Include(s => s.TrackingEvents)
            .OrderByDescending(s => s.CreatedAt)
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .ToListAsync();

    public async Task<int> GetTotalCountAsync() => await _ctx.Shipments.CountAsync();

    public async Task<Dictionary<string, int>> GetShipmentsByStatusCountAsync() =>
        await _ctx.Shipments
            .GroupBy(s => s.Status)
            .ToDictionaryAsync(g => g.Key.ToString(), g => g.Count());
}

public class VehicleRepository : Repository<Vehicle>, IVehicleRepository
{
    public VehicleRepository(AppDbContext ctx) : base(ctx) { }

    public async Task<IEnumerable<Vehicle>> GetActiveVehiclesAsync() =>
        await _ctx.Vehicles.Where(v => v.Status == VehicleStatus.Active)
            .Include(v => v.AssignedDriver).ToListAsync();

    public async Task<IEnumerable<Vehicle>> GetByStatusAsync(VehicleStatus status) =>
        await _ctx.Vehicles.Where(v => v.Status == status).ToListAsync();

    public async Task UpdateLocationAsync(Guid vehicleId, double lat, double lng, double? speed)
    {
        var vehicle = await _ctx.Vehicles.FindAsync(vehicleId);
        if (vehicle == null) return;
        vehicle.CurrentLatitude = lat;
        vehicle.CurrentLongitude = lng;
        vehicle.CurrentSpeed = speed;
        vehicle.UpdatedAt = DateTime.UtcNow;
        _ctx.VehicleTelemetry.Add(new VehicleTelemetry
        {
            VehicleId = vehicleId,
            Latitude = lat,
            Longitude = lng,
            Speed = speed ?? 0
        });
    }

    public async Task<IEnumerable<VehicleTelemetry>> GetTelemetryAsync(Guid vehicleId, DateTime from, DateTime to) =>
        await _ctx.VehicleTelemetry
            .Where(t => t.VehicleId == vehicleId && t.Timestamp >= from && t.Timestamp <= to)
            .OrderBy(t => t.Timestamp)
            .ToListAsync();

    public async Task<Dictionary<string, int>> GetFleetStatusSummaryAsync() =>
        await _ctx.Vehicles
            .GroupBy(v => v.Status)
            .ToDictionaryAsync(g => g.Key.ToString(), g => g.Count());
}

public class DriverRepository : Repository<Driver>, IDriverRepository
{
    public DriverRepository(AppDbContext ctx) : base(ctx) { }

    public async Task<IEnumerable<Driver>> GetAvailableDriversAsync() =>
        await _ctx.Drivers.Where(d => d.Status == DriverStatus.Available).ToListAsync();

    public async Task<IEnumerable<Driver>> GetByStatusAsync(DriverStatus status) =>
        await _ctx.Drivers.Where(d => d.Status == status).ToListAsync();
}

public class WarehouseRepository : Repository<Warehouse>, IWarehouseRepository
{
    public WarehouseRepository(AppDbContext ctx) : base(ctx) { }

    public async Task<IEnumerable<InventoryItem>> GetInventoryAsync(Guid warehouseId) =>
        await _ctx.InventoryItems.Where(i => i.WarehouseId == warehouseId).ToListAsync();

    public async Task<InventoryItem?> GetInventoryByBarcodeAsync(string barcode) =>
        await _ctx.InventoryItems.Include(i => i.Warehouse).FirstOrDefaultAsync(i => i.BarcodeData == barcode);

    public async Task UpdateInventoryQuantityAsync(Guid itemId, int quantity)
    {
        var item = await _ctx.InventoryItems.FindAsync(itemId);
        if (item == null) return;
        item.Quantity = quantity;
        item.UpdatedAt = DateTime.UtcNow;
    }

    public async Task<IEnumerable<InventoryItem>> GetLowStockItemsAsync() =>
        await _ctx.InventoryItems.Include(i => i.Warehouse)
            .Where(i => i.Quantity <= i.MinStockLevel).ToListAsync();
}

public class RouteRepository : Repository<Route>, IRouteRepository
{
    public RouteRepository(AppDbContext ctx) : base(ctx) { }

    public async Task<Route?> GetRouteWithWaypointsAsync(Guid routeId) =>
        await _ctx.Routes.Include(r => r.Waypoints.OrderBy(w => w.Order))
            .FirstOrDefaultAsync(r => r.Id == routeId);

    public async Task<IEnumerable<Route>> GetRoutesBetweenAsync(string origin, string destination) =>
        await _ctx.Routes.Where(r => r.Origin == origin && r.Destination == destination).ToListAsync();
}

public class CustomerRepository : Repository<Customer>, ICustomerRepository
{
    public CustomerRepository(AppDbContext ctx) : base(ctx) { }

    public async Task<Customer?> GetByEmailAsync(string email) =>
        await _ctx.Customers.FirstOrDefaultAsync(c => c.Email == email);

    public async Task<IEnumerable<Customer>> GetActiveCustomersAsync() =>
        await _ctx.Customers.Where(c => c.IsActive).Include(c => c.Shipments).ToListAsync();
}

public class UnitOfWork : IUnitOfWork
{
    private readonly AppDbContext _ctx;
    public IShipmentRepository Shipments { get; }
    public IVehicleRepository Vehicles { get; }
    public IDriverRepository Drivers { get; }
    public IWarehouseRepository Warehouses { get; }
    public IRouteRepository Routes { get; }
    public ICustomerRepository Customers { get; }

    public UnitOfWork(AppDbContext ctx)
    {
        _ctx = ctx;
        Shipments = new ShipmentRepository(ctx);
        Vehicles = new VehicleRepository(ctx);
        Drivers = new DriverRepository(ctx);
        Warehouses = new WarehouseRepository(ctx);
        Routes = new RouteRepository(ctx);
        Customers = new CustomerRepository(ctx);
    }

    public async Task<int> SaveChangesAsync() => await _ctx.SaveChangesAsync();
    public void Dispose() => _ctx.Dispose();
}
