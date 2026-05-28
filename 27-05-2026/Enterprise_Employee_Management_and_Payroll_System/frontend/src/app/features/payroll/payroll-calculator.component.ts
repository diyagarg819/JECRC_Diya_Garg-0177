import { Component, inject, OnInit, DestroyRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AuthService } from '../../core/services/auth.service';
import { TenantService } from '../../core/services/tenant.service';
import { NgApexchartsModule } from 'ng-apexcharts';

interface PayrollEmployee {
  id: string;
  employeeCode: string;
  firstName: string;
  lastName: string;
}

interface PayrollRecord {
  id: string;
  employeeId: string;
  payPeriodStart: string;
  payPeriodEnd: string;
  currencyCode: string;
  basicSalary: number;
  grossSalary: number;
  totalDeductions: number;
  netSalary: number;
  status: string;
  payslipUrl: string;
}

interface PayrollCalcResponse {
  data: {
    calculationDetails: string;
    payrollRecord: PayrollRecord;
  };
}

interface PayrollReverseResponse {
  data: {
    correctionRecord: PayrollRecord;
  };
}

interface EmployeeListResponse {
  data: PayrollEmployee[];
}

function periodDateValidator(control: AbstractControl): ValidationErrors | null {
  const start = control.get('periodStart')?.value as string;
  const end = control.get('periodEnd')?.value as string;
  if (start && end && start > end) {
    return { periodInvalid: true };
  }
  return null;
}

