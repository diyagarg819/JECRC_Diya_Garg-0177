// src/app/modules/shipments/shipments-list/shipments-list.component.ts
import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ShipmentApiService } from '../../../core/services/api.service';
import { Shipment, PagedResult } from '../../../core/models/models';

@Component({
  selector: 'app-shipments-list',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  template: `
    <div class="shipments-page">
      <div class="page-header">
        <div>
          <h2>Shipments</h2>
          <p>Manage and track all your shipments</p>
        </div>
        <button class="btn-primary">+ New Shipment</button>
      </div>

      <!-- Filters -->
      <div class="filters-bar">
        <div class="search-box">
          <span>🔍</span>
          <input [(ngModel)]="searchTerm" placeholder="Search by tracking number, customer..." />
        </div>
        <div class="filter-chips">
          <button *ngFor="let s of statusFilters"
                  [class.active]="activeStatus() === s.value"
                  (click)="filterByStatus(s.value)"
                  class="chip">{{ s.label }}</button>
        </div>
      </div>

      <!-- Loading -->
      <div *ngIf="loading()" class="loading-state">
        <div class="spinner"></div> Loading shipments...
      </div>

      <!-- Table -->
      <div class="table-card" *ngIf="!loading()">
        <table class="data-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Route</th>
              <th>Driver / Vehicle</th>
              <th>Shipping Method</th>
              <th>ETA</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let s of shipments">
              <td>
                <a [routerLink]="['/shipments', s.id]" class="tracking-link">{{ s.trackingNumber }}</a>
              </td>
              <td>{{ s.customerName || '—' }}</td>
              <td>
                <span class="route-text">{{ s.origin }} → {{ s.destination }}</span>
              </td>
              <td>
                <div *ngIf="s.driverName">{{ s.driverName }}</div>
                <div class="sub-text" *ngIf="s.vehicleName">{{ s.vehicleName }}</div>
                <span *ngIf="!s.driverName" class="unassigned">Unassigned</span>
              </td>
              <td>{{ s.shippingMethod }}</td>
              <td>{{ s.estimatedDelivery ? (s.estimatedDelivery | date:'MMM d') : '—' }}</td>
              <td>
                <span class="status-badge" [class]="getStatusClass(s.status)">{{ s.status }}</span>
              </td>
              <td>
                <button class="action-btn" title="More options">⋯</button>
              </td>
            </tr>
            <tr *ngIf="shipments.length === 0">
              <td colspan="8" class="empty-state">No shipments found</td>
            </tr>
          </tbody>
        </table>

        <!-- Pagination -->
        <div class="pagination" *ngIf="result">
          <span class="page-info">Showing {{ shipments.length }} of {{ result.totalCount }}</span>
          <div class="page-controls">
            <button [disabled]="currentPage() === 1" (click)="changePage(currentPage() - 1)">‹</button>
            <button *ngFor="let p of pages" [class.active]="p === currentPage()" (click)="changePage(p)">{{ p }}</button>
            <button [disabled]="currentPage() === result.totalPages" (click)="changePage(currentPage() + 1)">›</button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .shipments-page { display: flex; flex-direction: column; gap: 20px; }
    .page-header { display: flex; justify-content: space-between; align-items: flex-start; }
    .page-header h2 { font-size: 22px; font-weight: 700; margin: 0 0 4px; }
    .page-header p { color: #64748b; margin: 0; font-size: 14px; }
    .btn-primary { background: #1d4ed8; color: white; border: none; padding: 10px 20px; border-radius: 8px; font-weight: 600; cursor: pointer; }

    .filters-bar { display: flex; gap: 16px; align-items: center; }
    .search-box { display: flex; align-items: center; gap: 8px; background: white; border: 1px solid #e2e8f0; border-radius: 8px; padding: 8px 12px; flex: 1; max-width: 400px; }
    .search-box input { border: none; outline: none; flex: 1; font-size: 14px; }
    .filter-chips { display: flex; gap: 8px; }
    .chip { padding: 6px 14px; border: 1px solid #e2e8f0; border-radius: 20px; background: white; cursor: pointer; font-size: 13px; color: #64748b; }
    .chip.active { background: #1d4ed8; color: white; border-color: #1d4ed8; }

    .loading-state { display: flex; align-items: center; gap: 12px; padding: 40px; justify-content: center; color: #64748b; }
    .spinner { width: 20px; height: 20px; border: 2px solid #e2e8f0; border-top-color: #3b82f6; border-radius: 50%; animation: spin 0.8s linear infinite; }
    @keyframes spin { to { transform: rotate(360deg); } }

    .table-card { background: white; border-radius: 12px; box-shadow: 0 1px 4px rgba(0,0,0,.06); overflow: hidden; }
    .data-table { width: 100%; border-collapse: collapse; font-size: 14px; }
    .data-table th { text-align: left; padding: 12px 16px; background: #f8fafc; color: #64748b; font-weight: 500; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; border-bottom: 1px solid #f1f5f9; }
    .data-table td { padding: 14px 16px; border-bottom: 1px solid #f8fafc; color: #374151; vertical-align: middle; }
    .data-table tr:hover td { background: #fafafa; }

    .tracking-link { color: #1d4ed8; text-decoration: none; font-weight: 600; }
    .route-text { color: #374151; }
    .sub-text { font-size: 12px; color: #94a3b8; margin-top: 2px; }
    .unassigned { color: #94a3b8; font-style: italic; }
    .empty-state { text-align: center; color: #94a3b8; padding: 40px !important; }
    .action-btn { background: none; border: none; cursor: pointer; font-size: 18px; color: #94a3b8; }

    .status-badge { padding: 4px 10px; border-radius: 20px; font-size: 12px; font-weight: 500; }
    .status-intransit { background: #dbeafe; color: #1d4ed8; }
    .status-delivered { background: #dcfce7; color: #16a34a; }
    .status-pending { background: #f1f5f9; color: #64748b; }
    .status-delayed { background: #fef2f2; color: #dc2626; }
    .status-pickupready { background: #fefce8; color: #ca8a04; }
    .status-cancelled { background: #fef2f2; color: #dc2626; }

    .pagination { display: flex; justify-content: space-between; align-items: center; padding: 16px 20px; border-top: 1px solid #f1f5f9; }
    .page-info { font-size: 13px; color: #64748b; }
    .page-controls { display: flex; gap: 4px; }
    .page-controls button { width: 32px; height: 32px; border: 1px solid #e2e8f0; background: white; border-radius: 6px; cursor: pointer; font-size: 14px; }
    .page-controls button.active { background: #1d4ed8; color: white; border-color: #1d4ed8; }
    .page-controls button:disabled { opacity: 0.4; cursor: not-allowed; }
  `]
})
export class ShipmentsListComponent implements OnInit {
  private api = inject(ShipmentApiService);

