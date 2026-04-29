"use client";

import TiptapImage from "@tiptap/extension-image";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import {
  Bold,
  Heading2,
  Heading3,
  ImageIcon,
  Italic,
  List,
  ListOrdered,
  Loader2,
  Quote,
  Redo2,
  Strikethrough,
  Undo2,
} from "lucide-react";
import { useCallback, useRef, useState } from "react";
import { fileToResizedDataUrl } from "@/lib/resize-image";
import { uploadBodyImageFromDataUrl } from "@/lib/storage-upload";
import { createBrowserSupabaseClient } from "@/lib/supabase/client";
import { isSupabaseConfigured } from "@/lib/supabase/config";

const btn =
  "inline-flex h-8 w-8 items-center justify-center rounded-md text-stone-600 transition-colors hover:bg-stone-200/80 hover:text-stone-900 disabled:opacity-40 disabled:hover:bg-transparent";

type Props = {
  value: string;
  onChange: (html: string) => void;
  /** ใช้เป็นพาธอัปโหลดรูปในเนื้อหา — ต้องคงที่ต่อบทความ */
  articleId: string;
};

export function ArticleBodyEditor({ value, onChange, articleId }: Props) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [imgBusy, setImgBusy] = useState(false);
  const [imgErr, setImgErr] = useState("");

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [2, 3] },
      }),
      TiptapImage.configure({
        inline: false,
        allowBase64: false,
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

  const onPickBodyImage = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file || !editor) return;
      setImgErr("");
      if (!isSupabaseConfigured()) {
        setImgErr("ยังไม่ได้ตั้งค่า Supabase — อัปโหลดรูปในเนื้อหาไม่ได้");
        e.target.value = "";
        return;
      }
      setImgBusy(true);
      try {
        const dataUrl = await fileToResizedDataUrl(file, 1400, 0.82);
        if (dataUrl.length > 2_500_000) {
          setImgErr("รูปใหญ่เกินไปหลังย่อ — ลองไฟล์เล็กลง");
          return;
        }
        const supabase = createBrowserSupabaseClient();
        const url = await uploadBodyImageFromDataUrl(
          supabase,
          articleId,
          dataUrl,
        );
        editor.chain().focus().setImage({ src: url, alt: "" }).run();
      } catch (err) {
        setImgErr(
          err instanceof Error ? err.message : "อัปโหลดรูปในเนื้อหาไม่สำเร็จ",
        );
      } finally {
        setImgBusy(false);
        e.target.value = "";
      }
    },
    [articleId, editor],
  );

  if (!editor) {
    return (
      <div className="min-h-[320px] animate-pulse rounded-lg border border-stone-200 bg-stone-50" />
    );
  }

  return (
    <div className="overflow-hidden rounded-lg border border-stone-200 bg-white focus-within:border-stone-400 focus-within:ring-2 focus-within:ring-stone-900/10">
      <input
        ref={fileRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        className="sr-only"
        aria-hidden
        onChange={onPickBodyImage}
      />
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
          onClick={() => fileRef.current?.click()}
          disabled={imgBusy}
          aria-label="แทรกรูป"
          title="แทรกรูปจากเครื่อง (อัปโหลด Supabase)"
        >
          {imgBusy ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <ImageIcon className="h-4 w-4" />
          )}
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
      {imgErr ? (
        <p className="border-b border-red-100 bg-red-50/90 px-3 py-1.5 text-xs text-red-700">
          {imgErr}
        </p>
      ) : null}
      <EditorContent editor={editor} className="article-tiptap" />
    </div>
  );
}
