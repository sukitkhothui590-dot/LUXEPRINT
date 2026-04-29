"use client";

import { Eye } from "lucide-react";
import { useEffect, useState } from "react";
import { createBrowserSupabaseClient } from "@/lib/supabase/client";
import { isSupabaseConfigured } from "@/lib/supabase/config";

const storageKey = (slug: string) => `luxeprint_article_view_${slug}`;
const lockKey = (slug: string) => `luxeprint_article_view_lock_${slug}`;

type Props = {
  slug: string;
  initialCount: number;
  className?: string;
};

export function ArticleViewCounter({
  slug,
  initialCount,
  className = "",
}: Props) {
  const [count, setCount] = useState(initialCount);

  useEffect(() => {
    queueMicrotask(() => setCount(initialCount));
  }, [slug, initialCount]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const raw = sessionStorage.getItem(storageKey(slug));
    if (raw !== null) {
      const n = parseInt(raw, 10);
      if (!Number.isNaN(n)) queueMicrotask(() => setCount(n));
    }
  }, [slug]);

  useEffect(() => {
    if (!isSupabaseConfigured()) return;
    if (typeof window === "undefined") return;

    const key = storageKey(slug);
    const lock = lockKey(slug);

    if (sessionStorage.getItem(key) !== null) return;
    if (sessionStorage.getItem(lock) !== null) return;

    sessionStorage.setItem(lock, "1");

    let cancelled = false;
    const supabase = createBrowserSupabaseClient();
    void supabase
      .rpc("increment_article_views", { slug_param: slug })
      .then(({ error }) => {
        sessionStorage.removeItem(lock);
        if (cancelled || error) return;
        const next = initialCount + 1;
        sessionStorage.setItem(key, String(next));
        setCount(next);
      });

    return () => {
      cancelled = true;
    };
  }, [slug, initialCount]);

  return (
    <span
      className={`inline-flex items-center gap-1 tabular-nums ${className}`}
      title="จำนวนครั้งที่เปิดหน้านี้ (นับเมื่อโหลดหน้า)"
    >
      <Eye className="h-3.5 w-3.5 shrink-0" aria-hidden />
      <span className="sr-only">จำนวนการเข้าชม </span>
      {count.toLocaleString("th-TH")} ครั้ง
    </span>
  );
}
