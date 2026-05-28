import {
  DefaultValueAccessor,
  FormsModule,
  NgControlStatus,
  NgControlStatusGroup,
  NgForm,
  NgModel,
  NgSelectOption,
  NumberValueAccessor,
  SelectControlValueAccessor,
  ɵNgNoValidate,
  ɵNgSelectMultipleOption
} from "./chunk-7UGTWGHG.js";
import {
  AuthService,
  CommonModule,
  DecimalPipe,
  HttpClient,
  NgClass,
  NgForOf,
  NgIf,
  inject,
  ɵsetClassDebugInfo,
  ɵɵStandaloneFeature,
  ɵɵadvance,
  ɵɵclassProp,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind2,
  ɵɵproperty,
  ɵɵpureFunction4,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-XVQVZOM4.js";

// src/app/features/assets/asset-management.component.ts
var _c0 = (a0, a1, a2, a3) => ({ "bg-emerald-500/10 text-emerald-400 border-emerald-500/20": a0, "bg-indigo-500/10 text-indigo-400 border-indigo-500/20": a1, "bg-amber-500/10 text-amber-400 border-amber-500/20": a2, "bg-slate-500/10 text-slate-400 border-slate-500/20": a3 });
function AssetManagementComponent_div_50_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 35)(1, "div")(2, "div", 36)(3, "div", 37)(4, "span", 38);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "h3", 39);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "span", 40);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "div", 41)(11, "div", 42)(12, "span", 43);
    \u0275\u0275text(13, "Serial No:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "span", 44);
    \u0275\u0275text(15);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(16, "div", 42)(17, "span", 43);
    \u0275\u0275text(18, "Category:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "span", 45);
    \u0275\u0275text(20);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(21, "div", 42)(22, "span", 43);
    \u0275\u0275text(23, "Book Value:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "span", 46);
    \u0275\u0275text(25);
    \u0275\u0275pipe(26, "number");
    \u0275\u0275elementStart(27, "span", 47);
    \u0275\u0275text(28);
    \u0275\u0275elementEnd()()()()();
    \u0275\u0275elementStart(29, "div", 48)(30, "div", 49)(31, "span", 50);
    \u0275\u0275text(32, "person");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(33, "span");
    \u0275\u0275text(34);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(35, "span", 51);
    \u0275\u0275text(36);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const asset_r1 = ctx.$implicit;
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(asset_r1.assetCode);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(asset_r1.assetName);
    \u0275\u0275advance();
    \u0275\u0275property("ngClass", \u0275\u0275pureFunction4(13, _c0, asset_r1.status === "Available", asset_r1.status === "Assigned", asset_r1.status === "UnderRepair", asset_r1.status === "Scrapped"));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", asset_r1.status, " ");
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(asset_r1.serialNumber);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(asset_r1.category);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1("$", \u0275\u0275pipeBind2(26, 10, asset_r1.currentValue, "1.0-0"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("/$", asset_r1.purchaseCost, "");
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(asset_r1.assignedToName || "Unassigned (Pool)");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("Depr. Rate: ", asset_r1.depreciationRate, "%/yr");
  }
}
function AssetManagementComponent_div_79_option_40_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 70);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const emp_r4 = ctx.$implicit;
    \u0275\u0275property("value", emp_r4.email);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(emp_r4.name);
  }
}
function AssetManagementComponent_div_79_div_41_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 71)(1, "span", 72);
    \u0275\u0275text(2, "error");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r2.formError, " ");
  }
}
function AssetManagementComponent_div_79_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 52)(1, "h2", 53)(2, "span", 54);
    \u0275\u0275text(3, "playlist_add");
    \u0275\u0275elementEnd();
    \u0275\u0275text(4, " Register New Asset ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "form", 55);
    \u0275\u0275listener("submit", function AssetManagementComponent_div_79_Template_form_submit_5_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.registerAsset());
    });
    \u0275\u0275elementStart(6, "div")(7, "label", 28);
    \u0275\u0275text(8, "Asset Name");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "input", 56);
    \u0275\u0275twoWayListener("ngModelChange", function AssetManagementComponent_div_79_Template_input_ngModelChange_9_listener($event) {
      \u0275\u0275restoreView(_r2);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.newAsset.assetName, $event) || (ctx_r2.newAsset.assetName = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "div", 30)(11, "div")(12, "label", 28);
    \u0275\u0275text(13, "Category");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "select", 57);
    \u0275\u0275twoWayListener("ngModelChange", function AssetManagementComponent_div_79_Template_select_ngModelChange_14_listener($event) {
      \u0275\u0275restoreView(_r2);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.newAsset.category, $event) || (ctx_r2.newAsset.category = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementStart(15, "option", 58);
    \u0275\u0275text(16, "Hardware");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "option", 59);
    \u0275\u0275text(18, "License");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "option", 60);
    \u0275\u0275text(20, "Furniture");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(21, "div")(22, "label", 28);
    \u0275\u0275text(23, "Serial Number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "input", 61);
    \u0275\u0275twoWayListener("ngModelChange", function AssetManagementComponent_div_79_Template_input_ngModelChange_24_listener($event) {
      \u0275\u0275restoreView(_r2);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.newAsset.serialNumber, $event) || (ctx_r2.newAsset.serialNumber = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(25, "div", 30)(26, "div")(27, "label", 28);
    \u0275\u0275text(28, "Purchase Cost ($)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(29, "input", 62);
    \u0275\u0275twoWayListener("ngModelChange", function AssetManagementComponent_div_79_Template_input_ngModelChange_29_listener($event) {
      \u0275\u0275restoreView(_r2);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.newAsset.purchaseCost, $event) || (ctx_r2.newAsset.purchaseCost = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(30, "div")(31, "label", 28);
    \u0275\u0275text(32, "Depr. Rate (%)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(33, "input", 63);
    \u0275\u0275twoWayListener("ngModelChange", function AssetManagementComponent_div_79_Template_input_ngModelChange_33_listener($event) {
      \u0275\u0275restoreView(_r2);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.newAsset.depreciationRate, $event) || (ctx_r2.newAsset.depreciationRate = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(34, "div")(35, "label", 28);
    \u0275\u0275text(36, "Assign to Employee");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(37, "select", 64);
    \u0275\u0275twoWayListener("ngModelChange", function AssetManagementComponent_div_79_Template_select_ngModelChange_37_listener($event) {
      \u0275\u0275restoreView(_r2);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.newAsset.assignedToEmail, $event) || (ctx_r2.newAsset.assignedToEmail = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementStart(38, "option", 65);
    \u0275\u0275text(39, "Leave Unassigned");
    \u0275\u0275elementEnd();
    \u0275\u0275template(40, AssetManagementComponent_div_79_option_40_Template, 2, 2, "option", 66);
    \u0275\u0275elementEnd()();
    \u0275\u0275template(41, AssetManagementComponent_div_79_div_41_Template, 4, 1, "div", 67);
    \u0275\u0275elementStart(42, "button", 68)(43, "span", 69);
    \u0275\u0275text(44, "add");
    \u0275\u0275elementEnd();
    \u0275\u0275text(45, " Register Asset ");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(9);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.newAsset.assetName);
    \u0275\u0275advance(5);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.newAsset.category);
    \u0275\u0275advance(10);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.newAsset.serialNumber);
    \u0275\u0275advance(5);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.newAsset.purchaseCost);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.newAsset.depreciationRate);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.newAsset.assignedToEmail);
    \u0275\u0275advance(3);
    \u0275\u0275property("ngForOf", ctx_r2.employeesList);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r2.formError);
  }
}
var AssetManagementComponent = class _AssetManagementComponent {
  authService = inject(AuthService);
  http = inject(HttpClient);
  tenantName = "Capgemini India";
  isHRAdmin = false;
  activeFilter = "ALL";
  assets = [];
  employeesList = [
    { id: "1", name: "Rajesh Kumar", email: "rajesh.kumar@capgemini-in.com" },
    { id: "2", name: "Amit Sharma", email: "amit.sharma@capgemini-in.com" },
    { id: "3", name: "Priya Patel", email: "priya.patel@capgemini-in.com" },
    { id: "4", name: "Sarah Connor", email: "sarah.connor@capgemini-us.com" },
    { id: "5", name: "John Doe", email: "john.doe@capgemini-us.com" }
  ];
  // Form binds
  newAsset = {
    assetName: "",
    category: "Hardware",
    serialNumber: "",
    purchaseCost: 0,
    depreciationRate: 20,
    assignedToEmail: ""
  };
  // Sim Tool binds
  simCost = 1500;
  simRate = 20;
  simAge = 2;
  simValue = 900;
  formError = "";
  ngOnInit() {
    const user = this.authService.currentUser();
    this.isHRAdmin = this.authService.hasRole(["HR", "SuperAdmin"]);
    if (user?.tenantId === "7f04c0cf-031e-450f-a189-e1fca9473fa7") {
      this.tenantName = "Capgemini USA";
    } else {
      this.tenantName = "Capgemini India";
    }
    this.loadAssets();
    this.runSim();
  }
  getYourAssetsCount() {
    const user = this.authService.currentUser();
    if (!user)
      return 0;
    return this.assets.filter((a) => a.assignedToEmail === user.email).length;
  }
  getRepairCount() {
    return this.assets.filter((a) => a.status === "UnderRepair").length;
  }
  getTotalBookValue() {
    return this.assets.reduce((sum, a) => sum + a.currentValue, 0);
  }
  loadAssets() {
    const user = this.authService.currentUser();
    if (!user)
      return;
    const storageKey = `assets_registry_${user.tenantId}`;
    const rawAssets = localStorage.getItem(storageKey);
    if (rawAssets) {
      this.assets = JSON.parse(rawAssets);
    } else {
      this.assets = [
        {
          id: "ast-1",
          assetCode: "AST-IN-5100",
          assetName: 'MacBook Pro 16" (M3 Max, 64GB)',
          category: "Hardware",
          serialNumber: "C02F239HG021",
          status: "Assigned",
          assignedToEmail: "rajesh.kumar@capgemini-in.com",
          assignedToName: "Rajesh Kumar",
          purchaseDate: "2025-01-10",
          purchaseCost: 3499,
          currentValue: 2799,
          depreciationRate: 20
        },
        {
          id: "ast-2",
          assetCode: "AST-IN-5101",
          assetName: 'Dell UltraSharp 32" 4K Monitor',
          category: "Hardware",
          serialNumber: "CN-0DF293-19283",
          status: "Assigned",
          assignedToEmail: "priya.patel@capgemini-in.com",
          assignedToName: "Priya Patel",
          purchaseDate: "2024-05-15",
          purchaseCost: 899,
          currentValue: 539,
          depreciationRate: 20
        },
        {
          id: "ast-3",
          assetCode: "AST-IN-8201",
          assetName: "IntelliJ IDEA Ultimate Yearly License",
          category: "License",
          serialNumber: "LIC-INT-99231",
          status: "Assigned",
          assignedToEmail: "rajesh.kumar@capgemini-in.com",
          assignedToName: "Rajesh Kumar",
          purchaseDate: "2026-03-01",
          purchaseCost: 499,
          currentValue: 499,
          depreciationRate: 0
        },
        {
          id: "ast-4",
          assetCode: "AST-US-1002",
          assetName: "ThinkPad T14s Gen 4 (AMD, 32GB)",
          category: "Hardware",
          serialNumber: "PC-2938HG92",
          status: "Assigned",
          assignedToEmail: "sarah.connor@capgemini-us.com",
          assignedToName: "Sarah Connor",
          purchaseDate: "2025-06-20",
          purchaseCost: 1699,
          currentValue: 1359,
          depreciationRate: 20
        },
        {
          id: "ast-5",
          assetCode: "AST-IN-9100",
          assetName: "Ergonomic Mesh Swivel Chair",
          category: "Furniture",
          serialNumber: "FUR-CH-882",
          status: "Available",
          purchaseDate: "2023-11-12",
          purchaseCost: 350,
          currentValue: 140,
          depreciationRate: 15
        }
      ];
      const tenantPrefix = user.tenantId === "7f04c0cf-031e-450f-a189-e1fca9473fa7" ? "AST-US" : "AST-IN";
      this.assets = this.assets.filter((a) => a.assetCode.startsWith(tenantPrefix));
      localStorage.setItem(storageKey, JSON.stringify(this.assets));
    }
  }
  setFilter(filter) {
    this.activeFilter = filter;
  }
  getFilteredAssets() {
    const user = this.authService.currentUser();
    if (!user)
      return [];
    if (this.activeFilter === "MINE") {
      return this.assets.filter((a) => a.assignedToEmail === user.email);
    } else if (this.activeFilter === "ALL") {
      return this.assets;
    } else {
      return this.assets.filter((a) => a.category === this.activeFilter);
    }
  }
  runSim() {
    const deprAmount = this.simCost * (this.simRate / 100) * this.simAge;
    this.simValue = Math.max(0, this.simCost - deprAmount);
  }
  registerAsset() {
    this.formError = "";
    const user = this.authService.currentUser();
    if (!user)
      return;
    const { assetName, category, serialNumber, purchaseCost, depreciationRate, assignedToEmail } = this.newAsset;
    if (!assetName || !serialNumber || !purchaseCost) {
      this.formError = "Please fill out all required fields.";
      return;
    }
    const tenantPrefix = user.tenantId === "7f04c0cf-031e-450f-a189-e1fca9473fa7" ? "AST-US" : "AST-IN";
    const nextCodeNum = 5e3 + this.assets.length + 1;
    const assetCode = `${tenantPrefix}-${nextCodeNum}`;
    let assignedToName = void 0;
    if (assignedToEmail) {
      const match = this.employeesList.find((e) => e.email === assignedToEmail);
      if (match)
        assignedToName = match.name;
    }
    const newAssetItem = {
      id: "ast-" + Date.now(),
      assetCode,
      assetName,
      category,
      serialNumber,
      status: assignedToEmail ? "Assigned" : "Available",
      assignedToEmail,
      assignedToName,
      purchaseDate: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
      purchaseCost,
      currentValue: purchaseCost,
      // new asset has full cost value
      depreciationRate: depreciationRate || 20
    };
    this.assets.unshift(newAssetItem);
    const storageKey = `assets_registry_${user.tenantId}`;
    localStorage.setItem(storageKey, JSON.stringify(this.assets));
    this.newAsset = {
      assetName: "",
      category: "Hardware",
      serialNumber: "",
      purchaseCost: 0,
      depreciationRate: 20,
      assignedToEmail: ""
    };
    this.loadAssets();
  }
  static \u0275fac = function AssetManagementComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _AssetManagementComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AssetManagementComponent, selectors: [["app-asset-management"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 80, vars: 26, consts: [[1, "space-y-8", "animate-fade-in", "text-slate-100"], [1, "flex", "flex-col", "md:flex-row", "md:items-center", "md:justify-between", "gap-4"], [1, "text-2xl", "font-bold", "tracking-tight", "text-white", "flex", "items-center", "gap-2"], [1, "material-icons", "text-brand-400"], [1, "text-xs", "text-slate-400", "mt-0.5"], [1, "flex", "items-center", "gap-2", "bg-slate-900/60", "border", "border-slate-800", "px-3.5", "py-2", "rounded-xl"], [1, "w-2", "h-2", "rounded-full", "bg-indigo-500", "animate-pulse"], [1, "text-[10px]", "font-semibold", "text-slate-300", "uppercase", "tracking-wider"], [1, "grid", "grid-cols-2", "md:grid-cols-4", "gap-4"], [1, "bg-slate-950/40", "border", "border-slate-800/80", "p-4.5", "rounded-2xl"], [1, "text-[9px]", "text-slate-500", "font-bold", "uppercase", "tracking-wider", "mb-1"], [1, "text-xl", "font-bold", "text-white"], [1, "text-xl", "font-bold", "text-brand-400"], [1, "text-xl", "font-bold", "text-emerald-400"], [1, "text-xl", "font-bold", "text-amber-500"], [1, "grid", "grid-cols-1", "lg:grid-cols-12", "gap-8"], [1, "lg:col-span-8", "space-y-6"], [1, "bg-slate-950/40", "border", "border-slate-800", "p-2", "rounded-xl", "flex", "items-center", "justify-between"], [1, "flex", "items-center", "gap-1.5"], [1, "px-3.5", "py-1.5", "rounded-lg", "text-xs", "font-bold", "text-slate-300", "hover:bg-slate-900", "transition", 3, "click"], [1, "text-[10px]", "text-slate-500", "font-semibold", "px-3"], [1, "grid", "grid-cols-1", "sm:grid-cols-2", "gap-6"], ["class", "glass-card p-5 border-slate-800/80 hover:border-slate-700/80 relative overflow-hidden group transition duration-300 flex flex-col justify-between min-h-[220px]", 4, "ngFor", "ngForOf"], [1, "lg:col-span-4", "space-y-6"], [1, "glass-card", "p-6"], [1, "text-sm", "font-bold", "text-white", "mb-3.5", "flex", "items-center", "gap-2"], [1, "text-[10px]", "text-slate-400", "leading-relaxed", "mb-4"], [1, "space-y-3"], [1, "block", "text-[9px]", "font-bold", "text-slate-400", "uppercase", "mb-1"], ["type", "number", 1, "w-full", "bg-slate-950", "border", "border-slate-800", "text-xs", "text-slate-200", "rounded-lg", "px-3", "py-2", "outline-none", 3, "ngModelChange", "input", "ngModel"], [1, "grid", "grid-cols-2", "gap-3"], [1, "mt-4", "pt-3.5", "border-t", "border-slate-800", "flex", "items-center", "justify-between", "text-xs"], [1, "text-slate-400"], [1, "font-extrabold", "text-emerald-400"], ["class", "glass-card p-6 border-indigo-500/20 bg-gradient-to-br from-slate-900/90 to-slate-950/95", 4, "ngIf"], [1, "glass-card", "p-5", "border-slate-800/80", "hover:border-slate-700/80", "relative", "overflow-hidden", "group", "transition", "duration-300", "flex", "flex-col", "justify-between", "min-h-[220px]"], [1, "flex", "justify-between", "items-start", "mb-3.5"], [1, "space-y-0.5"], [1, "text-[10px]", "font-mono", "text-slate-500", "font-semibold", "uppercase", "tracking-wider"], [1, "text-xs", "font-bold", "text-slate-200"], [1, "px-2", "py-0.5", "rounded-full", "text-[8px]", "font-extrabold", "uppercase", "tracking-wide", "border", 3, "ngClass"], [1, "space-y-2", "mt-4"], [1, "flex", "justify-between", "text-[11px]"], [1, "text-slate-500"], [1, "font-mono", "text-slate-300"], [1, "text-slate-300"], [1, "font-bold", "text-emerald-400"], [1, "text-[9px]", "text-slate-500", "font-normal"], [1, "mt-4", "pt-3.5", "border-t", "border-slate-800/80", "flex", "items-center", "justify-between", "gap-2", "text-[10px]", "text-slate-400"], [1, "flex", "items-center", "gap-1"], [1, "material-icons", "text-xs", "text-slate-500"], [1, "text-[9px]", "text-slate-500", "italic"], [1, "glass-card", "p-6", "border-indigo-500/20", "bg-gradient-to-br", "from-slate-900/90", "to-slate-950/95"], [1, "text-sm", "font-bold", "text-white", "mb-4", "flex", "items-center", "gap-2"], [1, "material-icons", "text-indigo-400"], [1, "space-y-3.5", 3, "submit"], ["type", "text", "name", "assetName", 1, "w-full", "bg-slate-950", "border", "border-slate-800", "text-xs", "text-slate-200", "rounded-lg", "px-3", "py-2", "outline-none", "focus:border-brand-500", 3, "ngModelChange", "ngModel"], ["name", "category", 1, "w-full", "bg-slate-950", "border", "border-slate-800", "text-xs", "text-slate-200", "rounded-lg", "px-2", "py-2", "outline-none", 3, "ngModelChange", "ngModel"], ["value", "Hardware"], ["value", "License"], ["value", "Furniture"], ["type", "text", "name", "serialNumber", 1, "w-full", "bg-slate-950", "border", "border-slate-800", "text-xs", "text-slate-200", "rounded-lg", "px-3", "py-2", "outline-none", 3, "ngModelChange", "ngModel"], ["type", "number", "name", "purchaseCost", 1, "w-full", "bg-slate-950", "border", "border-slate-800", "text-xs", "text-slate-200", "rounded-lg", "px-3", "py-2", "outline-none", 3, "ngModelChange", "ngModel"], ["type", "number", "name", "depreciationRate", 1, "w-full", "bg-slate-950", "border", "border-slate-800", "text-xs", "text-slate-200", "rounded-lg", "px-3", "py-2", "outline-none", 3, "ngModelChange", "ngModel"], ["name", "assignedToEmail", 1, "w-full", "bg-slate-950", "border", "border-slate-800", "text-xs", "text-slate-200", "rounded-lg", "px-3", "py-2", "outline-none", 3, "ngModelChange", "ngModel"], ["value", ""], [3, "value", 4, "ngFor", "ngForOf"], ["class", "bg-rose-500/10 border border-rose-500/20 p-2.5 rounded-lg text-[10px] text-rose-400 flex items-center gap-1.5", 4, "ngIf"], ["type", "submit", 1, "w-full", "bg-brand-600", "hover:bg-brand-500", "text-white", "rounded-lg", "py-2.5", "text-xs", "font-bold", "transition", "flex", "items-center", "justify-center", "gap-1"], [1, "material-icons", "text-sm"], [3, "value"], [1, "bg-rose-500/10", "border", "border-rose-500/20", "p-2.5", "rounded-lg", "text-[10px]", "text-rose-400", "flex", "items-center", "gap-1.5"], [1, "material-icons", "text-xs"]], template: function AssetManagementComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div")(3, "h1", 2)(4, "span", 3);
      \u0275\u0275text(5, "devices");
      \u0275\u0275elementEnd();
      \u0275\u0275text(6, " Asset Tracking & Registry ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(7, "p", 4);
      \u0275\u0275text(8, "Manage enterprise hardware, software licenses, equipment allocation, and automatic depreciation schedules.");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(9, "div", 5);
      \u0275\u0275element(10, "span", 6);
      \u0275\u0275elementStart(11, "span", 7);
      \u0275\u0275text(12);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(13, "div", 8)(14, "div", 9)(15, "div", 10);
      \u0275\u0275text(16, "Total Assets");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(17, "div", 11);
      \u0275\u0275text(18);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(19, "div", 9)(20, "div", 10);
      \u0275\u0275text(21, "Your Assigned Assets");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(22, "div", 12);
      \u0275\u0275text(23);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(24, "div", 9)(25, "div", 10);
      \u0275\u0275text(26, "Total Book Value");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(27, "div", 13);
      \u0275\u0275text(28);
      \u0275\u0275pipe(29, "number");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(30, "div", 9)(31, "div", 10);
      \u0275\u0275text(32, "Under Repair");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(33, "div", 14);
      \u0275\u0275text(34);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(35, "div", 15)(36, "div", 16)(37, "div", 17)(38, "div", 18)(39, "button", 19);
      \u0275\u0275listener("click", function AssetManagementComponent_Template_button_click_39_listener() {
        return ctx.setFilter("ALL");
      });
      \u0275\u0275text(40, " All Registry ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(41, "button", 19);
      \u0275\u0275listener("click", function AssetManagementComponent_Template_button_click_41_listener() {
        return ctx.setFilter("MINE");
      });
      \u0275\u0275text(42, " Your Hardware ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(43, "button", 19);
      \u0275\u0275listener("click", function AssetManagementComponent_Template_button_click_43_listener() {
        return ctx.setFilter("Hardware");
      });
      \u0275\u0275text(44, " Devices ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(45, "button", 19);
      \u0275\u0275listener("click", function AssetManagementComponent_Template_button_click_45_listener() {
        return ctx.setFilter("License");
      });
      \u0275\u0275text(46, " Software Licenses ");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(47, "span", 20);
      \u0275\u0275text(48);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(49, "div", 21);
      \u0275\u0275template(50, AssetManagementComponent_div_50_Template, 37, 18, "div", 22);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(51, "div", 23)(52, "div", 24)(53, "h2", 25)(54, "span", 3);
      \u0275\u0275text(55, "trending_down");
      \u0275\u0275elementEnd();
      \u0275\u0275text(56, " Value Depreciation Tool ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(57, "p", 26);
      \u0275\u0275text(58, " Enter details below to compute straight-line depreciation value curves over 5 years. ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(59, "div", 27)(60, "div")(61, "label", 28);
      \u0275\u0275text(62, "Purchase Cost ($)");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(63, "input", 29);
      \u0275\u0275twoWayListener("ngModelChange", function AssetManagementComponent_Template_input_ngModelChange_63_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.simCost, $event) || (ctx.simCost = $event);
        return $event;
      });
      \u0275\u0275listener("input", function AssetManagementComponent_Template_input_input_63_listener() {
        return ctx.runSim();
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(64, "div", 30)(65, "div")(66, "label", 28);
      \u0275\u0275text(67, "Depr. Rate (%)");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(68, "input", 29);
      \u0275\u0275twoWayListener("ngModelChange", function AssetManagementComponent_Template_input_ngModelChange_68_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.simRate, $event) || (ctx.simRate = $event);
        return $event;
      });
      \u0275\u0275listener("input", function AssetManagementComponent_Template_input_input_68_listener() {
        return ctx.runSim();
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(69, "div")(70, "label", 28);
      \u0275\u0275text(71, "Age (Years)");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(72, "input", 29);
      \u0275\u0275twoWayListener("ngModelChange", function AssetManagementComponent_Template_input_ngModelChange_72_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.simAge, $event) || (ctx.simAge = $event);
        return $event;
      });
      \u0275\u0275listener("input", function AssetManagementComponent_Template_input_input_72_listener() {
        return ctx.runSim();
      });
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(73, "div", 31)(74, "span", 32);
      \u0275\u0275text(75, "Depreciated Value:");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(76, "span", 33);
      \u0275\u0275text(77);
      \u0275\u0275pipe(78, "number");
      \u0275\u0275elementEnd()()()();
      \u0275\u0275template(79, AssetManagementComponent_div_79_Template, 46, 8, "div", 34);
      \u0275\u0275elementEnd()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(12);
      \u0275\u0275textInterpolate1("Tenant Schema: ", ctx.tenantName, "");
      \u0275\u0275advance(6);
      \u0275\u0275textInterpolate(ctx.assets.length);
      \u0275\u0275advance(5);
      \u0275\u0275textInterpolate(ctx.getYourAssetsCount());
      \u0275\u0275advance(5);
      \u0275\u0275textInterpolate1("$", \u0275\u0275pipeBind2(29, 20, ctx.getTotalBookValue(), "1.0-0"), "");
      \u0275\u0275advance(6);
      \u0275\u0275textInterpolate(ctx.getRepairCount());
      \u0275\u0275advance(5);
      \u0275\u0275classProp("bg-slate-800", ctx.activeFilter === "ALL");
      \u0275\u0275advance(2);
      \u0275\u0275classProp("bg-slate-800", ctx.activeFilter === "MINE");
      \u0275\u0275advance(2);
      \u0275\u0275classProp("bg-slate-800", ctx.activeFilter === "Hardware");
      \u0275\u0275advance(2);
      \u0275\u0275classProp("bg-slate-800", ctx.activeFilter === "License");
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate1("", ctx.getFilteredAssets().length, " items found");
      \u0275\u0275advance(2);
      \u0275\u0275property("ngForOf", ctx.getFilteredAssets());
      \u0275\u0275advance(13);
      \u0275\u0275twoWayProperty("ngModel", ctx.simCost);
      \u0275\u0275advance(5);
      \u0275\u0275twoWayProperty("ngModel", ctx.simRate);
      \u0275\u0275advance(4);
      \u0275\u0275twoWayProperty("ngModel", ctx.simAge);
      \u0275\u0275advance(5);
      \u0275\u0275textInterpolate1("$", \u0275\u0275pipeBind2(78, 23, ctx.simValue, "1.2-2"), "");
      \u0275\u0275advance(2);
      \u0275\u0275property("ngIf", ctx.isHRAdmin);
    }
  }, dependencies: [CommonModule, NgClass, NgForOf, NgIf, DecimalPipe, FormsModule, \u0275NgNoValidate, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, NumberValueAccessor, SelectControlValueAccessor, NgControlStatus, NgControlStatusGroup, NgModel, NgForm], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AssetManagementComponent, { className: "AssetManagementComponent", filePath: "src\\app\\features\\assets\\asset-management.component.ts", lineNumber: 254 });
})();
export {
  AssetManagementComponent
};
//# sourceMappingURL=chunk-QJXGZNDN.js.map
