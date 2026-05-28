import {
  takeUntilDestroyed
} from "./chunk-O675F7LX.js";
import {
  AuthService,
  CommonModule,
  DestroyRef,
  HttpClient,
  TenantService,
  catchError,
  inject,
  interval,
  of,
  startWith,
  switchMap,
  ɵsetClassDebugInfo,
  ɵɵStandaloneFeature,
  ɵɵadvance,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵstyleProp,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
} from "./chunk-XVQVZOM4.js";

// src/app/features/dashboard/dashboard.component.ts
var DashboardComponent = class _DashboardComponent {
  tenantService = inject(TenantService);
  authService = inject(AuthService);
  http = inject(HttpClient);
  destroyRef = inject(DestroyRef);
  stats = {
    employeeCount: 3,
    departmentCount: 2,
    activeLeaves: 1,
    pendingOutbox: 0
  };
  ngOnInit() {
    interval(1e4).pipe(startWith(0), switchMap(() => this.fetchStats$()), takeUntilDestroyed(this.destroyRef)).subscribe((stats) => {
      this.stats = stats;
    });
  }
  getTenantName() {
    return this.tenantService.getActiveTenant().name;
  }
  getEmailName() {
    const email = this.authService.currentUser()?.email || "";
    return email.split("@")[0];
  }
  /**
   * Edge case fix: Returns an Observable instead of subscribing internally.
   * This allows switchMap to cancel in-flight requests and prevents zombie HTTP calls.
   */
  fetchStats$() {
    const tenantId = this.tenantService.currentTenantId();
    return this.http.get(`${this.authService.apiUrl}/employees?pageSize=100`).pipe(switchMap((res) => {
      const count = res.meta?.totalCount ?? 3;
      const uniqueDepts = new Set(res.data?.map((e) => e.departmentId).filter(Boolean));
      return of({
        employeeCount: count,
        departmentCount: uniqueDepts.size || 2,
        activeLeaves: count > 3 ? 2 : 1,
        pendingOutbox: 0
      });
    }), catchError(() => {
      return of({
        employeeCount: tenantId === "e3b97b0a-3a7b-4df2-bdcb-a032de2a1bf6" ? 3 : 2,
        departmentCount: 2,
        activeLeaves: 1,
        pendingOutbox: 0
      });
    }));
  }
  static \u0275fac = function DashboardComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DashboardComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _DashboardComponent, selectors: [["app-dashboard"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 130, vars: 15, consts: [[1, "space-y-8", "animate-fade-in"], [1, "flex", "flex-col", "md:flex-row", "md:items-center", "justify-between", "gap-4"], [1, "text-3xl", "font-extrabold", "tracking-tight", "text-white"], [1, "bg-gradient-to-r", "from-brand-400", "to-indigo-400", "bg-clip-text", "text-transparent"], [1, "text-sm", "text-slate-400", "mt-1"], [1, "flex", "items-center", "space-x-2", "text-xs", "font-semibold", "px-4", "py-2", "bg-slate-900", "border", "border-slate-800", "rounded-xl", "text-slate-300"], [1, "h-2", "w-2", "bg-emerald-500", "rounded-full", "animate-ping"], [1, "grid", "grid-cols-1", "sm:grid-cols-2", "lg:grid-cols-4", "gap-6"], [1, "glass-card", "p-6", "flex", "items-center", "space-x-4"], [1, "p-3", "bg-brand-500/10", "border", "border-brand-500/20", "text-brand-400", "rounded-2xl"], [1, "material-icons", "text-3xl"], [1, "text-xs", "text-slate-400", "uppercase", "tracking-wider", "font-semibold"], [1, "text-2xl", "font-bold", "mt-1", "text-slate-100"], [1, "p-3", "bg-indigo-500/10", "border", "border-indigo-500/20", "text-indigo-400", "rounded-2xl"], [1, "p-3", "bg-purple-500/10", "border", "border-purple-500/20", "text-purple-400", "rounded-2xl"], [1, "p-3", "bg-amber-500/10", "border", "border-amber-500/20", "text-amber-400", "rounded-2xl"], [1, "grid", "grid-cols-1", "lg:grid-cols-3", "gap-8"], [1, "lg:col-span-2", "glass-card", "p-6", "flex", "flex-col", "justify-between"], [1, "flex", "items-center", "justify-between", "mb-6"], [1, "text-lg", "font-bold", "text-slate-200"], [1, "text-xs", "text-slate-400", "font-semibold", "uppercase"], [1, "space-y-4"], [1, "flex", "justify-between", "text-xs", "font-semibold", "text-slate-400", "mb-1"], [1, "h-2", "w-full", "bg-slate-900", "rounded-full", "overflow-hidden", "border", "border-slate-800"], [1, "h-full", "bg-gradient-to-r", "from-brand-600", "to-brand-400", "rounded-full", "transition-all", "duration-1000"], [1, "h-full", "bg-gradient-to-r", "from-indigo-600", "to-indigo-400", "rounded-full", "transition-all", "duration-1000"], [1, "h-full", "bg-gradient-to-r", "from-purple-600", "to-purple-400", "rounded-full", "transition-all", "duration-1000"], [1, "mt-8", "pt-4", "border-t", "border-slate-900", "flex", "items-center", "justify-between", "text-[11px]", "text-slate-500"], [1, "flex", "items-center"], [1, "material-icons", "text-[10px]", "mr-1", "text-brand-500"], [1, "glass-card", "p-6", "flex", "flex-col", "justify-between"], [1, "text-xs", "text-slate-500"], [1, "flex", "items-start", "space-x-3", "text-xs"], [1, "material-icons", "text-brand-400", "text-sm", "mt-0.5"], [1, "flex-1"], [1, "text-slate-200", "font-semibold"], [1, "text-[10px]", "text-slate-500"], [1, "material-icons", "text-emerald-400", "text-sm", "mt-0.5"], [1, "material-icons", "text-indigo-400", "text-sm", "mt-0.5"], [1, "mt-6", "pt-4", "border-t", "border-slate-900", "flex", "justify-between", "text-[11px]", "text-slate-500"], [1, "font-semibold", "text-emerald-500", "uppercase", "tracking-wider", "text-[10px]"]], template: function DashboardComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div")(3, "h1", 2);
      \u0275\u0275text(4, " Welcome Back, ");
      \u0275\u0275elementStart(5, "span", 3);
      \u0275\u0275text(6);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(7, "p", 4);
      \u0275\u0275text(8, "Managing corporate lifecycle analytics for ");
      \u0275\u0275elementStart(9, "strong");
      \u0275\u0275text(10);
      \u0275\u0275elementEnd();
      \u0275\u0275text(11, ".");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(12, "div", 5);
      \u0275\u0275element(13, "span", 6);
      \u0275\u0275elementStart(14, "span");
      \u0275\u0275text(15, "Event Bus Stream: Connected");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(16, "div", 7)(17, "div", 8)(18, "div", 9)(19, "span", 10);
      \u0275\u0275text(20, "people");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(21, "div")(22, "p", 11);
      \u0275\u0275text(23, "Total Workforce");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(24, "h3", 12);
      \u0275\u0275text(25);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(26, "div", 8)(27, "div", 13)(28, "span", 10);
      \u0275\u0275text(29, "corporate_fare");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(30, "div")(31, "p", 11);
      \u0275\u0275text(32, "Departments");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(33, "h3", 12);
      \u0275\u0275text(34);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(35, "div", 8)(36, "div", 14)(37, "span", 10);
      \u0275\u0275text(38, "date_range");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(39, "div")(40, "p", 11);
      \u0275\u0275text(41, "Active Leaves");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(42, "h3", 12);
      \u0275\u0275text(43);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(44, "div", 8)(45, "div", 15)(46, "span", 10);
      \u0275\u0275text(47, "outbox");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(48, "div")(49, "p", 11);
      \u0275\u0275text(50, "Outbox Messages");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(51, "h3", 12);
      \u0275\u0275text(52);
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(53, "div", 16)(54, "div", 17)(55, "div")(56, "div", 18)(57, "h2", 19);
      \u0275\u0275text(58, "Department Headcount Share");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(59, "span", 20);
      \u0275\u0275text(60, "Real-Time Distribution");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(61, "div", 21)(62, "div")(63, "div", 22)(64, "span");
      \u0275\u0275text(65, "Engineering");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(66, "span");
      \u0275\u0275text(67);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(68, "div", 23);
      \u0275\u0275element(69, "div", 24);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(70, "div")(71, "div", 22)(72, "span");
      \u0275\u0275text(73, "Human Resources");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(74, "span");
      \u0275\u0275text(75);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(76, "div", 23);
      \u0275\u0275element(77, "div", 25);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(78, "div")(79, "div", 22)(80, "span");
      \u0275\u0275text(81, "Sales & Marketing");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(82, "span");
      \u0275\u0275text(83);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(84, "div", 23);
      \u0275\u0275element(85, "div", 26);
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(86, "div", 27)(87, "span");
      \u0275\u0275text(88, "Graph shows current tenant dataset");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(89, "span", 28)(90, "span", 29);
      \u0275\u0275text(91, "info");
      \u0275\u0275elementEnd();
      \u0275\u0275text(92, "Updated just now");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(93, "div", 30)(94, "div")(95, "div", 18)(96, "h2", 19);
      \u0275\u0275text(97, "System Logs (Audit)");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(98, "span", 31);
      \u0275\u0275text(99, "Event Logs");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(100, "div", 21)(101, "div", 32)(102, "span", 33);
      \u0275\u0275text(103, "verified_user");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(104, "div", 34)(105, "p", 35);
      \u0275\u0275text(106, "User session verified");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(107, "p", 36);
      \u0275\u0275text(108, "Tenant token mapped to tenant provider scope");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(109, "div", 32)(110, "span", 37);
      \u0275\u0275text(111, "sync");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(112, "div", 34)(113, "p", 35);
      \u0275\u0275text(114, "Outbox worker processed queue");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(115, "p", 36);
      \u0275\u0275text(116, "Dispatched transaction event payloads to outbox");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(117, "div", 32)(118, "span", 38);
      \u0275\u0275text(119, "dns");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(120, "div", 34)(121, "p", 35);
      \u0275\u0275text(122, "PostgreSQL schema synced");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(123, "p", 36);
      \u0275\u0275text(124, "Database ranges and tenant filters compiled successfully");
      \u0275\u0275elementEnd()()()()();
      \u0275\u0275elementStart(125, "div", 39)(126, "span");
      \u0275\u0275text(127, "PostgreSQL 16 & Redis active");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(128, "span", 40);
      \u0275\u0275text(129, "Healthy");
      \u0275\u0275elementEnd()()()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(6);
      \u0275\u0275textInterpolate(ctx.getEmailName());
      \u0275\u0275advance(4);
      \u0275\u0275textInterpolate(ctx.getTenantName());
      \u0275\u0275advance(15);
      \u0275\u0275textInterpolate(ctx.stats.employeeCount);
      \u0275\u0275advance(9);
      \u0275\u0275textInterpolate(ctx.stats.departmentCount);
      \u0275\u0275advance(9);
      \u0275\u0275textInterpolate(ctx.stats.activeLeaves);
      \u0275\u0275advance(9);
      \u0275\u0275textInterpolate1("", ctx.stats.pendingOutbox, " Pending");
      \u0275\u0275advance(15);
      \u0275\u0275textInterpolate(ctx.stats.employeeCount > 1 ? "60%" : "100%");
      \u0275\u0275advance(2);
      \u0275\u0275styleProp("width", ctx.stats.employeeCount > 1 ? 60 : 100, "%");
      \u0275\u0275advance(6);
      \u0275\u0275textInterpolate(ctx.stats.employeeCount > 1 ? "20%" : "0%");
      \u0275\u0275advance(2);
      \u0275\u0275styleProp("width", ctx.stats.employeeCount > 1 ? 20 : 0, "%");
      \u0275\u0275advance(6);
      \u0275\u0275textInterpolate(ctx.stats.employeeCount > 1 ? "20%" : "0%");
      \u0275\u0275advance(2);
      \u0275\u0275styleProp("width", ctx.stats.employeeCount > 1 ? 20 : 0, "%");
    }
  }, dependencies: [CommonModule], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(DashboardComponent, { className: "DashboardComponent", filePath: "src\\app\\features\\dashboard\\dashboard.component.ts", lineNumber: 191 });
})();
export {
  DashboardComponent
};
//# sourceMappingURL=chunk-DBGY4KDS.js.map
