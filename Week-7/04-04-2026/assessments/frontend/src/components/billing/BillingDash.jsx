import React, { useState } from 'react';
import { useBilling } from '../../context/BillingContext';
import { CATALOG_TYPES } from '../../data/initialCatalog';
import { ShoppingCart, Plus, Minus, Trash2, Tag, Save, CheckCircle2 } from 'lucide-react';
import './BillingDash.css';

/**
 * Main Point of Sale (POS) Dashboard component.
 * Allows users to add items to a bill, adjust quantities/prices, apply discounts, and checkout.
 */
export const BillingDash = () => {
  const {
    catalog,
    currentBillItems,
    totals,
    billSettings,
    addItemToBill,
    updateItemQuantity,
    updateItemPrice,
    removeBillItem,
    applyGlobalDiscount,
    saveAsDraft,
    finalizeBill
  } = useBilling();

  const [activeCategory, setActiveCategory] = useState(CATALOG_TYPES.ENTRANCE);
  
  // Custom Donation Modal state
  const [donationModalOpen, setDonationModalOpen] = useState(false);
  const [donationItem, setDonationItem] = useState(null);
  const [donationAmount, setDonationAmount] = useState('10.00');

  // Temporary state for custom item quick-add
  const [customItemName, setCustomItemName] = useState('');
  const [customItemPrice, setCustomItemPrice] = useState('');

  const filteredCatalog = catalog.filter(item => item.type === activeCategory);

  /**
   * Handles adding a pre-defined catalog item to the bill.
   * Invokes a custom modal if the item is a Donation with 0 base price.
   * @param {Object} item - The structural item from the catalog.
   */
  const handleCatalogItemClick = (item) => {
    if (item.type === CATALOG_TYPES.DONATION && item.defaultPrice === 0) {
      setDonationItem(item);
      setDonationAmount('10.00');
      setDonationModalOpen(true);
    } else {
      addItemToBill(item);
    }
  };

  /**
   * Handles submitting the custom donation amount from the modal.
   * @param {Event} e - Form event
   */
  const handleDonationSubmit = (e) => {
    e.preventDefault();
    if (donationAmount && !isNaN(donationAmount)) {
      addItemToBill(donationItem, Number(donationAmount));
      setDonationModalOpen(false);
    }
  };

  /**
   * Handles adding a dynamic, one-off custom item to the cart that doesn't exist in the catalog.
   * @param {Event} e - Form submission event.
   */
  const handleAddCustomItem = (e) => {
    e.preventDefault();
    if (!customItemName || !customItemPrice) return;
    
    // Mock a catalog item shape to push directly to cart
    const tempItem = {
      id: `custom_${Date.now()}`,
      name: customItemName,
      type: CATALOG_TYPES.CUSTOM,
      defaultPrice: Number(customItemPrice),
      taxRate: 0 // Defaulting custom items to 0 tax, or could be a config setting
    };
    
    addItemToBill(tempItem);
    setCustomItemName('');
    setCustomItemPrice('');
  };

  /**
   * Commits the discount type and value to the billing context.
   * @param {string} type - 'percentage' or 'fixed'
   * @param {string} val - the numerical value string from input
   */
  const handleDiscountChange = (type, val) => {
    applyGlobalDiscount(type, val);
  };

  return (
    <div className="billing-dashboard">
      <div className="catalog-pane">
        <div className="category-tabs">
          {Object.values(CATALOG_TYPES).map(type => (
            <button
              key={type}
              className={`category-tab ${activeCategory === type ? 'active' : ''}`}
              onClick={() => setActiveCategory(type)}
            >
              {type}
            </button>
          ))}
        </div>

        <div className="catalog-grid">
          {activeCategory !== CATALOG_TYPES.CUSTOM && filteredCatalog.map(item => (
            <div 
              key={item.id} 
              className="catalog-card card card-interactive"
              onClick={() => handleCatalogItemClick(item)}
            >
              <h3 className="h3">{item.name}</h3>
              <p className="text-muted mt-2">
                {item.type === CATALOG_TYPES.DONATION && item.defaultPrice === 0 
                  ? 'Custom Amount' 
                  : `$${Number(item.defaultPrice).toFixed(2)}`}
              </p>
            </div>
          ))}

          {activeCategory === CATALOG_TYPES.CUSTOM && (
            <form onSubmit={handleAddCustomItem} className="custom-item-form card">
              <h3 className="h3 mb-4">Quick Add Custom Item</h3>
              <div className="form-group mb-4">
                <label className="form-label">Item Description</label>
                <input required value={customItemName} onChange={e => setCustomItemName(e.target.value)} className="form-input" placeholder="e.g. Special Service" />
              </div>
              <div className="form-group mb-4">
                <label className="form-label">Price ($)</label>
                <input required type="number" step="0.01" min="0" value={customItemPrice} onChange={e => setCustomItemPrice(e.target.value)} className="form-input" placeholder="0.00" />
              </div>
              <button type="submit" className="btn btn-primary w-full content-center">
                <Plus size={18} /> Add to Bill
              </button>
            </form>
          )}

          {activeCategory !== CATALOG_TYPES.CUSTOM && filteredCatalog.length === 0 && (
             <p className="text-muted text-center w-full mt-6">No items found in this category.</p>
          )}
        </div>
      </div>

      <div className="cart-pane card glass">
        <div className="cart-header">
          <ShoppingCart size={24} className="text-primary" />
          <h2 className="h2">Current Bill</h2>
        </div>

        <div className="cart-items">
          {currentBillItems.length === 0 ? (
            <div className="empty-cart text-muted">
              Cart is empty. Add items from the catalog.
            </div>
          ) : (
            currentBillItems.map(item => (
              <div key={item.id} className="cart-item">
                <div className="cart-item-details">
                  <span className="font-medium">{item.name}</span>
                  <div className="cart-item-meta text-xs text-muted">
                    ${item.basePrice.toFixed(2)} each (Tax: {item.taxRate}%)
                  </div>
                </div>

                <div className="cart-item-actions">
                  <div className="quantity-controls">
                    <button className="btn-icon circle" onClick={() => updateItemQuantity(item.id, item.quantity - 1)}>
                      <Minus size={14} />
                    </button>
                    <span className="quantity-label">{item.quantity}</span>
                    <button className="btn-icon circle" onClick={() => updateItemQuantity(item.id, item.quantity + 1)}>
                      <Plus size={14} />
                    </button>
                  </div>
                  <span className="item-row-total font-medium">
                    ${(item.basePrice * item.quantity).toFixed(2)}
                  </span>
                  <button className="btn-icon text-error hover-danger" onClick={() => removeBillItem(item.id)}>
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="cart-summary">
          <div className="discount-section">
             <label className="form-label flex items-center gap-2"><Tag size={14}/> Discount</label>
             <div className="discount-inputs">
                <select 
                  className="form-input discount-type"
                  value={billSettings.discountType}
                  onChange={(e) => handleDiscountChange(e.target.value, billSettings.discountValue)}
                >
                  <option value="percentage">%</option>
                  <option value="fixed">$</option>
                </select>
                <input 
                  type="number" 
                  min="0"
                  step={billSettings.discountType === 'percentage' ? '1' : '0.01'}
                  className="form-input discount-val" 
                  value={billSettings.discountValue}
                  onChange={(e) => handleDiscountChange(billSettings.discountType, e.target.value)}
                />
             </div>
          </div>

          <div className="summary-row mt-4">
            <span className="text-muted">Subtotal</span>
            <span>${totals.subtotal.toFixed(2)}</span>
          </div>
          <div className="summary-row text-success">
            <span>Discount Amount</span>
            <span>-${totals.discountAmount.toFixed(2)}</span>
          </div>
          <div className="summary-row text-muted border-b">
            <span>Estimated Tax</span>
            <span>+${totals.totalTax.toFixed(2)}</span>
          </div>
          <div className="summary-row grand-total">
            <span>Total</span>
            <span>${totals.finalTotal.toFixed(2)}</span>
          </div>
        </div>

        <div className="cart-actions">
           <button 
             className="btn btn-secondary w-full content-center"
             onClick={saveAsDraft}
             disabled={currentBillItems.length === 0}
           >
             <Save size={18} /> Save Draft
           </button>
           <button 
             className="btn btn-primary w-full content-center"
             onClick={() => {
                const bill = finalizeBill();
                alert(`Bill finalized: ${bill.id}`);
             }}
             disabled={currentBillItems.length === 0}
           >
             <CheckCircle2 size={18} /> Complete Bill
           </button>
        </div>
      </div>

      {/* Custom Donation Modal */}
      {donationModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content card glass">
            <h2 className="h2 mb-2">Support Our Cause ❤️</h2>
            <p className="text-muted mb-4">Please enter your generous custom donation amount for <strong>{donationItem?.name}</strong>.</p>
            <form onSubmit={handleDonationSubmit}>
              <div className="form-group mb-4">
                <label className="form-label">Donation Amount ($)</label>
                <input 
                   type="number" 
                   step="0.01" 
                   min="0.01"
                   value={donationAmount} 
                   onChange={(e) => setDonationAmount(e.target.value)} 
                   className="form-input text-center" 
                   style={{ fontSize: '1.5rem', padding: '1rem' }}
                   required 
                 />
              </div>
              <div className="form-actions" style={{ display: 'flex', gap: '1rem' }}>
                 <button type="submit" className="btn btn-primary w-full content-center">
                    Add Donation
                 </button>
                 <button type="button" className="btn btn-secondary w-full content-center" onClick={() => setDonationModalOpen(false)}>
                    Cancel
                 </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
