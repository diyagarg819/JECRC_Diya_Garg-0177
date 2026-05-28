// src/app/modules/shipments/shipment-detail/shipment-detail.component.ts
import { Component, OnInit, inject, input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ShipmentApiService } from '../../../core/services/api.service';
import { Shipment } from '../../../core/models/models';

@Component({
  selector: 'app-shipment-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="detail-page">
      <div class="breadcrumb">
        <a routerLink="/shipments">Shipments</a>
        <span>›</span>
        <span>{{ shipment()?.trackingNumber ?? 'Loading...' }}</span>
      </div>

      <div *ngIf="!shipment()" class="loading">
        <div class="spinner"></div> Loading shipment details...
      </div>

      <div *ngIf="shipment()" class="detail-layout">
        <!-- Left: Main Info -->
        <div class="main-panel">
          <!-- Header Card -->
          <div class="header-card">
            <div class="header-left">
              <h2>{{ shipment()!.trackingNumber }}</h2>
              <span class="status-badge" [class]="getStatusClass(shipment()!.status)">{{ shipment()!.status }}</span>
            </div>
            <div class="header-right">
              <button class="btn-secondary" (click)="updateStatus('InTransit')">Mark In Transit</button>
              <button class="btn-secondary" (click)="updateStatus('Delivered')">Mark Delivered</button>
            </div>
          </div>

          <!-- Route Visual -->
          <div class="route-card">
            <div class="route-point origin">
              <div class="point-dot origin-dot"></div>
              <div>
                <span class="point-label">Origin</span>
                <span class="point-city">{{ shipment()!.origin }}</span>
              </div>
            </div>
            <div class="route-progress">
              <div class="progress-line">
                <div class="progress-fill" [style.width.%]="getProgressPercent()"></div>
                <div class="truck-icon" [style.left.%]="getProgressPercent()">🚛</div>
              </div>
              <span class="progress-label">{{ getProgressPercent() }}% complete</span>
            </div>
            <div class="route-point destination">
              <div class="point-dot dest-dot"></div>
              <div>
                <span class="point-label">Destination</span>
                <span class="point-city">{{ shipment()!.destination }}</span>
              </div>
            </div>
          </div>

          <!-- Info Grid -->
          <div class="info-grid">
            <div class="info-card">
              <h4>Shipment Info</h4>
              <div class="info-row"><span>Shipping Method</span><strong>{{ shipment()!.shippingMethod }}</strong></div>
              <div class="info-row"><span>Weight</span><strong>{{ shipment()!.weight }} kg</strong></div>
              <div class="info-row"><span>Created</span><strong>{{ shipment()!.createdAt | date:'MMM d, y' }}</strong></div>
              <div class="info-row"><span>ETA</span><strong>{{ shipment()!.estimatedDelivery ? (shipment()!.estimatedDelivery | date:'MMM d, y') : 'TBD' }}</strong></div>
            </div>
            <div class="info-card">
              <h4>Assignment</h4>
              <div class="info-row"><span>Customer</span><strong>{{ shipment()!.customerName ?? '—' }}</strong></div>
              <div class="info-row"><span>Driver</span><strong>{{ shipment()!.driverName ?? 'Unassigned' }}</strong></div>
              <div class="info-row"><span>Vehicle</span><strong>{{ shipment()!.vehicleName ?? 'Unassigned' }}</strong></div>
            </div>
          </div>

          <!-- Tracking Timeline -->
          <div class="timeline-card">
            <h4>Tracking History</h4>
            <div class="timeline" *ngIf="shipment()!.trackingEvents.length; else noEvents">
              <div *ngFor="let e of shipment()!.trackingEvents; let last = last" class="timeline-item" [class.last]="last">
                <div class="timeline-dot" [class.current]="last"></div>
                <div class="timeline-content">
                  <div class="timeline-header">
                    <span class="timeline-status">{{ e.status }}</span>
                    <span class="timeline-time">{{ e.timestamp | date:'MMM d, h:mm a' }}</span>
                  </div>
                  <div class="timeline-location">📍 {{ e.location }}</div>
                  <div class="timeline-desc">{{ e.description }}</div>
                </div>
              </div>
            </div>
            <ng-template #noEvents>
              <p class="no-events">No tracking events yet</p>
            </ng-template>
          </div>
        </div>

        <!-- Right: Map + Status Actions -->
        <div class="side-panel">
          <div class="map-card">
            <h4>Live Location</h4>
            <div class="map-placeholder">
              <div class="map-content">
                <span>📍</span>
                <p>Live map requires Google Maps API key</p>
                <p class="coord-text" *ngIf="shipment()!.trackingEvents.length">
                  Last known: {{ shipment()!.trackingEvents[shipment()!.trackingEvents.length - 1].location }}
                </p>
              </div>
            </div>
          </div>

          <div class="actions-card">
            <h4>Quick Actions</h4>
            <button class="action-item" (click)="updateStatus('PickedUp')">📦 Mark Picked Up</button>
            <button class="action-item" (click)="updateStatus('OutForDelivery')">🚚 Out for Delivery</button>
            <button class="action-item warn" (click)="updateStatus('Failed')">⚠️ Report Issue</button>
            <button class="action-item danger" (click)="updateStatus('Cancelled')">❌ Cancel Shipment</button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .detail-page { display: flex; flex-direction: column; gap: 20px; }
    .breadcrumb { display: flex; align-items: center; gap: 8px; font-size: 14px; color: #94a3b8; }
    .breadcrumb a { color: #1d4ed8; text-decoration: none; }
    .breadcrumb a:hover { text-decoration: underline; }
    .loading { display: flex; align-items: center; gap: 12px; padding: 60px; justify-content: center; color: #64748b; }
    .spinner { width: 24px; height: 24px; border: 3px solid #e2e8f0; border-top-color: #3b82f6; border-radius: 50%; animation: spin 0.8s linear infinite; }
    @keyframes spin { to { transform: rotate(360deg); } }

    .detail-layout { display: grid; grid-template-columns: 1fr 320px; gap: 20px; align-items: start; }
    .main-panel { display: flex; flex-direction: column; gap: 16px; }
    .side-panel { display: flex; flex-direction: column; gap: 16px; }

    .header-card { background: white; border-radius: 12px; padding: 20px; box-shadow: 0 1px 4px rgba(0,0,0,.06); display: flex; justify-content: space-between; align-items: center; }
    .header-left { display: flex; align-items: center; gap: 12px; }
    .header-left h2 { font-size: 20px; font-weight: 700; margin: 0; }
    .header-right { display: flex; gap: 10px; }
    .btn-secondary { background: white; border: 1px solid #e2e8f0; color: #374151; padding: 8px 14px; border-radius: 8px; font-size: 13px; font-weight: 500; cursor: pointer; }
    .btn-secondary:hover { background: #f8fafc; }

    .status-badge { padding: 4px 12px; border-radius: 20px; font-size: 13px; font-weight: 600; }
    .status-intransit { background: #dbeafe; color: #1d4ed8; }
    .status-delivered { background: #dcfce7; color: #16a34a; }
    .status-pending { background: #f1f5f9; color: #64748b; }
    .status-failed { background: #fef2f2; color: #dc2626; }
    .status-pickupready { background: #fefce8; color: #ca8a04; }
    .status-cancelled { background: #fef2f2; color: #dc2626; }

    .route-card { background: white; border-radius: 12px; padding: 24px; box-shadow: 0 1px 4px rgba(0,0,0,.06); display: flex; align-items: center; gap: 20px; }
    .route-point { display: flex; align-items: center; gap: 10px; }
    .point-dot { width: 14px; height: 14px; border-radius: 50%; flex-shrink: 0; }
    .origin-dot { background: #3b82f6; }
    .dest-dot { background: #16a34a; }
    .point-label { font-size: 11px; color: #94a3b8; display: block; }
    .point-city { font-size: 15px; font-weight: 600; color: #0f172a; display: block; }
    .route-progress { flex: 1; display: flex; flex-direction: column; gap: 6px; align-items: center; }
    .progress-line { width: 100%; height: 6px; background: #e2e8f0; border-radius: 3px; position: relative; }
    .progress-fill { height: 100%; background: #3b82f6; border-radius: 3px; transition: width 0.6s; }
    .truck-icon { position: absolute; top: -10px; transform: translateX(-50%); font-size: 20px; transition: left 0.6s; }
    .progress-label { font-size: 12px; color: #64748b; }

    .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
    .info-card { background: white; border-radius: 12px; padding: 20px; box-shadow: 0 1px 4px rgba(0,0,0,.06); }
    .info-card h4 { font-size: 13px; font-weight: 600; color: #64748b; text-transform: uppercase; margin: 0 0 14px; }
    .info-row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #f8fafc; font-size: 14px; }
    .info-row span { color: #64748b; }
    .info-row strong { color: #0f172a; }

    .timeline-card { background: white; border-radius: 12px; padding: 20px; box-shadow: 0 1px 4px rgba(0,0,0,.06); }
    .timeline-card h4 { font-size: 14px; font-weight: 600; margin: 0 0 20px; }
    .timeline { display: flex; flex-direction: column; }
    .timeline-item { display: flex; gap: 16px; padding-bottom: 20px; position: relative; }
    .timeline-item:not(.last)::before { content: ''; position: absolute; left: 7px; top: 16px; bottom: 0; width: 2px; background: #e2e8f0; }
    .timeline-dot { width: 16px; height: 16px; border-radius: 50%; background: #e2e8f0; flex-shrink: 0; margin-top: 2px; border: 2px solid white; box-shadow: 0 0 0 2px #e2e8f0; }
    .timeline-dot.current { background: #3b82f6; box-shadow: 0 0 0 2px #bfdbfe; }
    .timeline-header { display: flex; justify-content: space-between; margin-bottom: 4px; }
    .timeline-status { font-size: 13px; font-weight: 600; color: #0f172a; }
    .timeline-time { font-size: 12px; color: #94a3b8; }
    .timeline-location { font-size: 13px; color: #3b82f6; margin-bottom: 2px; }
    .timeline-desc { font-size: 13px; color: #64748b; }
    .no-events { color: #94a3b8; font-size: 14px; text-align: center; padding: 20px 0; }

    .map-card { background: white; border-radius: 12px; padding: 20px; box-shadow: 0 1px 4px rgba(0,0,0,.06); }
    .map-card h4 { font-size: 14px; font-weight: 600; margin: 0 0 12px; }
    .map-placeholder { background: linear-gradient(135deg, #dbeafe, #bfdbfe); border-radius: 10px; height: 200px; display: flex; align-items: center; justify-content: center; }
    .map-content { text-align: center; color: #374151; }
    .map-content span { font-size: 32px; display: block; }
    .map-content p { margin: 8px 0 0; font-size: 13px; color: #475569; }
    .coord-text { font-size: 12px; color: #64748b; }

    .actions-card { background: white; border-radius: 12px; padding: 20px; box-shadow: 0 1px 4px rgba(0,0,0,.06); display: flex; flex-direction: column; gap: 8px; }
    .actions-card h4 { font-size: 14px; font-weight: 600; margin: 0 0 4px; }
    .action-item { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 10px 14px; text-align: left; cursor: pointer; font-size: 14px; color: #374151; transition: all 0.2s; }
    .action-item:hover { background: #eff6ff; border-color: #bfdbfe; color: #1d4ed8; }
    .action-item.warn:hover { background: #fefce8; border-color: #fde68a; color: #92400e; }
    .action-item.danger:hover { background: #fef2f2; border-color: #fecaca; color: #dc2626; }
  `]
})
export class ShipmentDetailComponent implements OnInit {
  private api = inject(ShipmentApiService);
  id = input<string>('');
  shipment = signal<Shipment | null>(null);

  ngOnInit() {
    this.api.getById(this.id()).subscribe({
      next: s => this.shipment.set(s),
      error: () => this.shipment.set(this.getDemoShipment())
    });
  }

  updateStatus(status: string) {
    const s = this.shipment();
    if (!s) return;
    this.api.updateStatus(s.id, status).subscribe({
      next: updated => this.shipment.set(updated),
      error: () => this.shipment.update(sh => sh ? { ...sh, status: status as any } : sh)
    });
  }

  getStatusClass(status: string): string {
    const map: Record<string, string> = {
      InTransit: 'status-intransit', Delivered: 'status-delivered',
      Pending: 'status-pending', Failed: 'status-failed',
      PickupReady: 'status-pickupready', Cancelled: 'status-cancelled'
    };
    return map[status] ?? 'status-pending';
  }

  getProgressPercent(): number {
    const map: Record<string, number> = {
      Pending: 0, PickupReady: 10, PickedUp: 25, InTransit: 60,
      OutForDelivery: 85, Delivered: 100, Failed: 60, Cancelled: 0
    };
    return map[this.shipment()?.status ?? 'Pending'] ?? 0;
  }

  private getDemoShipment(): Shipment {
    return {
      id: this.id(),
      trackingNumber: '#19949062930768',
      origin: 'New Delhi',
      destination: 'Chennai',
      status: 'InTransit',
      shippingMethod: 'Standard',
      weight: 120,
      customerName: 'Compass East Corp.',
      driverName: 'Jimmy Dente',
      vehicleName: 'PeterBit 500',
      estimatedDelivery: new Date(Date.now() + 3 * 86400000).toISOString(),
      createdAt: new Date(Date.now() - 2 * 86400000).toISOString(),
      trackingEvents: [
        { id: '1', timestamp: new Date(Date.now() - 2 * 86400000).toISOString(), latitude: 28.6, longitude: 77.2, location: 'New Delhi, DL', description: 'Shipment created and ready for pickup', status: 'Pending' },
        { id: '2', timestamp: new Date(Date.now() - 86400000).toISOString(), latitude: 26.8, longitude: 80.9, location: 'Lucknow, UP', description: 'Package picked up by driver', status: 'PickedUp' },
        { id: '3', timestamp: new Date().toISOString(), latitude: 21.14, longitude: 79.08, location: 'Nagpur, MH', description: 'In transit — passing through Nagpur hub', status: 'InTransit' },
      ]
    };
  }
}
