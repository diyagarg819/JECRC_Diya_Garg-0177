import React, { useState } from 'react';

export function FormField({ label, error, children }) {
  return (
    <div className="form-group">
      {label && <label className="form-label">{label}</label>}
      {children}
      {error && (
        <p className="form-error">
          <span>⚠</span> {error}
        </p>
      )}
    </div>
  );
}

export function TextInput({ label, error, ...props }) {
  return (
    <FormField label={label} error={error}>
      <input
        className={`form-input${error ? ' error' : ''}`}
        {...props}
      />
    </FormField>
  );
}

export function SelectInput({ label, error, options = [], placeholder = 'Select...', ...props }) {
  return (
    <FormField label={label} error={error}>
      <select
        className={`form-select${error ? ' error' : ''}`}
        {...props}
      >
        <option value="">{placeholder}</option>
        {options.map((o) => (
          <option key={o.value ?? o} value={o.value ?? o}>
            {o.label ?? o}
          </option>
        ))}
      </select>
    </FormField>
  );
}

export function PasswordInput({ label, error, ...props }) {
  const [show, setShow] = useState(false);
  return (
    <FormField label={label} error={error}>
      <div style={{ position: 'relative' }}>
        <input
          type={show ? 'text' : 'password'}
          className={`form-input${error ? ' error' : ''}`}
          style={{ paddingRight: 44 }}
          {...props}
        />
        <button
          type="button"
          onClick={() => setShow((s) => !s)}
          style={{
            position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)',
            background: 'none', border: 'none', cursor: 'pointer',
            color: 'var(--text-muted)', fontSize: 13, padding: '2px 4px',
          }}
        >
          {show ? '🙈' : '👁'}
        </button>
      </div>
    </FormField>
  );
}
