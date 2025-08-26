import React, { useState } from 'react';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { FiPlus, FiTrash2, FiGrid } from 'react-icons/fi';
import CreateBoardModal from './CreateBoardModal';

const SortableBoardCard = ({ board, onSelect, onDelete }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: board.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const totalTasks = board.lists.reduce((sum, list) => sum + list.tasks.length, 0);
  const completedTasks = board.lists.find(list => list.name === 'Done')?.tasks.length || 0;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="board-card"
      onClick={() => onSelect(board)}
    >
      <button
        className="delete-board-btn"
        onClick={(e) => {
          e.stopPropagation();
          onDelete(board.id);
        }}
        title="Delete board"
      >
        <FiTrash2 />
      </button>
      
      <div style={{ cursor: 'grab' }}>
        <h3>{board.name}</h3>
        <div className="board-stats">
          <span>{board.lists.length} lists</span>
          <span>{totalTasks} tasks</span>
          <span>{completedTasks} completed</span>
        </div>
      </div>
    </div>
  );
};

const Dashboard = ({ boards, onCreateBoard, onDeleteBoard, onSelectBoard, onReorderBoards }) => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [reorderedBoards, setReorderedBoards] = useState(boards);

  // Update reorderedBoards when boards prop changes
  React.useEffect(() => {
    setReorderedBoards(boards);
  }, [boards]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      const newOrder = arrayMove(reorderedBoards, 
        reorderedBoards.findIndex((item) => item.id === active.id),
        reorderedBoards.findIndex((item) => item.id === over.id)
      );
      setReorderedBoards(newOrder);
      if (onReorderBoards) {
        onReorderBoards(newOrder);
      }
    }
  };

  const handleCreateBoard = (name) => {
    onCreateBoard(name);
    setShowCreateModal(false);
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1 className="dashboard-title">
          <FiGrid style={{ marginRight: '0.5rem' }} />
          My Boards
        </h1>
        <button
          className="create-board-btn"
          onClick={() => setShowCreateModal(true)}
        >
          <FiPlus />
          Create New Board
        </button>
      </div>

      {reorderedBoards.length === 0 ? (
        <div className="empty-state">
          <h3>No boards yet</h3>
          <p>Create your first board to get started with task management!</p>
          <button
            className="create-board-btn"
            onClick={() => setShowCreateModal(true)}
            style={{ marginTop: '1rem' }}
          >
            <FiPlus />
            Create Your First Board
          </button>
        </div>
      ) : (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={reorderedBoards.map(board => board.id)}
            strategy={verticalListSortingStrategy}
          >
            <div className="boards-grid">
              {reorderedBoards.map((board) => (
                <SortableBoardCard
                  key={board.id}
                  board={board}
                  onSelect={onSelectBoard}
                  onDelete={onDeleteBoard}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      )}

      {showCreateModal && (
        <CreateBoardModal
          onClose={() => setShowCreateModal(false)}
          onCreate={handleCreateBoard}
        />
      )}
    </div>
  );
};

export default Dashboard;
