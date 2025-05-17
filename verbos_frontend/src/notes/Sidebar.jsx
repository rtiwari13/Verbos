import React, { useState, useEffect } from "react";
import { IoMdClose } from "react-icons/io";
const NotebooksData = [
  {
    id: 1,
    name: "Ritual",
  },
  {
    id: 2,
    name: "DSA",
  },
  {
    id: 3,
    name: "Python",
  },
  {
    id: 4,
    name: "Art",
  },
]

export default function Sidebar({selectedNotebook, setSelectedNotebook}) {
  const [notebooks, setNotebooks] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [newNotebook, setNewNotebook] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setNotebooks(NotebooksData);
    }
    fetchData();
  }, []);

  const handleAddNotebook = (e) => {
    e.preventDefault();
    if (newNotebook.trim()) {
      const id = notebooks[notebooks.length - 1].id + 1;
      setNotebooks([{id, name: newNotebook.trim()}, ...notebooks]);
      setSelectedNotebook({id, name: newNotebook.trim()});
      setNewNotebook("");
      setShowModal(false);
    }
  };

  const handleDeleteNotebook = (index) => {
    setNotebooks(notebooks.filter((_, i) => i !== index));
  };

  return (
    <div className="w-48 bg-[var(--sidebar)] text-[var(--sidebar-foreground)] p-2 overflow-y-auto flex flex-col relative">
      <button
        className="mb-3 py-2 px-3 bg-gradient-to-r from-[var(--chart-4)] to-[var(--chart-2)] text-[var(--sidebar-foreground)] rounded shadow hover:from-[var(--chart-3)] hover:to-[var(--chart-1)] transition"
        onClick={() => setShowModal(true)}
      >
        + Add Notebook
      </button>
      <div className="font-bold mb-3">My Notebook</div>
      <ul>
        {notebooks.map((notebook, index) => (
          <li key={notebook?.id}
          className={`mb-1 text-sm flex items-center group cursor-pointer hover:bg-[var(--gray-700)] p-1 rounded ${
            selectedNotebook?.id === notebook?.id ? "bg-[var(--gray-700)]" : ""
          }`}
          onClick={() => setSelectedNotebook(notebook)}
          >
            <span className="flex-1">{notebook?.name}</span>
            <button
              className="ml-2 text-[var(--gray-400)] hover:text-[var(--destructive)] opacity-0 group-hover:opacity-100 transition"
              onClick={e => { e.stopPropagation(); handleDeleteNotebook(index); }}
              title="Delete notebook"
            >
              <IoMdClose size={24} />
            </button>
          </li>
        ))}
      </ul>
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-[var(--card)] rounded-lg shadow-lg p-6 w-80 text-[var(--card-foreground)]">
            <h2 className="text-lg font-bold mb-3">Add New Notebook</h2>
            <form onSubmit={handleAddNotebook}>
              <input
                className="w-full border border-[var(--border)] rounded px-3 py-2 mb-4 focus:outline-none focus:border-[var(--primary)] bg-[var(--card)] text-[var(--card-foreground)]"
                type="text"
                value={newNotebook}
                onChange={e => setNewNotebook(e.target.value)}
                placeholder="Notebook name"
                autoFocus
              />
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  className="px-3 py-1 rounded bg-[var(--muted)] hover:bg-[var(--gray-300)] text-[var(--muted-foreground)]"
                  onClick={() => { setShowModal(false); setNewNotebook(""); }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-3 py-1 rounded bg-[var(--primary)] hover:bg-[var(--ring)] text-[var(--primary-foreground)]"
                >
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}