// src/app/modules/routes/routes.component.ts
import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouteApiService } from '../../core/services/api.service';
import { Route } from '../../core/models/models';

@Component({
  selector: 'app-routes',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="routes-page">
      <div class="page-header">
        <div>
          <h2>Route Optimization</h2>
          <p>Plan and optimize delivery routes to reduce fuel costs and time</p>
        </div>
      </div>

      <div class="routes-layout">
        <!-- Optimize Form -->
        <div class="form-panel">
          <h3>🧭 Plan New Route</h3>

          <div class="form-group">
            <label>Origin</label>
            <input [(ngModel)]="form.origin" class="form-input" placeholder="e.g. New Delhi" />
          </div>
          <div class="form-group">
            <label>Destination</label>
            <input [(ngModel)]="form.destination" class="form-input" placeholder="e.g. Mumbai" />
          </div>

          <div class="waypoints-section">
            <div class="wp-header">
              <label>Waypoints (optional)</label>
              <button class="add-wp-btn" (click)="addWaypoint()">+ Add Stop</button>
            </div>
            <div *ngFor="let wp of form.waypoints; let i = index" class="waypoint-row">
              <span class="wp-num">{{ i + 1 }}</span>
              <input [(ngModel)]="wp.name" class="form-input" placeholder="Stop name" />
              <button class="remove-wp" (click)="removeWaypoint(i)">✕</button>
            </div>
          </div>

          <div class="checkboxes">
            <label class="checkbox-label">
              <input type="checkbox" [(ngModel)]="form.avoidTolls" />
              Avoid Tolls
            </label>
            <label class="checkbox-label">
              <input type="checkbox" [(ngModel)]="form.avoidHighways" />
              Avoid Highways
            </label>
          </div>

          <button class="btn-optimize" (click)="optimize()" [disabled]="optimizing()">
            <span *ngIf="!optimizing()">⚡ Optimize Route</span>
            <span *ngIf="optimizing()">Optimizing...</span>
          </button>

          <!-- Result -->
          <div class="route-result" *ngIf="optimizedRoute()">
            <div class="result-header">
              <span class="result-icon">✅</span>
              <strong>Route Optimized!</strong>
            </div>
            <div class="result-stats">
              <div class="stat">
                <span class="stat-label">Distance</span>
                <span class="stat-value">{{ optimizedRoute()!.distanceKm }} km</span>
              </div>
              <div class="stat">
                <span class="stat-label">Est. Time</span>
                <span class="stat-value">{{ formatDuration(optimizedRoute()!.estimatedDurationMinutes) }}</span>
              </div>
              <div class="stat">
                <span class="stat-label">Fuel Cost</span>
                <span class="stat-value">₹{{ optimizedRoute()!.fuelCostEstimate.toFixed(0) }}</span>
              </div>
            </div>
            <div class="waypoints-list" *ngIf="optimizedRoute()!.waypoints.length > 0">
              <div *ngFor="let wp of optimizedRoute()!.waypoints; let last = last" class="wp-item">
                <div class="wp-dot" [class.last]="last"></div>
                <span>{{ wp.name }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Map + Route List -->
        <div class="right-panel">
          <!-- Map -->
          <div class="map-card">
            <div class="map-header">
              <h3>Route Map</h3>
              <span class="map-note">Google Maps API integration required</span>
            </div>
            <div class="map-visual">
              <div class="route-viz" *ngIf="optimizedRoute()">
                <div class="origin-point">📍 {{ optimizedRoute()!.origin }}</div>
                <div class="route-line">
                  <div *ngFor="let wp of optimizedRoute()!.waypoints" class="route-stop">
                    <div class="stop-dot"></div>
                    <span>{{ wp.name }}</span>
                  </div>
                </div>
                <div class="dest-point">🏁 {{ optimizedRoute()!.destination }}</div>
              </div>
              <div *ngIf="!optimizedRoute()" class="map-placeholder-text">
                <span>🗺️</span>
                <p>Plan a route to see it visualized here</p>
              </div>
            </div>
          </div>

          <!-- Saved Routes -->
          <div class="saved-routes">
            <h3>Saved Routes</h3>
            <div class="routes-list">
              <div *ngFor="let r of savedRoutes()" class="route-card">
                <div class="route-card-header">
                  <span class="route-name">{{ r.origin }} → {{ r.destination }}</span>
                  <span class="optimized-badge" *ngIf="r.isOptimized">⚡ Optimized</span>
                </div>
                <div class="route-card-stats">
                  <span>📏 {{ r.distanceKm }} km</span>
                  <span>⏱ {{ formatDuration(r.estimatedDurationMinutes) }}</span>
                  <span>⛽ ₹{{ r.fuelCostEstimate.toFixed(0) }}</span>
                </div>
              </div>
              <div *ngIf="savedRoutes().length === 0" class="empty-routes">No saved routes yet</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .routes-page { display: flex; flex-direction: column; gap: 20px; }
    .page-header h2 { font-size: 22px; font-weight: 700; margin: 0 0 4px; }
    .page-header p { color: #64748b; margin: 0; font-size: 14px; }

    .routes-layout { display: grid; grid-template-columns: 380px 1fr; gap: 20px; align-items: start; }

    .form-panel { background: white; border-radius: 12px; padding: 24px; box-shadow: 0 1px 4px rgba(0,0,0,.06); display: flex; flex-direction: column; gap: 16px; }
    .form-panel h3 { font-size: 15px; font-weight: 700; margin: 0; }
    .form-group { display: flex; flex-direction: column; gap: 6px; }
    .form-group label { font-size: 12px; font-weight: 600; color: #64748b; text-transform: uppercase; }
    .form-input { border: 1px solid #e2e8f0; border-radius: 8px; padding: 10px 12px; font-size: 14px; outline: none; transition: border-color 0.2s; }
    .form-input:focus { border-color: #3b82f6; }

    .waypoints-section { display: flex; flex-direction: column; gap: 8px; }
    .wp-header { display: flex; justify-content: space-between; align-items: center; }
    .wp-header label { font-size: 12px; font-weight: 600; color: #64748b; text-transform: uppercase; }
    .add-wp-btn { background: none; border: none; color: #1d4ed8; font-size: 13px; font-weight: 600; cursor: pointer; }
    .waypoint-row { display: flex; align-items: center; gap: 8px; }
    .wp-num { width: 24px; height: 24px; background: #eff6ff; color: #1d4ed8; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 700; flex-shrink: 0; }
    .remove-wp { background: none; border: none; color: #94a3b8; cursor: pointer; font-size: 14px; }

    .checkboxes { display: flex; gap: 20px; }
    .checkbox-label { display: flex; align-items: center; gap: 8px; font-size: 14px; color: #374151; cursor: pointer; }

    .btn-optimize { background: #1d4ed8; color: white; border: none; padding: 12px; border-radius: 10px; font-size: 15px; font-weight: 600; cursor: pointer; transition: background 0.2s; }
    .btn-optimize:hover { background: #1e40af; }
    .btn-optimize:disabled { opacity: 0.6; cursor: not-allowed; }

    .route-result { background: #f0fdf4; border: 1px solid #86efac; border-radius: 10px; padding: 16px; }
    .result-header { display: flex; align-items: center; gap: 8px; margin-bottom: 12px; font-weight: 600; }
    .result-icon { font-size: 18px; }
    .result-stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; margin-bottom: 12px; }
    .stat { display: flex; flex-direction: column; align-items: center; background: white; border-radius: 8px; padding: 10px; }
    .stat-label { font-size: 11px; color: #64748b; }
    .stat-value { font-size: 16px; font-weight: 700; color: #0f172a; }
    .waypoints-list { display: flex; flex-direction: column; gap: 4px; }
    .wp-item { display: flex; align-items: center; gap: 8px; font-size: 13px; color: #374151; }
    .wp-dot { width: 10px; height: 10px; background: #3b82f6; border-radius: 50%; flex-shrink: 0; }
    .wp-dot.last { background: #16a34a; }

    .right-panel { display: flex; flex-direction: column; gap: 16px; }
    .map-card { background: white; border-radius: 12px; box-shadow: 0 1px 4px rgba(0,0,0,.06); overflow: hidden; }
    .map-header { display: flex; justify-content: space-between; align-items: center; padding: 16px 20px; border-bottom: 1px solid #f1f5f9; }
    .map-header h3 { font-size: 15px; font-weight: 600; margin: 0; }
    .map-note { font-size: 12px; color: #94a3b8; }
    .map-visual { min-height: 220px; background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%); display: flex; align-items: center; justify-content: center; padding: 24px; }
    .map-placeholder-text { text-align: center; color: #64748b; }
    .map-placeholder-text span { font-size: 36px; }
    .map-placeholder-text p { margin: 8px 0 0; font-size: 14px; }

    .route-viz { width: 100%; }
    .origin-point, .dest-point { font-weight: 600; font-size: 15px; color: #0f172a; }
    .route-line { padding: 12px 0 12px 20px; border-left: 3px dashed #3b82f6; margin-left: 8px; display: flex; flex-direction: column; gap: 8px; }
    .route-stop { display: flex; align-items: center; gap: 8px; font-size: 13px; color: #374151; }
    .stop-dot { width: 8px; height: 8px; background: #93c5fd; border-radius: 50%; margin-left: -24px; }

    .saved-routes { background: white; border-radius: 12px; padding: 20px; box-shadow: 0 1px 4px rgba(0,0,0,.06); }
    .saved-routes h3 { font-size: 15px; font-weight: 600; margin: 0 0 12px; }
    .routes-list { display: flex; flex-direction: column; gap: 10px; }
    .route-card { border: 1px solid #f1f5f9; border-radius: 8px; padding: 12px 16px; }
    .route-card-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; }
    .route-name { font-weight: 600; font-size: 14px; }
    .optimized-badge { background: #eff6ff; color: #1d4ed8; font-size: 12px; padding: 2px 8px; border-radius: 12px; }
    .route-card-stats { display: flex; gap: 16px; font-size: 13px; color: #64748b; }
    .empty-routes { text-align: center; color: #94a3b8; padding: 20px; }
  `]
})
export class RoutesComponent implements OnInit {
  private api = inject(RouteApiService);

  savedRoutes = signal<Route[]>([]);
  optimizedRoute = signal<Route | null>(null);
  optimizing = signal(false);

  form = {
    origin: '',
    destination: '',
    waypoints: [] as { name: string; latitude: number; longitude: number; order: number }[],
    avoidTolls: false,
    avoidHighways: false
  };

  ngOnInit() {
    this.api.getAll().subscribe({
      next: rs => this.savedRoutes.set(rs),
      error: () => this.savedRoutes.set(this.getDemoRoutes())
    });
  }

  addWaypoint() {
    this.form.waypoints.push({ name: '', latitude: 0, longitude: 0, order: this.form.waypoints.length + 1 });
  }

  removeWaypoint(i: number) {
    this.form.waypoints.splice(i, 1);
  }

  optimize() {
    if (!this.form.origin || !this.form.destination) return;
    this.optimizing.set(true);
    this.api.optimize({
      origin: this.form.origin,
      destination: this.form.destination,
      waypoints: this.form.waypoints,
      avoidTolls: this.form.avoidTolls,
      avoidHighways: this.form.avoidHighways
    }).subscribe({
      next: route => { this.optimizedRoute.set(route); this.optimizing.set(false); },
      error: () => {
        // Demo fallback
        this.optimizedRoute.set({
          id: 'new',
          name: `${this.form.origin} → ${this.form.destination}`,
          origin: this.form.origin,
          destination: this.form.destination,
          originLat: 28.6, originLng: 77.2,
          destinationLat: 19.0, destinationLng: 72.8,
          distanceKm: 1415,
          estimatedDurationMinutes: 1200,
          fuelCostEstimate: 4500,
          isOptimized: true,
          waypoints: this.form.waypoints.map((w, i) => ({ order: i + 1, name: w.name, latitude: 0, longitude: 0 }))
        });
        this.optimizing.set(false);
      }
    });
  }

  formatDuration(mins: number): string {
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    return h > 0 ? `${h}h ${m}m` : `${m}m`;
  }

  private getDemoRoutes(): Route[] {
    return [
      { id: '1', name: 'Delhi → Chennai', origin: 'New Delhi', destination: 'Chennai', originLat: 28.6, originLng: 77.2, destinationLat: 13.08, destinationLng: 80.27, distanceKm: 2184, estimatedDurationMinutes: 1860, fuelCostEstimate: 6800, isOptimized: true, waypoints: [] },
      { id: '2', name: 'Mumbai → Bangalore', origin: 'Mumbai', destination: 'Bangalore', originLat: 19.07, originLng: 72.87, destinationLat: 12.97, destinationLng: 77.59, distanceKm: 984, estimatedDurationMinutes: 840, fuelCostEstimate: 3100, isOptimized: true, waypoints: [] },
    ];
  }
}
