import { Component, inject, OnInit, DestroyRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Subject, debounceTime, distinctUntilChanged, switchMap, of, catchError } from 'rxjs';
import { AuthService } from '../../core/services/auth.service';
import { TenantService } from '../../core/services/tenant.service';

interface Employee {
  id: string;
  employeeCode: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
  dateOfJoining: string;
  employmentType: string;
  status: string;
  departmentId?: string;
  department?: { name: string };
  designationId?: string;
  designation?: { name: string };
}

interface Department {
  id: string;
  name: string;
}

interface EmployeeListResponse {
  data: Employee[];
  meta?: {
    totalCount?: number;
    page?: number;
    pageSize?: number;
  };
}

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  template: `
    <div class="space-y-6 animate-fade-in">
      <!-- Header Actions -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 class="text-2xl font-bold tracking-tight text-white">Workforce Management</h1>
          <p class="text-xs text-slate-400 mt-0.5">Manage directory details, departments transfers, and termination events.</p>
        </div>

        <button id="addEmployeeBtn" (click)="openAddModal()"
                class="bg-brand-600 hover:bg-brand-500 text-white text-xs font-semibold py-2.5 px-4 rounded-xl flex items-center justify-center space-x-1.5 transition-all shadow-md shadow-brand-600/10">
          <span class="material-icons text-sm">person_add</span>
          <span>Add Employee</span>
        </button>
      </div>

      <!-- Filters & Search Bar -->
      <div class="glass-card p-4 flex flex-col md:flex-row gap-4 items-center justify-between">
        <div class="w-full md:w-96 relative">
          <span class="material-icons absolute left-3.5 top-3 text-slate-500 text-sm">search</span>
          <input id="employeeSearchInput" type="text" [(ngModel)]="searchQuery" (input)="onSearchInput()" placeholder="Search by name, code or email..."
                 class="w-full bg-slate-900 border border-slate-800 focus:border-brand-500 focus:ring-1 focus:ring-brand-500 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-200 outline-none transition-all placeholder:text-slate-600" />
        </div>

        <div class="flex items-center space-x-4">
          <span class="text-[11px] text-slate-500">Active Tenant isolation: <strong>{{ tenantService.getActiveTenant().countryCode }} Rules</strong></span>
          <!-- Pagination Info -->
          <span class="text-[11px] text-slate-400 font-mono">
            Page {{ currentPage }} of {{ totalPages || 1 }} ({{ totalCount }} records)
          </span>
        </div>
      </div>

      <!-- Employee Grid / Table -->
      <div class="glass-card overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full text-left border-collapse">
            <thead>
              <tr class="border-b border-slate-800 text-[10px] font-bold uppercase tracking-wider text-slate-400 bg-slate-900/30">
                <th class="px-6 py-4">Employee Code</th>
                <th class="px-6 py-4">Full Name</th>
                <th class="px-6 py-4">Email</th>
                <th class="px-6 py-4">Department & Role</th>
                <th class="px-6 py-4">Status</th>
                <th class="px-6 py-4">Joined Date</th>
                <th class="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-800/50 text-xs text-slate-300">
              @for (emp of employees; track emp.id) {
                <tr class="hover:bg-slate-800/20 transition-colors">
                  <td class="px-6 py-4 font-mono font-semibold text-brand-400">{{ emp.employeeCode }}</td>
                  <td class="px-6 py-4 font-medium text-slate-200">{{ emp.firstName }} {{ emp.lastName }}</td>
                  <td class="px-6 py-4 text-slate-400">{{ emp.email }}</td>
                  <td class="px-6 py-4">
                    <p class="font-semibold text-slate-200">{{ emp.department?.name || 'Unassigned' }}</p>
                    <p class="text-[10px] text-slate-500 mt-0.5">{{ emp.designation?.name || emp.employmentType }}</p>
                  </td>
                  <td class="px-6 py-4">
                    <span class="px-2.5 py-1 rounded-full text-[9px] font-bold uppercase tracking-wide"
                          [ngClass]="{
                            'bg-emerald-900/20 text-emerald-400 border border-emerald-500/20': emp.status === 'active',
                            'bg-red-900/20 text-red-400 border border-red-500/20': emp.status === 'terminated',
                            'bg-amber-900/20 text-amber-400 border border-amber-500/20': emp.status === 'suspended'
                          }">
                      {{ emp.status }}
                    </span>
                  </td>
                  <td class="px-6 py-4 text-slate-400">{{ emp.dateOfJoining | date:'mediumDate' }}</td>
                  <td class="px-6 py-4 text-right">
                    <div class="flex items-center justify-end space-x-1">
                      <button (click)="openTransferModal(emp)" [disabled]="emp.status === 'terminated'"
                              title="Department Transfer"
                              class="p-1.5 hover:bg-slate-800 text-slate-400 hover:text-brand-400 rounded-lg transition-colors disabled:opacity-30">
                        <span class="material-icons text-sm">swap_horiz</span>
                      </button>
                      <button (click)="openTerminateModal(emp)" [disabled]="emp.status === 'terminated'"
                              title="Terminate Employee"
                              class="p-1.5 hover:bg-slate-800 text-slate-400 hover:text-red-400 rounded-lg transition-colors disabled:opacity-30">
                        <span class="material-icons text-sm">person_off</span>
                      </button>
                      <button (click)="requestSoftDelete(emp)"
                              title="Soft-Delete Record"
                              class="p-1.5 hover:bg-slate-800 text-slate-400 hover:text-red-500 rounded-lg transition-colors">
                        <span class="material-icons text-sm">delete</span>
                      </button>
                    </div>
                  </td>
                </tr>
              } @empty {
                <tr>
                  <td colspan="7" class="px-6 py-12 text-center text-slate-500 font-medium">
                    No active employees registered. Click "Add Employee" to create one.
                  </td>
                </tr>
              }
            </tbody>
          </table>
        </div>

        <!-- Server-Side Pagination Controls -->
        @if (totalPages > 1) {
          <div class="flex items-center justify-between px-6 py-3 border-t border-slate-800 bg-slate-900/20">
            <button (click)="goToPage(currentPage - 1)" [disabled]="currentPage <= 1"
                    class="flex items-center text-xs font-semibold text-slate-400 hover:text-brand-400 disabled:opacity-30 disabled:cursor-not-allowed transition-colors px-3 py-1.5 rounded-lg hover:bg-slate-800">
              <span class="material-icons text-sm mr-1">chevron_left</span> Previous
            </button>
            <div class="flex items-center space-x-1">
              @for (p of paginationRange; track p) {
                <button (click)="goToPage(p)"
                        class="h-8 w-8 rounded-lg text-xs font-semibold transition-all"
                        [ngClass]="p === currentPage ? 'bg-brand-600 text-white shadow-md' : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'">
                  {{ p }}
                </button>
              }
            </div>
            <button (click)="goToPage(currentPage + 1)" [disabled]="currentPage >= totalPages"
                    class="flex items-center text-xs font-semibold text-slate-400 hover:text-brand-400 disabled:opacity-30 disabled:cursor-not-allowed transition-colors px-3 py-1.5 rounded-lg hover:bg-slate-800">
              Next <span class="material-icons text-sm ml-1">chevron_right</span>
            </button>
          </div>
        }
      </div>

      <!-- Add Employee Modal Dialog (Overlay) -->
      @if (showAddModal) {
        <div class="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div class="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl animate-fade-in relative">
            <h3 class="text-lg font-bold text-white mb-1">New Employee Enrollment</h3>
            <p class="text-xs text-slate-400 mb-6">Enter bio details. Tenant validation rules automatically enforce code uniqueness.</p>
            
            <form [formGroup]="empForm" (ngSubmit)="saveEmployee()" class="space-y-4">
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label for="empCodeInput" class="block text-[10px] font-bold text-slate-400 uppercase mb-1">Employee Code</label>
                  <input id="empCodeInput" type="text" formControlName="employeeCode" placeholder="e.g. EMP-IN-101"
                         class="w-full bg-slate-950 border border-slate-800 focus:border-brand-500 focus:ring-1 focus:ring-brand-500 rounded-xl px-3 py-2 text-xs text-slate-200 outline-none" />
                  <!-- Edge case: show validation errors -->
                  @if (empForm.get('employeeCode')?.touched && empForm.get('employeeCode')?.hasError('required')) {
                    <p class="text-red-400 text-[10px] mt-0.5">Required</p>
                  }
                  @if (empForm.get('employeeCode')?.touched && empForm.get('employeeCode')?.hasError('pattern')) {
                    <p class="text-red-400 text-[10px] mt-0.5">Format: EMP-XX-NNN</p>
                  }
                </div>
                <div>
                  <label for="empEmailInput" class="block text-[10px] font-bold text-slate-400 uppercase mb-1">Email</label>
                  <input id="empEmailInput" type="email" formControlName="email" placeholder="e.g. user&#64;capgemini.com"
                         class="w-full bg-slate-950 border border-slate-800 focus:border-brand-500 focus:ring-1 focus:ring-brand-500 rounded-xl px-3 py-2 text-xs text-slate-200 outline-none" />
                  @if (empForm.get('email')?.touched && empForm.get('email')?.hasError('required')) {
                    <p class="text-red-400 text-[10px] mt-0.5">Required</p>
                  }
                  @if (empForm.get('email')?.touched && empForm.get('email')?.hasError('email')) {
                    <p class="text-red-400 text-[10px] mt-0.5">Invalid email</p>
                  }
                </div>
              </div>

              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label for="empFirstName" class="block text-[10px] font-bold text-slate-400 uppercase mb-1">First Name</label>
                  <input id="empFirstName" type="text" formControlName="firstName" placeholder="First Name"
                         class="w-full bg-slate-950 border border-slate-800 focus:border-brand-500 focus:ring-1 focus:ring-brand-500 rounded-xl px-3 py-2 text-xs text-slate-200 outline-none" />
                  @if (empForm.get('firstName')?.touched && empForm.get('firstName')?.hasError('required')) {
                    <p class="text-red-400 text-[10px] mt-0.5">Required</p>
                  }
                </div>
                <div>
                  <label for="empLastName" class="block text-[10px] font-bold text-slate-400 uppercase mb-1">Last Name</label>
                  <input id="empLastName" type="text" formControlName="lastName" placeholder="Last Name"
                         class="w-full bg-slate-950 border border-slate-800 focus:border-brand-500 focus:ring-1 focus:ring-brand-500 rounded-xl px-3 py-2 text-xs text-slate-200 outline-none" />
                  @if (empForm.get('lastName')?.touched && empForm.get('lastName')?.hasError('required')) {
                    <p class="text-red-400 text-[10px] mt-0.5">Required</p>
                  }
                </div>
              </div>

              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label for="empDojInput" class="block text-[10px] font-bold text-slate-400 uppercase mb-1">Date of Joining</label>
                  <input id="empDojInput" type="date" formControlName="dateOfJoining"
                         class="w-full bg-slate-950 border border-slate-800 focus:border-brand-500 focus:ring-1 focus:ring-brand-500 rounded-xl px-3 py-2 text-xs text-slate-200 outline-none" />
                  @if (empForm.get('dateOfJoining')?.touched && empForm.get('dateOfJoining')?.hasError('required')) {
                    <p class="text-red-400 text-[10px] mt-0.5">Required</p>
                  }
                </div>
                <div>
                  <label for="empTypeSelect" class="block text-[10px] font-bold text-slate-400 uppercase mb-1">Employment Type</label>
                  <select id="empTypeSelect" formControlName="employmentType"
                          class="w-full bg-slate-950 border border-slate-800 focus:border-brand-500 focus:ring-1 focus:ring-brand-500 rounded-xl px-3 py-2 text-xs text-slate-200 outline-none cursor-pointer">
                    <option value="FullTime">FullTime</option>
                    <option value="Contractor">Contractor</option>
                    <option value="PartTime">PartTime</option>
                  </select>
                </div>
              </div>

              <!-- Edge case fix: Department selector (was auto-assigned to first dept) -->
              <div>
                <label for="empDeptSelect" class="block text-[10px] font-bold text-slate-400 uppercase mb-1">Department</label>
                <select id="empDeptSelect" formControlName="departmentId"
                        class="w-full bg-slate-950 border border-slate-800 focus:border-brand-500 focus:ring-1 focus:ring-brand-500 rounded-xl px-3 py-2 text-xs text-slate-200 outline-none cursor-pointer">
                  @for (d of departments; track d.id) {
                    <option [value]="d.id">{{ d.name }}</option>
                  }
                </select>
              </div>

              <div class="flex items-center justify-end space-x-3 pt-6 border-t border-slate-800/50">
                <button type="button" (click)="closeAddModal()" class="text-xs text-slate-400 hover:text-white px-4 py-2 font-medium">Cancel</button>
                <button id="enrollEmployeeBtn" type="submit" [disabled]="empForm.invalid" class="bg-brand-600 hover:bg-brand-500 disabled:opacity-50 text-white text-xs font-semibold px-5 py-2.5 rounded-xl transition-all">Enroll Employee</button>
              </div>
            </form>
          </div>
        </div>
      }

      <!-- Soft-Delete Confirmation Modal (replaces window.confirm) -->
      @if (showDeleteConfirmModal && pendingDeleteEmp) {
        <div class="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div class="w-full max-w-sm bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl animate-fade-in">
            <div class="flex items-center space-x-3 mb-4">
              <div class="p-2 bg-red-500/10 border border-red-500/20 rounded-xl">
                <span class="material-icons text-red-400">warning</span>
              </div>
              <h3 class="text-base font-bold text-white">Confirm Soft-Delete</h3>
            </div>
            <p class="text-xs text-slate-400 mb-6">
              Are you sure you want to soft-delete <strong class="text-slate-200">{{ pendingDeleteEmp.firstName }} {{ pendingDeleteEmp.lastName }}</strong> ({{ pendingDeleteEmp.employeeCode }})?
              This sets <code class="text-brand-400">IsDeleted = true</code> — the record can be restored later.
            </p>
            <div class="flex items-center justify-end space-x-3 pt-4 border-t border-slate-800/50">
              <button (click)="cancelDelete()" class="text-xs text-slate-400 hover:text-white px-3 py-1.5 font-medium">Cancel</button>
              <button (click)="confirmSoftDelete()" class="bg-red-600 hover:bg-red-500 text-white text-xs font-semibold px-4 py-2 rounded-xl transition-all">Soft-Delete</button>
            </div>
          </div>
        </div>
      }

      <!-- Transfer Modal -->
      @if (showTransferModal && selectedEmp) {
        <div class="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div class="w-full max-w-sm bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl animate-fade-in">
            <h3 class="text-base font-bold text-white mb-1">Transfer Department</h3>
            <p class="text-xs text-slate-400 mb-6">Select the new department for <strong>{{ selectedEmp.firstName }} {{ selectedEmp.lastName }}</strong>.</p>
            
            <div class="space-y-4">
              <div>
                <label for="transferDeptSelect" class="block text-[10px] font-bold text-slate-400 uppercase mb-1">Department</label>
                <select id="transferDeptSelect" [(ngModel)]="newDeptId" class="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 outline-none">
                  @for (d of departments; track d.id) {
                    <option [value]="d.id">{{ d.name }}</option>
                  }
                </select>
              </div>

              <div class="flex items-center justify-end space-x-3 pt-4 border-t border-slate-800/50">
                <button (click)="closeTransferModal()" class="text-xs text-slate-400 hover:text-white px-3 py-1.5 font-medium">Cancel</button>
                <button (click)="executeTransfer()" class="bg-brand-600 hover:bg-brand-500 text-white text-xs font-semibold px-4 py-2 rounded-xl transition-all">Submit Transfer</button>
              </div>
            </div>
          </div>
        </div>
      }

      <!-- Terminate Modal -->
      @if (showTerminateModal && selectedEmp) {
        <div class="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div class="w-full max-w-sm bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl animate-fade-in">
            <h3 class="text-base font-bold text-white mb-1">Terminate Employee Lifecycle</h3>
            <p class="text-xs text-slate-400 mb-6">Initiate offboarding procedure for <strong>{{ selectedEmp.firstName }} {{ selectedEmp.lastName }}</strong>.</p>
            
            <div class="space-y-4">
              <div>
                <label for="terminationDateInput" class="block text-[10px] font-bold text-slate-400 uppercase mb-1">Termination Date</label>
                <input id="terminationDateInput" type="date" [(ngModel)]="terminationDate" class="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 outline-none" />
              </div>
              <div>
                <label for="terminationReasonInput" class="block text-[10px] font-bold text-slate-400 uppercase mb-1">Reason</label>
                <textarea id="terminationReasonInput" [(ngModel)]="terminationReason" placeholder="Reason for termination..." class="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 outline-none h-20 resize-none"></textarea>
              </div>

              <div class="flex items-center justify-end space-x-3 pt-4 border-t border-slate-800/50">
                <button (click)="closeTerminateModal()" class="text-xs text-slate-400 hover:text-white px-3 py-1.5 font-medium">Cancel</button>
                <button (click)="executeTermination()" class="bg-red-600 hover:bg-red-500 text-white text-xs font-semibold px-4 py-2 rounded-xl transition-all">Terminate Employee</button>
              </div>
            </div>
          </div>
        </div>
      }
    </div>
  `
})
export class EmployeeListComponent implements OnInit {
  public authService = inject(AuthService);
  public tenantService = inject(TenantService);
  private http = inject(HttpClient);
  private fb = inject(FormBuilder);
  private destroyRef = inject(DestroyRef);

