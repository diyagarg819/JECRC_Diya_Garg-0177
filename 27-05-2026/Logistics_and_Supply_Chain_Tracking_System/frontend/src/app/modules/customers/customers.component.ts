// src/app/modules/customers/customers.component.ts
import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CustomerApiService } from '../../core/services/api.service';
import { Customer } from '../../core/models/models';

@Component({
  selector: 'app-customers',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="customers-page">
      <div class="page-header">
        <div>
          <h2>Customers</h2>
          <p>Manage your customer accounts and shipment history</p>
        </div>
        <button class="btn-primary" (click)="showAddModal.set(true)">+ Add Customer</button>
      </div>

      <!-- Search + Filter Bar -->
      <div class="filter-bar">
        <div class="search-box">
          <span>🔍</span>
          <input [(ngModel)]="searchTerm" placeholder="Search by name, email, city..." />
        </div>
        <div class="stats-chips">
          <div class="stat-chip">
            <span class="chip-num">{{ customers().length }}</span>
            <span class="chip-lbl">Total</span>
          </div>
          <div class="stat-chip active">
            <span class="chip-num">{{ activeCount() }}</span>
            <span class="chip-lbl">Active</span>
          </div>
        </div>
      </div>

      <!-- Customer Grid -->
      <div class="customer-grid">
        <div *ngFor="let c of filteredCustomers()" class="customer-card" (click)="selectCustomer(c)">
          <div class="customer-avatar">{{ getInitials(c.name) }}</div>
          <div class="customer-info">
            <h4>{{ c.name }}</h4>
            <p class="customer-email">{{ c.email }}</p>
            <p class="customer-location">📍 {{ c.city }}, {{ c.country }}</p>
            <p class="customer-phone">📞 {{ c.phone }}</p>
          </div>
          <div class="customer-stats">
            <div class="stat">
              <span class="stat-val">{{ c.totalShipments }}</span>
              <span class="stat-lbl">Shipments</span>
            </div>
          </div>
          <div class="card-actions">
            <button class="action-btn" title="View shipments">📦</button>
            <button class="action-btn" title="Edit">✏️</button>
            <button class="action-btn" title="More">⋯</button>
          </div>
        </div>
        <div *ngIf="filteredCustomers().length === 0" class="empty-state">
          <span>👥</span>
          <p>No customers found</p>
        </div>
      </div>

      <!-- Customer Detail Panel -->
      <div class="detail-panel" *ngIf="selectedCustomer()">
        <div class="panel-header">
          <h3>{{ selectedCustomer()!.name }}</h3>
          <button (click)="selectedCustomer.set(null)">✕</button>
        </div>
        <div class="panel-body">
          <div class="detail-row"><span class="d-lbl">Email</span><span>{{ selectedCustomer()!.email }}</span></div>
          <div class="detail-row"><span class="d-lbl">Phone</span><span>{{ selectedCustomer()!.phone }}</span></div>
          <div class="detail-row"><span class="d-lbl">Address</span><span>{{ selectedCustomer()!.address }}</span></div>
          <div class="detail-row"><span class="d-lbl">City</span><span>{{ selectedCustomer()!.city }}, {{ selectedCustomer()!.country }}</span></div>
          <div class="detail-row"><span class="d-lbl">Total Shipments</span><span><strong>{{ selectedCustomer()!.totalShipments }}</strong></span></div>
          <button class="btn-view-shipments">View All Shipments →</button>
        </div>
      </div>

      <!-- Add Customer Modal -->
      <div class="modal-overlay" *ngIf="showAddModal()" (click)="showAddModal.set(false)">
        <div class="modal" (click)="$event.stopPropagation()">
          <h4>Add New Customer</h4>
          <div class="form-grid">
            <div class="form-group">
              <label>Name *</label>
              <input [(ngModel)]="newCustomer.name" class="form-input" placeholder="Company or person name" />
            </div>
            <div class="form-group">
              <label>Email *</label>
              <input [(ngModel)]="newCustomer.email" type="email" class="form-input" placeholder="email@example.com" />
            </div>
            <div class="form-group">
              <label>Phone</label>
              <input [(ngModel)]="newCustomer.phone" class="form-input" placeholder="+1-555-0000" />
            </div>
            <div class="form-group">
              <label>City</label>
              <input [(ngModel)]="newCustomer.city" class="form-input" placeholder="City" />
            </div>
            <div class="form-group full">
              <label>Address</label>
              <input [(ngModel)]="newCustomer.address" class="form-input" placeholder="Full address" />
            </div>
            <div class="form-group">
              <label>Country</label>
              <input [(ngModel)]="newCustomer.country" class="form-input" placeholder="Country" />
            </div>
          </div>
          <div class="modal-actions">
            <button class="btn-secondary" (click)="showAddModal.set(false)">Cancel</button>
            <button class="btn-primary" (click)="addCustomer()">Add Customer</button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .customers-page { display: flex; flex-direction: column; gap: 20px; }
    .page-header { display: flex; justify-content: space-between; align-items: flex-start; }
    .page-header h2 { font-size: 22px; font-weight: 700; margin: 0 0 4px; }
    .page-header p { color: #64748b; margin: 0; font-size: 14px; }
    .btn-primary { background: #1d4ed8; color: white; border: none; padding: 10px 20px; border-radius: 8px; font-weight: 600; cursor: pointer; font-size: 14px; }
    .btn-secondary { background: white; color: #374151; border: 1px solid #e2e8f0; padding: 10px 20px; border-radius: 8px; font-weight: 600; cursor: pointer; font-size: 14px; }

    .filter-bar { display: flex; align-items: center; gap: 16px; }
    .search-box { display: flex; align-items: center; gap: 8px; background: white; border: 1px solid #e2e8f0; border-radius: 8px; padding: 8px 12px; flex: 1; max-width: 400px; }
    .search-box input { border: none; outline: none; flex: 1; font-size: 14px; }
    .stats-chips { display: flex; gap: 10px; }
    .stat-chip { display: flex; align-items: center; gap: 6px; background: white; border: 1px solid #e2e8f0; border-radius: 20px; padding: 6px 14px; }
    .stat-chip.active { border-color: #3b82f6; background: #eff6ff; }
    .chip-num { font-weight: 700; font-size: 15px; color: #0f172a; }
    .chip-lbl { font-size: 12px; color: #64748b; }

    .customer-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 16px; }
    .customer-card { background: white; border-radius: 12px; padding: 20px; box-shadow: 0 1px 4px rgba(0,0,0,.06); cursor: pointer; transition: all 0.2s; border: 2px solid transparent; display: flex; flex-direction: column; gap: 12px; }
    .customer-card:hover { border-color: #bfdbfe; transform: translateY(-2px); box-shadow: 0 4px 12px rgba(0,0,0,.1); }
    .customer-avatar { width: 52px; height: 52px; border-radius: 50%; background: linear-gradient(135deg, #1d4ed8, #3b82f6); color: white; display: flex; align-items: center; justify-content: center; font-size: 18px; font-weight: 700; }
    .customer-info h4 { font-size: 16px; font-weight: 700; margin: 0 0 4px; color: #0f172a; }
    .customer-email { font-size: 13px; color: #3b82f6; margin: 0 0 4px; }
    .customer-location, .customer-phone { font-size: 13px; color: #64748b; margin: 2px 0; }
    .customer-stats { display: flex; gap: 16px; padding: 10px 0; border-top: 1px solid #f1f5f9; }
    .stat { display: flex; flex-direction: column; align-items: center; }
    .stat-val { font-size: 18px; font-weight: 700; color: #0f172a; }
    .stat-lbl { font-size: 11px; color: #94a3b8; }
    .card-actions { display: flex; gap: 4px; }
    .action-btn { background: #f8fafc; border: none; border-radius: 6px; padding: 6px 8px; cursor: pointer; font-size: 14px; }
    .action-btn:hover { background: #eff6ff; }
    .empty-state { grid-column: 1/-1; text-align: center; padding: 60px; color: #94a3b8; font-size: 14px; }
    .empty-state span { font-size: 40px; display: block; margin-bottom: 8px; }

    .detail-panel { background: white; border-radius: 12px; padding: 20px; box-shadow: 0 1px 4px rgba(0,0,0,.06); }
    .panel-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; }
    .panel-header h3 { font-size: 16px; font-weight: 700; margin: 0; }
    .panel-header button { background: none; border: none; font-size: 18px; cursor: pointer; color: #94a3b8; }
    .panel-body { display: flex; flex-direction: column; gap: 10px; }
    .detail-row { display: flex; gap: 20px; font-size: 14px; border-bottom: 1px solid #f8fafc; padding-bottom: 8px; }
    .d-lbl { color: #94a3b8; width: 120px; flex-shrink: 0; font-size: 13px; }
    .btn-view-shipments { background: #eff6ff; color: #1d4ed8; border: none; padding: 10px 16px; border-radius: 8px; font-weight: 600; cursor: pointer; margin-top: 8px; align-self: flex-start; }

    .modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,.4); display: flex; align-items: center; justify-content: center; z-index: 1000; }
    .modal { background: white; border-radius: 16px; padding: 28px; width: 520px; box-shadow: 0 20px 60px rgba(0,0,0,.2); }
    .modal h4 { font-size: 18px; font-weight: 700; margin: 0 0 20px; }
    .form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-bottom: 20px; }
    .form-group { display: flex; flex-direction: column; gap: 6px; }
    .form-group.full { grid-column: span 2; }
    .form-group label { font-size: 12px; font-weight: 600; color: #64748b; text-transform: uppercase; }
    .form-input { border: 1px solid #e2e8f0; border-radius: 8px; padding: 10px 12px; font-size: 14px; outline: none; }
    .form-input:focus { border-color: #3b82f6; }
    .modal-actions { display: flex; gap: 10px; justify-content: flex-end; }
  `]
})
export class CustomersComponent implements OnInit {
  private api = inject(CustomerApiService);

  customers = signal<Customer[]>([]);
  selectedCustomer = signal<Customer | null>(null);
  showAddModal = signal(false);
  searchTerm = '';

  newCustomer = { name: '', email: '', phone: '', address: '', city: '', country: '' };

  activeCount() { return this.customers().length; }

  filteredCustomers() {
    if (!this.searchTerm) return this.customers();
    const q = this.searchTerm.toLowerCase();
    return this.customers().filter(c =>
      c.name.toLowerCase().includes(q) ||
      c.email.toLowerCase().includes(q) ||
      c.city.toLowerCase().includes(q)
    );
  }

  ngOnInit() {
    this.api.getAll().subscribe({
      next: cs => this.customers.set(cs),
      error: () => this.customers.set(this.getDemoCustomers())
    });
  }

  selectCustomer(c: Customer) { this.selectedCustomer.set(c); }

  addCustomer() {
    const c: Customer = {
      id: Math.random().toString(36).substring(2),
      ...this.newCustomer,
      totalShipments: 0
    };
    this.customers.update(cs => [c, ...cs]);
    this.showAddModal.set(false);
    this.newCustomer = { name: '', email: '', phone: '', address: '', city: '', country: '' };
  }

  getInitials(name: string): string {
    return name.split(' ').map(w => w[0]).join('').substring(0, 2).toUpperCase();
  }

  private getDemoCustomers(): Customer[] {
    return [
      { id: '1', name: 'Compass East Corp.', email: 'ops@compasseast.com', phone: '+1-555-0101', address: '123 Commerce St', city: 'New York', country: 'USA', totalShipments: 87 },
      { id: '2', name: 'Cyberdyne Industries', email: 'logistics@cyberdyne.com', phone: '+1-555-0202', address: '456 Tech Ave', city: 'Los Angeles', country: 'USA', totalShipments: 42 },
      { id: '3', name: 'DHL Logistics India', email: 'india@dhl.com', phone: '+91-98765-43210', address: 'Tower B, BKC', city: 'Mumbai', country: 'India', totalShipments: 214 },
      { id: '4', name: 'Amazon India Pvt Ltd', email: 'supply@amazon.in', phone: '+91-80-4567-8901', address: 'Brigade Tech Park', city: 'Bangalore', country: 'India', totalShipments: 1042 },
      { id: '5', name: 'Reliance Retail', email: 'logistics@ril.com', phone: '+91-22-3555-5555', address: 'Maker Chambers IV', city: 'Mumbai', country: 'India', totalShipments: 328 },
      { id: '6', name: 'IKEA India', email: 'supply@ikea.in', phone: '+91-124-4567-890', address: 'Plot 1, Sector 29', city: 'Gurugram', country: 'India', totalShipments: 156 },
    ];
  }
}
