import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useEmployees } from '../context/EmployeeContext';
import { Avatar, Badge, Alert } from '../components/ui';
import {
  getDeptColor, getRoleColor, formatSalary, formatDate, getAvatarBg
} from '../utils/data';

// ─── Stat Card ────────────────────────────────────────────────────────────────
function StatCard({ label, value, accent, delay = 0 }) {
  return (
    <div className="stat-card" style={{ borderTopColor: accent, animationDelay: `${delay}s` }}>
      <div className="stat-number">{value}</div>
      <div className="stat-label">{label}</div>
    </div>
  );
}

// ─── Dept Bar Chart ───────────────────────────────────────────────────────────
function DeptBreakdown({ employees }) {
  const depts = [...new Set(employees.map((e) => e.dept))];
  const max   = Math.max(...depts.map((d) => employees.filter((e) => e.dept === d).length));

  return (
    <div className="card" style={{ flex: 1 }}>
      <h3 style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)', marginBottom: '1.25rem' }}>
        Headcount by Department
      </h3>
      {depts.map((dept) => {
        const count = employees.filter((e) => e.dept === dept).length;
        const pct   = Math.round((count / max) * 100);
        const color = getDeptColor(dept);
        return (
          <div key={dept} style={{ marginBottom: 10 }}>
            <div className="flex-center" style={{ justifyContent: 'space-between', marginBottom: 4 }}>
              <span style={{ fontSize: 12, color: 'var(--text-primary)' }}>{dept}</span>
              <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>{count}</span>
            </div>
            <div style={{ height: 5, background: 'var(--bg-elevated)', borderRadius: 3 }}>
              <div
                style={{
                  height: '100%', borderRadius: 3,
                  background: color.text,
                  width: pct + '%',
                  animation: 'barGrow 0.7s ease forwards',
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ─── Recent Roster ────────────────────────────────────────────────────────────
function RecentRoster({ employees }) {
  const recent = [...employees].reverse().slice(0, 5);
  return (
    <div className="card" style={{ flex: 1 }}>
      <h3 style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)', marginBottom: '1.25rem' }}>
        Recent Members
      </h3>
      {recent.map((emp) => (
        <div
          key={emp.id}
          className="flex-center gap-3"
          style={{ marginBottom: 12 }}
        >
          <Avatar name={emp.name} id={emp.id} size="sm" />
          <div style={{ flex: 1, overflow: 'hidden' }}>
            <div className="ellipsis" style={{ fontSize: 13, fontWeight: 500 }}>{emp.name}</div>
            <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{emp.dept} · {emp.position}</div>
          </div>
          <Badge label={emp.role} color={getRoleColor(emp.role)} />
        </div>
      ))}
    </div>
  );
}

// ─── Employee Summary (non-admin view) ───────────────────────────────────────
function EmployeeSummary({ user, onNavigate }) {
  const items = [
    ['Department',  user.dept],
    ['Position',    user.position],
    ['Salary',      formatSalary(user.salary)],
    ['Joined',      formatDate(user.joined)],
    ['Location',    user.location || '—'],
    ['Phone',       user.phone    || '—'],
  ];
  return (
    <div style={{ maxWidth: 560 }}>
      <Alert
        type="info"
        message="You are logged in as an employee. Only your own profile is visible."
      />
      <div className="card card-lg" style={{ marginBottom: '1.25rem' }}>
        <div className="flex-center gap-4" style={{ marginBottom: '1.5rem' }}>
          <Avatar name={user.name} id={user.id} size="lg" />
          <div>
            <h2 style={{ fontSize: 19, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 4 }}>
              {user.name}
            </h2>
            <p style={{ fontSize: 13, color: 'var(--text-secondary)' }}>
              {user.position} · {user.dept}
            </p>
            <div style={{ marginTop: 6 }}>
              <Badge label={user.role} color={getRoleColor(user.role)} />
            </div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
          {items.map(([k, v]) => (
            <div
              key={k}
              style={{
                background: 'var(--bg-elevated)',
                borderRadius: 'var(--radius-md)',
                padding: '10px 14px',
              }}
            >
              <div style={{ fontSize: 10, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 3 }}>
                {k}
              </div>
              <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-primary)' }}>{v}</div>
            </div>
          ))}
        </div>
      </div>
      <button
        className="btn btn-primary"
        style={{ width: '100%' }}
        onClick={() => onNavigate('profile')}
      >
        View Full Profile →
      </button>
    </div>
  );
}

// ─── Main Dashboard ───────────────────────────────────────────────────────────
export default function DashboardPage({ onNavigate }) {
  const { user }      = useAuth();
  const { employees } = useEmployees();

  const isAdmin  = user.role === 'admin';
  const today    = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  const avgSal   = employees.length
    ? Math.round(employees.reduce((a, e) => a + e.salary, 0) / employees.length)
    : 0;
  const deptCount = new Set(employees.map((e) => e.dept)).size;

  return (
    <div className="anim-fade">
      {/* Page header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">
            Welcome back, {user.name.split(' ')[0]} 👋
          </h1>
          <p className="page-subtitle">{today}</p>
        </div>
        {isAdmin && (
          <button
            className="btn btn-primary"
            onClick={() => onNavigate('employees')}
          >
            Manage Employees →
          </button>
        )}
      </div>

      {/* Admin view */}
      {isAdmin && (
        <>
          <div className="stats-grid">
            <StatCard label="Total Employees" value={employees.length}   accent="#5c6ee8" delay={0}    />
            <StatCard label="Departments"      value={deptCount}          accent="#7c3aed" delay={0.05} />
            <StatCard label="Avg Salary"       value={formatSalary(avgSal)} accent="#10b981" delay={0.10} />
            <StatCard label="Admins"           value={employees.filter((e) => e.role === 'admin').length} accent="#f59e0b" delay={0.15} />
          </div>

          <div className="two-col-grid">
            <DeptBreakdown employees={employees} />
            <RecentRoster  employees={employees} />
          </div>
        </>
      )}

      {/* Employee view */}
      {!isAdmin && (
        <EmployeeSummary user={user} onNavigate={onNavigate} />
      )}
    </div>
  );
}
