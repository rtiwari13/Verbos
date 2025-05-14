import React, { useState } from "react";
import { FiMoreHorizontal } from "react-icons/fi";
import { FaLightbulb } from "react-icons/fa6";
import { format } from "date-fns";

const Main = ({ selectedCategory }) => {
    const [tasks, setTasks] = useState([]);
    const [input, setInput] = useState("");
  
    const addTask = (e) => {
      e.preventDefault();
      if (!input.trim()) return;
      setTasks((prev) => [
        ...prev,
        {
          id: Date.now(),
          text: input,
          category: selectedCategory,
          completed: false,
        },
      ]);
      setInput("");
    };
  
    const toggleTask = (id) => {
      setTasks((prev) =>
        prev.map((task) =>
          task.id === id ? { ...task, completed: !task.completed } : task
        )
      );
    };
  
    return (
      <div className="flex-1 bg-gradient-to-b from-sky-300 to-sky-100 relative">
        <div className="p-8">
          <div className="flex justify-between items-center text-white">
            <div>
              <h1 className="text-3xl font-semibold">{selectedCategory}</h1>
              <p className="text-sm">{format(new Date(), "EEEE, d MMMM")}</p>
            </div>
            <div className="flex space-x-4 text-white">
              <button className="p-2 rounded hover:bg-white/10">
                <FaLightbulb size={18} />
              </button>
              <button className="p-2 rounded hover:bg-white/10">
                <FiMoreHorizontal size={18} />
              </button>
            </div>
          </div>
  
          <div className="mt-8 space-y-4">
            {tasks
              .filter((task) => task.category === selectedCategory)
              .map((task) => (
                <div
                  key={task.id}
                  className="flex items-center bg-white/70 rounded px-4 py-3 shadow"
                >
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleTask(task.id)}
                    className="mr-3"
                  />
                  <span
                    className={`text-gray-800 text-sm flex-1 ${
                      task.completed ? "line-through text-gray-500" : ""
                    }`}
                  >
                    {task.text}
                  </span>
                </div>
              ))}
          </div>
        </div>
  
        <form
          onSubmit={addTask}
          className="absolute bottom-8 w-full flex justify-center"
        >
          <input
            type="text"
            placeholder="Add a task..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-[70%] px-4 py-3 rounded-full shadow-md bg-white/80 backdrop-blur placeholder-gray-600"
          />
        </form>
      </div>
    );
  };
  
  export default Main;