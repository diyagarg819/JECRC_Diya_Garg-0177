import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { TenantService } from '../../core/services/tenant.service';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './main-layout.component.html'
})
export class MainLayoutComponent {
  // inject is used to dynamically resolve services on instantiation without a verbose constructor
  public authService = inject(AuthService);
  public tenantService = inject(TenantService);
  private router = inject(Router);

  // Tracks the mobile viewport slide-out drawer status (open vs closed)
  public sidebarOpen = false;

  // The navigation array maps router paths to sidebar links.
  // The 'roles' array dictates which types of logged-in sessions can view this link,
  // establishing the clear boundary where SuperAdmin manages global/tenants but operational directories
  // are open to HR and Employees.
  public navItems = [
    { label: 'Dashboard', route: '/dashboard', icon: 'dashboard', roles: ['Employee', 'HR', 'PayrollAdmin', 'SuperAdmin'] },
    { label: 'Employees', route: '/employees', icon: 'people', roles: ['HR', 'SuperAdmin'] },
    { label: 'Payroll Engine', route: '/payroll', icon: 'payments', roles: ['HR', 'PayrollAdmin', 'SuperAdmin'] },
    { label: 'Attendance', route: '/attendance', icon: 'fingerprint', roles: ['HR', 'Employee', 'SuperAdmin'] },
    { label: 'Leave Management', route: '/leave', icon: 'event_busy', roles: ['HR', 'Employee', 'SuperAdmin'] },
    { label: 'Assets', route: '/assets', icon: 'devices', roles: ['HR', 'SuperAdmin'] },
    { label: 'Tenants', route: '/tenants', icon: 'domain', roles: ['SuperAdmin'] }
  ];

  // Toggles mobile sidebar slide-out state when hamburger/toggle button is clicked
  public toggleSidebar(): void {
    this.sidebarOpen = !this.sidebarOpen;
  }

  // Ensures mobile sidebar is dismissed when a navigation link is clicked
  public closeSidebar(): void {
    this.sidebarOpen = false;
  }

  // Fetches active tenant name from TenantService to display customized organization branding in headers
  public getActiveTenantName(): string {
    return this.tenantService.getActiveTenant().name;
  }

  // Retrieves active tenant GUID to determine standard UI filters
  public getActiveTenantId(): string {
    return this.tenantService.currentTenantId();
  }

  // Retrieves authenticated user's email for active session user profile displays
  public getSessionEmail(): string {
    return this.authService.currentUser()?.email || '';
  }

  // Resolves the role claim (e.g. Employee, HR, SuperAdmin) to enforce strict sidebar links visibility
  public getSessionRole(): string {
    return this.authService.currentUser()?.role || '';
  }

  // Performs a hot-swap switch of the active tenant organization.
  // Updates browser localStorage and executes router skipLocationChange double navigation 
  // to force active view reload with the new X-Tenant-Id HTTP request headers.
  public switchTenant(tenantId: string): void {
    this.tenantService.setTenant(tenantId);
    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }

  // Invokes the AuthService logout sequence to strip local tokens and redirect session to login gateway
  public handleLogout(): void {
    this.authService.logout();
  }
}