  public employees: Employee[] = [];
  public searchQuery = '';
  public showAddModal = false;
  
  // Modals for Actions
  public showTransferModal = false;
  public showTerminateModal = false;
  public selectedEmp: Employee | null = null;
  public newDeptId = '';
  public terminationDate = '';
  public terminationReason = '';

  // Edge case fix: Custom delete confirmation modal (replaces window.confirm)
  public showDeleteConfirmModal = false;
  public pendingDeleteEmp: Employee | null = null;

  // Edge case fix: Server-side pagination
  public currentPage = 1;
  public pageSize = 20;
  public totalCount = 0;
  public totalPages = 1;
  public paginationRange: number[] = [1];

  // Options
  public departments: Department[] = [];

  // Edge case fix: Search debounce subject
  private searchSubject = new Subject<string>();

  public empForm: FormGroup = this.fb.group({
    employeeCode: ['', [Validators.required, Validators.pattern(/^EMP-[A-Z]{2}-\d{3,}$/)]],
    firstName: ['', [Validators.required, Validators.minLength(2)]],
    lastName: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    dateOfJoining: [new Date().toISOString().substring(0, 10), Validators.required],
    employmentType: ['FullTime', Validators.required],
    departmentId: ['', Validators.required]
  });

  // ngOnInit is the lifecycle initialization hook.
  // It handles:
  // 1. Loading departments dynamic dropdown selectors scoped to the active tenant.
  // 2. Querying the employee list for rendering.
  // 3. Implementing a Search Debounce pipeline using RxJS to throttle search keystrokes (300ms)
  //    and cancel active in-flight requests (using switchMap) to prevent frontend/API flooding.
  public ngOnInit(): void {
    this.loadDepartments();
    this.loadEmployees();

    this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(query => {
        this.searchQuery = query;
        this.currentPage = 1;
        return this.fetchEmployees$();
      }),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(result => {
      this.employees = result.data;
      this.totalCount = result.totalCount;
      this.totalPages = result.totalPages;
      this.updatePaginationRange();
    });
  }

