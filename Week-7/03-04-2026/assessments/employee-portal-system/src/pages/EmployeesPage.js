import React, { useState, useMemo } from 'react';
import { useAuth } from '../context/AuthContext';
import { useEmployees } from '../context/EmployeeContext';
import { Alert, Modal, ConfirmDelete, AccessDenied } from '../components/ui';
import EmployeeForm  from '../components/employees/EmployeeForm';
import EmployeeTable from '../components/employees/EmployeeTable';
import { useAlert } from '../hooks/useAlert';
import { DEPARTMENTS } from '../utils/data';

export default function EmployeesPage() {
  const { user }                                    = useAuth();
  const { employees, addEmployee, updateEmployee, deleteEmployee } = useEmployees();
  const { alert, showAlert, clearAlert }            = useAlert();

  // ── Filters ─────────────────────────────────────────────────────────────────
  const [search,     setSearch]     = useState('');
  const [deptFilter, setDeptFilter] = useState('');
  const [roleFilter, setRoleFilter] = useState('');

  // ── Modals ───────────────────────────────────────────────────────────────────
  const [addOpen,    setAddOpen]    = useState(false);
  const [editTarget, setEditTarget] = useState(null);   // employee obj
  const [delTarget,  setDelTarget]  = useState(null);   // employee obj
  const [delLoading, setDelLoading] = useState(false);

  // ── Guard ────────────────────────────────────────────────────────────────────
  if (user.role !== 'admin') return <AccessDenied />;

  // ── Derived list ─────────────────────────────────────────────────────────────
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return employees.filter((e) => {
      const matchQ = !q || [e.name, e.email, e.position, e.dept]
        .some((f) => f?.toLowerCase().includes(q));
      const matchD = !deptFilter || e.dept === deptFilter;
      const matchR = !roleFilter || e.role === roleFilter;
      return matchQ && matchD && matchR;
    });
  }, [employees, search, deptFilter, roleFilter]);

  // ── Handlers ─────────────────────────────────────────────────────────────────
  const handleAdd = (data) => {
    addEmployee(data);
    setAddOpen(false);
    showAlert('success', `${data.name} has been added successfully.`);
  };

  const handleEdit = (data) => {
    updateEmployee(data);
    setEditTarget(null);
    showAlert('success', `${data.name}'s record has been updated.`);
  };

  const handleDelete = () => {
    setDelLoading(true);
    setTimeout(() => {
      deleteEmployee(delTarget.id);
      showAlert('warning', `${delTarget.name} has been removed.`);
      setDelTarget(null);
      setDelLoading(false);
    }, 500);
  };

  const clearFilters = () => { setSearch(''); setDeptFilter(''); setRoleFilter(''); };
  const hasFilters   = search || deptFilter || roleFilter;

  return (
    <div className="anim-fade">
      {/* Page header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">Employees</h1>
          <p className="page-subtitle">
            {filtered.length} of {employees.length} records
            {hasFilters && ' (filtered)'}
          </p>
        </div>
        <button className="btn btn-primary" onClick={() => setAddOpen(true)}>
          + Add Employee
        </button>
      </div>

      {/* Alert */}
      {alert && (
        <Alert type={alert.type} message={alert.message} onClose={clearAlert} />
      )}

      {/* Toolbar */}
      <div className="toolbar">
        <div className="toolbar-search">
          <input
            className="form-input"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="🔍  Search name, email, position…"
          />
        </div>

        <select
          className="form-select"
          style={{ width: 160 }}
          value={deptFilter}
          onChange={(e) => setDeptFilter(e.target.value)}
        >
          <option value="">All Departments</option>
          {DEPARTMENTS.map((d) => <option key={d} value={d}>{d}</option>)}
        </select>

        <select
          className="form-select"
          style={{ width: 130 }}
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
        >
          <option value="">All Roles</option>
          <option value="admin">Admin</option>
          <option value="employee">Employee</option>
        </select>

        {hasFilters && (
          <button className="btn btn-secondary" onClick={clearFilters}>
            ✕ Clear
          </button>
        )}
      </div>

      {/* Table */}
      <EmployeeTable
        employees={filtered}
        onEdit={(emp) => setEditTarget(emp)}
        onDelete={(emp) => setDelTarget(emp)}
      />

      {/* Summary row */}
      {filtered.length > 0 && (
        <p style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 10, textAlign: 'right' }}>
          Showing {filtered.length} employee{filtered.length !== 1 ? 's' : ''}
        </p>
      )}

      {/* ── Add Modal ── */}
      {addOpen && (
        <Modal title="Add New Employee" onClose={() => setAddOpen(false)}>
          <EmployeeForm onSubmit={handleAdd} onCancel={() => setAddOpen(false)} />
        </Modal>
      )}

      {/* ── Edit Modal ── */}
      {editTarget && (
        <Modal title="Edit Employee" onClose={() => setEditTarget(null)}>
          <EmployeeForm
            initial={editTarget}
            onSubmit={handleEdit}
            onCancel={() => setEditTarget(null)}
          />
        </Modal>
      )}

      {/* ── Delete Confirm Modal ── */}
      {delTarget && (
        <Modal title="Confirm Deletion" onClose={() => setDelTarget(null)} maxWidth={420}>
          <ConfirmDelete
            name={delTarget.name}
            onConfirm={handleDelete}
            onCancel={() => setDelTarget(null)}
            loading={delLoading}
          />
        </Modal>
      )}
    </div>
  );
}
