import React, { useState, useCallback } from 'react';
import { useEmployees } from '../../contexts/EmployeeContext';
import EmployeeForm from '../../components/EmployeeForm/EmployeeForm';
import { FiSearch, FiPlus, FiEdit2, FiTrash2, FiMail, FiPhone, FiFilter } from 'react-icons/fi';
import './Employees.css';

export default function Employees() {
  const {
    filteredEmployees,
    searchTerm,
    filterDepartment,
    filterStatus,
    departments,
    setSearchTerm,
    setFilter,
    deleteEmployee,
  } = useEmployees();

  const [showForm, setShowForm] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [viewMode, setViewMode] = useState('table'); // 'table' or 'grid'

  const handleEdit = useCallback((emp) => {
    setEditingEmployee(emp);
    setShowForm(true);
  }, []);

  const handleDelete = useCallback((id) => {
    deleteEmployee(id);
    setDeleteConfirm(null);
  }, [deleteEmployee]);

  const handleCloseForm = useCallback(() => {
    setShowForm(false);
    setEditingEmployee(null);
  }, []);

  return (
    <div className="employees fade-in">
      {/* Header */}
      <div className="employees__header">
        <div className="employees__header-left">
          <h2 className="employees__title">Employee Directory</h2>
          <span className="employees__count">{filteredEmployees.length} employees</span>
        </div>
        <button className="employees__add-btn" onClick={() => setShowForm(true)} id="add-employee-btn">
          <FiPlus />
          <span>Add Employee</span>
        </button>
      </div>

      {/* Filters */}
      <div className="employees__filters">
        <div className="employees__search">
          <FiSearch className="employees__search-icon" />
          <input
            type="text"
            placeholder="Search by name, email, department..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="employees__search-input"
            id="employee-search"
          />
        </div>
        <div className="employees__filter-group">
          <FiFilter className="employees__filter-icon" />
          <select
            value={filterDepartment}
            onChange={(e) => setFilter('filterDepartment', e.target.value)}
            className="employees__select"
            id="filter-department"
          >
            {departments.map((d) => (
              <option key={d} value={d}>{d === 'All' ? 'All Departments' : d}</option>
            ))}
          </select>
          <select
            value={filterStatus}
            onChange={(e) => setFilter('filterStatus', e.target.value)}
            className="employees__select"
            id="filter-status"
          >
            <option value="All">All Status</option>
            <option value="Active">Active</option>
            <option value="On Leave">On Leave</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
        <div className="employees__view-toggle">
          <button
            className={`employees__view-btn ${viewMode === 'table' ? 'employees__view-btn--active' : ''}`}
            onClick={() => setViewMode('table')}
          >
            ☰
          </button>
          <button
            className={`employees__view-btn ${viewMode === 'grid' ? 'employees__view-btn--active' : ''}`}
            onClick={() => setViewMode('grid')}
          >
            ▦
          </button>
        </div>
      </div>

      {/* Table View */}
      {viewMode === 'table' ? (
        <div className="employees__table-wrap">
          <table className="employees__table">
            <thead>
              <tr>
                <th>Employee</th>
                <th>Department</th>
                <th>Position</th>
                <th>Salary</th>
                <th>Status</th>
                <th>Join Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredEmployees.map((emp) => (
                <tr key={emp.id} className="employees__row">
                  <td>
                    <div className="employees__cell-user">
                      <div className="employees__cell-avatar">
                        {emp.name.split(' ').map((n) => n[0]).join('')}
                      </div>
                      <div className="employees__cell-info">
                        <span className="employees__cell-name">{emp.name}</span>
                        <span className="employees__cell-email">{emp.email}</span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className="employees__dept-badge">{emp.department}</span>
                  </td>
                  <td className="employees__cell-position">{emp.position}</td>
                  <td className="employees__cell-salary">₹{emp.salary.toLocaleString()}</td>
                  <td>
                    <span className={`employees__status employees__status--${emp.status.toLowerCase().replace(' ', '-')}`}>
                      {emp.status}
                    </span>
                  </td>
                  <td className="employees__cell-date">
                    {new Date(emp.joinDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </td>
                  <td>
                    <div className="employees__actions">
                      <button className="employees__action-btn employees__action-btn--edit" onClick={() => handleEdit(emp)} title="Edit">
                        <FiEdit2 />
                      </button>
                      <button
                        className="employees__action-btn employees__action-btn--delete"
                        onClick={() => setDeleteConfirm(emp.id)}
                        title="Delete"
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredEmployees.length === 0 && (
            <div className="employees__empty">
              <span className="employees__empty-icon">🔍</span>
              <p>No employees found matching your criteria.</p>
            </div>
          )}
        </div>
      ) : (
        /* Grid View */
        <div className="employees__grid">
          {filteredEmployees.map((emp) => (
            <div key={emp.id} className="emp-card">
              <div className="emp-card__header">
                <div className="emp-card__avatar">
                  {emp.name.split(' ').map((n) => n[0]).join('')}
                </div>
                <span className={`emp-card__status emp-card__status--${emp.status.toLowerCase().replace(' ', '-')}`}>
                  {emp.status}
                </span>
              </div>
              <h4 className="emp-card__name">{emp.name}</h4>
              <p className="emp-card__position">{emp.position}</p>
              <div className="emp-card__dept">{emp.department}</div>
              <div className="emp-card__details">
                <div className="emp-card__detail">
                  <FiMail />
                  <span>{emp.email}</span>
                </div>
                <div className="emp-card__detail">
                  <FiPhone />
                  <span>{emp.phone}</span>
                </div>
              </div>
              <div className="emp-card__footer">
                <span className="emp-card__salary">₹{emp.salary.toLocaleString()}</span>
                <div className="emp-card__actions">
                  <button className="employees__action-btn employees__action-btn--edit" onClick={() => handleEdit(emp)}>
                    <FiEdit2 />
                  </button>
                  <button className="employees__action-btn employees__action-btn--delete" onClick={() => setDeleteConfirm(emp.id)}>
                    <FiTrash2 />
                  </button>
                </div>
              </div>
            </div>
          ))}
          {filteredEmployees.length === 0 && (
            <div className="employees__empty employees__empty--grid">
              <span className="employees__empty-icon">🔍</span>
              <p>No employees found matching your criteria.</p>
            </div>
          )}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="modal-overlay" onClick={() => setDeleteConfirm(null)}>
          <div className="modal-confirm" onClick={(e) => e.stopPropagation()}>
            <div className="modal-confirm__icon">🗑️</div>
            <h3 className="modal-confirm__title">Delete Employee</h3>
            <p className="modal-confirm__text">Are you sure you want to delete this employee? This action cannot be undone.</p>
            <div className="modal-confirm__actions">
              <button className="modal-confirm__btn modal-confirm__btn--cancel" onClick={() => setDeleteConfirm(null)}>Cancel</button>
              <button className="modal-confirm__btn modal-confirm__btn--delete" onClick={() => handleDelete(deleteConfirm)}>Delete</button>
            </div>
          </div>
        </div>
      )}

      {/* Employee Form Modal */}
      {showForm && (
        <EmployeeForm
          employee={editingEmployee}
          onClose={handleCloseForm}
        />
      )}
    </div>
  );
}
