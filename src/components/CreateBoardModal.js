import React, { useState } from 'react';
import { FiX } from 'react-icons/fi';

const CreateBoardModal = ({ onClose, onCreate }) => {
  const [boardName, setBoardName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!boardName.trim()) {
      setError('Board name is required');
      return;
    }

    if (boardName.trim().length < 3) {
      setError('Board name must be at least 3 characters long');
      return;
    }

    onCreate(boardName.trim());
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
          <h2 className="modal-title">Create New Board</h2>
          <button className="close-btn" onClick={onClose}>
            <FiX />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="boardName" className="form-label">
              Board Name *
            </label>
            <input
              id="boardName"
              type="text"
              className="form-input"
              value={boardName}
              onChange={(e) => {
                setBoardName(e.target.value);
                setError('');
              }}
              onKeyPress={handleKeyPress}
              placeholder="Enter board name..."
              autoFocus
            />
            {error && <p style={{ color: '#e74c3c', fontSize: '0.9rem', marginTop: '0.5rem' }}>{error}</p>}
          </div>

          <div className="modal-actions">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Create Board
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateBoardModal;
