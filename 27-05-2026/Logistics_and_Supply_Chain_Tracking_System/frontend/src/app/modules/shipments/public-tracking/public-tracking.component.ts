// src/app/modules/shipments/public-tracking/public-tracking.component.ts
import { Component, OnInit, inject, input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ShipmentApiService } from '../../../core/services/api.service';
import { Shipment } from '../../../core/models/models';

@Component({
  selector: 'app-public-tracking',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="track-page">
      <div class="track-header">
        <div class="brand">
          <span class="brand-icon">🚚</span>
          <span class="brand-name">LogiTrack</span>
        </div>
        <h1>Track Your Shipment</h1>
        <p>Enter your tracking number to get real-time updates</p>
      </div>

      <div class="search-card">
        <div class="search-row">
          <input [(ngModel)]="searchInput" placeholder="Enter tracking number e.g. LT20240101XXXXX"
                 class="track-input" (keyup.enter)="search()" />
          <button class="search-btn" (click)="search()">Track</button>
        </div>
        <p class="demo-hint">Demo: try <code>#19949062930768</code></p>
      </div>

      <!-- Not Found -->
      <div class="not-found" *ngIf="notFound()">
        <span>🔍</span>
        <h3>Shipment Not Found</h3>
        <p>The tracking number <strong>{{ lastSearched }}</strong> was not found. Please check and try again.</p>
      </div>

      <!-- Result -->
      <div class="result-card" *ngIf="shipment()">
        <!-- Status Banner -->
        <div class="status-banner" [class]="getBannerClass(shipment()!.status)">
          <span class="banner-icon">{{ getStatusIcon(shipment()!.status) }}</span>
          <div>
            <div class="banner-status">{{ shipment()!.status }}</div>
            <div class="banner-sub">{{ shipment()!.trackingNumber }}</div>
          </div>
          <div class="banner-eta" *ngIf="shipment()!.estimatedDelivery">
            <span class="eta-label">Expected Delivery</span>
            <span class="eta-date">{{ shipment()!.estimatedDelivery | date:'MMMM d, y' }}</span>
          </div>
        </div>

        <!-- Route -->
        <div class="route-section">
          <div class="route-ends">
            <div class="route-end">
              <div class="end-label">FROM</div>
              <div class="end-city">{{ shipment()!.origin }}</div>
            </div>
            <div class="route-progress-wrap">
              <div class="progress-bar">
                <div class="progress-fill" [style.width.%]="getProgress()"></div>
                <div class="progress-truck" [style.left.%]="getProgress()">🚛</div>
              </div>
            </div>
            <div class="route-end right">
              <div class="end-label">TO</div>
              <div class="end-city">{{ shipment()!.destination }}</div>
            </div>
          </div>
        </div>

        <!-- Timeline -->
        <div class="timeline-section">
          <h3>Shipment Journey</h3>
          <div class="timeline">
            <div *ngFor="let e of shipment()!.trackingEvents | reversePipe; let last = last"
                 class="timeline-item" [class.current]="last">
              <div class="t-dot" [class.active]="last"></div>
              <div class="t-content">
                <div class="t-header">
                  <span class="t-event">{{ e.description }}</span>
                  <span class="t-time">{{ e.timestamp | date:'MMM d, h:mm a' }}</span>
                </div>
                <span class="t-location">📍 {{ e.location }}</span>
              </div>
            </div>
            <div *ngIf="!shipment()!.trackingEvents.length" class="no-events">No events yet</div>
          </div>
        </div>

        <!-- Shipment Details -->
        <div class="details-section">
          <div class="detail-box">
            <span class="d-icon">📦</span>
            <span class="d-label">Weight</span>
            <span class="d-val">{{ shipment()!.weight }} kg</span>
          </div>
          <div class="detail-box">
            <span class="d-icon">🚀</span>
            <span class="d-label">Service</span>
            <span class="d-val">{{ shipment()!.shippingMethod }}</span>
          </div>
          <div class="detail-box" *ngIf="shipment()!.driverName">
            <span class="d-icon">👤</span>
            <span class="d-label">Driver</span>
            <span class="d-val">{{ shipment()!.driverName }}</span>
          </div>
          <div class="detail-box" *ngIf="shipment()!.vehicleName">
            <span class="d-icon">🚛</span>
            <span class="d-label">Vehicle</span>
            <span class="d-val">{{ shipment()!.vehicleName }}</span>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .track-page { min-height: 100vh; background: linear-gradient(135deg, #0f172a 0%, #1e3a5f 100%); padding: 48px 24px; display: flex; flex-direction: column; align-items: center; gap: 28px; font-family: 'Inter', sans-serif; }

    .track-header { text-align: center; color: white; }
    .brand { display: flex; align-items: center; justify-content: center; gap: 10px; margin-bottom: 24px; }
    .brand-icon { font-size: 32px; }
    .brand-name { font-size: 24px; font-weight: 700; color: #60a5fa; }
    .track-header h1 { font-size: 36px; font-weight: 700; margin: 0 0 8px; }
    .track-header p { font-size: 16px; color: #94a3b8; margin: 0; }

    .search-card { background: white; border-radius: 16px; padding: 24px; width: 100%; max-width: 600px; box-shadow: 0 20px 60px rgba(0,0,0,.3); }
    .search-row { display: flex; gap: 10px; }
    .track-input { flex: 1; border: 2px solid #e2e8f0; border-radius: 10px; padding: 12px 16px; font-size: 15px; outline: none; transition: border-color 0.2s; }
    .track-input:focus { border-color: #3b82f6; }
    .search-btn { background: #1d4ed8; color: white; border: none; padding: 12px 24px; border-radius: 10px; font-size: 15px; font-weight: 600; cursor: pointer; white-space: nowrap; }
    .search-btn:hover { background: #1e40af; }
    .demo-hint { margin: 10px 0 0; font-size: 13px; color: #94a3b8; }
    .demo-hint code { background: #f1f5f9; padding: 2px 6px; border-radius: 4px; color: #1d4ed8; }

    .not-found { background: white; border-radius: 16px; padding: 40px; text-align: center; width: 100%; max-width: 600px; }
    .not-found span { font-size: 40px; display: block; margin-bottom: 12px; }
    .not-found h3 { font-size: 18px; font-weight: 700; margin: 0 0 8px; }
    .not-found p { color: #64748b; margin: 0; }

    .result-card { background: white; border-radius: 16px; width: 100%; max-width: 680px; overflow: hidden; box-shadow: 0 20px 60px rgba(0,0,0,.3); }

    .status-banner { display: flex; align-items: center; gap: 16px; padding: 20px 24px; }
    .status-banner.intransit { background: #dbeafe; }
    .status-banner.delivered { background: #dcfce7; }
    .status-banner.pending { background: #f1f5f9; }
    .status-banner.failed { background: #fef2f2; }
    .banner-icon { font-size: 36px; }
    .banner-status { font-size: 20px; font-weight: 700; color: #0f172a; }
    .banner-sub { font-size: 13px; color: #64748b; }
    .banner-eta { margin-left: auto; text-align: right; }
    .eta-label { font-size: 11px; color: #64748b; display: block; }
    .eta-date { font-size: 15px; font-weight: 700; color: #0f172a; }

    .route-section { padding: 20px 24px; border-bottom: 1px solid #f1f5f9; }
    .route-ends { display: flex; align-items: center; gap: 16px; }
    .route-end { min-width: 100px; }
    .route-end.right { text-align: right; }
    .end-label { font-size: 10px; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.5px; }
    .end-city { font-size: 15px; font-weight: 700; color: #0f172a; }
    .route-progress-wrap { flex: 1; }
    .progress-bar { height: 6px; background: #e2e8f0; border-radius: 3px; position: relative; margin: 8px 0; }
    .progress-fill { height: 100%; background: #3b82f6; border-radius: 3px; }
    .progress-truck { position: absolute; top: -10px; font-size: 18px; transform: translateX(-50%); }

    .timeline-section { padding: 20px 24px; border-bottom: 1px solid #f1f5f9; }
    .timeline-section h3 { font-size: 14px; font-weight: 600; color: #0f172a; margin: 0 0 16px; }
    .timeline { display: flex; flex-direction: column; gap: 0; }
    .timeline-item { display: flex; gap: 14px; padding-bottom: 16px; position: relative; }
    .timeline-item:not(:last-child)::before { content: ''; position: absolute; left: 7px; top: 16px; bottom: 0; width: 2px; background: #e2e8f0; }
    .timeline-item.current .t-dot { background: #3b82f6; box-shadow: 0 0 0 3px #bfdbfe; }
    .t-dot { width: 16px; height: 16px; border-radius: 50%; background: #e2e8f0; flex-shrink: 0; margin-top: 2px; border: 2px solid white; }
    .t-dot.active { background: #3b82f6; box-shadow: 0 0 0 3px #bfdbfe; }
    .t-header { display: flex; justify-content: space-between; gap: 8px; margin-bottom: 2px; }
    .t-event { font-size: 14px; font-weight: 500; color: #0f172a; }
    .t-time { font-size: 12px; color: #94a3b8; white-space: nowrap; }
    .t-location { font-size: 13px; color: #3b82f6; }
    .no-events { color: #94a3b8; font-size: 14px; text-align: center; padding: 16px 0; }

    .details-section { display: grid; grid-template-columns: repeat(auto-fit, minmax(130px, 1fr)); gap: 1px; background: #f1f5f9; border-top: 1px solid #f1f5f9; }
    .detail-box { background: white; padding: 16px; display: flex; flex-direction: column; align-items: center; gap: 4px; }
    .d-icon { font-size: 20px; }
    .d-label { font-size: 11px; color: #94a3b8; text-transform: uppercase; }
    .d-val { font-size: 14px; font-weight: 600; color: #0f172a; text-align: center; }
  `]
})
export class PublicTrackingComponent implements OnInit {
  private api = inject(ShipmentApiService);
  trackingNumber = input<string>('');

  searchInput = '';
  lastSearched = '';
  shipment = signal<Shipment | null>(null);
  notFound = signal(false);

  ngOnInit() {
    if (this.trackingNumber()) {
      this.searchInput = this.trackingNumber();
      this.search();
    }
  }

  search() {
    if (!this.searchInput.trim()) return;
    this.lastSearched = this.searchInput.trim();
    this.notFound.set(false);
    this.shipment.set(null);

    this.api.track(this.lastSearched).subscribe({
      next: s => this.shipment.set(s),
      error: () => {
        // Demo: show mock data for any input
        this.shipment.set({
          id: '1', trackingNumber: this.lastSearched,
          origin: 'New Delhi', destination: 'Chennai',
          status: 'InTransit', shippingMethod: 'Standard',
          weight: 120, customerName: 'Customer',
          driverName: 'Jimmy Dente', vehicleName: 'PeterBit 500',
          estimatedDelivery: new Date(Date.now() + 3 * 86400000).toISOString(),
          createdAt: new Date(Date.now() - 2 * 86400000).toISOString(),
          trackingEvents: [
            { id: '1', timestamp: new Date(Date.now() - 2 * 86400000).toISOString(), latitude: 28.6, longitude: 77.2, location: 'New Delhi, DL', description: 'Shipment created', status: 'Pending' },
            { id: '2', timestamp: new Date(Date.now() - 86400000).toISOString(), latitude: 26.8, longitude: 80.9, location: 'Lucknow, UP', description: 'In transit via Lucknow hub', status: 'InTransit' },
            { id: '3', timestamp: new Date().toISOString(), latitude: 21.14, longitude: 79.08, location: 'Nagpur, MH', description: 'Package scanned at Nagpur sorting facility', status: 'InTransit' },
          ]
        });
      }
    });
  }

  getBannerClass(status: string): string {
    const m: Record<string, string> = { InTransit: 'intransit', Delivered: 'delivered', Pending: 'pending', Failed: 'failed' };
    return m[status] ?? 'pending';
  }

  getStatusIcon(status: string): string {
    const m: Record<string, string> = { InTransit: '🚛', Delivered: '✅', Pending: '📋', PickupReady: '👍', Failed: '⚠️', Cancelled: '❌' };
    return m[status] ?? '📦';
  }

  getProgress(): number {
    const m: Record<string, number> = { Pending: 5, PickupReady: 10, PickedUp: 25, InTransit: 60, OutForDelivery: 85, Delivered: 100, Failed: 60 };
    return m[this.shipment()?.status ?? 'Pending'] ?? 0;
  }
}
