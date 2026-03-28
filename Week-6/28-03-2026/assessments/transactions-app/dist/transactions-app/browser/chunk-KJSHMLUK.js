import {
  DefaultValueAccessor,
  FormsModule,
  NgControlStatus,
  NgModel,
  NgSelectOption,
  SelectControlValueAccessor,
  TransactionService,
  ɵNgSelectMultipleOption
} from "./chunk-TMZE5UV2.js";
import {
  CommonModule,
  Component,
  DecimalPipe,
  EventEmitter,
  Input,
  NgForOf,
  NgIf,
  Output,
  Router,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵNgOnChangesFeature,
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
  ɵɵpipe,
  ɵɵpipeBind2,
  ɵɵproperty,
  ɵɵreference,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtemplateRefExtractor,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-GZCXJUS6.js";

// src/app/features/filter-bar/filter-bar.component.ts
function FilterBarComponent_button_23_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 18);
    \u0275\u0275listener("click", function FilterBarComponent_button_23_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onClear());
    });
    \u0275\u0275text(1, "Clear");
    \u0275\u0275elementEnd();
  }
}
var FilterBarComponent = class _FilterBarComponent {
  constructor() {
    this.filterApplied = new EventEmitter();
    this.addClicked = new EventEmitter();
    this.selectedDate = "";
    this.selectedType = "";
    this.searchText = "";
  }
  get hasFilters() {
    return !!(this.selectedDate || this.selectedType !== "" || this.searchText);
  }
  onFilter() {
    const filter = {};
    if (this.selectedDate)
      filter.date = this.selectedDate;
    if (this.selectedType !== "")
      filter.type = Number(this.selectedType);
    if (this.searchText.trim())
      filter.search = this.searchText.trim();
    this.filterApplied.emit(filter);
  }
  onClear() {
    this.selectedDate = "";
    this.selectedType = "";
    this.searchText = "";
    this.filterApplied.emit(null);
  }
  onAdd() {
    this.addClicked.emit();
  }
  static {
    this.\u0275fac = function FilterBarComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _FilterBarComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _FilterBarComponent, selectors: [["app-filter-bar"]], outputs: { filterApplied: "filterApplied", addClicked: "addClicked" }, decls: 29, vars: 4, consts: [[1, "filter-bar"], [1, "filter-bar__left"], [1, "filter-group"], ["for", "dateInput", 1, "filter-label"], ["id", "dateInput", "type", "date", 1, "input-date", 3, "ngModelChange", "ngModel"], ["for", "typeSelect", 1, "filter-label"], ["id", "typeSelect", 1, "input-select", 3, "ngModelChange", "ngModel"], ["value", ""], ["value", "0"], ["value", "1"], ["for", "searchInput", 1, "filter-label"], ["id", "searchInput", "type", "text", "placeholder", "Description...", 1, "input-text", 3, "ngModelChange", "keydown.enter", "ngModel"], [1, "filter-actions"], [1, "btn", "btn--primary", 3, "click"], ["class", "btn btn--ghost", 3, "click", 4, "ngIf"], [1, "filter-bar__right"], [1, "btn", "btn--accent", 3, "click"], [1, "btn__icon"], [1, "btn", "btn--ghost", 3, "click"]], template: function FilterBarComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "label", 3);
        \u0275\u0275text(4, "Date");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(5, "input", 4);
        \u0275\u0275twoWayListener("ngModelChange", function FilterBarComponent_Template_input_ngModelChange_5_listener($event) {
          \u0275\u0275twoWayBindingSet(ctx.selectedDate, $event) || (ctx.selectedDate = $event);
          return $event;
        });
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(6, "div", 2)(7, "label", 5);
        \u0275\u0275text(8, "Type");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(9, "select", 6);
        \u0275\u0275twoWayListener("ngModelChange", function FilterBarComponent_Template_select_ngModelChange_9_listener($event) {
          \u0275\u0275twoWayBindingSet(ctx.selectedType, $event) || (ctx.selectedType = $event);
          return $event;
        });
        \u0275\u0275elementStart(10, "option", 7);
        \u0275\u0275text(11, "All");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(12, "option", 8);
        \u0275\u0275text(13, "Credit");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(14, "option", 9);
        \u0275\u0275text(15, "Debit");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(16, "div", 2)(17, "label", 10);
        \u0275\u0275text(18, "Search");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(19, "input", 11);
        \u0275\u0275twoWayListener("ngModelChange", function FilterBarComponent_Template_input_ngModelChange_19_listener($event) {
          \u0275\u0275twoWayBindingSet(ctx.searchText, $event) || (ctx.searchText = $event);
          return $event;
        });
        \u0275\u0275listener("keydown.enter", function FilterBarComponent_Template_input_keydown_enter_19_listener() {
          return ctx.onFilter();
        });
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(20, "div", 12)(21, "button", 13);
        \u0275\u0275listener("click", function FilterBarComponent_Template_button_click_21_listener() {
          return ctx.onFilter();
        });
        \u0275\u0275text(22, "Filter");
        \u0275\u0275elementEnd();
        \u0275\u0275template(23, FilterBarComponent_button_23_Template, 2, 0, "button", 14);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(24, "div", 15)(25, "button", 16);
        \u0275\u0275listener("click", function FilterBarComponent_Template_button_click_25_listener() {
          return ctx.onAdd();
        });
        \u0275\u0275elementStart(26, "span", 17);
        \u0275\u0275text(27, "+");
        \u0275\u0275elementEnd();
        \u0275\u0275text(28, " Add Transaction ");
        \u0275\u0275elementEnd()()();
      }
      if (rf & 2) {
        \u0275\u0275advance(5);
        \u0275\u0275twoWayProperty("ngModel", ctx.selectedDate);
        \u0275\u0275advance(4);
        \u0275\u0275twoWayProperty("ngModel", ctx.selectedType);
        \u0275\u0275advance(10);
        \u0275\u0275twoWayProperty("ngModel", ctx.searchText);
        \u0275\u0275advance(4);
        \u0275\u0275property("ngIf", ctx.hasFilters);
      }
    }, dependencies: [CommonModule, NgIf, FormsModule, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, SelectControlValueAccessor, NgControlStatus, NgModel], encapsulation: 2 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(FilterBarComponent, [{
    type: Component,
    args: [{ selector: "app-filter-bar", standalone: true, imports: [CommonModule, FormsModule], template: '<div class="filter-bar">\n  <div class="filter-bar__left">\n    <div class="filter-group">\n      <label for="dateInput" class="filter-label">Date</label>\n      <input\n        id="dateInput"\n        type="date"\n        class="input-date"\n        [(ngModel)]="selectedDate"\n      />\n    </div>\n\n    <div class="filter-group">\n      <label for="typeSelect" class="filter-label">Type</label>\n      <select id="typeSelect" class="input-select" [(ngModel)]="selectedType">\n        <option value="">All</option>\n        <option value="0">Credit</option>\n        <option value="1">Debit</option>\n      </select>\n    </div>\n\n    <div class="filter-group">\n      <label for="searchInput" class="filter-label">Search</label>\n      <input\n        id="searchInput"\n        type="text"\n        class="input-text"\n        placeholder="Description..."\n        [(ngModel)]="searchText"\n        (keydown.enter)="onFilter()"\n      />\n    </div>\n\n    <div class="filter-actions">\n      <button class="btn btn--primary" (click)="onFilter()">Filter</button>\n      <button class="btn btn--ghost" *ngIf="hasFilters" (click)="onClear()">Clear</button>\n    </div>\n  </div>\n\n  <div class="filter-bar__right">\n    <button class="btn btn--accent" (click)="onAdd()">\n      <span class="btn__icon">+</span>\n      Add Transaction\n    </button>\n  </div>\n</div>\n' }]
  }], null, { filterApplied: [{
    type: Output
  }], addClicked: [{
    type: Output
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(FilterBarComponent, { className: "FilterBarComponent", filePath: "src/app/features/filter-bar/filter-bar.component.ts", lineNumber: 17 });
})();

// src/app/features/transaction-table/transaction-table.component.ts
function TransactionTableComponent_table_1_tr_18_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tr")(1, "td", 4);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "td", 5);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "td", 6)(6, "span", 12);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "td", 13);
    \u0275\u0275text(9);
    \u0275\u0275pipe(10, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "td", 9);
    \u0275\u0275text(12);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "td", 10)(14, "div", 14)(15, "button", 15);
    \u0275\u0275listener("click", function TransactionTableComponent_table_1_tr_18_Template_button_click_15_listener() {
      const tx_r4 = \u0275\u0275restoreView(_r3).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.onEdit(tx_r4));
    });
    \u0275\u0275text(16, "\u270F\uFE0F");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "button", 16);
    \u0275\u0275listener("click", function TransactionTableComponent_table_1_tr_18_Template_button_click_17_listener() {
      const tx_r4 = \u0275\u0275restoreView(_r3).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.onDelete(tx_r4));
    });
    \u0275\u0275text(18, "\u{1F5D1}\uFE0F");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const tx_r4 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275classProp("row--credit", tx_r4.type === 0)("row--debit", tx_r4.type === 1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(tx_r4.date);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(tx_r4.description);
    \u0275\u0275advance(2);
    \u0275\u0275classProp("badge--credit", tx_r4.type === 0)("badge--debit", tx_r4.type === 1);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.getTypeLabel(tx_r4.type), " ");
    \u0275\u0275advance();
    \u0275\u0275classProp("amount--credit", tx_r4.type === 0)("amount--debit", tx_r4.type === 1);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(10, 17, tx_r4.amount, "1.2-2"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(tx_r4.balance);
  }
}
function TransactionTableComponent_table_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "table", 3)(1, "thead")(2, "tr")(3, "th", 4);
    \u0275\u0275text(4, "Date");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "th", 5);
    \u0275\u0275text(6, "Description");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "th", 6);
    \u0275\u0275text(8, "Type");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "th", 7);
    \u0275\u0275listener("click", function TransactionTableComponent_table_1_Template_th_click_9_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onAmountHeaderClick());
    });
    \u0275\u0275text(10, " Amount ($) ");
    \u0275\u0275elementStart(11, "span", 8);
    \u0275\u0275text(12, "\u2191");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(13, "th", 9);
    \u0275\u0275text(14, "Balance");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "th", 10);
    \u0275\u0275text(16, "Actions");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(17, "tbody");
    \u0275\u0275template(18, TransactionTableComponent_table_1_tr_18_Template, 19, 20, "tr", 11);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(11);
    \u0275\u0275classProp("active", ctx_r1.isSortedByAmount);
    \u0275\u0275advance(7);
    \u0275\u0275property("ngForOf", ctx_r1.displayedTransactions);
  }
}
function TransactionTableComponent_ng_template_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 17)(1, "div", 18);
    \u0275\u0275text(2, "\u{1F4CB}");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p", 19);
    \u0275\u0275text(4, "No transactions found");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p", 20);
    \u0275\u0275text(6, "Try adjusting the date filter or add a new transaction.");
    \u0275\u0275elementEnd()();
  }
}
var TransactionTableComponent = class _TransactionTableComponent {
  constructor() {
    this.transactions = [];
    this.editClicked = new EventEmitter();
    this.deleteClicked = new EventEmitter();
    this.displayedTransactions = [];
    this.sortDirection = "asc";
    this.isSortedByAmount = false;
  }
  ngOnChanges() {
    this.displayedTransactions = [...this.transactions];
    if (this.isSortedByAmount)
      this.sortByAmount();
  }
  sortByAmount() {
    this.isSortedByAmount = true;
    this.displayedTransactions = [...this.transactions].sort((a, b) => a.amount - b.amount);
  }
  onAmountHeaderClick() {
    this.sortByAmount();
  }
  onEdit(tx) {
    this.editClicked.emit(tx);
  }
  onDelete(tx) {
    this.deleteClicked.emit(tx);
  }
  getTypeLabel(type) {
    return type === 0 ? "Credit" : "Debit";
  }
  static {
    this.\u0275fac = function TransactionTableComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _TransactionTableComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _TransactionTableComponent, selectors: [["app-transaction-table"]], inputs: { transactions: "transactions" }, outputs: { editClicked: "editClicked", deleteClicked: "deleteClicked" }, features: [\u0275\u0275NgOnChangesFeature], decls: 4, vars: 2, consts: [["emptyState", ""], [1, "table-wrapper"], ["class", "tx-table", 4, "ngIf", "ngIfElse"], [1, "tx-table"], [1, "col-date"], [1, "col-desc"], [1, "col-type"], [1, "col-amount", "sortable", 3, "click"], [1, "sort-icon"], [1, "col-balance"], [1, "col-actions"], [3, "row--credit", "row--debit", 4, "ngFor", "ngForOf"], [1, "badge"], [1, "col-amount"], [1, "action-btns"], ["title", "Edit", 1, "btn-icon", "btn-icon--edit", 3, "click"], ["title", "Delete", 1, "btn-icon", "btn-icon--delete", 3, "click"], [1, "empty-state"], [1, "empty-state__icon"], [1, "empty-state__title"], [1, "empty-state__sub"]], template: function TransactionTableComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 1);
        \u0275\u0275template(1, TransactionTableComponent_table_1_Template, 19, 3, "table", 2)(2, TransactionTableComponent_ng_template_2_Template, 7, 0, "ng-template", null, 0, \u0275\u0275templateRefExtractor);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        const emptyState_r5 = \u0275\u0275reference(3);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.displayedTransactions.length > 0)("ngIfElse", emptyState_r5);
      }
    }, dependencies: [CommonModule, NgForOf, NgIf, DecimalPipe], encapsulation: 2 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TransactionTableComponent, [{
    type: Component,
    args: [{ selector: "app-transaction-table", standalone: true, imports: [CommonModule], template: `<div class="table-wrapper">
  <table class="tx-table" *ngIf="displayedTransactions.length > 0; else emptyState">
    <thead>
      <tr>
        <th class="col-date">Date</th>
        <th class="col-desc">Description</th>
        <th class="col-type">Type</th>
        <th class="col-amount sortable" (click)="onAmountHeaderClick()">
          Amount ($)
          <span class="sort-icon" [class.active]="isSortedByAmount">\u2191</span>
        </th>
        <th class="col-balance">Balance</th>
        <th class="col-actions">Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr
        *ngFor="let tx of displayedTransactions"
        [class.row--credit]="tx.type === 0"
        [class.row--debit]="tx.type === 1"
      >
        <td class="col-date">{{ tx.date }}</td>
        <td class="col-desc">{{ tx.description }}</td>
        <td class="col-type">
          <span class="badge" [class.badge--credit]="tx.type === 0" [class.badge--debit]="tx.type === 1">
            {{ getTypeLabel(tx.type) }}
          </span>
        </td>
        <td class="col-amount" [class.amount--credit]="tx.type === 0" [class.amount--debit]="tx.type === 1">
          {{ tx.amount | number:'1.2-2' }}
        </td>
        <td class="col-balance">{{ tx.balance }}</td>
        <td class="col-actions">
          <div class="action-btns">
            <button class="btn-icon btn-icon--edit" title="Edit" (click)="onEdit(tx)">\u270F\uFE0F</button>
            <button class="btn-icon btn-icon--delete" title="Delete" (click)="onDelete(tx)">\u{1F5D1}\uFE0F</button>
          </div>
        </td>
      </tr>
    </tbody>
  </table>

  <ng-template #emptyState>
    <div class="empty-state">
      <div class="empty-state__icon">\u{1F4CB}</div>
      <p class="empty-state__title">No transactions found</p>
      <p class="empty-state__sub">Try adjusting the date filter or add a new transaction.</p>
    </div>
  </ng-template>
</div>
` }]
  }], null, { transactions: [{
    type: Input
  }], editClicked: [{
    type: Output
  }], deleteClicked: [{
    type: Output
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(TransactionTableComponent, { className: "TransactionTableComponent", filePath: "src/app/features/transaction-table/transaction-table.component.ts", lineNumber: 11 });
})();

// src/app/features/delete-confirm/delete-confirm.component.ts
function DeleteConfirmComponent_div_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 9)(1, "p", 10);
    \u0275\u0275text(2, "Are you sure you want to delete this transaction?");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 11)(4, "span", 12);
    \u0275\u0275text(5, "Date:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "span");
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "span", 12);
    \u0275\u0275text(9, "Amount:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "span");
    \u0275\u0275text(11);
    \u0275\u0275pipe(12, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "span", 12);
    \u0275\u0275text(14, "Description:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "span");
    \u0275\u0275text(16);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(17, "p", 13);
    \u0275\u0275text(18, "This action cannot be undone.");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate(ctx_r0.transaction.date);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1("$", \u0275\u0275pipeBind2(12, 3, ctx_r0.transaction.amount, "1.2-2"), "");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r0.transaction.description);
  }
}
var DeleteConfirmComponent = class _DeleteConfirmComponent {
  constructor() {
    this.transaction = null;
    this.confirmed = new EventEmitter();
    this.cancelled = new EventEmitter();
  }
  onConfirm() {
    this.confirmed.emit();
  }
  onCancel() {
    this.cancelled.emit();
  }
  static {
    this.\u0275fac = function DeleteConfirmComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _DeleteConfirmComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _DeleteConfirmComponent, selectors: [["app-delete-confirm"]], inputs: { transaction: "transaction" }, outputs: { confirmed: "confirmed", cancelled: "cancelled" }, decls: 13, vars: 1, consts: [[1, "modal-backdrop", 3, "click"], [1, "modal", 3, "click"], [1, "modal__header"], [1, "modal__icon", "modal__icon--danger"], [1, "modal__title"], ["class", "modal__body", 4, "ngIf"], [1, "modal__footer"], [1, "btn", "btn--ghost", 3, "click"], [1, "btn", "btn--danger", 3, "click"], [1, "modal__body"], [1, "modal__desc"], [1, "modal__detail"], [1, "detail-label"], [1, "modal__warning"]], template: function DeleteConfirmComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0);
        \u0275\u0275listener("click", function DeleteConfirmComponent_Template_div_click_0_listener() {
          return ctx.onCancel();
        });
        \u0275\u0275elementStart(1, "div", 1);
        \u0275\u0275listener("click", function DeleteConfirmComponent_Template_div_click_1_listener($event) {
          return $event.stopPropagation();
        });
        \u0275\u0275elementStart(2, "div", 2)(3, "span", 3);
        \u0275\u0275text(4, "\u26A0\uFE0F");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(5, "h2", 4);
        \u0275\u0275text(6, "Delete Transaction");
        \u0275\u0275elementEnd()();
        \u0275\u0275template(7, DeleteConfirmComponent_div_7_Template, 19, 6, "div", 5);
        \u0275\u0275elementStart(8, "div", 6)(9, "button", 7);
        \u0275\u0275listener("click", function DeleteConfirmComponent_Template_button_click_9_listener() {
          return ctx.onCancel();
        });
        \u0275\u0275text(10, "Cancel");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(11, "button", 8);
        \u0275\u0275listener("click", function DeleteConfirmComponent_Template_button_click_11_listener() {
          return ctx.onConfirm();
        });
        \u0275\u0275text(12, "Delete");
        \u0275\u0275elementEnd()()()();
      }
      if (rf & 2) {
        \u0275\u0275advance(7);
        \u0275\u0275property("ngIf", ctx.transaction);
      }
    }, dependencies: [CommonModule, NgIf, DecimalPipe], encapsulation: 2 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DeleteConfirmComponent, [{
    type: Component,
    args: [{ selector: "app-delete-confirm", standalone: true, imports: [CommonModule], template: `<div class="modal-backdrop" (click)="onCancel()">
  <div class="modal" (click)="$event.stopPropagation()">
    <div class="modal__header">
      <span class="modal__icon modal__icon--danger">\u26A0\uFE0F</span>
      <h2 class="modal__title">Delete Transaction</h2>
    </div>
    <div class="modal__body" *ngIf="transaction">
      <p class="modal__desc">Are you sure you want to delete this transaction?</p>
      <div class="modal__detail">
        <span class="detail-label">Date:</span>
        <span>{{ transaction.date }}</span>
        <span class="detail-label">Amount:</span>
        <span>\${{ transaction.amount | number:'1.2-2' }}</span>
        <span class="detail-label">Description:</span>
        <span>{{ transaction.description }}</span>
      </div>
      <p class="modal__warning">This action cannot be undone.</p>
    </div>
    <div class="modal__footer">
      <button class="btn btn--ghost" (click)="onCancel()">Cancel</button>
      <button class="btn btn--danger" (click)="onConfirm()">Delete</button>
    </div>
  </div>
</div>
` }]
  }], null, { transaction: [{
    type: Input
  }], confirmed: [{
    type: Output
  }], cancelled: [{
    type: Output
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(DeleteConfirmComponent, { className: "DeleteConfirmComponent", filePath: "src/app/features/delete-confirm/delete-confirm.component.ts", lineNumber: 11 });
})();

// src/app/features/transaction-list/transaction-list.component.ts
function TransactionListComponent_div_11_span_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" | \u{1F4C5} ", ctx_r0.activeFilter.date, "");
  }
}
function TransactionListComponent_div_11_span_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1, " | Credit");
    \u0275\u0275elementEnd();
  }
}
function TransactionListComponent_div_11_span_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1, " | Debit");
    \u0275\u0275elementEnd();
  }
}
function TransactionListComponent_div_11_span_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(' | "', ctx_r0.activeFilter.search, '"');
  }
}
function TransactionListComponent_div_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 13)(1, "span", 14);
    \u0275\u0275text(2, " \u{1F50D} Filters active ");
    \u0275\u0275template(3, TransactionListComponent_div_11_span_3_Template, 2, 1, "span", 15)(4, TransactionListComponent_div_11_span_4_Template, 2, 0, "span", 15)(5, TransactionListComponent_div_11_span_5_Template, 2, 0, "span", 15)(6, TransactionListComponent_div_11_span_6_Template, 2, 1, "span", 15);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275property("ngIf", ctx_r0.activeFilter.date);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.activeFilter.type === 0);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.activeFilter.type === 1);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r0.activeFilter.search);
  }
}
function TransactionListComponent_div_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 16);
    \u0275\u0275element(1, "div", 17);
    \u0275\u0275elementStart(2, "p");
    \u0275\u0275text(3, "Loading transactions\u2026");
    \u0275\u0275elementEnd()();
  }
}
function TransactionListComponent_div_13_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 18)(1, "span");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "button", 19);
    \u0275\u0275listener("click", function TransactionListComponent_div_13_Template_button_click_3_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.loadTransactions());
    });
    \u0275\u0275text(4, "Retry");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("\u26A0\uFE0F ", ctx_r0.errorMessage, "");
  }
}
function TransactionListComponent_app_transaction_table_14_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "app-transaction-table", 20);
    \u0275\u0275listener("editClicked", function TransactionListComponent_app_transaction_table_14_Template_app_transaction_table_editClicked_0_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.onEditClicked($event));
    })("deleteClicked", function TransactionListComponent_app_transaction_table_14_Template_app_transaction_table_deleteClicked_0_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.onDeleteClicked($event));
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275property("transactions", ctx_r0.transactions);
  }
}
function TransactionListComponent_div_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 21)(1, "span");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("", ctx_r0.transactions.length, " record", ctx_r0.transactions.length !== 1 ? "s" : "", " found");
  }
}
function TransactionListComponent_app_delete_confirm_16_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "app-delete-confirm", 22);
    \u0275\u0275listener("confirmed", function TransactionListComponent_app_delete_confirm_16_Template_app_delete_confirm_confirmed_0_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.onDeleteConfirmed());
    })("cancelled", function TransactionListComponent_app_delete_confirm_16_Template_app_delete_confirm_cancelled_0_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.onDeleteCancelled());
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275property("transaction", ctx_r0.txToDelete);
  }
}
var TransactionListComponent = class _TransactionListComponent {
  constructor(txService, router) {
    this.txService = txService;
    this.router = router;
    this.transactions = [];
    this.isLoading = false;
    this.errorMessage = null;
    this.txToDelete = null;
    this.activeFilter = null;
  }
  ngOnInit() {
    this.loadTransactions();
  }
  loadTransactions(filter) {
    this.isLoading = true;
    this.errorMessage = null;
    this.txService.getTransactions(filter).subscribe({
      next: (data) => {
        this.transactions = data;
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = err.message;
        this.isLoading = false;
      }
    });
  }
  onFilterApplied(filter) {
    this.activeFilter = filter;
    this.loadTransactions(filter ?? void 0);
  }
  onAddClicked() {
    this.router.navigate(["/transactions/new"]);
  }
  onEditClicked(tx) {
    this.router.navigate(["/transactions", tx.id, "edit"]);
  }
  onDeleteClicked(tx) {
    this.txToDelete = tx;
  }
  onDeleteConfirmed() {
    if (!this.txToDelete?.id)
      return;
    this.txService.deleteTransaction(this.txToDelete.id).subscribe({
      next: () => {
        this.txToDelete = null;
        this.loadTransactions(this.activeFilter ?? void 0);
      },
      error: (err) => {
        this.errorMessage = err.message;
        this.txToDelete = null;
      }
    });
  }
  onDeleteCancelled() {
    this.txToDelete = null;
  }
  static {
    this.\u0275fac = function TransactionListComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _TransactionListComponent)(\u0275\u0275directiveInject(TransactionService), \u0275\u0275directiveInject(Router));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _TransactionListComponent, selectors: [["app-transaction-list"]], decls: 17, vars: 6, consts: [[1, "page"], [1, "page__header"], [1, "header__brand"], [1, "brand-logo"], [1, "header__title"], [1, "header__subtitle"], [3, "filterApplied", "addClicked"], ["class", "active-filter", 4, "ngIf"], ["class", "state-loading", 4, "ngIf"], ["class", "state-error", 4, "ngIf"], [3, "transactions", "editClicked", "deleteClicked", 4, "ngIf"], ["class", "table-footer", 4, "ngIf"], [3, "transaction", "confirmed", "cancelled", 4, "ngIf"], [1, "active-filter"], [1, "filter-chip"], [4, "ngIf"], [1, "state-loading"], [1, "spinner"], [1, "state-error"], [1, "btn", "btn--ghost", "btn--sm", 3, "click"], [3, "editClicked", "deleteClicked", "transactions"], [1, "table-footer"], [3, "confirmed", "cancelled", "transaction"]], template: function TransactionListComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "header", 1)(2, "div", 2)(3, "div", 3);
        \u0275\u0275text(4, "\u{1F4B3}");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(5, "div")(6, "h1", 4);
        \u0275\u0275text(7, "Transaction Ledger");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(8, "p", 5);
        \u0275\u0275text(9, "Manage and track your account activity");
        \u0275\u0275elementEnd()()()();
        \u0275\u0275elementStart(10, "app-filter-bar", 6);
        \u0275\u0275listener("filterApplied", function TransactionListComponent_Template_app_filter_bar_filterApplied_10_listener($event) {
          return ctx.onFilterApplied($event);
        })("addClicked", function TransactionListComponent_Template_app_filter_bar_addClicked_10_listener() {
          return ctx.onAddClicked();
        });
        \u0275\u0275elementEnd();
        \u0275\u0275template(11, TransactionListComponent_div_11_Template, 7, 4, "div", 7)(12, TransactionListComponent_div_12_Template, 4, 0, "div", 8)(13, TransactionListComponent_div_13_Template, 5, 1, "div", 9)(14, TransactionListComponent_app_transaction_table_14_Template, 1, 1, "app-transaction-table", 10)(15, TransactionListComponent_div_15_Template, 3, 2, "div", 11)(16, TransactionListComponent_app_delete_confirm_16_Template, 1, 1, "app-delete-confirm", 12);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        \u0275\u0275advance(11);
        \u0275\u0275property("ngIf", ctx.activeFilter);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.isLoading);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.errorMessage && !ctx.isLoading);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", !ctx.isLoading && !ctx.errorMessage);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", !ctx.isLoading && !ctx.errorMessage);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.txToDelete);
      }
    }, dependencies: [
      CommonModule,
      NgIf,
      FilterBarComponent,
      TransactionTableComponent,
      DeleteConfirmComponent
    ], encapsulation: 2 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TransactionListComponent, [{
    type: Component,
    args: [{ selector: "app-transaction-list", standalone: true, imports: [
      CommonModule,
      FilterBarComponent,
      TransactionTableComponent,
      DeleteConfirmComponent
    ], template: `<div class="page">
  <!-- Header -->
  <header class="page__header">
    <div class="header__brand">
      <div class="brand-logo">\u{1F4B3}</div>
      <div>
        <h1 class="header__title">Transaction Ledger</h1>
        <p class="header__subtitle">Manage and track your account activity</p>
      </div>
    </div>
  </header>

  <!-- Filter Bar -->
  <app-filter-bar
    (filterApplied)="onFilterApplied($event)"
    (addClicked)="onAddClicked()"
  ></app-filter-bar>

  <!-- Active filter chip -->
  <div class="active-filter" *ngIf="activeFilter">
    <span class="filter-chip">
      \u{1F50D} Filters active
      <span *ngIf="activeFilter.date"> | \u{1F4C5} {{ activeFilter.date }}</span>
      <span *ngIf="activeFilter.type === 0"> | Credit</span>
      <span *ngIf="activeFilter.type === 1"> | Debit</span>
      <span *ngIf="activeFilter.search"> | "{{ activeFilter.search }}"</span>
    </span>
  </div>

  <!-- Loading -->
  <div class="state-loading" *ngIf="isLoading">
    <div class="spinner"></div>
    <p>Loading transactions\u2026</p>
  </div>

  <!-- Error -->
  <div class="state-error" *ngIf="errorMessage && !isLoading">
    <span>\u26A0\uFE0F {{ errorMessage }}</span>
    <button class="btn btn--ghost btn--sm" (click)="loadTransactions()">Retry</button>
  </div>

  <!-- Table -->
  <app-transaction-table
    *ngIf="!isLoading && !errorMessage"
    [transactions]="transactions"
    (editClicked)="onEditClicked($event)"
    (deleteClicked)="onDeleteClicked($event)"
  ></app-transaction-table>

  <!-- Row count -->
  <div class="table-footer" *ngIf="!isLoading && !errorMessage">
    <span>{{ transactions.length }} record{{ transactions.length !== 1 ? 's' : '' }} found</span>
  </div>

  <!-- Delete Confirm Modal -->
  <app-delete-confirm
    *ngIf="txToDelete"
    [transaction]="txToDelete"
    (confirmed)="onDeleteConfirmed()"
    (cancelled)="onDeleteCancelled()"
  ></app-delete-confirm>
</div>
` }]
  }], () => [{ type: TransactionService }, { type: Router }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(TransactionListComponent, { className: "TransactionListComponent", filePath: "src/app/features/transaction-list/transaction-list.component.ts", lineNumber: 21 });
})();
export {
  TransactionListComponent
};
//# sourceMappingURL=chunk-KJSHMLUK.js.map
