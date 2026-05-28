import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TenantService } from '../../core/services/tenant.service';
import { AuthService } from '../../core/services/auth.service';
import { HttpClient } from '@angular/common/http';
import { NgApexchartsModule } from 'ng-apexcharts';

interface LeaveType {
  id: string;
  name: string;
  maxDays: number;
  allowNegativeBalance: boolean;
  isCarryForward: boolean;
  isLwp: boolean;
  color: string;
}

interface LeaveRequest {
  id: string;
  employeeName: string;
  employeeEmail: string;
  leaveTypeName: string;
  startDate: string;
  endDate: string;
  totalDays: number;
  status: 'Pending' | 'Approved' | 'Rejected';
  reason: string;
  createdAt: string;
}

interface LeaveBalance {
  leaveTypeName: string;
  allocated: number;
  used: number;
  available: number;
  color: string;
  chartOptions: any; // Radial chart options
}

@Component({
  selector: 'app-leave-management',
  standalone: true,
  imports: [CommonModule, FormsModule, NgApexchartsModule],
  template: `
    <div class="space-y-8 animate-fade-in text-slate-100">
      <!-- Header -->
      <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 class="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <span class="material-icons text-brand-400">event_busy</span>
            Leave & Workflow Management
          </h1>
          <p class="text-xs text-slate-400 mt-0.5">Submit request forms, view real-time leave balances, track approval status, and manage manager workflows.</p>
        </div>
        <div class="flex items-center gap-2 bg-slate-900/60 border border-slate-800 px-3.5 py-2 rounded-xl">
          <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span class="text-[10px] font-semibold text-slate-300 uppercase tracking-wider">Tenant Schema: {{ tenantName }}</span>
        </div>
      </div>

      <!-- Main Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        <!-- Left Side: Leave Balances & History (8 cols) -->
        <div class="lg:col-span-8 space-y-8">
          
          <!-- Leave Balances with Radial Progress Bars -->
          <div class="glass-card p-6">
            <h2 class="text-sm font-bold text-white mb-5 flex items-center gap-2">
              <span class="material-icons text-xs text-brand-400">pie_chart</span>
              Leave Balances (Radial Gauges)
            </h2>
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div *ngFor="let balance of balances" class="bg-slate-950/40 border border-slate-800/80 p-5 rounded-2xl relative overflow-hidden group hover:border-slate-700 transition duration-300 flex flex-col items-center">
                <!-- Radial Progress Gauge -->
                <div class="w-full flex justify-center py-2 h-36">
                  <apx-chart
                    [series]="balance.chartOptions.series!"
                    [chart]="balance.chartOptions.chart!"
                    [colors]="balance.chartOptions.colors!"
                    [plotOptions]="balance.chartOptions.plotOptions!"
                    [stroke]="balance.chartOptions.stroke!"
                    [labels]="balance.chartOptions.labels!"
                  ></apx-chart>
                </div>
                
                <div class="text-center mt-2 space-y-1">
                  <div class="text-xs font-semibold text-slate-300">{{ balance.leaveTypeName }}</div>
                  <div class="text-[10px] text-slate-400">
                    Used: <strong>{{ balance.used }}</strong> of <strong>{{ balance.allocated }}</strong> days
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Pending Approvals (Visible to Manager / HR Roles) -->
          <div *ngIf="isManager" class="glass-card p-6 border-amber-500/20 bg-gradient-to-br from-slate-900/90 to-slate-950/95">
            <div class="flex items-center justify-between mb-5">
              <h2 class="text-sm font-bold text-white flex items-center gap-2">
                <span class="material-icons text-sm text-amber-400">approval_delegation</span>
                Workflow Inbox (Manager Approvals)
              </h2>
              <span class="bg-amber-500/10 text-amber-400 border border-amber-500/20 text-[9px] font-bold px-2 py-0.5 rounded-full">
                {{ getPendingApprovalsCount() }} pending
              </span>
            </div>
            
            <div *ngIf="getPendingApprovalsCount() === 0" class="flex flex-col items-center justify-center py-6 text-slate-500 text-xs">
              <span class="material-icons text-2xl text-slate-600 mb-2">done_all</span>
              <span>All approvals cleared! No pending requests.</span>
            </div>

            <div class="space-y-4">
              <div *ngFor="let request of pendingApprovals" class="bg-slate-950/60 border border-slate-800 p-4 rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div class="space-y-1">
                  <div class="flex items-center gap-2">
                    <span class="text-xs font-bold text-slate-200">{{ request.employeeName }}</span>
                    <span class="text-[9px] text-slate-400">({{ request.employeeEmail }})</span>
                  </div>
                  <div class="text-[11px] text-slate-300">
                    Requested <span class="text-brand-400 font-semibold">{{ request.leaveTypeName }}</span>: 
                    <span class="text-slate-200 font-medium">{{ request.startDate | date:'MMM d' }}</span> to 
                    <span class="text-slate-200 font-medium">{{ request.endDate | date:'MMM d, y' }}</span> 
                    ({{ request.totalDays }} days)
                  </div>
                  <div *ngIf="request.reason" class="text-[10px] text-slate-400 italic bg-slate-900/50 p-2 rounded border border-slate-800/60 mt-1.5">
                    "{{ request.reason }}"
                  </div>
                </div>
                <div class="flex items-center gap-2.5">
                  <button (click)="approveRequest(request.id)" class="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-[10px] font-bold flex items-center gap-1 transition">
                    <span class="material-icons text-sm">check</span> Approve
                  </button>
                  <button (click)="rejectRequest(request.id)" class="px-3 py-1.5 bg-rose-600 hover:bg-rose-500 text-white rounded-lg text-[10px] font-bold flex items-center gap-1 transition">
                    <span class="material-icons text-sm">close</span> Reject
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Leave History -->
          <div class="glass-card p-6">
            <h2 class="text-sm font-bold text-white mb-5 flex items-center gap-2">
              <span class="material-icons text-xs text-brand-400">history</span>
              Your Request History
            </h2>
            <div *ngIf="userRequests.length === 0" class="text-center py-8 text-slate-500 text-xs">
              No leave requests found.
            </div>
            <div class="overflow-x-auto" *ngIf="userRequests.length > 0">
              <table class="w-full text-left text-xs border-collapse">
                <thead>
                  <tr class="border-b border-slate-800 text-slate-400 font-semibold uppercase text-[9px] tracking-wider">
                    <th class="py-3 px-4">Leave Type</th>
                    <th class="py-3 px-4">Period</th>
                    <th class="py-3 px-4 text-center">Days</th>
                    <th class="py-3 px-4">Reason</th>
                    <th class="py-3 px-4">Status</th>
                    <th class="py-3 px-4 text-right">Submitted</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-800/60">
                  <tr *ngFor="let req of userRequests" class="hover:bg-slate-900/30 transition duration-150">
                    <td class="py-3.5 px-4 text-slate-200 font-medium">{{ req.leaveTypeName }}</td>
                    <td class="py-3.5 px-4 text-slate-300">
                      {{ req.startDate | date:'mediumDate' }} to {{ req.endDate | date:'mediumDate' }}
                    </td>
                    <td class="py-3.5 px-4 text-center text-slate-200 font-bold">{{ req.totalDays }}</td>
                    <td class="py-3.5 px-4 text-slate-400 max-w-xs truncate" [title]="req.reason">{{ req.reason || '—' }}</td>
                    <td class="py-3.5 px-4">
                      <span class="px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase inline-flex items-center gap-1 border"
                            [ngClass]="{
                              'bg-emerald-500/10 text-emerald-400 border-emerald-500/25': req.status === 'Approved',
                              'bg-amber-500/10 text-amber-400 border-amber-500/25': req.status === 'Pending',
                              'bg-rose-500/10 text-rose-400 border-rose-500/25': req.status === 'Rejected'
                            }">
                        <span class="w-1 h-1 rounded-full" 
                              [ngClass]="{
                                'bg-emerald-400': req.status === 'Approved',
                                'bg-amber-400': req.status === 'Pending',
                                'bg-rose-400': req.status === 'Rejected'
                              }"></span>
                        {{ req.status }}
                      </span>
                    </td>
                    <td class="py-3.5 px-4 text-right text-slate-500 text-[10px]">
                      {{ req.createdAt | date:'shortDate' }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- Right Side: Submit Request Form (4 cols) -->
        <div class="lg:col-span-4">
          <div class="glass-card p-6 sticky top-24">
            <h2 class="text-sm font-bold text-white mb-5 flex items-center gap-2">
              <span class="material-icons text-brand-400">add_task</span>
              Request Leave
            </h2>

            <form (submit)="submitLeaveRequest()" class="space-y-4">
              <!-- Leave Type Select -->
              <div>
                <label class="block text-[10px] font-bold text-slate-400 uppercase tracking-wide mb-1.5">Leave Type</label>
                <select [(ngModel)]="newRequest.leaveTypeId" name="leaveTypeId" 
                        class="w-full bg-slate-950 border border-slate-800 text-xs text-slate-200 rounded-xl px-3.5 py-2.5 focus:border-brand-500 focus:ring-1 focus:ring-brand-500/25 outline-none transition cursor-pointer">
                  <option value="" disabled selected>Select type...</option>
                  <option *ngFor="let type of leaveTypes" [value]="type.id">
                    {{ type.name }} (Max: {{ type.maxDays }}d)
                  </option>
                </select>
              </div>

              <!-- Start Date -->
              <div>
                <label class="block text-[10px] font-bold text-slate-400 uppercase tracking-wide mb-1.5">Start Date</label>
                <div class="relative cursor-pointer">
                  <input type="date" #startPicker [(ngModel)]="newRequest.startDate" name="startDate" 
                         (change)="calculateRequestedDays()" (click)="startPicker.showPicker()"
                         class="w-full bg-slate-950 border border-slate-800 text-xs text-slate-200 rounded-xl pl-3.5 pr-10 py-2.5 focus:border-brand-500 focus:ring-1 focus:ring-brand-500/25 outline-none transition cursor-pointer" />
                  <span class="material-icons absolute right-3.5 top-2.5 text-xs text-slate-400 pointer-events-none">calendar_month</span>
                </div>
              </div>

              <!-- End Date -->
              <div>
                <label class="block text-[10px] font-bold text-slate-400 uppercase tracking-wide mb-1.5">End Date</label>
                <div class="relative cursor-pointer">
                  <input type="date" #endPicker [(ngModel)]="newRequest.endDate" name="endDate" 
                         (change)="calculateRequestedDays()" (click)="endPicker.showPicker()"
                         class="w-full bg-slate-950 border border-slate-800 text-xs text-slate-200 rounded-xl pl-3.5 pr-10 py-2.5 focus:border-brand-500 focus:ring-1 focus:ring-brand-500/25 outline-none transition cursor-pointer" />
                  <span class="material-icons absolute right-3.5 top-2.5 text-xs text-slate-400 pointer-events-none">calendar_month</span>
                </div>
              </div>

              <!-- Computed Days Display -->
              <div *ngIf="computedDays > 0" class="bg-slate-950/60 border border-slate-800/80 p-3.5 rounded-xl flex items-center justify-between text-xs">
                <span class="text-slate-400">Total Requested Duration:</span>
                <span class="font-bold text-white">{{ computedDays }} {{ computedDays === 1 ? 'day' : 'days' }}</span>
              </div>

              <!-- Reason -->
              <div>
                <label class="block text-[10px] font-bold text-slate-400 uppercase tracking-wide mb-1.5">Reason / Comments</label>
                <textarea [(ngModel)]="newRequest.reason" name="reason" rows="3" placeholder="Enter reason for leave..."
                          class="w-full bg-slate-950 border border-slate-800 text-xs text-slate-200 rounded-xl px-3.5 py-2.5 focus:border-brand-500 focus:ring-1 focus:ring-brand-500/25 outline-none transition resize-none"></textarea>
              </div>

              <!-- Errors -->
              <div *ngIf="formError" class="bg-rose-500/10 border border-rose-500/20 p-3.5 rounded-xl flex items-start gap-2.5 text-[11px] text-rose-400">
                <span class="material-icons text-xs mt-0.5">error_outline</span>
                <span>{{ formError }}</span>
              </div>

              <!-- Success Message -->
              <div *ngIf="formSuccess" class="bg-emerald-500/10 border border-emerald-500/20 p-3.5 rounded-xl flex items-start gap-2.5 text-[11px] text-emerald-400">
                <span class="material-icons text-xs mt-0.5">check_circle_outline</span>
                <span>{{ formSuccess }}</span>
              </div>

              <!-- Submit Button -->
              <button type="submit" class="w-full bg-brand-600 hover:bg-brand-500 text-white rounded-xl py-3 text-xs font-bold transition flex items-center justify-center gap-1">
                <span class="material-icons text-sm">send</span> Submit Request
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  `
})
export class LeaveManagementComponent implements OnInit {
  private tenantService = inject(TenantService);
  private authService = inject(AuthService);
  private http = inject(HttpClient);

