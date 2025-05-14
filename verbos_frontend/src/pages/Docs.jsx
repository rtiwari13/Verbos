import React, { useState } from "react";

const sampleDocs = [
  { id: 1, title: "Resume - John Doe", type: "resume", updatedAt: "2025-05-04" },
  { id: 2, title: "Proposal for Hackathon", type: "proposal", updatedAt: "2025-05-02" },
  { id: 3, title: "Personal Notes", type: "blank", updatedAt: "2025-04-29" },
];

const Docs = () => {
  const [search, setSearch] = useState("");

  const filteredDocs = sampleDocs.filter((doc) =>
    doc.title.toLowerCase().includes(search.toLowerCase())
  );

  const handleNewDoc = (type) => {
    console.log("Creating new:", type);
    if(type === "blank")window.location.href = '/docs/2w35324o45432'
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f9fafb] to-[#eef2f7] p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">📝 My Documents</h1>
        <button className="rounded-full bg-indigo-600 text-white px-4 py-2 font-medium hover:bg-indigo-700">
          Profile
        </button>
      </div>

      {/* Quick Create Section */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        {[
          { type: "blank", label: "New Blank Doc" },
          { type: "letter", label: "Letter" },
          { type: "proposal", label: "Proposal" },
          { type: "resume", label: "Resume" },
        ].map((doc) => (
          <button
            key={doc.type}
            onClick={() => handleNewDoc(doc.type)}
            className="rounded-xl bg-white shadow-md hover:shadow-lg transition p-4 text-center border border-gray-200 hover:bg-indigo-50"
          >
            <div className="text-xl font-semibold text-indigo-600">{doc.label}</div>
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <input
          type="text"
          className="w-full md:w-1/2 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          placeholder="Search documents..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Docs List */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDocs.map((doc) => (
          <div
            key={doc.id}
            className="rounded-xl bg-white border border-gray-200 p-5 shadow-sm hover:shadow-md transition"
          >
            <h3 className="text-lg font-semibold text-gray-800">{doc.title}</h3>
            <p className="text-sm text-gray-500 mt-1">Type: {doc.type}</p>
            <p className="text-xs text-gray-400 mt-2">Last edited: {doc.updatedAt}</p>
          </div>
        ))}
        {filteredDocs.length === 0 && (
          <p className="col-span-full text-center text-gray-500">No documents found.</p>
        )}
      </div>
    </div>
  );
};

export default Docs;
