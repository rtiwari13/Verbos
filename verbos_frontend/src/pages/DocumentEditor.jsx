import React, { useState, useCallback } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from '@tiptap/extension-text-align';
import Link from '@tiptap/extension-link';
import TextStyle from '@tiptap/extension-text-style';
import Color from '@tiptap/extension-color';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import { common, createLowlight } from 'lowlight'
import { IoMdArrowRoundBack } from "react-icons/io";
import { AiOutlineAlignLeft, AiOutlineAlignCenter, AiOutlineAlignRight } from "react-icons/ai";
import { FiLink, FiCode } from "react-icons/fi";

import {
  BoldIcon,
  ItalicIcon,
  UnderlineIcon,
  HeadingIcon,
  ListIcon,
  UndoIcon,
  RedoIcon,
} from "./Icons"; //  icon components

// Initialize lowlight with common languages
const lowlight = createLowlight(common)

// Custom Link Extension with proper rendering
const CustomLink = Link.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      href: {
        default: null,
      },
      target: {
        default: '_blank',
      },
      rel: {
        default: 'noopener noreferrer',
      },
    }
  },
  renderHTML({ HTMLAttributes }) {
    return ['a', {
      ...HTMLAttributes,
      class: 'text-blue-500 underline hover:text-blue-600 cursor-pointer transition-colors duration-200 relative group',
      'data-tooltip': HTMLAttributes.href,
      style: 'position: relative;',
    }, [
        'span',
        {
          class: 'after:content-[attr(data-tooltip)] after:absolute after:hidden group-hover:after:block after:bg-gray-800 after:text-white after:text-xs after:py-1 after:px-2 after:rounded after:left-1/2 after:-translate-x-1/2 after:-top-8 after:whitespace-nowrap after:z-50',
          'data-tooltip': HTMLAttributes.href,
        },
        0
      ]]
  }
});

