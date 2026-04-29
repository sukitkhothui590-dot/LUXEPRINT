"use client";

import Link from "next/link";
import { Pencil, Trash2 } from "lucide-react";
import { useAdminArticles } from "@/hooks/useAdminArticles";

export default function AdminArticlesDashboardPage() {
  const { articles, ready, remove, error } = useAdminArticles();

  const published = articles.filter((a) => a.status === "published").length;
  const drafts = articles.filter((a) => a.status === "draft").length;
  const total = articles.length;

  function confirmDelete(id: string, title: string) {
    if (
      typeof window !== "undefined" &&
      !window.confirm(`ลบบทความ "${title}" ? การกระทำนี้ไม่สามารถย้อนกลับได้`)
    ) {
      return;
    }
    remove(id);
  }

  if (!ready) {
    return (
      <div className="p-6 lg:p-10">
        <p className="text-sm text-stone-500">กำลังโหลดรายการ…</p>
      </div>
    );
  }

  return (
    <div className="p-6 lg:p-10">
      <div className="mb-10">
        <p className="mb-1 text-[11px] font-medium uppercase tracking-[0.2em] text-stone-400">
          บทความ
        </p>
        <h1 className="text-2xl font-medium text-stone-900">แดชบอร์ด</h1>
        <p className="mt-2 text-sm text-stone-500">
          ข้อมูลจาก Supabase — แก้ไขได้จากแดชบอร์ดนี้
        </p>
      </div>

      {error ? (
        <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
          {error}
        </div>
      ) : null}

      <div className="mb-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-lg border border-stone-200/90 bg-white p-5 shadow-sm">
          <p className="text-[11px] font-medium uppercase tracking-wider text-stone-400">
            ทั้งหมด
          </p>
          <p className="mt-2 text-3xl font-medium tabular-nums text-stone-900">
            {total}
          </p>
        </div>
        <div className="rounded-lg border border-stone-200/90 bg-white p-5 shadow-sm">
          <p className="text-[11px] font-medium uppercase tracking-wider text-stone-400">
            เผยแพร่แล้ว
          </p>
          <p className="mt-2 text-3xl font-medium tabular-nums text-emerald-700">
            {published}
          </p>
        </div>
        <div className="rounded-lg border border-stone-200/90 bg-white p-5 shadow-sm">
          <p className="text-[11px] font-medium uppercase tracking-wider text-stone-400">
            ร่าง
          </p>
          <p className="mt-2 text-3xl font-medium tabular-nums text-amber-700">
            {drafts}
          </p>
        </div>
      </div>

      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-lg font-medium text-stone-900">รายการบทความ</h2>
        <Link
          href="/admin/articles/new"
          className="inline-flex items-center justify-center rounded-lg border border-stone-900 bg-stone-900 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-stone-800"
        >
          + เพิ่มบทความใหม่
        </Link>
      </div>

      <div className="overflow-x-auto rounded-lg border border-stone-200/90 bg-white shadow-sm">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead>
            <tr className="border-b border-stone-200 bg-stone-50/80 text-[11px] font-medium uppercase tracking-wider text-stone-500">
              <th className="w-20 px-4 py-3">รูป</th>
              <th className="px-4 py-3">หัวข้อ</th>
              <th className="hidden px-4 py-3 sm:table-cell">อัปเดต</th>
              <th className="hidden px-4 py-3 text-right tabular-nums md:table-cell">
                เข้าชม
              </th>
              <th className="px-4 py-3">สถานะ</th>
              <th className="w-36 px-4 py-3 text-right">จัดการ</th>
            </tr>
          </thead>
          <tbody>
            {articles.map((row) => (
              <tr
                key={row.id}
                className="border-b border-stone-100 last:border-0 hover:bg-stone-50/50"
              >
                <td className="px-4 py-3">
                  {row.coverImageUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element -- data URL / URL ภายนอก
                    <img
                      src={row.coverImageUrl}
                      alt={row.coverImageAlt ?? ""}
                      className="h-11 w-16 rounded-md border border-stone-200/80 object-cover"
                    />
                  ) : (
                    <span className="inline-flex h-11 w-16 items-center justify-center rounded-md border border-dashed border-stone-200 bg-stone-50 text-[10px] text-stone-300">
                      —
                    </span>
                  )}
                </td>
                <td className="px-4 py-3 font-medium text-stone-800">
                  <div className="flex flex-col gap-1">
                    <span>{row.title}</span>
                    {row.slug ? (
                      <Link
                        href={`/articles/${row.slug}`}
                        className="w-fit text-[11px] font-normal text-stone-900 underline decoration-stone-300 underline-offset-2 hover:decoration-stone-900"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        ดูหน้าบ้าน
                      </Link>
                    ) : null}
                  </div>
                </td>
                <td className="hidden px-4 py-3 text-stone-500 sm:table-cell">
                  {row.updatedAt}
                </td>
                <td className="hidden px-4 py-3 text-right text-stone-600 tabular-nums md:table-cell">
                  {(row.viewCount ?? 0).toLocaleString("th-TH")}
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`inline-block rounded-md px-2 py-0.5 text-[11px] font-medium uppercase ${
                      row.status === "published"
                        ? "bg-emerald-50 text-emerald-800"
                        : "bg-amber-50 text-amber-800"
                    }`}
                  >
                    {row.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  <div className="flex flex-wrap items-center justify-end gap-2">
                    <Link
                      href={`/admin/articles/${encodeURIComponent(row.id)}/edit`}
                      className="inline-flex items-center gap-1 rounded-lg border border-stone-200 bg-white px-2.5 py-1.5 text-xs font-medium text-stone-800 transition-colors hover:bg-stone-50"
                    >
                      <Pencil className="h-3.5 w-3.5" aria-hidden />
                      แก้ไข
                    </Link>
                    <button
                      type="button"
                      onClick={() => confirmDelete(row.id, row.title)}
                      className="inline-flex items-center gap-1 rounded-lg border border-red-200 bg-white px-2.5 py-1.5 text-xs font-medium text-red-700 transition-colors hover:bg-red-50"
                    >
                      <Trash2 className="h-3.5 w-3.5" aria-hidden />
                      ลบ
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
