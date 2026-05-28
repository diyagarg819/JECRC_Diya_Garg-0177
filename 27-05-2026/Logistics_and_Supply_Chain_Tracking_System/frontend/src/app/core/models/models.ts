// src/app/core/models/models.ts

export interface Shipment {
  id: string;
  trackingNumber: string;
  origin: string;
  destination: string;
  createdAt: string;
  estimatedDelivery?: string;
  actualDelivery?: string;
  status: ShipmentStatus;
  shippingMethod: string;
  weight: number;
  customerName?: string;
  driverName?: string;
  vehicleName?: string;
  trackingEvents: TrackingEvent[];
}

export interface TrackingEvent {
  id: string;
  timestamp: string;
  latitude: number;
  longitude: number;
  location: string;
  description: string;
  status: ShipmentStatus;
}

export interface CreateShipment {
  origin: string;
  destination: string;
  estimatedDelivery?: string;
  shippingMethod: string;
  weight: number;
  customerId: string;
  vehicleId?: string;
  driverId?: string;
  items: CreateShipmentItem[];
}

export interface CreateShipmentItem {
  name: string;
  quantity: number;
  weight: number;
  barcode?: string;
}

export type ShipmentStatus =
  | 'Pending' | 'PickupReady' | 'PickedUp'
  | 'InTransit' | 'OutForDelivery'
  | 'Delivered' | 'Failed' | 'Cancelled' | 'Returned';

export interface Vehicle {
  id: string;
  name: string;
  licensePlate: string;
  type: string;
  make: string;
  model: string;
  year: number;
  status: VehicleStatus;
  currentLatitude: number;
  currentLongitude: number;
  currentSpeed?: number;
  fuelLevel: number;
  maxLoadCapacity: number;
  currentLoad: number;
  assignedDriverName?: string;
  nextMaintenanceDate?: string;
  updatedAt: string;
}

export type VehicleStatus = 'Active' | 'InService' | 'NeedRepair' | 'Idle' | 'InMaintenance' | 'Retired';

export interface Driver {
  id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  phone: string;
  licenseNumber: string;
  licenseExpiry: string;
  status: DriverStatus;
  rating: number;
  totalDeliveries: number;
  photoUrl?: string;
  assignedVehicle?: string;
}

export type DriverStatus = 'Available' | 'OnRoute' | 'OnBreak' | 'OffDuty' | 'Unavailable';

export interface Warehouse {
  id: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  totalCapacity: number;
  usedCapacity: number;
  capacityPercentage: number;
  managerName: string;
  isActive: boolean;
}

export interface InventoryItem {
  id: string;
  sku: string;
  name: string;
  category: string;
  quantity: number;
  minStockLevel: number;
  isLowStock: boolean;
  location: string;
  warehouseName: string;
}

export interface Route {
  id: string;
  name: string;
  origin: string;
  destination: string;
  originLat: number;
  originLng: number;
  destinationLat: number;
  destinationLng: number;
  distanceKm: number;
  estimatedDurationMinutes: number;
  fuelCostEstimate: number;
  isOptimized: boolean;
  waypoints: Waypoint[];
}

export interface Waypoint {
  order: number;
  name: string;
  latitude: number;
  longitude: number;
}

export interface DashboardSummary {
  totalOrders: number;
  pickupReady: number;
  inTransit: number;
  delivered: number;
  totalVehicles: number;
  activeVehicles: number;
  inMaintenanceVehicles: number;
  availableDrivers: number;
  totalRevenue: number;
  orderTrend: ChartDataPoint[];
  shippingMethods: ShipmentMethodBreakdown[];
  recentDeliveries: RecentDelivery[];
}

export interface ChartDataPoint { label: string; value: number; }
export interface ShipmentMethodBreakdown { method: string; count: number; percentage: number; }
export interface RecentDelivery { trackingNumber: string; customerName: string; destination: string; deliveredAt: string; }

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  country: string;
  totalShipments: number;
}

export interface PagedResult<T> {
  items: T[];
  totalCount: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface VehicleLocationMessage {
  vehicleId: string;
  vehicleName: string;
  latitude: number;
  longitude: number;
  speed?: number;
  fuelLevel: number;
  status: string;
  timestamp: string;
}
