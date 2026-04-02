"use client";

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import {
  Bold,
  Heading2,
  Heading3,
  Italic,
  List,
  ListOrdered,
  Quote,
  Redo2,
  Strikethrough,
  Undo2,
} from "lucide-react";

const btn =
  "inline-flex h-8 w-8 items-center justify-center rounded-md text-stone-600 transition-colors hover:bg-stone-200/80 hover:text-stone-900 disabled:opacity-40 disabled:hover:bg-transparent";

type Props = {
  value: string;
  onChange: (html: string) => void;
};

export function ArticleBodyEditor({ value, onChange }: Props) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [2, 3] },
      }),
      Placeholder.configure({
        placeholder: "พิมพ์เนื้อหาบทความที่นี่…",
      }),
    ],
    content: value,
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class:
          "min-h-[280px] max-w-none px-3 py-3 text-sm leading-relaxed text-stone-800 focus:outline-none",
      },
    },
    onUpdate: ({ editor: ed }) => {
      onChange(ed.getHTML());
    },
  });

  if (!editor) {
    return (
      <div className="min-h-[320px] animate-pulse rounded-lg border border-stone-200 bg-stone-50" />
    );
  }

  return (
    <div className="overflow-hidden rounded-lg border border-stone-200 bg-white focus-within:border-stone-400 focus-within:ring-2 focus-within:ring-stone-900/10">
      <div
        className="flex flex-wrap gap-0.5 border-b border-stone-200 bg-stone-50/90 px-2 py-1.5"
        role="toolbar"
        aria-label="จัดรูปแบบเนื้อหา"
      >
        <button
          type="button"
          className={btn}
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editor.can().chain().focus().toggleBold().run()}
          aria-label="ตัวหนา"
        >
          <Bold className="h-4 w-4" />
        </button>
        <button
          type="button"
          className={btn}
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editor.can().chain().focus().toggleItalic().run()}
          aria-label="ตัวเอียง"
        >
          <Italic className="h-4 w-4" />
        </button>
        <button
          type="button"
          className={btn}
          onClick={() => editor.chain().focus().toggleStrike().run()}
          aria-label="ขีดฆ่า"
        >
          <Strikethrough className="h-4 w-4" />
        </button>
        <span className="mx-1 w-px self-stretch bg-stone-200" aria-hidden />
        <button
          type="button"
          className={btn}
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          aria-label="หัวข้อระดับ 2"
        >
          <Heading2 className="h-4 w-4" />
        </button>
        <button
          type="button"
          className={btn}
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          aria-label="หัวข้อระดับ 3"
        >
          <Heading3 className="h-4 w-4" />
        </button>
        <span className="mx-1 w-px self-stretch bg-stone-200" aria-hidden />
        <button
          type="button"
          className={btn}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          aria-label="รายการจุด"
        >
          <List className="h-4 w-4" />
        </button>
        <button
          type="button"
          className={btn}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          aria-label="รายการเลข"
        >
          <ListOrdered className="h-4 w-4" />
        </button>
        <button
          type="button"
          className={btn}
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          aria-label="อ้างอิง"
        >
          <Quote className="h-4 w-4" />
        </button>
        <span className="mx-1 w-px self-stretch bg-stone-200" aria-hidden />
        <button
          type="button"
          className={btn}
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().chain().focus().undo().run()}
          aria-label="เลิกทำ"
        >
          <Undo2 className="h-4 w-4" />
        </button>
        <button
          type="button"
          className={btn}
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().chain().focus().redo().run()}
          aria-label="ทำซ้ำ"
        >
          <Redo2 className="h-4 w-4" />
        </button>
      </div>
      <EditorContent editor={editor} className="article-tiptap" />
    </div>
  );
}
