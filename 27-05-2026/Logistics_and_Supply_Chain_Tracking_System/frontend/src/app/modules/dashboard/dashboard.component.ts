// src/app/modules/dashboard/dashboard.component.ts
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AnalyticsApiService } from '../../core/services/api.service';
import { DashboardSummary } from '../../core/models/models';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="dashboard">
      <div class="page-header">
        <div>
          <h2>Overview</h2>
          <p>Welcome back! Here's what's happening with your fleet.</p>
        </div>
        <button class="btn-primary" routerLink="/shipments">+ Create Shipment</button>
      </div>

      <!-- KPI Cards -->
      <div class="kpi-grid" *ngIf="summary">
        <div class="kpi-card">
          <div class="kpi-icon orders">📋</div>
          <div class="kpi-info">
            <span class="kpi-label">Total Orders</span>
            <span class="kpi-value">{{ summary.totalOrders | number }}</span>
            <span class="kpi-change negative">▼ 7.82%</span>
          </div>
        </div>
        <div class="kpi-card">
          <div class="kpi-icon pickup">👍</div>
          <div class="kpi-info">
            <span class="kpi-label">Pickup Ready</span>
            <span class="kpi-value">{{ summary.pickupReady }}</span>
            <span class="kpi-change positive">▲ Ready</span>
          </div>
        </div>
        <div class="kpi-card">
          <div class="kpi-icon transit">🚛</div>
          <div class="kpi-info">
            <span class="kpi-label">In Transit</span>
            <span class="kpi-value">{{ summary.inTransit }}</span>
            <span class="kpi-change neutral">● Live</span>
          </div>
        </div>
        <div class="kpi-card">
          <div class="kpi-icon delivered">✅</div>
          <div class="kpi-info">
            <span class="kpi-label">Delivered</span>
            <span class="kpi-value">{{ summary.delivered }}</span>
            <span class="kpi-change positive">▲ 12.4%</span>
          </div>
        </div>
      </div>

      <!-- Loading state -->
      <div *ngIf="!summary" class="loading">
        <div class="spinner"></div>
        <span>Loading dashboard...</span>
      </div>

      <!-- Charts Row -->
      <div class="charts-row" *ngIf="summary">
        <!-- Order Trend -->
        <div class="chart-card large">
          <div class="card-header">
            <h3>Total Orders</h3>
            <span class="badge">Monthly</span>
          </div>
          <div class="bar-chart">
            <div *ngFor="let pt of summary.orderTrend.slice(0, 30)" class="bar-wrap">
              <div class="bar" [style.height.%]="(pt.value / 500) * 100"></div>
            </div>
          </div>
        </div>

        <!-- Shipping Methods -->
        <div class="chart-card">
          <div class="card-header"><h3>Shipping Method</h3></div>
          <div class="donut-chart">
            <div class="donut-center">{{ summary.inTransit }}</div>
          </div>
          <div class="legend">
            <div *ngFor="let m of summary.shippingMethods" class="legend-item">
              <span class="dot" [class]="m.method.toLowerCase()"></span>
              <span>{{ m.method }}</span>
              <strong>{{ m.percentage }}%</strong>
            </div>
          </div>
        </div>
      </div>

      <!-- Fleet Status + Recent Deliveries -->
      <div class="bottom-row" *ngIf="summary">
        <div class="chart-card">
          <div class="card-header"><h3>Fleet Status</h3></div>
          <div class="fleet-gauge">
            <div class="gauge-value">{{ summary.totalVehicles }}</div>
            <div class="gauge-label">Total Fleet</div>
          </div>
          <div class="fleet-breakdown">
            <div class="fleet-item">
              <span class="dot active"></span>
              <span>In the Move</span>
              <strong>{{ summary.activeVehicles }}</strong>
            </div>
            <div class="fleet-item">
              <span class="dot maintenance"></span>
              <span>In Maintenance</span>
              <strong>{{ summary.inMaintenanceVehicles }}</strong>
            </div>
          </div>
        </div>

        <div class="chart-card large">
          <div class="card-header">
            <h3>Recent Delivered Orders</h3>
            <input type="text" placeholder="Search..." class="search-mini" />
          </div>
          <table class="data-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Destination</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let d of summary.recentDeliveries">
                <td class="link">{{ d.trackingNumber }}</td>
                <td>{{ d.customerName }}</td>
                <td>{{ d.destination }}</td>
                <td>{{ d.deliveredAt | date:'shortTime' }}</td>
              </tr>
              <tr *ngIf="!summary.recentDeliveries.length">
                <td colspan="4" style="text-align:center;color:#94a3b8">No recent deliveries</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .dashboard { display: flex; flex-direction: column; gap: 24px; }
    .page-header { display: flex; justify-content: space-between; align-items: flex-start; }
    .page-header h2 { font-size: 24px; font-weight: 700; color: #0f172a; margin: 0 0 4px; }
    .page-header p { color: #64748b; margin: 0; font-size: 14px; }
    .btn-primary {
      background: #1d4ed8; color: white; border: none; padding: 10px 20px;
      border-radius: 8px; font-size: 14px; font-weight: 600; cursor: pointer;
    }

    .kpi-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }
    .kpi-card {
      background: white; border-radius: 12px; padding: 20px;
      display: flex; align-items: center; gap: 16px;
      box-shadow: 0 1px 4px rgba(0,0,0,.06);
    }
    .kpi-icon { font-size: 28px; width: 52px; height: 52px; border-radius: 12px;
      display: flex; align-items: center; justify-content: center; }
    .kpi-icon.orders { background: #eff6ff; }
    .kpi-icon.pickup { background: #fefce8; }
    .kpi-icon.transit { background: #fef2f2; }
    .kpi-icon.delivered { background: #f0fdf4; }
    .kpi-info { display: flex; flex-direction: column; }
    .kpi-label { font-size: 12px; color: #64748b; margin-bottom: 4px; }
    .kpi-value { font-size: 28px; font-weight: 700; color: #0f172a; }
    .kpi-change { font-size: 12px; margin-top: 2px; }
    .positive { color: #16a34a; }
    .negative { color: #dc2626; }
    .neutral { color: #3b82f6; }

    .loading { display: flex; align-items: center; gap: 12px; justify-content: center; padding: 60px; color: #64748b; }
    .spinner { width: 24px; height: 24px; border: 3px solid #e2e8f0; border-top-color: #3b82f6; border-radius: 50%; animation: spin 0.8s linear infinite; }
    @keyframes spin { to { transform: rotate(360deg); } }

    .charts-row, .bottom-row { display: grid; grid-template-columns: 2fr 1fr; gap: 16px; }
    .chart-card {
      background: white; border-radius: 12px; padding: 20px;
      box-shadow: 0 1px 4px rgba(0,0,0,.06);
    }
    .chart-card.large { grid-column: span 1; }
    .card-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; }
    .card-header h3 { font-size: 14px; font-weight: 600; color: #0f172a; margin: 0; }
    .badge { background: #eff6ff; color: #1d4ed8; font-size: 12px; padding: 2px 8px; border-radius: 4px; }

    .bar-chart { display: flex; align-items: flex-end; gap: 3px; height: 180px; }
    .bar-wrap { flex: 1; display: flex; align-items: flex-end; height: 100%; }
    .bar { width: 100%; background: #3b82f6; border-radius: 3px 3px 0 0; min-height: 4px; transition: height 0.5s; }

    .donut-chart {
      width: 140px; height: 140px; border-radius: 50%;
      background: conic-gradient(#1d4ed8 0% 76%, #f59e0b 76% 96%, #a78bfa 96%);
      margin: 16px auto; display: flex; align-items: center; justify-content: center;
      position: relative;
    }
    .donut-center {
      width: 90px; height: 90px; background: white; border-radius: 50%;
      display: flex; align-items: center; justify-content: center;
      font-size: 24px; font-weight: 700; color: #0f172a;
    }
    .legend { display: flex; flex-direction: column; gap: 8px; }
    .legend-item { display: flex; align-items: center; gap: 8px; font-size: 13px; color: #64748b; }
    .legend-item strong { margin-left: auto; color: #0f172a; }
    .dot { width: 8px; height: 8px; border-radius: 50%; }
    .dot.standard, .dot.active { background: #1d4ed8; }
    .dot.fast { background: #f59e0b; }
    .dot.express { background: #a78bfa; }
    .dot.maintenance { background: #f59e0b; }

    .fleet-gauge { text-align: center; padding: 16px 0; }
    .gauge-value { font-size: 40px; font-weight: 700; color: #0f172a; }
    .gauge-label { font-size: 13px; color: #64748b; }
    .fleet-breakdown { display: flex; flex-direction: column; gap: 8px; margin-top: 12px; }
    .fleet-item { display: flex; align-items: center; gap: 8px; font-size: 13px; color: #64748b; }
    .fleet-item strong { margin-left: auto; color: #0f172a; }

    .search-mini {
      border: 1px solid #e2e8f0; border-radius: 6px; padding: 6px 12px;
      font-size: 13px; outline: none; width: 160px;
    }

    .data-table { width: 100%; border-collapse: collapse; font-size: 13px; }
    .data-table th { text-align: left; padding: 8px 0; border-bottom: 1px solid #f1f5f9; color: #94a3b8; font-weight: 500; }
    .data-table td { padding: 10px 0; border-bottom: 1px solid #f8fafc; color: #374151; }
    .data-table .link { color: #1d4ed8; cursor: pointer; }
  `]
})
export class DashboardComponent implements OnInit {
  private analytics = inject(AnalyticsApiService);
  summary: DashboardSummary | null = null;

  ngOnInit() {
    this.analytics.getDashboard().subscribe({
      next: data => this.summary = data,
      error: () => {
        // Demo fallback when backend isn't running
        this.summary = {
          totalOrders: 2367,
          pickupReady: 48,
          inTransit: 112,
          delivered: 432,
          totalVehicles: 96,
          activeVehicles: 82,
          inMaintenanceVehicles: 14,
          availableDrivers: 24,
          totalRevenue: 0,
          orderTrend: Array.from({ length: 30 }, (_, i) => ({ label: String(i + 1), value: Math.random() * 400 + 100 })),
          shippingMethods: [
            { method: 'Standard', count: 380, percentage: 76 },
            { method: 'Fast', count: 410, percentage: 82 },
            { method: 'Express', count: 340, percentage: 68 },
          ],
          recentDeliveries: [
            { trackingNumber: '#19949062930768', customerName: 'Compass East Corp', destination: 'Mudichur, CHN', deliveredAt: new Date().toISOString() },
            { trackingNumber: '#19949065628573', customerName: 'Cyberdyne Industries', destination: 'Indira Nagar, BLR', deliveredAt: new Date().toISOString() },
            { trackingNumber: '#19949068727406', customerName: 'DHL Logistics', destination: 'Gandhi Nagar, CBR', deliveredAt: new Date().toISOString() },
          ]
        };
      }
    });
  }
}
