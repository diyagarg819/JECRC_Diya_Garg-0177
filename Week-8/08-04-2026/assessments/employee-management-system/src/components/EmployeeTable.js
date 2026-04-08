import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  deleteEmployee,
  setSearchQuery,
  setFilterDepartment,
  addEmployee,
  editEmployee,
  selectFilteredEmployees,
  selectDepartments,
} from '../redux/slices/employeeSlice';
import { showNotification, setLoading } from '../redux/slices/uiSlice';
import EmployeeModal from './EmployeeModal';
import DeleteConfirmModal from './DeleteConfirmModal';

const EmployeeTable = () => {
  const dispatch = useDispatch();
  const filteredEmployees = useSelector(selectFilteredEmployees);
  const departments = useSelector(selectDepartments);
  const { searchQuery, filterDepartment } = useSelector((state) => state.employees);

  const [modalOpen, setModalOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [deleteModal, setDeleteModal] = useState({ open: false, employee: null });

  const getInitials = (name) =>
    name.split(' ').map((n) => n[0]).join('').toUpperCase();

  const getStatusClass = (status) => {
    switch (status) {
      case 'Active': return 'active';
      case 'On Leave': return 'on-leave';
      case 'Inactive': return 'inactive';
      default: return '';
    }
  };

  const formatSalary = (salary) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(salary);

  // ─── Dispatch Actions ────────────────────────────────
  const handleAdd = () => {
    setEditingEmployee(null);
    setModalOpen(true);
  };

  const handleEdit = (employee) => {
    setEditingEmployee(employee);
    setModalOpen(true);
  };

  const handleSave = async (data) => {
    dispatch(setLoading(true));
    // Simulate async operation
    await new Promise((resolve) => setTimeout(resolve, 800));

    if (data.id) {
      // Dispatching editEmployee action → goes to reducer → updates state → UI re-renders
      dispatch(editEmployee(data));
      dispatch(showNotification({ type: 'success', message: `${data.name} updated successfully!` }));
    } else {
      // Dispatching addEmployee action → goes to reducer → updates state → UI re-renders
      dispatch(addEmployee(data));
      dispatch(showNotification({ type: 'success', message: `${data.name} added successfully!` }));
    }
    dispatch(setLoading(false));
  };

  const handleDeleteClick = (employee) => {
    setDeleteModal({ open: true, employee });
  };

  const handleDeleteConfirm = async () => {
    dispatch(setLoading(true));
    await new Promise((resolve) => setTimeout(resolve, 600));

    // Dispatching deleteEmployee action → reducer filters out employee → store updates → UI re-renders
    dispatch(deleteEmployee(deleteModal.employee.id));
    dispatch(showNotification({ type: 'success', message: `${deleteModal.employee.name} deleted successfully!` }));
    setDeleteModal({ open: false, employee: null });
    dispatch(setLoading(false));
  };

  return (
    <div className="fade-in">
      {/* Controls */}
      <div className="section-header">
        <h2>Employee Directory</h2>
        <div className="controls-bar">
          <div className="search-wrapper">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              className="search-input"
              id="search-employees"
              placeholder="Search employees..."
              value={searchQuery}
              onChange={(e) => dispatch(setSearchQuery(e.target.value))}
            />
          </div>
          <select
            className="filter-select"
            id="filter-department"
            value={filterDepartment}
            onChange={(e) => dispatch(setFilterDepartment(e.target.value))}
          >
            {departments.map((dept) => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>
          <button className="btn-primary" onClick={handleAdd} id="btn-add-employee">
            <span>+</span>
            <span>Add Employee</span>
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="table-container" id="employee-table-container">
        {filteredEmployees.length > 0 ? (
          <table className="employee-table">
            <thead>
              <tr>
                <th>Employee</th>
                <th>Department</th>
                <th>Role</th>
                <th>Status</th>
                <th>Salary</th>
                <th>Join Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredEmployees.map((emp) => (
                <tr key={emp.id} id={`employee-row-${emp.id}`}>
                  <td>
                    <div className="employee-info">
                      <div className="employee-avatar">{getInitials(emp.name)}</div>
                      <div>
                        <div className="employee-name">{emp.name}</div>
                        <div className="employee-email">{emp.email}</div>
                      </div>
                    </div>
                  </td>
                  <td><span className="dept-badge">{emp.department}</span></td>
                  <td>{emp.role}</td>
                  <td>
                    <span className={`badge ${getStatusClass(emp.status)}`}>
                      <span className="badge-dot"></span>
                      {emp.status}
                    </span>
                  </td>
                  <td><span className="salary-text">{formatSalary(emp.salary)}</span></td>
                  <td style={{ color: 'var(--text-secondary)' }}>
                    {new Date(emp.joinDate).toLocaleDateString('en-US', {
                      year: 'numeric', month: 'short', day: 'numeric'
                    })}
                  </td>
                  <td>
                    <div className="action-btns">
                      <button
                        className="btn-icon"
                        onClick={() => handleEdit(emp)}
                        title="Edit employee"
                        id={`btn-edit-${emp.id}`}
                      >
                        ✏️
                      </button>
                      <button
                        className="btn-icon danger"
                        onClick={() => handleDeleteClick(emp)}
                        title="Delete employee"
                        id={`btn-delete-${emp.id}`}
                      >
                        🗑️
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="empty-state">
            <div className="empty-state-icon">📋</div>
            <h3>No employees found</h3>
            <p>Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>

      {/* Modals */}
      <EmployeeModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
        employee={editingEmployee}
      />
      <DeleteConfirmModal
        isOpen={deleteModal.open}
        onClose={() => setDeleteModal({ open: false, employee: null })}
        onConfirm={handleDeleteConfirm}
        employeeName={deleteModal.employee?.name || ''}
      />
    </div>
  );
};

export default EmployeeTable;