  public tenantName = 'Capgemini India';
  public isManager = false;

  public leaveTypes: LeaveType[] = [
    { id: '1', name: 'Casual Leave', maxDays: 12, allowNegativeBalance: false, isCarryForward: false, isLwp: false, color: '#0c83eb' },
    { id: '2', name: 'Sick Leave', maxDays: 10, allowNegativeBalance: false, isCarryForward: false, isLwp: false, color: '#f59e0b' },
    { id: '3', name: 'Earned Leave', maxDays: 18, allowNegativeBalance: false, isCarryForward: true, isLwp: false, color: '#10b981' },
    { id: '4', name: 'Leave Without Pay', maxDays: 365, allowNegativeBalance: true, isCarryForward: false, isLwp: true, color: '#a855f7' }
  ];

  public balances: LeaveBalance[] = [];
  public userRequests: LeaveRequest[] = [];
  public pendingApprovals: LeaveRequest[] = [];

  public newRequest = {
    leaveTypeId: '',
    startDate: '',
    endDate: '',
    reason: ''
  };

  public computedDays = 0;
  public formError = '';
  public formSuccess = '';

  ngOnInit(): void {
    const user = this.authService.currentUser();
    this.isManager = this.authService.hasRole(['HR']);
    
    if (user?.tenantId === '7f04c0cf-031e-450f-a189-e1fca9473fa7') {
      this.tenantName = 'Capgemini USA';
      this.leaveTypes = [
        { id: '5', name: 'Paid Time Off (PTO)', maxDays: 25, allowNegativeBalance: false, isCarryForward: true, isLwp: false, color: '#0c83eb' },
        { id: '4', name: 'Leave Without Pay', maxDays: 365, allowNegativeBalance: true, isCarryForward: false, isLwp: true, color: '#a855f7' }
      ];
    } else {
      this.tenantName = 'Capgemini India';
    }

    this.loadBalancesAndRequests();
  }

