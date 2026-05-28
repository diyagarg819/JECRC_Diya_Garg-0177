using LogiTrack.Core.Entities;
using Microsoft.EntityFrameworkCore;

namespace LogiTrack.Infrastructure.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<Shipment> Shipments => Set<Shipment>();
    public DbSet<ShipmentItem> ShipmentItems => Set<ShipmentItem>();
    public DbSet<TrackingEvent> TrackingEvents => Set<TrackingEvent>();
    public DbSet<Vehicle> Vehicles => Set<Vehicle>();
    public DbSet<VehicleTelemetry> VehicleTelemetry => Set<VehicleTelemetry>();
    public DbSet<Driver> Drivers => Set<Driver>();
    public DbSet<Route> Routes => Set<Route>();
    public DbSet<RouteWaypoint> RouteWaypoints => Set<RouteWaypoint>();
    public DbSet<Warehouse> Warehouses => Set<Warehouse>();
    public DbSet<InventoryItem> InventoryItems => Set<InventoryItem>();
    public DbSet<Customer> Customers => Set<Customer>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Shipment
        modelBuilder.Entity<Shipment>(e =>
        {
            e.HasKey(s => s.Id);
            e.Property(s => s.TrackingNumber).IsRequired().HasMaxLength(50);
            e.HasIndex(s => s.TrackingNumber).IsUnique();
            e.Property(s => s.Status).HasConversion<string>();
            e.HasOne(s => s.Customer).WithMany(c => c.Shipments).HasForeignKey(s => s.CustomerId);
            e.HasOne(s => s.Vehicle).WithMany(v => v.Shipments).HasForeignKey(s => s.VehicleId).IsRequired(false);
            e.HasOne(s => s.Driver).WithMany(d => d.Shipments).HasForeignKey(s => s.DriverId).IsRequired(false);
            e.HasMany(s => s.Items).WithOne(i => i.Shipment).HasForeignKey(i => i.ShipmentId);
            e.HasMany(s => s.TrackingEvents).WithOne(t => t.Shipment).HasForeignKey(t => t.ShipmentId);
        });

        // Vehicle
        modelBuilder.Entity<Vehicle>(e =>
        {
            e.HasKey(v => v.Id);
            e.Property(v => v.Status).HasConversion<string>();
            e.HasOne(v => v.AssignedDriver).WithOne(d => d.Vehicle)
                .HasForeignKey<Vehicle>(v => v.AssignedDriverId).IsRequired(false);
            e.HasMany(v => v.Telemetry).WithOne(t => t.Vehicle).HasForeignKey(t => t.VehicleId);
        });

        // Driver
        modelBuilder.Entity<Driver>(e =>
        {
            e.HasKey(d => d.Id);
            e.Property(d => d.Status).HasConversion<string>();
        });

        // Route
        modelBuilder.Entity<Route>(e =>
        {
            e.HasKey(r => r.Id);
            e.HasMany(r => r.Waypoints).WithOne(w => w.Route).HasForeignKey(w => w.RouteId);
        });

        // Warehouse
        modelBuilder.Entity<Warehouse>(e =>
        {
            e.HasKey(w => w.Id);
            e.HasMany(w => w.Inventory).WithOne(i => i.Warehouse).HasForeignKey(i => i.WarehouseId);
        });

        // Seed data
        SeedData(modelBuilder);
    }

    private static void SeedData(ModelBuilder mb)
    {
        var customerId1 = Guid.Parse("11111111-1111-1111-1111-111111111111");
        var customerId2 = Guid.Parse("22222222-2222-2222-2222-222222222222");
        var warehouseId = Guid.Parse("33333333-3333-3333-3333-333333333333");

        mb.Entity<Customer>().HasData(
            new Customer { Id = customerId1, Name = "Compass East Corp.", Email = "ops@compasseast.com", Phone = "+1-555-0101", Address = "123 Commerce St", City = "New York", Country = "USA", IsActive = true },
            new Customer { Id = customerId2, Name = "Cyberdyne Industries", Email = "logistics@cyberdyne.com", Phone = "+1-555-0202", Address = "456 Tech Ave", City = "Los Angeles", Country = "USA", IsActive = true }
        );

        mb.Entity<Warehouse>().HasData(
            new Warehouse { Id = warehouseId, Name = "Central Warehouse NYC", Address = "789 Dock Rd, New York", Latitude = 40.7128, Longitude = -74.0060, TotalCapacity = 10000, UsedCapacity = 6500, ManagerName = "John Smith", Phone = "+1-555-0301", IsActive = true }
        );

        mb.Entity<Driver>().HasData(
            new Driver { Id = Guid.Parse("44444444-4444-4444-4444-444444444444"), FirstName = "Jimmy", LastName = "Dente", Email = "jimmy.d@logitrack.com", Phone = "+1-555-1001", LicenseNumber = "DL-NY-12345", LicenseExpiry = DateTime.UtcNow.AddYears(3), Status = Core.Enums.DriverStatus.OnRoute, Rating = 4.8, TotalDeliveries = 342 },
            new Driver { Id = Guid.Parse("55555555-5555-5555-5555-555555555555"), FirstName = "Maria", LastName = "Santos", Email = "maria.s@logitrack.com", Phone = "+1-555-1002", LicenseNumber = "DL-NY-67890", LicenseExpiry = DateTime.UtcNow.AddYears(2), Status = Core.Enums.DriverStatus.Available, Rating = 4.9, TotalDeliveries = 512 }
        );
    }
}
