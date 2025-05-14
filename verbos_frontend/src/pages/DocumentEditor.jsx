import React, { useState } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";

import {
  BoldIcon,
  ItalicIcon,
  UnderlineIcon,
  HeadingIcon,
  ListIcon,
  UndoIcon,
  RedoIcon,
} from "./Icons"; //  icon components

const MenuBar = ({ editor }) => {
  if (!editor) return null;

  return (
    <div className="flex flex-wrap gap-2 bg-white border-b border-gray-200 p-2 sticky top-0 z-20 shadow-sm">
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={`${editor.isActive("bold") ? "bg-indigo-100" : ""} px-2 py-1 rounded hover:bg-indigo-50`}
      >
        <BoldIcon />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={`${editor.isActive("italic") ? "bg-indigo-100" : ""} px-2 py-1 rounded hover:bg-indigo-50`}
      >
        <ItalicIcon />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        className={`${editor.isActive("underline") ? "bg-indigo-100" : ""} px-2 py-1 rounded hover:bg-indigo-50`}
      >
        <UnderlineIcon />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={`${editor.isActive("heading", { level: 2 }) ? "bg-indigo-100" : ""} px-2 py-1 rounded hover:bg-indigo-50`}
      >
        <HeadingIcon />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={`${editor.isActive("bulletList") ? "bg-indigo-100" : ""} px-2 py-1 rounded hover:bg-indigo-50`}
      >
        <ListIcon />
      </button>
      <button
        onClick={() => editor.chain().focus().undo().run()}
        className="px-2 py-1 rounded hover:bg-indigo-50"
      >
        <UndoIcon />
      </button>
      <button
        onClick={() => editor.chain().focus().redo().run()}
        className="px-2 py-1 rounded hover:bg-indigo-50"
      >
        <RedoIcon />
      </button>
    </div>
  );
};

const DocumentEditor = () => {
  const [title, setTitle] = useState("Untitled Document");

  const editor = useEditor({
    extensions: [StarterKit, Underline],
    content: "<p>Start writing your document...</p>",
  });

  return (
    <div className="min-h-screen bg-[#f8f9fb] flex flex-col">
      {/* Top Bar */}
      <div className="bg-white border-b border-gray-200 px-6 py-3 flex justify-between items-center sticky top-0 z-30 shadow">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="text-lg font-medium outline-none bg-transparent w-full max-w-sm"
        />
        <div className="flex items-center space-x-4">
          <button className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">
            Save
          </button>
          <img
            src="https://i.pravatar.cc/32"
            alt="User"
            className="w-8 h-8 rounded-full"
          />
        </div>
      </div>

      {/* Menu */}
      <MenuBar editor={editor} />

      {/* Editor */}
      <div className="p-6 flex justify-center">
        <div className="bg-white rounded-md shadow-lg p-8 w-full max-w-4xl min-h-[80vh] prose prose-indigo">
          <EditorContent editor={editor} />
        </div>
      </div>
    </div>
  );
};

export default DocumentEditor;
