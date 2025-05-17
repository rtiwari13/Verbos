import React, { useEffect, useState } from "react";
import { FiUser, FiSearch, FiFileText, FiFile, FiFilePlus, FiFileMinus } from "react-icons/fi";
import { IoMdArrowRoundBack } from "react-icons/io";
const sampleDocs = [
  { id: 1, title: "Resume - John Doe", type: "resume", updatedAt: "2025-05-04" },
  { id: 2, title: "Proposal for Hackathon", type: "proposal", updatedAt: "2025-05-02" },
  { id: 3, title: "Personal Notes", type: "blank", updatedAt: "2025-04-29" },
];

const typeIcon = {
  blank: <FiFile className="text-indigo-400" size={28} />,
  letter: <FiFileText className="text-green-500" size={28} />,
  proposal: <FiFilePlus className="text-blue-500" size={28} />,
  resume: <FiFileMinus className="text-yellow-500" size={28} />,
};

const Docs = () => {
  const [search, setSearch] = useState("");
  const [docs, setDocs] = useState([]);

  const filteredDocs = docs.filter((doc) =>
    doc.title.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    const fetchDocs = async () => {
      setDocs(sampleDocs);
    };
    fetchDocs();
  }, []);

  const handleNewDoc = (type) => {
    window.location.href = `/docs/${type}`
  };

  return (
    <div className="min-h-screen bg-[var(--background)] p-0 sm:p-6 relative text-[var(--foreground)]">
      <div className="flex justify-between items-center mb-2 p-4 sticky top-0 z-20">
        <button
          onClick={() => window.location.href = '/'}
          className="flex justify-between items-center mb-2 bg-[var(--card)]/80 rounded-2xl shadow p-4 gap-2 sticky top-0 z-20 backdrop-blur border border-[var(--border)] cursor-pointer hover:bg-[var(--card)] transition-all duration-200">
          <IoMdArrowRoundBack size={24} />
          Back
        </button>
        <button className="flex items-center gap-2 rounded-full bg-[var(--primary)] text-[var(--primary-foreground)] px-5 py-2 font-medium hover:bg-[var(--ring)] shadow transition">
          <FiUser size={20} />
          Profile
        </button>
      </div>
      {/* Header */}
      {/* <div className="flex justify-between items-center mb-8 bg-white/80 rounded-2xl shadow px-6 py-5 sticky top-0 z-20 backdrop-blur border border-gray-200">
        <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
          <FiFileText className="text-indigo-500" size={32} />
          My Documents
        </h1>

      </div> */}

      {/* Quick Create Section */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
        {[
          { type: "blank", label: "New Blank Doc" },
          { type: "letter", label: "Letter" },
          { type: "proposal", label: "Proposal" },
          { type: "resume", label: "Resume" },
        ].map((doc) => (
          <button
            key={doc.type}
            onClick={() => handleNewDoc(doc.type)}
            className="flex flex-col items-center justify-center gap-2 rounded-2xl bg-[var(--card)] shadow-md hover:shadow-xl transition transform hover:-translate-y-1 p-6 text-center border border-[var(--border)] hover:bg-[var(--sidebar-accent)] group"
          >
            <span className="mb-1">{typeIcon[doc.type]}</span>
            <span className="text-base font-semibold text-[var(--primary)] group-hover:text-[var(--ring)]">{doc.label}</span>
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="flex justify-start items-center p-4 gap-2 mt-2">
        <FiSearch className="text-[var(--muted-foreground)]" size={20} />
        <input
          type="text"
          className="w-full md:w-1/2 p-2 rounded-xl border border-[var(--border)] focus:outline-none focus:ring-2 focus:ring-[var(--ring)] text-[var(--foreground)] text-lg bg-[var(--card)] placeholder-[var(--muted-foreground)]"
          placeholder="Search documents..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Docs List */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 pb-24">
        {filteredDocs.map((doc) => (
          <div
            key={doc.id}
            onClick={() => window.location.href = `/docs/${doc.id}`}
            className="rounded-2xl bg-[var(--card)] border border-[var(--border)] p-6 shadow-md hover:shadow-xl transition transform hover:-translate-y-1 flex flex-col gap-2 cursor-pointer"
          >
            <div className="flex items-center gap-3 mb-2">
              {typeIcon[doc.type] || <FiFile className="text-[var(--muted-foreground)]" size={28} />}
              <h3 className="text-lg font-semibold text-[var(--foreground)] truncate">{doc.title}</h3>
            </div>
            <div className="flex items-center gap-2 text-xs text-[var(--muted-foreground)]">
              <span className="rounded px-2 py-0.5 font-medium capitalize text-[var(--foreground)] bg-[var(--sidebar-accent)] border border-[var(--border)]">{doc.type}</span>
              <span className="ml-auto">Last edited: {doc.updatedAt}</span>
            </div>
          </div>
        ))}
        {filteredDocs.length === 0 && (
          <p className="col-span-full text-center text-[var(--muted-foreground)]">No documents found.</p>
        )}
      </div>
    </div>
  );
};

export default Docs;