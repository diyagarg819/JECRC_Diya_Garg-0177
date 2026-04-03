import React from 'react';
import { getAvatarBg, getInitials } from '../../utils/data';

// ─── Alert ─────────────────────────────────────────────────────────────────────
export function Alert({ type = 'info', message, onClose }) {
  const icons = { success: '✓', error: '✕', info: 'ℹ', warning: '⚠' };
  return (
    <div className={`alert alert-${type}`}>
      <span className="alert-icon">{icons[type]}</span>
      <span>{message}</span>
      {onClose && (
        <span className="alert-close" onClick={onClose}>✕</span>
      )}
    </div>
  );
}

// ─── Badge ─────────────────────────────────────────────────────────────────────
export function Badge({ label, color }) {
  return (
    <span
      className="badge"
      style={{ background: color?.bg, color: color?.text }}
    >
      {label}
    </span>
  );
}

// ─── Avatar ────────────────────────────────────────────────────────────────────
export function Avatar({ name, id, size = 'md' }) {
  const bg = getAvatarBg(id);
  const initials = getInitials(name);
  return (
    <div
      className={`avatar avatar-${size}`}
      style={{ background: bg, color: '#fff' }}
    >
      {initials}
    </div>
  );
}

// ─── Spinner ───────────────────────────────────────────────────────────────────
export function Spinner({ size = 16 }) {
  return (
    <span
      className="spinner"
      style={{ width: size, height: size }}
    />
  );
}

// ─── Modal ─────────────────────────────────────────────────────────────────────
export function Modal({ title, onClose, children, maxWidth = 520 }) {
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };
  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal" style={{ maxWidth }}>
        <div className="modal-header">
          <h2 className="modal-title">{title}</h2>
          <button className="modal-close" onClick={onClose} aria-label="Close">
            ✕
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

// ─── Empty State ───────────────────────────────────────────────────────────────
export function EmptyState({ icon = '📭', title, subtitle }) {
  return (
    <div className="table-empty">
      <div style={{ fontSize: 40, marginBottom: 12 }}>{icon}</div>
      <div style={{ fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 4 }}>
        {title}
      </div>
      {subtitle && (
        <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{subtitle}</div>
      )}
    </div>
  );
}

// ─── Access Denied ─────────────────────────────────────────────────────────────
export function AccessDenied() {
  return (
    <div className="access-denied">
      <div className="access-denied-icon">🔒</div>
      <h2 className="access-denied-title">Access Restricted</h2>
      <p className="access-denied-text">
        Only administrators can view and manage employee records.
      </p>
    </div>
  );
}

// ─── Confirm Delete ────────────────────────────────────────────────────────────
export function ConfirmDelete({ name, onConfirm, onCancel, loading }) {
  return (
    <div style={{ textAlign: 'center', padding: '0.5rem 0' }}>
      <div style={{ fontSize: 48, marginBottom: 16 }}>⚠️</div>
      <p style={{ fontWeight: 600, color: 'var(--text-primary)', marginBottom: 8, fontSize: 15 }}>
        Delete {name}?
      </p>
      <p style={{ color: 'var(--text-secondary)', fontSize: 13, marginBottom: '1.75rem' }}>
        This action is permanent and cannot be undone.
      </p>
      <div className="flex gap-3" style={{ justifyContent: 'center' }}>
        <button className="btn btn-secondary" onClick={onCancel} style={{ minWidth: 100 }}>
          Cancel
        </button>
        <button
          className="btn btn-danger"
          onClick={onConfirm}
          disabled={loading}
          style={{ minWidth: 120 }}
        >
          {loading ? <><Spinner size={14} /> Deleting…</> : 'Yes, Delete'}
        </button>
      </div>
    </div>
  );
}
