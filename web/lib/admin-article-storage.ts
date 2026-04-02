import {
  MOCK_ARTICLE_CATEGORIES,
  MOCK_SEED_ARTICLES,
  type MockArticleRow,
} from "@/lib/mock-admin";

const STORAGE_KEY = "luxeprint_admin_articles_v1";

export type StoredAdminArticle = MockArticleRow & {
  excerpt: string;
  category: string;
  bodyHtml: string;
};

export function getInitialArticles(): StoredAdminArticle[] {
  return MOCK_SEED_ARTICLES.map((r) => ({
    ...r,
    excerpt: "",
    category: MOCK_ARTICLE_CATEGORIES[0],
    bodyHtml: "",
  }));
}

export function readStoredArticles(): StoredAdminArticle[] {
  if (typeof window === "undefined") return getInitialArticles();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      const initial = getInitialArticles();
      localStorage.setItem(STORAGE_KEY, JSON.stringify(initial));
      return initial;
    }
    const parsed = JSON.parse(raw) as StoredAdminArticle[];
    if (!Array.isArray(parsed)) {
      const initial = getInitialArticles();
      localStorage.setItem(STORAGE_KEY, JSON.stringify(initial));
      return initial;
    }
    return parsed;
  } catch {
    const initial = getInitialArticles();
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(initial));
    } catch {
      /* ignore */
    }
    return initial;
  }
}

export function writeStoredArticles(articles: StoredAdminArticle[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(articles));
}

export { STORAGE_KEY };
