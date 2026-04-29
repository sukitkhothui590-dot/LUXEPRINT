"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";
import { createBrowserSupabaseClient } from "@/lib/supabase/client";
import { isSupabaseConfigured } from "@/lib/supabase/config";

function NoConfigScreen() {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center gap-4 bg-stone-100 px-6 text-center text-sm text-stone-600">
      <p>ยังไม่ได้ตั้งค่า Supabase (NEXT_PUBLIC_SUPABASE_URL / ANON_KEY)</p>
    </div>
  );
}

function AdminArticlesGateInner({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [state, setState] = useState<
    "loading" | "ok" | "no-auth" | "forbidden"
  >("loading");

  useEffect(() => {
    const supabase = createBrowserSupabaseClient();
    let cancelled = false;

    void (async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (cancelled) return;
      if (!session) {
        setState("no-auth");
        router.replace("/admin/login");
        return;
      }
      const { data, error } = await supabase
        .from("profiles")
        .select("is_admin")
        .eq("id", session.user.id)
        .maybeSingle();
      if (cancelled) return;
      if (error || !data?.is_admin) {
        setState("forbidden");
        return;
      }
      setState("ok");
    })();

    return () => {
      cancelled = true;
    };
  }, [router]);

  if (state === "loading") {
    return (
      <div className="flex min-h-dvh items-center justify-center bg-stone-100 text-sm text-stone-500">
        กำลังโหลด…
      </div>
    );
  }

  if (state === "forbidden") {
    return (
      <div className="flex min-h-dvh flex-col items-center justify-center gap-4 bg-stone-100 px-6 text-center">
        <p className="text-sm text-stone-700">
          บัญชีนี้ไม่มีสิทธิ์แอดมิน — ตั้งค่า{" "}
          <code className="rounded bg-stone-200 px-1">profiles.is_admin</code>{" "}
          ใน Supabase
        </p>
        <button
          type="button"
          onClick={async () => {
            const supabase = createBrowserSupabaseClient();
            await supabase.auth.signOut();
            router.replace("/admin/login");
            router.refresh();
          }}
          className="rounded-lg border border-stone-300 bg-white px-4 py-2 text-sm text-stone-800"
        >
          ออกจากระบบ
        </button>
      </div>
    );
  }

  if (state === "no-auth") {
    return (
      <div className="flex min-h-dvh items-center justify-center bg-stone-100 text-sm text-stone-500">
        กำลังไปหน้าเข้าสู่ระบบ…
      </div>
    );
  }

  return <>{children}</>;
}

export function AdminArticlesGate({ children }: { children: ReactNode }) {
  if (!isSupabaseConfigured()) {
    return <NoConfigScreen />;
  }
  return <AdminArticlesGateInner>{children}</AdminArticlesGateInner>;
}
