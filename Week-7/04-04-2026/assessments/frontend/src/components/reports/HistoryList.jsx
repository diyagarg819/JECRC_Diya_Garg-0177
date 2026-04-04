import React, { useState } from 'react';
import { useBilling } from '../../context/BillingContext';
import { FileText, Download, Printer } from 'lucide-react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

/**
 * Component displaying all completed bills/invoices.
 * Allows the user to view past transactions or export them as PDF invoices.
 */
export const HistoryList = () => {
  const { pastBills } = useBilling();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredBills = pastBills.filter(bill => 
    bill.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  /**
   * Helper function to construct the shared jsPDF instance.
   */
  const generatePDFDoc = (bill) => {
    const doc = new jsPDF();
    
    // Header
    doc.setFontSize(20);
    doc.text('BillGen Pro - Invoice', 14, 22);
    
    doc.setFontSize(10);
    doc.text(`Invoice ID: ${bill.id}`, 14, 30);
    doc.text(`Date: ${new Date(bill.date).toLocaleString()}`, 14, 35);
    
    // Items Table
    const tableBody = bill.items.map(item => [
      item.name,
      item.type,
      item.quantity.toString(),
      `$${item.basePrice.toFixed(2)}`,
      `${item.taxRate}%`,
      `$${(item.basePrice * item.quantity).toFixed(2)}`
    ]);

    autoTable(doc, {
      startY: 45,
      head: [['Item', 'Category', 'Qty', 'Price', 'Tax %', 'Total']],
      body: tableBody,
      theme: 'grid',
      headStyles: { fillColor: [139, 92, 246] }
    });

    // Summary Totals
    const finalY = doc.lastAutoTable.finalY + 10;
    doc.text(`Subtotal: $${bill.subtotal.toFixed(2)}`, 140, finalY);
    doc.text(`Discount: -$${bill.discountAmount.toFixed(2)}`, 140, finalY + 7);
    doc.text(`Tax: +$${bill.totalTax.toFixed(2)}`, 140, finalY + 14);
    
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text(`Final Total: $${bill.finalTotal.toFixed(2)}`, 140, finalY + 22);

    return doc;
  };

  /**
   * Generates a printable PDF invoice using jsPDF and triggers the browser download.
   */
  const exportPDF = (bill) => {
    try {
      const doc = generatePDFDoc(bill);
      doc.save(`${bill.id}.pdf`);
    } catch (error) {
      console.error("PDF Export Error:", error);
      alert("Error: Failed to download PDF.");
    }
  };

  /**
   * Automatically opens the generated invoice in a print-ready window.
   */
  const printPDF = (bill) => {
    try {
      const doc = generatePDFDoc(bill);
      doc.autoPrint();
      const newWindow = window.open(doc.output('bloburl'), '_blank');
      
      if (!newWindow) {
         // This typically happens if a popup blocker is enabled.
         alert("General Error: No printer connected, or popup blocker prevented printing.");
      }
    } catch (error) {
      console.error("Print Error:", error);
      alert("General Error: No printer connected or generating print view failed.");
    }
  };

  return (
    <div className="reports-container">
      <div className="header-section mb-6">
        <h1 className="h2">Invoice History</h1>
        <p className="text-muted">A complete log of all finalized sales and receipts.</p>
      </div>
      
      <div className="search-bar mb-4">
         <input 
            type="text" 
            placeholder="Search by Invoice ID..." 
            className="form-input w-full"
            style={{ maxWidth: '300px' }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
      </div>

      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Invoice ID</th>
              <th>Items Scanned</th>
              <th>Total Paid</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredBills.map(bill => (
              <tr key={bill.id}>
                <td>{new Date(bill.date).toLocaleString()}</td>
                <td><span className="badge badge-success">{bill.id}</span></td>
                <td>{bill.items.length}</td>
                <td className="font-medium text-main">${bill.finalTotal.toFixed(2)}</td>
                <td>
                  <div className="action-buttons">
                    <button className="btn btn-secondary btn-sm" onClick={() => exportPDF(bill)}>
                       <Download size={16} /> PDF
                    </button>
                    <button className="btn btn-primary btn-sm" onClick={() => printPDF(bill)}>
                       <Printer size={16} /> Print
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {filteredBills.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center text-muted py-4">
                   {pastBills.length === 0 ? "No completed bills yet." : "No invoices match your search."}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
