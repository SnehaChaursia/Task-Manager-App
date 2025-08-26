import React, { useState, useMemo } from 'react';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { restrictToHorizontalAxis } from '@dnd-kit/modifiers';
import { FiArrowLeft, FiSearch, FiPlus } from 'react-icons/fi';
import List from './List';
import CreateListModal from './CreateListModal';

const Board = ({ board, onUpdate, onBack }) => {
  const [showCreateListModal, setShowCreateListModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor)
  );

  // Filter tasks based on search term
  const filteredBoard = useMemo(() => {
    if (!searchTerm.trim()) {
      return board;
    }

    const filteredLists = board.lists.map(list => ({
      ...list,
      tasks: list.tasks.filter(task =>
        task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (task.description && task.description.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    }));

    return {
      ...board,
      lists: filteredLists
    };
  }, [board, searchTerm]);

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (!over || active.id === over.id) {
      return;
    }

    const activeId = active.id;
    const overId = over.id;

    // Check if we're moving a task between lists
    const activeTask = findTaskById(activeId);
    const overList = findListById(overId);

    if (activeTask && overList) {
      // Moving task to a different list
      moveTask(activeTask, overList.id);
    } else {
      // Moving task within the same list
      const activeList = findListByTaskId(activeId);
      const overTask = findTaskById(overId);

      if (activeList && overTask && activeList.id === findListByTaskId(overId)?.id) {
        reorderTaskInList(activeList.id, activeId, overId);
      }
    }
  };

  const findTaskById = (taskId) => {
    for (const list of board.lists) {
      const task = list.tasks.find(t => t.id === taskId);
      if (task) return task;
    }
    return null;
  };

  const findListById = (listId) => {
    return board.lists.find(list => list.id === listId);
  };

  const findListByTaskId = (taskId) => {
    return board.lists.find(list => list.tasks.some(task => task.id === taskId));
  };

  const moveTask = (task, targetListId) => {
    const updatedLists = board.lists.map(list => {
      if (list.id === targetListId) {
        return {
          ...list,
          tasks: [...list.tasks, task]
        };
      } else {
        return {
          ...list,
          tasks: list.tasks.filter(t => t.id !== task.id)
        };
      }
    });

    onUpdate({
      ...board,
      lists: updatedLists
    });
  };

  const reorderTaskInList = (listId, activeId, overId) => {
    const list = board.lists.find(l => l.id === listId);
    if (!list) return;

    const oldIndex = list.tasks.findIndex(task => task.id === activeId);
    const newIndex = list.tasks.findIndex(task => task.id === overId);

    const updatedTasks = [...list.tasks];
    const [movedTask] = updatedTasks.splice(oldIndex, 1);
    updatedTasks.splice(newIndex, 0, movedTask);

    const updatedLists = board.lists.map(l =>
      l.id === listId ? { ...l, tasks: updatedTasks } : l
    );

    onUpdate({
      ...board,
      lists: updatedLists
    });
  };

  const addList = (listName) => {
    const newList = {
      id: Date.now().toString(),
      name: listName,
      tasks: []
    };

    onUpdate({
      ...board,
      lists: [...board.lists, newList]
    });
    setShowCreateListModal(false);
  };

  const updateList = (listId, updatedList) => {
    const updatedLists = board.lists.map(list =>
      list.id === listId ? updatedList : list
    );

    onUpdate({
      ...board,
      lists: updatedLists
    });
  };

  const deleteList = (listId) => {
    const updatedLists = board.lists.filter(list => list.id !== listId);
    onUpdate({
      ...board,
      lists: updatedLists
    });
  };

  const addTask = (listId, task) => {
    const updatedLists = board.lists.map(list =>
      list.id === listId
        ? { ...list, tasks: [...list.tasks, task] }
        : list
    );

    onUpdate({
      ...board,
      lists: updatedLists
    });
  };

  const updateTask = (listId, taskId, updatedTask) => {
    const updatedLists = board.lists.map(list =>
      list.id === listId
        ? {
            ...list,
            tasks: list.tasks.map(task =>
              task.id === taskId ? updatedTask : task
            )
          }
        : list
    );

    onUpdate({
      ...board,
      lists: updatedLists
    });
  };

  const deleteTask = (listId, taskId) => {
    const updatedLists = board.lists.map(list =>
      list.id === listId
        ? { ...list, tasks: list.tasks.filter(task => task.id !== taskId) }
        : list
    );

    onUpdate({
      ...board,
      lists: updatedLists
    });
  };

  return (
    <div className="board">
      <div className="board-header">
        <button className="back-btn" onClick={onBack}>
          <FiArrowLeft />
          Back to Dashboard
        </button>
        <h1 className="board-title">{board.name}</h1>
        <div className="board-controls">
          <button
            className="create-board-btn"
            onClick={() => setShowCreateListModal(true)}
          >
            <FiPlus />
            Add List
          </button>
        </div>
      </div>

      <div className="search-container">
        <div style={{ position: 'relative' }}>
          <FiSearch style={{
            position: 'absolute',
            left: '1rem',
            top: '50%',
            transform: 'translateY(-50%)',
            color: '#6c757d'
          }} />
          <input
            type="text"
            className="search-input"
            placeholder="Search tasks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ paddingLeft: '2.5rem' }}
          />
        </div>
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
        modifiers={[restrictToHorizontalAxis]}
      >
        <div className="lists-container">
          {filteredBoard.lists.map((list) => (
            <List
              key={list.id}
              list={list}
              onUpdate={(updatedList) => updateList(list.id, updatedList)}
              onDelete={() => deleteList(list.id)}
              onAddTask={(task) => addTask(list.id, task)}
              onUpdateTask={(taskId, task) => updateTask(list.id, taskId, task)}
              onDeleteTask={(taskId) => deleteTask(list.id, taskId)}
            />
          ))}
          
          <button
            className="add-list-btn"
            onClick={() => setShowCreateListModal(true)}
          >
            <FiPlus />
            Add List
          </button>
        </div>
      </DndContext>

      {showCreateListModal && (
        <CreateListModal
          onClose={() => setShowCreateListModal(false)}
          onCreate={addList}
        />
      )}
    </div>
  );
};

export default Board;
