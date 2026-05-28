// src/app/modules/fleet/fleet.component.ts
import { Component, OnInit, OnDestroy, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VehicleApiService } from '../../core/services/api.service';
import { TrackingService } from '../../core/services/tracking.service';
import { Vehicle, VehicleLocationMessage } from '../../core/models/models';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-fleet',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="fleet-page">
      <div class="page-header">
        <div>
          <h2>Fleet Management</h2>
          <p>Live GPS tracking and fleet status</p>
        </div>
        <button class="btn-primary">+ Add Vehicle</button>
      </div>

      <!-- KPI Summary -->
      <div class="fleet-kpis">
        <div class="kpi" *ngFor="let k of kpis">
          <span class="kpi-num" [style.color]="k.color">{{ k.value }}</span>
          <span class="kpi-lbl">{{ k.label }}</span>
        </div>
      </div>

      <div class="fleet-layout">
        <!-- Vehicle List -->
        <div class="vehicle-list">
          <div class="list-header">
            <h3>Vehicles ({{ vehicles().length }})</h3>
            <div class="status-filter">
              <button *ngFor="let f of statusFilters" [class.active]="activeFilter() === f" (click)="activeFilter.set(f)" class="filter-btn">{{ f }}</button>
            </div>
          </div>
          <div class="vehicles">
            <div *ngFor="let v of filteredVehicles()"
                 class="vehicle-card"
                 [class.selected]="selectedVehicle()?.id === v.id"
                 (click)="selectVehicle(v)">
              <div class="v-header">
                <span class="v-name">{{ v.name }}</span>
                <span class="status-dot" [class]="getStatusClass(v.status)"></span>
              </div>
              <div class="v-detail">🚛 {{ v.type }} · {{ v.licensePlate }}</div>
              <div class="v-stats">
                <span>⚡ {{ v.currentSpeed?.toFixed(0) ?? 0 }} km/h</span>
                <span>⛽ {{ v.fuelLevel.toFixed(0) }}%</span>
                <span>📦 {{ ((v.currentLoad / v.maxLoadCapacity) * 100).toFixed(0) }}% load</span>
              </div>
              <div class="v-driver" *ngIf="v.assignedDriverName">👤 {{ v.assignedDriverName }}</div>
              <div class="v-status-badge" [class]="getStatusClass(v.status)">{{ v.status }}</div>
            </div>
            <div *ngIf="filteredVehicles().length === 0" class="empty">No vehicles in this category</div>
          </div>
        </div>

        <!-- Map Placeholder + Detail -->
        <div class="map-area">
          <div class="map-container">
            <div class="map-placeholder">
              <div class="map-overlay">
                <h3>🗺️ Live Fleet Map</h3>
                <p>Integrate Google Maps API key in environment.ts to enable live GPS tracking</p>
                <div class="map-vehicles">
                  <div *ngFor="let v of vehicles().slice(0, 4)" class="map-marker" [style.left.%]="20 + (v.currentLongitude % 20)" [style.top.%]="20 + (v.currentLatitude % 30)">
                    <div class="marker-icon" [class]="getStatusClass(v.status)">🚛</div>
                    <div class="marker-label">{{ v.name }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Selected Vehicle Detail -->
          <div class="vehicle-detail" *ngIf="selectedVehicle()">
            <h4>{{ selectedVehicle()!.name }}</h4>
            <div class="detail-grid">
              <div class="detail-item">
                <span class="d-label">License Plate</span>
                <span class="d-value">{{ selectedVehicle()!.licensePlate }}</span>
              </div>
              <div class="detail-item">
                <span class="d-label">Type</span>
                <span class="d-value">{{ selectedVehicle()!.type }}</span>
              </div>
              <div class="detail-item">
                <span class="d-label">Make / Model</span>
                <span class="d-value">{{ selectedVehicle()!.make }} {{ selectedVehicle()!.model }} {{ selectedVehicle()!.year }}</span>
              </div>
              <div class="detail-item">
                <span class="d-label">Load Capacity</span>
                <span class="d-value">{{ selectedVehicle()!.currentLoad }} / {{ selectedVehicle()!.maxLoadCapacity }} tons</span>
              </div>
              <div class="detail-item">
                <span class="d-label">Fuel Level</span>
                <div class="fuel-bar">
                  <div class="fuel-fill" [style.width.%]="selectedVehicle()!.fuelLevel"></div>
                </div>
              </div>
              <div class="detail-item">
                <span class="d-label">Next Maintenance</span>
                <span class="d-value">{{ selectedVehicle()!.nextMaintenanceDate ? (selectedVehicle()!.nextMaintenanceDate | date) : 'Not scheduled' }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .fleet-page { display: flex; flex-direction: column; gap: 20px; }
    .page-header { display: flex; justify-content: space-between; align-items: flex-start; }
    .page-header h2 { font-size: 22px; font-weight: 700; margin: 0 0 4px; }
    .page-header p { color: #64748b; margin: 0; font-size: 14px; }
    .btn-primary { background: #1d4ed8; color: white; border: none; padding: 10px 20px; border-radius: 8px; font-weight: 600; cursor: pointer; }

    .fleet-kpis { display: flex; gap: 16px; background: white; border-radius: 12px; padding: 20px; box-shadow: 0 1px 4px rgba(0,0,0,.06); }
    .kpi { flex: 1; display: flex; flex-direction: column; align-items: center; border-right: 1px solid #f1f5f9; }
    .kpi:last-child { border-right: none; }
    .kpi-num { font-size: 28px; font-weight: 700; }
    .kpi-lbl { font-size: 12px; color: #64748b; margin-top: 4px; }

    .fleet-layout { display: grid; grid-template-columns: 340px 1fr; gap: 16px; height: 600px; }

    .vehicle-list { background: white; border-radius: 12px; box-shadow: 0 1px 4px rgba(0,0,0,.06); display: flex; flex-direction: column; overflow: hidden; }
    .list-header { padding: 16px; border-bottom: 1px solid #f1f5f9; }
    .list-header h3 { font-size: 14px; font-weight: 600; margin: 0 0 10px; }
    .status-filter { display: flex; gap: 4px; flex-wrap: wrap; }
    .filter-btn { padding: 4px 10px; border: 1px solid #e2e8f0; border-radius: 16px; background: white; font-size: 12px; cursor: pointer; color: #64748b; }
    .filter-btn.active { background: #1d4ed8; color: white; border-color: #1d4ed8; }

    .vehicles { flex: 1; overflow-y: auto; padding: 8px; display: flex; flex-direction: column; gap: 8px; }

    .vehicle-card { padding: 12px; border: 1px solid #f1f5f9; border-radius: 8px; cursor: pointer; transition: all 0.2s; }
    .vehicle-card:hover { border-color: #3b82f6; background: #f8fafc; }
    .vehicle-card.selected { border-color: #3b82f6; background: #eff6ff; }
    .v-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px; }
    .v-name { font-weight: 600; font-size: 14px; }
    .v-detail { font-size: 12px; color: #64748b; margin-bottom: 6px; }
    .v-stats { display: flex; gap: 12px; font-size: 12px; color: #374151; margin-bottom: 6px; }
    .v-driver { font-size: 12px; color: #64748b; }
    .v-status-badge { display: inline-block; margin-top: 6px; padding: 2px 8px; border-radius: 12px; font-size: 11px; font-weight: 500; }

    .status-dot { width: 8px; height: 8px; border-radius: 50%; }
    .active, .status-dot.active, .v-status-badge.active { background: #16a34a; color: #16a34a; }
    .v-status-badge.active { color: #15803d; background: #dcfce7; }
    .inservice, .status-dot.inservice { background: #3b82f6; }
    .v-status-badge.inservice { color: #1d4ed8; background: #dbeafe; }
    .needrepair, .idle { color: #f59e0b; }
    .v-status-badge.needrepair, .v-status-badge.idle { color: #d97706; background: #fef3c7; }
    .inmaintenance, .status-dot.inmaintenance { background: #f59e0b; }
    .v-status-badge.inmaintenance { color: #d97706; background: #fef3c7; }
    .empty { text-align: center; color: #94a3b8; padding: 24px; }

    .map-area { display: flex; flex-direction: column; gap: 12px; }
    .map-container { flex: 1; border-radius: 12px; overflow: hidden; box-shadow: 0 1px 4px rgba(0,0,0,.06); }
    .map-placeholder { height: 100%; background: linear-gradient(135deg, #e0f2fe 0%, #bae6fd 50%, #7dd3fc 100%); display: flex; align-items: center; justify-content: center; position: relative; min-height: 300px; }
    .map-overlay { text-align: center; z-index: 1; }
    .map-overlay h3 { font-size: 18px; font-weight: 600; color: #0f172a; }
    .map-overlay p { color: #475569; font-size: 13px; max-width: 300px; margin: 8px auto; }
    .map-vehicles { position: relative; width: 300px; height: 120px; margin-top: 12px; }
    .map-marker { position: absolute; display: flex; flex-direction: column; align-items: center; }
    .marker-icon { font-size: 20px; }
    .marker-label { font-size: 9px; background: white; padding: 1px 4px; border-radius: 4px; margin-top: 2px; font-weight: 600; }

    .vehicle-detail { background: white; border-radius: 12px; padding: 16px; box-shadow: 0 1px 4px rgba(0,0,0,.06); }
    .vehicle-detail h4 { font-size: 15px; font-weight: 600; margin: 0 0 12px; }
    .detail-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
    .detail-item { display: flex; flex-direction: column; gap: 2px; }
    .d-label { font-size: 11px; color: #94a3b8; text-transform: uppercase; }
    .d-value { font-size: 13px; color: #0f172a; font-weight: 500; }
    .fuel-bar { height: 6px; background: #f1f5f9; border-radius: 3px; overflow: hidden; margin-top: 4px; }
    .fuel-fill { height: 100%; background: #16a34a; border-radius: 3px; transition: width 0.5s; }
  `]
})
export class FleetComponent implements OnInit, OnDestroy {
  private vehicleApi = inject(VehicleApiService);
  private tracking = inject(TrackingService);

  vehicles = signal<Vehicle[]>([]);
  selectedVehicle = signal<Vehicle | null>(null);
  activeFilter = signal('All');
  private sub?: Subscription;

  statusFilters = ['All', 'Active', 'InService', 'Maintenance', 'Idle'];

  kpis = [
    { label: 'Total Vehicles', value: 500, color: '#0f172a' },
    { label: 'Active', value: 410, color: '#16a34a' },
    { label: 'In Service', value: 80, color: '#3b82f6' },
    { label: 'Need Repair', value: 52, color: '#dc2626' },
    { label: 'Assigned', value: 430, color: '#6d28d9' },
    { label: 'Unassigned', value: 112, color: '#64748b' },
  ];

  filteredVehicles() {
    const f = this.activeFilter();
    if (f === 'All') return this.vehicles();
    return this.vehicles().filter(v => v.status.toLowerCase().includes(f.toLowerCase()));
  }

  ngOnInit() {
    this.vehicleApi.getAll().subscribe({
      next: vs => this.vehicles.set(vs),
      error: () => this.vehicles.set(this.getDemoVehicles())
    });

    // Listen for live location updates
    this.sub = this.tracking.onVehicleLocation().subscribe(msg => this.updateVehicleLocation(msg));
  }

  ngOnDestroy() { this.sub?.unsubscribe(); }

  selectVehicle(v: Vehicle) { this.selectedVehicle.set(v); }

  getStatusClass(status: string): string {
    return status.toLowerCase().replace(' ', '');
  }

  private updateVehicleLocation(msg: VehicleLocationMessage) {
    this.vehicles.update(vs => vs.map(v =>
      v.id === msg.vehicleId
        ? { ...v, currentLatitude: msg.latitude, currentLongitude: msg.longitude, currentSpeed: msg.speed, fuelLevel: msg.fuelLevel }
        : v
    ));
  }

  private getDemoVehicles(): Vehicle[] {
    return [
      { id: '1', name: 'Truck #114', licensePlate: 'BNG-9201', type: 'Truck', make: 'Volvo', model: 'FH16', year: 2022, status: 'Active', currentLatitude: 40.71, currentLongitude: -74.0, currentSpeed: 67, fuelLevel: 84, maxLoadCapacity: 20, currentLoad: 12.5, assignedDriverName: 'Jimmy Dente', updatedAt: new Date().toISOString() },
      { id: '2', name: 'Van #203', licensePlate: 'DKA-4523', type: 'Van', make: 'Mercedes', model: 'Sprinter', year: 2021, status: 'Active', currentLatitude: 40.73, currentLongitude: -74.01, currentSpeed: 45, fuelLevel: 62, maxLoadCapacity: 5, currentLoad: 3, assignedDriverName: 'Maria Santos', updatedAt: new Date().toISOString() },
      { id: '3', name: 'SUV #101', licensePlate: 'SYL-2022', type: 'SUV', make: 'Toyota', model: 'Land Cruiser', year: 2023, status: 'InService', currentLatitude: 40.75, currentLongitude: -73.98, currentSpeed: 0, fuelLevel: 91, maxLoadCapacity: 1, currentLoad: 0, updatedAt: new Date().toISOString() },
      { id: '4', name: 'Truck #301', licensePlate: 'RGN-6743', type: 'Truck', make: 'MAN', model: 'TGX', year: 2020, status: 'InMaintenance', currentLatitude: 40.69, currentLongitude: -74.04, currentSpeed: 0, fuelLevel: 35, maxLoadCapacity: 25, currentLoad: 0, updatedAt: new Date().toISOString() },
    ];
  }
}
