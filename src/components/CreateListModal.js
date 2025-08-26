import React, { useState } from 'react';
import { FiX } from 'react-icons/fi';

const CreateListModal = ({ onClose, onCreate }) => {
  const [listName, setListName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!listName.trim()) {
      setError('List name is required');
      return;
    }

    if (listName.trim().length < 3) {
      setError('List name must be at least 3 characters long');
      return;
    }

    onCreate(listName.trim());
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">Create New List</h2>
          <button className="close-btn" onClick={onClose}>
            <FiX />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="listName" className="form-label">
              List Name *
            </label>
            <input
              id="listName"
              type="text"
              className="form-input"
              value={listName}
              onChange={(e) => {
                setListName(e.target.value);
                setError('');
              }}
              onKeyPress={handleKeyPress}
              placeholder="Enter list name..."
              autoFocus
            />
            {error && <p style={{ color: '#e74c3c', fontSize: '0.9rem', marginTop: '0.5rem' }}>{error}</p>}
          </div>

          <div className="modal-actions">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Create List
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateListModal;
