import React from 'react';
import { useBilling } from '../../context/BillingContext';
import { CATALOG_TYPES } from '../../data/initialCatalog';
import { DownloadCloud } from 'lucide-react';
import { format, isSameDay } from 'date-fns';

/**
 * Summary Report generating a daily breakdown of sales performance.
 * Also offers CSV export for broader accounting purposes.
 */
export const SummaryReport = () => {
  const { pastBills } = useBilling();

  // Simple hardcoded today filter for standard "Daily Report" requirements
  // A robust system would let the user pick a date, but this satisfies standard req tracking current session/day.
  const today = new Date();
  const todaysBills = pastBills.filter(bill => isSameDay(new Date(bill.date), today));

  /**
   * Iterates today's bills and tabulates cumulative revenue metrics per category.
   * @returns {Object} A map of analytical totals.
   */
  const calculateDailyMetrics = () => {
    let totalRevenue = 0;
    let totalTaxCollected = 0;
    const categoryTotals = {
      [CATALOG_TYPES.ENTRANCE]: 0,
      [CATALOG_TYPES.DONATION]: 0,
      [CATALOG_TYPES.MERCHANDISE]: 0,
      [CATALOG_TYPES.CUSTOM]: 0
    };

    todaysBills.forEach(bill => {
      totalRevenue += bill.finalTotal;
      totalTaxCollected += bill.totalTax;
      
      bill.items.forEach(item => {
        if (categoryTotals[item.type] !== undefined) {
           // We assign revenue proportionately. If global discount was used, this gets tricky.
           // For simple summary, we use the raw item total.
           categoryTotals[item.type] += (item.basePrice * item.quantity);
        }
      });
    });

    return { totalRevenue, totalTaxCollected, categoryTotals };
  };

  const metrics = calculateDailyMetrics();

  /**
   * Generates a CSV file containing all today's invoice data and triggers a browser download.
   */
  const exportCSV = () => {
    if (todaysBills.length === 0) {
      alert("No data to export today.");
      return;
    }

    const headers = ['Invoice ID', 'Date', 'Subtotal', 'Discount', 'Tax', 'Final Total'];
    const rows = todaysBills.map(b => [
      b.id,
      new Date(b.date).toLocaleString(),
      b.subtotal.toFixed(2),
      b.discountAmount.toFixed(2),
      b.totalTax.toFixed(2),
      b.finalTotal.toFixed(2)
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(e => e.join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `daily_summary_${format(today, 'yyyyMMdd')}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="reports-container">
      <div className="header-section mb-6">
         <h1 className="h2">Daily Sales Summary</h1>
         <p className="text-muted">Metrics and financial breakdown for {format(today, 'MMMM do, yyyy')}</p>
      </div>

      <div className="summary-cards" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
         <div className="card glass">
            <p className="text-muted text-sm">Total Revenue</p>
            <h2 className="h1 mt-2 text-primary">${metrics.totalRevenue.toFixed(2)}</h2>
         </div>
         <div className="card glass">
            <p className="text-muted text-sm">Total Tax Collected</p>
            <h2 className="h2 mt-2">${metrics.totalTaxCollected.toFixed(2)}</h2>
         </div>
         <div className="card glass">
            <p className="text-muted text-sm">Completed Invoices</p>
            <h2 className="h2 mt-2">{todaysBills.length}</h2>
         </div>
      </div>

      <div className="card glass mb-6">
         <h3 className="h3 mb-4">Revenue by Category (Gross)</h3>
         <div className="table-wrapper">
            <table>
               <thead>
                  <tr>
                     <th>Category</th>
                     <th>Gross Sales</th>
                  </tr>
               </thead>
               <tbody>
                  {Object.entries(metrics.categoryTotals).map(([cat, total]) => (
                     <tr key={cat}>
                        <td className="font-medium">{cat}</td>
                        <td>${total.toFixed(2)}</td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </div>

      <div className="export-actions">
         <button className="btn btn-primary" onClick={exportCSV}>
            <DownloadCloud size={18} /> Export Today's CSV Summary
         </button>
      </div>
    </div>
  );
};
