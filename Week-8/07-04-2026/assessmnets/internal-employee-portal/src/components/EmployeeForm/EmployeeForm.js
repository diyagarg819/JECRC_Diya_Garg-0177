import React, { useState, useEffect } from 'react';
import { useEmployees } from '../../contexts/EmployeeContext';
import { FiX } from 'react-icons/fi';
import './EmployeeForm.css';

const emptyForm = {
  name: '',
  email: '',
  department: 'Engineering',
  position: '',
  salary: '',
  status: 'Active',
  phone: '',
  joinDate: new Date().toISOString().split('T')[0],
};

const departmentOptions = ['Engineering', 'Design', 'Marketing', 'HR', 'Finance', 'Sales', 'Management'];
const statusOptions = ['Active', 'On Leave', 'Inactive'];

export default function EmployeeForm({ employee, onClose }) {
  const { addEmployee, updateEmployee } = useEmployees();
  const isEditing = Boolean(employee);
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (employee) {
      setForm({
        name: employee.name,
        email: employee.email,
        department: employee.department,
        position: employee.position,
        salary: employee.salary.toString(),
        status: employee.status,
        phone: employee.phone,
        joinDate: employee.joinDate,
      });
    }
  }, [employee]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = 'Name is required';
    if (!form.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = 'Invalid email format';
    if (!form.position.trim()) newErrors.position = 'Position is required';
    if (!form.salary) newErrors.salary = 'Salary is required';
    else if (isNaN(form.salary) || Number(form.salary) <= 0) newErrors.salary = 'Enter a valid salary';
    if (!form.phone.trim()) newErrors.phone = 'Phone is required';
    if (!form.joinDate) newErrors.joinDate = 'Join date is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const employeeData = {
      ...form,
      salary: Number(form.salary),
    };

    if (isEditing) {
      updateEmployee({ ...employeeData, id: employee.id });
    } else {
      addEmployee(employeeData);
    }
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="emp-form" onClick={(e) => e.stopPropagation()}>
        <div className="emp-form__header">
          <h3 className="emp-form__title">{isEditing ? 'Edit Employee' : 'Add New Employee'}</h3>
          <button className="emp-form__close" onClick={onClose} aria-label="Close">
            <FiX />
          </button>
        </div>

        <form className="emp-form__body" onSubmit={handleSubmit}>
          <div className="emp-form__row">
            <div className="emp-form__field">
              <label className="emp-form__label">Full Name *</label>
              <input
                type="text"
                name="name"
                className={`emp-form__input ${errors.name ? 'emp-form__input--error' : ''}`}
                value={form.name}
                onChange={handleChange}
                placeholder="e.g. John Doe"
              />
              {errors.name && <span className="emp-form__error">{errors.name}</span>}
            </div>
            <div className="emp-form__field">
              <label className="emp-form__label">Email *</label>
              <input
                type="email"
                name="email"
                className={`emp-form__input ${errors.email ? 'emp-form__input--error' : ''}`}
                value={form.email}
                onChange={handleChange}
                placeholder="e.g. john@company.com"
              />
              {errors.email && <span className="emp-form__error">{errors.email}</span>}
            </div>
          </div>

          <div className="emp-form__row">
            <div className="emp-form__field">
              <label className="emp-form__label">Department *</label>
              <select
                name="department"
                className="emp-form__input"
                value={form.department}
                onChange={handleChange}
              >
                {departmentOptions.map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>
            <div className="emp-form__field">
              <label className="emp-form__label">Position *</label>
              <input
                type="text"
                name="position"
                className={`emp-form__input ${errors.position ? 'emp-form__input--error' : ''}`}
                value={form.position}
                onChange={handleChange}
                placeholder="e.g. Software Engineer"
              />
              {errors.position && <span className="emp-form__error">{errors.position}</span>}
            </div>
          </div>

          <div className="emp-form__row">
            <div className="emp-form__field">
              <label className="emp-form__label">Salary (₹) *</label>
              <input
                type="number"
                name="salary"
                className={`emp-form__input ${errors.salary ? 'emp-form__input--error' : ''}`}
                value={form.salary}
                onChange={handleChange}
                placeholder="e.g. 80000"
              />
              {errors.salary && <span className="emp-form__error">{errors.salary}</span>}
            </div>
            <div className="emp-form__field">
              <label className="emp-form__label">Status</label>
              <select
                name="status"
                className="emp-form__input"
                value={form.status}
                onChange={handleChange}
              >
                {statusOptions.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="emp-form__row">
            <div className="emp-form__field">
              <label className="emp-form__label">Phone *</label>
              <input
                type="text"
                name="phone"
                className={`emp-form__input ${errors.phone ? 'emp-form__input--error' : ''}`}
                value={form.phone}
                onChange={handleChange}
                placeholder="e.g. +91 98765 43210"
              />
              {errors.phone && <span className="emp-form__error">{errors.phone}</span>}
            </div>
            <div className="emp-form__field">
              <label className="emp-form__label">Join Date *</label>
              <input
                type="date"
                name="joinDate"
                className={`emp-form__input ${errors.joinDate ? 'emp-form__input--error' : ''}`}
                value={form.joinDate}
                onChange={handleChange}
              />
              {errors.joinDate && <span className="emp-form__error">{errors.joinDate}</span>}
            </div>
          </div>

          <div className="emp-form__footer">
            <button type="button" className="emp-form__btn emp-form__btn--cancel" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="emp-form__btn emp-form__btn--submit">
              {isEditing ? 'Update Employee' : 'Add Employee'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
