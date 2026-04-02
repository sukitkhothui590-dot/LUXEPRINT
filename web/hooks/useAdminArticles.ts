"use client";

import { useCallback, useEffect, useState } from "react";
import {
  readStoredArticles,
  writeStoredArticles,
  type StoredAdminArticle,
} from "@/lib/admin-article-storage";

export function useAdminArticles() {
  const [articles, setArticles] = useState<StoredAdminArticle[] | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setArticles(readStoredArticles());
    setReady(true);
  }, []);

  const persist = useCallback((next: StoredAdminArticle[]) => {
    setArticles(next);
    writeStoredArticles(next);
  }, []);

  const upsert = useCallback((article: StoredAdminArticle) => {
    setArticles((prev) => {
      if (!prev) {
        writeStoredArticles([article]);
        return [article];
      }
      const i = prev.findIndex((a) => a.id === article.id);
      const next =
        i >= 0
          ? [...prev.slice(0, i), article, ...prev.slice(i + 1)]
          : [article, ...prev];
      writeStoredArticles(next);
      return next;
    });
  }, []);

  const remove = useCallback((id: string) => {
    setArticles((prev) => {
      if (!prev) return prev;
      const next = prev.filter((a) => a.id !== id);
      writeStoredArticles(next);
      return next;
    });
  }, []);

  return {
    articles: articles ?? [],
    ready,
    upsert,
    remove,
    persist,
  };
}