  // Invoked on search keystrokes to pass input query strings into the reactive RxJS debounce stream
  public onSearchInput(): void {
    this.searchSubject.next(this.searchQuery);
  }

  // Triggers standard employee queries from the backend API during initialization or paging actions
  public loadEmployees(): void {
    this.fetchEmployees$().pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(result => {
      this.employees = result.data;
      this.totalCount = result.totalCount;
      this.totalPages = result.totalPages;
      this.updatePaginationRange();
    });
  }

  // Generates server-side pagination-ready REST GET requests incorporating current page limits, sizes,
  // and search query overrides. Automatically parses metadata structures, falling back gracefully
  // to getMockEmployees() if the backend database is offline.
  private fetchEmployees$() {
    let url = `${this.authService.apiUrl}/employees?page=${this.currentPage}&pageSize=${this.pageSize}`;
    if (this.searchQuery) {
      url += `&search=${encodeURIComponent(this.searchQuery)}`;
    }
    return this.http.get<EmployeeListResponse>(url).pipe(
      switchMap(res => {
        const totalCount = res.meta?.totalCount ?? res.data.length;
        const totalPages = Math.max(1, Math.ceil(totalCount / this.pageSize));
        return of({ data: res.data, totalCount, totalPages });
      }),
      catchError(() => {
        const mockData = this.getMockEmployees();
        return of({ data: mockData, totalCount: mockData.length, totalPages: 1 });
      })
    );
  }

