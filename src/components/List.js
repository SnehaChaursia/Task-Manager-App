import React, { useState } from 'react';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { FiEdit2, FiTrash2, FiPlus } from 'react-icons/fi';
import Task from './Task';
import CreateTaskModal from './CreateTaskModal';
import EditListModal from './EditListModal';

const List = ({ list, onUpdate, onDelete, onAddTask, onUpdateTask, onDeleteTask }) => {
  const [showCreateTaskModal, setShowCreateTaskModal] = useState(false);
  const [showEditListModal, setShowEditListModal] = useState(false);

  const { setNodeRef } = useDroppable({
    id: list.id,
  });

  const handleCreateTask = (task) => {
    onAddTask(task);
    setShowCreateTaskModal(false);
  };

  const handleUpdateList = (updatedList) => {
    onUpdate(updatedList);
    setShowEditListModal(false);
  };

  return (
    <div className="list">
      <div className="list-header">
        <h3 className="list-title">{list.name}</h3>
        <div className="list-controls">
          <button
            className="list-control-btn"
            onClick={() => setShowEditListModal(true)}
            title="Edit list"
          >
            <FiEdit2 />
          </button>
          <button
            className="list-control-btn"
            onClick={() => onDelete(list.id)}
            title="Delete list"
          >
            <FiTrash2 />
          </button>
        </div>
      </div>

      <div
        ref={setNodeRef}
        className="tasks-container"
      >
        <SortableContext items={list.tasks.map(task => task.id)} strategy={verticalListSortingStrategy}>
          {list.tasks.map((task) => (
            <Task
              key={task.id}
              task={task}
              onUpdate={(updatedTask) => onUpdateTask(task.id, updatedTask)}
              onDelete={() => onDeleteTask(task.id)}
            />
          ))}
        </SortableContext>
      </div>

      <button
        className="add-task-btn"
        onClick={() => setShowCreateTaskModal(true)}
      >
        <FiPlus />
        Add Task
      </button>

      {showCreateTaskModal && (
        <CreateTaskModal
          onClose={() => setShowCreateTaskModal(false)}
          onCreate={handleCreateTask}
        />
      )}

      {showEditListModal && (
        <EditListModal
          list={list}
          onClose={() => setShowEditListModal(false)}
          onUpdate={handleUpdateList}
        />
      )}
    </div>
  );
};

export default List;