const MenuBar = ({ editor, isSaving, handleSave }) => {
  if (!editor) return null;

  const addLink = useCallback(() => {
    if (!editor) return;

    const selection = editor.state.selection;
    const selectedText = editor.state.doc.textBetween(selection.from, selection.to);

    const previousUrl = editor.getAttributes('link').href;
    const url = window.prompt('Enter URL:', previousUrl || 'https://');

    // cancelled
    if (url === null) return;

    // remove link
    if (url === '') {
      editor.chain().focus().unsetLink().run();
      return;
    }

    // If no text is selected, ask for link text
    if (!selectedText) {
      const text = window.prompt('Enter link text:', '');
      if (text === null) return; // cancelled

      // Insert both text and link
      editor
        .chain()
        .focus()
        .insertContent({
          type: 'text',
          text: text,
          marks: [{
            type: 'link',
            attrs: {
              href: url,
              target: '_blank',
              rel: 'noopener noreferrer',
            }
          }]
        })
        .run();
      return;
    }

    // Add link to selected text
    editor
      .chain()
      .focus()
      .setLink({ href: url })
      .run();
  }, [editor]);

  const buttons = [
    {
      group: "text",
      items: [
        {
          icon: <BoldIcon />,
          action: () => editor.chain().focus().toggleBold().run(),
          isActive: () => editor.isActive('bold'),
          tooltip: "Bold (Ctrl+B)",
        },
        {
          icon: <ItalicIcon />,
          action: () => editor.chain().focus().toggleItalic().run(),
          isActive: () => editor.isActive('italic'),
          tooltip: "Italic (Ctrl+I)",
        },
        {
          icon: <UnderlineIcon />,
          action: () => editor.chain().focus().toggleUnderline().run(),
          isActive: () => editor.isActive('underline'),
          tooltip: "Underline (Ctrl+U)",
        },
      ],
    },
    {
      group: "format",
      items: [
        {
          icon: <HeadingIcon />,
          action: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
          isActive: () => editor.isActive('heading', { level: 2 }),
          tooltip: "Heading",
        },
        {
          icon: <ListIcon />,
          action: () => editor.chain().focus().toggleBulletList().run(),
          isActive: () => editor.isActive('bulletList'),
          tooltip: "Bullet List",
        },
      ],
    },
    {
      group: "alignment",
      items: [
        {
          icon: <AiOutlineAlignLeft size={20} />,
          action: () => editor.chain().focus().setTextAlign('left').run(),
          isActive: () => editor.isActive({ textAlign: 'left' }),
          tooltip: "Align Left",
        },
        {
          icon: <AiOutlineAlignCenter size={20} />,
          action: () => editor.chain().focus().setTextAlign('center').run(),
          isActive: () => editor.isActive({ textAlign: 'center' }),
          tooltip: "Align Center",
        },
        {
          icon: <AiOutlineAlignRight size={20} />,
          action: () => editor.chain().focus().setTextAlign('right').run(),
          isActive: () => editor.isActive({ textAlign: 'right' }),
          tooltip: "Align Right",
        },
      ],
    },
    {
      group: "advanced",
      items: [
        {
          icon: <FiLink size={20} />,
          action: addLink,
          isActive: () => editor.isActive('link'),
          tooltip: "Add Link",
        },
        {
          icon: <FiCode size={20} />,
          action: () => editor.chain().focus().toggleCodeBlock().run(),
          isActive: () => editor.isActive('codeBlock'),
          tooltip: "Code Block",
        },
      ],
    },
    {
      group: "history",
      items: [
        {
          icon: <UndoIcon />,
          action: () => editor.chain().focus().undo().run(),
          tooltip: "Undo (Ctrl+Z)",
        },
        {
          icon: <RedoIcon />,
          action: () => editor.chain().focus().redo().run(),
          tooltip: "Redo (Ctrl+Shift+Z)",
        },
      ],
    },
  ];

  return (
    <div className="flex flex-wrap gap-3 bg-white/80 backdrop-blur-sm border-b border-gray-200 p-3 sticky top-16 z-20 shadow-sm">
      {buttons.map((group, groupIndex) => (
        <React.Fragment key={group.group}>
          <div className="flex gap-1">
            {group.items.map((item, itemIndex) => (
              <button
                key={itemIndex}
                onClick={item.action}
                className={`${item.isActive?.()
                  ? "bg-indigo-100 text-indigo-800"
                  : "text-gray-700"
                  } p-2 rounded-lg hover:bg-indigo-50 transition-all duration-200 relative group cursor-pointer`}
              // title={item.tooltip}
              >
                {item.icon}
                <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-40">
                  {item.tooltip}
                </span>
              </button>
            ))}
          </div>
          {groupIndex < buttons.length - 1 && (
            <div className="w-px h-6 bg-gray-200 mx-1 self-center" />
          )}
        </React.Fragment>
      ))}

      {/* Color Picker */}
      <div className="flex items-center gap-2">
        <input
          type="color"
          onChange={event => editor.chain().focus().setColor(event.target.value).run()}
          value={editor.getAttributes('textStyle').color || '#000000'}
          className="w-8 h-8 rounded cursor-pointer"
          title="Text Color"
        />
      </div>

      <div className="flex items-center ml-auto mr-8">
        <button
          onClick={handleSave}
          disabled={isSaving}
          className={`px-6 py-2.5 rounded-lg font-medium shadow-sm transition-all duration-200 flex items-center space-x-2
              ${isSaving
              ? 'bg-green-500 text-white cursor-not-allowed'
              : 'bg-indigo-600 text-white hover:bg-indigo-700 hover:shadow'
            }`}
        >
          <span>{isSaving ? 'Saving...' : 'Save'}</span>
          {isSaving && (
            <FiCode className="animate-spin h-4 w-4" />
          )}
        </button>
      </div>
    </div>
  );
};

