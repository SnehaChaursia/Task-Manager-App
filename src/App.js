import React, { useState, useEffect } from 'react';
import Dashboard from './components/Dashboard';
import Board from './components/Board';
import './App.css';



function App() {
  const [boards, setBoards] = useState([]);
  const [currentBoard, setCurrentBoard] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedBoards = localStorage.getItem('taskManagerBoards');
    const savedDarkMode = localStorage.getItem('taskManagerDarkMode');
    
    if (savedBoards) {
      setBoards(JSON.parse(savedBoards));
    }
    
    if (savedDarkMode) {
      setDarkMode(JSON.parse(savedDarkMode));
    }
  }, []);

  // Save boards to localStorage whenever boards change
  useEffect(() => {
    localStorage.setItem('taskManagerBoards', JSON.stringify(boards));
  }, [boards]);

  // Save dark mode preference to localStorage
  useEffect(() => {
    localStorage.setItem('taskManagerDarkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  const createBoard = (name) => {
    const newBoard = {
      id: Date.now().toString(),
      name,
      lists: [
        {
          id: 'todo',
          name: 'To Do',
          tasks: []
        },
        {
          id: 'in-progress',
          name: 'In Progress',
          tasks: []
        },
        {
          id: 'done',
          name: 'Done',
          tasks: []
        }
      ]
    };
    setBoards([...boards, newBoard]);
  };

  const deleteBoard = (boardId) => {
    setBoards(boards.filter(board => board.id !== boardId));
    if (currentBoard && currentBoard.id === boardId) {
      setCurrentBoard(null);
    }
  };

  const updateBoard = (updatedBoard) => {
    setBoards(boards.map(board => 
      board.id === updatedBoard.id ? updatedBoard : board
    ));
    if (currentBoard && currentBoard.id === updatedBoard.id) {
      setCurrentBoard(updatedBoard);
    }
  };

  const reorderBoards = (reorderedBoards) => {
    setBoards(reorderedBoards);
  };

  const exportData = () => {
    const data = {
      boards,
      darkMode,
      exportDate: new Date().toISOString()
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `task-manager-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const importData = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = JSON.parse(e.target.result);
          if (data.boards) {
            setBoards(data.boards);
          }
          if (data.darkMode !== undefined) {
            setDarkMode(data.darkMode);
          }
        } catch (error) {
          alert('Invalid backup file');
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className={`app ${darkMode ? 'dark' : ''}`}>
      <header className="app-header">
        <h1>Task Manager App</h1>
        <div className="header-controls">
          <button 
            className="theme-toggle"
            onClick={() => setDarkMode(!darkMode)}
            title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {darkMode ? '☀️' : '🌙'}
          </button>
          <button className="export-btn" onClick={exportData}>
            Export
          </button>
          <label className="import-btn">
            Import
            <input
              type="file"
              accept=".json"
              onChange={importData}
              style={{ display: 'none' }}
            />
          </label>
        </div>
      </header>

      <main className="app-main">
        {currentBoard ? (
          <Board
            board={currentBoard}
            onUpdate={updateBoard}
            onBack={() => setCurrentBoard(null)}
          />
        ) : (
          <Dashboard
            boards={boards}
            onCreateBoard={createBoard}
            onDeleteBoard={deleteBoard}
            onSelectBoard={setCurrentBoard}
            onReorderBoards={reorderBoards}
          />
        )}
      </main>
    </div>
  );
}

export default App;