  public getPendingApprovalsCount(): number {
    return this.pendingApprovals.length;
  }

  private loadBalancesAndRequests(): void {
    const user = this.authService.currentUser();
    if (!user) return;

    const storageKey = `leave_requests_${user.tenantId}`;
    const rawRequests = localStorage.getItem(storageKey);
    let allRequests: LeaveRequest[] = [];

    if (rawRequests) {
      allRequests = JSON.parse(rawRequests) as LeaveRequest[];
    } else {
      allRequests = [
        {
          id: 'req-1',
          employeeName: 'Priya Patel',
          employeeEmail: 'priya.patel@capgemini-in.com',
          leaveTypeName: 'Sick Leave',
          startDate: '2026-05-10',
          endDate: '2026-05-12',
          totalDays: 3,
          status: 'Approved',
          reason: 'Recovering from seasonal flu.',
          createdAt: new Date(2026, 4, 9).toISOString()
        },
        {
          id: 'req-2',
          employeeName: 'Rajesh Kumar',
          employeeEmail: 'rajesh.kumar@capgemini-in.com',
          leaveTypeName: 'Casual Leave',
          startDate: '2026-06-15',
          endDate: '2026-06-16',
          totalDays: 2,
          status: 'Pending',
          reason: 'Family gathering event.',
          createdAt: new Date().toISOString()
        },
        {
          id: 'req-3',
          employeeName: 'Amit Sharma',
          employeeEmail: 'amit.sharma@capgemini-in.com',
          leaveTypeName: 'Earned Leave',
          startDate: '2026-07-20',
          endDate: '2026-07-25',
          totalDays: 6,
          status: 'Pending',
          reason: 'Summer vacation trip.',
          createdAt: new Date().toISOString()
        }
      ];
      localStorage.setItem(storageKey, JSON.stringify(allRequests));
    }

    this.userRequests = allRequests.filter(r => r.employeeEmail === user.email);
    this.pendingApprovals = allRequests.filter(r => r.status === 'Pending' && r.employeeEmail !== user.email);

    this.balances = this.leaveTypes.map(type => {
      const used = this.userRequests
        .filter(r => r.leaveTypeName === type.name && r.status === 'Approved')
        .reduce((sum, r) => sum + r.totalDays, 0);

      const available = Math.max(0, type.maxDays - used);
      const usedPercent = Math.min(100, Math.round((used / type.maxDays) * 100));
      const remainingPercent = 100 - usedPercent;

      // Custom ApexCharts Radial Bar Config
      const chartOptions = {
        series: [remainingPercent],
        chart: {
          type: 'radialBar',
          height: 140,
          sparkline: { enabled: true }
        },
        colors: [type.color],
        stroke: { lineCap: 'round' },
        plotOptions: {
          radialBar: {
            hollow: { size: '60%' },
            dataLabels: {
              name: { show: false },
              value: {
                offsetY: 5,
                fontSize: '15px',
                color: '#ffffff',
                fontWeight: 'bold',
                formatter: () => `${available}d`
              }
            }
          }
        },
        labels: [type.name]
      };

      return {
        leaveTypeName: type.name,
        allocated: type.maxDays,
        used,
        available,
        color: type.color,
        chartOptions
      };
    });
  }

