import React, { useState, useRef, useEffect } from "react";
import { FiMoreHorizontal } from "react-icons/fi";
import { format } from "date-fns";

import TaskItem from "./TaskItem";

const Main = ({ 
  selectedCategory, 
  tasks, 
  onAddTask, 
  onToggleComplete, 
  onToggleImportant,
  onDeleteTask,
  onUpdateTaskText
}) => {
  
  const [input, setInput] = useState("");
  const [editingTask, setEditingTask] = useState(null);
  const [editText, setEditText] = useState("");
  const [showThemeMenu, setShowThemeMenu] = useState(false);
  const inputRef = useRef(null);
  const editInputRef = useRef(null);
  const themeMenuRef = useRef(null);

  useEffect(() => {
    if (editingTask) {
      editInputRef.current?.focus();
    }
  }, [editingTask]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (themeMenuRef.current && !themeMenuRef.current.contains(event.target)) {
        setShowThemeMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      onAddTask(input.trim());
      setInput("");
    }
  };

  const handleEdit = (task) => {
    setEditingTask(task.id);
    setEditText(task.text);
  };

  const handleEditSubmit = (taskId) => {
    if (editText.trim() && editText !== tasks.find(t => t.id === taskId)?.text) {
      onUpdateTaskText(taskId, editText.trim());
    }
    setEditingTask(null);
    setEditText("");
  };

  const filteredTasks = tasks.filter(task => {
    if (selectedCategory === "Important") {
      return task.important;
    }
    return task.category === selectedCategory;
  });

  const incompleteTasks = filteredTasks.filter(task => !task.completed);
  const completedTasks = filteredTasks.filter(task => task.completed);

  return (
    <div className="flex-1 bg-[var(--background)] text-[var(--foreground)] relative overflow-hidden">
      <div className="p-8 h-full flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">{selectedCategory}</h1>
            <p className="text-[var(--muted-foreground)]">{format(new Date(), "EEEE, d MMMM")}</p>
          </div>
          <div className="relative" ref={themeMenuRef}>
            <button
              onClick={() => setShowThemeMenu(!showThemeMenu)}
              className="p-2 rounded-lg hover:bg-[var(--sidebar-accent)]/40 transition-colors duration-200"
            >
              <FiMoreHorizontal size={20} />
            </button>

            {showThemeMenu && (
              <div className="absolute right-0 top-12 w-48 bg-[var(--card)] rounded-lg shadow-lg py-2 z-50">
                <div className="px-4 py-2 text-sm text-[var(--muted-foreground)] border-b border-[var(--border)]">
                  Choose Theme
                </div>
                {Object.entries(themes).map(([key, value]) => (
                  <button
                    key={key}
                    onClick={() => {
                      setCurrentTheme(key);
                      setShowThemeMenu(false);
                    }}
                    className={`w-full px-4 py-2 text-left text-sm hover:bg-[var(--sidebar-accent)] flex items-center justify-between
                      ${currentTheme === key ? 'text-[var(--primary)]' : 'text-[var(--foreground)]'}`}
                  >
                    {value.name}
                    {currentTheme === key && <span className="text-[var(--primary)]">✓</span>}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Task Lists */}
        <div className="flex-1 overflow-y-auto space-y-6">
          {/* Incomplete Tasks */}
          <div className="space-y-2">
            {incompleteTasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                isEditing={editingTask === task.id}
                editText={editText}
                setEditText={setEditText}
                onEditSubmit={handleEditSubmit}
                editInputRef={editInputRef}
                onToggleComplete={onToggleComplete}
                onToggleImportant={onToggleImportant}
                onDelete={onDeleteTask}
                onEdit={handleEdit}
               
              />
            ))}
          </div>

          {/* Completed Tasks */}
          {completedTasks.length > 0 && (
            <div>
              <h3 className="text-[var(--muted-foreground)] text-sm font-medium mb-2">Completed</h3>
              <div className="space-y-2">
                {completedTasks.map((task) => (
                  <TaskItem
                    key={task.id}
                    task={task}
                    isEditing={editingTask === task.id}
                    editText={editText}
                    setEditText={setEditText}
                    onEditSubmit={handleEditSubmit}
                    editInputRef={editInputRef}
                    onToggleComplete={onToggleComplete}
                    onToggleImportant={onToggleImportant}
                    onDelete={onDeleteTask}
                    onEdit={handleEdit}
                    
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Add Task Form */}
        <form onSubmit={handleSubmit} className="mt-4">
          <input
            ref={inputRef}
            type="text"
            placeholder="Add a task..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-[var(--card)] text-[var(--foreground)] placeholder-[var(--muted-foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] transition-shadow duration-200"
          />
        </form>
      </div>
    </div>
  );
};

export default Main;