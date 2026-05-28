// src/app/core/services/api.service.ts
import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  Shipment, CreateShipment, PagedResult, Vehicle, CreateVehicleDto,
  VehicleLocationUpdateDto, Driver, Warehouse, InventoryItem,
  Route, DashboardSummary, ChartDataPoint, Customer
} from '../models/models';

export const API_BASE = 'http://localhost:5000/api';

@Injectable({ providedIn: 'root' })
export class ShipmentApiService {
  private http = inject(HttpClient);
  private base = `${API_BASE}/shipments`;

  getAll(page = 1, pageSize = 20, status?: string): Observable<PagedResult<Shipment>> {
    let params = new HttpParams().set('page', page).set('pageSize', pageSize);
    if (status) params = params.set('status', status);
    return this.http.get<PagedResult<Shipment>>(this.base, { params });
  }

  getById(id: string): Observable<Shipment> {
    return this.http.get<Shipment>(`${this.base}/${id}`);
  }

  track(trackingNumber: string): Observable<Shipment> {
    return this.http.get<Shipment>(`${this.base}/track/${trackingNumber}`);
  }

  create(dto: CreateShipment): Observable<Shipment> {
    return this.http.post<Shipment>(this.base, dto);
  }

  updateStatus(id: string, status: string): Observable<Shipment> {
    return this.http.patch<Shipment>(`${this.base}/${id}/status`, { status });
  }

  assign(id: string, driverId: string, vehicleId: string): Observable<void> {
    return this.http.post<void>(`${this.base}/${id}/assign`, { driverId, vehicleId });
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.base}/${id}`);
  }
}

@Injectable({ providedIn: 'root' })
export class VehicleApiService {
  private http = inject(HttpClient);
  private base = `${API_BASE}/vehicles`;

  getAll(): Observable<Vehicle[]> { return this.http.get<Vehicle[]>(this.base); }
  getById(id: string): Observable<Vehicle> { return this.http.get<Vehicle>(`${this.base}/${id}`); }
  getFleetSummary(): Observable<Record<string, number>> { return this.http.get<Record<string, number>>(`${this.base}/fleet-summary`); }
  create(dto: any): Observable<Vehicle> { return this.http.post<Vehicle>(this.base, dto); }
  update(id: string, dto: any): Observable<Vehicle> { return this.http.put<Vehicle>(`${this.base}/${id}`, dto); }
  sendTelemetry(dto: any): Observable<void> { return this.http.post<void>(`${this.base}/telemetry`, dto); }
  delete(id: string): Observable<void> { return this.http.delete<void>(`${this.base}/${id}`); }
}

@Injectable({ providedIn: 'root' })
export class DriverApiService {
  private http = inject(HttpClient);
  private base = `${API_BASE}/drivers`;
  getAll(): Observable<Driver[]> { return this.http.get<Driver[]>(this.base); }
}

@Injectable({ providedIn: 'root' })
export class WarehouseApiService {
  private http = inject(HttpClient);
  private base = `${API_BASE}/warehouses`;
  getAll(): Observable<Warehouse[]> { return this.http.get<Warehouse[]>(this.base); }
  getInventory(id: string): Observable<InventoryItem[]> { return this.http.get<InventoryItem[]>(`${this.base}/${id}/inventory`); }
}

@Injectable({ providedIn: 'root' })
export class RouteApiService {
  private http = inject(HttpClient);
  private base = `${API_BASE}/routes`;
  getAll(): Observable<Route[]> { return this.http.get<Route[]>(this.base); }
  optimize(dto: any): Observable<Route> { return this.http.post<Route>(`${this.base}/optimize`, dto); }
}

@Injectable({ providedIn: 'root' })
export class AnalyticsApiService {
  private http = inject(HttpClient);
  private base = `${API_BASE}/analytics`;
  getDashboard(): Observable<DashboardSummary> { return this.http.get<DashboardSummary>(`${this.base}/dashboard`); }
  getDeliveryTrend(days = 30): Observable<ChartDataPoint[]> { return this.http.get<ChartDataPoint[]>(`${this.base}/delivery-trend?days=${days}`); }
  getFuelTrend(days = 30): Observable<ChartDataPoint[]> { return this.http.get<ChartDataPoint[]>(`${this.base}/fuel-trend?days=${days}`); }
  getRevenue(months = 12): Observable<ChartDataPoint[]> { return this.http.get<ChartDataPoint[]>(`${this.base}/revenue?months=${months}`); }
}

@Injectable({ providedIn: 'root' })
export class CustomerApiService {
  private http = inject(HttpClient);
  private base = `${API_BASE}/customers`;
  getAll(): Observable<Customer[]> { return this.http.get<Customer[]>(this.base); }
}
