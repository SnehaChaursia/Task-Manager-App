import React, { useState } from 'react';
import { FiX } from 'react-icons/fi';

const EditTaskModal = ({ task, onClose, onUpdate }) => {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description || '');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!title.trim()) {
      setError('Task title is required');
      return;
    }

    if (title.trim().length < 3) {
      setError('Task title must be at least 3 characters long');
      return;
    }

    const updatedTask = {
      ...task,
      title: title.trim(),
      description: description.trim() || null,
      updatedAt: new Date().toISOString()
    };

    onUpdate(updatedTask);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && e.ctrlKey) {
      handleSubmit(e);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">Edit Task</h2>
          <button className="close-btn" onClick={onClose}>
            <FiX />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="taskTitle" className="form-label">
              Task Title *
            </label>
            <input
              id="taskTitle"
              type="text"
              className="form-input"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                setError('');
              }}
              placeholder="Enter task title..."
              autoFocus
            />
            {error && <p style={{ color: '#e74c3c', fontSize: '0.9rem', marginTop: '0.5rem' }}>{error}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="taskDescription" className="form-label">
              Description (Optional)
            </label>
            <textarea
              id="taskDescription"
              className="form-textarea"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Enter task description..."
              rows={4}
            />
            <p style={{ color: '#6c757d', fontSize: '0.8rem', marginTop: '0.5rem' }}>
              Press Ctrl+Enter to save
            </p>
          </div>

          <div className="modal-actions">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Update Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTaskModal;
