import {
  DefaultValueAccessor,
  FormBuilder,
  FormControlName,
  FormGroupDirective,
  MinValidator,
  NgControlStatus,
  NgControlStatusGroup,
  NumberValueAccessor,
  RadioControlValueAccessor,
  ReactiveFormsModule,
  TransactionService,
  Validators,
  ɵNgNoValidate
} from "./chunk-TMZE5UV2.js";
import {
  ActivatedRoute,
  CommonModule,
  Component,
  NgIf,
  Router,
  __spreadProps,
  __spreadValues,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵclassProp,
  ɵɵdefineComponent,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
} from "./chunk-GZCXJUS6.js";

// src/app/features/transaction-form/transaction-form.component.ts
function TransactionFormComponent_div_10_div_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 33);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("\u26A0\uFE0F ", ctx_r1.errorMessage, "");
  }
}
function TransactionFormComponent_div_10_span_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 34);
    \u0275\u0275text(1, "Date is required.");
    \u0275\u0275elementEnd();
  }
}
function TransactionFormComponent_div_10_span_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 34);
    \u0275\u0275text(1, "Description is required.");
    \u0275\u0275elementEnd();
  }
}
function TransactionFormComponent_div_10_span_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 34);
    \u0275\u0275text(1, "Max 255 characters.");
    \u0275\u0275elementEnd();
  }
}
function TransactionFormComponent_div_10_span_33_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 34);
    \u0275\u0275text(1, "Amount is required.");
    \u0275\u0275elementEnd();
  }
}
function TransactionFormComponent_div_10_span_34_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 34);
    \u0275\u0275text(1, "Amount must be greater than 0.");
    \u0275\u0275elementEnd();
  }
}
function TransactionFormComponent_div_10_span_39_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 34);
    \u0275\u0275text(1, "Balance is required.");
    \u0275\u0275elementEnd();
  }
}
function TransactionFormComponent_div_10_span_44_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1, "Saving\u2026");
    \u0275\u0275elementEnd();
  }
}
function TransactionFormComponent_div_10_span_45_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.isEditMode ? "Update Transaction" : "Add Transaction");
  }
}
function TransactionFormComponent_div_10_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 8);
    \u0275\u0275template(1, TransactionFormComponent_div_10_div_1_Template, 2, 1, "div", 9);
    \u0275\u0275elementStart(2, "form", 10);
    \u0275\u0275listener("ngSubmit", function TransactionFormComponent_div_10_Template_form_ngSubmit_2_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onSubmit());
    });
    \u0275\u0275elementStart(3, "div", 11)(4, "label", 12);
    \u0275\u0275text(5, "Date *");
    \u0275\u0275elementEnd();
    \u0275\u0275element(6, "input", 13);
    \u0275\u0275template(7, TransactionFormComponent_div_10_span_7_Template, 2, 0, "span", 14);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "div", 11)(9, "label", 15);
    \u0275\u0275text(10, "Description *");
    \u0275\u0275elementEnd();
    \u0275\u0275element(11, "input", 16);
    \u0275\u0275template(12, TransactionFormComponent_div_10_span_12_Template, 2, 0, "span", 14)(13, TransactionFormComponent_div_10_span_13_Template, 2, 0, "span", 14);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "div", 11)(15, "label", 17);
    \u0275\u0275text(16, "Transaction Type *");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "div", 18)(18, "label", 19);
    \u0275\u0275element(19, "input", 20);
    \u0275\u0275elementStart(20, "span", 21);
    \u0275\u0275text(21, "Credit");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(22, "label", 19);
    \u0275\u0275element(23, "input", 20);
    \u0275\u0275elementStart(24, "span", 22);
    \u0275\u0275text(25, "Debit");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(26, "div", 11)(27, "label", 23);
    \u0275\u0275text(28, "Amount ($) *");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(29, "div", 24)(30, "span", 25);
    \u0275\u0275text(31, "$");
    \u0275\u0275elementEnd();
    \u0275\u0275element(32, "input", 26);
    \u0275\u0275elementEnd();
    \u0275\u0275template(33, TransactionFormComponent_div_10_span_33_Template, 2, 0, "span", 14)(34, TransactionFormComponent_div_10_span_34_Template, 2, 0, "span", 14);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(35, "div", 11)(36, "label", 27);
    \u0275\u0275text(37, "Balance *");
    \u0275\u0275elementEnd();
    \u0275\u0275element(38, "input", 28);
    \u0275\u0275template(39, TransactionFormComponent_div_10_span_39_Template, 2, 0, "span", 14);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(40, "div", 29)(41, "button", 30);
    \u0275\u0275listener("click", function TransactionFormComponent_div_10_Template_button_click_41_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onCancel());
    });
    \u0275\u0275text(42, " Cancel ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(43, "button", 31);
    \u0275\u0275template(44, TransactionFormComponent_div_10_span_44_Template, 2, 0, "span", 32)(45, TransactionFormComponent_div_10_span_45_Template, 2, 1, "span", 32);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    let tmp_9_0;
    let tmp_11_0;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.errorMessage);
    \u0275\u0275advance();
    \u0275\u0275property("formGroup", ctx_r1.form);
    \u0275\u0275advance();
    \u0275\u0275classProp("form-field--error", ctx_r1.submitted && ctx_r1.f["date"].errors);
    \u0275\u0275advance(4);
    \u0275\u0275property("ngIf", ctx_r1.submitted && (ctx_r1.f["date"].errors == null ? null : ctx_r1.f["date"].errors["required"]));
    \u0275\u0275advance();
    \u0275\u0275classProp("form-field--error", ctx_r1.submitted && ctx_r1.f["description"].errors);
    \u0275\u0275advance(4);
    \u0275\u0275property("ngIf", ctx_r1.submitted && (ctx_r1.f["description"].errors == null ? null : ctx_r1.f["description"].errors["required"]));
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.submitted && (ctx_r1.f["description"].errors == null ? null : ctx_r1.f["description"].errors["maxlength"]));
    \u0275\u0275advance();
    \u0275\u0275classProp("form-field--error", ctx_r1.submitted && ctx_r1.f["type"].errors);
    \u0275\u0275advance(4);
    \u0275\u0275classProp("radio-option--selected", ((tmp_9_0 = ctx_r1.form.get("type")) == null ? null : tmp_9_0.value) === 0);
    \u0275\u0275advance();
    \u0275\u0275property("value", 0);
    \u0275\u0275advance(3);
    \u0275\u0275classProp("radio-option--selected", ((tmp_11_0 = ctx_r1.form.get("type")) == null ? null : tmp_11_0.value) === 1);
    \u0275\u0275advance();
    \u0275\u0275property("value", 1);
    \u0275\u0275advance(3);
    \u0275\u0275classProp("form-field--error", ctx_r1.submitted && ctx_r1.f["amount"].errors);
    \u0275\u0275advance(7);
    \u0275\u0275property("ngIf", ctx_r1.submitted && (ctx_r1.f["amount"].errors == null ? null : ctx_r1.f["amount"].errors["required"]));
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.submitted && (ctx_r1.f["amount"].errors == null ? null : ctx_r1.f["amount"].errors["min"]));
    \u0275\u0275advance();
    \u0275\u0275classProp("form-field--error", ctx_r1.submitted && ctx_r1.f["balance"].errors);
    \u0275\u0275advance(4);
    \u0275\u0275property("ngIf", ctx_r1.submitted && (ctx_r1.f["balance"].errors == null ? null : ctx_r1.f["balance"].errors["required"]));
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r1.isSaving);
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r1.isSaving);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.isSaving);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx_r1.isSaving);
  }
}
function TransactionFormComponent_div_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 35);
    \u0275\u0275element(1, "div", 36);
    \u0275\u0275elementStart(2, "p");
    \u0275\u0275text(3, "Loading transaction\u2026");
    \u0275\u0275elementEnd()();
  }
}
var TransactionFormComponent = class _TransactionFormComponent {
  constructor(fb, route, router, txService) {
    this.fb = fb;
    this.route = route;
    this.router = router;
    this.txService = txService;
    this.isEditMode = false;
    this.transactionId = null;
    this.isLoading = false;
    this.isSaving = false;
    this.errorMessage = null;
    this.submitted = false;
  }
  ngOnInit() {
    this.buildForm();
    const id = this.route.snapshot.paramMap.get("id");
    if (id) {
      this.isEditMode = true;
      this.transactionId = +id;
      this.loadTransaction(this.transactionId);
    }
  }
  buildForm() {
    this.form = this.fb.group({
      date: ["", Validators.required],
      description: ["", [Validators.required, Validators.maxLength(255)]],
      type: [0, Validators.required],
      amount: [null, [Validators.required, Validators.min(0.01)]],
      balance: ["", Validators.required]
    });
  }
  loadTransaction(id) {
    this.isLoading = true;
    this.txService.getTransactionById(id).subscribe({
      next: (tx) => {
        this.form.patchValue(tx);
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = err.message;
        this.isLoading = false;
      }
    });
  }
  onSubmit() {
    this.submitted = true;
    if (this.form.invalid)
      return;
    this.isSaving = true;
    const payload = this.form.value;
    const request$ = this.isEditMode && this.transactionId ? this.txService.updateTransaction(this.transactionId, __spreadProps(__spreadValues({}, payload), { id: this.transactionId })) : this.txService.createTransaction(payload);
    request$.subscribe({
      next: () => {
        this.form.markAsPristine();
        this.router.navigate(["/transactions"]);
      },
      error: (err) => {
        this.errorMessage = err.message;
        this.isSaving = false;
      }
    });
  }
  onCancel() {
    this.router.navigate(["/transactions"]);
  }
  canDeactivate() {
    return this.form.pristine || this.submitted;
  }
  get f() {
    return this.form.controls;
  }
  static {
    this.\u0275fac = function TransactionFormComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _TransactionFormComponent)(\u0275\u0275directiveInject(FormBuilder), \u0275\u0275directiveInject(ActivatedRoute), \u0275\u0275directiveInject(Router), \u0275\u0275directiveInject(TransactionService));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _TransactionFormComponent, selectors: [["app-transaction-form"]], decls: 12, vars: 4, consts: [[1, "page"], [1, "page__header"], [1, "header__brand"], [1, "brand-logo"], [1, "header__title"], [1, "header__subtitle"], ["class", "form-card", 4, "ngIf"], ["class", "state-loading", 4, "ngIf"], [1, "form-card"], ["class", "state-error", 4, "ngIf"], ["novalidate", "", 3, "ngSubmit", "formGroup"], [1, "form-field"], ["for", "date", 1, "form-label"], ["id", "date", "type", "date", "formControlName", "date", 1, "form-input"], ["class", "form-error", 4, "ngIf"], ["for", "description", 1, "form-label"], ["id", "description", "type", "text", "formControlName", "description", "placeholder", "e.g. HACKERBANK INC. DES:CCD+ ID:...", 1, "form-input"], [1, "form-label"], [1, "radio-group"], [1, "radio-option"], ["type", "radio", "formControlName", "type", 3, "value"], [1, "radio-label", "radio-label--credit"], [1, "radio-label", "radio-label--debit"], ["for", "amount", 1, "form-label"], [1, "input-prefix-wrap"], [1, "input-prefix"], ["id", "amount", "type", "number", "step", "0.01", "min", "0.01", "formControlName", "amount", "placeholder", "0.00", 1, "form-input", "form-input--prefixed"], ["for", "balance", 1, "form-label"], ["id", "balance", "type", "text", "formControlName", "balance", "placeholder", "e.g. $12,234.45", 1, "form-input"], [1, "form-actions"], ["type", "button", 1, "btn", "btn--ghost", 3, "click", "disabled"], ["type", "submit", 1, "btn", "btn--primary", 3, "disabled"], [4, "ngIf"], [1, "state-error"], [1, "form-error"], [1, "state-loading"], [1, "spinner"]], template: function TransactionFormComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "header", 1)(2, "div", 2)(3, "div", 3);
        \u0275\u0275text(4, "\u{1F4B3}");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(5, "div")(6, "h1", 4);
        \u0275\u0275text(7);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(8, "p", 5);
        \u0275\u0275text(9);
        \u0275\u0275elementEnd()()()();
        \u0275\u0275template(10, TransactionFormComponent_div_10_Template, 46, 28, "div", 6)(11, TransactionFormComponent_div_11_Template, 4, 0, "div", 7);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        \u0275\u0275advance(7);
        \u0275\u0275textInterpolate(ctx.isEditMode ? "Edit Transaction" : "Add Transaction");
        \u0275\u0275advance(2);
        \u0275\u0275textInterpolate(ctx.isEditMode ? "Update the transaction details below" : "Fill in the details for the new transaction");
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", !ctx.isLoading);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.isLoading);
      }
    }, dependencies: [CommonModule, NgIf, ReactiveFormsModule, \u0275NgNoValidate, DefaultValueAccessor, NumberValueAccessor, RadioControlValueAccessor, NgControlStatus, NgControlStatusGroup, MinValidator, FormGroupDirective, FormControlName], encapsulation: 2 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TransactionFormComponent, [{
    type: Component,
    args: [{ selector: "app-transaction-form", standalone: true, imports: [CommonModule, ReactiveFormsModule], template: `<div class="page">
  <header class="page__header">
    <div class="header__brand">
      <div class="brand-logo">\u{1F4B3}</div>
      <div>
        <h1 class="header__title">{{ isEditMode ? 'Edit Transaction' : 'Add Transaction' }}</h1>
        <p class="header__subtitle">{{ isEditMode ? 'Update the transaction details below' : 'Fill in the details for the new transaction' }}</p>
      </div>
    </div>
  </header>

  <div class="form-card" *ngIf="!isLoading">
    <div class="state-error" *ngIf="errorMessage">\u26A0\uFE0F {{ errorMessage }}</div>

    <form [formGroup]="form" (ngSubmit)="onSubmit()" novalidate>
      <!-- Date -->
      <div class="form-field" [class.form-field--error]="submitted && f['date'].errors">
        <label class="form-label" for="date">Date *</label>
        <input id="date" type="date" class="form-input" formControlName="date" />
        <span class="form-error" *ngIf="submitted && f['date'].errors?.['required']">Date is required.</span>
      </div>

      <!-- Description -->
      <div class="form-field" [class.form-field--error]="submitted && f['description'].errors">
        <label class="form-label" for="description">Description *</label>
        <input id="description" type="text" class="form-input" formControlName="description"
               placeholder="e.g. HACKERBANK INC. DES:CCD+ ID:..." />
        <span class="form-error" *ngIf="submitted && f['description'].errors?.['required']">Description is required.</span>
        <span class="form-error" *ngIf="submitted && f['description'].errors?.['maxlength']">Max 255 characters.</span>
      </div>

      <!-- Type -->
      <div class="form-field" [class.form-field--error]="submitted && f['type'].errors">
        <label class="form-label">Transaction Type *</label>
        <div class="radio-group">
          <label class="radio-option" [class.radio-option--selected]="form.get('type')?.value === 0">
            <input type="radio" formControlName="type" [value]="0" />
            <span class="radio-label radio-label--credit">Credit</span>
          </label>
          <label class="radio-option" [class.radio-option--selected]="form.get('type')?.value === 1">
            <input type="radio" formControlName="type" [value]="1" />
            <span class="radio-label radio-label--debit">Debit</span>
          </label>
        </div>
      </div>

      <!-- Amount -->
      <div class="form-field" [class.form-field--error]="submitted && f['amount'].errors">
        <label class="form-label" for="amount">Amount ($) *</label>
        <div class="input-prefix-wrap">
          <span class="input-prefix">$</span>
          <input id="amount" type="number" step="0.01" min="0.01" class="form-input form-input--prefixed"
                 formControlName="amount" placeholder="0.00" />
        </div>
        <span class="form-error" *ngIf="submitted && f['amount'].errors?.['required']">Amount is required.</span>
        <span class="form-error" *ngIf="submitted && f['amount'].errors?.['min']">Amount must be greater than 0.</span>
      </div>

      <!-- Balance -->
      <div class="form-field" [class.form-field--error]="submitted && f['balance'].errors">
        <label class="form-label" for="balance">Balance *</label>
        <input id="balance" type="text" class="form-input" formControlName="balance"
               placeholder='e.g. $12,234.45' />
        <span class="form-error" *ngIf="submitted && f['balance'].errors?.['required']">Balance is required.</span>
      </div>

      <!-- Actions -->
      <div class="form-actions">
        <button type="button" class="btn btn--ghost" (click)="onCancel()" [disabled]="isSaving">
          Cancel
        </button>
        <button type="submit" class="btn btn--primary" [disabled]="isSaving">
          <span *ngIf="isSaving">Saving\u2026</span>
          <span *ngIf="!isSaving">{{ isEditMode ? 'Update Transaction' : 'Add Transaction' }}</span>
        </button>
      </div>
    </form>
  </div>

  <div class="state-loading" *ngIf="isLoading">
    <div class="spinner"></div>
    <p>Loading transaction\u2026</p>
  </div>
</div>
` }]
  }], () => [{ type: FormBuilder }, { type: ActivatedRoute }, { type: Router }, { type: TransactionService }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(TransactionFormComponent, { className: "TransactionFormComponent", filePath: "src/app/features/transaction-form/transaction-form.component.ts", lineNumber: 15 });
})();
export {
  TransactionFormComponent
};
//# sourceMappingURL=chunk-AXZB4HSM.js.map
