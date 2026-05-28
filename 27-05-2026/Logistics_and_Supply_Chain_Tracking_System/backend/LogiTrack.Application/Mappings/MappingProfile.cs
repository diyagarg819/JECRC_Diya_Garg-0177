using AutoMapper;
using LogiTrack.Application.DTOs;
using LogiTrack.Core.Entities;

namespace LogiTrack.Application.Mappings;

public class MappingProfile : Profile
{
    public MappingProfile()
    {
        // Shipment
        CreateMap<Shipment, ShipmentDto>()
            .ForMember(d => d.Status, o => o.MapFrom(s => s.Status.ToString()))
            .ForMember(d => d.CustomerName, o => o.MapFrom(s => s.Customer != null ? s.Customer.Name : null))
            .ForMember(d => d.DriverName, o => o.MapFrom(s => s.Driver != null ? $"{s.Driver.FirstName} {s.Driver.LastName}" : null))
            .ForMember(d => d.VehicleName, o => o.MapFrom(s => s.Vehicle != null ? s.Vehicle.Name : null));
        CreateMap<CreateShipmentDto, Shipment>();
        CreateMap<TrackingEvent, TrackingEventDto>()
            .ForMember(d => d.Status, o => o.MapFrom(s => s.Status.ToString()));

        // Vehicle
        CreateMap<Vehicle, VehicleDto>()
            .ForMember(d => d.Status, o => o.MapFrom(s => s.Status.ToString()))
            .ForMember(d => d.AssignedDriverName, o => o.MapFrom(s => s.AssignedDriver != null
                ? $"{s.AssignedDriver.FirstName} {s.AssignedDriver.LastName}" : null));
        CreateMap<CreateVehicleDto, Vehicle>();

        // Driver
        CreateMap<Driver, DriverDto>()
            .ForMember(d => d.Status, o => o.MapFrom(s => s.Status.ToString()))
            .ForMember(d => d.AssignedVehicle, o => o.MapFrom(s => s.Vehicle != null ? s.Vehicle.Name : null));
        CreateMap<CreateDriverDto, Driver>();

        // Warehouse
        CreateMap<Warehouse, WarehouseDto>();
        CreateMap<InventoryItem, InventoryItemDto>()
            .ForMember(d => d.WarehouseName, o => o.MapFrom(s => s.Warehouse != null ? s.Warehouse.Name : null));

        // Route
        CreateMap<Route, RouteDto>();
        CreateMap<RouteDto, Route>();
        CreateMap<RouteWaypoint, WaypointDto>();
        CreateMap<WaypointDto, RouteWaypoint>();

        // Customer
        CreateMap<Customer, CustomerDto>()
            .ForMember(d => d.TotalShipments, o => o.MapFrom(s => s.Shipments.Count));
    }
}
