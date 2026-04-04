import React, { useState } from 'react';
import { BillingProvider } from './context/BillingContext';
import { Sidebar } from './components/layout/Sidebar';
// Placeholders for main components we will write soon
import { BillingDash } from './components/billing/BillingDash';
import { CatalogList } from './components/catalog/CatalogList';
import { DraftList } from './components/reports/DraftList';
import { HistoryList } from './components/reports/HistoryList';
import { SummaryReport } from './components/reports/SummaryReport';

/**
 * Main App Component orchestrating the global context and layout rendering.
 */
function App() {
  const [activeTab, setActiveTab] = useState('pos');

  /**
   * Routes the active tab state to the correct screen component.
   * Maintains UI context without page reloads.
   * @returns {JSX.Element} The rendered active screen component.
   */
  const renderActiveTab = () => {
    switch (activeTab) {
      case 'pos': return <BillingDash />;
      case 'catalogs': return <CatalogList />;
      case 'drafts': return <DraftList setActiveTab={setActiveTab} />;
      case 'history': return <HistoryList />;
      case 'reports': return <SummaryReport />;
      default: return <BillingDash />;
    }
  };

  return (
    <BillingProvider>
      <div className="app-container">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        <main className="main-content">
          {renderActiveTab()}
        </main>
      </div>
    </BillingProvider>
  );
}

export default App;
