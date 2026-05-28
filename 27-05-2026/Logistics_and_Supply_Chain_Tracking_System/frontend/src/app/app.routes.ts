// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./layout/shell/shell.component').then(m => m.ShellComponent),
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        loadComponent: () => import('./modules/dashboard/dashboard.component').then(m => m.DashboardComponent)
      },
      {
        path: 'shipments',
        loadComponent: () => import('./modules/shipments/shipments-list/shipments-list.component').then(m => m.ShipmentsListComponent)
      },
      {
        path: 'shipments/:id',
        loadComponent: () => import('./modules/shipments/shipment-detail/shipment-detail.component').then(m => m.ShipmentDetailComponent)
      },
      {
        path: 'fleet',
        loadComponent: () => import('./modules/fleet/fleet.component').then(m => m.FleetComponent)
      },
      {
        path: 'warehouse',
        loadComponent: () => import('./modules/warehouse/warehouse.component').then(m => m.WarehouseComponent)
      },
      {
        path: 'routes',
        loadComponent: () => import('./modules/routes/routes.component').then(m => m.RoutesComponent)
      },
      {
        path: 'analytics',
        loadComponent: () => import('./modules/analytics/analytics.component').then(m => m.AnalyticsComponent)
      },
      {
        path: 'customers',
        loadComponent: () => import('./modules/customers/customers.component').then(m => m.CustomersComponent)
      },
    ]
  },
  {
    path: 'login',
    loadComponent: () => import('./modules/auth/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'track/:trackingNumber',
    loadComponent: () => import('./modules/shipments/public-tracking/public-tracking.component').then(m => m.PublicTrackingComponent)
  },
  { path: '**', redirectTo: 'dashboard' }
];
