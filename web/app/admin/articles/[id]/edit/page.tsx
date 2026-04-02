"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { AdminArticleForm } from "@/components/admin/AdminArticleForm";
import { useAdminArticles } from "@/hooks/useAdminArticles";

export default function AdminEditArticlePage() {
  const params = useParams();
  const id = decodeURIComponent(params.id as string);
  const router = useRouter();
  const { articles, ready, upsert } = useAdminArticles();
  const article = articles.find((a) => a.id === id);

  useEffect(() => {
    if (!ready) return;
    if (!article) {
      router.replace("/admin/articles");
    }
  }, [ready, article, router]);

  if (!ready) {
    return (
      <div className="p-6 lg:p-10">
        <p className="text-sm text-stone-500">กำลังโหลด…</p>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="p-6 lg:p-10">
        <p className="text-sm text-stone-500">ไม่พบบทความ — กำลังกลับ…</p>
      </div>
    );
  }

  return (
    <div className="p-6 lg:p-10">
      <div className="mb-10">
        <p className="mb-1 text-[11px] font-medium uppercase tracking-[0.2em] text-stone-400">
          บทความ
        </p>
        <h1 className="text-2xl font-medium text-stone-900">แก้ไขบทความ</h1>
      </div>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_280px]">
        <AdminArticleForm
          mode="edit"
          initial={article}
          onSubmitSuccess={(updated) => {
            upsert(updated);
            router.push("/admin/articles");
          }}
        />

        <aside className="space-y-4">
          <div className="rounded-lg border border-stone-200/90 bg-white p-5 shadow-sm">
            <p className="text-xs text-stone-500">
              รหัสภายใน:{" "}
              <span className="font-mono text-stone-700">{article.id}</span>
            </p>
          </div>
          <Link
            href="/admin/articles"
            className="block rounded-lg border border-stone-200 bg-white px-4 py-3 text-center text-sm text-stone-600 transition-colors hover:bg-stone-50"
          >
            ← กลับแดชบอร์ด
          </Link>
        </aside>
      </div>
    </div>
  );
}
