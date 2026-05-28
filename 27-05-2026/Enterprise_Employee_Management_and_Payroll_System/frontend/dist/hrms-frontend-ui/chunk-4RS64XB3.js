import {
  takeUntilDestroyed
} from "./chunk-O675F7LX.js";
import {
  DefaultValueAccessor,
  FormBuilder,
  FormControlName,
  FormGroupDirective,
  NgControlStatus,
  NgControlStatusGroup,
  NgSelectOption,
  ReactiveFormsModule,
  SelectControlValueAccessor,
  Validators,
  ɵNgNoValidate,
  ɵNgSelectMultipleOption
} from "./chunk-7UGTWGHG.js";
import {
  AuthService,
  CommonModule,
  DestroyRef,
  Router,
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
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate2
} from "./chunk-XVQVZOM4.js";

// src/app/features/auth/login.component.ts
var _forTrack0 = ($index, $item) => $item.id;
function LoginComponent_For_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 13);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const t_r1 = ctx.$implicit;
    \u0275\u0275property("value", t_r1.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2("", t_r1.name, " (", t_r1.countryCode, ")");
  }
}
function LoginComponent_Conditional_25_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 16);
    \u0275\u0275text(1, "Email is required.");
    \u0275\u0275elementEnd();
  }
}
function LoginComponent_Conditional_26_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 16);
    \u0275\u0275text(1, "Please enter a valid email address.");
    \u0275\u0275elementEnd();
  }
}
function LoginComponent_Conditional_31_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 16);
    \u0275\u0275text(1, "Password is required.");
    \u0275\u0275elementEnd();
  }
}
function LoginComponent_Conditional_32_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 16);
    \u0275\u0275text(1, "Password must be at least 6 characters.");
    \u0275\u0275elementEnd();
  }
}
function LoginComponent_Conditional_33_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 19)(1, "span", 23);
    \u0275\u0275text(2, "error");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r1.errorMessage);
  }
}
function LoginComponent_Conditional_35_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 21);
  }
}
function LoginComponent_Conditional_36_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1, "Authenticate Session");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "span", 23);
    \u0275\u0275text(3, "arrow_forward");
    \u0275\u0275elementEnd();
  }
}
var LoginComponent = class _LoginComponent {
  tenantService = inject(TenantService);
  authService = inject(AuthService);
  router = inject(Router);
  fb = inject(FormBuilder);
  destroyRef = inject(DestroyRef);
  loginForm = this.fb.group({
    tenantId: [this.tenantService.tenants[0].id, Validators.required],
    email: ["", [Validators.required, Validators.email]],
    password: ["", [Validators.required, Validators.minLength(6)]]
  });
  loading = false;
  errorMessage = "";
  onSubmit() {
    if (this.loginForm.invalid)
      return;
    this.loading = true;
    this.errorMessage = "";
    const { email, password, tenantId } = this.loginForm.value;
    this.authService.login(email, password, tenantId).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(["/dashboard"]);
      },
      error: (err) => {
        this.loading = false;
        this.errorMessage = err.error?.message || "Authentication failed. Please verify connection and credentials.";
      }
    });
  }
  static \u0275fac = function LoginComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _LoginComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _LoginComponent, selectors: [["app-login"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 42, vars: 8, consts: [[1, "h-screen", "w-screen", "flex", "items-center", "justify-center", "bg-slate-950", "relative", "overflow-hidden"], [1, "absolute", "-top-40", "-left-40", "h-[600px]", "w-[600px]", "bg-brand-500/10", "rounded-full", "blur-[120px]", "pointer-events-none"], [1, "absolute", "-bottom-40", "-right-40", "h-[600px]", "w-[600px]", "bg-indigo-500/10", "rounded-full", "blur-[120px]", "pointer-events-none"], [1, "w-full", "max-w-md", "p-8", "glass", "rounded-3xl", "shadow-2xl", "relative", "z-10", "animate-fade-in", "border", "border-slate-800"], [1, "flex", "flex-col", "items-center", "mb-8"], [1, "h-14", "w-14", "rounded-2xl", "bg-brand-600/10", "border", "border-brand-500/30", "flex", "items-center", "justify-center", "text-brand-400", "mb-3"], [1, "material-icons", "text-3xl"], [1, "text-2xl", "font-extrabold", "tracking-tight", "text-white", "flex", "items-center", "gap-1.5"], [1, "text-brand-400"], [1, "text-xs", "text-slate-400", "mt-1", "uppercase", "tracking-wider", "font-semibold"], [1, "space-y-5", 3, "ngSubmit", "formGroup"], ["for", "tenantSelect", 1, "block", "text-xs", "font-semibold", "uppercase", "tracking-wider", "text-slate-400", "mb-1.5"], ["id", "tenantSelect", "formControlName", "tenantId", 1, "w-full", "bg-slate-900", "border", "border-slate-800", "focus:border-brand-500", "focus:ring-1", "focus:ring-brand-500", "rounded-xl", "px-4", "py-3", "text-sm", "text-slate-200", "outline-none", "transition-all", "cursor-pointer"], [3, "value"], ["for", "emailInput", 1, "block", "text-xs", "font-semibold", "uppercase", "tracking-wider", "text-slate-400", "mb-1.5"], ["id", "emailInput", "type", "email", "formControlName", "email", "placeholder", "e.g. hr.admin@capgemini.com", 1, "w-full", "bg-slate-900", "border", "border-slate-800", "focus:border-brand-500", "focus:ring-1", "focus:ring-brand-500", "rounded-xl", "px-4", "py-3", "text-sm", "text-slate-200", "outline-none", "transition-all", "placeholder:text-slate-600"], [1, "text-red-400", "text-xs", "mt-1"], ["for", "passwordInput", 1, "block", "text-xs", "font-semibold", "uppercase", "tracking-wider", "text-slate-400", "mb-1.5"], ["id", "passwordInput", "type", "password", "formControlName", "password", "placeholder", "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022", 1, "w-full", "bg-slate-900", "border", "border-slate-800", "focus:border-brand-500", "focus:ring-1", "focus:ring-brand-500", "rounded-xl", "px-4", "py-3", "text-sm", "text-slate-200", "outline-none", "transition-all", "placeholder:text-slate-600"], [1, "p-3", "bg-red-900/20", "border", "border-red-500/20", "rounded-xl", "flex", "items-center", "space-x-2", "text-red-400", "text-xs", "animate-fade-in"], ["id", "loginSubmitBtn", "type", "submit", 1, "w-full", "bg-gradient-to-r", "from-brand-600", "to-brand-500", "hover:from-brand-500", "hover:to-brand-400", "disabled:opacity-50", "disabled:cursor-not-allowed", "text-white", "font-semibold", "py-3.5", "px-4", "rounded-xl", "transition-all", "duration-200", "flex", "items-center", "justify-center", "space-x-2", "shadow-lg", "shadow-brand-500/10", 3, "disabled"], [1, "animate-spin", "h-5", "w-5", "border-2", "border-white", "border-t-transparent", "rounded-full"], [1, "mt-8", "pt-4", "border-t", "border-slate-900", "flex", "justify-between", "text-[10px]", "text-slate-500"], [1, "material-icons", "text-sm"]], template: function LoginComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0);
      \u0275\u0275element(1, "div", 1)(2, "div", 2);
      \u0275\u0275elementStart(3, "div", 3)(4, "div", 4)(5, "div", 5)(6, "span", 6);
      \u0275\u0275text(7, "hub");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(8, "h2", 7)(9, "span", 8);
      \u0275\u0275text(10, "CORE");
      \u0275\u0275elementEnd();
      \u0275\u0275text(11, " HRMS ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(12, "p", 9);
      \u0275\u0275text(13, "Generic Multi-Tenant Platform");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(14, "form", 10);
      \u0275\u0275listener("ngSubmit", function LoginComponent_Template_form_ngSubmit_14_listener() {
        return ctx.onSubmit();
      });
      \u0275\u0275elementStart(15, "div")(16, "label", 11);
      \u0275\u0275text(17, "Tenant Organization");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(18, "select", 12);
      \u0275\u0275repeaterCreate(19, LoginComponent_For_20_Template, 2, 3, "option", 13, _forTrack0);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(21, "div")(22, "label", 14);
      \u0275\u0275text(23, "Email Address");
      \u0275\u0275elementEnd();
      \u0275\u0275element(24, "input", 15);
      \u0275\u0275template(25, LoginComponent_Conditional_25_Template, 2, 0, "p", 16)(26, LoginComponent_Conditional_26_Template, 2, 0, "p", 16);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(27, "div")(28, "label", 17);
      \u0275\u0275text(29, "Security Password");
      \u0275\u0275elementEnd();
      \u0275\u0275element(30, "input", 18);
      \u0275\u0275template(31, LoginComponent_Conditional_31_Template, 2, 0, "p", 16)(32, LoginComponent_Conditional_32_Template, 2, 0, "p", 16);
      \u0275\u0275elementEnd();
      \u0275\u0275template(33, LoginComponent_Conditional_33_Template, 5, 1, "div", 19);
      \u0275\u0275elementStart(34, "button", 20);
      \u0275\u0275template(35, LoginComponent_Conditional_35_Template, 1, 0, "span", 21)(36, LoginComponent_Conditional_36_Template, 4, 0);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(37, "div", 22)(38, "span");
      \u0275\u0275text(39, "* Demo users: hr@test.com | admin@test.com");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(40, "span");
      \u0275\u0275text(41, "Version 2.0 LTS");
      \u0275\u0275elementEnd()()()();
    }
    if (rf & 2) {
      let tmp_2_0;
      let tmp_3_0;
      let tmp_4_0;
      let tmp_5_0;
      \u0275\u0275advance(14);
      \u0275\u0275property("formGroup", ctx.loginForm);
      \u0275\u0275advance(5);
      \u0275\u0275repeater(ctx.tenantService.tenants);
      \u0275\u0275advance(6);
      \u0275\u0275conditional(((tmp_2_0 = ctx.loginForm.get("email")) == null ? null : tmp_2_0.touched) && ((tmp_2_0 = ctx.loginForm.get("email")) == null ? null : tmp_2_0.hasError("required")) ? 25 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(((tmp_3_0 = ctx.loginForm.get("email")) == null ? null : tmp_3_0.touched) && ((tmp_3_0 = ctx.loginForm.get("email")) == null ? null : tmp_3_0.hasError("email")) ? 26 : -1);
      \u0275\u0275advance(5);
      \u0275\u0275conditional(((tmp_4_0 = ctx.loginForm.get("password")) == null ? null : tmp_4_0.touched) && ((tmp_4_0 = ctx.loginForm.get("password")) == null ? null : tmp_4_0.hasError("required")) ? 31 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(((tmp_5_0 = ctx.loginForm.get("password")) == null ? null : tmp_5_0.touched) && ((tmp_5_0 = ctx.loginForm.get("password")) == null ? null : tmp_5_0.hasError("minlength")) ? 32 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.errorMessage ? 33 : -1);
      \u0275\u0275advance();
      \u0275\u0275property("disabled", ctx.loginForm.invalid || ctx.loading);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.loading ? 35 : 36);
    }
  }, dependencies: [CommonModule, ReactiveFormsModule, \u0275NgNoValidate, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, SelectControlValueAccessor, NgControlStatus, NgControlStatusGroup, FormGroupDirective, FormControlName], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(LoginComponent, { className: "LoginComponent", filePath: "src\\app\\features\\auth\\login.component.ts", lineNumber: 99 });
})();
export {
  LoginComponent
};
//# sourceMappingURL=chunk-4RS64XB3.js.map
