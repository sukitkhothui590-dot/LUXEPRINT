"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { AdminArticleForm } from "@/components/admin/AdminArticleForm";
import { useAdminArticles } from "@/hooks/useAdminArticles";

export default function AdminNewArticlePage() {
  const router = useRouter();
  const { upsert } = useAdminArticles();

  return (
    <div className="p-6 lg:p-10">
      <div className="mb-10">
        <p className="mb-1 text-[11px] font-medium uppercase tracking-[0.2em] text-stone-400">
          บทความ
        </p>
        <h1 className="text-2xl font-medium text-stone-900">เพิ่มบทความ</h1>
      </div>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_280px]">
        <AdminArticleForm
          mode="create"
          initial={null}
          onSubmitSuccess={(article) => {
            upsert(article);
            router.push("/admin/articles");
          }}
        />

        <aside className="space-y-4">
          <div className="rounded-lg border border-stone-200/90 bg-white p-5 shadow-sm">
            <h2 className="mb-2 text-sm font-medium text-stone-900">หมายเหตุ</h2>
            <p className="text-xs leading-relaxed text-stone-500">
              รูปปกจะถูกย่อและเก็บเป็น JPEG ในเครื่องของคุณ ขนาด localStorage
              จำกัด — ถ้าบันทึกไม่สำเร็จให้ลองรูปเล็กลง
            </p>
          </div>
          <Link
            href="/admin/articles"
            className="block rounded-lg border border-stone-200 bg-white px-4 py-3 text-center text-sm text-stone-600 transition-colors hover:bg-stone-50"
          >
            ← กลับแดชบอร์ด
          </Link>
          <Link
            href="/articles"
            className="block rounded-lg border border-stone-200 bg-white px-4 py-3 text-center text-sm text-stone-600 transition-colors hover:bg-stone-50"
            target="_blank"
            rel="noopener noreferrer"
          >
            ดูหน้าบทความ (เว็บหน้าบ้าน)
          </Link>
        </aside>
      </div>
    </div>
  );
}