  // Pre-populates department dropdown identifiers matching the active tenant (India vs USA)
  // to enforce strict multi-tenant boundary parameters on record enrollment forms.
  public loadDepartments(): void {
    const activeTenantId = this.tenantService.currentTenantId();
    if (activeTenantId === 'e3b97b0a-3a7b-4df2-bdcb-a032de2a1bf6') {
      this.departments = [
        { id: '6b2b2b1a-9694-4d89-9a74-b5861b585321', name: 'Engineering' },
        { id: 'd5d71c84-9c8b-4b14-998f-0d944e82df4b', name: 'Human Resources' }
      ];
    } else {
      this.departments = [
        { id: '707c7c34-eb17-48f1-8f52-87053ff8479a', name: 'Engineering' },
        { id: 'c3c3a078-4357-41ec-b82b-8a56b509ef48', name: 'Sales' }
      ];
    }
    if (this.departments.length > 0) {
      this.empForm.patchValue({ departmentId: this.departments[0].id });
    }
  }

  // Pagination navigation helper that changes pages and triggers a list reload
  public goToPage(page: number): void {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    this.loadEmployees();
  }

  // Re-calculates pagination range lists (sliding window of 5 pages) to render clean numbered paging indicators
  private updatePaginationRange(): void {
    const range: number[] = [];
    const maxVisible = 5;
    let start = Math.max(1, this.currentPage - Math.floor(maxVisible / 2));
    const end = Math.min(this.totalPages, start + maxVisible - 1);
    start = Math.max(1, end - maxVisible + 1);
    for (let i = start; i <= end; i++) {
      range.push(i);
    }
    this.paginationRange = range;
  }

