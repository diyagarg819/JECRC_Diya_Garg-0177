import React from 'react';
import { useSelector } from 'react-redux';
import { selectEmployeeStats } from '../redux/slices/employeeSlice';

const DashboardStats = () => {
  const {
    totalEmployees,
    activeCount,
    onLeaveCount,
    departmentsCount,
  } = useSelector(selectEmployeeStats);

  const stats = [
    {
      icon: '👥',
      iconClass: 'purple',
      value: totalEmployees,
      label: 'Total Employees',
    },
    {
      icon: '✅',
      iconClass: 'green',
      value: activeCount,
      label: 'Active Employees',
    },
    {
      icon: '🏖️',
      iconClass: 'orange',
      value: onLeaveCount,
      label: 'On Leave',
    },
    {
      icon: '🏢',
      iconClass: 'blue',
      value: departmentsCount,
      label: 'Departments',
    },
  ];

  return (
    <div className="stats-grid fade-in" id="stats-grid">
      {stats.map((stat, index) => (
        <div className="stat-card" key={index} id={`stat-card-${index}`}>
          <div className={`stat-icon ${stat.iconClass}`}>{stat.icon}</div>
          <div className="stat-info">
            <h3>{stat.value}</h3>
            <p>{stat.label}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardStats;