  shipments: Shipment[] = [];
  result: PagedResult<Shipment> | null = null;
  loading = signal(true);
  currentPage = signal(1);
  activeStatus = signal<string>('');
  searchTerm = '';

  statusFilters = [
    { label: 'All', value: '' },
    { label: 'In Transit', value: 'InTransit' },
    { label: 'Pickup Ready', value: 'PickupReady' },
    { label: 'Delivered', value: 'Delivered' },
    { label: 'Delayed', value: 'Failed' },
  ];

  get pages(): number[] {
    if (!this.result) return [];
    return Array.from({ length: Math.min(this.result.totalPages, 5) }, (_, i) => i + 1);
  }

  ngOnInit() { this.load(); }

  load() {
    this.loading.set(true);
    this.api.getAll(this.currentPage(), 20, this.activeStatus() || undefined).subscribe({
      next: result => {
        this.result = result;
        this.shipments = result.items;
        this.loading.set(false);
      },
      error: () => {
        // Demo data when backend isn't available
        this.shipments = this.getDemoShipments();
        this.loading.set(false);
      }
    });
  }

  filterByStatus(status: string) {
    this.activeStatus.set(status);
    this.currentPage.set(1);
    this.load();
  }

  changePage(page: number) {
    this.currentPage.set(page);
    this.load();
  }

  getStatusClass(status: string): string {
    const map: Record<string, string> = {
      InTransit: 'status-intransit',
      Delivered: 'status-delivered',
      Pending: 'status-pending',
      Failed: 'status-delayed',
      PickupReady: 'status-pickupready',
      Cancelled: 'status-cancelled',
    };
    return map[status] ?? 'status-pending';
  }

  private getDemoShipments(): Shipment[] {
    return [
      { id: '1', trackingNumber: '#19949062930768', origin: 'Delhi', destination: 'Chennai', status: 'InTransit', shippingMethod: 'Standard', weight: 120, customerName: 'Compass East Corp.', driverName: 'Jimmy Dente', vehicleName: 'PeterBit 500', estimatedDelivery: '2024-07-26', createdAt: new Date().toISOString(), trackingEvents: [] },
      { id: '2', trackingNumber: '#03234614845123', origin: 'Gurgaon', destination: 'Bangalore', status: 'Delivered', shippingMethod: 'Standard', weight: 80, customerName: 'Cyberdyne Industries', driverName: 'Maria Santos', vehicleName: 'Box Truck', estimatedDelivery: '2024-07-26', createdAt: new Date().toISOString(), trackingEvents: [] },
      { id: '3', trackingNumber: '#19949065628573', origin: 'Mumbai', destination: 'Pune', status: 'PickupReady', shippingMethod: 'Express', weight: 45, customerName: 'DHL Logistics', driverName: null!, vehicleName: null!, estimatedDelivery: '2024-07-27', createdAt: new Date().toISOString(), trackingEvents: [] },
      { id: '4', trackingNumber: '#19949068727406', origin: 'Hyderabad', destination: 'Chennai', status: 'Pending', shippingMethod: 'Fast', weight: 200, customerName: 'Amazon India', driverName: null!, vehicleName: null!, estimatedDelivery: '2024-07-28', createdAt: new Date().toISOString(), trackingEvents: [] },
    ];
  }
}
