import React from "react";

export default function Sidebar() {
  const sections = [
    "Ritual", "DSA", "Python", "Art", "Networking", "DBMS", "React", "FastAPI"
  ];

  return (
    <div className="w-48 bg-gray-900 text-white p-2 overflow-y-auto">
      <div className="font-bold mb-3">My Notebook</div>
      <ul>
        {sections.map((section, index) => (
          <li key={index} className="mb-1 text-sm cursor-pointer hover:bg-gray-700 p-1 rounded">
            {section}
          </li>
        ))}
      </ul>
    </div>
  );
}
