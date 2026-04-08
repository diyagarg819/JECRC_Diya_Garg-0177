import React from 'react';

const DeleteConfirmModal = ({ isOpen, onClose, onConfirm, employeeName }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose} id="delete-modal-overlay">
      <div className="modal slide-in" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '420px' }}>
        <div className="confirm-modal">
          <div className="confirm-icon">🗑️</div>
          <h3>Delete Employee</h3>
          <p>
            Are you sure you want to delete <strong>{employeeName}</strong>?
            This action cannot be undone.
          </p>
          <div className="confirm-actions">
            <button className="btn-cancel" onClick={onClose} id="btn-delete-cancel">
              Cancel
            </button>
            <button className="btn-danger" onClick={onConfirm} id="btn-delete-confirm">
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmModal;
