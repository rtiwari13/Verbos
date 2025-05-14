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

import React, { useState } from "react";
import Topbar from "../notes/Topbar";
import Sidebar from "../notes/Sidebar";
import SectionList from "../notes/SectionList";
import NoteEditor from "../notes/NoteEditor";

export default function Note() {
  const [notes, setNotes] = useState([]);
  const [currentNote, setCurrentNote] = useState(null);

  const addNewNote = () => {
    const newNote = {
      id: Date.now(),
      title: "Untitled Note",
      content: "",
      date: new Date().toLocaleDateString("en-GB"),
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    };
    setNotes([newNote, ...notes]);
    setCurrentNote(newNote);
  };

  const updateCurrentNote = (content) => {
    setNotes((prev) =>
      prev.map((note) =>
        note.id === currentNote.id ? { ...note, content } : note
      )
    );
    setCurrentNote((prev) => ({ ...prev, content }));
  };

  return (
    <div className="h-screen flex flex-col">
      <Topbar />
      <div className="flex flex-1">
        <Sidebar />
        <SectionList notes={notes} setCurrentNote={setCurrentNote} addNewNote={addNewNote} />
        <NoteEditor note={currentNote} onChange={updateCurrentNote} />
      </div>
    </div>
  );
}