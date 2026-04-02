/** ข้อมูลจำลองสำหรับแอดมิน — ยังไม่ต่อ API จริง */

import { mockArticles } from "@/lib/mock-articles";

export const MOCK_ARTICLE_CATEGORIES = [
  "เทคนิคงานพิมพ์",
  "ข่าวสาร",
  "แบรนด์ & ดีไซน์",
] as const;

export type MockArticleRow = {
  id: string;
  /** slug สำหรับลิงก์ไปหน้าบ้าน — ร่างอาจยังไม่มี */
  slug?: string;
  title: string;
  updatedAt: string;
  status: "draft" | "published";
  /** URL รูปปก (เดียวกับระบบหน้าบ้าน — ใช้ Unsplash หรือไฟล์ใน /public) */
  coverImageUrl?: string | null;
  coverImageAlt?: string | null;
};

const publishedFromSite: MockArticleRow[] = mockArticles.map((a) => ({
  id: a.slug,
  slug: a.slug,
  title: a.title,
  updatedAt: a.publishedAt,
  status: "published" as const,
  coverImageUrl: a.coverImageUrl,
  coverImageAlt: a.coverImageAlt,
}));

const draftOnly: MockArticleRow[] = [
  {
    id: "draft-seed-cmyk",
    title: "ความต่างระหว่าง CMYK กับ RGB ในงานพิมพ์",
    updatedAt: "2026-03-10",
    status: "draft",
    coverImageUrl: null,
    coverImageAlt: null,
  },
];

export const MOCK_SEED_ARTICLES: MockArticleRow[] = [
  ...publishedFromSite,
  ...draftOnly,
];

export const ADMIN_SESSION_KEY = "luxeprint_admin_mock_session";
