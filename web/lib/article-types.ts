export type StoredAdminArticle = {
  id: string;
  slug?: string;
  title: string;
  updatedAt: string;
  status: "draft" | "published";
  coverImageUrl?: string | null;
  coverImageAlt?: string | null;
  excerpt: string;
  category: string;
  bodyHtml: string;
  /** ISO datetime — เมื่อเผยแพร่ */
  publishedAt?: string | null;
  readTimeMin?: number;
  /** จำนวนเข้าชม (จากฐานข้อมูล) */
  viewCount?: number;
};
