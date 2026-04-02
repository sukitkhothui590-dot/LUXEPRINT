"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { ADMIN_SESSION_KEY } from "@/lib/mock-admin";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("admin@luxeprint.local");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    if (!password.trim()) {
      setError("กรุณากรอกรหัสผ่าน (ตัวอย่าง: อะไรก็ได้)");
      return;
    }
    sessionStorage.setItem(ADMIN_SESSION_KEY, "1");
    router.push("/admin/articles");
    router.refresh();
  }

  return (
    <div className="flex min-h-[calc(100dvh-3.5rem)] flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-md rounded-lg border border-stone-200/90 bg-white p-8 shadow-[0_8px_40px_-16px_rgba(0,0,0,0.12)]">
        <p className="mb-2 text-center text-[11px] font-medium uppercase tracking-[0.22em] text-stone-400">
          LuxePrint
        </p>
        <h1 className="mb-8 text-center text-xl font-medium text-stone-900">
          เข้าสู่ระบบแอดมิน
        </h1>
        <p className="mb-6 rounded-lg bg-stone-50 px-3 py-2 text-center text-xs text-stone-500">
          โหมดจำลอง — กรอกรหัสผ่านอะไรก็ได้แล้วกดเข้าสู่ระบบ
        </p>
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
              placeholder="••••••••"
              className="w-full rounded-lg border border-stone-200 bg-white px-3 py-2.5 text-sm outline-none ring-stone-900/10 transition-shadow focus:border-stone-400 focus:ring-2"
            />
          </div>
          {error ? (
            <p className="text-sm text-red-600" role="alert">
              {error}
            </p>
          ) : null}
          <button
            type="submit"
            className="w-full rounded-lg border border-stone-900 bg-stone-900 py-3 text-sm font-semibold text-white transition-colors hover:bg-stone-800"
          >
            เข้าสู่ระบบ
          </button>
        </form>
        <p className="mt-8 text-center text-sm text-stone-500">
          <Link href="/" className="font-medium text-stone-700 underline-offset-2 hover:underline">
            ← กลับหน้าแรกเว็บไซต์
          </Link>
        </p>
      </div>
    </div>
  );
}
