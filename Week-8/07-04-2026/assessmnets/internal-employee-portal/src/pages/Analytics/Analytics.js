import React from 'react';
import { useEmployees } from '../../contexts/EmployeeContext';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend,
  LineChart, Line, Area, AreaChart,
} from 'recharts';
import './Analytics.css';

const CHART_COLORS = ['#6366f1', '#10b981', '#f59e0b', '#ef4444', '#06b6d4', '#8b5cf6', '#ec4899'];

export default function Analytics() {
  const { employees, departmentStats } = useEmployees();

  // Department distribution data
  const deptData = Object.entries(departmentStats).map(([name, stats], idx) => ({
    name,
    employees: stats.count,
    avgSalary: Math.round(stats.totalSalary / stats.count),
    color: CHART_COLORS[idx % CHART_COLORS.length],
  }));

  // Status distribution
  const statusCounts = employees.reduce((acc, emp) => {
    acc[emp.status] = (acc[emp.status] || 0) + 1;
    return acc;
  }, {});

  const statusData = Object.entries(statusCounts).map(([name, value], idx) => ({
    name,
    value,
    color: name === 'Active' ? '#10b981' : name === 'Inactive' ? '#ef4444' : '#f59e0b',
  }));

  // Monthly hiring trend (simulated from join dates)
  const monthlyHires = employees.reduce((acc, emp) => {
    const date = new Date(emp.joinDate);
    const monthKey = date.toLocaleString('default', { month: 'short', year: '2-digit' });
    acc[monthKey] = (acc[monthKey] || 0) + 1;
    return acc;
  }, {});

  const hiringData = Object.entries(monthlyHires)
    .sort(([a], [b]) => new Date(a) - new Date(b))
    .map(([month, count]) => ({ month, hires: count }));

  // Salary distribution by department
  const salaryData = deptData.map((d) => ({
    name: d.name,
    avgSalary: d.avgSalary,
  }));

  // Key metrics
  const totalPayroll = employees.reduce((sum, e) => sum + e.salary, 0);
  const highestPaid = [...employees].sort((a, b) => b.salary - a.salary)[0];
  const avgTenure = (() => {
    const now = new Date();
    const totalMonths = employees.reduce((sum, e) => {
      const joinDate = new Date(e.joinDate);
      const months = (now.getFullYear() - joinDate.getFullYear()) * 12 + (now.getMonth() - joinDate.getMonth());
      return sum + months;
    }, 0);
    return Math.round(totalMonths / employees.length);
  })();

  return (
    <div className="analytics fade-in">
      <div className="analytics__header">
        <h2 className="analytics__title">Analytics & Reports</h2>
        <p className="analytics__subtitle">Comprehensive insights about your workforce</p>
      </div>

      {/* Key Metrics */}
      <div className="analytics__metrics">
        <div className="metric-card">
          <span className="metric-card__label">Total Monthly Payroll</span>
          <span className="metric-card__value">₹{totalPayroll.toLocaleString()}</span>
        </div>
        <div className="metric-card">
          <span className="metric-card__label">Highest Paid Employee</span>
          <span className="metric-card__value metric-card__value--sm">{highestPaid?.name}</span>
          <span className="metric-card__sub">₹{highestPaid?.salary.toLocaleString()}</span>
        </div>
        <div className="metric-card">
          <span className="metric-card__label">Average Tenure</span>
          <span className="metric-card__value">{avgTenure} months</span>
        </div>
        <div className="metric-card">
          <span className="metric-card__label">Retention Rate</span>
          <span className="metric-card__value">{Math.round((statusCounts['Active'] || 0) / employees.length * 100)}%</span>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="analytics__grid">
        {/* Department Bar Chart */}
        <div className="analytics__card analytics__card--wide">
          <h3 className="analytics__card-title">Employees by Department</h3>
          <div className="analytics__chart">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={deptData} barSize={40}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
                <XAxis dataKey="name" tick={{ fill: 'var(--text-secondary)', fontSize: 12 }} />
                <YAxis tick={{ fill: 'var(--text-secondary)', fontSize: 12 }} />
                <Tooltip
                  contentStyle={{
                    background: 'var(--bg-secondary)',
                    border: '1px solid var(--border-color)',
                    borderRadius: '12px',
                    boxShadow: 'var(--shadow-lg)',
                  }}
                  labelStyle={{ color: 'var(--text-primary)', fontWeight: 600 }}
                />
                <Bar dataKey="employees" radius={[8, 8, 0, 0]}>
                  {deptData.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Status Pie Chart */}
        <div className="analytics__card">
          <h3 className="analytics__card-title">Employee Status</h3>
          <div className="analytics__chart">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {statusData.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    background: 'var(--bg-secondary)',
                    border: '1px solid var(--border-color)',
                    borderRadius: '12px',
                  }}
                />
                <Legend
                  formatter={(value) => <span style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>{value}</span>}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Salary Area Chart */}
        <div className="analytics__card">
          <h3 className="analytics__card-title">Avg Salary by Department</h3>
          <div className="analytics__chart">
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={salaryData}>
                <defs>
                  <linearGradient id="salaryGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
                <XAxis dataKey="name" tick={{ fill: 'var(--text-secondary)', fontSize: 11 }} />
                <YAxis tick={{ fill: 'var(--text-secondary)', fontSize: 12 }} />
                <Tooltip
                  contentStyle={{
                    background: 'var(--bg-secondary)',
                    border: '1px solid var(--border-color)',
                    borderRadius: '12px',
                  }}
                  formatter={(value) => [`₹${value.toLocaleString()}`, 'Avg Salary']}
                />
                <Area type="monotone" dataKey="avgSalary" stroke="#6366f1" fill="url(#salaryGradient)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Hiring Trend */}
        <div className="analytics__card analytics__card--wide">
          <h3 className="analytics__card-title">Hiring Trends</h3>
          <div className="analytics__chart">
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={hiringData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
                <XAxis dataKey="month" tick={{ fill: 'var(--text-secondary)', fontSize: 12 }} />
                <YAxis tick={{ fill: 'var(--text-secondary)', fontSize: 12 }} allowDecimals={false} />
                <Tooltip
                  contentStyle={{
                    background: 'var(--bg-secondary)',
                    border: '1px solid var(--border-color)',
                    borderRadius: '12px',
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="hires"
                  stroke="#10b981"
                  strokeWidth={3}
                  dot={{ r: 5, fill: '#10b981', strokeWidth: 2, stroke: '#fff' }}
                  activeDot={{ r: 7 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
