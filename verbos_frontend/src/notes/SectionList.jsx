
import React from "react";

export default function SectionList({ notes, setCurrentNoteId, addNewNote, currentNoteId }) {
  return (
    <div className="w-64 bg-gray-100 border-r border-gray-300 p-2">
      <button
        onClick={addNewNote}
        className="w-full mb-4 py-2 px-3 bg-blue-600 text-white rounded hover:bg-blue-500"
      >
        + Add Note
      </button>
      <ul className="space-y-2">
        {notes.map(note => (
          <li
            key={note.id}
            onClick={() => setCurrentNoteId(note.id)}
            className={`cursor-pointer p-2 rounded hover:bg-blue-100 ${
              currentNoteId === note.id ? "bg-blue-200 font-semibold" : ""
            }`}
          >
            <div className="text-sm truncate">{note.title}</div>
            <div className="text-xs text-gray-500">
              {note.date} {note.time}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
