import { Injectable, signal } from '@angular/core';

export interface TenantInfo {
  id: string;
  name: string;
  countryCode: string;
  currency: string;
}

@Injectable({
  providedIn: 'root'
})
export class TenantService {
  private readonly defaultTenants: TenantInfo[] = [
    { id: 'e3b97b0a-3a7b-4df2-bdcb-a032de2a1bf6', name: 'Capgemini India', countryCode: 'IN', currency: 'INR' },
    { id: '7f04c0cf-031e-450f-a189-e1fca9473fa7', name: 'Capgemini USA', countryCode: 'US', currency: 'USD' }
  ];

  // Dynamic reactive state for tenants list
  public tenantsSignal = signal<TenantInfo[]>(this.loadTenants());

  public get tenants(): TenantInfo[] {
    return this.tenantsSignal();
  }

  // Store the active tenant ID in a reactive signal
  public currentTenantId = signal<string>(this.tenants[0].id);

  private loadTenants(): TenantInfo[] {
    const raw = localStorage.getItem('tenant_list');
    if (raw) {
      try {
        return JSON.parse(raw) as TenantInfo[];
      } catch {
        return this.defaultTenants;
      }
    } else {
      localStorage.setItem('tenant_list', JSON.stringify(this.defaultTenants));
      return this.defaultTenants;
    }
  }

  public getActiveTenant(): TenantInfo {
    return this.tenants.find(t => t.id === this.currentTenantId()) || this.tenants[0];
  }

  public setTenant(id: string): void {
    if (this.tenants.some(t => t.id === id)) {
      this.currentTenantId.set(id);
    }
  }

  public addTenant(name: string, countryCode: string, currency: string): TenantInfo {
    const newTenant: TenantInfo = {
      id: this.generateUUID(),
      name,
      countryCode: countryCode.toUpperCase(),
      currency: currency.toUpperCase()
    };

    const currentList = this.loadTenants();
    currentList.push(newTenant);
    localStorage.setItem('tenant_list', JSON.stringify(currentList));
    
    // Update reactive signal
    this.tenantsSignal.set(currentList);
    return newTenant;
  }

  private generateUUID(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
}
