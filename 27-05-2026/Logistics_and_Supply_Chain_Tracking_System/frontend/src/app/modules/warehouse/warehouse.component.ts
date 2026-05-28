// src/app/modules/warehouse/warehouse.component.ts
import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WarehouseApiService } from '../../core/services/api.service';
import { Warehouse, InventoryItem } from '../../core/models/models';

@Component({
  selector: 'app-warehouse',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="warehouse-page">
      <div class="page-header">
        <div>
          <h2>Warehouse Management</h2>
          <p>Monitor inventory, stock levels, and warehouse capacity</p>
        </div>
        <div class="header-actions">
          <button class="btn-secondary" (click)="simulateScan()">📷 Scan Barcode</button>
          <button class="btn-primary">+ Add Item</button>
        </div>
      </div>

      <!-- Barcode Scanner Result -->
      <div class="scan-result" *ngIf="scannedItem()">
        <span class="scan-icon">✅</span>
        <div>
          <strong>{{ scannedItem()!.name }}</strong>
          <span> — SKU: {{ scannedItem()!.sku }} · Qty: {{ scannedItem()!.quantity }} · {{ scannedItem()!.location }}</span>
        </div>
        <button (click)="scannedItem.set(null)">✕</button>
      </div>

      <!-- Low Stock Alert -->
      <div class="alert-bar" *ngIf="lowStockItems().length > 0">
        <span>⚠️</span>
        <span><strong>{{ lowStockItems().length }} items</strong> are below minimum stock level</span>
        <button class="alert-link" (click)="showLowStockOnly.set(!showLowStockOnly())">
          {{ showLowStockOnly() ? 'Show All' : 'View Low Stock' }}
        </button>
      </div>

      <!-- Warehouse Cards -->
      <div class="warehouse-grid">
        <div *ngFor="let w of warehouses()" class="warehouse-card" [class.active]="selectedWarehouse()?.id === w.id" (click)="selectWarehouse(w)">
          <div class="wh-header">
            <span class="wh-icon">🏭</span>
            <div>
              <h4>{{ w.name }}</h4>
              <p>{{ w.address }}</p>
            </div>
            <span class="wh-status" [class.active]="w.isActive">{{ w.isActive ? 'Active' : 'Inactive' }}</span>
          </div>
          <div class="capacity-bar-wrap">
            <div class="capacity-label">
              <span>Capacity</span>
              <span>{{ w.capacityPercentage.toFixed(0) }}%</span>
            </div>
            <div class="capacity-bar">
              <div class="capacity-fill" [style.width.%]="w.capacityPercentage" [class.danger]="w.capacityPercentage > 90" [class.warning]="w.capacityPercentage > 70 && w.capacityPercentage <= 90"></div>
            </div>
            <div class="capacity-nums">
              <span>{{ w.usedCapacity.toLocaleString() }} used</span>
              <span>{{ w.totalCapacity.toLocaleString() }} total</span>
            </div>
          </div>
          <div class="wh-manager">👤 {{ w.managerName }}</div>
        </div>
      </div>

      <!-- Inventory Table -->
      <div class="inventory-section">
        <div class="section-header">
          <h3>Inventory — {{ selectedWarehouse()?.name ?? 'All Warehouses' }}</h3>
          <div class="search-box">
            <span>🔍</span>
            <input [(ngModel)]="searchTerm" placeholder="Search items..." />
          </div>
        </div>

        <div class="table-card">
          <table class="data-table">
            <thead>
              <tr>
                <th>SKU</th>
                <th>Item Name</th>
                <th>Category</th>
                <th>Location</th>
                <th>Quantity</th>
                <th>Min Stock</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let item of filteredInventory()" [class.low-stock-row]="item.isLowStock">
                <td class="mono">{{ item.sku }}</td>
                <td><strong>{{ item.name }}</strong></td>
                <td><span class="category-badge">{{ item.category }}</span></td>
                <td class="mono">{{ item.location }}</td>
                <td>
                  <span class="qty" [class.low]="item.isLowStock">{{ item.quantity }}</span>
                </td>
                <td>{{ item.minStockLevel }}</td>
                <td>
                  <span class="stock-badge" [class.low]="item.isLowStock" [class.ok]="!item.isLowStock">
                    {{ item.isLowStock ? '⚠ Low Stock' : '✓ OK' }}
                  </span>
                </td>
                <td>
                  <button class="icon-btn" title="Update quantity" (click)="openUpdateQty(item)">✏️</button>
                  <button class="icon-btn" title="View history">📋</button>
                </td>
              </tr>
              <tr *ngIf="filteredInventory().length === 0">
                <td colspan="8" class="empty-cell">No inventory items found</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Update Quantity Modal -->
      <div class="modal-overlay" *ngIf="editingItem()" (click)="editingItem.set(null)">
        <div class="modal" (click)="$event.stopPropagation()">
          <h4>Update Quantity — {{ editingItem()!.name }}</h4>
          <div class="form-group">
            <label>New Quantity</label>
            <input type="number" [(ngModel)]="newQty" class="form-input" />
          </div>
          <div class="modal-actions">
            <button class="btn-secondary" (click)="editingItem.set(null)">Cancel</button>
            <button class="btn-primary" (click)="updateQuantity()">Save</button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .warehouse-page { display: flex; flex-direction: column; gap: 20px; }
    .page-header { display: flex; justify-content: space-between; align-items: flex-start; }
    .page-header h2 { font-size: 22px; font-weight: 700; margin: 0 0 4px; }
    .page-header p { color: #64748b; margin: 0; font-size: 14px; }
    .header-actions { display: flex; gap: 10px; }
    .btn-primary { background: #1d4ed8; color: white; border: none; padding: 10px 20px; border-radius: 8px; font-weight: 600; cursor: pointer; font-size: 14px; }
    .btn-secondary { background: white; color: #374151; border: 1px solid #e2e8f0; padding: 10px 20px; border-radius: 8px; font-weight: 600; cursor: pointer; font-size: 14px; }

    .scan-result { display: flex; align-items: center; gap: 12px; background: #f0fdf4; border: 1px solid #86efac; border-radius: 10px; padding: 12px 16px; }
    .scan-icon { font-size: 20px; }
    .scan-result div { flex: 1; font-size: 14px; }
    .scan-result button { background: none; border: none; cursor: pointer; color: #64748b; font-size: 16px; }

    .alert-bar { display: flex; align-items: center; gap: 10px; background: #fefce8; border: 1px solid #fde68a; border-radius: 10px; padding: 12px 16px; font-size: 14px; }
    .alert-bar span:first-child { font-size: 18px; }
    .alert-link { margin-left: auto; background: none; border: none; color: #1d4ed8; font-weight: 600; cursor: pointer; font-size: 14px; }

    .warehouse-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 16px; }
    .warehouse-card { background: white; border-radius: 12px; padding: 20px; box-shadow: 0 1px 4px rgba(0,0,0,.06); cursor: pointer; border: 2px solid transparent; transition: all 0.2s; }
    .warehouse-card:hover { border-color: #bfdbfe; }
    .warehouse-card.active { border-color: #3b82f6; }
    .wh-header { display: flex; align-items: flex-start; gap: 12px; margin-bottom: 16px; }
    .wh-icon { font-size: 28px; }
    .wh-header h4 { font-size: 15px; font-weight: 600; margin: 0 0 4px; }
    .wh-header p { font-size: 12px; color: #64748b; margin: 0; }
    .wh-status { padding: 3px 8px; border-radius: 20px; font-size: 11px; font-weight: 600; background: #f1f5f9; color: #64748b; white-space: nowrap; }
    .wh-status.active { background: #dcfce7; color: #16a34a; }
    .capacity-bar-wrap { margin-bottom: 12px; }
    .capacity-label { display: flex; justify-content: space-between; font-size: 12px; color: #64748b; margin-bottom: 6px; }
    .capacity-bar { height: 8px; background: #f1f5f9; border-radius: 4px; overflow: hidden; }
    .capacity-fill { height: 100%; background: #3b82f6; border-radius: 4px; transition: width 0.5s; }
    .capacity-fill.warning { background: #f59e0b; }
    .capacity-fill.danger { background: #ef4444; }
    .capacity-nums { display: flex; justify-content: space-between; font-size: 11px; color: #94a3b8; margin-top: 4px; }
    .wh-manager { font-size: 13px; color: #64748b; }

    .inventory-section { display: flex; flex-direction: column; gap: 12px; }
    .section-header { display: flex; justify-content: space-between; align-items: center; }
    .section-header h3 { font-size: 16px; font-weight: 600; margin: 0; }
    .search-box { display: flex; align-items: center; gap: 8px; background: white; border: 1px solid #e2e8f0; border-radius: 8px; padding: 8px 12px; }
    .search-box input { border: none; outline: none; font-size: 14px; width: 220px; }

    .table-card { background: white; border-radius: 12px; box-shadow: 0 1px 4px rgba(0,0,0,.06); overflow: hidden; }
    .data-table { width: 100%; border-collapse: collapse; font-size: 14px; }
    .data-table th { text-align: left; padding: 12px 16px; background: #f8fafc; color: #64748b; font-weight: 500; font-size: 12px; text-transform: uppercase; letter-spacing: 0.4px; border-bottom: 1px solid #f1f5f9; }
    .data-table td { padding: 12px 16px; border-bottom: 1px solid #f8fafc; }
    .data-table tr.low-stock-row td { background: #fffbeb; }
    .mono { font-family: monospace; font-size: 13px; }
    .qty { font-weight: 700; }
    .qty.low { color: #dc2626; }
    .category-badge { background: #eff6ff; color: #1d4ed8; padding: 2px 8px; border-radius: 12px; font-size: 12px; }
    .stock-badge { padding: 3px 10px; border-radius: 12px; font-size: 12px; font-weight: 500; }
    .stock-badge.ok { background: #dcfce7; color: #16a34a; }
    .stock-badge.low { background: #fef2f2; color: #dc2626; }
    .icon-btn { background: none; border: none; cursor: pointer; font-size: 16px; padding: 2px 4px; }
    .empty-cell { text-align: center; color: #94a3b8; padding: 40px !important; }

    .modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,.4); display: flex; align-items: center; justify-content: center; z-index: 1000; }
    .modal { background: white; border-radius: 16px; padding: 28px; width: 380px; box-shadow: 0 20px 60px rgba(0,0,0,.2); }
    .modal h4 { font-size: 16px; font-weight: 700; margin: 0 0 20px; }
    .form-group { display: flex; flex-direction: column; gap: 6px; margin-bottom: 20px; }
    .form-group label { font-size: 13px; color: #64748b; font-weight: 500; }
    .form-input { border: 1px solid #e2e8f0; border-radius: 8px; padding: 10px 12px; font-size: 14px; outline: none; }
    .form-input:focus { border-color: #3b82f6; }
    .modal-actions { display: flex; gap: 10px; justify-content: flex-end; }
  `]
})
export class WarehouseComponent implements OnInit {
  private api = inject(WarehouseApiService);

  warehouses = signal<Warehouse[]>([]);
  inventory = signal<InventoryItem[]>([]);
  selectedWarehouse = signal<Warehouse | null>(null);
  scannedItem = signal<InventoryItem | null>(null);
  editingItem = signal<InventoryItem | null>(null);
  showLowStockOnly = signal(false);
  searchTerm = '';
  newQty = 0;

  get lowStockItems() {
    return signal(this.inventory().filter(i => i.isLowStock));
  }

  filteredInventory() {
    let items = this.inventory();
    if (this.showLowStockOnly()) items = items.filter(i => i.isLowStock);
    if (this.searchTerm) {
      const q = this.searchTerm.toLowerCase();
      items = items.filter(i => i.name.toLowerCase().includes(q) || i.sku.toLowerCase().includes(q) || i.category.toLowerCase().includes(q));
    }
    return items;
  }

  ngOnInit() {
    this.api.getAll().subscribe({
      next: ws => {
        this.warehouses.set(ws);
        if (ws.length > 0) this.selectWarehouse(ws[0]);
      },
      error: () => {
        const demo = this.getDemoWarehouses();
        this.warehouses.set(demo);
        this.inventory.set(this.getDemoInventory());
        this.selectedWarehouse.set(demo[0]);
      }
    });
  }

  selectWarehouse(w: Warehouse) {
    this.selectedWarehouse.set(w);
    this.api.getInventory(w.id).subscribe({
      next: items => this.inventory.set(items),
      error: () => this.inventory.set(this.getDemoInventory())
    });
  }

  simulateScan() {
    const items = this.inventory();
    if (items.length > 0) {
      this.scannedItem.set(items[Math.floor(Math.random() * items.length)]);
      setTimeout(() => this.scannedItem.set(null), 5000);
    }
  }

  openUpdateQty(item: InventoryItem) {
    this.editingItem.set(item);
    this.newQty = item.quantity;
  }

  updateQuantity() {
    const item = this.editingItem();
    if (!item) return;
    this.inventory.update(items => items.map(i => i.id === item.id ? { ...i, quantity: this.newQty, isLowStock: this.newQty <= i.minStockLevel } : i));
    this.editingItem.set(null);
  }

  private getDemoWarehouses(): Warehouse[] {
    return [
      { id: '1', name: 'Central Warehouse NYC', address: '789 Dock Rd, New York', latitude: 40.71, longitude: -74.0, totalCapacity: 10000, usedCapacity: 6500, capacityPercentage: 65, managerName: 'John Smith', isActive: true },
      { id: '2', name: 'West Coast Hub LA', address: '321 Harbor Blvd, Los Angeles', latitude: 34.05, longitude: -118.24, totalCapacity: 8000, usedCapacity: 7400, capacityPercentage: 92.5, managerName: 'Sarah Jones', isActive: true },
      { id: '3', name: 'Midwest Distribution', address: '555 Freight Ave, Chicago', latitude: 41.85, longitude: -87.65, totalCapacity: 12000, usedCapacity: 4800, capacityPercentage: 40, managerName: 'Mike Chen', isActive: true },
    ];
  }

  private getDemoInventory(): InventoryItem[] {
    return [
      { id: '1', sku: 'SKU-10021', name: 'Office Chair Pro', category: 'Furniture', quantity: 142, minStockLevel: 50, isLowStock: false, location: 'A1-S3', warehouseName: 'Central Warehouse NYC' },
      { id: '2', sku: 'SKU-10022', name: 'Laptop Stand Aluminium', category: 'Electronics', quantity: 18, minStockLevel: 30, isLowStock: true, location: 'B2-S1', warehouseName: 'Central Warehouse NYC' },
      { id: '3', sku: 'SKU-10023', name: 'Glass Door (Standard)', category: 'Building Materials', quantity: 76, minStockLevel: 20, isLowStock: false, location: 'C3-S2', warehouseName: 'Central Warehouse NYC' },
      { id: '4', sku: 'SKU-10024', name: 'LED Panel 60x60', category: 'Lighting', quantity: 8, minStockLevel: 25, isLowStock: true, location: 'D1-S4', warehouseName: 'Central Warehouse NYC' },
      { id: '5', sku: 'SKU-10025', name: 'Filing Cabinet Steel', category: 'Furniture', quantity: 55, minStockLevel: 10, isLowStock: false, location: 'A2-S1', warehouseName: 'Central Warehouse NYC' },
      { id: '6', sku: 'SKU-10026', name: 'Bubble Wrap Roll 50m', category: 'Packaging', quantity: 200, minStockLevel: 100, isLowStock: false, location: 'E1-S1', warehouseName: 'Central Warehouse NYC' },
      { id: '7', sku: 'SKU-10027', name: 'Pallet Jack Manual', category: 'Equipment', quantity: 4, minStockLevel: 5, isLowStock: true, location: 'F1-S2', warehouseName: 'Central Warehouse NYC' },
      { id: '8', sku: 'SKU-10028', name: 'Cardboard Box Large', category: 'Packaging', quantity: 850, minStockLevel: 200, isLowStock: false, location: 'E2-S3', warehouseName: 'Central Warehouse NYC' },
    ];
  }
}
