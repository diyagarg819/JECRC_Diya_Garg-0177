import { useState, useCallback } from 'react';

export function useForm(initialValues, validationRules) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const handleChange = useCallback((field) => (e) => {
    const value = e.target.value;
    setValues((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  }, [errors]);

  const handleBlur = useCallback((field) => () => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  }, []);

  const validate = useCallback(() => {
    const newErrors = {};
    Object.entries(validationRules).forEach(([field, rules]) => {
      const value = values[field];
      for (const rule of rules) {
        const error = rule(value, values);
        if (error) { newErrors[field] = error; break; }
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [values, validationRules]);

  const reset = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
  }, [initialValues]);

  const setField = useCallback((field, value) => {
    setValues((prev) => ({ ...prev, [field]: value }));
  }, []);

  return { values, errors, touched, handleChange, handleBlur, validate, reset, setField };
}

// ─── Reusable validators ──────────────────────────────────────────────────────
export const validators = {
  required: (msg = 'This field is required') => (v) =>
    !v || !String(v).trim() ? msg : null,

  email: (v) =>
    v && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? 'Enter a valid email address' : null,

  minLength: (min, msg) => (v) =>
    v && v.length < min ? (msg || `Minimum ${min} characters`) : null,

  positiveNumber: (v) =>
    v && (isNaN(Number(v)) || Number(v) <= 0) ? 'Must be a positive number' : null,

  alphanumeric: (v) =>
    v && !/^[a-zA-Z0-9_]+$/.test(v) ? 'Only letters, numbers, and underscores' : null,
};
