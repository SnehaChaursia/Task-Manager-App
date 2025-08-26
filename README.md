# Task Manager App - Trello-like Clone

A modern, responsive task management application built with React that mimics Trello's functionality. This application supports multiple boards, lists, and tasks with drag-and-drop functionality, all persisted in localStorage.

## 🌐 Live Application

**Production URL:** https://task-manager-dyn0orclo-snehachaursias-projects.vercel.app

## 🚀 Features

### Core Features
- **Dashboard**: View and manage all boards
- **Board Management**: Create, delete, and reorder boards
- **List Management**: Add, edit, and delete lists within boards
- **Task Management**: Create, edit, and delete tasks with titles and descriptions
- **Drag & Drop**: Intuitive drag-and-drop for tasks between lists and boards
- **Data Persistence**: All data automatically saved to localStorage
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices

### Bonus Features
- ✅ **Drag-and-drop boards**: Reorder boards on the dashboard
- ✅ **Dark mode toggle**: Switch between light and dark themes
- ✅ **Export/Import**: Backup and restore entire application state as JSON

## 🛠️ Technologies Used

- **React 18** - Modern React with hooks
- **@dnd-kit** - Advanced drag-and-drop library
- **React Icons** - Beautiful icon library
- **CSS3** - Custom styling with modern features
- **localStorage** - Client-side data persistence

## 📦 Installation & Setup

### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn package manager

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Task-Manager-App
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000` to view the application

### Build for Production
```bash
npm run build
```

## 🎯 How to Use

### Dashboard
- **Create Board**: Click "Create New Board" button and enter a board name
- **View Boards**: All your boards are displayed in a grid layout
- **Delete Board**: Hover over a board and click the trash icon
- **Reorder Boards**: Drag and drop boards to reorder them
- **Open Board**: Click on any board to enter it

### Board View
- **Add List**: Click "Add List" button to create a new list
- **Edit List**: Click the edit icon on any list header
- **Delete List**: Click the trash icon on any list header
- **Back to Dashboard**: Click "Back to Dashboard" button

### Lists & Tasks
- **Add Task**: Click "Add Task" button in any list
- **Edit Task**: Hover over a task and click the edit icon
- **Delete Task**: Hover over a task and click the trash icon
- **Drag Tasks**: Drag tasks between lists or reorder within the same list
- **Task Details**: Each task can have a title (required) and description (optional)

### Theme & Data Management
- **Dark Mode**: Toggle between light and dark themes using the sun/moon icon
- **Export Data**: Click "Export" to download your data as a JSON file
- **Import Data**: Click "Import" to restore data from a previously exported file

## 🏗️ Project Structure

```
src/
├── components/
│   ├── Dashboard.js          # Main dashboard component
│   ├── Board.js              # Board view component
│   ├── List.js               # List component
│   ├── Task.js               # Task component
│   ├── CreateBoardModal.js   # Modal for creating boards
│   ├── CreateListModal.js    # Modal for creating lists
│   ├── CreateTaskModal.js    # Modal for creating tasks
│   ├── EditListModal.js      # Modal for editing lists
│   └── EditTaskModal.js      # Modal for editing tasks
├── App.js                    # Main application component
├── App.css                   # Main stylesheet
└── index.js                  # Application entry point
```

## 🎨 Design Features

- **Modern UI**: Clean, intuitive interface with smooth animations
- **Responsive Layout**: Adapts to different screen sizes
- **Dark Mode**: Complete dark theme with proper contrast
- **Hover Effects**: Interactive elements with smooth transitions
- **Accessibility**: Keyboard navigation and screen reader support
- **Visual Feedback**: Clear indicators for drag-and-drop operations

## 🔧 Technical Implementation

### State Management
- Uses React hooks (useState, useEffect) for state management
- Implements localStorage for data persistence
- Efficient state updates with proper immutability

### Drag & Drop
- Powered by @dnd-kit library for smooth drag-and-drop experience
- Supports both horizontal (lists) and vertical (tasks) dragging
- Visual feedback during drag operations

### Data Structure
```javascript
{
  boards: [
    {
      id: "string",
      name: "string",
      lists: [
        {
          id: "string",
          name: "string",
          tasks: [
            {
              id: "string",
              title: "string",
              description: "string (optional)",
              createdAt: "ISO string",
              updatedAt: "ISO string (optional)"
            }
          ]
        }
      ]
    }
  ]
}
```

## 🚀 Performance Optimizations

- **Memoization**: Uses useMemo for expensive computations
- **Efficient Rendering**: Optimized component re-renders
- **Lazy Loading**: Components load only when needed
- **Smooth Animations**: CSS transitions for better UX

## 🐛 Known Limitations

- **Browser Storage**: Limited by localStorage capacity (~5-10MB)
- **No Real-time Sync**: Data is local to the browser
- **No User Accounts**: No authentication or user management
- **No Offline Support**: Requires internet for initial load



**Built with ❤️ using React and modern web technologies**