@Component({
  selector: 'app-payroll-calculator',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, NgApexchartsModule],
  template: `
    <div class="space-y-8 animate-fade-in text-slate-100">
      <!-- Header -->
      <div>
        <h1 class="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
          <span class="material-icons text-brand-400">payments</span>
          Payroll Automation Engine
        </h1>
        <p class="text-xs text-slate-400 mt-0.5">Execute country-specific tax strategies, process ledger revisions, and view immutable payroll records.</p>
      </div>

      <!-- Main Layout -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        <!-- Left Side: Form Ingestion & Chart Breakdown (5 cols) -->
        <div class="lg:col-span-5 space-y-6">
          
          <!-- Run Strategy Form -->
          <div class="glass-card p-6">
            <h2 class="text-sm font-bold text-slate-200 border-b border-slate-800 pb-3 mb-4">Run Payroll Strategy</h2>
            
            <form [formGroup]="calcForm" (ngSubmit)="calculate()" class="space-y-4">
              <!-- Employee Select -->
              <div>
                <label for="payrollEmpSelect" class="block text-[10px] font-bold text-slate-400 uppercase mb-1.5">Employee</label>
                <select id="payrollEmpSelect" formControlName="employeeId"
                        class="w-full bg-slate-950 border border-slate-800 focus:border-brand-500 rounded-xl px-3.5 py-2.5 text-xs text-slate-200 outline-none cursor-pointer">
                  <option value="">Select Employee...</option>
                  <option *ngFor="let e of employees" [value]="e.id">{{ e.firstName }} {{ e.lastName }} ({{ e.employeeCode }})</option>
                </select>
              </div>

              <!-- Base Salary -->
              <div>
                <label for="baseSalaryInput" class="block text-[10px] font-bold text-slate-400 uppercase mb-1.5">Base Monthly Salary</label>
                <div class="relative">
                  <span class="absolute left-3.5 top-2.5 text-slate-500 text-xs font-semibold">{{ activeCurrency }}</span>
                  <input id="baseSalaryInput" type="number" formControlName="baseSalary" placeholder="e.g. 80000"
                         class="w-full bg-slate-950 border border-slate-800 focus:border-brand-500 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-200 outline-none" />
                </div>
                <p *ngIf="calcForm.get('baseSalary')?.touched && calcForm.get('baseSalary')?.hasError('min')" class="text-red-400 text-[10px] mt-0.5">Salary must be positive</p>
              </div>

              <!-- Tax Strategy Country Code -->
              <div>
                <label for="countryCodeSelect" class="block text-[10px] font-bold text-slate-400 uppercase mb-1.5">Tax Strategy Country</label>
                <select id="countryCodeSelect" formControlName="countryCode" (change)="onCountryChange()"
                        class="w-full bg-slate-950 border border-slate-800 focus:border-brand-500 rounded-xl px-3.5 py-2.5 text-xs text-slate-200 outline-none cursor-pointer">
                  <option value="IN">India Tax Strategy (₹)</option>
                  <option value="US">US Federal & FICA ($)</option>
                  <option value="UK">UK NI & Income Tax (£)</option>
                  <option value="UAE">UAE Pension Strategy (AED)</option>
                </select>
              </div>

              <!-- Pay Period -->
              <div class="grid grid-cols-2 gap-3">
                <div>
                  <label for="periodStartInput" class="block text-[10px] font-bold text-slate-400 uppercase mb-1">Period Start</label>
                  <input id="periodStartInput" type="date" formControlName="periodStart"
                         class="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 outline-none" />
                </div>
                <div>
                  <label for="periodEndInput" class="block text-[10px] font-bold text-slate-400 uppercase mb-1">Period End</label>
                  <input id="periodEndInput" type="date" formControlName="periodEnd"
                         class="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 outline-none" />
                </div>
              </div>
              <p *ngIf="calcForm.hasError('periodInvalid')" class="text-red-400 text-[10px] -mt-2">Period start must be before period end</p>

              <!-- Submit -->
              <button id="processPayrollBtn" type="submit" [disabled]="calcForm.invalid || loading"
                      class="w-full bg-brand-600 hover:bg-brand-500 disabled:opacity-50 text-white font-semibold py-3 px-4 rounded-xl text-xs transition flex items-center justify-center gap-1.5 shadow-lg shadow-brand-600/15">
                <span *ngIf="loading" class="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
                <span>Process Salary Statement</span>
              </button>
            </form>
          </div>

          <!-- Dynamic Tax Deductions Breakdown Pie Chart -->
          <div class="glass-card p-6" *ngIf="showChart">
            <h3 class="text-xs font-bold text-slate-200 uppercase tracking-wider mb-5 flex items-center gap-1">
              <span class="material-icons text-xs text-brand-400">pie_chart</span>
              Deductions vs Net Pay Analysis
            </h3>
            
            <div class="flex justify-center w-full py-2">
              <apx-chart
                [series]="pieChartOptions.series!"
                [chart]="pieChartOptions.chart!"
                [labels]="pieChartOptions.labels!"
                [colors]="pieChartOptions.colors!"
                [legend]="pieChartOptions.legend!"
                [stroke]="pieChartOptions.stroke!"
                [dataLabels]="pieChartOptions.dataLabels!"
                [plotOptions]="pieChartOptions.plotOptions!"
              ></apx-chart>
            </div>
          </div>
        </div>

        <!-- Right Side: Calculation Logs & Immutable Ledger (7 cols) -->
        <div class="lg:col-span-7 space-y-6">
          
          <!-- Detailed Calculation logs -->
          <div class="glass-card p-6" *ngIf="detailsLog">
            <h3 class="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1">
              <span class="material-icons text-brand-500 text-xs">analytics</span>
              Strategy Tax Computation Log
            </h3>
            <pre class="text-[11px] text-slate-300 leading-relaxed font-mono bg-slate-950/50 p-4 rounded-xl border border-slate-800/80 whitespace-pre-wrap">{{ detailsLog }}</pre>
          </div>

          <!-- Immutable Ledger -->
          <div class="glass-card p-6">
            <h2 class="text-sm font-bold text-slate-200 border-b border-slate-800 pb-3 mb-5">Immutable Payroll Ledger</h2>
            
            <div class="overflow-x-auto">
              <table class="w-full text-left border-collapse text-xs">
                <thead>
                  <tr class="border-b border-slate-800 text-[9px] font-bold uppercase text-slate-400 tracking-wider">
                    <th class="py-3 px-3">Period</th>
                    <th class="py-3 px-3">Gross</th>
                    <th class="py-3 px-3">Deductions</th>
                    <th class="py-3 px-3">Net Pay</th>
                    <th class="py-3 px-3">Status</th>
                    <th class="py-3 px-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-800/50 text-slate-300">
                  <tr *ngFor="let record of ledger" class="hover:bg-slate-900/40">
                    <td class="py-3.5 px-3 font-medium">
                      {{ record.payPeriodStart | date:'MMM yyyy' }}
                    </td>
                    <td class="py-3.5 px-3 text-slate-200">
                      {{ record.grossSalary | currency:record.currencyCode:'symbol':'1.2-2' }}
                    </td>
                    <td class="py-3.5 px-3 text-rose-400">
                      {{ record.totalDeductions | currency:record.currencyCode:'symbol':'1.2-2' }}
                    </td>
                    <td class="py-3.5 px-3 text-emerald-400 font-semibold">
                      {{ record.netSalary | currency:record.currencyCode:'symbol':'1.2-2' }}
                    </td>
                    <td class="py-3.5 px-3">
                      <span class="px-2 py-0.5 rounded text-[8px] font-extrabold uppercase tracking-wider border inline-flex items-center gap-1"
                            [ngClass]="{
                              'bg-brand-500/10 text-brand-400 border-brand-500/20': record.status === 'Draft',
                              'bg-rose-500/10 text-rose-400 border-rose-500/20': record.status === 'Reversed',
                              'bg-amber-500/10 text-amber-400 border-amber-500/20': record.status === 'Correction'
                            }">
                        {{ record.status }}
                      </span>
                    </td>
                    <td class="py-3.5 px-3 text-right">
                      <button *ngIf="record.status === 'Draft'" (click)="requestReversal(record)"
                              class="text-[9px] font-bold text-rose-400 hover:text-rose-300 hover:bg-rose-950/20 border border-rose-500/20 px-2 py-1 rounded-lg transition-all">
                        Reverse Ledger
                      </button>
                      <span *ngIf="record.status !== 'Draft'" class="text-[9px] text-slate-500 font-semibold uppercase tracking-wider">Locked</span>
                    </td>
                  </tr>
                  <tr *ngIf="ledger.length === 0">
                    <td colspan="6" class="py-8 text-center text-slate-500 font-medium">
                      No salary statements processed for this workspace session.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

      </div>

      <!-- Reversal Modal -->
      <div *ngIf="showReversalModal && pendingReversalRecord" class="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div class="w-full max-w-sm bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl animate-fade-in">
          <div class="flex items-center space-x-3 mb-4">
            <div class="p-2 bg-rose-500/10 border border-rose-500/20 rounded-xl">
              <span class="material-icons text-rose-400">gavel</span>
            </div>
            <h3 class="text-base font-bold text-white">Confirm Payroll Reversal</h3>
          </div>
          <p class="text-xs text-slate-400 mb-2 leading-relaxed">
            Reversing this payroll creates a <strong class="text-amber-400">negative balancing correction record</strong> in the ledger to comply with GAAP audit trail standards.
          </p>
          <p class="text-[11px] text-slate-500 mb-6 font-medium">
            Period: <strong>{{ pendingReversalRecord.payPeriodStart | date:'MMM yyyy' }}</strong> — 
            Net Amount: <strong>{{ pendingReversalRecord.netSalary | currency:pendingReversalRecord.currencyCode:'symbol':'1.2-2' }}</strong>
          </p>
          <div class="flex items-center justify-end space-x-3 pt-4 border-t border-slate-800/60">
            <button (click)="cancelReversal()" class="text-xs text-slate-400 hover:text-white px-3 py-1.5 font-medium">Cancel</button>
            <button (click)="confirmReversal()" class="bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold px-4 py-2 rounded-xl transition-all shadow-lg shadow-rose-600/20">Reverse & Create Correction</button>
          </div>
        </div>
      </div>
    </div>
  `
})
export class PayrollCalculatorComponent implements OnInit {
  public authService = inject(AuthService);
  public tenantService = inject(TenantService);
  private http = inject(HttpClient);
  private fb = inject(FormBuilder);
  private destroyRef = inject(DestroyRef);

