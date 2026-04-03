import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Avatar, Badge, Alert } from '../components/ui';
import { getRoleColor, getDeptColor, formatSalary, formatDate } from '../utils/data';

function ProfileField({ label, value, accent }) {
  return (
    <div className="profile-row">
      <span className="profile-key">{label}</span>
      <span
        className="profile-value"
        style={accent ? { color: accent } : undefined}
      >
        {value || '—'}
      </span>
    </div>
  );
}

export default function ProfilePage() {
  const { user } = useAuth();

  const deptColor = getDeptColor(user.dept);
  const roleColor = getRoleColor(user.role);

  return (
    <div className="anim-fade">
      <div className="page-header">
        <div>
          <h1 className="page-title">My Profile</h1>
          <p className="page-subtitle">Your personal information on file</p>
        </div>
      </div>

      {user.role !== 'admin' && (
        <Alert
          type="info"
          message="To update your information, please contact your HR administrator."
        />
      )}

      <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', alignItems: 'flex-start' }}>
        {/* Main profile card */}
        <div className="profile-card" style={{ flex: '1 1 420px', minWidth: 320 }}>
          {/* Hero */}
          <div className="profile-hero">
            <Avatar name={user.name} id={user.id} size="xl" />
            <div>
              <h2 style={{ fontSize: 21, fontWeight: 700, color: '#fff', marginBottom: 5 }}>
                {user.name}
              </h2>
              <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', marginBottom: 10 }}>
                {user.position} · {user.dept}
              </p>
              <div className="flex gap-2">
                <Badge label={user.role} color={roleColor} />
                <Badge label={user.dept} color={deptColor} />
              </div>
            </div>
          </div>

          {/* Fields */}
          <div className="profile-body">
            <ProfileField label="Full Name"   value={user.name} />
            <ProfileField label="Email"       value={user.email} accent="#818cf8" />
            <ProfileField label="Phone"       value={user.phone} />
            <ProfileField label="Location"    value={user.location} />
            <ProfileField label="Department"  value={user.dept} />
            <ProfileField label="Position"    value={user.position} />
            <ProfileField label="Annual Salary" value={formatSalary(user.salary)} accent="#34d399" />
            <ProfileField label="Joined"      value={formatDate(user.joined)} />
            <ProfileField label="Username"    value={user.username} />
            <ProfileField label="Role"        value={user.role} />
          </div>
        </div>

        {/* Side info card */}
        <div style={{ flex: '0 1 260px', minWidth: 220, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {/* Account status */}
          <div className="card">
            <h3 style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '1rem' }}>
              Account Status
            </h3>
            <div className="flex-center gap-2" style={{ marginBottom: 10 }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#10b981', flexShrink: 0 }} />
              <span style={{ fontSize: 13, color: 'var(--text-primary)', fontWeight: 500 }}>Active</span>
            </div>
            <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>
              Member since {formatDate(user.joined)}
            </div>
          </div>

          {/* Quick stats */}
          <div className="card">
            <h3 style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '1rem' }}>
              Quick Info
            </h3>
            {[
              { label: 'Department', value: user.dept,                   color: deptColor.text },
              { label: 'Role',       value: user.role,                   color: roleColor.text },
              { label: 'Salary',     value: formatSalary(user.salary),   color: '#34d399' },
            ].map(({ label, value, color }) => (
              <div key={label} style={{ marginBottom: 10 }}>
                <div style={{ fontSize: 10, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 2 }}>
                  {label}
                </div>
                <div style={{ fontSize: 14, fontWeight: 600, color }}>
                  {value}
                </div>
              </div>
            ))}
          </div>

          {user.role === 'admin' && (
            <div
              className="card"
              style={{ borderColor: 'rgba(251,191,36,0.25)', background: 'rgba(251,191,36,0.04)' }}
            >
              <div className="flex-center gap-2" style={{ marginBottom: 6 }}>
                <span style={{ fontSize: 18 }}>⭐</span>
                <span style={{ fontSize: 13, fontWeight: 600, color: '#fbbf24' }}>
                  Administrator
                </span>
              </div>
              <p style={{ fontSize: 12, color: 'var(--text-muted)' }}>
                You have full access to manage all employee records.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
