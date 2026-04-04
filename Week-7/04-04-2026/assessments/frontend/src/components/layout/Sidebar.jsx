import React from 'react';
import { Home, ShoppingCart, List, Archive, History, BarChart3 } from 'lucide-react';
import './Sidebar.css';

/**
 * Sidebar Component that handles main application navigation.
 * Uses a list of tabs mapping to main views in the application.
 * @param {string} activeTab - The currently selected tab ID.
 * @param {Function} setActiveTab - The state setter for changing tabs.
 */
export const Sidebar = ({ activeTab, setActiveTab }) => {
  const navItems = [
    { id: 'pos', label: 'New Bill', icon: ShoppingCart },
    { id: 'drafts', label: 'Drafts', icon: Archive },
    { id: 'history', label: 'Completed Bills', icon: History },
    { id: 'reports', label: 'Sales Summary', icon: BarChart3 },
    { id: 'catalogs', label: 'Manage Catalogs', icon: List }
  ];

  return (
    <aside className="sidebar glass">
      <div className="sidebar-header">
        <div className="logo-icon bg-primary">
          <Home size={24} color="white" />
        </div>
        <h2 className="h3">BillGen Pro</h2>
      </div>

      <nav className="sidebar-nav">
        {navItems.map(item => (
          <button
            key={item.id}
            className={`nav-item ${activeTab === item.id ? 'active' : ''}`}
            onClick={() => setActiveTab(item.id)}
          >
            <item.icon size={20} className="nav-icon" />
            <span className="nav-label">{item.label}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
};