  // Triggers the modal popup overlay to enroll new employee records
  public openAddModal(): void {
    this.empForm.reset({
      dateOfJoining: new Date().toISOString().substring(0, 10),
      employmentType: 'FullTime',
      departmentId: this.departments[0]?.id || ''
    });
    this.showAddModal = true;
  }

  // Dismisses the employee enrollment modal
  public closeAddModal(): void {
    this.showAddModal = false;
  }

  // Submits the new employee enrollment data.
  // Checks validation patterns, performs a REST POST enrollment request to the backend directory API,
  // and handles offline fallbacks by dynamically generating a new mock employee with a random UUID,
  // preventing interface blockage.
  public saveEmployee(): void {
    if (this.empForm.invalid) return;

    const payload = this.empForm.value as Record<string, unknown>;

    this.http.post(`${this.authService.apiUrl}/employees`, payload).pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe({
      next: () => {
        this.loadEmployees();
        this.closeAddModal();
      },
      error: () => {
        const deptName = this.departments.find(d => d.id === payload['departmentId'])?.name || 'Engineering';
        const newMockEmp: Employee = {
          id: crypto.randomUUID(),
          employeeCode: (payload['employeeCode'] as string) ?? '',
          firstName: (payload['firstName'] as string) ?? '',
          lastName: (payload['lastName'] as string) ?? '',
          email: (payload['email'] as string) ?? '',
          dateOfJoining: (payload['dateOfJoining'] as string) ?? '',
          employmentType: (payload['employmentType'] as string) ?? 'FullTime',
          status: 'active',
          departmentId: (payload['departmentId'] as string) ?? '',
          department: { name: deptName }
        };
        this.employees = [...this.employees, newMockEmp];
        this.totalCount++;
        this.closeAddModal();
      }
    });
  }

