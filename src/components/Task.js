import React, { useState } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';
import EditTaskModal from './EditTaskModal';

const Task = ({ task, onUpdate, onDelete }) => {
  const [showEditModal, setShowEditModal] = useState(false);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const handleUpdate = (updatedTask) => {
    onUpdate(updatedTask);
    setShowEditModal(false);
  };

  return (
    <>
      <div
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        className="task-card"
      >
        <div className="task-content">
          <h4 className="task-title">{task.title}</h4>
          {task.description && (
            <p className="task-description">{task.description}</p>
          )}
        </div>
        
        <div className="task-actions" style={{ 
          position: 'absolute', 
          top: '0.5rem', 
          right: '0.5rem',
          display: 'flex',
          gap: '0.25rem',
          opacity: 0,
          transition: 'opacity 0.2s ease',
          zIndex: 10
        }}>
          <button
            className="list-control-btn"
            onClick={(e) => {
              e.stopPropagation();
              setShowEditModal(true);
            }}
            title="Edit task"
            style={{ 
              background: 'rgba(255, 255, 255, 0.9)',
              border: 'none',
              borderRadius: '4px',
              padding: '0.25rem',
              cursor: 'pointer'
            }}
          >
            <FiEdit2 size={12} />
          </button>
          <button
            className="list-control-btn"
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
            title="Delete task"
            style={{ 
              background: 'rgba(231, 76, 60, 0.9)',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              padding: '0.25rem',
              cursor: 'pointer'
            }}
          >
            <FiTrash2 size={12} />
          </button>
        </div>
      </div>

      {showEditModal && (
        <EditTaskModal
          task={task}
          onClose={() => setShowEditModal(false)}
          onUpdate={handleUpdate}
        />
      )}
    </>
  );
};

export default Task;
