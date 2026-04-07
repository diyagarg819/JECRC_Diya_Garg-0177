import React from 'react';
import { useEmployees } from '../../contexts/EmployeeContext';
import { useAuth } from '../../contexts/AuthContext';
import { FiUsers, FiDollarSign, FiBriefcase, FiTrendingUp, FiArrowUpRight, FiArrowDownRight } from 'react-icons/fi';
import './Dashboard.css';

export default function Dashboard() {
  const { employees, departmentStats } = useEmployees();
  const { user, loginTime } = useAuth();

  const totalEmployees = employees.length;
  const activeEmployees = employees.filter((e) => e.status === 'Active').length;
  const totalSalary = employees.reduce((sum, e) => sum + e.salary, 0);
  const avgSalary = Math.round(totalSalary / totalEmployees);
  const departments = Object.keys(departmentStats).length;

  const recentEmployees = [...employees].sort((a, b) => new Date(b.joinDate) - new Date(a.joinDate)).slice(0, 5);

  const statCards = [
    {
      title: 'Total Employees',
      value: totalEmployees,
      change: '+12%',
      isPositive: true,
      icon: FiUsers,
      gradient: 'stat-card--indigo',
    },
    {
      title: 'Active Employees',
      value: activeEmployees,
      change: '+8%',
      isPositive: true,
      icon: FiTrendingUp,
      gradient: 'stat-card--emerald',
    },
    {
      title: 'Avg. Salary',
      value: `₹${avgSalary.toLocaleString()}`,
      change: '+5%',
      isPositive: true,
      icon: FiDollarSign,
      gradient: 'stat-card--amber',
    },
    {
      title: 'Departments',
      value: departments,
      change: '0%',
      isPositive: true,
      icon: FiBriefcase,
      gradient: 'stat-card--cyan',
    },
  ];

  return (
    <div className="dashboard fade-in">
      {/* Welcome Banner */}
      <div className="dashboard__banner">
        <div className="dashboard__banner-content">
          <h2 className="dashboard__banner-title">
            Welcome back, {user?.name}! 🎉
          </h2>
          <p className="dashboard__banner-text">
            Here's what's happening with your team today. You logged in at{' '}
            {loginTime ? new Date(loginTime).toLocaleTimeString() : 'N/A'}.
          </p>
        </div>
        <div className="dashboard__banner-illustration">
          <div className="dashboard__banner-circle dashboard__banner-circle--1" />
          <div className="dashboard__banner-circle dashboard__banner-circle--2" />
          <div className="dashboard__banner-circle dashboard__banner-circle--3" />
        </div>
      </div>

      {/* Stats Grid */}
      <div className="dashboard__stats">
        {statCards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <div key={idx} className={`stat-card ${card.gradient}`} style={{ animationDelay: `${idx * 0.1}s` }}>
              <div className="stat-card__header">
                <span className="stat-card__title">{card.title}</span>
                <div className="stat-card__icon-wrap">
                  <Icon />
                </div>
              </div>
              <div className="stat-card__value">{card.value}</div>
              <div className={`stat-card__change ${card.isPositive ? 'stat-card__change--up' : 'stat-card__change--down'}`}>
                {card.isPositive ? <FiArrowUpRight /> : <FiArrowDownRight />}
                <span>{card.change} from last month</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Two-column layout */}
      <div className="dashboard__grid">
        {/* Department breakdown */}
        <div className="dashboard__card">
          <h3 className="dashboard__card-title">Department Breakdown</h3>
          <div className="dept-list">
            {Object.entries(departmentStats).map(([dept, stats], idx) => {
              const percentage = Math.round((stats.count / totalEmployees) * 100);
              const colors = ['#6366f1', '#10b981', '#f59e0b', '#ef4444', '#06b6d4', '#8b5cf6'];
              const color = colors[idx % colors.length];
              return (
                <div key={dept} className="dept-item">
                  <div className="dept-item__header">
                    <div className="dept-item__info">
                      <div className="dept-item__dot" style={{ background: color }} />
                      <span className="dept-item__name">{dept}</span>
                    </div>
                    <div className="dept-item__meta">
                      <span className="dept-item__count">{stats.count} employees</span>
                      <span className="dept-item__pct">{percentage}%</span>
                    </div>
                  </div>
                  <div className="dept-item__bar">
                    <div
                      className="dept-item__bar-fill"
                      style={{ width: `${percentage}%`, background: color }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recent employees */}
        <div className="dashboard__card">
          <h3 className="dashboard__card-title">Recent Joiners</h3>
          <div className="recent-list">
            {recentEmployees.map((emp) => (
              <div key={emp.id} className="recent-item">
                <div className="recent-item__avatar">
                  {emp.name.split(' ').map((n) => n[0]).join('')}
                </div>
                <div className="recent-item__info">
                  <span className="recent-item__name">{emp.name}</span>
                  <span className="recent-item__role">{emp.position}</span>
                </div>
                <div className="recent-item__right">
                  <span className={`recent-item__status recent-item__status--${emp.status.toLowerCase().replace(' ', '-')}`}>
                    {emp.status}
                  </span>
                  <span className="recent-item__date">{new Date(emp.joinDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
