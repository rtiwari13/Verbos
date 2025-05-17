import React from "react";

export default function Topbar() {
  return (
    <div className="bg-gray-800 text-white h-12 flex items-center justify-between px-4 shadow">
      <div className="text-lg font-semibold">NoteCraft</div>
      <div className="text-sm text-gray-300">Search | Help</div>
    </div>
  );
}