"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FileText, LayoutDashboard, LogOut, PlusCircle } from "lucide-react";
import { createBrowserSupabaseClient } from "@/lib/supabase/client";
import { isSupabaseConfigured } from "@/lib/supabase/config";

const focus =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-900/30 focus-visible:ring-offset-2";
const BRAND_NAME = "LabelCraft Studio";
const BRAND_LOGO_SRC = "/logo/5b637035-febf-4480-a0f2-49f2c6b49bb8.png";

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  async function logout() {
    if (!isSupabaseConfigured()) {
      router.push("/admin/login");
      return;
    }
    const supabase = createBrowserSupabaseClient();
    await supabase.auth.signOut();
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
          className={`inline-flex items-center gap-2 rounded-sm text-[11px] font-medium tracking-[0.1em] text-stone-500 ${focus}`}
        >
          <Image
            src={BRAND_LOGO_SRC}
            alt={BRAND_NAME}
            width={20}
            height={20}
            className="h-5 w-5 rounded object-cover"
          />
          {BRAND_NAME}
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
          onClick={() => void logout()}
          className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-stone-500 transition-colors hover:bg-red-50 hover:text-red-800 ${focus}`}
        >
          <LogOut className="h-4 w-4" aria-hidden />
          ออกจากระบบ
        </button>
      </div>
    </aside>
  );
}
