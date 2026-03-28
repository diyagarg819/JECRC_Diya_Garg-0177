import {
  Component,
  RouterOutlet,
  bootstrapApplication,
  catchError,
  provideHttpClient,
  provideRouter,
  provideZoneChangeDetection,
  setClassMetadata,
  throwError,
  withInterceptors,
  ɵsetClassDebugInfo,
  ɵɵdefineComponent,
  ɵɵelement
} from "./chunk-GZCXJUS6.js";

// src/app/core/guards/confirm-leave.guard.ts
var confirmLeaveGuard = (component) => {
  if (!component.canDeactivate || component.canDeactivate())
    return true;
  return window.confirm("You have unsaved changes. Are you sure you want to leave?");
};

// src/app/app.routes.ts
var routes = [
  {
    path: "",
    redirectTo: "transactions",
    pathMatch: "full"
  },
  {
    path: "transactions",
    loadComponent: () => import("./chunk-KJSHMLUK.js").then((m) => m.TransactionListComponent)
  },
  {
    path: "transactions/new",
    loadComponent: () => import("./chunk-AXZB4HSM.js").then((m) => m.TransactionFormComponent),
    canDeactivate: [confirmLeaveGuard]
  },
  {
    path: "transactions/:id/edit",
    loadComponent: () => import("./chunk-AXZB4HSM.js").then((m) => m.TransactionFormComponent),
    canDeactivate: [confirmLeaveGuard]
  },
  { path: "**", redirectTo: "transactions" }
];

// src/app/core/interceptors/error.interceptor.ts
var errorInterceptor = (req, next) => {
  return next(req).pipe(catchError((error) => {
    let message = "An unexpected error occurred.";
    if (error.status === 404)
      message = "Resource not found.";
    else if (error.status === 400)
      message = error.error?.message ?? "Invalid request.";
    else if (error.status === 500)
      message = "Server error. Please try again later.";
    console.error("[HTTP Error]", error.status, message);
    return throwError(() => new Error(message));
  }));
};

// src/app/app.config.ts
var appConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptors([errorInterceptor]))
  ]
};

// src/app/app.component.ts
var AppComponent = class _AppComponent {
  static {
    this.\u0275fac = function AppComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _AppComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AppComponent, selectors: [["app-root"]], decls: 1, vars: 0, template: function AppComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275element(0, "router-outlet");
      }
    }, dependencies: [RouterOutlet], encapsulation: 2 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AppComponent, [{
    type: Component,
    args: [{
      selector: "app-root",
      standalone: true,
      imports: [RouterOutlet],
      template: `<router-outlet />`
    }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AppComponent, { className: "AppComponent", filePath: "src/app/app.component.ts", lineNumber: 10 });
})();

// src/main.ts
bootstrapApplication(AppComponent, appConfig).catch(console.error);
//# sourceMappingURL=main.js.map
