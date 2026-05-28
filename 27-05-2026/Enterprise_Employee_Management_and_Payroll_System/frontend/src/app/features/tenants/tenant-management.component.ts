import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TenantService, TenantInfo } from '../../core/services/tenant.service';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-tenant-management',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="space-y-8 animate-fade-in text-slate-100">
      <!-- Header -->
      <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 class="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <span class="material-icons text-brand-400">domain</span>
            Tenant & Organization Registry
          </h1>
          <p class="text-xs text-slate-400 mt-0.5">Register new client companies, generate custom isolated schemas, and configure distinct currency frameworks.</p>
        </div>
        
        <div class="flex items-center gap-2 bg-slate-900/60 border border-slate-800 px-3.5 py-2 rounded-xl">
          <span class="w-2 h-2 rounded-full bg-brand-500 animate-pulse"></span>
          <span class="text-[10px] font-semibold text-slate-300 uppercase tracking-wider">SuperAdmin Active Session</span>
        </div>
      </div>

      <!-- Main Layout -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        <!-- Left Side: Active Registry (8 cols) -->
        <div class="lg:col-span-8 space-y-6">
          <div class="glass-card p-6">
            <div class="flex items-center justify-between mb-5">
              <h2 class="text-sm font-bold text-white flex items-center gap-2">
                <span class="material-icons text-xs text-brand-400">lan</span>
                Active Organizations Summary
              </h2>
              <span class="bg-brand-500/10 text-brand-400 border border-brand-500/20 text-[9px] font-bold px-2 py-0.5 rounded-full">
                {{ getTenantsList().length }} registered
              </span>
            </div>

            <!-- Table of active tenants -->
            <div class="overflow-x-auto">
              <table class="w-full text-left text-xs border-collapse">
                <thead>
                  <tr class="border-b border-slate-800 text-slate-400 font-semibold uppercase text-[9px] tracking-wider">
                    <th class="py-3 px-4">Organization Name</th>
                    <th class="py-3 px-4">Tenant Isolated UUID</th>
                    <th class="py-3 px-4 text-center">Country</th>
                    <th class="py-3 px-4 text-right">Currency</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-800/60">
                  <tr *ngFor="let tenant of getTenantsList()" class="hover:bg-slate-900/30 transition duration-150">
                    <td class="py-3.5 px-4 font-semibold text-slate-200 flex items-center gap-2">
                      <div class="h-6 w-6 rounded bg-brand-500/10 border border-brand-500/25 flex items-center justify-center text-[11px] text-brand-400 uppercase font-bold">
                        {{ tenant.name.charAt(0) }}
                      </div>
                      {{ tenant.name }}
                    </td>
                    <td class="py-3.5 px-4 text-slate-400 font-mono text-[10px]">{{ tenant.id }}</td>
                    <td class="py-3.5 px-4 text-center">
                      <span class="px-2 py-0.5 bg-slate-800 border border-slate-700/60 rounded text-[9px] font-bold text-slate-300">
                        {{ tenant.countryCode }}
                      </span>
                    </td>
                    <td class="py-3.5 px-4 text-right font-mono text-emerald-400 font-semibold">{{ tenant.currency }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- Right Side: Register Organization Form (4 cols) -->
        <div class="lg:col-span-4">
          <div class="glass-card p-6 sticky top-24">
            <h2 class="text-sm font-bold text-white mb-4 flex items-center gap-2">
              <span class="material-icons text-brand-400">add_business</span>
              Register Organization
            </h2>
            <p class="text-[10px] text-slate-400 mb-5 leading-relaxed">
              Define a new tenant structure. The system will automatically spawn a custom schema configuration and isolated database parameters.
            </p>

            <form (submit)="onCreateTenant()" class="space-y-4">
              <!-- Name -->
              <div>
                <label class="block text-[9px] font-bold text-slate-400 uppercase mb-1.5">Company Name</label>
                <input type="text" [(ngModel)]="newTenant.name" name="name" placeholder="e.g. Google DeepMind"
                       class="w-full bg-slate-950 border border-slate-800 text-xs text-slate-200 rounded-xl px-3.5 py-2.5 focus:border-brand-500 focus:ring-1 focus:ring-brand-500/25 outline-none transition" />
              </div>

              <!-- Country Code -->
              <div>
                <label class="block text-[9px] font-bold text-slate-400 uppercase mb-1.5">Country Code (2 Letters)</label>
                <input type="text" [(ngModel)]="newTenant.countryCode" name="countryCode" placeholder="e.g. US" maxLength="2"
                       class="w-full bg-slate-950 border border-slate-800 text-xs text-slate-200 rounded-xl px-3.5 py-2.5 focus:border-brand-500 focus:ring-1 focus:ring-brand-500/25 outline-none transition" />
              </div>

              <!-- Currency Code -->
              <div>
                <label class="block text-[9px] font-bold text-slate-400 uppercase mb-1.5">Currency (3 Letters)</label>
                <input type="text" [(ngModel)]="newTenant.currency" name="currency" placeholder="e.g. USD" maxLength="3"
                       class="w-full bg-slate-950 border border-slate-800 text-xs text-slate-200 rounded-xl px-3.5 py-2.5 focus:border-brand-500 focus:ring-1 focus:ring-brand-500/25 outline-none transition" />
              </div>

              <!-- Messages -->
              <div *ngIf="formError" class="bg-rose-500/10 border border-rose-500/20 p-3 rounded-xl text-[10px] text-rose-400 flex items-center gap-1.5">
                <span class="material-icons text-xs">error</span> {{ formError }}
              </div>

              <div *ngIf="formSuccess" class="bg-emerald-500/10 border border-emerald-500/20 p-3 rounded-xl text-[10px] text-emerald-400 flex items-center gap-1.5">
                <span class="material-icons text-xs">check_circle</span> {{ formSuccess }}
              </div>

              <!-- Submit -->
              <button type="submit" class="w-full bg-brand-600 hover:bg-brand-500 text-white rounded-xl py-3 text-xs font-bold transition flex items-center justify-center gap-1">
                <span class="material-icons text-sm">domain_add</span> Register Tenant
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  `
})
export class TenantManagementComponent implements OnInit {
  private tenantService = inject(TenantService);
  private authService = inject(AuthService);

  public newTenant = {
    name: '',
    countryCode: '',
    currency: ''
  };

  public formError = '';
  public formSuccess = '';

  ngOnInit(): void {
    // Basic guard: Redirect if not SuperAdmin role
    if (!this.authService.hasRole(['SuperAdmin'])) {
      this.authService.logout();
    }
  }

  public getTenantsList(): TenantInfo[] {
    return this.tenantService.tenants;
  }

  public onCreateTenant(): void {
    this.formError = '';
    this.formSuccess = '';

    const { name, countryCode, currency } = this.newTenant;

    if (!name || !countryCode || !currency) {
      this.formError = 'Please fill out all required fields.';
      return;
    }

    if (countryCode.length !== 2) {
      this.formError = 'Country code must be exactly 2 characters (e.g. US, IN).';
      return;
    }

    if (currency.length !== 3) {
      this.formError = 'Currency code must be exactly 3 characters (e.g. USD, INR).';
      return;
    }

    // Register organization dynamically!
    const registered = this.tenantService.addTenant(name, countryCode, currency);

    this.newTenant = { name: '', countryCode: '', currency: '' };
    this.formSuccess = `Organization "${registered.name}" registered successfully with UUID: ${registered.id}`;
  }
}
