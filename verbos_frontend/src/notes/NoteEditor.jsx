import React, { useState } from "react";
import ReactMarkdown from "react-markdown";

export default function NoteEditor({ note, updateCurrentNote }) {
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);


  const handleSave = () => {
    setIsSaving(true);
    console.log(note);
    updateCurrentNote("date", new Date().toLocaleDateString("en-GB"));
    updateCurrentNote("time", new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
    setTimeout(() => {
      setIsSaving(false);
    }, 1000);
  }


  if (!note) {
    return (
      <div className="flex-1 bg-[var(--background)] text-[var(--foreground)] flex flex-col items-center justify-center">
        <div className="text-3xl mb-2">📝</div>
        <div className="text-lg font-semibold mb-1">No note selected</div>
        <div className="text-[var(--muted-foreground)]">Select or create a note to get started!</div>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-[var(--background)] text-[var(--foreground)] p-8 flex flex-col">
      <div className="flex items-center mb-4 gap-2 md:gap-4 lg:gap-16">
        <input
          className="bg-transparent border-b border-[var(--border)] text-2xl font-bold w-full focus:outline-none focus:border-[var(--primary)] transition placeholder-[var(--muted-foreground)] text-[var(--foreground)]"
          value={note.title}
          onChange={e => updateCurrentNote("title", e.target.value)}
          placeholder="Note Title"
        />

      </div>
      <div className="text-xs text-[var(--muted-foreground)] mb-4 flex justify-between">
        <div>
          {note.date} &nbsp;&nbsp; {note.time}
        </div>

        <div className="flex gap-2 items-center">
          <button onClick={() => setIsEditing(!isEditing)}
            className={`px-4 py-2 rounded-md ${isEditing ? "bg-[var(--primary)] text-[var(--primary-foreground)]" : "bg-[var(--muted)] text-[var(--muted-foreground)]"}`}
          >
            {isEditing ? "Preview" : "Edit"}
          </button>
          <button onClick={handleSave}
            className={`px-4 py-2 rounded-md ${isSaving ? "bg-[var(--chart-2)] text-[var(--primary-foreground)]" : "bg-[var(--primary)] text-[var(--primary-foreground)]"}`}
          >
            {isSaving ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
      {isEditing ? (
        <textarea
          className="flex-1 w-full bg-transparent text-[var(--foreground)] resize-none outline-none text-base p-2 rounded border border-[var(--border)] focus:border-[var(--primary)] transition placeholder-[var(--muted-foreground)]"
          value={note.content}
          onChange={e => updateCurrentNote("content", e.target.value)}
          placeholder="Start writing your note here..."
          style={{ minHeight: 200 }}
        ></textarea>
      ) : (
        <div className="flex-1 w-full bg-transparent text-[var(--foreground)] text-base p-2 rounded border border-[var(--border)] prose prose-invert max-w-none overflow-auto" style={{ minHeight: 200 }}>
          <ReactMarkdown>{note.content || "_Nothing to preview..._"}</ReactMarkdown>
        </div>
      )}
    </div>
  );
}