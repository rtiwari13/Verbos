import React, { useState } from "react";
import Sidebar from '../todos/Sidebar';
import Main from '../todos/Main';

const Todo = () => {
  const defaultCategories = ["college space"];
  const [categories, setCategories] = useState(defaultCategories);
  const [selectedCategory, setSelectedCategory] = useState("My Day");

  const addNewCategory = () => {
    const name = prompt("Enter new category name:");
    if (name && !categories.includes(name)) {
      setCategories([...categories, name]);
    }
  };

  return (
    <div className="flex h-screen font-sans">
      <Sidebar
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        addNewCategory={addNewCategory}
      />
      <Main selectedCategory={selectedCategory} />
    </div>
  );
};

export default Todo;
