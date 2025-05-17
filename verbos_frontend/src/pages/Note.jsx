// import React, { useState } from "react";
// import NoteEditor from "../notes/NoteEditor";
// import SectionList from "../notes/SectionList";
// import Sidebar from "../notes/Sidebar";
// import Topbar from "../notes/Topbar";

// export default function Notes() {
//     const [currentNote, setCurrentNote] = useState(null);
  
//     return (
//       <div className="h-screen flex flex-col">
//         <Topbar />
//         <div className="flex flex-1">
//           <Sidebar />
//           <SectionList setCurrentNote={setCurrentNote} />
//           <NoteEditor note={currentNote} />
//         </div>
//       </div>
//     );
//   }

import React, { useState, useEffect } from "react";
import Topbar from "../notes/Topbar";
import Sidebar from "../notes/Sidebar";
import SectionList from "../notes/SectionList";
import NoteEditor from "../notes/NoteEditor";

const notesData = [
  {
    id: 1,
    title: "Note 1",
    content: "This is the content of note 1",
    date: "2021-01-01",
    time: "12:00:00"
  },
  {
    id: 2,
    title: "Note 2",
    content: "This is the content of note 2",
    date: "2021-01-02",
    time: "12:00:00"
  },
  {
    id: 3,
    title: "Note 3",
    content: "This is the content of note 3",
    date: "2021-01-03",
    time: "12:00:00"
  }
]

export default function Note() {
  const [notes, setNotes] = useState([]);
  const [currentNoteId, setCurrentNoteId] = useState(null);
  const [selectedNotebook, setSelectedNotebook] = useState(null);

  useEffect(() => {
    const fetchNotes = async () => {
      setNotes(notesData);
    };
    fetchNotes();
  }, []);

  const addNewNote = () => {
    const newNote = {
      id: Date.now(),
      title: "Untitled Note",
      content: "",
      date: new Date().toLocaleDateString("en-GB"),
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    };
    setNotes([newNote, ...notes]);
    setCurrentNoteId(newNote.id);
  };

  const updateCurrentNote = (field, value) => {
    setNotes((prev) =>
      prev.map((note) =>
        note.id === currentNoteId ? { ...note, [field]: value } : note
      )
    );
  };

  const deleteNote = (id) => {
    setNotes((prev) => prev.filter((note) => note.id !== id));
    if (currentNoteId === id) {
      setCurrentNoteId(notes.length > 1 ? notes.find((n) => n.id !== id)?.id : null);
    }
  };

  const currentNote = notes.find((note) => note.id === currentNoteId) || null;

  if (!selectedNotebook) {
    return (
      <div className="h-screen flex flex-col bg-[var(--background)]">
        <Topbar />
        <div className="flex flex-1 overflow-hidden">
          <Sidebar selectedNotebook={selectedNotebook} setSelectedNotebook={setSelectedNotebook} />
          <div className="flex-1 bg-[var(--background)] text-[var(--foreground)] flex flex-col items-center justify-center">
            <div className="text-3xl mb-2">📝</div>
            <div className="text-lg font-semibold mb-1">No notebook selected</div>
            <div className="text-[var(--muted-foreground)]">Select or create a notebook to get started!</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-[var(--background)]">
      <Topbar />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar selectedNotebook={selectedNotebook} setSelectedNotebook={setSelectedNotebook} />
        <SectionList
          notes={notes}
          setCurrentNoteId={setCurrentNoteId}
          addNewNote={addNewNote}
          currentNoteId={currentNoteId}
          deleteNote={deleteNote}
        />
        <NoteEditor
          note={currentNote}
          updateCurrentNote={updateCurrentNote}
        />
      </div>
    </div>
  );
}