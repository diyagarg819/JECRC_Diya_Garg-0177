import React, { useState, useEffect } from 'react';

const EmployeeModal = ({ isOpen, onClose, onSave, employee }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    department: 'Engineering',
    role: '',
    salary: '',
    status: 'Active',
    joinDate: new Date().toISOString().split('T')[0],
  });

  const departments = ['Engineering', 'Design', 'Marketing', 'HR', 'Finance', 'Sales', 'Operations'];
  const statuses = ['Active', 'On Leave', 'Inactive'];

  useEffect(() => {
    if (employee) {
      setFormData({
        name: employee.name || '',
        email: employee.email || '',
        department: employee.department || 'Engineering',
        role: employee.role || '',
        salary: employee.salary || '',
        status: employee.status || 'Active',
        joinDate: employee.joinDate || new Date().toISOString().split('T')[0],
      });
    } else {
      setFormData({
        name: '',
        email: '',
        department: 'Engineering',
        role: '',
        salary: '',
        status: 'Active',
        joinDate: new Date().toISOString().split('T')[0],
      });
    }
  }, [employee, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...formData,
      salary: Number(formData.salary),
      ...(employee ? { id: employee.id } : {}),
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose} id="employee-modal-overlay">
      <div className="modal slide-in" onClick={(e) => e.stopPropagation()} id="employee-modal">
        <div className="modal-header">
          <h2>{employee ? '✏️ Edit Employee' : '➕ Add New Employee'}</h2>
          <button className="modal-close" onClick={onClose} id="btn-modal-close">✕</button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="emp-name">Full Name</label>
                <input
                  type="text"
                  id="emp-name"
                  name="name"
                  className="form-input"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="emp-email">Email</label>
                <input
                  type="email"
                  id="emp-email"
                  name="email"
                  className="form-input"
                  placeholder="john@company.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="emp-department">Department</label>
                <select
                  id="emp-department"
                  name="department"
                  className="form-input"
                  value={formData.department}
                  onChange={handleChange}
                >
                  {departments.map((dept) => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="emp-role">Role</label>
                <input
                  type="text"
                  id="emp-role"
                  name="role"
                  className="form-input"
                  placeholder="Software Engineer"
                  value={formData.role}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="emp-salary">Salary ($)</label>
                <input
                  type="number"
                  id="emp-salary"
                  name="salary"
                  className="form-input"
                  placeholder="75000"
                  value={formData.salary}
                  onChange={handleChange}
                  required
                  min="0"
                />
              </div>
              <div className="form-group">
                <label htmlFor="emp-status">Status</label>
                <select
                  id="emp-status"
                  name="status"
                  className="form-input"
                  value={formData.status}
                  onChange={handleChange}
                >
                  {statuses.map((status) => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="emp-joindate">Join Date</label>
              <input
                type="date"
                id="emp-joindate"
                name="joinDate"
                className="form-input"
                value={formData.joinDate}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn-cancel" onClick={onClose} id="btn-modal-cancel">
              Cancel
            </button>
            <button type="submit" className="btn-save" id="btn-modal-save">
              {employee ? 'Update Employee' : 'Add Employee'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmployeeModal;
