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
  NgModel,
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
  DatePipe,
  DestroyRef,
  HttpClient,
  NgClass,
  Subject,
  TenantService,
  catchError,
  debounceTime,
  distinctUntilChanged,
  inject,
  of,
  switchMap,
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
  ɵɵproperty,
  ɵɵpureFunction3,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIdentity,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2,
  ɵɵtextInterpolate3,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-XVQVZOM4.js";

// src/app/features/employees/employee-list.component.ts
var _forTrack0 = ($index, $item) => $item.id;
var _c0 = (a0, a1, a2) => ({ "bg-emerald-900/20 text-emerald-400 border border-emerald-500/20": a0, "bg-red-900/20 text-red-400 border border-red-500/20": a1, "bg-amber-900/20 text-amber-400 border border-amber-500/20": a2 });
function EmployeeListComponent_For_45_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tr", 20)(1, "td", 23);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "td", 24);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "td", 25);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "td", 17)(8, "p", 26);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "p", 27);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(12, "td", 17)(13, "span", 28);
    \u0275\u0275text(14);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(15, "td", 25);
    \u0275\u0275text(16);
    \u0275\u0275pipe(17, "date");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "td", 18)(19, "div", 29)(20, "button", 30);
    \u0275\u0275listener("click", function EmployeeListComponent_For_45_Template_button_click_20_listener() {
      const emp_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.openTransferModal(emp_r2));
    });
    \u0275\u0275elementStart(21, "span", 5);
    \u0275\u0275text(22, "swap_horiz");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(23, "button", 31);
    \u0275\u0275listener("click", function EmployeeListComponent_For_45_Template_button_click_23_listener() {
      const emp_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.openTerminateModal(emp_r2));
    });
    \u0275\u0275elementStart(24, "span", 5);
    \u0275\u0275text(25, "person_off");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(26, "button", 32);
    \u0275\u0275listener("click", function EmployeeListComponent_For_45_Template_button_click_26_listener() {
      const emp_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.requestSoftDelete(emp_r2));
    });
    \u0275\u0275elementStart(27, "span", 5);
    \u0275\u0275text(28, "delete");
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    const emp_r2 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(emp_r2.employeeCode);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("", emp_r2.firstName, " ", emp_r2.lastName, "");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(emp_r2.email);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate((emp_r2.department == null ? null : emp_r2.department.name) || "Unassigned");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate((emp_r2.designation == null ? null : emp_r2.designation.name) || emp_r2.employmentType);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngClass", \u0275\u0275pureFunction3(14, _c0, emp_r2.status === "active", emp_r2.status === "terminated", emp_r2.status === "suspended"));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", emp_r2.status, " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(17, 11, emp_r2.dateOfJoining, "mediumDate"));
    \u0275\u0275advance(4);
    \u0275\u0275property("disabled", emp_r2.status === "terminated");
    \u0275\u0275advance(3);
    \u0275\u0275property("disabled", emp_r2.status === "terminated");
  }
}
function EmployeeListComponent_ForEmpty_46_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td", 33);
    \u0275\u0275text(2, ' No active employees registered. Click "Add Employee" to create one. ');
    \u0275\u0275elementEnd()();
  }
}
function EmployeeListComponent_Conditional_47_For_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 39);
    \u0275\u0275listener("click", function EmployeeListComponent_Conditional_47_For_7_Template_button_click_0_listener() {
      const p_r6 = \u0275\u0275restoreView(_r5).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.goToPage(p_r6));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const p_r6 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275property("ngClass", p_r6 === ctx_r2.currentPage ? "bg-brand-600 text-white shadow-md" : "text-slate-400 hover:bg-slate-800 hover:text-slate-200");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", p_r6, " ");
  }
}
function EmployeeListComponent_Conditional_47_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 21)(1, "button", 34);
    \u0275\u0275listener("click", function EmployeeListComponent_Conditional_47_Template_button_click_1_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.goToPage(ctx_r2.currentPage - 1));
    });
    \u0275\u0275elementStart(2, "span", 35);
    \u0275\u0275text(3, "chevron_left");
    \u0275\u0275elementEnd();
    \u0275\u0275text(4, " Previous ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "div", 36);
    \u0275\u0275repeaterCreate(6, EmployeeListComponent_Conditional_47_For_7_Template, 2, 2, "button", 37, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "button", 34);
    \u0275\u0275listener("click", function EmployeeListComponent_Conditional_47_Template_button_click_8_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.goToPage(ctx_r2.currentPage + 1));
    });
    \u0275\u0275text(9, " Next ");
    \u0275\u0275elementStart(10, "span", 38);
    \u0275\u0275text(11, "chevron_right");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r2.currentPage <= 1);
    \u0275\u0275advance(5);
    \u0275\u0275repeater(ctx_r2.paginationRange);
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r2.currentPage >= ctx_r2.totalPages);
  }
}
function EmployeeListComponent_Conditional_48_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 47);
    \u0275\u0275text(1, "Required");
    \u0275\u0275elementEnd();
  }
}
function EmployeeListComponent_Conditional_48_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 47);
    \u0275\u0275text(1, "Format: EMP-XX-NNN");
    \u0275\u0275elementEnd();
  }
}
function EmployeeListComponent_Conditional_48_Conditional_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 47);
    \u0275\u0275text(1, "Required");
    \u0275\u0275elementEnd();
  }
}
function EmployeeListComponent_Conditional_48_Conditional_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 47);
    \u0275\u0275text(1, "Invalid email");
    \u0275\u0275elementEnd();
  }
}
function EmployeeListComponent_Conditional_48_Conditional_25_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 47);
    \u0275\u0275text(1, "Required");
    \u0275\u0275elementEnd();
  }
}
function EmployeeListComponent_Conditional_48_Conditional_30_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 47);
    \u0275\u0275text(1, "Required");
    \u0275\u0275elementEnd();
  }
}
function EmployeeListComponent_Conditional_48_Conditional_36_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 47);
    \u0275\u0275text(1, "Required");
    \u0275\u0275elementEnd();
  }
}
function EmployeeListComponent_Conditional_48_For_52_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 63);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const d_r8 = ctx.$implicit;
    \u0275\u0275property("value", d_r8.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(d_r8.name);
  }
}
function EmployeeListComponent_Conditional_48_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 22)(1, "div", 40)(2, "h3", 41);
    \u0275\u0275text(3, "New Employee Enrollment");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "p", 42);
    \u0275\u0275text(5, "Enter bio details. Tenant validation rules automatically enforce code uniqueness.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "form", 43);
    \u0275\u0275listener("ngSubmit", function EmployeeListComponent_Conditional_48_Template_form_ngSubmit_6_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.saveEmployee());
    });
    \u0275\u0275elementStart(7, "div", 44)(8, "div")(9, "label", 45);
    \u0275\u0275text(10, "Employee Code");
    \u0275\u0275elementEnd();
    \u0275\u0275element(11, "input", 46);
    \u0275\u0275template(12, EmployeeListComponent_Conditional_48_Conditional_12_Template, 2, 0, "p", 47)(13, EmployeeListComponent_Conditional_48_Conditional_13_Template, 2, 0, "p", 47);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "div")(15, "label", 48);
    \u0275\u0275text(16, "Email");
    \u0275\u0275elementEnd();
    \u0275\u0275element(17, "input", 49);
    \u0275\u0275template(18, EmployeeListComponent_Conditional_48_Conditional_18_Template, 2, 0, "p", 47)(19, EmployeeListComponent_Conditional_48_Conditional_19_Template, 2, 0, "p", 47);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(20, "div", 44)(21, "div")(22, "label", 50);
    \u0275\u0275text(23, "First Name");
    \u0275\u0275elementEnd();
    \u0275\u0275element(24, "input", 51);
    \u0275\u0275template(25, EmployeeListComponent_Conditional_48_Conditional_25_Template, 2, 0, "p", 47);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(26, "div")(27, "label", 52);
    \u0275\u0275text(28, "Last Name");
    \u0275\u0275elementEnd();
    \u0275\u0275element(29, "input", 53);
    \u0275\u0275template(30, EmployeeListComponent_Conditional_48_Conditional_30_Template, 2, 0, "p", 47);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(31, "div", 44)(32, "div")(33, "label", 54);
    \u0275\u0275text(34, "Date of Joining");
    \u0275\u0275elementEnd();
    \u0275\u0275element(35, "input", 55);
    \u0275\u0275template(36, EmployeeListComponent_Conditional_48_Conditional_36_Template, 2, 0, "p", 47);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(37, "div")(38, "label", 56);
    \u0275\u0275text(39, "Employment Type");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(40, "select", 57)(41, "option", 58);
    \u0275\u0275text(42, "FullTime");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(43, "option", 59);
    \u0275\u0275text(44, "Contractor");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(45, "option", 60);
    \u0275\u0275text(46, "PartTime");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(47, "div")(48, "label", 61);
    \u0275\u0275text(49, "Department");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(50, "select", 62);
    \u0275\u0275repeaterCreate(51, EmployeeListComponent_Conditional_48_For_52_Template, 2, 2, "option", 63, _forTrack0);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(53, "div", 64)(54, "button", 65);
    \u0275\u0275listener("click", function EmployeeListComponent_Conditional_48_Template_button_click_54_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.closeAddModal());
    });
    \u0275\u0275text(55, "Cancel");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(56, "button", 66);
    \u0275\u0275text(57, "Enroll Employee");
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    let tmp_2_0;
    let tmp_3_0;
    let tmp_4_0;
    let tmp_5_0;
    let tmp_6_0;
    let tmp_7_0;
    let tmp_8_0;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(6);
    \u0275\u0275property("formGroup", ctx_r2.empForm);
    \u0275\u0275advance(6);
    \u0275\u0275conditional(((tmp_2_0 = ctx_r2.empForm.get("employeeCode")) == null ? null : tmp_2_0.touched) && ((tmp_2_0 = ctx_r2.empForm.get("employeeCode")) == null ? null : tmp_2_0.hasError("required")) ? 12 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(((tmp_3_0 = ctx_r2.empForm.get("employeeCode")) == null ? null : tmp_3_0.touched) && ((tmp_3_0 = ctx_r2.empForm.get("employeeCode")) == null ? null : tmp_3_0.hasError("pattern")) ? 13 : -1);
    \u0275\u0275advance(5);
    \u0275\u0275conditional(((tmp_4_0 = ctx_r2.empForm.get("email")) == null ? null : tmp_4_0.touched) && ((tmp_4_0 = ctx_r2.empForm.get("email")) == null ? null : tmp_4_0.hasError("required")) ? 18 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(((tmp_5_0 = ctx_r2.empForm.get("email")) == null ? null : tmp_5_0.touched) && ((tmp_5_0 = ctx_r2.empForm.get("email")) == null ? null : tmp_5_0.hasError("email")) ? 19 : -1);
    \u0275\u0275advance(6);
    \u0275\u0275conditional(((tmp_6_0 = ctx_r2.empForm.get("firstName")) == null ? null : tmp_6_0.touched) && ((tmp_6_0 = ctx_r2.empForm.get("firstName")) == null ? null : tmp_6_0.hasError("required")) ? 25 : -1);
    \u0275\u0275advance(5);
    \u0275\u0275conditional(((tmp_7_0 = ctx_r2.empForm.get("lastName")) == null ? null : tmp_7_0.touched) && ((tmp_7_0 = ctx_r2.empForm.get("lastName")) == null ? null : tmp_7_0.hasError("required")) ? 30 : -1);
    \u0275\u0275advance(6);
    \u0275\u0275conditional(((tmp_8_0 = ctx_r2.empForm.get("dateOfJoining")) == null ? null : tmp_8_0.touched) && ((tmp_8_0 = ctx_r2.empForm.get("dateOfJoining")) == null ? null : tmp_8_0.hasError("required")) ? 36 : -1);
    \u0275\u0275advance(15);
    \u0275\u0275repeater(ctx_r2.departments);
    \u0275\u0275advance(5);
    \u0275\u0275property("disabled", ctx_r2.empForm.invalid);
  }
}
function EmployeeListComponent_Conditional_49_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 22)(1, "div", 67)(2, "div", 68)(3, "div", 69)(4, "span", 70);
    \u0275\u0275text(5, "warning");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "h3", 71);
    \u0275\u0275text(7, "Confirm Soft-Delete");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "p", 42);
    \u0275\u0275text(9, " Are you sure you want to soft-delete ");
    \u0275\u0275elementStart(10, "strong", 72);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd();
    \u0275\u0275text(12);
    \u0275\u0275elementStart(13, "code", 73);
    \u0275\u0275text(14, "IsDeleted = true");
    \u0275\u0275elementEnd();
    \u0275\u0275text(15, " \u2014 the record can be restored later. ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "div", 74)(17, "button", 75);
    \u0275\u0275listener("click", function EmployeeListComponent_Conditional_49_Template_button_click_17_listener() {
      \u0275\u0275restoreView(_r9);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.cancelDelete());
    });
    \u0275\u0275text(18, "Cancel");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "button", 76);
    \u0275\u0275listener("click", function EmployeeListComponent_Conditional_49_Template_button_click_19_listener() {
      \u0275\u0275restoreView(_r9);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.confirmSoftDelete());
    });
    \u0275\u0275text(20, "Soft-Delete");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(11);
    \u0275\u0275textInterpolate2("", ctx_r2.pendingDeleteEmp.firstName, " ", ctx_r2.pendingDeleteEmp.lastName, "");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" (", ctx_r2.pendingDeleteEmp.employeeCode, ")? This sets ");
  }
}
function EmployeeListComponent_Conditional_50_For_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 63);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const d_r11 = ctx.$implicit;
    \u0275\u0275property("value", d_r11.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(d_r11.name);
  }
}
function EmployeeListComponent_Conditional_50_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 22)(1, "div", 67)(2, "h3", 77);
    \u0275\u0275text(3, "Transfer Department");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "p", 42);
    \u0275\u0275text(5, "Select the new department for ");
    \u0275\u0275elementStart(6, "strong");
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275text(8, ".");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "div", 78)(10, "div")(11, "label", 79);
    \u0275\u0275text(12, "Department");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "select", 80);
    \u0275\u0275twoWayListener("ngModelChange", function EmployeeListComponent_Conditional_50_Template_select_ngModelChange_13_listener($event) {
      \u0275\u0275restoreView(_r10);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.newDeptId, $event) || (ctx_r2.newDeptId = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275repeaterCreate(14, EmployeeListComponent_Conditional_50_For_15_Template, 2, 2, "option", 63, _forTrack0);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(16, "div", 74)(17, "button", 75);
    \u0275\u0275listener("click", function EmployeeListComponent_Conditional_50_Template_button_click_17_listener() {
      \u0275\u0275restoreView(_r10);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.closeTransferModal());
    });
    \u0275\u0275text(18, "Cancel");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "button", 81);
    \u0275\u0275listener("click", function EmployeeListComponent_Conditional_50_Template_button_click_19_listener() {
      \u0275\u0275restoreView(_r10);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.executeTransfer());
    });
    \u0275\u0275text(20, "Submit Transfer");
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate2("", ctx_r2.selectedEmp.firstName, " ", ctx_r2.selectedEmp.lastName, "");
    \u0275\u0275advance(6);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.newDeptId);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r2.departments);
  }
}
function EmployeeListComponent_Conditional_51_Template(rf, ctx) {
  if (rf & 1) {
    const _r12 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 22)(1, "div", 67)(2, "h3", 77);
    \u0275\u0275text(3, "Terminate Employee Lifecycle");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "p", 42);
    \u0275\u0275text(5, "Initiate offboarding procedure for ");
    \u0275\u0275elementStart(6, "strong");
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275text(8, ".");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "div", 78)(10, "div")(11, "label", 82);
    \u0275\u0275text(12, "Termination Date");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "input", 83);
    \u0275\u0275twoWayListener("ngModelChange", function EmployeeListComponent_Conditional_51_Template_input_ngModelChange_13_listener($event) {
      \u0275\u0275restoreView(_r12);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.terminationDate, $event) || (ctx_r2.terminationDate = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(14, "div")(15, "label", 84);
    \u0275\u0275text(16, "Reason");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "textarea", 85);
    \u0275\u0275twoWayListener("ngModelChange", function EmployeeListComponent_Conditional_51_Template_textarea_ngModelChange_17_listener($event) {
      \u0275\u0275restoreView(_r12);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.terminationReason, $event) || (ctx_r2.terminationReason = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(18, "div", 74)(19, "button", 75);
    \u0275\u0275listener("click", function EmployeeListComponent_Conditional_51_Template_button_click_19_listener() {
      \u0275\u0275restoreView(_r12);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.closeTerminateModal());
    });
    \u0275\u0275text(20, "Cancel");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "button", 76);
    \u0275\u0275listener("click", function EmployeeListComponent_Conditional_51_Template_button_click_21_listener() {
      \u0275\u0275restoreView(_r12);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.executeTermination());
    });
    \u0275\u0275text(22, "Terminate Employee");
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate2("", ctx_r2.selectedEmp.firstName, " ", ctx_r2.selectedEmp.lastName, "");
    \u0275\u0275advance(6);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.terminationDate);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.terminationReason);
  }
}
var EmployeeListComponent = class _EmployeeListComponent {
  authService = inject(AuthService);
  tenantService = inject(TenantService);
  http = inject(HttpClient);
  fb = inject(FormBuilder);
  destroyRef = inject(DestroyRef);
  employees = [];
  searchQuery = "";
  showAddModal = false;
  // Modals for Actions
  showTransferModal = false;
  showTerminateModal = false;
  selectedEmp = null;
  newDeptId = "";
  terminationDate = "";
  terminationReason = "";
  // Edge case fix: Custom delete confirmation modal (replaces window.confirm)
  showDeleteConfirmModal = false;
  pendingDeleteEmp = null;
  // Edge case fix: Server-side pagination
  currentPage = 1;
  pageSize = 20;
  totalCount = 0;
  totalPages = 1;
  paginationRange = [1];
  // Options
  departments = [];
  // Edge case fix: Search debounce subject
  searchSubject = new Subject();
  empForm = this.fb.group({
    employeeCode: ["", [Validators.required, Validators.pattern(/^EMP-[A-Z]{2}-\d{3,}$/)]],
    firstName: ["", [Validators.required, Validators.minLength(2)]],
    lastName: ["", [Validators.required, Validators.minLength(2)]],
    email: ["", [Validators.required, Validators.email]],
    dateOfJoining: [(/* @__PURE__ */ new Date()).toISOString().substring(0, 10), Validators.required],
    employmentType: ["FullTime", Validators.required],
    departmentId: ["", Validators.required]
  });
  ngOnInit() {
    this.loadDepartments();
    this.loadEmployees();
    this.searchSubject.pipe(debounceTime(300), distinctUntilChanged(), switchMap((query) => {
      this.searchQuery = query;
      this.currentPage = 1;
      return this.fetchEmployees$();
    }), takeUntilDestroyed(this.destroyRef)).subscribe((result) => {
      this.employees = result.data;
      this.totalCount = result.totalCount;
      this.totalPages = result.totalPages;
      this.updatePaginationRange();
    });
  }
  // Edge case fix: Input event feeds debounce subject instead of firing HTTP directly
  onSearchInput() {
    this.searchSubject.next(this.searchQuery);
  }
  loadEmployees() {
    this.fetchEmployees$().pipe(takeUntilDestroyed(this.destroyRef)).subscribe((result) => {
      this.employees = result.data;
      this.totalCount = result.totalCount;
      this.totalPages = result.totalPages;
      this.updatePaginationRange();
    });
  }
  fetchEmployees$() {
    let url = `${this.authService.apiUrl}/employees?page=${this.currentPage}&pageSize=${this.pageSize}`;
    if (this.searchQuery) {
      url += `&search=${encodeURIComponent(this.searchQuery)}`;
    }
    return this.http.get(url).pipe(switchMap((res) => {
      const totalCount = res.meta?.totalCount ?? res.data.length;
      const totalPages = Math.max(1, Math.ceil(totalCount / this.pageSize));
      return of({ data: res.data, totalCount, totalPages });
    }), catchError(() => {
      const mockData = this.getMockEmployees();
      return of({ data: mockData, totalCount: mockData.length, totalPages: 1 });
    }));
  }
  loadDepartments() {
    const activeTenantId = this.tenantService.currentTenantId();
    if (activeTenantId === "e3b97b0a-3a7b-4df2-bdcb-a032de2a1bf6") {
      this.departments = [
        { id: "6b2b2b1a-9694-4d89-9a74-b5861b585321", name: "Engineering" },
        { id: "d5d71c84-9c8b-4b14-998f-0d944e82df4b", name: "Human Resources" }
      ];
    } else {
      this.departments = [
        { id: "707c7c34-eb17-48f1-8f52-87053ff8479a", name: "Engineering" },
        { id: "c3c3a078-4357-41ec-b82b-8a56b509ef48", name: "Sales" }
      ];
    }
    if (this.departments.length > 0) {
      this.empForm.patchValue({ departmentId: this.departments[0].id });
    }
  }
  // Pagination
  goToPage(page) {
    if (page < 1 || page > this.totalPages)
      return;
    this.currentPage = page;
    this.loadEmployees();
  }
  updatePaginationRange() {
    const range = [];
    const maxVisible = 5;
    let start = Math.max(1, this.currentPage - Math.floor(maxVisible / 2));
    const end = Math.min(this.totalPages, start + maxVisible - 1);
    start = Math.max(1, end - maxVisible + 1);
    for (let i = start; i <= end; i++) {
      range.push(i);
    }
    this.paginationRange = range;
  }
  openAddModal() {
    this.empForm.reset({
      dateOfJoining: (/* @__PURE__ */ new Date()).toISOString().substring(0, 10),
      employmentType: "FullTime",
      departmentId: this.departments[0]?.id || ""
    });
    this.showAddModal = true;
  }
  closeAddModal() {
    this.showAddModal = false;
  }
  saveEmployee() {
    if (this.empForm.invalid)
      return;
    const payload = this.empForm.value;
    this.http.post(`${this.authService.apiUrl}/employees`, payload).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: () => {
        this.loadEmployees();
        this.closeAddModal();
      },
      error: () => {
        const deptName = this.departments.find((d) => d.id === payload["departmentId"])?.name || "Engineering";
        const newMockEmp = {
          id: crypto.randomUUID(),
          employeeCode: payload["employeeCode"] ?? "",
          firstName: payload["firstName"] ?? "",
          lastName: payload["lastName"] ?? "",
          email: payload["email"] ?? "",
          dateOfJoining: payload["dateOfJoining"] ?? "",
          employmentType: payload["employmentType"] ?? "FullTime",
          status: "active",
          departmentId: payload["departmentId"] ?? "",
          department: { name: deptName }
        };
        this.employees = [...this.employees, newMockEmp];
        this.totalCount++;
        this.closeAddModal();
      }
    });
  }
  /**
   * Edge case fix: Replaced window.confirm with custom modal.
   * Also changed from HTTP DELETE to PATCH for soft-delete (spec: "NEVER hard delete").
   */
  requestSoftDelete(emp) {
    this.pendingDeleteEmp = emp;
    this.showDeleteConfirmModal = true;
  }
  cancelDelete() {
    this.pendingDeleteEmp = null;
    this.showDeleteConfirmModal = false;
  }
  confirmSoftDelete() {
    if (!this.pendingDeleteEmp)
      return;
    const id = this.pendingDeleteEmp.id;
    this.http.patch(`${this.authService.apiUrl}/employees/${id}/soft-delete`, {}).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: () => {
        this.loadEmployees();
        this.cancelDelete();
      },
      error: () => {
        this.employees = this.employees.filter((e) => e.id !== id);
        this.totalCount = Math.max(0, this.totalCount - 1);
        this.cancelDelete();
      }
    });
  }
  openTransferModal(emp) {
    this.selectedEmp = emp;
    this.newDeptId = this.departments[0]?.id || "";
    this.showTransferModal = true;
  }
  closeTransferModal() {
    this.showTransferModal = false;
    this.selectedEmp = null;
  }
  executeTransfer() {
    if (!this.selectedEmp || !this.newDeptId)
      return;
    this.http.post(`${this.authService.apiUrl}/employees/${this.selectedEmp.id}/transfer`, { newDepartmentId: this.newDeptId }).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: () => {
        this.loadEmployees();
        this.closeTransferModal();
      },
      error: () => {
        const targetDeptName = this.departments.find((d) => d.id === this.newDeptId)?.name || "New Dept";
        if (this.selectedEmp) {
          this.selectedEmp.department = { name: targetDeptName };
          this.selectedEmp.departmentId = this.newDeptId;
        }
        this.closeTransferModal();
      }
    });
  }
  openTerminateModal(emp) {
    this.selectedEmp = emp;
    this.terminationDate = (/* @__PURE__ */ new Date()).toISOString().substring(0, 10);
    this.terminationReason = "Lifecycle completion offboarding";
    this.showTerminateModal = true;
  }
  closeTerminateModal() {
    this.showTerminateModal = false;
    this.selectedEmp = null;
  }
  executeTermination() {
    if (!this.selectedEmp)
      return;
    if (this.selectedEmp.dateOfJoining && this.terminationDate < this.selectedEmp.dateOfJoining) {
      return;
    }
    this.http.post(`${this.authService.apiUrl}/employees/${this.selectedEmp.id}/terminate`, {
      terminationDate: this.terminationDate,
      reason: this.terminationReason
    }).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: () => {
        this.loadEmployees();
        this.closeTerminateModal();
      },
      error: () => {
        if (this.selectedEmp) {
          this.selectedEmp.status = "terminated";
        }
        this.closeTerminateModal();
      }
    });
  }
  getMockEmployees() {
    const activeTenantId = this.tenantService.currentTenantId();
    if (activeTenantId === "e3b97b0a-3a7b-4df2-bdcb-a032de2a1bf6") {
      return [
        {
          id: "fe082fb1-4ca3-4a17-8e68-fb9e2d63428f",
          employeeCode: "EMP-IN-001",
          firstName: "Rajesh",
          lastName: "Kumar",
          email: "rajesh.kumar@capgemini-in.com",
          dateOfJoining: "2022-01-15",
          employmentType: "FullTime",
          status: "active",
          department: { name: "Human Resources" },
          designation: { name: "HR Manager" }
        },
        {
          id: "ae082fb1-4ca3-4a17-8e68-fb9e2d63428a",
          employeeCode: "EMP-IN-002",
          firstName: "Amit",
          lastName: "Sharma",
          email: "amit.sharma@capgemini-in.com",
          dateOfJoining: "2023-04-10",
          employmentType: "FullTime",
          status: "active",
          department: { name: "Engineering" },
          designation: { name: "Lead Engineer" }
        },
        {
          id: "ce082fb1-4ca3-4a17-8e68-fb9e2d63428c",
          employeeCode: "EMP-IN-003",
          firstName: "Priya",
          lastName: "Patel",
          email: "priya.patel@capgemini-in.com",
          dateOfJoining: "2024-06-01",
          employmentType: "FullTime",
          status: "active",
          department: { name: "Engineering" },
          designation: { name: "Software Engineer" }
        }
      ];
    } else {
      return [
        {
          id: "be082fb1-4ca3-4a17-8e68-fb9e2d63428b",
          employeeCode: "EMP-US-001",
          firstName: "Sarah",
          lastName: "Connor",
          email: "sarah.connor@capgemini-us.com",
          dateOfJoining: "2020-03-20",
          employmentType: "FullTime",
          status: "active",
          department: { name: "Engineering" },
          designation: { name: "Senior Principal Engineer" }
        },
        {
          id: "de082fb1-4ca3-4a17-8e68-fb9e2d63428d",
          employeeCode: "EMP-US-002",
          firstName: "John",
          lastName: "Doe",
          email: "john.doe@capgemini-us.com",
          dateOfJoining: "2025-01-10",
          employmentType: "FullTime",
          status: "active",
          department: { name: "Sales" },
          designation: { name: "Sales Executive" }
        }
      ];
    }
  }
  static \u0275fac = function EmployeeListComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _EmployeeListComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _EmployeeListComponent, selectors: [["app-employee-list"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 52, vars: 11, consts: [[1, "space-y-6", "animate-fade-in"], [1, "flex", "flex-col", "sm:flex-row", "sm:items-center", "justify-between", "gap-4"], [1, "text-2xl", "font-bold", "tracking-tight", "text-white"], [1, "text-xs", "text-slate-400", "mt-0.5"], ["id", "addEmployeeBtn", 1, "bg-brand-600", "hover:bg-brand-500", "text-white", "text-xs", "font-semibold", "py-2.5", "px-4", "rounded-xl", "flex", "items-center", "justify-center", "space-x-1.5", "transition-all", "shadow-md", "shadow-brand-600/10", 3, "click"], [1, "material-icons", "text-sm"], [1, "glass-card", "p-4", "flex", "flex-col", "md:flex-row", "gap-4", "items-center", "justify-between"], [1, "w-full", "md:w-96", "relative"], [1, "material-icons", "absolute", "left-3.5", "top-3", "text-slate-500", "text-sm"], ["id", "employeeSearchInput", "type", "text", "placeholder", "Search by name, code or email...", 1, "w-full", "bg-slate-900", "border", "border-slate-800", "focus:border-brand-500", "focus:ring-1", "focus:ring-brand-500", "rounded-xl", "pl-10", "pr-4", "py-2.5", "text-xs", "text-slate-200", "outline-none", "transition-all", "placeholder:text-slate-600", 3, "ngModelChange", "input", "ngModel"], [1, "flex", "items-center", "space-x-4"], [1, "text-[11px]", "text-slate-500"], [1, "text-[11px]", "text-slate-400", "font-mono"], [1, "glass-card", "overflow-hidden"], [1, "overflow-x-auto"], [1, "w-full", "text-left", "border-collapse"], [1, "border-b", "border-slate-800", "text-[10px]", "font-bold", "uppercase", "tracking-wider", "text-slate-400", "bg-slate-900/30"], [1, "px-6", "py-4"], [1, "px-6", "py-4", "text-right"], [1, "divide-y", "divide-slate-800/50", "text-xs", "text-slate-300"], [1, "hover:bg-slate-800/20", "transition-colors"], [1, "flex", "items-center", "justify-between", "px-6", "py-3", "border-t", "border-slate-800", "bg-slate-900/20"], [1, "fixed", "inset-0", "bg-slate-950/80", "backdrop-blur-sm", "z-50", "flex", "items-center", "justify-center", "p-4"], [1, "px-6", "py-4", "font-mono", "font-semibold", "text-brand-400"], [1, "px-6", "py-4", "font-medium", "text-slate-200"], [1, "px-6", "py-4", "text-slate-400"], [1, "font-semibold", "text-slate-200"], [1, "text-[10px]", "text-slate-500", "mt-0.5"], [1, "px-2.5", "py-1", "rounded-full", "text-[9px]", "font-bold", "uppercase", "tracking-wide", 3, "ngClass"], [1, "flex", "items-center", "justify-end", "space-x-1"], ["title", "Department Transfer", 1, "p-1.5", "hover:bg-slate-800", "text-slate-400", "hover:text-brand-400", "rounded-lg", "transition-colors", "disabled:opacity-30", 3, "click", "disabled"], ["title", "Terminate Employee", 1, "p-1.5", "hover:bg-slate-800", "text-slate-400", "hover:text-red-400", "rounded-lg", "transition-colors", "disabled:opacity-30", 3, "click", "disabled"], ["title", "Soft-Delete Record", 1, "p-1.5", "hover:bg-slate-800", "text-slate-400", "hover:text-red-500", "rounded-lg", "transition-colors", 3, "click"], ["colspan", "7", 1, "px-6", "py-12", "text-center", "text-slate-500", "font-medium"], [1, "flex", "items-center", "text-xs", "font-semibold", "text-slate-400", "hover:text-brand-400", "disabled:opacity-30", "disabled:cursor-not-allowed", "transition-colors", "px-3", "py-1.5", "rounded-lg", "hover:bg-slate-800", 3, "click", "disabled"], [1, "material-icons", "text-sm", "mr-1"], [1, "flex", "items-center", "space-x-1"], [1, "h-8", "w-8", "rounded-lg", "text-xs", "font-semibold", "transition-all", 3, "ngClass"], [1, "material-icons", "text-sm", "ml-1"], [1, "h-8", "w-8", "rounded-lg", "text-xs", "font-semibold", "transition-all", 3, "click", "ngClass"], [1, "w-full", "max-w-lg", "bg-slate-900", "border", "border-slate-800", "rounded-3xl", "p-6", "shadow-2xl", "animate-fade-in", "relative"], [1, "text-lg", "font-bold", "text-white", "mb-1"], [1, "text-xs", "text-slate-400", "mb-6"], [1, "space-y-4", 3, "ngSubmit", "formGroup"], [1, "grid", "grid-cols-2", "gap-4"], ["for", "empCodeInput", 1, "block", "text-[10px]", "font-bold", "text-slate-400", "uppercase", "mb-1"], ["id", "empCodeInput", "type", "text", "formControlName", "employeeCode", "placeholder", "e.g. EMP-IN-101", 1, "w-full", "bg-slate-950", "border", "border-slate-800", "focus:border-brand-500", "focus:ring-1", "focus:ring-brand-500", "rounded-xl", "px-3", "py-2", "text-xs", "text-slate-200", "outline-none"], [1, "text-red-400", "text-[10px]", "mt-0.5"], ["for", "empEmailInput", 1, "block", "text-[10px]", "font-bold", "text-slate-400", "uppercase", "mb-1"], ["id", "empEmailInput", "type", "email", "formControlName", "email", "placeholder", "e.g. user@capgemini.com", 1, "w-full", "bg-slate-950", "border", "border-slate-800", "focus:border-brand-500", "focus:ring-1", "focus:ring-brand-500", "rounded-xl", "px-3", "py-2", "text-xs", "text-slate-200", "outline-none"], ["for", "empFirstName", 1, "block", "text-[10px]", "font-bold", "text-slate-400", "uppercase", "mb-1"], ["id", "empFirstName", "type", "text", "formControlName", "firstName", "placeholder", "First Name", 1, "w-full", "bg-slate-950", "border", "border-slate-800", "focus:border-brand-500", "focus:ring-1", "focus:ring-brand-500", "rounded-xl", "px-3", "py-2", "text-xs", "text-slate-200", "outline-none"], ["for", "empLastName", 1, "block", "text-[10px]", "font-bold", "text-slate-400", "uppercase", "mb-1"], ["id", "empLastName", "type", "text", "formControlName", "lastName", "placeholder", "Last Name", 1, "w-full", "bg-slate-950", "border", "border-slate-800", "focus:border-brand-500", "focus:ring-1", "focus:ring-brand-500", "rounded-xl", "px-3", "py-2", "text-xs", "text-slate-200", "outline-none"], ["for", "empDojInput", 1, "block", "text-[10px]", "font-bold", "text-slate-400", "uppercase", "mb-1"], ["id", "empDojInput", "type", "date", "formControlName", "dateOfJoining", 1, "w-full", "bg-slate-950", "border", "border-slate-800", "focus:border-brand-500", "focus:ring-1", "focus:ring-brand-500", "rounded-xl", "px-3", "py-2", "text-xs", "text-slate-200", "outline-none"], ["for", "empTypeSelect", 1, "block", "text-[10px]", "font-bold", "text-slate-400", "uppercase", "mb-1"], ["id", "empTypeSelect", "formControlName", "employmentType", 1, "w-full", "bg-slate-950", "border", "border-slate-800", "focus:border-brand-500", "focus:ring-1", "focus:ring-brand-500", "rounded-xl", "px-3", "py-2", "text-xs", "text-slate-200", "outline-none", "cursor-pointer"], ["value", "FullTime"], ["value", "Contractor"], ["value", "PartTime"], ["for", "empDeptSelect", 1, "block", "text-[10px]", "font-bold", "text-slate-400", "uppercase", "mb-1"], ["id", "empDeptSelect", "formControlName", "departmentId", 1, "w-full", "bg-slate-950", "border", "border-slate-800", "focus:border-brand-500", "focus:ring-1", "focus:ring-brand-500", "rounded-xl", "px-3", "py-2", "text-xs", "text-slate-200", "outline-none", "cursor-pointer"], [3, "value"], [1, "flex", "items-center", "justify-end", "space-x-3", "pt-6", "border-t", "border-slate-800/50"], ["type", "button", 1, "text-xs", "text-slate-400", "hover:text-white", "px-4", "py-2", "font-medium", 3, "click"], ["id", "enrollEmployeeBtn", "type", "submit", 1, "bg-brand-600", "hover:bg-brand-500", "disabled:opacity-50", "text-white", "text-xs", "font-semibold", "px-5", "py-2.5", "rounded-xl", "transition-all", 3, "disabled"], [1, "w-full", "max-w-sm", "bg-slate-900", "border", "border-slate-800", "rounded-3xl", "p-6", "shadow-2xl", "animate-fade-in"], [1, "flex", "items-center", "space-x-3", "mb-4"], [1, "p-2", "bg-red-500/10", "border", "border-red-500/20", "rounded-xl"], [1, "material-icons", "text-red-400"], [1, "text-base", "font-bold", "text-white"], [1, "text-slate-200"], [1, "text-brand-400"], [1, "flex", "items-center", "justify-end", "space-x-3", "pt-4", "border-t", "border-slate-800/50"], [1, "text-xs", "text-slate-400", "hover:text-white", "px-3", "py-1.5", "font-medium", 3, "click"], [1, "bg-red-600", "hover:bg-red-500", "text-white", "text-xs", "font-semibold", "px-4", "py-2", "rounded-xl", "transition-all", 3, "click"], [1, "text-base", "font-bold", "text-white", "mb-1"], [1, "space-y-4"], ["for", "transferDeptSelect", 1, "block", "text-[10px]", "font-bold", "text-slate-400", "uppercase", "mb-1"], ["id", "transferDeptSelect", 1, "w-full", "bg-slate-950", "border", "border-slate-800", "rounded-xl", "px-3", "py-2", "text-xs", "text-slate-200", "outline-none", 3, "ngModelChange", "ngModel"], [1, "bg-brand-600", "hover:bg-brand-500", "text-white", "text-xs", "font-semibold", "px-4", "py-2", "rounded-xl", "transition-all", 3, "click"], ["for", "terminationDateInput", 1, "block", "text-[10px]", "font-bold", "text-slate-400", "uppercase", "mb-1"], ["id", "terminationDateInput", "type", "date", 1, "w-full", "bg-slate-950", "border", "border-slate-800", "rounded-xl", "px-3", "py-2", "text-xs", "text-slate-200", "outline-none", 3, "ngModelChange", "ngModel"], ["for", "terminationReasonInput", 1, "block", "text-[10px]", "font-bold", "text-slate-400", "uppercase", "mb-1"], ["id", "terminationReasonInput", "placeholder", "Reason for termination...", 1, "w-full", "bg-slate-950", "border", "border-slate-800", "rounded-xl", "px-3", "py-2", "text-xs", "text-slate-200", "outline-none", "h-20", "resize-none", 3, "ngModelChange", "ngModel"]], template: function EmployeeListComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div")(3, "h1", 2);
      \u0275\u0275text(4, "Workforce Management");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(5, "p", 3);
      \u0275\u0275text(6, "Manage directory details, departments transfers, and termination events.");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(7, "button", 4);
      \u0275\u0275listener("click", function EmployeeListComponent_Template_button_click_7_listener() {
        return ctx.openAddModal();
      });
      \u0275\u0275elementStart(8, "span", 5);
      \u0275\u0275text(9, "person_add");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(10, "span");
      \u0275\u0275text(11, "Add Employee");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(12, "div", 6)(13, "div", 7)(14, "span", 8);
      \u0275\u0275text(15, "search");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(16, "input", 9);
      \u0275\u0275twoWayListener("ngModelChange", function EmployeeListComponent_Template_input_ngModelChange_16_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.searchQuery, $event) || (ctx.searchQuery = $event);
        return $event;
      });
      \u0275\u0275listener("input", function EmployeeListComponent_Template_input_input_16_listener() {
        return ctx.onSearchInput();
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(17, "div", 10)(18, "span", 11);
      \u0275\u0275text(19, "Active Tenant isolation: ");
      \u0275\u0275elementStart(20, "strong");
      \u0275\u0275text(21);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(22, "span", 12);
      \u0275\u0275text(23);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(24, "div", 13)(25, "div", 14)(26, "table", 15)(27, "thead")(28, "tr", 16)(29, "th", 17);
      \u0275\u0275text(30, "Employee Code");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(31, "th", 17);
      \u0275\u0275text(32, "Full Name");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(33, "th", 17);
      \u0275\u0275text(34, "Email");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(35, "th", 17);
      \u0275\u0275text(36, "Department & Role");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(37, "th", 17);
      \u0275\u0275text(38, "Status");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(39, "th", 17);
      \u0275\u0275text(40, "Joined Date");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(41, "th", 18);
      \u0275\u0275text(42, "Actions");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(43, "tbody", 19);
      \u0275\u0275repeaterCreate(44, EmployeeListComponent_For_45_Template, 29, 18, "tr", 20, _forTrack0, false, EmployeeListComponent_ForEmpty_46_Template, 3, 0, "tr");
      \u0275\u0275elementEnd()()();
      \u0275\u0275template(47, EmployeeListComponent_Conditional_47_Template, 12, 2, "div", 21);
      \u0275\u0275elementEnd();
      \u0275\u0275template(48, EmployeeListComponent_Conditional_48_Template, 58, 9, "div", 22)(49, EmployeeListComponent_Conditional_49_Template, 21, 3, "div", 22)(50, EmployeeListComponent_Conditional_50_Template, 21, 3, "div", 22)(51, EmployeeListComponent_Conditional_51_Template, 23, 4, "div", 22);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance(16);
      \u0275\u0275twoWayProperty("ngModel", ctx.searchQuery);
      \u0275\u0275advance(5);
      \u0275\u0275textInterpolate1("", ctx.tenantService.getActiveTenant().countryCode, " Rules");
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate3(" Page ", ctx.currentPage, " of ", ctx.totalPages || 1, " (", ctx.totalCount, " records) ");
      \u0275\u0275advance(21);
      \u0275\u0275repeater(ctx.employees);
      \u0275\u0275advance(3);
      \u0275\u0275conditional(ctx.totalPages > 1 ? 47 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.showAddModal ? 48 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.showDeleteConfirmModal && ctx.pendingDeleteEmp ? 49 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.showTransferModal && ctx.selectedEmp ? 50 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.showTerminateModal && ctx.selectedEmp ? 51 : -1);
    }
  }, dependencies: [CommonModule, NgClass, DatePipe, FormsModule, \u0275NgNoValidate, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, SelectControlValueAccessor, NgControlStatus, NgControlStatusGroup, NgModel, ReactiveFormsModule, FormGroupDirective, FormControlName], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(EmployeeListComponent, { className: "EmployeeListComponent", filePath: "src\\app\\features\\employees\\employee-list.component.ts", lineNumber: 337 });
})();
export {
  EmployeeListComponent
};
//# sourceMappingURL=chunk-OU64C22I.js.map
