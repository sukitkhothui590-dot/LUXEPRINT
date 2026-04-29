"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import type { AuthError } from "@supabase/supabase-js";
import { FormEvent, useState } from "react";
import { createBrowserSupabaseClient } from "@/lib/supabase/client";
import { isSupabaseConfigured } from "@/lib/supabase/config";

const BRAND_NAME = "LabelCraft Studio";
const BRAND_LOGO_SRC = "/logo/5b637035-febf-4480-a0f2-49f2c6b49bb8.png";

function mapAuthError(e: AuthError): string {
  const raw = e.message.toLowerCase();
  const code = e.code?.toLowerCase() ?? "";

  if (
    code === "invalid_credentials" ||
    raw.includes("invalid login credentials") ||
    raw.includes("invalid_grant")
  ) {
    return "อีเมลหรือรหัสผ่านไม่ตรงกับบัญชีใน Supabase — ไปที่ Authentication → Users ตรวจอีเมล / กด Reset password";
  }
  if (code === "email_not_confirmed" || raw.includes("email not confirmed")) {
    return "ยังไม่ยืนยันอีเมล — Authentication → Providers → Email: ปิด \"Confirm email\" ชั่วคราว หรือกดลิงก์ในเมล";
  }
  return e.message;
}

export function AdminLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    if (!isSupabaseConfigured()) {
      setError("ยังไม่ได้ตั้งค่า Supabase ใน .env.local");
      return;
    }
    if (!email.trim() || !password) {
      setError("กรุณากรอกอีเมลและรหัสผ่าน");
      return;
    }
    setLoading(true);
    const supabase = createBrowserSupabaseClient();
    const next = searchParams.get("next") || "/admin/articles";
    void supabase.auth
      .signInWithPassword({ email: email.trim(), password })
      .then(({ error: e }) => {
        setLoading(false);
        if (e) {
          if (process.env.NODE_ENV === "development") {
            console.error("[Supabase signIn]", {
              message: e.message,
              status: e.status,
              code: e.code,
              name: e.name,
            });
          }
          setError(mapAuthError(e));
          return;
        }
        router.push(next);
        router.refresh();
      })
      .catch((err: unknown) => {
        setLoading(false);
        setError(
          err instanceof Error ? err.message : "เข้าสู่ระบบไม่สำเร็จ — ลองใหม่หรือตรวจ URL / anon key",
        );
      });
  }

  return (
    <div className="flex min-h-[calc(100dvh-3.5rem)] flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-md rounded-lg border border-stone-200/90 bg-white p-8 shadow-[0_8px_40px_-16px_rgba(0,0,0,0.12)]">
        <div className="mb-2 flex items-center justify-center gap-2">
          <Image
            src={BRAND_LOGO_SRC}
            alt={BRAND_NAME}
            width={24}
            height={24}
            className="h-6 w-6 rounded object-cover"
          />
          <p className="text-center text-[11px] font-medium uppercase tracking-[0.16em] text-stone-400">
            {BRAND_NAME}
          </p>
        </div>
        <h1 className="mb-8 text-center text-xl font-medium text-stone-900">
          เข้าสู่ระบบแอดมิน
        </h1>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="admin-email"
              className="mb-1.5 block text-sm font-medium text-stone-700"
            >
              อีเมล
            </label>
            <input
              id="admin-email"
              type="email"
              autoComplete="username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-stone-200 bg-white px-3 py-2.5 text-sm outline-none ring-stone-900/10 transition-shadow focus:border-stone-400 focus:ring-2"
            />
          </div>
          <div>
            <label
              htmlFor="admin-password"
              className="mb-1.5 block text-sm font-medium text-stone-700"
            >
              รหัสผ่าน
            </label>
            <input
              id="admin-password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-stone-200 bg-white px-3 py-2.5 text-sm outline-none ring-stone-900/10 transition-shadow focus:border-stone-400 focus:ring-2"
            />
          </div>
          {error ? (
            <p className="text-xs text-red-600" role="alert">
              {error}
            </p>
          ) : null}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg border border-stone-900 bg-stone-900 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-stone-800 disabled:opacity-60"
          >
            {loading ? "กำลังเข้าสู่ระบบ…" : "เข้าสู่ระบบ"}
          </button>
        </form>
        <p className="mt-8 text-center text-xs text-stone-400">
          <Link href="/" className="underline hover:text-stone-600">
            กลับหน้าแรก
          </Link>
        </p>
      </div>
    </div>
  );
}
