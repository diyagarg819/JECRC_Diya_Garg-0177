import {
  DefaultValueAccessor,
  FormsModule,
  NgControlStatus,
  NgControlStatusGroup,
  NgForm,
  NgModel,
  ɵNgNoValidate
} from "./chunk-7UGTWGHG.js";
import {
  AuthService,
  CommonModule,
  NgForOf,
  NgIf,
  TenantService,
  inject,
  ɵsetClassDebugInfo,
  ɵɵStandaloneFeature,
  ɵɵadvance,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-XVQVZOM4.js";

// src/app/features/tenants/tenant-management.component.ts
function TenantManagementComponent_tr_36_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr", 36)(1, "td", 37)(2, "div", 38);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "td", 39);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "td", 40)(8, "span", 41);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "td", 42);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const tenant_r1 = ctx.$implicit;
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", tenant_r1.name.charAt(0), " ");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", tenant_r1.name, " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(tenant_r1.id);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", tenant_r1.countryCode, " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(tenant_r1.currency);
  }
}
function TenantManagementComponent_div_58_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 43)(1, "span", 44);
    \u0275\u0275text(2, "error");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r1.formError, " ");
  }
}
function TenantManagementComponent_div_59_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 45)(1, "span", 44);
    \u0275\u0275text(2, "check_circle");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r1.formSuccess, " ");
  }
}
var TenantManagementComponent = class _TenantManagementComponent {
  tenantService = inject(TenantService);
  authService = inject(AuthService);
  newTenant = {
    name: "",
    countryCode: "",
    currency: ""
  };
  formError = "";
  formSuccess = "";
  ngOnInit() {
    if (!this.authService.hasRole(["SuperAdmin"])) {
      this.authService.logout();
    }
  }
  getTenantsList() {
    return this.tenantService.tenants;
  }
  onCreateTenant() {
    this.formError = "";
    this.formSuccess = "";
    const { name, countryCode, currency } = this.newTenant;
    if (!name || !countryCode || !currency) {
      this.formError = "Please fill out all required fields.";
      return;
    }
    if (countryCode.length !== 2) {
      this.formError = "Country code must be exactly 2 characters (e.g. US, IN).";
      return;
    }
    if (currency.length !== 3) {
      this.formError = "Currency code must be exactly 3 characters (e.g. USD, INR).";
      return;
    }
    const registered = this.tenantService.addTenant(name, countryCode, currency);
    this.newTenant = { name: "", countryCode: "", currency: "" };
    this.formSuccess = `Organization "${registered.name}" registered successfully with UUID: ${registered.id}`;
  }
  static \u0275fac = function TenantManagementComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _TenantManagementComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _TenantManagementComponent, selectors: [["app-tenant-management"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 64, vars: 7, consts: [[1, "space-y-8", "animate-fade-in", "text-slate-100"], [1, "flex", "flex-col", "md:flex-row", "md:items-center", "md:justify-between", "gap-4"], [1, "text-2xl", "font-bold", "tracking-tight", "text-white", "flex", "items-center", "gap-2"], [1, "material-icons", "text-brand-400"], [1, "text-xs", "text-slate-400", "mt-0.5"], [1, "flex", "items-center", "gap-2", "bg-slate-900/60", "border", "border-slate-800", "px-3.5", "py-2", "rounded-xl"], [1, "w-2", "h-2", "rounded-full", "bg-brand-500", "animate-pulse"], [1, "text-[10px]", "font-semibold", "text-slate-300", "uppercase", "tracking-wider"], [1, "grid", "grid-cols-1", "lg:grid-cols-12", "gap-8"], [1, "lg:col-span-8", "space-y-6"], [1, "glass-card", "p-6"], [1, "flex", "items-center", "justify-between", "mb-5"], [1, "text-sm", "font-bold", "text-white", "flex", "items-center", "gap-2"], [1, "material-icons", "text-xs", "text-brand-400"], [1, "bg-brand-500/10", "text-brand-400", "border", "border-brand-500/20", "text-[9px]", "font-bold", "px-2", "py-0.5", "rounded-full"], [1, "overflow-x-auto"], [1, "w-full", "text-left", "text-xs", "border-collapse"], [1, "border-b", "border-slate-800", "text-slate-400", "font-semibold", "uppercase", "text-[9px]", "tracking-wider"], [1, "py-3", "px-4"], [1, "py-3", "px-4", "text-center"], [1, "py-3", "px-4", "text-right"], [1, "divide-y", "divide-slate-800/60"], ["class", "hover:bg-slate-900/30 transition duration-150", 4, "ngFor", "ngForOf"], [1, "lg:col-span-4"], [1, "glass-card", "p-6", "sticky", "top-24"], [1, "text-sm", "font-bold", "text-white", "mb-4", "flex", "items-center", "gap-2"], [1, "text-[10px]", "text-slate-400", "mb-5", "leading-relaxed"], [1, "space-y-4", 3, "submit"], [1, "block", "text-[9px]", "font-bold", "text-slate-400", "uppercase", "mb-1.5"], ["type", "text", "name", "name", "placeholder", "e.g. Google DeepMind", 1, "w-full", "bg-slate-950", "border", "border-slate-800", "text-xs", "text-slate-200", "rounded-xl", "px-3.5", "py-2.5", "focus:border-brand-500", "focus:ring-1", "focus:ring-brand-500/25", "outline-none", "transition", 3, "ngModelChange", "ngModel"], ["type", "text", "name", "countryCode", "placeholder", "e.g. US", "maxLength", "2", 1, "w-full", "bg-slate-950", "border", "border-slate-800", "text-xs", "text-slate-200", "rounded-xl", "px-3.5", "py-2.5", "focus:border-brand-500", "focus:ring-1", "focus:ring-brand-500/25", "outline-none", "transition", 3, "ngModelChange", "ngModel"], ["type", "text", "name", "currency", "placeholder", "e.g. USD", "maxLength", "3", 1, "w-full", "bg-slate-950", "border", "border-slate-800", "text-xs", "text-slate-200", "rounded-xl", "px-3.5", "py-2.5", "focus:border-brand-500", "focus:ring-1", "focus:ring-brand-500/25", "outline-none", "transition", 3, "ngModelChange", "ngModel"], ["class", "bg-rose-500/10 border border-rose-500/20 p-3 rounded-xl text-[10px] text-rose-400 flex items-center gap-1.5", 4, "ngIf"], ["class", "bg-emerald-500/10 border border-emerald-500/20 p-3 rounded-xl text-[10px] text-emerald-400 flex items-center gap-1.5", 4, "ngIf"], ["type", "submit", 1, "w-full", "bg-brand-600", "hover:bg-brand-500", "text-white", "rounded-xl", "py-3", "text-xs", "font-bold", "transition", "flex", "items-center", "justify-center", "gap-1"], [1, "material-icons", "text-sm"], [1, "hover:bg-slate-900/30", "transition", "duration-150"], [1, "py-3.5", "px-4", "font-semibold", "text-slate-200", "flex", "items-center", "gap-2"], [1, "h-6", "w-6", "rounded", "bg-brand-500/10", "border", "border-brand-500/25", "flex", "items-center", "justify-center", "text-[11px]", "text-brand-400", "uppercase", "font-bold"], [1, "py-3.5", "px-4", "text-slate-400", "font-mono", "text-[10px]"], [1, "py-3.5", "px-4", "text-center"], [1, "px-2", "py-0.5", "bg-slate-800", "border", "border-slate-700/60", "rounded", "text-[9px]", "font-bold", "text-slate-300"], [1, "py-3.5", "px-4", "text-right", "font-mono", "text-emerald-400", "font-semibold"], [1, "bg-rose-500/10", "border", "border-rose-500/20", "p-3", "rounded-xl", "text-[10px]", "text-rose-400", "flex", "items-center", "gap-1.5"], [1, "material-icons", "text-xs"], [1, "bg-emerald-500/10", "border", "border-emerald-500/20", "p-3", "rounded-xl", "text-[10px]", "text-emerald-400", "flex", "items-center", "gap-1.5"]], template: function TenantManagementComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div")(3, "h1", 2)(4, "span", 3);
      \u0275\u0275text(5, "domain");
      \u0275\u0275elementEnd();
      \u0275\u0275text(6, " Tenant & Organization Registry ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(7, "p", 4);
      \u0275\u0275text(8, "Register new client companies, generate custom isolated schemas, and configure distinct currency frameworks.");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(9, "div", 5);
      \u0275\u0275element(10, "span", 6);
      \u0275\u0275elementStart(11, "span", 7);
      \u0275\u0275text(12, "SuperAdmin Active Session");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(13, "div", 8)(14, "div", 9)(15, "div", 10)(16, "div", 11)(17, "h2", 12)(18, "span", 13);
      \u0275\u0275text(19, "lan");
      \u0275\u0275elementEnd();
      \u0275\u0275text(20, " Active Organizations Summary ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(21, "span", 14);
      \u0275\u0275text(22);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(23, "div", 15)(24, "table", 16)(25, "thead")(26, "tr", 17)(27, "th", 18);
      \u0275\u0275text(28, "Organization Name");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(29, "th", 18);
      \u0275\u0275text(30, "Tenant Isolated UUID");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(31, "th", 19);
      \u0275\u0275text(32, "Country");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(33, "th", 20);
      \u0275\u0275text(34, "Currency");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(35, "tbody", 21);
      \u0275\u0275template(36, TenantManagementComponent_tr_36_Template, 12, 5, "tr", 22);
      \u0275\u0275elementEnd()()()()();
      \u0275\u0275elementStart(37, "div", 23)(38, "div", 24)(39, "h2", 25)(40, "span", 3);
      \u0275\u0275text(41, "add_business");
      \u0275\u0275elementEnd();
      \u0275\u0275text(42, " Register Organization ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(43, "p", 26);
      \u0275\u0275text(44, " Define a new tenant structure. The system will automatically spawn a custom schema configuration and isolated database parameters. ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(45, "form", 27);
      \u0275\u0275listener("submit", function TenantManagementComponent_Template_form_submit_45_listener() {
        return ctx.onCreateTenant();
      });
      \u0275\u0275elementStart(46, "div")(47, "label", 28);
      \u0275\u0275text(48, "Company Name");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(49, "input", 29);
      \u0275\u0275twoWayListener("ngModelChange", function TenantManagementComponent_Template_input_ngModelChange_49_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.newTenant.name, $event) || (ctx.newTenant.name = $event);
        return $event;
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(50, "div")(51, "label", 28);
      \u0275\u0275text(52, "Country Code (2 Letters)");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(53, "input", 30);
      \u0275\u0275twoWayListener("ngModelChange", function TenantManagementComponent_Template_input_ngModelChange_53_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.newTenant.countryCode, $event) || (ctx.newTenant.countryCode = $event);
        return $event;
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(54, "div")(55, "label", 28);
      \u0275\u0275text(56, "Currency (3 Letters)");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(57, "input", 31);
      \u0275\u0275twoWayListener("ngModelChange", function TenantManagementComponent_Template_input_ngModelChange_57_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.newTenant.currency, $event) || (ctx.newTenant.currency = $event);
        return $event;
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275template(58, TenantManagementComponent_div_58_Template, 4, 1, "div", 32)(59, TenantManagementComponent_div_59_Template, 4, 1, "div", 33);
      \u0275\u0275elementStart(60, "button", 34)(61, "span", 35);
      \u0275\u0275text(62, "domain_add");
      \u0275\u0275elementEnd();
      \u0275\u0275text(63, " Register Tenant ");
      \u0275\u0275elementEnd()()()()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(22);
      \u0275\u0275textInterpolate1(" ", ctx.getTenantsList().length, " registered ");
      \u0275\u0275advance(14);
      \u0275\u0275property("ngForOf", ctx.getTenantsList());
      \u0275\u0275advance(13);
      \u0275\u0275twoWayProperty("ngModel", ctx.newTenant.name);
      \u0275\u0275advance(4);
      \u0275\u0275twoWayProperty("ngModel", ctx.newTenant.countryCode);
      \u0275\u0275advance(4);
      \u0275\u0275twoWayProperty("ngModel", ctx.newTenant.currency);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.formError);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.formSuccess);
    }
  }, dependencies: [CommonModule, NgForOf, NgIf, FormsModule, \u0275NgNoValidate, DefaultValueAccessor, NgControlStatus, NgControlStatusGroup, NgModel, NgForm], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(TenantManagementComponent, { className: "TenantManagementComponent", filePath: "src\\app\\features\\tenants\\tenant-management.component.ts", lineNumber: 131 });
})();
export {
  TenantManagementComponent
};
//# sourceMappingURL=chunk-6Y6RXGHK.js.map
