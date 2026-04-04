import React, { useState } from 'react';
import { useBilling } from '../../context/BillingContext';
import { CATALOG_TYPES } from '../../data/initialCatalog';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import './CatalogList.css';

/**
 * Component for managing the system's baseline items (Catalogs).
 * Enables CRUD operations for standard products and tickets.
 */
export const CatalogList = () => {
  const { catalog, addCatalogItem, editCatalogItem, deleteCatalogItem } = useBilling();
  
  const [isEditing, setIsEditing] = useState(null);
  const [formData, setFormData] = useState({ name: '', type: CATALOG_TYPES.ENTRANCE, defaultPrice: '', taxRate: '' });

  /**
   * Translates text input changes into the controlled formData state.
   * @param {Event} e - The HTML input change event.
   */
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  /**
   * Populates the modification form and switches the interface into 'Edit' mode.
   * @param {Object} item - The existing catalog item to edit.
   */
  const handleEditClick = (item) => {
    setIsEditing(item.id);
    setFormData({
      name: item.name,
      type: item.type,
      defaultPrice: item.defaultPrice,
      taxRate: item.taxRate
    });
  };

  /**
   * Resets the form variables and effectively cancels Add/Edit modes.
   */
  const resetForm = () => {
    setIsEditing(null);
    setFormData({ name: '', type: CATALOG_TYPES.ENTRANCE, defaultPrice: '', taxRate: '' });
  };

  /**
   * Submits the Catalog manipulation form to either create a new record or update an old one.
   * @param {Event} e - Form submission event.
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      name: formData.name,
      type: formData.type,
      defaultPrice: Number(formData.defaultPrice),
      taxRate: Number(formData.taxRate) || 0
    };

    if (isEditing) {
      editCatalogItem(isEditing, payload);
    } else {
      addCatalogItem(payload);
    }
    resetForm();
  };

  return (
    <div className="catalog-manager">
      <div className="header-section">
        <h1 className="h2">Manage Catalogs</h1>
        <p className="text-muted">Add or modify standard pricing for tickets, merchandise, or default donations.</p>
      </div>

      <div className="catalog-content">
        <form className="catalog-form card glass" onSubmit={handleSubmit}>
          <h2 className="h3 mb-4">{isEditing ? 'Edit Item' : 'Add New Item'}</h2>
          
          <div className="form-grid">
            <div className="form-group">
              <label className="form-label">Item Name</label>
              <input required name="name" value={formData.name} onChange={handleInputChange} className="form-input" placeholder="e.g. VIP Pass" />
            </div>
            
            <div className="form-group">
              <label className="form-label">Category</label>
              <select required name="type" value={formData.type} onChange={handleInputChange} className="form-input">
                {Object.values(CATALOG_TYPES).map(t => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Base Price ($)</label>
              <input required type="number" step="0.01" min="0" name="defaultPrice" value={formData.defaultPrice} onChange={handleInputChange} className="form-input" placeholder="0.00" />
            </div>

            <div className="form-group">
              <label className="form-label">Tax Rate (%)</label>
              <input type="number" step="0.1" min="0" name="taxRate" value={formData.taxRate} onChange={handleInputChange} className="form-input" placeholder="0 or e.g. 5.5" />
            </div>
          </div>

          <div className="form-actions mt-4">
            <button type="submit" className="btn btn-primary">
              <Plus size={18} />
              {isEditing ? 'Save Changes' : 'Add Item'}
            </button>
            {isEditing && (
              <button type="button" className="btn btn-secondary" onClick={resetForm}>Cancel</button>
            )}
          </div>
        </form>

        <div className="table-wrapper mt-6">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Category</th>
                <th>Base Price</th>
                <th>Tax %</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {catalog.map(item => (
                <tr key={item.id}>
                  <td className="font-medium">{item.name}</td>
                  <td><span className="badge badge-primary">{item.type}</span></td>
                  <td>${Number(item.defaultPrice).toFixed(2)}</td>
                  <td>{item.taxRate}%</td>
                  <td>
                    <div className="action-buttons">
                      <button onClick={() => handleEditClick(item)} className="btn-icon text-muted" title="Edit">
                        <Edit2 size={16} />
                      </button>
                      <button onClick={() => deleteCatalogItem(item.id)} className="btn-icon" style={{color: 'var(--error)'}} title="Delete">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {catalog.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center text-muted py-4">No items in the catalog yet.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
