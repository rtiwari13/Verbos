// import React from 'react';
// import { FiSun, FiStar, FiCalendar, FiUser, FiHome, FiPlus } from 'react-icons/fi';

// const Sidebar = () => {
//   const items = [
//     { name: 'My Day', icon: <FiSun /> },
//     { name: 'Important', icon: <FiStar /> },
//     { name: 'Planned', icon: <FiCalendar /> },
//     { name: 'Assigned to me', icon: <FiUser /> },
//     { name: 'Tasks', icon: <FiHome /> },
//     { name: 'college space' }
//   ];

//   return (
//     <div className="w-64 bg-zinc-900 text-white flex flex-col justify-between p-4">
//       <div>
//         <input
//           type="text"
//           placeholder="Search"
//           className="w-full mb-4 px-3 py-2 rounded bg-zinc-800 placeholder-gray-400"
//         />
//         <ul>
//           {items.map((item, index) => (
//             <li
//               key={index}
//               className="flex items-center px-2 py-2 mb-2 rounded hover:bg-zinc-800 cursor-pointer"
//             >
//               {item.icon && <span className="mr-3">{item.icon}</span>}
//               {item.name}
//             </li>
//           ))}
//         </ul>
//       </div>
//       <button className="flex items-center text-sm hover:bg-zinc-800 px-3 py-2 rounded">
//         <FiPlus className="mr-2" /> New List
//       </button>
//     </div>
//   );
// };

// export default Sidebar;

import React from "react";
import { FiSun, FiStar, FiCalendar, FiUser, FiHome, FiPlus } from "react-icons/fi";

const Sidebar = ({ categories, selectedCategory, setSelectedCategory, addNewCategory }) => {
  return (
    <div className="w-64 h-screen bg-gray-900 text-white flex flex-col p-4 space-y-4">
      <input
        type="text"
        placeholder="Search"
        className="p-2 rounded bg-gray-800 placeholder-gray-400 text-sm"
      />

      <div className="space-y-2">
        <SidebarItem icon={<FiSun />} label="My Day" onClick={() => setSelectedCategory("My Day")} active={selectedCategory === "My Day"} />
        <SidebarItem icon={<FiStar />} label="Important" onClick={() => setSelectedCategory("Important")} active={selectedCategory === "Important"} />
        <SidebarItem icon={<FiCalendar />} label="Planned" onClick={() => setSelectedCategory("Planned")} active={selectedCategory === "Planned"} />
        <SidebarItem icon={<FiUser />} label="Assigned to me" onClick={() => setSelectedCategory("Assigned to me")} active={selectedCategory === "Assigned to me"} />
        <SidebarItem icon={<FiHome />} label="Tasks" onClick={() => setSelectedCategory("Tasks")} active={selectedCategory === "Tasks"} />
      </div>

      <hr className="border-gray-700 my-4" />

      <div className="flex-1 overflow-y-auto">
        {categories.map((cat, idx) => (
          <SidebarItem
            key={idx}
            label={cat}
            onClick={() => setSelectedCategory(cat)}
            active={selectedCategory === cat}
          />
        ))}
      </div>

      <button
        onClick={addNewCategory}
        className="flex items-center text-sm text-blue-400 hover:text-white mt-4"
      >
        <FiPlus className="mr-1" /> New list
      </button>
    </div>
  );
};

const SidebarItem = ({ icon, label, onClick, active }) => (
  <div
    className={`flex items-center px-3 py-2 rounded cursor-pointer text-sm ${
      active ? "bg-blue-500 text-white" : "hover:bg-gray-700 text-gray-300"
    }`}
    onClick={onClick}
  >
    {icon && <span className="mr-2">{icon}</span>}
    {label}
  </div>
);

export default Sidebar;