import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import { useAuth } from '../../context/AuthContext';
import DashboardPage from '../../pages/DashboardPage';
import EmployeesPage from '../../pages/EmployeesPage';
import ProfilePage from '../../pages/ProfilePage';

const PAGES = {
  dashboard: DashboardPage,
  employees: EmployeesPage,
  profile:   ProfilePage,
};

export default function AppLayout() {
  const { user } = useAuth();
  const [page, setPage] = useState('dashboard');

  // Employees page restricted to admin only
  const safePage =
    page === 'employees' && user.role !== 'admin' ? 'dashboard' : page;

  const PageComponent = PAGES[safePage] || DashboardPage;

  return (
    <div className="app-layout">
      <Sidebar currentPage={safePage} onNavigate={setPage} />
      <div className="main-area">
        <Topbar currentPage={safePage} />
        <main className="page-content anim-fade">
          <PageComponent onNavigate={setPage} />
        </main>
      </div>
    </div>
  );
}
