import React from 'react';
import { Avatar, Badge, EmptyState } from '../ui';
import { getDeptColor, getRoleColor, formatSalary, formatDate } from '../../utils/data';
import { useAuth } from '../../context/AuthContext';

export default function EmployeeTable({ employees, onEdit, onDelete }) {
  const { user } = useAuth();

  if (employees.length === 0) {
    return (
      <div className="table-wrapper">
        <EmptyState
          icon="👥"
          title="No employees found"
          subtitle="Try adjusting your search or filters"
        />
      </div>
    );
  }

  return (
    <div className="table-wrapper">
      <div className="table-scroll">
        <table>
          <thead>
            <tr>
              <th>Employee</th>
              <th>Department</th>
              <th>Position</th>
              <th>Salary</th>
              <th>Joined</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((emp) => (
              <tr key={emp.id} className="anim-fade">
                <td>
                  <div className="flex-center gap-3">
                    <Avatar name={emp.name} id={emp.id} size="sm" />
                    <div>
                      <div style={{ fontWeight: 500 }}>{emp.name}</div>
                      <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>
                        {emp.email}
                      </div>
                    </div>
                  </div>
                </td>
                <td>
                  <Badge label={emp.dept} color={getDeptColor(emp.dept)} />
                </td>
                <td style={{ color: 'var(--text-secondary)' }}>{emp.position}</td>
                <td style={{ fontVariantNumeric: 'tabular-nums' }}>
                  {formatSalary(emp.salary)}
                </td>
                <td style={{ color: 'var(--text-secondary)', fontSize: 12 }}>
                  {formatDate(emp.joined)}
                </td>
                <td>
                  <Badge label={emp.role} color={getRoleColor(emp.role)} />
                </td>
                <td>
                  <div className="flex gap-2">
                    <button
                      className="btn btn-icon-edit"
                      onClick={() => onEdit(emp)}
                      title="Edit employee"
                    >
                      ✏ Edit
                    </button>
                    <button
                      className="btn btn-icon-delete"
                      onClick={() => onDelete(emp)}
                      disabled={emp.id === user.id}
                      title={emp.id === user.id ? "Can't delete yourself" : 'Delete employee'}
                    >
                      ✕
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
