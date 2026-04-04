import React from 'react';
import { useBilling } from '../../context/BillingContext';
import { PlayCircle, Trash2 } from 'lucide-react';

/**
 * Component to display all currently saved Draft bills.
 * Enables the user to resume a draft or discard it.
 * @param {Function} setActiveTab - Root function to change the active tab back to POS when a draft is loaded.
 */
export const DraftList = ({ setActiveTab }) => {
  const { draftBills, loadDraft, deleteDraft } = useBilling();

  /**
   * Resumes a draft by loading it into active state, and navigates to the POS screen.
   * @param {Object} draft - The draft bill object.
   */
  const handleResume = (draft) => {
    loadDraft(draft);
    setActiveTab('pos');
  };

  /**
   * Completely discards a draft bill.
   * @param {string} draftId - The ID of the draft to delete.
   */
  const discardDraft = (draftId) => {
    if (window.confirm('Discard this draft permanently?')) {
      deleteDraft(draftId);
    }
  };

  return (
    <div className="reports-container">
      <div className="header-section mb-6">
        <h1 className="h2">Saved Drafts</h1>
        <p className="text-muted">Resume your incomplete billing sessions here.</p>
      </div>

      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Date Saved</th>
              <th>Draft ID</th>
              <th>Items</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {draftBills.map(draft => (
              <tr key={draft.id}>
                <td>{new Date(draft.date).toLocaleString()}</td>
                <td><span className="badge badge-warning">{draft.id}</span></td>
                <td>{draft.items.length} item(s)</td>
                <td>
                  <div className="action-buttons">
                    <button className="btn btn-primary btn-sm" onClick={() => handleResume(draft)}>
                      <PlayCircle size={16} /> Resume
                    </button>
                    <button className="btn btn-secondary btn-sm text-error hover-danger" onClick={() => discardDraft(draft.id)}>
                       <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {draftBills.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center text-muted py-4">No drafts currently saved.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
