import {
  getArticleBySlug as getMockArticleBySlug,
  mockArticles,
  type Article as MockArticle,
} from "@/lib/mock-articles";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { createPublicSupabaseClient } from "@/lib/supabase/server-public";

export type PublicArticleListItem = {
  slug: string;
  title: string;
  excerpt: string;
  publishedAt: string;
  readTimeMin: number;
  coverImageUrl: string;
  coverImageAlt: string;
  viewCount: number;
};

export type PublicArticleDetail = PublicArticleListItem & {
  bodyHtml: string;
};

function mockToListItem(a: MockArticle): PublicArticleListItem {
  return {
    slug: a.slug,
    title: a.title,
    excerpt: a.excerpt,
    publishedAt: a.publishedAt,
    readTimeMin: a.readTimeMin,
    coverImageUrl: a.coverImageUrl,
    coverImageAlt: a.coverImageAlt,
    viewCount: 0,
  };
}

function mockToDetail(a: MockArticle): PublicArticleDetail {
  return {
    ...mockToListItem(a),
    bodyHtml: a.body.map((p) => `<p>${escapeHtml(p)}</p>`).join(""),
  };
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** ยังไม่รัน migration view_count — โหลดรายการเดิมแล้วใช้ 0 */
function isMissingViewCountColumn(e: {
  code?: string;
  message?: string;
}): boolean {
  return (
    e.code === "42703" ||
    /column .*view_count.* does not exist/i.test(e.message ?? "")
  );
}

export async function getPublishedArticlesList(): Promise<PublicArticleListItem[]> {
  if (!isSupabaseConfigured()) {
    return mockArticles.map(mockToListItem);
  }
  const supabase = createPublicSupabaseClient();
  const withViews = await supabase
    .from("articles")
    .select(
      "slug, title, excerpt, read_time_min, cover_image_url, cover_image_alt, published_at, view_count",
    )
    .eq("status", "published")
    .order("published_at", { ascending: false });

  const legacy =
    withViews.error && isMissingViewCountColumn(withViews.error)
      ? await supabase
          .from("articles")
          .select(
            "slug, title, excerpt, read_time_min, cover_image_url, cover_image_alt, published_at",
          )
          .eq("status", "published")
          .order("published_at", { ascending: false })
      : null;

  const res = legacy ?? withViews;
  if (res.error) throw res.error;
  const data = res.data ?? [];
  return data.map((row: Record<string, unknown>) => ({
    slug: row.slug as string,
    title: row.title as string,
    excerpt: row.excerpt as string,
    publishedAt: row.published_at
      ? String(row.published_at).slice(0, 10)
      : "",
    readTimeMin: (row.read_time_min as number) ?? 5,
    coverImageUrl: (row.cover_image_url as string) ?? "",
    coverImageAlt: (row.cover_image_alt as string) ?? "",
    viewCount: typeof row.view_count === "number" ? row.view_count : 0,
  }));
}

export async function getPublishedArticleDetail(
  slug: string,
): Promise<PublicArticleDetail | null> {
  if (!isSupabaseConfigured()) {
    const a = getMockArticleBySlug(slug);
    return a ? mockToDetail(a) : null;
  }
  const supabase = createPublicSupabaseClient();
  const withViews = await supabase
    .from("articles")
    .select(
      "slug, title, excerpt, body_html, read_time_min, cover_image_url, cover_image_alt, published_at, view_count",
    )
    .eq("slug", slug)
    .eq("status", "published")
    .maybeSingle();

  const legacy =
    withViews.error && isMissingViewCountColumn(withViews.error)
      ? await supabase
          .from("articles")
          .select(
            "slug, title, excerpt, body_html, read_time_min, cover_image_url, cover_image_alt, published_at",
          )
          .eq("slug", slug)
          .eq("status", "published")
          .maybeSingle()
      : null;

  const res = legacy ?? withViews;
  if (res.error) throw res.error;
  const data = res.data;
  if (!data) return null;
  const row = data as Record<string, unknown>;
  return {
    slug: row.slug as string,
    title: row.title as string,
    excerpt: row.excerpt as string,
    publishedAt: row.published_at
      ? String(row.published_at).slice(0, 10)
      : "",
    readTimeMin: (row.read_time_min as number) ?? 5,
    coverImageUrl: (row.cover_image_url as string) ?? "",
    coverImageAlt: (row.cover_image_alt as string) ?? "",
    bodyHtml: (row.body_html as string) ?? "",
    viewCount: typeof row.view_count === "number" ? row.view_count : 0,
  };
}

export async function getPublishedSlugs(): Promise<string[]> {
  if (!isSupabaseConfigured()) {
    return mockArticles.map((a) => a.slug);
  }
  const supabase = createPublicSupabaseClient();
  const { data, error } = await supabase
    .from("articles")
    .select("slug")
    .eq("status", "published");
  if (error) throw error;
  return (data ?? []).map((r) => r.slug);
}
