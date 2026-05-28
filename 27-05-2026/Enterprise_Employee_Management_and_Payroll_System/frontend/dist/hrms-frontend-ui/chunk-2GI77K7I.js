import {
  takeUntilDestroyed
} from "./chunk-O675F7LX.js";
import {
  DefaultValueAccessor,
  FormBuilder,
  FormControlName,
  FormGroupDirective,
  FormsModule,
  NgControlStatus,
  NgControlStatusGroup,
  NgSelectOption,
  NumberValueAccessor,
  ReactiveFormsModule,
  SelectControlValueAccessor,
  Validators,
  ɵNgNoValidate,
  ɵNgSelectMultipleOption
} from "./chunk-7UGTWGHG.js";
import {
  AuthService,
  CommonModule,
  CurrencyPipe,
  DatePipe,
  DestroyRef,
  HttpClient,
  NgClass,
  TenantService,
  inject,
  ɵsetClassDebugInfo,
  ɵɵStandaloneFeature,
  ɵɵadvance,
  ɵɵconditional,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind2,
  ɵɵpipeBind4,
  ɵɵproperty,
  ɵɵpureFunction3,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate3
} from "./chunk-XVQVZOM4.js";

// src/app/features/payroll/payroll-calculator.component.ts
var _forTrack0 = ($index, $item) => $item.id;
var _c0 = (a0, a1, a2) => ({ "bg-brand-900/20 text-brand-400 border border-brand-500/20": a0, "bg-red-900/20 text-red-400 border border-red-500/20": a1, "bg-amber-900/20 text-amber-400 border border-amber-500/20": a2 });
function PayrollCalculatorComponent_For_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 11);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const e_r1 = ctx.$implicit;
    \u0275\u0275property("value", e_r1.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate3("", e_r1.firstName, " ", e_r1.lastName, " (", e_r1.employeeCode, ")");
  }
}
function PayrollCalculatorComponent_Conditional_27_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 16);
    \u0275\u0275text(1, "Salary must be positive");
    \u0275\u0275elementEnd();
  }
}
function PayrollCalculatorComponent_Conditional_49_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 28);
    \u0275\u0275text(1, "Period start must be before period end");
    \u0275\u0275elementEnd();
  }
}
function PayrollCalculatorComponent_Conditional_51_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 30);
  }
}
function PayrollCalculatorComponent_Conditional_54_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 31)(1, "h4", 43)(2, "span", 44);
    \u0275\u0275text(3, "analytics");
    \u0275\u0275elementEnd();
    \u0275\u0275text(4, " Strategy Output Log ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p", 45);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(ctx_r1.detailsLog);
  }
}
function PayrollCalculatorComponent_For_77_Conditional_17_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 53);
    \u0275\u0275listener("click", function PayrollCalculatorComponent_For_77_Conditional_17_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r3);
      const record_r4 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.requestReversal(record_r4));
    });
    \u0275\u0275text(1, " Reverse Ledger ");
    \u0275\u0275elementEnd();
  }
}
function PayrollCalculatorComponent_For_77_Conditional_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 52);
    \u0275\u0275text(1, "Ledger Locked");
    \u0275\u0275elementEnd();
  }
}
function PayrollCalculatorComponent_For_77_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr", 40)(1, "td", 46);
    \u0275\u0275text(2);
    \u0275\u0275pipe(3, "date");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "td", 47);
    \u0275\u0275text(5);
    \u0275\u0275pipe(6, "currency");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "td", 48);
    \u0275\u0275text(8);
    \u0275\u0275pipe(9, "currency");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "td", 49);
    \u0275\u0275text(11);
    \u0275\u0275pipe(12, "currency");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "td", 37)(14, "span", 50);
    \u0275\u0275text(15);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(16, "td", 38);
    \u0275\u0275template(17, PayrollCalculatorComponent_For_77_Conditional_17_Template, 2, 0, "button", 51)(18, PayrollCalculatorComponent_For_77_Conditional_18_Template, 2, 0, "span", 52);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const record_r4 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(3, 7, record_r4.payPeriodStart, "MMM yyyy"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind4(6, 10, record_r4.grossSalary, record_r4.currencyCode, "symbol", "1.2-2"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind4(9, 15, record_r4.totalDeductions, record_r4.currencyCode, "symbol", "1.2-2"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind4(12, 20, record_r4.netSalary, record_r4.currencyCode, "symbol", "1.2-2"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275property("ngClass", \u0275\u0275pureFunction3(25, _c0, record_r4.status === "Draft", record_r4.status === "Reversed", record_r4.status === "Correction"));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", record_r4.status, " ");
    \u0275\u0275advance(2);
    \u0275\u0275conditional(record_r4.status === "Draft" ? 17 : 18);
  }
}
function PayrollCalculatorComponent_ForEmpty_78_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td", 54);
    \u0275\u0275text(2, " No processing statements run for this workspace session. ");
    \u0275\u0275elementEnd()();
  }
}
function PayrollCalculatorComponent_Conditional_84_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 42)(1, "div", 55)(2, "div", 56)(3, "div", 57)(4, "span", 58);
    \u0275\u0275text(5, "gavel");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "h3", 59);
    \u0275\u0275text(7, "Confirm Payroll Reversal");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "p", 60);
    \u0275\u0275text(9, " Reversing this payroll creates a ");
    \u0275\u0275elementStart(10, "strong", 61);
    \u0275\u0275text(11, "negative balancing correction record");
    \u0275\u0275elementEnd();
    \u0275\u0275text(12, ". The original record will be marked as ");
    \u0275\u0275elementStart(13, "code", 62);
    \u0275\u0275text(14, "Reversed");
    \u0275\u0275elementEnd();
    \u0275\u0275text(15, ". ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "p", 63);
    \u0275\u0275text(17, " Period: ");
    \u0275\u0275elementStart(18, "strong");
    \u0275\u0275text(19);
    \u0275\u0275pipe(20, "date");
    \u0275\u0275elementEnd();
    \u0275\u0275text(21, " \u2014 Net: ");
    \u0275\u0275elementStart(22, "strong");
    \u0275\u0275text(23);
    \u0275\u0275pipe(24, "currency");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(25, "div", 64)(26, "button", 65);
    \u0275\u0275listener("click", function PayrollCalculatorComponent_Conditional_84_Template_button_click_26_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.cancelReversal());
    });
    \u0275\u0275text(27, "Cancel");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(28, "button", 66);
    \u0275\u0275listener("click", function PayrollCalculatorComponent_Conditional_84_Template_button_click_28_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.confirmReversal());
    });
    \u0275\u0275text(29, "Reverse & Create Correction");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(19);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(20, 2, ctx_r1.pendingReversalRecord.payPeriodStart, "MMM yyyy"));
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind4(24, 5, ctx_r1.pendingReversalRecord.netSalary, ctx_r1.pendingReversalRecord.currencyCode, "symbol", "1.2-2"));
  }
}
function periodDateValidator(control) {
  const start = control.get("periodStart")?.value;
  const end = control.get("periodEnd")?.value;
  if (start && end && start > end) {
    return { periodInvalid: true };
  }
  return null;
}
var PayrollCalculatorComponent = class _PayrollCalculatorComponent {
  authService = inject(AuthService);
  tenantService = inject(TenantService);
  http = inject(HttpClient);
  fb = inject(FormBuilder);
  destroyRef = inject(DestroyRef);
  employees = [];
  ledger = [];
  activeCurrency = "\u20B9";
  loading = false;
  detailsLog = "";
  // Edge case fix: custom reversal modal replaces window.confirm
  showReversalModal = false;
  pendingReversalRecord = null;
  // Edge case fix: Added periodDateValidator for cross-field validation
  calcForm = this.fb.group({
    employeeId: ["", Validators.required],
    baseSalary: [6e4, [Validators.required, Validators.min(1)]],
    countryCode: ["IN", Validators.required],
    periodStart: ["2026-05-01", Validators.required],
    periodEnd: ["2026-05-31", Validators.required]
  }, { validators: periodDateValidator });
  ngOnInit() {
    this.loadEmployees();
    this.detectTenantDefault();
  }
  loadEmployees() {
    this.http.get(`${this.authService.apiUrl}/employees?pageSize=100`).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (res) => {
        this.employees = res.data;
        if (this.employees.length > 0) {
          this.calcForm.patchValue({ employeeId: this.employees[0].id });
        }
      },
      error: () => {
        const activeTenantId = this.tenantService.currentTenantId();
        if (activeTenantId === "e3b97b0a-3a7b-4df2-bdcb-a032de2a1bf6") {
          this.employees = [
            { id: "fe082fb1-4ca3-4a17-8e68-fb9e2d63428f", employeeCode: "EMP-IN-001", firstName: "Rajesh", lastName: "Kumar" },
            { id: "ae082fb1-4ca3-4a17-8e68-fb9e2d63428a", employeeCode: "EMP-IN-002", firstName: "Amit", lastName: "Sharma" }
          ];
        } else {
          this.employees = [
            { id: "be082fb1-4ca3-4a17-8e68-fb9e2d63428b", employeeCode: "EMP-US-001", firstName: "Sarah", lastName: "Connor" }
          ];
        }
        if (this.employees.length > 0) {
          this.calcForm.patchValue({ employeeId: this.employees[0].id });
        }
      }
    });
  }
  detectTenantDefault() {
    const activeTenant = this.tenantService.getActiveTenant();
    this.calcForm.patchValue({ countryCode: activeTenant.countryCode });
    this.onCountryChange();
  }
  onCountryChange() {
    const country = this.calcForm.get("countryCode")?.value;
    const currencyMap = { IN: "\u20B9", US: "$", UK: "\xA3", UAE: "AED" };
    this.activeCurrency = currencyMap[country] ?? "\u20B9";
  }
  calculate() {
    if (this.calcForm.invalid)
      return;
    this.loading = true;
    this.detailsLog = "";
    const payload = this.calcForm.value;
    this.http.post(`${this.authService.apiUrl}/payroll/calculate`, payload).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (res) => {
        this.loading = false;
        this.detailsLog = res.data.calculationDetails;
        this.ledger = [res.data.payrollRecord, ...this.ledger];
      },
      error: () => {
        this.loading = false;
        this.simulateCalculationOffline(payload);
      }
    });
  }
  // Edge case fix: custom modal instead of window.confirm
  requestReversal(record) {
    this.pendingReversalRecord = record;
    this.showReversalModal = true;
  }
  cancelReversal() {
    this.pendingReversalRecord = null;
    this.showReversalModal = false;
  }
  confirmReversal() {
    if (!this.pendingReversalRecord)
      return;
    const record = this.pendingReversalRecord;
    this.http.post(`${this.authService.apiUrl}/payroll/${record.id}/reverse?periodStart=${record.payPeriodStart}`, { reason: "Adjustment correction" }).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (res) => {
        record.status = "Reversed";
        this.ledger = [res.data.correctionRecord, ...this.ledger];
        this.cancelReversal();
      },
      error: () => {
        record.status = "Reversed";
        const correction = {
          id: crypto.randomUUID(),
          employeeId: record.employeeId,
          payPeriodStart: record.payPeriodStart,
          payPeriodEnd: record.payPeriodEnd,
          currencyCode: record.currencyCode,
          basicSalary: -record.basicSalary,
          grossSalary: -record.grossSalary,
          totalDeductions: -record.totalDeductions,
          netSalary: -record.netSalary,
          status: "Correction",
          payslipUrl: record.payslipUrl
        };
        this.ledger = [correction, ...this.ledger];
        this.cancelReversal();
      }
    });
  }
  /**
   * Edge case fix: All negative deduction calculations are clamped to 0 using Math.max.
   * Previously UK NI calculation went negative when salary < personalAllowance (£12,570).
   */
  simulateCalculationOffline(payload) {
    const basic = payload.baseSalary;
    let deductions = 0;
    let log = "";
    const c = payload.countryCode;
    if (c === "IN") {
      const standardDeduction = 5e4;
      const taxable = Math.max(0, basic - standardDeduction);
      const tax = taxable * 0.15;
      const pf = basic * 0.12;
      const professionalTax = 2500;
      deductions = tax + pf + professionalTax;
      log = `India Tax Rules (Offline Simulation):
Standard Deduction = \u20B950,000
Provident Fund (12%) = \u20B9${pf.toFixed(2)}
Professional Tax = \u20B92,500
Computed Tax = \u20B9${tax.toFixed(2)}
Total Deductions = \u20B9${deductions.toFixed(2)}`;
    } else if (c === "US") {
      const standardDeduction = 13850;
      const taxable = Math.max(0, basic - standardDeduction);
      const tax = taxable * 0.2;
      const fica = basic * 0.0765;
      deductions = tax + fica;
      log = `US Tax Rules (Offline Simulation):
Standard Deduction = $13,850
FICA (7.65%) = $${fica.toFixed(2)}
Federal Tax = $${tax.toFixed(2)}
Total Deductions = $${deductions.toFixed(2)}`;
    } else if (c === "UK") {
      const personalAllowance = 12570;
      const taxable = Math.max(0, basic - personalAllowance);
      const tax = taxable * 0.2;
      const ni = Math.max(0, (basic - personalAllowance) * 0.08);
      deductions = tax + ni;
      log = `UK Tax Rules (Offline Simulation):
Personal Allowance = \xA312,570
National Insurance (8%) = \xA3${ni.toFixed(2)}
Income Tax = \xA3${tax.toFixed(2)}
Total Deductions = \xA3${deductions.toFixed(2)}`;
    } else {
      deductions = basic * 0.05;
      log = `UAE Pension Strategy (Offline Simulation):
0% Personal Income Tax
Pension Fund Contribution (5%) = ${deductions.toFixed(2)} AED`;
    }
    const net = Math.max(0, basic - deductions);
    this.detailsLog = log + `

Net Salary = ${net.toFixed(2)}`;
    const currencyMap = { IN: "INR", US: "USD", UK: "GBP", UAE: "AED" };
    const mockRec = {
      id: crypto.randomUUID(),
      employeeId: payload.employeeId,
      payPeriodStart: payload.periodStart,
      payPeriodEnd: payload.periodEnd,
      currencyCode: currencyMap[c] ?? "USD",
      basicSalary: basic,
      grossSalary: basic,
      totalDeductions: deductions,
      netSalary: net,
      status: "Draft",
      payslipUrl: `/payslips/mock.pdf`
    };
    this.ledger = [mockRec, ...this.ledger];
  }
  static \u0275fac = function PayrollCalculatorComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _PayrollCalculatorComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _PayrollCalculatorComponent, selectors: [["app-payroll-calculator"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 85, vars: 9, consts: [[1, "space-y-8", "animate-fade-in"], [1, "text-2xl", "font-bold", "tracking-tight", "text-white"], [1, "text-xs", "text-slate-400", "mt-0.5"], [1, "grid", "grid-cols-1", "lg:grid-cols-3", "gap-8"], [1, "glass-card", "p-6", "flex", "flex-col", "justify-between", "h-fit"], [1, "space-y-4"], [1, "text-base", "font-bold", "text-slate-200", "border-b", "border-slate-800", "pb-3"], [1, "space-y-4", 3, "ngSubmit", "formGroup"], ["for", "payrollEmpSelect", 1, "block", "text-[10px]", "font-bold", "text-slate-400", "uppercase", "mb-1.5"], ["id", "payrollEmpSelect", "formControlName", "employeeId", 1, "w-full", "bg-slate-950", "border", "border-slate-800", "focus:border-brand-500", "rounded-xl", "px-3", "py-2.5", "text-xs", "text-slate-200", "outline-none", "cursor-pointer"], ["value", ""], [3, "value"], ["for", "baseSalaryInput", 1, "block", "text-[10px]", "font-bold", "text-slate-400", "uppercase", "mb-1.5"], [1, "relative"], [1, "absolute", "left-3", "top-2.5", "text-slate-500", "text-xs", "font-semibold"], ["id", "baseSalaryInput", "type", "number", "formControlName", "baseSalary", "placeholder", "e.g. 80000", 1, "w-full", "bg-slate-950", "border", "border-slate-800", "focus:border-brand-500", "rounded-xl", "pl-10", "pr-4", "py-2", "text-xs", "text-slate-200", "outline-none"], [1, "text-red-400", "text-[10px]", "mt-0.5"], ["for", "countryCodeSelect", 1, "block", "text-[10px]", "font-bold", "text-slate-400", "uppercase", "mb-1.5"], ["id", "countryCodeSelect", "formControlName", "countryCode", 1, "w-full", "bg-slate-950", "border", "border-slate-800", "focus:border-brand-500", "rounded-xl", "px-3", "py-2.5", "text-xs", "text-slate-200", "outline-none", "cursor-pointer", 3, "change"], ["value", "IN"], ["value", "US"], ["value", "UK"], ["value", "UAE"], [1, "grid", "grid-cols-2", "gap-3"], ["for", "periodStartInput", 1, "block", "text-[10px]", "font-bold", "text-slate-400", "uppercase", "mb-1"], ["id", "periodStartInput", "type", "date", "formControlName", "periodStart", 1, "w-full", "bg-slate-950", "border", "border-slate-800", "rounded-xl", "px-3", "py-2", "text-xs", "text-slate-200", "outline-none"], ["for", "periodEndInput", 1, "block", "text-[10px]", "font-bold", "text-slate-400", "uppercase", "mb-1"], ["id", "periodEndInput", "type", "date", "formControlName", "periodEnd", 1, "w-full", "bg-slate-950", "border", "border-slate-800", "rounded-xl", "px-3", "py-2", "text-xs", "text-slate-200", "outline-none"], [1, "text-red-400", "text-[10px]", "-mt-2"], ["id", "processPayrollBtn", "type", "submit", 1, "w-full", "bg-brand-600", "hover:bg-brand-500", "disabled:opacity-50", "text-white", "font-semibold", "py-3", "px-4", "rounded-xl", "text-xs", "transition-all", "duration-200", "flex", "items-center", "justify-center", "space-x-1.5", "shadow-lg", "shadow-brand-600/15", 3, "disabled"], [1, "animate-spin", "h-4", "w-4", "border-2", "border-white", "border-t-transparent", "rounded-full", "mr-2"], [1, "mt-6", "p-4", "bg-slate-900", "border", "border-slate-800/80", "rounded-2xl", "animate-fade-in"], [1, "lg:col-span-2", "glass-card", "p-6", "flex", "flex-col", "justify-between"], [1, "text-base", "font-bold", "text-slate-200", "border-b", "border-slate-800", "pb-3", "mb-6"], [1, "overflow-x-auto"], [1, "w-full", "text-left", "border-collapse", "text-xs"], [1, "border-b", "border-slate-800", "text-[10px]", "font-bold", "uppercase", "text-slate-400"], [1, "py-3", "px-3"], [1, "py-3", "px-3", "text-right"], [1, "divide-y", "divide-slate-800/50", "text-slate-300"], [1, "hover:bg-slate-900/40"], [1, "mt-6", "pt-4", "border-t", "border-slate-900", "flex", "items-center", "justify-between", "text-[11px]", "text-slate-500"], [1, "fixed", "inset-0", "bg-slate-950/80", "backdrop-blur-sm", "z-50", "flex", "items-center", "justify-center", "p-4"], [1, "text-[10px]", "font-bold", "uppercase", "tracking-wider", "text-slate-400", "mb-2", "flex", "items-center"], [1, "material-icons", "text-brand-500", "text-xs", "mr-1"], [1, "text-[11px]", "text-slate-300", "leading-relaxed", "font-mono", "whitespace-pre-wrap"], [1, "py-3", "px-3", "font-medium"], [1, "py-3", "px-3", "text-slate-200"], [1, "py-3", "px-3", "text-red-400"], [1, "py-3", "px-3", "text-emerald-400", "font-semibold"], [1, "px-2", "py-0.5", "rounded", "text-[9px]", "font-bold", "uppercase", "tracking-wider", 3, "ngClass"], [1, "text-[10px]", "font-bold", "text-red-400", "hover:text-red-300", "hover:bg-red-950/20", "border", "border-red-500/20", "px-2", "py-1", "rounded-lg", "transition-colors"], [1, "text-[10px]", "text-slate-500", "font-mono"], [1, "text-[10px]", "font-bold", "text-red-400", "hover:text-red-300", "hover:bg-red-950/20", "border", "border-red-500/20", "px-2", "py-1", "rounded-lg", "transition-colors", 3, "click"], ["colspan", "6", 1, "py-8", "text-center", "text-slate-500", "font-medium"], [1, "w-full", "max-w-sm", "bg-slate-900", "border", "border-slate-800", "rounded-3xl", "p-6", "shadow-2xl", "animate-fade-in"], [1, "flex", "items-center", "space-x-3", "mb-4"], [1, "p-2", "bg-red-500/10", "border", "border-red-500/20", "rounded-xl"], [1, "material-icons", "text-red-400"], [1, "text-base", "font-bold", "text-white"], [1, "text-xs", "text-slate-400", "mb-2"], [1, "text-amber-400"], [1, "text-red-400"], [1, "text-xs", "text-slate-500", "mb-6"], [1, "flex", "items-center", "justify-end", "space-x-3", "pt-4", "border-t", "border-slate-800/50"], [1, "text-xs", "text-slate-400", "hover:text-white", "px-3", "py-1.5", "font-medium", 3, "click"], [1, "bg-red-600", "hover:bg-red-500", "text-white", "text-xs", "font-semibold", "px-4", "py-2", "rounded-xl", "transition-all", 3, "click"]], template: function PayrollCalculatorComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div")(2, "h1", 1);
      \u0275\u0275text(3, "Payroll Automation Engine");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "p", 2);
      \u0275\u0275text(5, "Execute country-specific tax strategies, process ledger revisions, and view immutable payroll records.");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(6, "div", 3)(7, "div", 4)(8, "div", 5)(9, "h2", 6);
      \u0275\u0275text(10, "Run Payroll Strategy");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(11, "form", 7);
      \u0275\u0275listener("ngSubmit", function PayrollCalculatorComponent_Template_form_ngSubmit_11_listener() {
        return ctx.calculate();
      });
      \u0275\u0275elementStart(12, "div")(13, "label", 8);
      \u0275\u0275text(14, "Employee");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(15, "select", 9)(16, "option", 10);
      \u0275\u0275text(17, "Select Employee...");
      \u0275\u0275elementEnd();
      \u0275\u0275repeaterCreate(18, PayrollCalculatorComponent_For_19_Template, 2, 4, "option", 11, _forTrack0);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(20, "div")(21, "label", 12);
      \u0275\u0275text(22, "Base Monthly Salary");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(23, "div", 13)(24, "span", 14);
      \u0275\u0275text(25);
      \u0275\u0275elementEnd();
      \u0275\u0275element(26, "input", 15);
      \u0275\u0275elementEnd();
      \u0275\u0275template(27, PayrollCalculatorComponent_Conditional_27_Template, 2, 0, "p", 16);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(28, "div")(29, "label", 17);
      \u0275\u0275text(30, "Tax Strategy Country");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(31, "select", 18);
      \u0275\u0275listener("change", function PayrollCalculatorComponent_Template_select_change_31_listener() {
        return ctx.onCountryChange();
      });
      \u0275\u0275elementStart(32, "option", 19);
      \u0275\u0275text(33, "India Tax Strategy (\u20B9)");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(34, "option", 20);
      \u0275\u0275text(35, "US Federal & FICA ($)");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(36, "option", 21);
      \u0275\u0275text(37, "UK NI & Income Tax (\xA3)");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(38, "option", 22);
      \u0275\u0275text(39, "UAE Pension Strategy (AED)");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(40, "div", 23)(41, "div")(42, "label", 24);
      \u0275\u0275text(43, "Period Start");
      \u0275\u0275elementEnd();
      \u0275\u0275element(44, "input", 25);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(45, "div")(46, "label", 26);
      \u0275\u0275text(47, "Period End");
      \u0275\u0275elementEnd();
      \u0275\u0275element(48, "input", 27);
      \u0275\u0275elementEnd()();
      \u0275\u0275template(49, PayrollCalculatorComponent_Conditional_49_Template, 2, 0, "p", 28);
      \u0275\u0275elementStart(50, "button", 29);
      \u0275\u0275template(51, PayrollCalculatorComponent_Conditional_51_Template, 1, 0, "span", 30);
      \u0275\u0275elementStart(52, "span");
      \u0275\u0275text(53, "Process Salary Statement");
      \u0275\u0275elementEnd()()()();
      \u0275\u0275template(54, PayrollCalculatorComponent_Conditional_54_Template, 7, 1, "div", 31);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(55, "div", 32)(56, "div")(57, "h2", 33);
      \u0275\u0275text(58, "Immutable Payroll Ledger");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(59, "div", 34)(60, "table", 35)(61, "thead")(62, "tr", 36)(63, "th", 37);
      \u0275\u0275text(64, "Period");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(65, "th", 37);
      \u0275\u0275text(66, "Gross");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(67, "th", 37);
      \u0275\u0275text(68, "Deductions");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(69, "th", 37);
      \u0275\u0275text(70, "Net Pay");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(71, "th", 37);
      \u0275\u0275text(72, "Status");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(73, "th", 38);
      \u0275\u0275text(74, "Actions");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(75, "tbody", 39);
      \u0275\u0275repeaterCreate(76, PayrollCalculatorComponent_For_77_Template, 19, 29, "tr", 40, _forTrack0, false, PayrollCalculatorComponent_ForEmpty_78_Template, 3, 0, "tr");
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(79, "div", 41)(80, "span");
      \u0275\u0275text(81, "* Ledger adjustments follow GAAP correction standard");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(82, "span");
      \u0275\u0275text(83, "RTO Target < 1 Hour active");
      \u0275\u0275elementEnd()()()();
      \u0275\u0275template(84, PayrollCalculatorComponent_Conditional_84_Template, 30, 10, "div", 42);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      let tmp_3_0;
      \u0275\u0275advance(11);
      \u0275\u0275property("formGroup", ctx.calcForm);
      \u0275\u0275advance(7);
      \u0275\u0275repeater(ctx.employees);
      \u0275\u0275advance(7);
      \u0275\u0275textInterpolate(ctx.activeCurrency);
      \u0275\u0275advance(2);
      \u0275\u0275conditional(((tmp_3_0 = ctx.calcForm.get("baseSalary")) == null ? null : tmp_3_0.touched) && ((tmp_3_0 = ctx.calcForm.get("baseSalary")) == null ? null : tmp_3_0.hasError("min")) ? 27 : -1);
      \u0275\u0275advance(22);
      \u0275\u0275conditional(ctx.calcForm.hasError("periodInvalid") ? 49 : -1);
      \u0275\u0275advance();
      \u0275\u0275property("disabled", ctx.calcForm.invalid || ctx.loading);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.loading ? 51 : -1);
      \u0275\u0275advance(3);
      \u0275\u0275conditional(ctx.detailsLog ? 54 : -1);
      \u0275\u0275advance(22);
      \u0275\u0275repeater(ctx.ledger);
      \u0275\u0275advance(8);
      \u0275\u0275conditional(ctx.showReversalModal && ctx.pendingReversalRecord ? 84 : -1);
    }
  }, dependencies: [CommonModule, NgClass, CurrencyPipe, DatePipe, FormsModule, \u0275NgNoValidate, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, NumberValueAccessor, SelectControlValueAccessor, NgControlStatus, NgControlStatusGroup, ReactiveFormsModule, FormGroupDirective, FormControlName], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(PayrollCalculatorComponent, { className: "PayrollCalculatorComponent", filePath: "src\\app\\features\\payroll\\payroll-calculator.component.ts", lineNumber: 256 });
})();
export {
  PayrollCalculatorComponent
};
//# sourceMappingURL=chunk-2GI77K7I.js.map
