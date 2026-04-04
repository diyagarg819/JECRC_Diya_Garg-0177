import React, { createContext, useContext, useMemo, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

const BillingContext = createContext();

/**
 * Provides the global Billing Context and wraps children with it.
 * Manages all remote state: catalogs, current bill items, draft bills, and past bills connected to .NET backend.
 */
export const BillingProvider = ({ children }) => {
  const [catalog, setCatalog] = useState([]);
  const [currentBillItems, setCurrentBillItems] = useState([]);
  const [draftBills, setDraftBills] = useState([]);
  const [pastBills, setPastBills] = useState([]);
  const [billSettings, setBillSettings] = useState({ discountType: 'percentage', discountValue: 0 });

  const API_BASE = 'http://localhost:5137/api';

  useEffect(() => {
    fetchCatalogs();
    fetchDrafts();
    fetchPastBills();
  }, []);

  const fetchCatalogs = async () => {
    try {
      const res = await fetch(`${API_BASE}/catalog`);
      if (res.ok) setCatalog(await res.json());
    } catch (e) { console.error('Error fetching catalog:', e); }
  };

  const fetchDrafts = async () => {
    try {
      const res = await fetch(`${API_BASE}/bills/drafts`);
      if (res.ok) setDraftBills(await res.json());
    } catch (e) { console.error('Error fetching drafts:', e); }
  };

  const fetchPastBills = async () => {
    try {
      const res = await fetch(`${API_BASE}/bills/history`);
      if (res.ok) setPastBills(await res.json());
    } catch (e) { console.error('Error fetching history:', e); }
  };

  /**
   * Generates a unique, readable invoice number.
   * Format: INV-YYYYMMDD-XXXX
   * @returns {string} The generated invoice number string.
   */
  const generateInvoiceNumber = () => {
    const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    return `INV-${dateStr}-${randomNum}`;
  };

  /**
   * Adds an item to the current bill or increments its quantity if it already exists.
   * @param {Object} catalogItem - The catalog item object to add.
   * @param {number} customPrice - Optional custom price override (useful for donations).
   */
  const addItemToBill = (catalogItem, customPrice = null) => {
    setCurrentBillItems(prev => {
      const existing = prev.find(item => item.catalogItemId === catalogItem.id && item.basePrice === (customPrice !== null ? customPrice : catalogItem.defaultPrice));
      if (existing) {
        return prev.map(item => item.id === existing.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, {
        id: uuidv4(),
        catalogItemId: catalogItem.id,
        name: catalogItem.name,
        type: catalogItem.type,
        basePrice: customPrice !== null ? customPrice : catalogItem.defaultPrice,
        taxRate: catalogItem.taxRate,
        quantity: 1
      }];
    });
  };

  /**
   * Updates the quantity of a specific item in the current bill.
   * @param {string} itemId - The unique ID of the bill item.
   * @param {number} newQuantity - The new quantity value.
   */
  const updateItemQuantity = (itemId, newQuantity) => {
    if (newQuantity <= 0) {
      removeBillItem(itemId);
      return;
    }
    setCurrentBillItems(prev => prev.map(item => item.id === itemId ? { ...item, quantity: newQuantity } : item));
  };

  /**
   * Updates the price of a custom item in the current bill dynamically.
   * @param {string} itemId - The unique ID of the bill item.
   * @param {number} newPrice - The new base price value.
   */
  const updateItemPrice = (itemId, newPrice) => {
    setCurrentBillItems(prev => prev.map(item => item.id === itemId ? { ...item, basePrice: Number(newPrice) } : item));
  };

  /**
   * Removes a specific item completely from the current bill.
   * @param {string} itemId - The unique ID of the bill item to remove.
   */
  const removeBillItem = (itemId) => {
    setCurrentBillItems(prev => prev.filter(item => item.id !== itemId));
  };

  /**
   * Clears the current active bill completely and resets bill settings (discounts).
   */
  const clearCurrentBill = () => {
    setCurrentBillItems([]);
    setBillSettings({ discountType: 'percentage', discountValue: 0 });
  };

  /**
   * Applies a global discount to the current bill interface.
   * @param {string} type - 'percentage' or 'fixed'.
   * @param {number} value - The numerical discount value.
   */
  const applyGlobalDiscount = (type, value) => {
    setBillSettings({ discountType: type, discountValue: Number(value) });
  };

  /**
   * Calculates all mathematical totals dynamically for the current bill relying on state.
   * @returns {Object} An object holding calculated financial totals.
   */
  const calculateTotals = useMemo(() => {
    let subtotal = 0;
    let totalTax = 0;

    currentBillItems.forEach(item => {
      const itemRowTotal = item.basePrice * item.quantity;
      subtotal += itemRowTotal;
      const itemTaxAmount = itemRowTotal * ((item.taxRate || 0) / 100);
      totalTax += itemTaxAmount;
    });

    let discountAmount = 0;
    if (billSettings.discountType === 'percentage') {
      discountAmount = subtotal * (billSettings.discountValue / 100);
    } else {
      discountAmount = Number(billSettings.discountValue);
    }
    
    if (discountAmount > subtotal) discountAmount = subtotal;
    const finalTotal = (subtotal - discountAmount) + totalTax;

    return {
      subtotal,
      discountAmount,
      totalTax,
      finalTotal: Math.max(0, finalTotal)
    };
  }, [currentBillItems, billSettings]);


  /**
   * Finalizes the current bill, posts it to the backend via ASP.NET Core, and updates local state.
   * @returns {Object} The compiled finalized bill object.
   */
  const finalizeBill = async () => {
    const totals = calculateTotals;
    const newBill = {
      id: generateInvoiceNumber(),
      date: new Date().toISOString(),
      items: currentBillItems,
      ...totals,
      discountType: billSettings.discountType,
      discountValue: Number(billSettings.discountValue),
      status: 'COMPLETED'
    };

    try {
      const res = await fetch(`${API_BASE}/bills`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newBill)
      });
      if (res.ok) {
        fetchPastBills();
        clearCurrentBill();
      }
    } catch (e) { console.error('Error finalizing bill:', e); }
    return newBill;
  };

  /**
   * Saves the current active bill items as a 'Draft' to the backend, and clears the active screen.
   */
  const saveAsDraft = async () => {
    if (currentBillItems.length === 0) return;
    const totals = calculateTotals;
    const draft = {
      date: new Date().toISOString(),
      items: currentBillItems,
      ...totals,
      discountType: billSettings.discountType,
      discountValue: Number(billSettings.discountValue),
      status: 'DRAFT'
    };
    
    try {
      const res = await fetch(`${API_BASE}/bills`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(draft)
      });
      if (res.ok) {
        fetchDrafts();
        clearCurrentBill();
      }
    } catch (e) { console.error('Error saving draft:', e); }
  };

  /**
   * Loads a previously saved draft bill back into the active cart and deletes it via API.
   * @param {Object} draft - The draft bill object to load.
   */
  const loadDraft = async (draft) => {
    setCurrentBillItems(draft.items);
    setBillSettings({ discountType: draft.discountType || 'percentage', discountValue: draft.discountValue || 0 });
    await deleteDraft(draft.id);
  };

  /**
   * Completely removes a saved draft bill from the backend SQL Database.
   * @param {string} draftId - The ID of the draft to delete.
   */
  const deleteDraft = async (draftId) => {
    try {
      const res = await fetch(`${API_BASE}/bills/drafts/${draftId}`, { method: 'DELETE' });
      if (res.ok) {
        setDraftBills(prev => prev.filter(d => d.id !== draftId));
      }
    } catch (e) { console.error('Error deleting draft:', e); }
  };

  /**
   * Standard CRUD: Posts a new item definition into the .NET API.
   * @param {Object} newItem - The catalog item data.
   */
  const addCatalogItem = async (newItem) => {
    try {
      const res = await fetch(`${API_BASE}/catalog`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newItem)
      });
      if (res.ok) fetchCatalogs();
    } catch (e) { console.error('Error adding catalog item:', e); }
  };

  /**
   * Standard CRUD: Issues a PUT request to update an item's properties in the backend.
   * @param {string} id - The unique catalog item ID.
   * @param {Object} updatedFields - The data fields to update.
   */
  const editCatalogItem = async (id, updatedFields) => {
    try {
      const res = await fetch(`${API_BASE}/catalog/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedFields)
      });
      if (res.ok) fetchCatalogs();
    } catch (e) { console.error('Error updating catalog item:', e); }
  };

  /**
   * Standard CRUD: Issues a DELETE request to completely drop an item from SQL Server.
   * @param {string} id - The unique catalog item ID.
   */
  const deleteCatalogItem = async (id) => {
    try {
      const res = await fetch(`${API_BASE}/catalog/${id}`, { method: 'DELETE' });
      if (res.ok) fetchCatalogs();
    } catch (e) { console.error('Error deleting catalog item:', e); }
  };

  const value = {
    catalog,
    currentBillItems,
    draftBills,
    pastBills,
    billSettings,
    totals: calculateTotals,
    addItemToBill,
    updateItemQuantity,
    updateItemPrice,
    removeBillItem,
    clearCurrentBill,
    applyGlobalDiscount,
    finalizeBill,
    saveAsDraft,
    loadDraft,
    deleteDraft,
    addCatalogItem,
    editCatalogItem,
    deleteCatalogItem
  };

  return <BillingContext.Provider value={value}>{children}</BillingContext.Provider>;
};

/**
 * Custom convenience hook to consume the BillingContext quickly inside components.
 */
export const useBilling = () => {
  return useContext(BillingContext);
};
