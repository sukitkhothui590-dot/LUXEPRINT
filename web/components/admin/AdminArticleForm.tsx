"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { ArticleBodyEditor } from "@/components/admin/ArticleBodyEditor";
import type { StoredAdminArticle } from "@/lib/article-types";
import { MOCK_ARTICLE_CATEGORIES } from "@/lib/mock-admin";
import { fileToResizedDataUrl } from "@/lib/resize-image";

type Props = {
  mode: "create" | "edit";
  initial: StoredAdminArticle | null;
  onSubmitSuccess: (article: StoredAdminArticle) => void | Promise<void>;
};
export function AdminArticleForm({ mode, initial, onSubmitSuccess }: Props) {
  /** id คงที่ต่อแบบฟอร์ม — ใช้อัปโหลดรูปในเนื้อหา + บันทึกครั้งแรก (โหมดสร้าง) */
  const [draftArticleId] = useState(() => crypto.randomUUID());
  const articleId = mode === "edit" && initial ? initial.id : draftArticleId;

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [category, setCategory] = useState<string>(MOCK_ARTICLE_CATEGORIES[0]);
  const [excerpt, setExcerpt] = useState("");
  const [coverImageAlt, setCoverImageAlt] = useState("");
  const [coverImageUrl, setCoverImageUrl] = useState<string | null>(null);
  const [body, setBody] = useState("");
  const [status, setStatus] = useState<"draft" | "published">("draft");
  const [editorKey, setEditorKey] = useState(0);
  const [message, setMessage] = useState("");
  const [submitError, setSubmitError] = useState("");
  const [uploadError, setUploadError] = useState("");
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!initial) return;
    setTitle(initial.title);
    setSlug(initial.slug ?? "");
    setCategory(initial.category || MOCK_ARTICLE_CATEGORIES[0]);
    setExcerpt(initial.excerpt);
    setCoverImageAlt(initial.coverImageAlt ?? "");
    setCoverImageUrl(initial.coverImageUrl ?? null);
    setBody(initial.bodyHtml);
    setStatus(initial.status);
    setEditorKey((k) => k + 1);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- reset เมื่อสลับบทความ (id)
  }, [initial?.id]);

  async function onPickFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadError("");
    setUploading(true);
    try {
      const dataUrl = await fileToResizedDataUrl(file);
      if (dataUrl.length > 2_000_000) {
        setUploadError("รูปใหญ่เกินไปหลังย่อ — ลองเลือกไฟล์รูปที่เล็กกว่า");
        setUploading(false);
        return;
      }
      setCoverImageUrl(dataUrl);
    } catch (err) {
      setUploadError(err instanceof Error ? err.message : "อัปโหลดไม่สำเร็จ");
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  }

  function clearCover() {
    setCoverImageUrl(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setMessage("");
    setSubmitError("");
    if (!title.trim()) {
      setMessage("กรุณากรอกหัวข้อ");
      return;
    }
    if (status === "published" && !slug.trim()) {
      setMessage("ถ้าเผยแพร่ กรุณากรอก Slug สำหรับ URL");
      return;
    }

    const id = articleId;

    const now = new Date().toISOString().slice(0, 10);
    const article: StoredAdminArticle = {
      id,
      slug: slug.trim() || undefined,
      title: title.trim(),
      excerpt: excerpt.trim(),
      category: category.trim(),
      bodyHtml: body,
      updatedAt: now,
      status,
      coverImageUrl: coverImageUrl?.trim() || null,
      coverImageAlt: coverImageAlt.trim() || null,
      publishedAt: initial?.publishedAt ?? null,
    };

    try {
      await onSubmitSuccess(article);
      if (mode === "edit") {
        setMessage("อัปเดตแล้ว");
      }
    } catch (err) {
      const code =
        err && typeof err === "object" && "code" in err
          ? String((err as { code: unknown }).code)
          : "";
      const msg =
        code === "23505"
          ? "Slug นี้ถูกใช้แล้ว — เปลี่ยน Slug"
          : err instanceof Error
            ? err.message
            : "บันทึกไม่สำเร็จ";
      setSubmitError(msg);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 rounded-lg border border-stone-200/90 bg-white p-6 shadow-sm"
    >
      <div>
        <label
          htmlFor="article-title"
          className="mb-1.5 block text-sm font-medium text-stone-700"
        >
          หัวข้อ
        </label>
        <input
          id="article-title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full rounded-lg border border-stone-200 px-3 py-2.5 text-sm outline-none focus:border-stone-400 focus:ring-2 focus:ring-stone-900/10"
          placeholder="เช่น เทคนิคเตรียมไฟล์ PDF สำหรับงานพิมพ์"
        />
      </div>
      <div>
        <label
          htmlFor="article-slug"
          className="mb-1.5 block text-sm font-medium text-stone-700"
        >
          Slug (URL)
        </label>
        <input
          id="article-slug"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          className="w-full rounded-lg border border-stone-200 px-3 py-2.5 font-mono text-sm outline-none focus:border-stone-400 focus:ring-2 focus:ring-stone-900/10"
          placeholder="tech-prepare-pdf"
        />
        <p className="mt-1 text-xs text-stone-500">
          ใช้เมื่อสถานะเผยแพร่ — ลิงก์ไป `/articles/[slug]`
        </p>
      </div>
      <div>
        <label
          htmlFor="article-status"
          className="mb-1.5 block text-sm font-medium text-stone-700"
        >
          สถานะ
        </label>
        <select
          id="article-status"
          value={status}
          onChange={(e) =>
            setStatus(e.target.value as "draft" | "published")
          }
          className="w-full rounded-lg border border-stone-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-stone-400 focus:ring-2 focus:ring-stone-900/10"
        >
          <option value="draft">ร่าง</option>
          <option value="published">เผยแพร่</option>
        </select>
      </div>
      <div>
        <label
          htmlFor="article-cat"
          className="mb-1.5 block text-sm font-medium text-stone-700"
        >
          หมวดหมู่
        </label>
        <select
          id="article-cat"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full rounded-lg border border-stone-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-stone-400 focus:ring-2 focus:ring-stone-900/10"
        >
          {MOCK_ARTICLE_CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label
          htmlFor="article-excerpt"
          className="mb-1.5 block text-sm font-medium text-stone-700"
        >
          คำโปรย (Excerpt)
        </label>
        <textarea
          id="article-excerpt"
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
          rows={3}
          className="w-full resize-y rounded-lg border border-stone-200 px-3 py-2.5 text-sm outline-none focus:border-stone-400 focus:ring-2 focus:ring-stone-900/10"
          placeholder="สรุปสั้นๆ สำหรับการ์ดบทความ"
        />
      </div>

      <div>
        <span className="mb-1.5 block text-sm font-medium text-stone-700">
          รูปปก
        </span>
        <p className="mb-2 text-xs text-stone-500">
          อัปโหลดจากเครื่อง — ย่อความกว้างไม่เกิน 1600px แล้วอัปโหลดไป Supabase
          Storage เมื่อบันทึก
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif"
            onChange={onPickFile}
            disabled={uploading}
            className="block w-full max-w-sm text-sm text-stone-600 file:mr-3 file:rounded-lg file:border-0 file:bg-stone-900 file:px-4 file:py-2 file:text-sm file:font-medium file:text-white hover:file:bg-stone-800"
          />
          {uploading ? (
            <span className="text-xs text-stone-500">กำลังประมวลผล…</span>
          ) : null}
        </div>
        {uploadError ? (
          <p className="mt-2 text-sm text-red-600">{uploadError}</p>
        ) : null}
        {coverImageUrl ? (
          <div className="mt-4 overflow-hidden rounded-lg border border-stone-200 bg-stone-50">
            <div className="flex items-center justify-between border-b border-stone-200 bg-white px-3 py-2">
              <span className="text-xs font-medium text-stone-500">
                ตัวอย่างรูปปก
              </span>
              <button
                type="button"
                onClick={clearCover}
                className="text-xs font-medium text-red-600 hover:underline"
              >
                ลบรูป
              </button>
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element -- data URL จากอัปโหลด */}
            <img
              src={coverImageUrl}
              alt={coverImageAlt.trim() || "preview"}
              className="max-h-56 w-full object-cover"
            />
          </div>
        ) : null}
      </div>

      <div>
        <label
          htmlFor="article-cover-alt"
          className="mb-1.5 block text-sm font-medium text-stone-700"
        >
          คำอธิบายรูป (alt) เพื่อการเข้าถึง
        </label>
        <input
          id="article-cover-alt"
          value={coverImageAlt}
          onChange={(e) => setCoverImageAlt(e.target.value)}
          className="w-full rounded-lg border border-stone-200 px-3 py-2.5 text-sm outline-none focus:border-stone-400 focus:ring-2 focus:ring-stone-900/10"
          placeholder="สั้นๆ อธิบายว่ารูปคืออะไร"
        />
      </div>

      <div>
        <span
          id="article-body-label"
          className="mb-1.5 block text-sm font-medium text-stone-700"
        >
          เนื้อหา
        </span>
        <p className="mb-2 text-xs text-stone-500">
          แก้ไขแบบ rich text — ตัวหนา หัวข้อ รายการ แทรกรูป ฯลฯ (รูปในเนื้อหาอัปโหลดไป Supabase)
        </p>
        <div aria-labelledby="article-body-label">
          <ArticleBodyEditor
            key={editorKey}
            articleId={articleId}
            value={body}
            onChange={setBody}
          />
        </div>
      </div>

      {submitError ? (
        <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-800">
          {submitError}
        </p>
      ) : null}
      {message ? (
        <p className="rounded-lg bg-emerald-50 px-3 py-2 text-sm text-emerald-800">
          {message}
        </p>
      ) : null}

      <div className="flex flex-wrap gap-3">
        <button
          type="submit"
          className="rounded-lg border border-stone-900 bg-stone-900 px-6 py-2.5 text-sm font-semibold text-white hover:bg-stone-800"
        >
          {mode === "create" ? "บันทึก" : "บันทึกการแก้ไข"}
        </button>
      </div>
    </form>
  );
}