  // Calculates the duration of the requested leave period in days by taking the absolute millisecond
  // difference between the start and end dates and converting it to days.
  // This is used to display reactive feedback to the employee before they submit, and to perform boundary checks.
  public calculateRequestedDays(): void {
    if (!this.newRequest.startDate || !this.newRequest.endDate) {
      this.computedDays = 0;
      return;
    }

    const start = new Date(this.newRequest.startDate);
    const end = new Date(this.newRequest.endDate);

    if (end < start) {
      this.computedDays = 0;
      return;
    }

    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    this.computedDays = diffDays;
  }

  // Orchestrates the leave request submission pipeline.
  // 1. Enforces data entry checks.
  // 2. Evaluates the requested days against the user's available leave balance (unless category allows negative balances).
  // 3. Executes an overlap guard against previous active/pending bookings to prevent double-booking conflicts.
  // 4. Writes the transactional request to localStorage (scoped by tenant) and refreshes radial bar chart gauges.
  public submitLeaveRequest(): void {
    this.formError = '';
    this.formSuccess = '';

    const user = this.authService.currentUser();
    if (!user) return;

    if (!this.newRequest.leaveTypeId) {
      this.formError = 'Please select a leave type.';
      return;
    }
    if (!this.newRequest.startDate || !this.newRequest.endDate) {
      this.formError = 'Please choose start and end dates.';
      return;
    }

    const start = new Date(this.newRequest.startDate);
    const end = new Date(this.newRequest.endDate);

    if (end < start) {
      this.formError = 'End date cannot be prior to start date.';
      return;
    }

    const selectedType = this.leaveTypes.find(t => t.id === this.newRequest.leaveTypeId);
    if (!selectedType) return;

    const balanceObj = this.balances.find(b => b.leaveTypeName === selectedType.name);
    if (balanceObj && this.computedDays > balanceObj.available && !selectedType.allowNegativeBalance) {
      this.formError = `Insufficient balance. You only have ${balanceObj.available} days left for ${selectedType.name}.`;
      return;
    }

    const hasOverlap = this.userRequests.some(r => {
      if (r.status === 'Rejected') return false;
      const rStart = new Date(r.startDate);
      const rEnd = new Date(r.endDate);
      return start <= rEnd && end >= rStart;
    });

    if (hasOverlap) {
      this.formError = 'Overlap error: You already have a pending/approved leave request during this date range.';
      return;
    }

    const storageKey = `leave_requests_${user.tenantId}`;
    const rawRequests = localStorage.getItem(storageKey);
    const allRequests: LeaveRequest[] = rawRequests ? JSON.parse(rawRequests) : [];

    const newRequestItem: LeaveRequest = {
      id: 'req-' + Date.now(),
      employeeName: user.email.split('@')[0].split('.').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
      employeeEmail: user.email,
      leaveTypeName: selectedType.name,
      startDate: this.newRequest.startDate,
      endDate: this.newRequest.endDate,
      totalDays: this.computedDays,
      status: 'Pending',
      reason: this.newRequest.reason,
      createdAt: new Date().toISOString()
    };

    allRequests.unshift(newRequestItem);
    localStorage.setItem(storageKey, JSON.stringify(allRequests));

    this.newRequest = { leaveTypeId: '', startDate: '', endDate: '', reason: '' };
    this.computedDays = 0;
    this.formSuccess = 'Your leave request has been submitted successfully and routed into manager approval workflows.';
    this.loadBalancesAndRequests();
  }

  // Wrapper method invoked by the HR manager in the Workflow Inbox to mark a pending request as Approved.
  public approveRequest(id: string): void {
    this.updateRequestStatus(id, 'Approved');
  }

  // Wrapper method invoked by the HR manager in the Workflow Inbox to mark a pending request as Rejected.
  public rejectRequest(id: string): void {
    this.updateRequestStatus(id, 'Rejected');
  }

  // Low-level helper method that performs write updates on the leave requests list inside localStorage.
  // Updates the target record's status, saves changes, and refreshes the user's balances and radial charts.
  private updateRequestStatus(id: string, status: 'Approved' | 'Rejected'): void {
    const user = this.authService.currentUser();
    if (!user) return;

    const storageKey = `leave_requests_${user.tenantId}`;
    const rawRequests = localStorage.getItem(storageKey);
    if (!rawRequests) return;

    const allRequests = JSON.parse(rawRequests) as LeaveRequest[];
    const targetIdx = allRequests.findIndex(r => r.id === id);

    if (targetIdx !== -1) {
      allRequests[targetIdx].status = status;
      localStorage.setItem(storageKey, JSON.stringify(allRequests));
      this.loadBalancesAndRequests();
    }
  }
}
