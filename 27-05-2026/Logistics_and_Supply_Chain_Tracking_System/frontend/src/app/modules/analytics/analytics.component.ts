// src/app/modules/analytics/analytics.component.ts
import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AnalyticsApiService } from '../../core/services/api.service';
import { ChartDataPoint } from '../../core/models/models';

@Component({
  selector: 'app-analytics',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="analytics-page">
      <div class="page-header">
        <div>
          <h2>Analytics & Reporting</h2>
          <p>Performance insights, delivery trends, and operational KPIs</p>
        </div>
        <div class="header-actions">
          <select [(ngModel)]="selectedPeriod" (change)="loadAll()" class="period-select">
            <option value="7">Last 7 Days</option>
            <option value="30">Last 30 Days</option>
            <option value="90">Last 90 Days</option>
          </select>
          <button class="btn-export">📥 Export Report</button>
        </div>
      </div>

      <!-- KPI Row -->
      <div class="kpi-row">
        <div class="kpi-card" *ngFor="let k of kpiCards">
          <div class="kpi-top">
            <span class="kpi-label">{{ k.label }}</span>
            <span class="kpi-icon">{{ k.icon }}</span>
          </div>
          <div class="kpi-value">{{ k.value }}</div>
          <div class="kpi-trend" [class.up]="k.trendUp" [class.down]="!k.trendUp">
            {{ k.trendUp ? '▲' : '▼' }} {{ k.trend }}
          </div>
        </div>
      </div>

      <!-- Charts Row 1 -->
      <div class="charts-row">
        <!-- Delivery Trend -->
        <div class="chart-card wide">
          <div class="card-header">
            <h3>Delivery Trend</h3>
            <div class="legend-row">
              <span class="legend-dot blue"></span><span>Delivered</span>
              <span class="legend-dot orange"></span><span>Delayed</span>
            </div>
          </div>
          <div class="line-chart" *ngIf="deliveryTrend().length">
            <div class="y-axis">
              <span *ngFor="let y of yAxis">{{ y }}</span>
            </div>
            <div class="chart-area">
              <svg width="100%" height="180" viewBox="0 0 600 180" preserveAspectRatio="none">
                <polyline
                  [attr.points]="getPolylinePoints(deliveryTrend(), 600, 180)"
                  fill="none" stroke="#3b82f6" stroke-width="2.5" stroke-linejoin="round"/>
                <polyline
                  [attr.points]="getPolylinePoints(delayedTrend(), 600, 180)"
                  fill="none" stroke="#f59e0b" stroke-width="2" stroke-linejoin="round" stroke-dasharray="6,3"/>
              </svg>
            </div>
          </div>
          <div class="x-labels">
            <span *ngFor="let l of deliveryTrend().filter((_, i) => i % 5 === 0)">{{ l.label }}</span>
          </div>
        </div>

        <!-- Revenue by Month -->
        <div class="chart-card">
          <div class="card-header"><h3>Monthly Revenue</h3></div>
          <div class="bar-chart-v" *ngIf="revenueTrend().length">
            <div *ngFor="let r of revenueTrend().slice(-6)" class="bar-col">
              <div class="bar-label-top">₹{{ (r.value / 1000).toFixed(0) }}k</div>
              <div class="bar-fill" [style.height.%]="(r.value / maxRevenue()) * 80"></div>
              <div class="bar-label">{{ getMonthLabel(+r.label) }}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Charts Row 2 -->
      <div class="charts-row">
        <!-- Fuel Consumption -->
        <div class="chart-card">
          <div class="card-header">
            <h3>Fuel Consumption</h3>
            <span class="badge green">–8.2% vs last period</span>
          </div>
          <div class="area-chart" *ngIf="fuelTrend().length">
            <svg width="100%" height="140" viewBox="0 0 400 140" preserveAspectRatio="none">
              <defs>
                <linearGradient id="fuelGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stop-color="#3b82f6" stop-opacity="0.3"/>
                  <stop offset="100%" stop-color="#3b82f6" stop-opacity="0"/>
                </linearGradient>
              </defs>
              <polygon
                [attr.points]="getAreaPoints(fuelTrend(), 400, 140)"
                fill="url(#fuelGrad)"/>
              <polyline
                [attr.points]="getPolylinePoints(fuelTrend(), 400, 140)"
                fill="none" stroke="#3b82f6" stroke-width="2"/>
            </svg>
          </div>
        </div>

        <!-- Performance Metrics -->
        <div class="chart-card">
          <div class="card-header"><h3>Performance Metrics</h3></div>
          <div class="metrics-list">
            <div *ngFor="let m of perfMetrics" class="metric-row">
              <div class="metric-info">
                <span class="metric-name">{{ m.name }}</span>
                <span class="metric-value">{{ m.value }}</span>
              </div>
              <div class="metric-bar">
                <div class="metric-fill" [style.width.%]="m.pct" [style.background]="m.color"></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Top Routes -->
        <div class="chart-card">
          <div class="card-header"><h3>Top Routes</h3></div>
          <div class="routes-list">
            <div *ngFor="let r of topRoutes; let i = index" class="top-route">
              <span class="route-rank">{{ i + 1 }}</span>
              <div class="route-info">
                <span class="route-name">{{ r.route }}</span>
                <span class="route-sub">{{ r.trips }} trips · {{ r.distance }}</span>
              </div>
              <span class="route-pct" [style.color]="r.color">{{ r.pct }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Summary Table -->
      <div class="table-card">
        <div class="card-header" style="padding: 16px 20px;">
          <h3>Driver Performance Summary</h3>
          <input type="text" placeholder="Search drivers..." class="search-mini" />
        </div>
        <table class="data-table">
          <thead>
            <tr>
              <th>Driver</th>
              <th>Trips Completed</th>
              <th>On-Time %</th>
              <th>Avg Speed</th>
              <th>Fuel Efficiency</th>
              <th>Rating</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let d of driverPerf">
              <td>
                <div class="driver-cell">
                  <div class="avatar">{{ d.initials }}</div>
                  <div>
                    <div class="driver-name">{{ d.name }}</div>
                    <div class="driver-vehicle">{{ d.vehicle }}</div>
                  </div>
                </div>
              </td>
              <td><strong>{{ d.trips }}</strong></td>
              <td>
                <div class="on-time-bar">
                  <div class="on-time-fill" [style.width.%]="d.onTime"></div>
                </div>
                <span class="on-time-pct">{{ d.onTime }}%</span>
              </td>
              <td>{{ d.avgSpeed }} km/h</td>
              <td>{{ d.fuelEff }} km/l</td>
              <td>
                <span class="stars">{{ getStars(d.rating) }}</span>
                <span class="rating-num">{{ d.rating }}</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `,
  styles: [`
    .analytics-page { display: flex; flex-direction: column; gap: 20px; }
    .page-header { display: flex; justify-content: space-between; align-items: flex-start; }
    .page-header h2 { font-size: 22px; font-weight: 700; margin: 0 0 4px; }
    .page-header p { color: #64748b; margin: 0; font-size: 14px; }
    .header-actions { display: flex; gap: 10px; align-items: center; }
    .period-select { border: 1px solid #e2e8f0; border-radius: 8px; padding: 8px 12px; font-size: 14px; outline: none; background: white; cursor: pointer; }
    .btn-export { background: white; border: 1px solid #e2e8f0; color: #374151; padding: 8px 16px; border-radius: 8px; font-size: 14px; cursor: pointer; font-weight: 500; }

    .kpi-row { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }
    .kpi-card { background: white; border-radius: 12px; padding: 20px; box-shadow: 0 1px 4px rgba(0,0,0,.06); }
    .kpi-top { display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; }
    .kpi-label { font-size: 12px; color: #64748b; font-weight: 500; }
    .kpi-icon { font-size: 20px; }
    .kpi-value { font-size: 28px; font-weight: 700; color: #0f172a; margin-bottom: 6px; }
    .kpi-trend { font-size: 13px; }
    .kpi-trend.up { color: #16a34a; }
    .kpi-trend.down { color: #dc2626; }

    .charts-row { display: grid; grid-template-columns: 2fr 1fr; gap: 16px; }
    .chart-card { background: white; border-radius: 12px; padding: 20px; box-shadow: 0 1px 4px rgba(0,0,0,.06); }
    .chart-card.wide { grid-column: span 1; }
    .card-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; }
    .card-header h3 { font-size: 14px; font-weight: 600; color: #0f172a; margin: 0; }
    .legend-row { display: flex; align-items: center; gap: 12px; font-size: 13px; color: #64748b; }
    .legend-dot { width: 10px; height: 10px; border-radius: 50%; }
    .legend-dot.blue { background: #3b82f6; }
    .legend-dot.orange { background: #f59e0b; }
    .badge { padding: 3px 10px; border-radius: 12px; font-size: 12px; font-weight: 500; }
    .badge.green { background: #dcfce7; color: #16a34a; }

    .line-chart { display: flex; gap: 8px; height: 180px; }
    .y-axis { display: flex; flex-direction: column; justify-content: space-between; font-size: 11px; color: #94a3b8; text-align: right; width: 30px; }
    .chart-area { flex: 1; border-bottom: 1px solid #f1f5f9; }
    .chart-area svg { display: block; }
    .x-labels { display: flex; justify-content: space-around; font-size: 11px; color: #94a3b8; margin-top: 4px; padding-left: 38px; }

    .bar-chart-v { display: flex; align-items: flex-end; gap: 8px; height: 180px; padding-top: 24px; }
    .bar-col { flex: 1; display: flex; flex-direction: column; align-items: center; gap: 4px; height: 100%; }
    .bar-label-top { font-size: 10px; color: #64748b; }
    .bar-fill { width: 100%; background: linear-gradient(180deg, #3b82f6 0%, #1d4ed8 100%); border-radius: 4px 4px 0 0; min-height: 4px; }
    .bar-label { font-size: 11px; color: #94a3b8; }

    .area-chart svg { display: block; }

    .metrics-list { display: flex; flex-direction: column; gap: 14px; }
    .metric-row { display: flex; flex-direction: column; gap: 6px; }
    .metric-info { display: flex; justify-content: space-between; font-size: 13px; }
    .metric-name { color: #374151; }
    .metric-value { font-weight: 600; color: #0f172a; }
    .metric-bar { height: 6px; background: #f1f5f9; border-radius: 3px; overflow: hidden; }
    .metric-fill { height: 100%; border-radius: 3px; transition: width 0.6s; }

    .routes-list { display: flex; flex-direction: column; gap: 10px; }
    .top-route { display: flex; align-items: center; gap: 12px; }
    .route-rank { width: 24px; height: 24px; background: #eff6ff; color: #1d4ed8; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 700; flex-shrink: 0; }
    .route-info { flex: 1; }
    .route-name { font-size: 13px; font-weight: 600; display: block; }
    .route-sub { font-size: 11px; color: #94a3b8; }
    .route-pct { font-size: 14px; font-weight: 700; }

    .table-card { background: white; border-radius: 12px; box-shadow: 0 1px 4px rgba(0,0,0,.06); overflow: hidden; }
    .table-card .card-header { border-bottom: 1px solid #f1f5f9; }
    .table-card .card-header h3 { margin: 0; font-size: 14px; font-weight: 600; }
    .search-mini { border: 1px solid #e2e8f0; border-radius: 6px; padding: 6px 12px; font-size: 13px; outline: none; }
    .data-table { width: 100%; border-collapse: collapse; font-size: 14px; }
    .data-table th { text-align: left; padding: 12px 20px; background: #f8fafc; color: #64748b; font-size: 12px; font-weight: 500; text-transform: uppercase; border-bottom: 1px solid #f1f5f9; }
    .data-table td { padding: 14px 20px; border-bottom: 1px solid #f8fafc; color: #374151; }

    .driver-cell { display: flex; align-items: center; gap: 10px; }
    .avatar { width: 36px; height: 36px; border-radius: 50%; background: #1d4ed8; color: white; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 700; flex-shrink: 0; }
    .driver-name { font-size: 14px; font-weight: 600; color: #0f172a; }
    .driver-vehicle { font-size: 12px; color: #94a3b8; }
    .on-time-bar { height: 4px; background: #f1f5f9; border-radius: 2px; overflow: hidden; width: 80px; display: inline-block; margin-right: 8px; vertical-align: middle; }
    .on-time-fill { height: 100%; background: #16a34a; border-radius: 2px; }
    .on-time-pct { font-size: 13px; font-weight: 600; }
    .stars { color: #f59e0b; margin-right: 4px; }
    .rating-num { font-weight: 600; }
  `]
})
export class AnalyticsComponent implements OnInit {
  private api = inject(AnalyticsApiService);

  deliveryTrend = signal<ChartDataPoint[]>([]);
  delayedTrend = signal<ChartDataPoint[]>([]);
  revenueTrend = signal<ChartDataPoint[]>([]);
  fuelTrend = signal<ChartDataPoint[]>([]);
  selectedPeriod = '30';

  yAxis = ['400', '300', '200', '100', '0'];

  kpiCards = [
    { label: 'On-Time Delivery', icon: '✅', value: '94.2%', trend: '2.1% vs last period', trendUp: true },
    { label: 'Avg Delivery Time', icon: '⏱', value: '2.4 days', trend: '0.3 days faster', trendUp: true },
    { label: 'Fleet Utilization', icon: '🚛', value: '84%', trend: '3% vs last period', trendUp: false },
    { label: 'Customer Satisfaction', icon: '⭐', value: '4.7 / 5', trend: '0.2 pts', trendUp: true },
  ];

  perfMetrics = [
    { name: 'Vehicle Load Rate', value: '84%', pct: 84, color: '#3b82f6' },
    { name: 'Weekly Fuel Usage', value: '9,250 L', pct: 72, color: '#f59e0b' },
    { name: 'Avg Driving Speed', value: '67 km/h', pct: 67, color: '#16a34a' },
    { name: 'Cargo Volume', value: '1,920 tons', pct: 80, color: '#8b5cf6' },
    { name: 'Vehicles in Maintenance', value: '7 units', pct: 15, color: '#ef4444' },
  ];

  topRoutes = [
    { route: 'Delhi → Mumbai', trips: 142, distance: '1,415 km', pct: '18%', color: '#3b82f6' },
    { route: 'Mumbai → Bangalore', trips: 118, distance: '984 km', pct: '15%', color: '#8b5cf6' },
    { route: 'Chennai → Hyderabad', trips: 96, distance: '629 km', pct: '12%', color: '#16a34a' },
    { route: 'Delhi → Kolkata', trips: 84, distance: '1,477 km', pct: '11%', color: '#f59e0b' },
  ];

  driverPerf = [
    { name: 'Jimmy Dente', initials: 'JD', vehicle: 'PeterBit 500', trips: 142, onTime: 96, avgSpeed: 72, fuelEff: 12.4, rating: 4.8 },
    { name: 'Maria Santos', initials: 'MS', vehicle: 'Box Truck', trips: 128, onTime: 98, avgSpeed: 68, fuelEff: 11.8, rating: 4.9 },
    { name: 'John Watson', initials: 'JW', vehicle: 'Flatbed Truck', trips: 109, onTime: 91, avgSpeed: 65, fuelEff: 10.2, rating: 4.5 },
    { name: 'Linda Park', initials: 'LP', vehicle: 'Cargo Trailer', trips: 97, onTime: 88, avgSpeed: 61, fuelEff: 9.8, rating: 4.3 },
  ];

  maxRevenue() {
    const vals = this.revenueTrend().map(r => r.value);
    return Math.max(...vals, 1);
  }

  ngOnInit() { this.loadAll(); }

  loadAll() {
    const days = +this.selectedPeriod;
    this.api.getDeliveryTrend(days).subscribe({
      next: d => {
        this.deliveryTrend.set(d);
        this.delayedTrend.set(d.map(pt => ({ label: pt.label, value: pt.value * 0.15 + Math.random() * 20 })));
      },
      error: () => {
        const trend = Array.from({ length: days }, (_, i) => ({ label: String(i + 1), value: 80 + Math.random() * 320 }));
        this.deliveryTrend.set(trend);
        this.delayedTrend.set(trend.map(pt => ({ label: pt.label, value: pt.value * 0.12 + Math.random() * 15 })));
      }
    });
    this.api.getRevenue(6).subscribe({
      next: r => this.revenueTrend.set(r),
      error: () => this.revenueTrend.set(Array.from({ length: 6 }, (_, i) => ({ label: String(i + 1), value: 50000 + Math.random() * 100000 })))
    });
    this.api.getFuelTrend(days).subscribe({
      next: f => this.fuelTrend.set(f),
      error: () => this.fuelTrend.set(Array.from({ length: days }, (_, i) => ({ label: String(i + 1), value: 200 + Math.random() * 200 })))
    });
  }

  getPolylinePoints(data: ChartDataPoint[], width: number, height: number): string {
    if (!data.length) return '';
    const max = Math.max(...data.map(d => d.value), 1);
    return data.map((d, i) => {
      const x = (i / (data.length - 1)) * width;
      const y = height - (d.value / max) * (height - 10) - 5;
      return `${x},${y}`;
    }).join(' ');
  }

  getAreaPoints(data: ChartDataPoint[], width: number, height: number): string {
    if (!data.length) return '';
    const line = this.getPolylinePoints(data, width, height);
    return `0,${height} ${line} ${width},${height}`;
  }

  getMonthLabel(index: number): string {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const now = new Date();
    return months[(now.getMonth() - (5 - index) + 12) % 12];
  }

  getStars(rating: number): string {
    return '★'.repeat(Math.round(rating)) + '☆'.repeat(5 - Math.round(rating));
  }
}
