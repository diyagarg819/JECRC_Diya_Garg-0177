import {
  DefaultValueAccessor,
  FormsModule,
  NgControlStatus,
  NgModel,
  NgSelectOption,
  SelectControlValueAccessor,
  ɵNgSelectMultipleOption
} from "./chunk-7UGTWGHG.js";
import {
  AuthService,
  CommonModule,
  DatePipe,
  DecimalPipe,
  HttpClient,
  NgClass,
  NgForOf,
  NgIf,
  TenantService,
  inject,
  interval,
  ɵsetClassDebugInfo,
  ɵɵStandaloneFeature,
  ɵɵadvance,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind2,
  ɵɵproperty,
  ɵɵpureFunction2,
  ɵɵpureFunction3,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-XVQVZOM4.js";

// src/app/features/attendance/attendance.component.ts
var _c0 = (a0, a1) => ({ "bg-rose-600 hover:bg-rose-500 ring-rose-500/25": a0, "bg-brand-600 hover:bg-brand-500 ring-brand-500/25": a1 });
var _c1 = (a0, a1) => ({ "bg-rose-500/10 border-rose-500/25 text-rose-400": a0, "bg-emerald-500/10 border-emerald-500/25 text-emerald-400": a1 });
var _c2 = (a0, a1) => ({ "bg-emerald-500": a0, "bg-rose-500": a1 });
var _c3 = (a0, a1, a2) => ({ "bg-emerald-500/10 text-emerald-400 border-emerald-500/25": a0, "bg-amber-500/10 text-amber-400 border-amber-500/25": a1, "bg-rose-500/10 text-rose-400 border-rose-500/25": a2 });
var _c4 = (a0, a1, a2) => ({ "bg-emerald-400": a0, "bg-amber-400": a1, "bg-rose-400": a2 });
function AttendanceComponent_div_33_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 54)(1, "span", 30);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275property("ngClass", \u0275\u0275pureFunction2(3, _c1, ctx_r0.consoleStatus === "error", ctx_r0.consoleStatus === "success"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r0.consoleStatus === "success" ? "check_circle" : "error", " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.consoleMessage);
  }
}
function AttendanceComponent_div_95_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 55)(1, "span", 56);
    \u0275\u0275text(2, "fingerprint");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span");
    \u0275\u0275text(4, "No punches recorded for today yet.");
    \u0275\u0275elementEnd()();
  }
}
function AttendanceComponent_div_96_div_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 59);
    \u0275\u0275element(1, "span", 60);
    \u0275\u0275elementStart(2, "div", 61)(3, "div", 62)(4, "div", 63);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "div", 64);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "div", 65);
    \u0275\u0275text(9);
    \u0275\u0275pipe(10, "date");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const punch_r2 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275property("ngClass", \u0275\u0275pureFunction2(8, _c2, punch_r2.punchType === "IN", punch_r2.punchType === "OUT"));
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1("Punch ", punch_r2.punchType, "");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("Source: ", punch_r2.source, " ", punch_r2.deviceId ? "(" + punch_r2.deviceId + ")" : "", "");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(10, 5, punch_r2.punchTime, "hh:mm:ss a"));
  }
}
function AttendanceComponent_div_96_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 57);
    \u0275\u0275template(1, AttendanceComponent_div_96_div_1_Template, 11, 11, "div", 58);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", ctx_r0.punches);
  }
}
function AttendanceComponent_div_103_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 66);
    \u0275\u0275text(1, " No consolidated logs found. Run sync to compile raw punches into daily records! ");
    \u0275\u0275elementEnd();
  }
}
function AttendanceComponent_div_104_tr_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr", 74)(1, "td", 75);
    \u0275\u0275text(2);
    \u0275\u0275pipe(3, "date");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "td", 76);
    \u0275\u0275text(5);
    \u0275\u0275pipe(6, "date");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "td", 76);
    \u0275\u0275text(8);
    \u0275\u0275pipe(9, "date");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "td", 77);
    \u0275\u0275text(11);
    \u0275\u0275pipe(12, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "td", 78);
    \u0275\u0275text(14);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "td", 79)(16, "span", 80);
    \u0275\u0275element(17, "span", 81);
    \u0275\u0275text(18);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const rec_r3 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(3, 8, rec_r3.businessDate, "mediumDate"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(rec_r3.checkIn ? \u0275\u0275pipeBind2(6, 11, rec_r3.checkIn, "hh:mm a") : "\u2014");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(rec_r3.checkOut ? \u0275\u0275pipeBind2(9, 14, rec_r3.checkOut, "hh:mm a") : "\u2014");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(12, 17, rec_r3.workedMinutes / 60, "1.1-1"), "h ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", rec_r3.overtimeMinutes > 0 ? rec_r3.overtimeMinutes + "m" : "\u2014", " ");
    \u0275\u0275advance(2);
    \u0275\u0275property("ngClass", \u0275\u0275pureFunction3(20, _c3, rec_r3.status === "Present", rec_r3.status === "HalfDay", rec_r3.status === "Absent"));
    \u0275\u0275advance();
    \u0275\u0275property("ngClass", \u0275\u0275pureFunction3(24, _c4, rec_r3.status === "Present", rec_r3.status === "HalfDay", rec_r3.status === "Absent"));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", rec_r3.status, " ");
  }
}
function AttendanceComponent_div_104_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 67)(1, "table", 68)(2, "thead")(3, "tr", 69)(4, "th", 70);
    \u0275\u0275text(5, "Date");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "th", 70);
    \u0275\u0275text(7, "Check In");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "th", 70);
    \u0275\u0275text(9, "Check Out");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "th", 71);
    \u0275\u0275text(11, "Worked (Hrs)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "th", 71);
    \u0275\u0275text(13, "Overtime");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "th", 70);
    \u0275\u0275text(15, "Status");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(16, "tbody", 72);
    \u0275\u0275template(17, AttendanceComponent_div_104_tr_17_Template, 19, 28, "tr", 73);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(17);
    \u0275\u0275property("ngForOf", ctx_r0.records);
  }
}
var AttendanceComponent = class _AttendanceComponent {
  http = inject(HttpClient);
  authService = inject(AuthService);
  tenantService = inject(TenantService);
  employeeId = "fe082fb1-4ca3-4a17-8e68-fb9e2d63428f";
  // Rajesh default
  // Session state
  isPunchedIn = false;
  activeSessionTimer = "00:00:00";
  timerSub;
  punchInTime = null;
  // Timelines
  punches = [];
  records = [];
  // Emulator controls
  emulatorPunchType = "IN";
  emulatorDeviceId = "BIOMETRIC-MUM-01";
  // Console feedback
  consoleMessage = "";
  consoleStatus = "success";
  ngOnInit() {
    const user = this.authService.currentUser();
    if (user?.tenantId === "7f04c0cf-031e-450f-a189-e1fca9473fa7") {
      this.employeeId = "be082fb1-4ca3-4a17-8e68-fb9e2d63428b";
    } else {
      this.employeeId = "fe082fb1-4ca3-4a17-8e68-fb9e2d63428f";
    }
    this.loadPunchesAndRecords();
  }
  ngOnDestroy() {
    this.stopTimer();
  }
  loadPunchesAndRecords() {
    const user = this.authService.currentUser();
    if (!user)
      return;
    const punchesKey = `raw_punches_${user.tenantId}_${this.employeeId}`;
    const recordsKey = `consolidated_records_${user.tenantId}_${this.employeeId}`;
    const rawPunches = localStorage.getItem(punchesKey);
    const rawRecords = localStorage.getItem(recordsKey);
    if (rawPunches) {
      this.punches = JSON.parse(rawPunches);
    } else {
      this.punches = [
        { id: "1", punchTime: new Date(2026, 4, 25, 9, 2).toISOString(), punchType: "IN", deviceId: "BIOMETRIC-IN-01", source: "Biometric" },
        { id: "2", punchTime: new Date(2026, 4, 25, 18, 5).toISOString(), punchType: "OUT", deviceId: "BIOMETRIC-IN-01", source: "Biometric" },
        { id: "3", punchTime: new Date(2026, 4, 26, 8, 55).toISOString(), punchType: "IN", deviceId: "BIOMETRIC-IN-01", source: "Biometric" },
        { id: "4", punchTime: new Date(2026, 4, 26, 17, 30).toISOString(), punchType: "OUT", deviceId: "BIOMETRIC-IN-01", source: "Biometric" }
      ];
      localStorage.setItem(punchesKey, JSON.stringify(this.punches));
    }
    if (rawRecords) {
      this.records = JSON.parse(rawRecords);
    } else {
      this.records = [
        { id: "rec-1", businessDate: "2026-05-25", checkIn: new Date(2026, 4, 25, 9, 2).toISOString(), checkOut: new Date(2026, 4, 25, 18, 5).toISOString(), workedMinutes: 543, overtimeMinutes: 63, status: "Present", source: "Biometric", autoCheckout: false },
        { id: "rec-2", businessDate: "2026-05-26", checkIn: new Date(2026, 4, 26, 8, 55).toISOString(), checkOut: new Date(2026, 4, 26, 17, 30).toISOString(), workedMinutes: 515, overtimeMinutes: 35, status: "Present", source: "Biometric", autoCheckout: false }
      ];
      localStorage.setItem(recordsKey, JSON.stringify(this.records));
    }
    const latestPunch = this.punches[0];
    const todayStr = (/* @__PURE__ */ new Date()).toDateString();
    const todayPunches = this.punches.filter((p) => new Date(p.punchTime).toDateString() === todayStr);
    if (todayPunches.length > 0) {
      const lastTodayPunch = todayPunches[todayPunches.length - 1];
      if (lastTodayPunch.punchType === "IN") {
        this.isPunchedIn = true;
        this.punchInTime = new Date(lastTodayPunch.punchTime);
        this.startTimer();
      }
    }
  }
  toggleWebPunch() {
    const user = this.authService.currentUser();
    if (!user)
      return;
    this.consoleMessage = "";
    const now = /* @__PURE__ */ new Date();
    const type = this.isPunchedIn ? "OUT" : "IN";
    const lastPunch = this.punches[0];
    if (lastPunch) {
      const diffSeconds = Math.abs(now.getTime() - new Date(lastPunch.punchTime).getTime()) / 1e3;
      if (diffSeconds < 60) {
        this.consoleStatus = "error";
        this.consoleMessage = "Duplicate punch guard triggered. Please wait 60 seconds between punches.";
        return;
      }
    }
    this.http.post("http://localhost:5000/api/v1/attendance/punch", {
      employeeId: this.employeeId,
      punchTime: now.toISOString(),
      punchType: type,
      source: "Web",
      deviceId: "WEB-TERMINAL"
    }).subscribe({
      next: (res) => {
        this.registerLocalPunch(type, now, "Web", "WEB-TERMINAL");
        this.consoleStatus = "success";
        this.consoleMessage = `Successfully punched ${type} via live REST API.`;
      },
      error: () => {
        this.registerLocalPunch(type, now, "Web", "WEB-TERMINAL");
        this.consoleStatus = "success";
        this.consoleMessage = `REST API unavailable. Graceful failover: punched ${type} in local storage.`;
      }
    });
  }
  registerLocalPunch(type, time, source, deviceId) {
    const user = this.authService.currentUser();
    if (!user)
      return;
    const punchesKey = `raw_punches_${user.tenantId}_${this.employeeId}`;
    const newPunch = {
      id: "p-" + Date.now(),
      punchTime: time.toISOString(),
      punchType: type,
      deviceId,
      source
    };
    this.punches.unshift(newPunch);
    localStorage.setItem(punchesKey, JSON.stringify(this.punches));
    if (type === "IN") {
      this.isPunchedIn = true;
      this.punchInTime = time;
      this.startTimer();
    } else {
      this.isPunchedIn = false;
      this.punchInTime = null;
      this.stopTimer();
      this.activeSessionTimer = "00:00:00";
    }
  }
  emulateBiometricPunch() {
    const user = this.authService.currentUser();
    if (!user)
      return;
    this.consoleMessage = "";
    const now = /* @__PURE__ */ new Date();
    const type = this.emulatorPunchType;
    this.http.post("http://localhost:5000/api/v1/attendance/punch", {
      employeeId: this.employeeId,
      punchTime: now.toISOString(),
      punchType: type,
      source: "Biometric",
      deviceId: this.emulatorDeviceId
    }).subscribe({
      next: (res) => {
        this.registerLocalPunch(type, now, "Biometric", this.emulatorDeviceId);
        this.consoleStatus = "success";
        this.consoleMessage = `Device Emulator: Pushed biometric payload successfully to API!`;
      },
      error: (err) => {
        if (err.status === 409) {
          this.consoleStatus = "error";
          this.consoleMessage = "Emulator Error: 60s duplicate punch guard block by REST API!";
        } else {
          this.registerLocalPunch(type, now, "Biometric", this.emulatorDeviceId);
          this.consoleStatus = "success";
          this.consoleMessage = "REST API offline. Seeded biometric sync payload locally.";
        }
      }
    });
  }
  triggerDailySync() {
    this.consoleMessage = "";
    this.http.post("http://localhost:5000/api/v1/attendance/sync", {}).subscribe({
      next: (res) => {
        this.runLocalSync();
        this.consoleStatus = "success";
        this.consoleMessage = `Daily Sync Trigger: ${res.message || "Consolidation successful."}`;
      },
      error: () => {
        this.runLocalSync();
        this.consoleStatus = "success";
        this.consoleMessage = "REST API offline. Compiled punches locally to daily records.";
      }
    });
  }
  runLocalSync() {
    const user = this.authService.currentUser();
    if (!user)
      return;
    const recordsKey = `consolidated_records_${user.tenantId}_${this.employeeId}`;
    const groupedPunches = {};
    this.punches.forEach((p) => {
      const dateStr = new Date(p.punchTime).toISOString().split("T")[0];
      if (!groupedPunches[dateStr])
        groupedPunches[dateStr] = [];
      groupedPunches[dateStr].push(p);
    });
    const newRecords = [];
    Object.keys(groupedPunches).forEach((dateStr) => {
      const dayPunches = groupedPunches[dateStr].sort((a, b) => new Date(a.punchTime).getTime() - new Date(b.punchTime).getTime());
      const firstIn = dayPunches.find((p) => p.punchType === "IN");
      const lastOut = dayPunches.slice().reverse().find((p) => p.punchType === "OUT");
      if (!firstIn)
        return;
      let workedMinutes = 0;
      if (lastOut && new Date(lastOut.punchTime) > new Date(firstIn.punchTime)) {
        workedMinutes = Math.round((new Date(lastOut.punchTime).getTime() - new Date(firstIn.punchTime).getTime()) / 6e4);
      }
      const overtimeMinutes = Math.max(0, workedMinutes - 480);
      const status = workedMinutes >= 240 ? workedMinutes >= 480 ? "Present" : "HalfDay" : "Absent";
      newRecords.push({
        id: "rec-" + dateStr,
        businessDate: dateStr,
        checkIn: firstIn.punchTime,
        checkOut: lastOut?.punchTime,
        workedMinutes,
        overtimeMinutes,
        status,
        source: firstIn.source,
        autoCheckout: !lastOut
      });
    });
    this.records = newRecords.sort((a, b) => b.businessDate.localeCompare(a.businessDate));
    localStorage.setItem(recordsKey, JSON.stringify(this.records));
  }
  startTimer() {
    this.stopTimer();
    this.timerSub = interval(1e3).subscribe(() => {
      if (!this.punchInTime)
        return;
      const elapsedMs = (/* @__PURE__ */ new Date()).getTime() - this.punchInTime.getTime();
      const secs = Math.floor(elapsedMs / 1e3 % 60);
      const mins = Math.floor(elapsedMs / (1e3 * 60) % 60);
      const hrs = Math.floor(elapsedMs / (1e3 * 60 * 60));
      this.activeSessionTimer = `${this.padZero(hrs)}:${this.padZero(mins)}:${this.padZero(secs)}`;
    });
  }
  stopTimer() {
    if (this.timerSub) {
      this.timerSub.unsubscribe();
      this.timerSub = void 0;
    }
  }
  padZero(num) {
    return num.toString().padStart(2, "0");
  }
  static \u0275fac = function AttendanceComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _AttendanceComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AttendanceComponent, selectors: [["app-attendance"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 105, vars: 15, consts: [[1, "space-y-8", "animate-fade-in", "text-slate-100"], [1, "flex", "flex-col", "md:flex-row", "md:items-center", "md:justify-between", "gap-4"], [1, "text-2xl", "font-bold", "tracking-tight", "text-white", "flex", "items-center", "gap-2"], [1, "material-icons", "text-brand-400"], [1, "text-xs", "text-slate-400", "mt-0.5"], [1, "flex", "items-center", "gap-3"], [1, "px-4", "py-2", "bg-indigo-600", "hover:bg-indigo-500", "text-white", "rounded-xl", "text-xs", "font-bold", "flex", "items-center", "gap-1.5", "transition", 3, "click"], [1, "material-icons", "text-sm"], [1, "grid", "grid-cols-1", "md:grid-cols-12", "gap-8"], [1, "md:col-span-5"], [1, "glass-card", "p-6", "flex", "flex-col", "items-center", "justify-center", "text-center", "relative", "overflow-hidden", "h-full", "min-h-[350px]"], [1, "absolute", "top-4", "left-4", "bg-brand-500/10", "border", "border-brand-500/25", "px-2.5", "py-0.5", "rounded-full", "text-[9px]", "font-bold", "text-brand-400", "uppercase", "tracking-wider"], [1, "space-y-2", "mt-4", "mb-6"], [1, "text-[10px]", "text-slate-400", "font-bold", "uppercase", "tracking-widest"], [1, "text-4xl", "font-extrabold", "text-white", "tracking-tight", "tabular-nums", "animate-pulse"], [1, "text-[10px]", "text-slate-400"], [1, "text-slate-200", "font-semibold"], [1, "w-36", "h-36", "rounded-full", "border-4", "border-slate-900/60", "shadow-2xl", "flex", "flex-col", "items-center", "justify-center", "gap-1.5", "transition-all", "duration-300", "ring-8", "hover:scale-105", "active:scale-95", "outline-none", "cursor-pointer", 3, "click", "ngClass"], [1, "material-icons", "text-4xl", "text-white"], [1, "text-xs", "font-bold", "text-white", "uppercase", "tracking-wider"], ["class", "mt-6 border text-[11px] p-3 rounded-xl flex items-center justify-center gap-1.5 w-full", 3, "ngClass", 4, "ngIf"], [1, "md:col-span-7", "space-y-8"], [1, "glass-card", "p-6"], [1, "text-sm", "font-bold", "text-white", "mb-4", "flex", "items-center", "gap-2"], [1, "material-icons", "text-xs", "text-brand-400"], [1, "grid", "grid-cols-2", "sm:grid-cols-3", "gap-4"], [1, "bg-slate-950/40", "border", "border-slate-800/80", "p-3.5", "rounded-xl"], [1, "text-[9px]", "text-slate-500", "font-bold", "uppercase", "tracking-wider", "mb-1"], [1, "text-sm", "font-semibold", "text-slate-200"], [1, "text-sm", "font-semibold", "text-rose-400", "flex", "items-center", "gap-1"], [1, "material-icons", "text-xs"], [1, "mt-4", "pt-3", "border-t", "border-slate-800/60", "flex", "items-center", "gap-2", "text-[10px]", "text-slate-400"], [1, "material-icons", "text-xs", "text-amber-500"], [1, "glass-card", "p-6", "border-amber-500/20", "bg-gradient-to-br", "from-slate-900/90", "to-slate-950/95"], [1, "text-sm", "font-bold", "text-white", "mb-2.5", "flex", "items-center", "gap-2"], [1, "material-icons", "text-sm", "text-amber-400"], [1, "text-[10px]", "text-slate-400", "mb-4", "leading-relaxed"], [1, "grid", "grid-cols-1", "sm:grid-cols-2", "gap-4.5"], [1, "block", "text-[9px]", "font-bold", "text-slate-400", "uppercase", "tracking-wide", "mb-1"], [1, "w-full", "bg-slate-950", "border", "border-slate-800", "text-xs", "text-slate-200", "rounded-lg", "px-3", "py-2", "outline-none", "focus:border-brand-500", 3, "ngModelChange", "ngModel"], ["value", "IN"], ["value", "OUT"], ["type", "text", 1, "w-full", "bg-slate-950", "border", "border-slate-800", "text-xs", "text-slate-200", "rounded-lg", "px-3", "py-2", "outline-none", "focus:border-brand-500", 3, "ngModelChange", "ngModel"], [1, "mt-4.5", "flex", "gap-2"], [1, "flex-1", "px-4", "py-2.5", "bg-amber-600", "hover:bg-amber-500", "text-white", "rounded-xl", "text-xs", "font-bold", "flex", "items-center", "justify-center", "gap-1.5", "transition", 3, "click"], [1, "grid", "grid-cols-1", "lg:grid-cols-12", "gap-8"], [1, "lg:col-span-5"], [1, "glass-card", "p-6", "h-full"], [1, "text-sm", "font-bold", "text-white", "mb-5", "flex", "items-center", "gap-2"], ["class", "flex flex-col items-center justify-center py-10 text-slate-500 text-xs", 4, "ngIf"], ["class", "space-y-4 relative before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-800/80", 4, "ngIf"], [1, "lg:col-span-7"], ["class", "text-center py-12 text-slate-500 text-xs", 4, "ngIf"], ["class", "overflow-x-auto", 4, "ngIf"], [1, "mt-6", "border", "text-[11px]", "p-3", "rounded-xl", "flex", "items-center", "justify-center", "gap-1.5", "w-full", 3, "ngClass"], [1, "flex", "flex-col", "items-center", "justify-center", "py-10", "text-slate-500", "text-xs"], [1, "material-icons", "text-2xl", "text-slate-700", "mb-2"], [1, "space-y-4", "relative", "before:absolute", "before:left-3", "before:top-2", "before:bottom-2", "before:w-0.5", "before:bg-slate-800/80"], ["class", "flex items-start gap-4 relative pl-8", 4, "ngFor", "ngForOf"], [1, "flex", "items-start", "gap-4", "relative", "pl-8"], [1, "absolute", "left-1.5", "top-1.5", "w-3", "h-3", "rounded-full", "border-2", "border-slate-900", 3, "ngClass"], [1, "flex-1", "bg-slate-950/40", "border", "border-slate-800/60", "p-3", "rounded-xl", "flex", "items-center", "justify-between"], [1, "space-y-0.5"], [1, "text-xs", "font-bold", "text-slate-200"], [1, "text-[9px]", "text-slate-500"], [1, "text-xs", "font-mono", "text-slate-300", "font-semibold"], [1, "text-center", "py-12", "text-slate-500", "text-xs"], [1, "overflow-x-auto"], [1, "w-full", "text-left", "text-xs", "border-collapse"], [1, "border-b", "border-slate-800", "text-slate-400", "font-semibold", "uppercase", "text-[9px]", "tracking-wider"], [1, "py-3", "px-3"], [1, "py-3", "px-3", "text-center"], [1, "divide-y", "divide-slate-800/60"], ["class", "hover:bg-slate-900/30 transition duration-150", 4, "ngFor", "ngForOf"], [1, "hover:bg-slate-900/30", "transition", "duration-150"], [1, "py-3.5", "px-3", "text-slate-200", "font-medium"], [1, "py-3.5", "px-3", "text-slate-300", "font-mono"], [1, "py-3.5", "px-3", "text-center", "text-slate-200", "font-bold"], [1, "py-3.5", "px-3", "text-center", "text-slate-400", "font-medium"], [1, "py-3.5", "px-3"], [1, "px-2.5", "py-0.5", "rounded-full", "text-[9px]", "font-bold", "uppercase", "inline-flex", "items-center", "gap-1", "border", 3, "ngClass"], [1, "w-1", "h-1", "rounded-full", 3, "ngClass"]], template: function AttendanceComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div")(3, "h1", 2)(4, "span", 3);
      \u0275\u0275text(5, "fingerprint");
      \u0275\u0275elementEnd();
      \u0275\u0275text(6, " Attendance Engine ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(7, "p", 4);
      \u0275\u0275text(8, "Real-time biometric punch sync, shift management, night shifts, overtime tracking, and geo-fencing.");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(9, "div", 5)(10, "button", 6);
      \u0275\u0275listener("click", function AttendanceComponent_Template_button_click_10_listener() {
        return ctx.triggerDailySync();
      });
      \u0275\u0275elementStart(11, "span", 7);
      \u0275\u0275text(12, "sync");
      \u0275\u0275elementEnd();
      \u0275\u0275text(13, " Trigger Consolidation Sync ");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(14, "div", 8)(15, "div", 9)(16, "div", 10)(17, "div", 11);
      \u0275\u0275text(18, " Web Terminal ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(19, "div", 12)(20, "div", 13);
      \u0275\u0275text(21);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(22, "div", 14);
      \u0275\u0275text(23);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(24, "div", 15);
      \u0275\u0275text(25, " Shift: ");
      \u0275\u0275elementStart(26, "span", 16);
      \u0275\u0275text(27, "General Shift (09:00 AM - 06:00 PM)");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(28, "button", 17);
      \u0275\u0275listener("click", function AttendanceComponent_Template_button_click_28_listener() {
        return ctx.toggleWebPunch();
      });
      \u0275\u0275elementStart(29, "span", 18);
      \u0275\u0275text(30);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(31, "span", 19);
      \u0275\u0275text(32);
      \u0275\u0275elementEnd()();
      \u0275\u0275template(33, AttendanceComponent_div_33_Template, 5, 6, "div", 20);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(34, "div", 21)(35, "div", 22)(36, "h2", 23)(37, "span", 24);
      \u0275\u0275text(38, "schedule");
      \u0275\u0275elementEnd();
      \u0275\u0275text(39, " Current Shift Specification ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(40, "div", 25)(41, "div", 26)(42, "div", 27);
      \u0275\u0275text(43, "Grace Period");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(44, "div", 28);
      \u0275\u0275text(45, "15 minutes");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(46, "div", 26)(47, "div", 27);
      \u0275\u0275text(48, "Night Shift");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(49, "div", 29)(50, "span", 30);
      \u0275\u0275text(51, "close");
      \u0275\u0275elementEnd();
      \u0275\u0275text(52, " Not Active ");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(53, "div", 26)(54, "div", 27);
      \u0275\u0275text(55, "Timezone");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(56, "div", 28);
      \u0275\u0275text(57, "UTC / Host Local");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(58, "div", 31)(59, "span", 32);
      \u0275\u0275text(60, "info_outline");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(61, "span");
      \u0275\u0275text(62, "Edge Case: Night shifts correctly align punches across the midnight boundary.");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(63, "div", 33)(64, "h2", 34)(65, "span", 35);
      \u0275\u0275text(66, "developer_board");
      \u0275\u0275elementEnd();
      \u0275\u0275text(67, " Offline Biometric Device Emulator ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(68, "p", 36);
      \u0275\u0275text(69, " Emulate a hardware biometric terminal punch to test event-driven pipelines, outbox pattern queue logging, and the 60-second duplicate punch guard. ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(70, "div", 37)(71, "div")(72, "label", 38);
      \u0275\u0275text(73, "Punch Type");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(74, "select", 39);
      \u0275\u0275twoWayListener("ngModelChange", function AttendanceComponent_Template_select_ngModelChange_74_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.emulatorPunchType, $event) || (ctx.emulatorPunchType = $event);
        return $event;
      });
      \u0275\u0275elementStart(75, "option", 40);
      \u0275\u0275text(76, "IN (Check In)");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(77, "option", 41);
      \u0275\u0275text(78, "OUT (Check Out)");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(79, "div")(80, "label", 38);
      \u0275\u0275text(81, "Biometric Device ID");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(82, "input", 42);
      \u0275\u0275twoWayListener("ngModelChange", function AttendanceComponent_Template_input_ngModelChange_82_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.emulatorDeviceId, $event) || (ctx.emulatorDeviceId = $event);
        return $event;
      });
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(83, "div", 43)(84, "button", 44);
      \u0275\u0275listener("click", function AttendanceComponent_Template_button_click_84_listener() {
        return ctx.emulateBiometricPunch();
      });
      \u0275\u0275elementStart(85, "span", 7);
      \u0275\u0275text(86, "hardware");
      \u0275\u0275elementEnd();
      \u0275\u0275text(87, " Push Offline Biometric Payload ");
      \u0275\u0275elementEnd()()()()();
      \u0275\u0275elementStart(88, "div", 45)(89, "div", 46)(90, "div", 47)(91, "h2", 48)(92, "span", 24);
      \u0275\u0275text(93, "view_timeline");
      \u0275\u0275elementEnd();
      \u0275\u0275text(94, " Today's Raw Punches ");
      \u0275\u0275elementEnd();
      \u0275\u0275template(95, AttendanceComponent_div_95_Template, 5, 0, "div", 49)(96, AttendanceComponent_div_96_Template, 2, 1, "div", 50);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(97, "div", 51)(98, "div", 47)(99, "h2", 48)(100, "span", 24);
      \u0275\u0275text(101, "table_chart");
      \u0275\u0275elementEnd();
      \u0275\u0275text(102, " Consolidated Daily Records ");
      \u0275\u0275elementEnd();
      \u0275\u0275template(103, AttendanceComponent_div_103_Template, 2, 0, "div", 52)(104, AttendanceComponent_div_104_Template, 18, 1, "div", 53);
      \u0275\u0275elementEnd()()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(21);
      \u0275\u0275textInterpolate1(" ", ctx.isPunchedIn ? "Active Work Session" : "Shift Off-Duty", " ");
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate1(" ", ctx.activeSessionTimer, " ");
      \u0275\u0275advance(5);
      \u0275\u0275property("ngClass", \u0275\u0275pureFunction2(12, _c0, ctx.isPunchedIn, !ctx.isPunchedIn));
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate1(" ", ctx.isPunchedIn ? "logout" : "login", " ");
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate1(" ", ctx.isPunchedIn ? "Punch OUT" : "Punch IN", " ");
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.consoleMessage);
      \u0275\u0275advance(41);
      \u0275\u0275twoWayProperty("ngModel", ctx.emulatorPunchType);
      \u0275\u0275advance(8);
      \u0275\u0275twoWayProperty("ngModel", ctx.emulatorDeviceId);
      \u0275\u0275advance(13);
      \u0275\u0275property("ngIf", ctx.punches.length === 0);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.punches.length > 0);
      \u0275\u0275advance(7);
      \u0275\u0275property("ngIf", ctx.records.length === 0);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.records.length > 0);
    }
  }, dependencies: [CommonModule, NgClass, NgForOf, NgIf, DecimalPipe, DatePipe, FormsModule, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, SelectControlValueAccessor, NgControlStatus, NgModel], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AttendanceComponent, { className: "AttendanceComponent", filePath: "src\\app\\features\\attendance\\attendance.component.ts", lineNumber: 268 });
})();
export {
  AttendanceComponent
};
//# sourceMappingURL=chunk-PT5KDECG.js.map
