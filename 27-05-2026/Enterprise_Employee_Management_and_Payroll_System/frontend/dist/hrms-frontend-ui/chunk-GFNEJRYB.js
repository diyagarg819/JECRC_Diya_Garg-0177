import {
  DefaultValueAccessor,
  FormsModule,
  NgControlStatus,
  NgControlStatusGroup,
  NgForm,
  NgModel,
  NgSelectOption,
  SelectControlValueAccessor,
  ɵNgNoValidate,
  ɵNgSelectMultipleOption
} from "./chunk-7UGTWGHG.js";
import {
  AuthService,
  CommonModule,
  DatePipe,
  HttpClient,
  NgClass,
  NgForOf,
  NgIf,
  NgStyle,
  TenantService,
  inject,
  ɵsetClassDebugInfo,
  ɵɵStandaloneFeature,
  ɵɵadvance,
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
  ɵɵpureFunction2,
  ɵɵpureFunction3,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-XVQVZOM4.js";

// src/app/features/leave/leave-management.component.ts
var _c0 = (a0, a1, a2) => ({ "background-color": a0, "color": a1, "border": a2 });
var _c1 = (a0, a1) => ({ "background-color": a0, "width": a1 });
var _c2 = (a0, a1, a2) => ({ "bg-emerald-500/10 text-emerald-400 border-emerald-500/25": a0, "bg-amber-500/10 text-amber-400 border-amber-500/25": a1, "bg-rose-500/10 text-rose-400 border-rose-500/25": a2 });
var _c3 = (a0, a1, a2) => ({ "bg-emerald-400": a0, "bg-amber-400": a1, "bg-rose-400": a2 });
function LeaveManagementComponent_div_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 33)(1, "div", 34)(2, "span", 35);
    \u0275\u0275text(3, "date_range");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "div", 36)(5, "span", 37);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "span", 38);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "div", 39)(10, "div", 40);
    \u0275\u0275text(11);
    \u0275\u0275elementStart(12, "span", 41);
    \u0275\u0275text(13, "days");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(14, "div", 42);
    \u0275\u0275element(15, "div", 43);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "div", 44)(17, "span");
    \u0275\u0275text(18);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "span");
    \u0275\u0275text(20);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const balance_r1 = ctx.$implicit;
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(balance_r1.leaveTypeName);
    \u0275\u0275advance();
    \u0275\u0275property("ngStyle", \u0275\u0275pureFunction3(7, _c0, balance_r1.color + "15", balance_r1.color, "1px solid " + balance_r1.color + "30"));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", balance_r1.available, " left ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("", balance_r1.available, " ");
    \u0275\u0275advance(4);
    \u0275\u0275property("ngStyle", \u0275\u0275pureFunction2(11, _c1, balance_r1.color, balance_r1.used / balance_r1.allocated * 100 + "%"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("Used: ", balance_r1.used, " days");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("Max: ", balance_r1.allocated, "");
  }
}
function LeaveManagementComponent_div_22_div_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 53)(1, "span", 54);
    \u0275\u0275text(2, "done_all");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span");
    \u0275\u0275text(4, "All approvals cleared! No pending requests.");
    \u0275\u0275elementEnd()();
  }
}
function LeaveManagementComponent_div_22_div_10_div_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 66);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const request_r3 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(' "', request_r3.reason, '" ');
  }
}
function LeaveManagementComponent_div_22_div_10_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 55)(1, "div", 39)(2, "div", 56)(3, "span", 57);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "span", 58);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div", 59);
    \u0275\u0275text(8, " Requested ");
    \u0275\u0275elementStart(9, "span", 60);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd();
    \u0275\u0275text(11, ": ");
    \u0275\u0275elementStart(12, "span", 61);
    \u0275\u0275text(13);
    \u0275\u0275pipe(14, "date");
    \u0275\u0275elementEnd();
    \u0275\u0275text(15, " to ");
    \u0275\u0275elementStart(16, "span", 61);
    \u0275\u0275text(17);
    \u0275\u0275pipe(18, "date");
    \u0275\u0275elementEnd();
    \u0275\u0275text(19);
    \u0275\u0275elementEnd();
    \u0275\u0275template(20, LeaveManagementComponent_div_22_div_10_div_20_Template, 2, 1, "div", 62);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "div", 63)(22, "button", 64);
    \u0275\u0275listener("click", function LeaveManagementComponent_div_22_div_10_Template_button_click_22_listener() {
      const request_r3 = \u0275\u0275restoreView(_r2).$implicit;
      const ctx_r3 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r3.approveRequest(request_r3.id));
    });
    \u0275\u0275elementStart(23, "span", 32);
    \u0275\u0275text(24, "check");
    \u0275\u0275elementEnd();
    \u0275\u0275text(25, " Approve ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(26, "button", 65);
    \u0275\u0275listener("click", function LeaveManagementComponent_div_22_div_10_Template_button_click_26_listener() {
      const request_r3 = \u0275\u0275restoreView(_r2).$implicit;
      const ctx_r3 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r3.rejectRequest(request_r3.id));
    });
    \u0275\u0275elementStart(27, "span", 32);
    \u0275\u0275text(28, "close");
    \u0275\u0275elementEnd();
    \u0275\u0275text(29, " Reject ");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const request_r3 = ctx.$implicit;
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(request_r3.employeeName);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("(", request_r3.employeeEmail, ")");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(request_r3.leaveTypeName);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(14, 7, request_r3.startDate, "MMM d"));
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(18, 10, request_r3.endDate, "MMM d, y"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" (", request_r3.totalDays, " days) ");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", request_r3.reason);
  }
}
function LeaveManagementComponent_div_22_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 45)(1, "div", 46)(2, "h2", 47)(3, "span", 48);
    \u0275\u0275text(4, "approval_delegation");
    \u0275\u0275elementEnd();
    \u0275\u0275text(5, " Workflow Inbox (Manager Approvals) ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "span", 49);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()();
    \u0275\u0275template(8, LeaveManagementComponent_div_22_div_8_Template, 5, 0, "div", 50);
    \u0275\u0275elementStart(9, "div", 51);
    \u0275\u0275template(10, LeaveManagementComponent_div_22_div_10_Template, 30, 13, "div", 52);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate1(" ", ctx_r3.getPendingApprovalsCount(), " pending ");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r3.getPendingApprovalsCount() === 0);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngForOf", ctx_r3.pendingApprovals);
  }
}
function LeaveManagementComponent_div_28_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 67);
    \u0275\u0275text(1, " No leave requests found. ");
    \u0275\u0275elementEnd();
  }
}
function LeaveManagementComponent_div_29_tr_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr", 76)(1, "td", 77);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "td", 78);
    \u0275\u0275text(4);
    \u0275\u0275pipe(5, "date");
    \u0275\u0275pipe(6, "date");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "td", 79);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "td", 80);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "td", 81)(12, "span", 82);
    \u0275\u0275element(13, "span", 83);
    \u0275\u0275text(14);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(15, "td", 84);
    \u0275\u0275text(16);
    \u0275\u0275pipe(17, "date");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const req_r5 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(req_r5.leaveTypeName);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2(" ", \u0275\u0275pipeBind2(5, 10, req_r5.startDate, "mediumDate"), " to ", \u0275\u0275pipeBind2(6, 13, req_r5.endDate, "mediumDate"), " ");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(req_r5.totalDays);
    \u0275\u0275advance();
    \u0275\u0275property("title", req_r5.reason);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(req_r5.reason || "\u2014");
    \u0275\u0275advance(2);
    \u0275\u0275property("ngClass", \u0275\u0275pureFunction3(19, _c2, req_r5.status === "Approved", req_r5.status === "Pending", req_r5.status === "Rejected"));
    \u0275\u0275advance();
    \u0275\u0275property("ngClass", \u0275\u0275pureFunction3(23, _c3, req_r5.status === "Approved", req_r5.status === "Pending", req_r5.status === "Rejected"));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", req_r5.status, " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(17, 16, req_r5.createdAt, "shortDate"), " ");
  }
}
function LeaveManagementComponent_div_29_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 68)(1, "table", 69)(2, "thead")(3, "tr", 70)(4, "th", 71);
    \u0275\u0275text(5, "Leave Type");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "th", 71);
    \u0275\u0275text(7, "Period");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "th", 72);
    \u0275\u0275text(9, "Days");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "th", 71);
    \u0275\u0275text(11, "Reason");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "th", 71);
    \u0275\u0275text(13, "Status");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "th", 73);
    \u0275\u0275text(15, "Submitted");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(16, "tbody", 74);
    \u0275\u0275template(17, LeaveManagementComponent_div_29_tr_17_Template, 18, 27, "tr", 75);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275advance(17);
    \u0275\u0275property("ngForOf", ctx_r3.userRequests);
  }
}
function LeaveManagementComponent_option_43_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 85);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const type_r6 = ctx.$implicit;
    \u0275\u0275property("value", type_r6.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2(" ", type_r6.name, " (Max: ", type_r6.maxDays, "d) ");
  }
}
function LeaveManagementComponent_div_52_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 86)(1, "span", 87);
    \u0275\u0275text(2, "Total Requested Duration:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 88);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate2("", ctx_r3.computedDays, " ", ctx_r3.computedDays === 1 ? "day" : "days", "");
  }
}
function LeaveManagementComponent_div_57_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 89)(1, "span", 90);
    \u0275\u0275text(2, "error_outline");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r3.formError);
  }
}
function LeaveManagementComponent_div_58_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 91)(1, "span", 90);
    \u0275\u0275text(2, "check_circle_outline");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r3.formSuccess);
  }
}
var LeaveManagementComponent = class _LeaveManagementComponent {
  tenantService = inject(TenantService);
  authService = inject(AuthService);
  http = inject(HttpClient);
  tenantName = "Capgemini India";
  isManager = false;
  // Raw Leave Types definitions
  leaveTypes = [
    { id: "1", name: "Casual Leave", maxDays: 12, allowNegativeBalance: false, isCarryForward: false, isLwp: false, color: "#38bdf8" },
    { id: "2", name: "Sick Leave", maxDays: 10, allowNegativeBalance: false, isCarryForward: false, isLwp: false, color: "#f59e0b" },
    { id: "3", name: "Earned Leave", maxDays: 18, allowNegativeBalance: false, isCarryForward: true, isLwp: false, color: "#10b981" },
    { id: "4", name: "Leave Without Pay", maxDays: 365, allowNegativeBalance: true, isCarryForward: false, isLwp: true, color: "#a855f7" }
  ];
  // Dynamic state
  balances = [];
  userRequests = [];
  pendingApprovals = [];
  // Form binds
  newRequest = {
    leaveTypeId: "",
    startDate: "",
    endDate: "",
    reason: ""
  };
  computedDays = 0;
  formError = "";
  formSuccess = "";
  ngOnInit() {
    const user = this.authService.currentUser();
    this.isManager = this.authService.hasRole(["HR", "SuperAdmin", "PayrollAdmin"]);
    if (user?.tenantId === "7f04c0cf-031e-450f-a189-e1fca9473fa7") {
      this.tenantName = "Capgemini USA";
      this.leaveTypes = [
        { id: "5", name: "Paid Time Off (PTO)", maxDays: 25, allowNegativeBalance: false, isCarryForward: true, isLwp: false, color: "#38bdf8" },
        { id: "4", name: "Leave Without Pay", maxDays: 365, allowNegativeBalance: true, isCarryForward: false, isLwp: true, color: "#a855f7" }
      ];
    } else {
      this.tenantName = "Capgemini India";
    }
    this.loadBalancesAndRequests();
  }
  getPendingApprovalsCount() {
    return this.pendingApprovals.length;
  }
  loadBalancesAndRequests() {
    const user = this.authService.currentUser();
    if (!user)
      return;
    const storageKey = `leave_requests_${user.tenantId}`;
    const rawRequests = localStorage.getItem(storageKey);
    let allRequests = [];
    if (rawRequests) {
      allRequests = JSON.parse(rawRequests);
    } else {
      allRequests = [
        {
          id: "req-1",
          employeeName: "Priya Patel",
          employeeEmail: "priya.patel@capgemini-in.com",
          leaveTypeName: "Sick Leave",
          startDate: "2026-05-10",
          endDate: "2026-05-12",
          totalDays: 3,
          status: "Approved",
          reason: "Recovering from seasonal flu.",
          createdAt: new Date(2026, 4, 9).toISOString()
        },
        {
          id: "req-2",
          employeeName: "Rajesh Kumar",
          employeeEmail: "rajesh.kumar@capgemini-in.com",
          leaveTypeName: "Casual Leave",
          startDate: "2026-06-15",
          endDate: "2026-06-16",
          totalDays: 2,
          status: "Pending",
          reason: "Family gathering event.",
          createdAt: (/* @__PURE__ */ new Date()).toISOString()
        },
        {
          id: "req-3",
          employeeName: "Amit Sharma",
          employeeEmail: "amit.sharma@capgemini-in.com",
          leaveTypeName: "Earned Leave",
          startDate: "2026-07-20",
          endDate: "2026-07-25",
          totalDays: 6,
          status: "Pending",
          reason: "Summer vacation trip.",
          createdAt: (/* @__PURE__ */ new Date()).toISOString()
        }
      ];
      localStorage.setItem(storageKey, JSON.stringify(allRequests));
    }
    this.userRequests = allRequests.filter((r) => r.employeeEmail === user.email);
    this.pendingApprovals = allRequests.filter((r) => r.status === "Pending" && r.employeeEmail !== user.email);
    this.balances = this.leaveTypes.map((type) => {
      const used = this.userRequests.filter((r) => r.leaveTypeName === type.name && r.status === "Approved").reduce((sum, r) => sum + r.totalDays, 0);
      const available = Math.max(0, type.maxDays - used);
      return {
        leaveTypeName: type.name,
        allocated: type.maxDays,
        used,
        available,
        color: type.color
      };
    });
  }
  calculateRequestedDays() {
    if (!this.newRequest.startDate || !this.newRequest.endDate) {
      this.computedDays = 0;
      return;
    }
    const start = new Date(this.newRequest.startDate);
    const end = new Date(this.newRequest.endDate);
    if (end < start) {
      this.computedDays = 0;
      return;
    }
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1e3 * 60 * 60 * 24)) + 1;
    this.computedDays = diffDays;
  }
  submitLeaveRequest() {
    this.formError = "";
    this.formSuccess = "";
    const user = this.authService.currentUser();
    if (!user)
      return;
    if (!this.newRequest.leaveTypeId) {
      this.formError = "Please select a leave type.";
      return;
    }
    if (!this.newRequest.startDate || !this.newRequest.endDate) {
      this.formError = "Please choose start and end dates.";
      return;
    }
    const start = new Date(this.newRequest.startDate);
    const end = new Date(this.newRequest.endDate);
    if (end < start) {
      this.formError = "End date cannot be prior to start date.";
      return;
    }
    const selectedType = this.leaveTypes.find((t) => t.id === this.newRequest.leaveTypeId);
    if (!selectedType)
      return;
    const balanceObj = this.balances.find((b) => b.leaveTypeName === selectedType.name);
    if (balanceObj && this.computedDays > balanceObj.available && !selectedType.allowNegativeBalance) {
      this.formError = `Insufficient balance. You only have ${balanceObj.available} days left for ${selectedType.name}.`;
      return;
    }
    const hasOverlap = this.userRequests.some((r) => {
      if (r.status === "Rejected")
        return false;
      const rStart = new Date(r.startDate);
      const rEnd = new Date(r.endDate);
      return start <= rEnd && end >= rStart;
    });
    if (hasOverlap) {
      this.formError = "Overlap error: You already have a pending/approved leave request during this date range.";
      return;
    }
    const storageKey = `leave_requests_${user.tenantId}`;
    const rawRequests = localStorage.getItem(storageKey);
    const allRequests = rawRequests ? JSON.parse(rawRequests) : [];
    const newRequestItem = {
      id: "req-" + Date.now(),
      employeeName: user.email.split("@")[0].split(".").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" "),
      employeeEmail: user.email,
      leaveTypeName: selectedType.name,
      startDate: this.newRequest.startDate,
      endDate: this.newRequest.endDate,
      totalDays: this.computedDays,
      status: "Pending",
      reason: this.newRequest.reason,
      createdAt: (/* @__PURE__ */ new Date()).toISOString()
    };
    allRequests.unshift(newRequestItem);
    localStorage.setItem(storageKey, JSON.stringify(allRequests));
    this.newRequest = { leaveTypeId: "", startDate: "", endDate: "", reason: "" };
    this.computedDays = 0;
    this.formSuccess = "Your leave request has been submitted successfully and routed into manager approval workflows.";
    this.loadBalancesAndRequests();
  }
  approveRequest(id) {
    this.updateRequestStatus(id, "Approved");
  }
  rejectRequest(id) {
    this.updateRequestStatus(id, "Rejected");
  }
  updateRequestStatus(id, status) {
    const user = this.authService.currentUser();
    if (!user)
      return;
    const storageKey = `leave_requests_${user.tenantId}`;
    const rawRequests = localStorage.getItem(storageKey);
    if (!rawRequests)
      return;
    const allRequests = JSON.parse(rawRequests);
    const targetIdx = allRequests.findIndex((r) => r.id === id);
    if (targetIdx !== -1) {
      allRequests[targetIdx].status = status;
      localStorage.setItem(storageKey, JSON.stringify(allRequests));
      this.loadBalancesAndRequests();
    }
  }
  static \u0275fac = function LeaveManagementComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _LeaveManagementComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _LeaveManagementComponent, selectors: [["app-leave-management"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 63, vars: 13, consts: [[1, "space-y-8", "animate-fade-in", "text-slate-100"], [1, "flex", "flex-col", "md:flex-row", "md:items-center", "md:justify-between", "gap-4"], [1, "text-2xl", "font-bold", "tracking-tight", "text-white", "flex", "items-center", "gap-2"], [1, "material-icons", "text-brand-400"], [1, "text-xs", "text-slate-400", "mt-0.5"], [1, "flex", "items-center", "gap-2", "bg-slate-900/60", "border", "border-slate-800", "px-3.5", "py-2", "rounded-xl"], [1, "w-2", "h-2", "rounded-full", "bg-emerald-500", "animate-pulse"], [1, "text-[10px]", "font-semibold", "text-slate-300", "uppercase", "tracking-wider"], [1, "grid", "grid-cols-1", "lg:grid-cols-12", "gap-8"], [1, "lg:col-span-8", "space-y-8"], [1, "glass-card", "p-6"], [1, "text-sm", "font-bold", "text-white", "mb-5", "flex", "items-center", "gap-2"], [1, "material-icons", "text-xs", "text-brand-400"], [1, "grid", "grid-cols-1", "sm:grid-cols-3", "gap-6"], ["class", "bg-slate-950/40 border border-slate-800/80 p-4.5 rounded-2xl relative overflow-hidden group hover:border-slate-700 transition duration-300", 4, "ngFor", "ngForOf"], ["class", "glass-card p-6 border-amber-500/20 bg-gradient-to-br from-slate-900/90 to-slate-950/95", 4, "ngIf"], ["class", "text-center py-8 text-slate-500 text-xs", 4, "ngIf"], ["class", "overflow-x-auto", 4, "ngIf"], [1, "lg:col-span-4"], [1, "glass-card", "p-6", "sticky", "top-24"], [1, "space-y-4", 3, "submit"], [1, "block", "text-[10px]", "font-bold", "text-slate-400", "uppercase", "tracking-wide", "mb-1.5"], ["name", "leaveTypeId", 1, "w-full", "bg-slate-950", "border", "border-slate-800", "text-xs", "text-slate-200", "rounded-xl", "px-3.5", "py-2.5", "focus:border-brand-500", "focus:ring-1", "focus:ring-brand-500/25", "outline-none", "transition", 3, "ngModelChange", "ngModel"], ["value", "", "disabled", "", "selected", ""], [3, "value", 4, "ngFor", "ngForOf"], ["type", "date", "name", "startDate", 1, "w-full", "bg-slate-950", "border", "border-slate-800", "text-xs", "text-slate-200", "rounded-xl", "px-3.5", "py-2.5", "focus:border-brand-500", "focus:ring-1", "focus:ring-brand-500/25", "outline-none", "transition", 3, "ngModelChange", "change", "ngModel"], ["type", "date", "name", "endDate", 1, "w-full", "bg-slate-950", "border", "border-slate-800", "text-xs", "text-slate-200", "rounded-xl", "px-3.5", "py-2.5", "focus:border-brand-500", "focus:ring-1", "focus:ring-brand-500/25", "outline-none", "transition", 3, "ngModelChange", "change", "ngModel"], ["class", "bg-slate-950/60 border border-slate-800/80 p-3.5 rounded-xl flex items-center justify-between text-xs", 4, "ngIf"], ["name", "reason", "rows", "3", "placeholder", "Enter reason for leave...", 1, "w-full", "bg-slate-950", "border", "border-slate-800", "text-xs", "text-slate-200", "rounded-xl", "px-3.5", "py-2.5", "focus:border-brand-500", "focus:ring-1", "focus:ring-brand-500/25", "outline-none", "transition", "resize-none", 3, "ngModelChange", "ngModel"], ["class", "bg-rose-500/10 border border-rose-500/20 p-3.5 rounded-xl flex items-start gap-2.5 text-[11px] text-rose-400", 4, "ngIf"], ["class", "bg-emerald-500/10 border border-emerald-500/20 p-3.5 rounded-xl flex items-start gap-2.5 text-[11px] text-emerald-400", 4, "ngIf"], ["type", "submit", 1, "w-full", "bg-brand-600", "hover:bg-brand-500", "text-white", "rounded-xl", "py-3", "text-xs", "font-bold", "transition", "flex", "items-center", "justify-center", "gap-1"], [1, "material-icons", "text-sm"], [1, "bg-slate-950/40", "border", "border-slate-800/80", "p-4.5", "rounded-2xl", "relative", "overflow-hidden", "group", "hover:border-slate-700", "transition", "duration-300"], [1, "absolute", "-right-2", "-bottom-2", "opacity-5", "text-slate-200", "group-hover:scale-110", "transition", "duration-300"], [1, "material-icons", "text-7xl"], [1, "flex", "justify-between", "items-start", "mb-3"], [1, "text-xs", "font-semibold", "text-slate-300"], [1, "text-[10px]", "px-2", "py-0.5", "rounded-full", "font-bold", "uppercase", 3, "ngStyle"], [1, "space-y-1"], [1, "text-2xl", "font-bold", "text-white", "tracking-tight"], [1, "text-xs", "text-slate-500", "font-normal"], [1, "w-full", "bg-slate-800/80", "rounded-full", "h-1.5", "overflow-hidden"], [1, "h-full", "rounded-full", "transition-all", "duration-500", 3, "ngStyle"], [1, "flex", "justify-between", "text-[9px]", "text-slate-400", "pt-1"], [1, "glass-card", "p-6", "border-amber-500/20", "bg-gradient-to-br", "from-slate-900/90", "to-slate-950/95"], [1, "flex", "items-center", "justify-between", "mb-5"], [1, "text-sm", "font-bold", "text-white", "flex", "items-center", "gap-2"], [1, "material-icons", "text-sm", "text-amber-400"], [1, "bg-amber-500/10", "text-amber-400", "border", "border-amber-500/20", "text-[9px]", "font-bold", "px-2", "py-0.5", "rounded-full"], ["class", "flex flex-col items-center justify-center py-6 text-slate-500 text-xs", 4, "ngIf"], [1, "space-y-4"], ["class", "bg-slate-950/60 border border-slate-800 p-4 rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-4", 4, "ngFor", "ngForOf"], [1, "flex", "flex-col", "items-center", "justify-center", "py-6", "text-slate-500", "text-xs"], [1, "material-icons", "text-2xl", "text-slate-600", "mb-2"], [1, "bg-slate-950/60", "border", "border-slate-800", "p-4", "rounded-xl", "flex", "flex-col", "md:flex-row", "md:items-center", "justify-between", "gap-4"], [1, "flex", "items-center", "gap-2"], [1, "text-xs", "font-bold", "text-slate-200"], [1, "text-[9px]", "text-slate-400"], [1, "text-[11px]", "text-slate-300"], [1, "text-brand-400", "font-semibold"], [1, "text-slate-200", "font-medium"], ["class", "text-[10px] text-slate-400 italic bg-slate-900/50 p-2 rounded border border-slate-800/60 mt-1.5", 4, "ngIf"], [1, "flex", "items-center", "gap-2.5"], [1, "px-3", "py-1.5", "bg-emerald-600", "hover:bg-emerald-500", "text-white", "rounded-lg", "text-[10px]", "font-bold", "flex", "items-center", "gap-1", "transition", 3, "click"], [1, "px-3", "py-1.5", "bg-rose-600", "hover:bg-rose-500", "text-white", "rounded-lg", "text-[10px]", "font-bold", "flex", "items-center", "gap-1", "transition", 3, "click"], [1, "text-[10px]", "text-slate-400", "italic", "bg-slate-900/50", "p-2", "rounded", "border", "border-slate-800/60", "mt-1.5"], [1, "text-center", "py-8", "text-slate-500", "text-xs"], [1, "overflow-x-auto"], [1, "w-full", "text-left", "text-xs", "border-collapse"], [1, "border-b", "border-slate-800", "text-slate-400", "font-semibold", "uppercase", "text-[9px]", "tracking-wider"], [1, "py-3", "px-4"], [1, "py-3", "px-4", "text-center"], [1, "py-3", "px-4", "text-right"], [1, "divide-y", "divide-slate-800/60"], ["class", "hover:bg-slate-900/30 transition duration-150", 4, "ngFor", "ngForOf"], [1, "hover:bg-slate-900/30", "transition", "duration-150"], [1, "py-3.5", "px-4", "text-slate-200", "font-medium"], [1, "py-3.5", "px-4", "text-slate-300"], [1, "py-3.5", "px-4", "text-center", "text-slate-200", "font-bold"], [1, "py-3.5", "px-4", "text-slate-400", "max-w-xs", "truncate", 3, "title"], [1, "py-3.5", "px-4"], [1, "px-2.5", "py-0.5", "rounded-full", "text-[9px]", "font-bold", "uppercase", "inline-flex", "items-center", "gap-1", "border", 3, "ngClass"], [1, "w-1", "h-1", "rounded-full", 3, "ngClass"], [1, "py-3.5", "px-4", "text-right", "text-slate-500", "text-[10px]"], [3, "value"], [1, "bg-slate-950/60", "border", "border-slate-800/80", "p-3.5", "rounded-xl", "flex", "items-center", "justify-between", "text-xs"], [1, "text-slate-400"], [1, "font-bold", "text-white"], [1, "bg-rose-500/10", "border", "border-rose-500/20", "p-3.5", "rounded-xl", "flex", "items-start", "gap-2.5", "text-[11px]", "text-rose-400"], [1, "material-icons", "text-xs", "mt-0.5"], [1, "bg-emerald-500/10", "border", "border-emerald-500/20", "p-3.5", "rounded-xl", "flex", "items-start", "gap-2.5", "text-[11px]", "text-emerald-400"]], template: function LeaveManagementComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div")(3, "h1", 2)(4, "span", 3);
      \u0275\u0275text(5, "event_busy");
      \u0275\u0275elementEnd();
      \u0275\u0275text(6, " Leave & Workflow Management ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(7, "p", 4);
      \u0275\u0275text(8, "Submit request forms, view real-time leave balances, track approval status, and manage manager workflows.");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(9, "div", 5);
      \u0275\u0275element(10, "span", 6);
      \u0275\u0275elementStart(11, "span", 7);
      \u0275\u0275text(12);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(13, "div", 8)(14, "div", 9)(15, "div", 10)(16, "h2", 11)(17, "span", 12);
      \u0275\u0275text(18, "pie_chart");
      \u0275\u0275elementEnd();
      \u0275\u0275text(19, " Your Leave Balances ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(20, "div", 13);
      \u0275\u0275template(21, LeaveManagementComponent_div_21_Template, 21, 14, "div", 14);
      \u0275\u0275elementEnd()();
      \u0275\u0275template(22, LeaveManagementComponent_div_22_Template, 11, 3, "div", 15);
      \u0275\u0275elementStart(23, "div", 10)(24, "h2", 11)(25, "span", 12);
      \u0275\u0275text(26, "history");
      \u0275\u0275elementEnd();
      \u0275\u0275text(27, " Your Request History ");
      \u0275\u0275elementEnd();
      \u0275\u0275template(28, LeaveManagementComponent_div_28_Template, 2, 0, "div", 16)(29, LeaveManagementComponent_div_29_Template, 18, 1, "div", 17);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(30, "div", 18)(31, "div", 19)(32, "h2", 11)(33, "span", 3);
      \u0275\u0275text(34, "add_task");
      \u0275\u0275elementEnd();
      \u0275\u0275text(35, " Request Leave ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(36, "form", 20);
      \u0275\u0275listener("submit", function LeaveManagementComponent_Template_form_submit_36_listener() {
        return ctx.submitLeaveRequest();
      });
      \u0275\u0275elementStart(37, "div")(38, "label", 21);
      \u0275\u0275text(39, "Leave Type");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(40, "select", 22);
      \u0275\u0275twoWayListener("ngModelChange", function LeaveManagementComponent_Template_select_ngModelChange_40_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.newRequest.leaveTypeId, $event) || (ctx.newRequest.leaveTypeId = $event);
        return $event;
      });
      \u0275\u0275elementStart(41, "option", 23);
      \u0275\u0275text(42, "Select type...");
      \u0275\u0275elementEnd();
      \u0275\u0275template(43, LeaveManagementComponent_option_43_Template, 2, 3, "option", 24);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(44, "div")(45, "label", 21);
      \u0275\u0275text(46, "Start Date");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(47, "input", 25);
      \u0275\u0275twoWayListener("ngModelChange", function LeaveManagementComponent_Template_input_ngModelChange_47_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.newRequest.startDate, $event) || (ctx.newRequest.startDate = $event);
        return $event;
      });
      \u0275\u0275listener("change", function LeaveManagementComponent_Template_input_change_47_listener() {
        return ctx.calculateRequestedDays();
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(48, "div")(49, "label", 21);
      \u0275\u0275text(50, "End Date");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(51, "input", 26);
      \u0275\u0275twoWayListener("ngModelChange", function LeaveManagementComponent_Template_input_ngModelChange_51_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.newRequest.endDate, $event) || (ctx.newRequest.endDate = $event);
        return $event;
      });
      \u0275\u0275listener("change", function LeaveManagementComponent_Template_input_change_51_listener() {
        return ctx.calculateRequestedDays();
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275template(52, LeaveManagementComponent_div_52_Template, 5, 2, "div", 27);
      \u0275\u0275elementStart(53, "div")(54, "label", 21);
      \u0275\u0275text(55, "Reason / Comments");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(56, "textarea", 28);
      \u0275\u0275twoWayListener("ngModelChange", function LeaveManagementComponent_Template_textarea_ngModelChange_56_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.newRequest.reason, $event) || (ctx.newRequest.reason = $event);
        return $event;
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275template(57, LeaveManagementComponent_div_57_Template, 5, 1, "div", 29)(58, LeaveManagementComponent_div_58_Template, 5, 1, "div", 30);
      \u0275\u0275elementStart(59, "button", 31)(60, "span", 32);
      \u0275\u0275text(61, "send");
      \u0275\u0275elementEnd();
      \u0275\u0275text(62, " Submit Request ");
      \u0275\u0275elementEnd()()()()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(12);
      \u0275\u0275textInterpolate1("Tenant Schema: ", ctx.tenantName, "");
      \u0275\u0275advance(9);
      \u0275\u0275property("ngForOf", ctx.balances);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.isManager);
      \u0275\u0275advance(6);
      \u0275\u0275property("ngIf", ctx.userRequests.length === 0);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.userRequests.length > 0);
      \u0275\u0275advance(11);
      \u0275\u0275twoWayProperty("ngModel", ctx.newRequest.leaveTypeId);
      \u0275\u0275advance(3);
      \u0275\u0275property("ngForOf", ctx.leaveTypes);
      \u0275\u0275advance(4);
      \u0275\u0275twoWayProperty("ngModel", ctx.newRequest.startDate);
      \u0275\u0275advance(4);
      \u0275\u0275twoWayProperty("ngModel", ctx.newRequest.endDate);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.computedDays > 0);
      \u0275\u0275advance(4);
      \u0275\u0275twoWayProperty("ngModel", ctx.newRequest.reason);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.formError);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.formSuccess);
    }
  }, dependencies: [CommonModule, NgClass, NgForOf, NgIf, NgStyle, DatePipe, FormsModule, \u0275NgNoValidate, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, SelectControlValueAccessor, NgControlStatus, NgControlStatusGroup, NgModel, NgForm], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(LeaveManagementComponent, { className: "LeaveManagementComponent", filePath: "src\\app\\features\\leave\\leave-management.component.ts", lineNumber: 271 });
})();
export {
  LeaveManagementComponent
};
//# sourceMappingURL=chunk-GFNEJRYB.js.map
