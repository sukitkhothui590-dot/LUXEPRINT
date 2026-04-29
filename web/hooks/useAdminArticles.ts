"use client";

import { useCallback, useEffect, useState } from "react";
import type { StoredAdminArticle } from "@/lib/article-types";
import { estimateReadTimeMin } from "@/lib/read-time";
import { uploadCoverFromDataUrl } from "@/lib/storage-upload";
import { createBrowserSupabaseClient } from "@/lib/supabase/client";
import { isSupabaseConfigured } from "@/lib/supabase/config";

type ArticleRow = {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  body_html: string | null;
  category: string | null;
  status: "draft" | "published";
  cover_image_url: string | null;
  cover_image_alt: string | null;
  read_time_min: number | null;
  published_at: string | null;
  updated_at: string;
  view_count?: number | null;
};

function rowToStored(row: ArticleRow): StoredAdminArticle {
  return {
    id: row.id,
    slug: row.slug || undefined,
    title: row.title,
    excerpt: row.excerpt ?? "",
    category: row.category ?? "",
    bodyHtml: row.body_html ?? "",
    status: row.status,
    coverImageUrl: row.cover_image_url,
    coverImageAlt: row.cover_image_alt,
    updatedAt: String(row.updated_at).slice(0, 10),
    publishedAt: row.published_at,
    readTimeMin: row.read_time_min ?? undefined,
    viewCount: row.view_count ?? 0,
  };
}

function resolveSlug(article: StoredAdminArticle, id: string): string {
  const s = article.slug?.trim();
  if (s) return s;
  return `draft-${id.replace(/-/g, "").slice(0, 12)}`;
}

export function useAdminArticles() {
  const [articles, setArticles] = useState<StoredAdminArticle[]>([]);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    if (!isSupabaseConfigured()) {
      queueMicrotask(() => {
        setError("ยังไม่ได้ตั้งค่า NEXT_PUBLIC_SUPABASE_URL / ANON_KEY");
        setArticles([]);
        setReady(true);
      });
      return;
    }
    try {
      const supabase = createBrowserSupabaseClient();
      const { data, error: e } = await supabase
        .from("articles")
        .select("*")
        .order("updated_at", { ascending: false });
      if (e) {
        setError(e.message);
        setArticles([]);
      } else {
        setArticles((data as ArticleRow[]).map(rowToStored));
        setError(null);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "โหลดไม่สำเร็จ");
      setArticles([]);
    }
    setReady(true);
  }, []);

  useEffect(() => {
    queueMicrotask(() => {
      void load();
    });
  }, [load]);

  const upsert = useCallback(async (article: StoredAdminArticle) => {
    if (!isSupabaseConfigured()) {
      throw new Error("ยังไม่ได้ตั้งค่า Supabase");
    }
    const supabase = createBrowserSupabaseClient();
    const id = article.id;
    let coverUrl = article.coverImageUrl?.trim() || null;
    if (coverUrl?.startsWith("data:")) {
      coverUrl = await uploadCoverFromDataUrl(supabase, id, coverUrl);
    }
    const slug = resolveSlug(article, id);
    const readTime = estimateReadTimeMin(article.bodyHtml);
    const publishedAt =
      article.status === "published"
        ? (article.publishedAt ?? new Date().toISOString())
        : null;

    const payload = {
      id,
      slug,
      title: article.title.trim(),
      excerpt: article.excerpt.trim(),
      body_html: article.bodyHtml,
      category: article.category.trim(),
      status: article.status,
      cover_image_url: coverUrl,
      cover_image_alt: article.coverImageAlt?.trim() || null,
      read_time_min: readTime,
      published_at: publishedAt,
    };

    const { data, error: e } = await supabase
      .from("articles")
      .upsert(payload, { onConflict: "id" })
      .select()
      .single();

    if (e) throw e;
    const next = rowToStored(data as ArticleRow);
    setArticles((prev) => {
      const i = prev.findIndex((a) => a.id === id);
      if (i >= 0) {
        return [...prev.slice(0, i), next, ...prev.slice(i + 1)];
      }
      return [next, ...prev];
    });
  }, []);

  const remove = useCallback(async (id: string) => {
    const supabase = createBrowserSupabaseClient();
    const { error: e } = await supabase.from("articles").delete().eq("id", id);
    if (e) throw e;
    setArticles((prev) => prev.filter((a) => a.id !== id));
  }, []);

  return { articles, ready, error, upsert, remove, reload: load };
}
