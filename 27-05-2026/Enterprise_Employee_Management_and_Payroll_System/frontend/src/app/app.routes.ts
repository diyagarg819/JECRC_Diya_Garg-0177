import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./features/auth/login.component').then(m => m.LoginComponent)
  },
  {
    path: '',
    loadComponent: () => import('./layouts/main-layout/main-layout.component').then(m => m.MainLayoutComponent),
    canActivate: [authGuard],
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        loadComponent: () => import('./features/dashboard/dashboard.component').then(m => m.DashboardComponent)
      },
      {
        path: 'employees',
        loadComponent: () => import('./features/employees/employee-list.component').then(m => m.EmployeeListComponent)
      },
      {
        path: 'payroll',
        loadComponent: () => import('./features/payroll/payroll-calculator.component').then(m => m.PayrollCalculatorComponent)
      },
      {
        path: 'attendance',
        loadComponent: () => import('./features/attendance/attendance.component').then(m => m.AttendanceComponent)
      },
      {
        path: 'leave',
        loadComponent: () => import('./features/leave/leave-management.component').then(m => m.LeaveManagementComponent)
      },
      {
        path: 'assets',
        loadComponent: () => import('./features/assets/asset-management.component').then(m => m.AssetManagementComponent)
      },
      {
        path: 'tenants',
        loadComponent: () => import('./features/tenants/tenant-management.component').then(m => m.TenantManagementComponent)
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'login'
  }
];