  // Launches custom delete confirmation modal, replacing generic native window.confirm alerts.
  public requestSoftDelete(emp: Employee): void {
    this.pendingDeleteEmp = emp;
    this.showDeleteConfirmModal = true;
  }

  // Dismisses the soft-delete modal dialog
  public cancelDelete(): void {
    this.pendingDeleteEmp = null;
    this.showDeleteConfirmModal = false;
  }

  // Finalizes the soft-deletion process.
  // Performs a PATCH request to set `IsDeleted = true` instead of physical deletion,
  // complying with auditing guidelines, and filters out the UI row on success or local fallback.
  public confirmSoftDelete(): void {
    if (!this.pendingDeleteEmp) return;
    const id = this.pendingDeleteEmp.id;

    this.http.patch(`${this.authService.apiUrl}/employees/${id}/soft-delete`, {}).pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe({
      next: () => {
        this.loadEmployees();
        this.cancelDelete();
      },
      error: () => {
        this.employees = this.employees.filter(e => e.id !== id);
        this.totalCount = Math.max(0, this.totalCount - 1);
        this.cancelDelete();
      }
    });
  }

  // Triggers department transfer modal overlay dialog for selected employee
  public openTransferModal(emp: Employee): void {
    this.selectedEmp = emp;
    this.newDeptId = this.departments[0]?.id || '';
    this.showTransferModal = true;
  }

