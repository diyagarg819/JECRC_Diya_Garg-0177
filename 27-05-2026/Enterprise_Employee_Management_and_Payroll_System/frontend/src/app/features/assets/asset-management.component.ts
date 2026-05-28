import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TenantService } from '../../core/services/tenant.service';
import { AuthService } from '../../core/services/auth.service';
import { HttpClient } from '@angular/common/http';

interface Asset {
  id: string;
  assetCode: string;
  assetName: string;
  category: 'Hardware' | 'License' | 'Furniture';
  serialNumber: string;
  status: 'Available' | 'Assigned' | 'UnderRepair' | 'Scrapped';
  assignedToEmail?: string;
  assignedToName?: string;
  purchaseDate: string;
  purchaseCost: number;
  currentValue: number;
  depreciationRate: number; // yearly percentage (e.g., 20)
}

interface EmployeeBasic {
  id: string;
  name: string;
  email: string;
}

@Component({
  selector: 'app-asset-management',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="space-y-8 animate-fade-in text-slate-100">
      <!-- Header -->
      <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 class="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <span class="material-icons text-brand-400">devices</span>
            Asset Tracking & Registry
          </h1>
          <p class="text-xs text-slate-400 mt-0.5">Manage enterprise hardware, software licenses, equipment allocation, and automatic depreciation schedules.</p>
        </div>
        
        <div class="flex items-center gap-2 bg-slate-900/60 border border-slate-800 px-3.5 py-2 rounded-xl">
          <span class="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></span>
          <span class="text-[10px] font-semibold text-slate-300 uppercase tracking-wider">Tenant Schema: {{ tenantName }}</span>
        </div>
      </div>

      <!-- Quick Summary Cards -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div class="bg-slate-950/40 border border-slate-800/80 p-4.5 rounded-2xl">
          <div class="text-[9px] text-slate-500 font-bold uppercase tracking-wider mb-1">Total Assets</div>
          <div class="text-xl font-bold text-white">{{ assets.length }}</div>
        </div>
        <div class="bg-slate-950/40 border border-slate-800/80 p-4.5 rounded-2xl">
          <div class="text-[9px] text-slate-500 font-bold uppercase tracking-wider mb-1">Your Assigned Assets</div>
          <div class="text-xl font-bold text-brand-400">{{ getYourAssetsCount() }}</div>
        </div>
        <div class="bg-slate-950/40 border border-slate-800/80 p-4.5 rounded-2xl">
          <div class="text-[9px] text-slate-500 font-bold uppercase tracking-wider mb-1">Total Book Value</div>
          <div class="text-xl font-bold text-emerald-400">\${{ getTotalBookValue() | number:'1.0-0' }}</div>
        </div>
        <div class="bg-slate-950/40 border border-slate-800/80 p-4.5 rounded-2xl">
          <div class="text-[9px] text-slate-500 font-bold uppercase tracking-wider mb-1">Under Repair</div>
          <div class="text-xl font-bold text-amber-500">{{ getRepairCount() }}</div>
        </div>
      </div>

      <!-- Main Layout -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        <!-- Left Column: Registry & Search (8 cols) -->
        <div class="lg:col-span-8 space-y-6">
          
          <!-- Filter Tabs -->
          <div class="bg-slate-950/40 border border-slate-800 p-2 rounded-xl flex items-center justify-between">
            <div class="flex items-center gap-1.5">
              <button (click)="setFilter('ALL')" 
                      [class.bg-slate-800]="activeFilter === 'ALL'"
                      class="px-3.5 py-1.5 rounded-lg text-xs font-bold text-slate-300 hover:bg-slate-900 transition">
                All Registry
              </button>
              <button (click)="setFilter('MINE')" 
                      [class.bg-slate-800]="activeFilter === 'MINE'"
                      class="px-3.5 py-1.5 rounded-lg text-xs font-bold text-slate-300 hover:bg-slate-900 transition">
                Your Hardware
              </button>
              <button (click)="setFilter('Hardware')" 
                      [class.bg-slate-800]="activeFilter === 'Hardware'"
                      class="px-3.5 py-1.5 rounded-lg text-xs font-bold text-slate-300 hover:bg-slate-900 transition">
                Devices
              </button>
              <button (click)="setFilter('License')" 
                      [class.bg-slate-800]="activeFilter === 'License'"
                      class="px-3.5 py-1.5 rounded-lg text-xs font-bold text-slate-300 hover:bg-slate-900 transition">
                Software Licenses
              </button>
            </div>
            
            <span class="text-[10px] text-slate-500 font-semibold px-3">{{ getFilteredAssets().length }} items found</span>
          </div>

          <!-- Asset List Grid -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div *ngFor="let asset of getFilteredAssets()" 
                 class="glass-card p-5 border-slate-800/80 hover:border-slate-700/80 relative overflow-hidden group transition duration-300 flex flex-col justify-between min-h-[220px]">
              
              <!-- Top bar -->
              <div>
                <div class="flex justify-between items-start mb-3.5">
                  <div class="space-y-0.5">
                    <span class="text-[10px] font-mono text-slate-500 font-semibold uppercase tracking-wider">{{ asset.assetCode }}</span>
                    <h3 class="text-xs font-bold text-slate-200">{{ asset.assetName }}</h3>
                  </div>
                  <span class="px-2 py-0.5 rounded-full text-[8px] font-extrabold uppercase tracking-wide border"
                        [ngClass]="{
                          'bg-emerald-500/10 text-emerald-400 border-emerald-500/20': asset.status === 'Available',
                          'bg-indigo-500/10 text-indigo-400 border-indigo-500/20': asset.status === 'Assigned',
                          'bg-amber-500/10 text-amber-400 border-amber-500/20': asset.status === 'UnderRepair',
                          'bg-slate-500/10 text-slate-400 border-slate-500/20': asset.status === 'Scrapped'
                        }">
                    {{ asset.status }}
                  </span>
                </div>

                <!-- Info Block -->
                <div class="space-y-2 mt-4">
                  <div class="flex justify-between text-[11px]">
                    <span class="text-slate-500">Serial No:</span>
                    <span class="font-mono text-slate-300">{{ asset.serialNumber }}</span>
                  </div>
                  <div class="flex justify-between text-[11px]">
                    <span class="text-slate-500">Category:</span>
                    <span class="text-slate-300">{{ asset.category }}</span>
                  </div>
                  <div class="flex justify-between text-[11px]">
                    <span class="text-slate-500">Book Value:</span>
                    <span class="font-bold text-emerald-400">\${{ asset.currentValue | number:'1.0-0' }} <span class="text-[9px] text-slate-500 font-normal">/\${{ asset.purchaseCost }}</span></span>
                  </div>
                </div>
              </div>

              <!-- Bottom Action Area -->
              <div class="mt-4 pt-3.5 border-t border-slate-800/80 flex items-center justify-between gap-2 text-[10px] text-slate-400">
                <div class="flex items-center gap-1">
                  <span class="material-icons text-xs text-slate-500">person</span>
                  <span>{{ asset.assignedToName || 'Unassigned (Pool)' }}</span>
                </div>
                
                <!-- Quick depreciation label -->
                <span class="text-[9px] text-slate-500 italic">Depr. Rate: {{ asset.depreciationRate }}%/yr</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Column: Admin Registry Panel (4 cols) -->
        <div class="lg:col-span-4 space-y-6">
          
          <!-- Depreciation Simulator Tool -->
          <div class="glass-card p-6">
            <h2 class="text-sm font-bold text-white mb-3.5 flex items-center gap-2">
              <span class="material-icons text-brand-400">trending_down</span>
              Value Depreciation Tool
            </h2>
            <p class="text-[10px] text-slate-400 leading-relaxed mb-4">
              Enter details below to compute straight-line depreciation value curves over 5 years.
            </p>
            <div class="space-y-3">
              <div>
                <label class="block text-[9px] font-bold text-slate-400 uppercase mb-1">Purchase Cost ($)</label>
                <input type="number" [(ngModel)]="simCost" (input)="runSim()" class="w-full bg-slate-950 border border-slate-800 text-xs text-slate-200 rounded-lg px-3 py-2 outline-none" />
              </div>
              <div class="grid grid-cols-2 gap-3">
                <div>
                  <label class="block text-[9px] font-bold text-slate-400 uppercase mb-1">Depr. Rate (%)</label>
                  <input type="number" [(ngModel)]="simRate" (input)="runSim()" class="w-full bg-slate-950 border border-slate-800 text-xs text-slate-200 rounded-lg px-3 py-2 outline-none" />
                </div>
                <div>
                  <label class="block text-[9px] font-bold text-slate-400 uppercase mb-1">Age (Years)</label>
                  <input type="number" [(ngModel)]="simAge" (input)="runSim()" class="w-full bg-slate-950 border border-slate-800 text-xs text-slate-200 rounded-lg px-3 py-2 outline-none" />
                </div>
              </div>

              <div class="mt-4 pt-3.5 border-t border-slate-800 flex items-center justify-between text-xs">
                <span class="text-slate-400">Depreciated Value:</span>
                <span class="font-extrabold text-emerald-400">\${{ simValue | number:'1.2-2' }}</span>
              </div>
            </div>
          </div>

          <!-- HR Registry / Assignment (Visible to HR/SuperAdmin) -->
          <div *ngIf="isHRAdmin" class="glass-card p-6 border-indigo-500/20 bg-gradient-to-br from-slate-900/90 to-slate-950/95">
            <h2 class="text-sm font-bold text-white mb-4 flex items-center gap-2">
              <span class="material-icons text-indigo-400">playlist_add</span>
              Register New Asset
            </h2>

            <form (submit)="registerAsset()" class="space-y-3.5">
              <div>
                <label class="block text-[9px] font-bold text-slate-400 uppercase mb-1">Asset Name</label>
                <input type="text" [(ngModel)]="newAsset.assetName" name="assetName" class="w-full bg-slate-950 border border-slate-800 text-xs text-slate-200 rounded-lg px-3 py-2 outline-none focus:border-brand-500" />
              </div>
              <div class="grid grid-cols-2 gap-3">
                <div>
                  <label class="block text-[9px] font-bold text-slate-400 uppercase mb-1">Category</label>
                  <select [(ngModel)]="newAsset.category" name="category" class="w-full bg-slate-950 border border-slate-800 text-xs text-slate-200 rounded-lg px-2 py-2 outline-none">
                    <option value="Hardware">Hardware</option>
                    <option value="License">License</option>
                    <option value="Furniture">Furniture</option>
                  </select>
                </div>
                <div>
                  <label class="block text-[9px] font-bold text-slate-400 uppercase mb-1">Serial Number</label>
                  <input type="text" [(ngModel)]="newAsset.serialNumber" name="serialNumber" class="w-full bg-slate-950 border border-slate-800 text-xs text-slate-200 rounded-lg px-3 py-2 outline-none" />
                </div>
              </div>

              <div class="grid grid-cols-2 gap-3">
                <div>
                  <label class="block text-[9px] font-bold text-slate-400 uppercase mb-1">Purchase Cost ($)</label>
                  <input type="number" [(ngModel)]="newAsset.purchaseCost" name="purchaseCost" class="w-full bg-slate-950 border border-slate-800 text-xs text-slate-200 rounded-lg px-3 py-2 outline-none" />
                </div>
                <div>
                  <label class="block text-[9px] font-bold text-slate-400 uppercase mb-1">Depr. Rate (%)</label>
                  <input type="number" [(ngModel)]="newAsset.depreciationRate" name="depreciationRate" class="w-full bg-slate-950 border border-slate-800 text-xs text-slate-200 rounded-lg px-3 py-2 outline-none" />
                </div>
              </div>

              <div>
                <label class="block text-[9px] font-bold text-slate-400 uppercase mb-1">Assign to Employee</label>
                <select [(ngModel)]="newAsset.assignedToEmail" name="assignedToEmail" class="w-full bg-slate-950 border border-slate-800 text-xs text-slate-200 rounded-lg px-3 py-2 outline-none">
                  <option value="">Leave Unassigned</option>
                  <option *ngFor="let emp of employeesList" [value]="emp.email">{{ emp.name }}</option>
                </select>
              </div>

              <div *ngIf="formError" class="bg-rose-500/10 border border-rose-500/20 p-2.5 rounded-lg text-[10px] text-rose-400 flex items-center gap-1.5">
                <span class="material-icons text-xs">error</span> {{ formError }}
              </div>

              <button type="submit" class="w-full bg-brand-600 hover:bg-brand-500 text-white rounded-lg py-2.5 text-xs font-bold transition flex items-center justify-center gap-1">
                <span class="material-icons text-sm">add</span> Register Asset
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  `
})
export class AssetManagementComponent implements OnInit {
  private authService = inject(AuthService);
  private http = inject(HttpClient);

  public tenantName = 'Capgemini India';
  public isHRAdmin = false;

  public activeFilter: 'ALL' | 'MINE' | 'Hardware' | 'License' = 'ALL';
  public assets: Asset[] = [];
  public employeesList: EmployeeBasic[] = [
    { id: '1', name: 'Rajesh Kumar', email: 'rajesh.kumar@capgemini-in.com' },
    { id: '2', name: 'Amit Sharma', email: 'amit.sharma@capgemini-in.com' },
    { id: '3', name: 'Priya Patel', email: 'priya.patel@capgemini-in.com' },
    { id: '4', name: 'Sarah Connor', email: 'sarah.connor@capgemini-us.com' },
    { id: '5', name: 'John Doe', email: 'john.doe@capgemini-us.com' }
  ];

  // Form binds
  public newAsset: Partial<Asset> = {
    assetName: '',
    category: 'Hardware',
    serialNumber: '',
    purchaseCost: 0,
    depreciationRate: 20,
    assignedToEmail: ''
  };

  // Sim Tool binds
  public simCost = 1500;
  public simRate = 20;
  public simAge = 2;
  public simValue = 900;

  public formError = '';

  ngOnInit(): void {
    const user = this.authService.currentUser();
    this.isHRAdmin = this.authService.hasRole(['HR', 'SuperAdmin']);

    if (user?.tenantId === '7f04c0cf-031e-450f-a189-e1fca9473fa7') {
      this.tenantName = 'Capgemini USA';
    } else {
      this.tenantName = 'Capgemini India';
    }

    this.loadAssets();
    this.runSim();
  }

  public getYourAssetsCount(): number {
    const user = this.authService.currentUser();
    if (!user) return 0;
    return this.assets.filter(a => a.assignedToEmail === user.email).length;
  }

  public getRepairCount(): number {
    return this.assets.filter(a => a.status === 'UnderRepair').length;
  }

  public getTotalBookValue(): number {
    return this.assets.reduce((sum, a) => sum + a.currentValue, 0);
  }

  private loadAssets(): void {
    const user = this.authService.currentUser();
    if (!user) return;

    const storageKey = `assets_registry_${user.tenantId}`;
    const rawAssets = localStorage.getItem(storageKey);

    if (rawAssets) {
      this.assets = JSON.parse(rawAssets);
    } else {
      // Seed default registry
      this.assets = [
        {
          id: 'ast-1',
          assetCode: 'AST-IN-5100',
          assetName: 'MacBook Pro 16" (M3 Max, 64GB)',
          category: 'Hardware',
          serialNumber: 'C02F239HG021',
          status: 'Assigned',
          assignedToEmail: 'rajesh.kumar@capgemini-in.com',
          assignedToName: 'Rajesh Kumar',
          purchaseDate: '2025-01-10',
          purchaseCost: 3499,
          currentValue: 2799,
          depreciationRate: 20
        },
        {
          id: 'ast-2',
          assetCode: 'AST-IN-5101',
          assetName: 'Dell UltraSharp 32" 4K Monitor',
          category: 'Hardware',
          serialNumber: 'CN-0DF293-19283',
          status: 'Assigned',
          assignedToEmail: 'priya.patel@capgemini-in.com',
          assignedToName: 'Priya Patel',
          purchaseDate: '2024-05-15',
          purchaseCost: 899,
          currentValue: 539,
          depreciationRate: 20
        },
        {
          id: 'ast-3',
          assetCode: 'AST-IN-8201',
          assetName: 'IntelliJ IDEA Ultimate Yearly License',
          category: 'License',
          serialNumber: 'LIC-INT-99231',
          status: 'Assigned',
          assignedToEmail: 'rajesh.kumar@capgemini-in.com',
          assignedToName: 'Rajesh Kumar',
          purchaseDate: '2026-03-01',
          purchaseCost: 499,
          currentValue: 499,
          depreciationRate: 0
        },
        {
          id: 'ast-4',
          assetCode: 'AST-US-1002',
          assetName: 'ThinkPad T14s Gen 4 (AMD, 32GB)',
          category: 'Hardware',
          serialNumber: 'PC-2938HG92',
          status: 'Assigned',
          assignedToEmail: 'sarah.connor@capgemini-us.com',
          assignedToName: 'Sarah Connor',
          purchaseDate: '2025-06-20',
          purchaseCost: 1699,
          currentValue: 1359,
          depreciationRate: 20
        },
        {
          id: 'ast-5',
          assetCode: 'AST-IN-9100',
          assetName: 'Ergonomic Mesh Swivel Chair',
          category: 'Furniture',
          serialNumber: 'FUR-CH-882',
          status: 'Available',
          purchaseDate: '2023-11-12',
          purchaseCost: 350,
          currentValue: 140,
          depreciationRate: 15
        }
      ];
      
      // Filter seeded values based on tenant namespace
      const tenantPrefix = user.tenantId === '7f04c0cf-031e-450f-a189-e1fca9473fa7' ? 'AST-US' : 'AST-IN';
      this.assets = this.assets.filter(a => a.assetCode.startsWith(tenantPrefix));
      
      localStorage.setItem(storageKey, JSON.stringify(this.assets));
    }
  }

  public setFilter(filter: 'ALL' | 'MINE' | 'Hardware' | 'License'): void {
    this.activeFilter = filter;
  }

  public getFilteredAssets(): Asset[] {
    const user = this.authService.currentUser();
    if (!user) return [];

    if (this.activeFilter === 'MINE') {
      return this.assets.filter(a => a.assignedToEmail === user.email);
    } else if (this.activeFilter === 'ALL') {
      return this.assets;
    } else {
      return this.assets.filter(a => a.category === this.activeFilter);
    }
  }

  public runSim(): void {
    const deprAmount = (this.simCost * (this.simRate / 100)) * this.simAge;
    this.simValue = Math.max(0, this.simCost - deprAmount);
  }

  public registerAsset(): void {
    this.formError = '';

    const user = this.authService.currentUser();
    if (!user) return;

    const { assetName, category, serialNumber, purchaseCost, depreciationRate, assignedToEmail } = this.newAsset;

    if (!assetName || !serialNumber || !purchaseCost) {
      this.formError = 'Please fill out all required fields.';
      return;
    }

    const tenantPrefix = user.tenantId === '7f04c0cf-031e-450f-a189-e1fca9473fa7' ? 'AST-US' : 'AST-IN';
    const nextCodeNum = 5000 + this.assets.length + 1;
    const assetCode = `${tenantPrefix}-${nextCodeNum}`;

    let assignedToName = undefined;
    if (assignedToEmail) {
      const match = this.employeesList.find(e => e.email === assignedToEmail);
      if (match) assignedToName = match.name;
    }

    const newAssetItem: Asset = {
      id: 'ast-' + Date.now(),
      assetCode,
      assetName,
      category: category as any,
      serialNumber,
      status: assignedToEmail ? 'Assigned' : 'Available',
      assignedToEmail,
      assignedToName,
      purchaseDate: new Date().toISOString().split('T')[0],
      purchaseCost,
      currentValue: purchaseCost, // new asset has full cost value
      depreciationRate: depreciationRate || 20
    };

    this.assets.unshift(newAssetItem);
    const storageKey = `assets_registry_${user.tenantId}`;
    localStorage.setItem(storageKey, JSON.stringify(this.assets));

    // Clear form
    this.newAsset = {
      assetName: '',
      category: 'Hardware',
      serialNumber: '',
      purchaseCost: 0,
      depreciationRate: 20,
      assignedToEmail: ''
    };

    this.loadAssets();
  }
}
