import React from "react";

export default function SectionList({ notes, setCurrentNoteId, addNewNote, currentNoteId, deleteNote }) {
  return (
    <div className="w-64 bg-[var(--sidebar)]/90 border-r border-[var(--sidebar-border)] p-3 flex flex-col">
      <button
        onClick={addNewNote}
        className="w-full mb-4 py-2 px-3 bg-gradient-to-r from-[var(--chart-2)] to-[var(--chart-4)] text-[var(--sidebar-foreground)] rounded shadow hover:from-[var(--chart-1)] hover:to-[var(--chart-3)] transition"
      >
        + Add Note
      </button>
      <ul className="space-y-2 flex-1 overflow-y-auto">
        {notes.length === 0 && (
          <li className="text-[var(--primary)] text-center mt-10">No notes yet. Add one!</li>
        )}
        {notes.map(note => (
          <li
            key={note.id}
            className={`group flex items-center justify-between cursor-pointer p-2 rounded-lg border transition-all ${
              currentNoteId === note.id ? "bg-[var(--card)] border-[var(--sidebar-border)] font-semibold" : "hover:bg-[var(--card)]/70 border-transparent"
            }`}
            onClick={() => setCurrentNoteId(note.id)}
          >
            <div className="flex-1 min-w-0">
              <div className="text-sm truncate text-[var(--primary)]">{note.title}</div>
              <div className="text-xs text-[var(--muted-foreground)]">{note.date} {note.time}</div>
            </div>
            <button
              className="ml-2 text-[var(--primary)] hover:text-[var(--destructive)] opacity-0 group-hover:opacity-100 transition"
              onClick={e => { e.stopPropagation(); deleteNote(note.id); }}
              title="Delete note"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}