  // Dismisses department transfer modal dialog
  public closeTransferModal(): void {
    this.showTransferModal = false;
    this.selectedEmp = null;
  }

  // Submits the department transfer transaction to the backend API.
  // On success or fallback, updates the employee record's department context to trigger instant UI refresh.
  public executeTransfer(): void {
    if (!this.selectedEmp || !this.newDeptId) return;

    this.http.post(`${this.authService.apiUrl}/employees/${this.selectedEmp.id}/transfer`, { newDepartmentId: this.newDeptId }).pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe({
      next: () => {
        this.loadEmployees();
        this.closeTransferModal();
      },
      error: () => {
        const targetDeptName = this.departments.find(d => d.id === this.newDeptId)?.name || 'New Dept';
        if (this.selectedEmp) {
          this.selectedEmp.department = { name: targetDeptName };
          this.selectedEmp.departmentId = this.newDeptId;
        }
        this.closeTransferModal();
      }
    });
  }

  // Triggers the offboarding / termination modal overlay dialog
  public openTerminateModal(emp: Employee): void {
    this.selectedEmp = emp;
    this.terminationDate = new Date().toISOString().substring(0, 10);
    this.terminationReason = 'Lifecycle completion offboarding';
    this.showTerminateModal = true;
  }

  // Dismisses the termination modal overlay dialog
  public closeTerminateModal(): void {
    this.showTerminateModal = false;
    this.selectedEmp = null;
  }

