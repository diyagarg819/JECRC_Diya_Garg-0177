import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Sidebar from './Sidebar';
import TopBar from './TopBar';
import DashboardStats from './DashboardStats';
import EmployeeTable from './EmployeeTable';

const Dashboard = () => {
  const { sidebarCollapsed } = useSelector((state) => state.ui);
  const [activeView, setActiveView] = useState('dashboard');

  const getPageTitle = () => {
    switch (activeView) {
      case 'dashboard': return { title: 'Dashboard', subtitle: 'Welcome back! Here\'s your overview.' };
      case 'employees': return { title: 'Employees', subtitle: 'Manage your team members.' };
      default: return { title: 'Dashboard', subtitle: '' };
    }
  };

  const { title, subtitle } = getPageTitle();

  return (
    <div className="app-layout" id="app-layout">
      <Sidebar activeView={activeView} setActiveView={setActiveView} />

      <div className={`main-content ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
        <TopBar title={title} subtitle={subtitle} />

        <div className="page-content">
          {activeView === 'dashboard' && (
            <>
              <DashboardStats />
              <EmployeeTable />
            </>
          )}
          {activeView === 'employees' && (
            <EmployeeTable />
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
