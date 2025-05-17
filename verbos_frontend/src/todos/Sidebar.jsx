import React, { useState } from "react";
import { FiSun, FiStar, FiCalendar, FiUser, FiHome, FiPlus, FiSearch, FiTrash2 } from "react-icons/fi";

import Modal from "../components/Modal";

const Sidebar = ({ 
  categories, 
  selectedCategory, 
  setSelectedCategory, 
  addNewCategory,
  deleteCategory,
  tasks 
}) => {
  
  const [searchTerm, setSearchTerm] = useState("");
  const [newCategoryName, setNewCategoryName] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);

  // Define count functions first
  const getTaskCount = (category) => {
    return tasks.filter(task => task.category === category && !task.completed).length;
  };

  const getImportantCount = () => {
    return tasks.filter(task => task.important && !task.completed).length;
  };

  const getPlannedCount = () => {
    return tasks.filter(task => task.category === "Planned" && !task.completed).length;
  };

  const getAssignedCount = () => {
    return tasks.filter(task => task.category === "Assigned to me" && !task.completed).length;
  };

  // Then define defaultCategories using the functions
  const defaultCategories = [
    {
      id: 'my-day',
      name: 'My Day',
      icon: <FiSun />,
      getCount: () => getTaskCount("My Day")
    },
    {
      id: 'important',
      name: 'Important',
      icon: <FiStar />,
      getCount: getImportantCount
    },
    {
      id: 'planned',
      name: 'Planned',
      icon: <FiCalendar />,
      getCount: getPlannedCount
    },
    {
      id: 'assigned',
      name: 'Assigned to me',
      icon: <FiUser />,
      getCount: getAssignedCount
    },
    {
      id: 'tasks',
      name: 'Tasks',
      icon: <FiHome />,
      getCount: () => getTaskCount("Tasks")
    }
  ];

  const handleAddCategory = () => {
    if (newCategoryName.trim() && !categories.includes(newCategoryName.trim())) {
      addNewCategory(newCategoryName.trim());
      setNewCategoryName("");
      setShowAddModal(false);
    }
  };

  const handleDeleteCategory = () => {
    if (categoryToDelete) {
      deleteCategory(categoryToDelete);
      setCategoryToDelete(null);
    }
  };

  const filteredDefaultCategories = defaultCategories.filter(cat => 
    cat.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredCustomCategories = categories.filter(cat => 
    cat.toLowerCase().includes(searchTerm.toLowerCase()) &&
    !defaultCategories.some(defaultCat => defaultCat.name === cat)
  );

  const isDefaultCategory = (category) => {
    return defaultCategories.some(cat => cat.name === category);
  };

  return (
    <>
      <div className="w-64 h-screen bg-[var(--sidebar)] text-[var(--sidebar-foreground)] flex flex-col p-4 space-y-4">
        <div className="relative">
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[var(--muted-foreground)]" />
          <input
            type="text"
            placeholder="Search lists..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 pl-10 rounded bg-[var(--card)] text-[var(--sidebar-foreground)] placeholder-[var(--muted-foreground)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
          />
        </div>

        <div className="space-y-1">
          {filteredDefaultCategories.map((category) => (
            <SidebarItem 
              key={category.id}
              icon={category.icon}
              label={category.name}
              count={category.getCount()}
              onClick={() => setSelectedCategory(category.name)}
              active={selectedCategory === category.name}
            
            />
          ))}
        </div>

        {filteredCustomCategories.length > 0 && (
          <>
            <hr className="border-[var(--border)]" />

            <div className="flex-1 overflow-y-auto space-y-1">
              {filteredCustomCategories.map((cat, idx) => (
                <div key={idx} className="group relative">
                  <SidebarItem
                    label={cat}
                    count={getTaskCount(cat)}
                    onClick={() => setSelectedCategory(cat)}
                    active={selectedCategory === cat}
                   
                  />
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setCategoryToDelete(cat);
                    }}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 
                             text-[var(--muted-foreground)] hover:text-[var(--destructive)] transition-opacity duration-200"
                  >
                    <FiTrash2 size={14} />
                  </button>
                </div>
              ))}
            </div>
          </>
        )}

        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center text-sm text-[var(--primary)] hover:text-[var(--sidebar-foreground)] transition-colors duration-200"
        >
          <FiPlus className="mr-2" /> New list
        </button>
      </div>

      {/* Add Category Modal */}
      <Modal
        isOpen={showAddModal}
        onClose={() => {
          setShowAddModal(false);
          setNewCategoryName("");
        }}
        title="Create New List"
        primaryButton={{
          label: "Create",
          onClick: handleAddCategory
        }}
        secondaryButton={{
          label: "Cancel",
          onClick: () => {
            setShowAddModal(false);
            setNewCategoryName("");
          }
        }}
      >
        <input
          type="text"
          placeholder="Enter list name"
          value={newCategoryName}
          onChange={(e) => setNewCategoryName(e.target.value)}
          className="w-full p-2 rounded bg-[var(--card)] text-[var(--foreground)] placeholder-[var(--muted-foreground)] 
                   focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
          autoFocus
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleAddCategory();
            }
          }}
        />
      </Modal>

      {/* Delete Category Modal */}
      <Modal
        isOpen={!!categoryToDelete}
        onClose={() => setCategoryToDelete(null)}
        title="Delete List"
        primaryButton={{
          label: "Delete",
          onClick: handleDeleteCategory,
          variant: "danger"
        }}
        secondaryButton={{
          label: "Cancel",
          onClick: () => setCategoryToDelete(null)
        }}
      >
        <p className="text-[var(--muted-foreground)]">
          Are you sure you want to delete "{categoryToDelete}" and all its tasks? 
          This action cannot be undone.
        </p>
      </Modal>
    </>
  );
};

const SidebarItem = ({ icon, label, count, onClick, active, theme }) => (
  <div
    className={`flex items-center px-3 py-2 rounded cursor-pointer text-sm transition-colors duration-200
      ${active ? "bg-[var(--primary)] text-[var(--primary-foreground)]" : "hover:bg-[var(--sidebar-accent)]/40 text-[var(--sidebar-foreground)] opacity-75 hover:opacity-100"}`}
    onClick={onClick}
  >
    <div className="flex items-center flex-1">
      {icon && <span className="mr-3">{icon}</span>}
      <span className="truncate">{label}</span>
    </div>
    {count > 0 && (
      <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${
        active ? "bg-[var(--primary-foreground)]/20" : "bg-[var(--muted-foreground)]/20"
      }`}>
        {count}
      </span>
    )}
  </div>
);

export default Sidebar;