const DocumentEditor = () => {
  const [title, setTitle] = useState("Untitled Document");
  const [isSaving, setIsSaving] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
        bulletList: true,
        codeBlock: false,
      }),
      Underline,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
        alignments: ['left', 'center', 'right'],
      }),
      CustomLink.configure({
        openOnClick: true,
        HTMLAttributes: {
          rel: 'noopener noreferrer',
          target: '_blank',
        },
      }),
      TextStyle,
      Color,
      CodeBlockLowlight.configure({
        lowlight,
        defaultLanguage: 'javascript',
      }),
    ],
    content: "<p>Start writing your document...</p>",
    autofocus: true,
    editorProps: {
      attributes: {
        class: 'focus:outline-none min-h-full [&_ul]:list-disc [&_ul]:ml-6 [&_ul]:mb-4 [&_li]:text-gray-600 [&_li]:mb-1 [&_.is-editor-empty:first-child]:before:content-[attr(data-placeholder)] [&_.is-editor-empty:first-child]:before:text-gray-400 [&_.is-editor-empty:first-child]:before:float-left [&_.is-editor-empty:first-child]:before:pointer-events-none',
      },
    },
  });

  const handleSave = useCallback(() => {
    if (!editor) return;

    setIsSaving(true);
    const content = editor.getHTML();
    console.log('Document Content:', {
      title,
      content,
      timestamp: new Date().toISOString(),
    });

    // Simulate save delay and show success feedback
    setTimeout(() => {
      setIsSaving(false);
    }, 800);
  }, [editor, title]);

  return (
    <div className="min-h-screen bg-[var(--background)] flex flex-col text-[var(--foreground)]">
      {/* Top Bar */}
      <div className="bg-[var(--card)]/80 backdrop-blur-sm border-b border-[var(--border)] px-8 py-4 flex justify-between items-center sticky top-0 shadow-sm">
        <div className="flex items-center space-x-4">
          {/* Back Button */}
          <button
            onClick={() => window.location.href = '/docs'}
            className="px-3 py-2 rounded-lg cursor-pointer text-[var(--foreground)] bg-[var(--sidebar-accent)] font-medium shadow-sm transition-all duration-200 flex items-center space-x-2"
            title="Go Back"
          >
            <IoMdArrowRoundBack />
            <span>Back</span>
          </button>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="text-xl font-medium outline-none bg-transparent w-full max-w-sm focus:border-b-2 focus:border-[var(--primary)] transition-all duration-200 text-[var(--foreground)] placeholder-[var(--muted-foreground)]"
            placeholder="Untitled Document"
          />
        </div>
        <div className="flex items-center space-x-4">
          <div className="w-px h-6 bg-[var(--border)]" />
          <div className="relative group">
            <img
              src="https://i.pravatar.cc/32"
              alt="User"
              className="w-9 h-9 rounded-full ring-2 ring-[var(--background)] shadow-sm cursor-pointer"
            />
            <div className="absolute right-0 mt-2 w-48 bg-[var(--card)] rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-1 group-hover:translate-y-0">
              <div className="p-3 border-b border-[var(--gray-100)]">
                <p className="text-sm font-medium text-[var(--foreground)]">Signed in as</p>
                <p className="text-sm text-[var(--muted-foreground)]">user@example.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Menu */}
      <MenuBar editor={editor} isSaving={isSaving} handleSave={handleSave} />

      {/* Editor */}
      <div className="p-8 flex justify-center flex-grow">
        <div className="bg-[var(--card)] rounded-xl shadow-lg p-12 w-full max-w-4xl min-h-[calc(100vh-16rem)] hover:shadow-xl transition-shadow duration-300">
          <EditorContent
            editor={editor}
            className="prose prose-lg prose-indigo prose-headings:text-gray-700 prose-h1:text-3xl prose-h1:font-bold prose-h1:mb-4 prose-h2:text-2xl prose-h2:font-semibold prose-h2:mb-3 prose-h3:text-xl prose-h3:font-medium prose-h3:mb-2 prose-p:text-gray-600 prose-p:mb-4 prose-ul:list-disc prose-ul:ml-6 prose-ul:mb-4 prose-li:text-gray-600 prose-li:mb-1 prose-headings:!mt-0"
          />
        </div>
      </div>
    </div>
  );
};

export default DocumentEditor;