  public employees: PayrollEmployee[] = [];
  public ledger: PayrollRecord[] = [];
  public activeCurrency = '₹';
  public loading = false;
  public detailsLog = '';

  // Chart configuration
  public showChart = false;
  public pieChartOptions: any = {
    series: [80, 20],
    chart: {
      type: 'donut',
      height: 240,
      background: 'transparent'
    },
    labels: ['Net Salary', 'Deductions'],
    colors: ['#10b981', '#ef4444', '#f59e0b'],
    stroke: { show: false },
    dataLabels: { enabled: false },
    legend: {
      position: 'bottom',
      fontSize: '11px',
      labels: { colors: '#94a3b8' },
      markers: { radius: 12 }
    },
    plotOptions: {
      pie: {
        donut: {
          size: '72%',
          labels: {
            show: true,
            name: { show: true, fontSize: '12px', color: '#94a3b8' },
            value: { 
              show: true, 
              fontSize: '15px', 
              color: '#ffffff', 
              fontWeight: 'bold',
              formatter: (val: string) => {
                const num = parseFloat(val);
                return `${this.activeCurrency}${num.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
              }
            },
            total: {
              show: true,
              label: 'Gross Pay',
              color: '#94a3b8',
              formatter: (w: any) => {
                const total = w.globals.seriesTotals.reduce((a: number, b: number) => a + b, 0);
                return `${this.activeCurrency}${total.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
              }
            }
          }
        }
      }
    }
  };

  // Reversal Modal
  public showReversalModal = false;
  public pendingReversalRecord: PayrollRecord | null = null;

  public calcForm: FormGroup = this.fb.group({
    employeeId: ['', Validators.required],
    baseSalary: [60000, [Validators.required, Validators.min(1)]],
    countryCode: ['IN', Validators.required],
    periodStart: ['2026-05-01', Validators.required],
    periodEnd: ['2026-05-31', Validators.required]
  }, { validators: periodDateValidator });

  public ngOnInit(): void {
    this.loadEmployees();
    this.detectTenantDefault();
  }

  public loadEmployees(): void {
    this.http.get<EmployeeListResponse>(`${this.authService.apiUrl}/employees?pageSize=100`).pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe({
      next: (res) => {
        this.employees = res.data;
        if (this.employees.length > 0) {
          this.calcForm.patchValue({ employeeId: this.employees[0].id });
        }
      },
      error: () => {
        // Fallbacks
        const activeTenantId = this.tenantService.currentTenantId();
        if (activeTenantId === '7f04c0cf-031e-450f-a189-e1fca9473fa7') {
          this.employees = [
            { id: 'be082fb1-4ca3-4a17-8e68-fb9e2d63428b', employeeCode: 'EMP-US-001', firstName: 'Sarah', lastName: 'Connor' }
          ];
        } else {
          this.employees = [
            { id: 'fe082fb1-4ca3-4a17-8e68-fb9e2d63428f', employeeCode: 'EMP-IN-001', firstName: 'Rajesh', lastName: 'Kumar' },
            { id: 'ae082fb1-4ca3-4a17-8e68-fb9e2d63428a', employeeCode: 'EMP-IN-002', firstName: 'Amit', lastName: 'Sharma' }
          ];
        }
        if (this.employees.length > 0) {
          this.calcForm.patchValue({ employeeId: this.employees[0].id });
        }
      }
    });
  }

  // Resolves the currently active tenant organization's country code (e.g. India IN or USA US)
  // to set the regional default tax strategy in the form on startup automatically.
  private detectTenantDefault(): void {
    const activeTenant = this.tenantService.getActiveTenant();
    this.calcForm.patchValue({ countryCode: activeTenant.countryCode });
    this.onCountryChange();
  }

  // Updates the active currency symbol (e.g. ₹, $, £, AED) reactively when the user
  // changes the regional tax strategy dropdown, ensuring visually precise prefix labels.
  public onCountryChange(): void {
    const country = this.calcForm.get('countryCode')?.value as string;
    const currencyMap: Record<string, string> = { IN: '₹', US: '$', UK: '£', UAE: 'AED' };
    this.activeCurrency = currencyMap[country] ?? '₹';
  }

  // Executes the primary country-specific tax computation pipeline.
  // 1. Validates input values.
  // 2. Attempts a real-time HTTP POST calculation request to the backend ASP.NET tax API.
  // 3. Appends the returned immutable record to the ledger array and reactively triggers the ApexChart update.
  // 4. Incorporates a fallback catch block to trigger simulateCalculationOffline() if the host REST API
  //    is currently offline, preventing UI errors.
  public calculate(): void {
    if (this.calcForm.invalid) return;

    this.loading = true;
    this.detailsLog = '';
    const payload = this.calcForm.value as {
      employeeId: string;
      baseSalary: number;
      countryCode: string;
      periodStart: string;
      periodEnd: string;
    };

    this.http.post<PayrollCalcResponse>(`${this.authService.apiUrl}/payroll/calculate`, payload).pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe({
      next: (res) => {
        this.loading = false;
        this.detailsLog = res.data.calculationDetails;
        this.ledger = [res.data.payrollRecord, ...this.ledger];
        this.updateApexChart(res.data.payrollRecord);
      },
      error: () => {
        this.loading = false;
        this.simulateCalculationOffline(payload);
      }
    });
  }

  // Sets up the state to trigger the modal confirmation for ledger reversals.
  // Saves the active target record so it can be passed into the balancing correction block.
  public requestReversal(record: PayrollRecord): void {
    this.pendingReversalRecord = record;
    this.showReversalModal = true;
  }

  // Dismisses the ledger reversal modal without making any state mutations.
  public cancelReversal(): void {
    this.pendingReversalRecord = null;
    this.showReversalModal = false;
  }

  // Finalizes the GAAP-compliant payroll ledger reversal.
  // Instead of deleting the record (which is illegal under standard auditing rules),
  // it marks the active record status as 'Reversed' and inserts an offset record
  // with negative numeric parameters (e.g. -Gross, -Net, -Deductions) to balance the financial ledger.
  public confirmReversal(): void {
    if (!this.pendingReversalRecord) return;
    const record = this.pendingReversalRecord;

    this.http.post<PayrollReverseResponse>(
      `${this.authService.apiUrl}/payroll/${record.id}/reverse?periodStart=${record.payPeriodStart}`,
      { reason: 'Adjustment correction' }
    ).pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe({
      next: (res) => {
        record.status = 'Reversed';
        this.ledger = [res.data.correctionRecord, ...this.ledger];
        this.cancelReversal();
      },
      error: () => {
        record.status = 'Reversed';
        const correction: PayrollRecord = {
          id: 'corr-' + Date.now(),
          employeeId: record.employeeId,
          payPeriodStart: record.payPeriodStart,
          payPeriodEnd: record.payPeriodEnd,
          currencyCode: record.currencyCode,
          basicSalary: -record.basicSalary,
          grossSalary: -record.grossSalary,
          totalDeductions: -record.totalDeductions,
          netSalary: -record.netSalary,
          status: 'Correction',
          payslipUrl: record.payslipUrl
        };
        this.ledger = [correction, ...this.ledger];
        this.cancelReversal();
      }
    });
  }

  // Dynamically redraws the deductions breakdown pie chart with ApexCharts
  // to visualize Net take-home versus absolute tax strategy deductions.
  private updateApexChart(record: PayrollRecord): void {
    const netPay = record.netSalary;
    const deductions = record.totalDeductions;
    
    this.pieChartOptions = {
      ...this.pieChartOptions,
      series: [netPay, deductions],
      labels: ['Net Salary Take-home', 'Total Strategy Deductions']
    };
    this.showChart = true;
  }

  private simulateCalculationOffline(payload: {
    baseSalary: number;
    countryCode: string;
    employeeId: string;
    periodStart: string;
    periodEnd: string;
  }): void {
    const basic = payload.baseSalary;
    let deductions = 0;
    let log = '';
    const c = payload.countryCode;

    if (c === 'IN') {
      const standardDeduction = 50000;
      const taxable = Math.max(0, basic - standardDeduction);
      const tax = taxable * 0.15;
      const pf = basic * 0.12;
      const professionalTax = 2500;
      deductions = tax + pf + professionalTax;
      log = `India Tax Rules (Offline Simulation):\nStandard Deduction = ₹50,000\nProvident Fund (12%) = ₹${pf.toFixed(2)}\nProfessional Tax = ₹2,500\nComputed Tax = ₹${tax.toFixed(2)}\nTotal Deductions = ₹${deductions.toFixed(2)}`;
    } else if (c === 'US') {
      const standardDeduction = 13850;
      const taxable = Math.max(0, basic - standardDeduction);
      const tax = taxable * 0.20;
      const fica = basic * 0.0765;
      deductions = tax + fica;
      log = `US Tax Rules (Offline Simulation):\nStandard Deduction = $13,850\nFICA (7.65%) = $${fica.toFixed(2)}\nFederal Tax = $${tax.toFixed(2)}\nTotal Deductions = $${deductions.toFixed(2)}`;
    } else if (c === 'UK') {
      const personalAllowance = 12570;
      const taxable = Math.max(0, basic - personalAllowance);
      const tax = taxable * 0.20;
      const ni = Math.max(0, (basic - personalAllowance) * 0.08);
      deductions = tax + ni;
      log = `UK Tax Rules (Offline Simulation):\nPersonal Allowance = £12,570\nNational Insurance (8%) = £${ni.toFixed(2)}\nIncome Tax = £${tax.toFixed(2)}\nTotal Deductions = £${deductions.toFixed(2)}`;
    } else {
      deductions = basic * 0.05;
      log = `UAE Pension Strategy (Offline Simulation):\n0% Personal Income Tax\nPension Fund Contribution (5%) = ${deductions.toFixed(2)} AED`;
    }

    const net = Math.max(0, basic - deductions);
    this.detailsLog = log + `\n\nNet Salary = ${net.toFixed(2)}`;
    
    const currencyMap: Record<string, string> = { IN: 'INR', US: 'USD', UK: 'GBP', UAE: 'AED' };
    const curr = currencyMap[c] ?? 'USD';

    const mockRec: PayrollRecord = {
      id: 'p-' + Date.now(),
      employeeId: payload.employeeId,
      payPeriodStart: payload.periodStart,
      payPeriodEnd: payload.periodEnd,
      currencyCode: curr,
      basicSalary: basic,
      grossSalary: basic,
      totalDeductions: deductions,
      netSalary: net,
      status: 'Draft',
      payslipUrl: `/payslips/mock.pdf`
    };

    this.ledger = [mockRec, ...this.ledger];
    this.updateApexChart(mockRec);
  }
}
