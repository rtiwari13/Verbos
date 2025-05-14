
import React from "react";

export default function NoteEditor({ note, onChange }) {
  if (!note) {
    return <div className="flex-1 bg-black text-white flex items-center justify-center">Select or create a note</div>;
  }

  return (
    <div className="flex-1 bg-black text-white p-6">
      <div className="text-sm text-gray-400 mb-2">
        {note.date} &nbsp;&nbsp; {note.time}
      </div>
      <textarea
        className="w-full h-full bg-black text-white resize-none outline-none text-base"
        value={note.content}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Start writing your note here..."
      ></textarea>
    </div>
  );
}