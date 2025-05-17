import React, { useState, useEffect } from "react";
import Sidebar from '../todos/Sidebar';
import Main from '../todos/Main';


const Todo = () => {
  // Initialize state with data from localStorage or defaults
  const [categories, setCategories] = useState(() => {
    const savedCategories = localStorage.getItem('verbos_categories');
    return savedCategories ? JSON.parse(savedCategories) : ["My Day", "Important", "Planned", "Assigned to me", "Tasks"];
  });

  const [selectedCategory, setSelectedCategory] = useState(() => {
    const savedCategory = localStorage.getItem('verbos_selected_category');
    return savedCategory || "My Day";
  });

  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('verbos_tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  // Save to localStorage whenever data changes
  useEffect(() => {
    localStorage.setItem('verbos_categories', JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    localStorage.setItem('verbos_selected_category', selectedCategory);
  }, [selectedCategory]);

  useEffect(() => {
    localStorage.setItem('verbos_tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addNewCategory = (name) => {
    if (name && !categories.includes(name)) {
      setCategories([...categories, name]);
    }
  };

  const deleteCategory = (categoryToDelete) => {
    if (categoryToDelete === selectedCategory) {
      setSelectedCategory("My Day");
    }
    setCategories(categories.filter(cat => cat !== categoryToDelete));
    // Remove tasks in the deleted category
    setTasks(tasks.filter(task => task.category !== categoryToDelete));
  };

  const addTask = (taskText) => {
    const newTask = {
      id: Date.now(),
      text: taskText,
      category: selectedCategory,
      completed: false,
      createdAt: new Date().toISOString(),
      important: false
    };
    setTasks([...tasks, newTask]);
  };

  const toggleTaskCompletion = (taskId) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const toggleTaskImportance = (taskId) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, important: !task.important } : task
    ));
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const updateTaskText = (taskId, newText) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, text: newText } : task
    ));
  };

  return (
    
      <div className="flex h-screen font-sans">
        <Sidebar
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          addNewCategory={addNewCategory}
          deleteCategory={deleteCategory}
          tasks={tasks}
        />
        <Main 
          selectedCategory={selectedCategory}
          tasks={tasks}
          onAddTask={addTask}
          onToggleComplete={toggleTaskCompletion}
          onToggleImportant={toggleTaskImportance}
          onDeleteTask={deleteTask}
          onUpdateTaskText={updateTaskText}
        />
      </div>
   
  );
};

export default Todo;