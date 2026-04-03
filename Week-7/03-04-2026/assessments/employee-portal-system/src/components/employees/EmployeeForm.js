import React, { useState } from 'react';
import { TextInput, SelectInput, PasswordInput } from '../ui/FormField';
import { Spinner } from '../ui';
import { DEPARTMENTS, getInitials } from '../../utils/data';
import { validators } from '../../hooks/useForm';

const ROLES = ['employee', 'admin'];

function buildRules(isEdit) {
  return {
    name:     [validators.required('Full name is required')],
    email:    [validators.required('Email is required'), validators.email],
    dept:     [validators.required('Department is required')],
    position: [validators.required('Position is required')],
    salary:   [validators.required('Salary is required'), validators.positiveNumber],
    joined:   [validators.required('Join date is required')],
    ...(!isEdit && {
      username: [validators.required('Username is required'), validators.alphanumeric],
      password: [validators.required('Password is required'), validators.minLength(6)],
    }),
  };
}

export default function EmployeeForm({ initial, onSubmit, onCancel }) {
  const isEdit = Boolean(initial);

  const [values, setValues] = useState({
    name:     initial?.name     || '',
    email:    initial?.email    || '',
    dept:     initial?.dept     || '',
    position: initial?.position || '',
    salary:   initial?.salary   || '',
    joined:   initial?.joined   || '',
    phone:    initial?.phone    || '',
    location: initial?.location || '',
    role:     initial?.role     || 'employee',
    username: initial?.username || '',
    password: '',
  });

  const [errors, setErrors]   = useState({});
  const [loading, setLoading] = useState(false);

  const set = (field) => (e) => {
    setValues((prev) => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  const validate = () => {
    const rules  = buildRules(isEdit);
    const newErr = {};
    Object.entries(rules).forEach(([field, ruleFns]) => {
      for (const fn of ruleFns) {
        const msg = fn(values[field], values);
        if (msg) { newErr[field] = msg; break; }
      }
    });
    setErrors(newErr);
    return Object.keys(newErr).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    setLoading(true);
    // Simulate async save
    setTimeout(() => {
      const payload = {
        ...values,
        salary: Number(values.salary),
        ...(isEdit ? { id: initial.id } : {}),
      };
      onSubmit(payload);
      setLoading(false);
    }, 500);
  };

  return (
    <div>
      <div className="form-grid-2">
        <TextInput
          label="Full Name"
          value={values.name}
          onChange={set('name')}
          error={errors.name}
          placeholder="e.g. Jane Smith"
        />
        <TextInput
          label="Email Address"
          type="email"
          value={values.email}
          onChange={set('email')}
          error={errors.email}
          placeholder="jane@corp.io"
        />
        <SelectInput
          label="Department"
          options={DEPARTMENTS}
          value={values.dept}
          onChange={set('dept')}
          error={errors.dept}
        />
        <TextInput
          label="Position / Title"
          value={values.position}
          onChange={set('position')}
          error={errors.position}
          placeholder="e.g. Senior Developer"
        />
        <TextInput
          label="Annual Salary ($)"
          type="number"
          min="0"
          value={values.salary}
          onChange={set('salary')}
          error={errors.salary}
          placeholder="75000"
        />
        <TextInput
          label="Join Date"
          type="date"
          value={values.joined}
          onChange={set('joined')}
          error={errors.joined}
        />
        <TextInput
          label="Phone (optional)"
          type="tel"
          value={values.phone}
          onChange={set('phone')}
          placeholder="+1 (555) 000-0000"
        />
        <TextInput
          label="Location (optional)"
          value={values.location}
          onChange={set('location')}
          placeholder="City, State"
        />

        {isEdit && (
          <SelectInput
            label="Role"
            options={ROLES}
            value={values.role}
            onChange={set('role')}
          />
        )}

        {!isEdit && (
          <>
            <TextInput
              label="Username"
              value={values.username}
              onChange={set('username')}
              error={errors.username}
              placeholder="login username"
              autoComplete="off"
            />
            <PasswordInput
              label="Password"
              value={values.password}
              onChange={set('password')}
              error={errors.password}
              placeholder="min 6 characters"
              autoComplete="new-password"
            />
          </>
        )}
      </div>

      <div className="flex gap-3 mt-4">
        <button className="btn btn-secondary" onClick={onCancel} style={{ flex: 1 }}>
          Cancel
        </button>
        <button
          className="btn btn-primary"
          onClick={handleSubmit}
          disabled={loading}
          style={{ flex: 2 }}
        >
          {loading
            ? <><Spinner size={14} />{isEdit ? ' Saving…' : ' Adding…'}</>
            : isEdit ? '✓ Save Changes' : '+ Add Employee'}
        </button>
      </div>
    </div>
  );
}
