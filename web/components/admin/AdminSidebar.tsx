"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FileText, LayoutDashboard, LogOut, PlusCircle } from "lucide-react";
import { ADMIN_SESSION_KEY } from "@/lib/mock-admin";

const focus =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-900/30 focus-visible:ring-offset-2";

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  function logout() {
    sessionStorage.removeItem(ADMIN_SESSION_KEY);
    router.push("/admin/login");
    router.refresh();
  }

  const item = (href: string, label: string, Icon: typeof LayoutDashboard) => {
    const active =
      href === "/admin/articles"
        ? pathname === "/admin/articles"
        : pathname === href;
    return (
      <Link
        href={href}
        className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${focus} ${
          active
            ? "bg-stone-900 text-white"
            : "text-stone-600 hover:bg-stone-100 hover:text-stone-900"
        }`}
      >
        <Icon className="h-4 w-4 shrink-0 opacity-90" aria-hidden />
        {label}
      </Link>
    );
  };

  return (
    <aside className="flex w-full min-h-0 flex-col border-b border-stone-200 bg-white md:sticky md:top-0 md:h-screen md:w-56 md:shrink-0 md:overflow-y-auto md:border-b-0 md:border-r">
      <div className="border-b border-stone-100 px-4 py-5">
        <Link
          href="/admin/articles"
          className={`block text-[11px] font-medium uppercase tracking-[0.2em] text-stone-400 ${focus} rounded-sm`}
        >
          LuxePrint
        </Link>
        <p className="mt-1 text-sm font-semibold text-stone-900">แอดมิน</p>
      </div>
      <nav className="flex flex-1 flex-col gap-1 p-3">
        {item("/admin/articles", "แดชบอร์ด", LayoutDashboard)}
        {item("/admin/articles/new", "เพิ่มบทความ", PlusCircle)}
      </nav>
      <div className="border-t border-stone-100 p-3">
        <Link
          href="/"
          className={`mb-2 flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-stone-500 transition-colors hover:bg-stone-50 hover:text-stone-900 ${focus}`}
        >
          <FileText className="h-4 w-4" aria-hidden />
          หน้าเว็บหน้าบ้าน
        </Link>
        <button
          type="button"
          onClick={logout}
          className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-stone-500 transition-colors hover:bg-red-50 hover:text-red-800 ${focus}`}
        >
          <LogOut className="h-4 w-4" aria-hidden />
          ออกจากระบบ
        </button>
      </div>
    </aside>
  );
}