  // Commits the termination event to mark the employee status as inactive or terminated.
  // Performs date bounds verification to make sure the termination date is not prior to the joining date.
  public executeTermination(): void {
    if (!this.selectedEmp) return;

    if (this.selectedEmp.dateOfJoining && this.terminationDate < this.selectedEmp.dateOfJoining) {
      return; 
    }

    this.http.post(`${this.authService.apiUrl}/employees/${this.selectedEmp.id}/terminate`, { 
      terminationDate: this.terminationDate, 
      reason: this.terminationReason 
    }).pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe({
      next: () => {
        this.loadEmployees();
        this.closeTerminateModal();
      },
      error: () => {
        if (this.selectedEmp) {
          this.selectedEmp.status = 'terminated';
        }
        this.closeTerminateModal();
      }
    });
  }

  private getMockEmployees(): Employee[] {
    const activeTenantId = this.tenantService.currentTenantId();
    if (activeTenantId === 'e3b97b0a-3a7b-4df2-bdcb-a032de2a1bf6') {
      // India Tenant
      return [
        {
          id: 'fe082fb1-4ca3-4a17-8e68-fb9e2d63428f',
          employeeCode: 'EMP-IN-001',
          firstName: 'Rajesh',
          lastName: 'Kumar',
          email: 'rajesh.kumar@capgemini-in.com',
          dateOfJoining: '2022-01-15',
          employmentType: 'FullTime',
          status: 'active',
          department: { name: 'Human Resources' },
          designation: { name: 'HR Manager' }
        },
        {
          id: 'ae082fb1-4ca3-4a17-8e68-fb9e2d63428a',
          employeeCode: 'EMP-IN-002',
          firstName: 'Amit',
          lastName: 'Sharma',
          email: 'amit.sharma@capgemini-in.com',
          dateOfJoining: '2023-04-10',
          employmentType: 'FullTime',
          status: 'active',
          department: { name: 'Engineering' },
          designation: { name: 'Lead Engineer' }
        },
        {
          id: 'ce082fb1-4ca3-4a17-8e68-fb9e2d63428c',
          employeeCode: 'EMP-IN-003',
          firstName: 'Priya',
          lastName: 'Patel',
          email: 'priya.patel@capgemini-in.com',
          dateOfJoining: '2024-06-01',
          employmentType: 'FullTime',
          status: 'active',
          department: { name: 'Engineering' },
          designation: { name: 'Software Engineer' }
        }
      ];
    } else {
      // US Tenant
      return [
        {
          id: 'be082fb1-4ca3-4a17-8e68-fb9e2d63428b',
          employeeCode: 'EMP-US-001',
          firstName: 'Sarah',
          lastName: 'Connor',
          email: 'sarah.connor@capgemini-us.com',
          dateOfJoining: '2020-03-20',
          employmentType: 'FullTime',
          status: 'active',
          department: { name: 'Engineering' },
          designation: { name: 'Senior Principal Engineer' }
        },
        {
          id: 'de082fb1-4ca3-4a17-8e68-fb9e2d63428d',
          employeeCode: 'EMP-US-002',
          firstName: 'John',
          lastName: 'Doe',
          email: 'john.doe@capgemini-us.com',
          dateOfJoining: '2025-01-10',
          employmentType: 'FullTime',
          status: 'active',
          department: { name: 'Sales' },
          designation: { name: 'Sales Executive' }
        }
      ];
    }
  }
}
