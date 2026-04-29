"use client";

import { FormEvent, useState } from "react";
import { services } from "@/lib/services";
import { btnPrimaryClassName } from "@/components/PageBlocks";
import { createBrowserSupabaseClient } from "@/lib/supabase/client";
import { isSupabaseConfigured } from "@/lib/supabase/config";

export function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{
    type: "ok" | "err";
    text: string;
  } | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMessage(null);
    const form = e.currentTarget;
    const fd = new FormData(form);
    const name = String(fd.get("name") ?? "").trim();
    const phone = String(fd.get("phone") ?? "").trim();
    const email = String(fd.get("email") ?? "").trim();
    const service = String(fd.get("service") ?? "").trim();
    const msg = String(fd.get("message") ?? "").trim();

    if (!name) {
      setMessage({ type: "err", text: "กรุณากรอกชื่อ" });
      return;
    }
    if (!isSupabaseConfigured()) {
      setMessage({
        type: "err",
        text: "ระบบยังไม่ได้เชื่อมต่อ — ติดต่อทีมโดยตรงได้ทางโทรศัพท์หรืออีเมล",
      });
      return;
    }

    setLoading(true);
    try {
      const supabase = createBrowserSupabaseClient();
      const { error } = await supabase.from("contact_submissions").insert({
        name,
        phone: phone || null,
        email: email || null,
        service_slug: service || null,
        message: msg || null,
      });
      if (error) throw error;
      setMessage({ type: "ok", text: "ส่งข้อความแล้ว — เราจะติดต่อกลับโดยเร็วที่สุด" });
      form.reset();
    } catch (err) {
      setMessage({
        type: "err",
        text:
          err instanceof Error ? err.message : "ส่งไม่สำเร็จ กรุณาลองอีกครั้ง",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="space-y-8" onSubmit={(e) => void handleSubmit(e)}>
      {message ? (
        <p
          className={
            message.type === "ok"
              ? "rounded-lg bg-emerald-50 px-3 py-2 text-sm text-emerald-800"
              : "rounded-lg bg-red-50 px-3 py-2 text-sm text-red-800"
          }
          role={message.type === "err" ? "alert" : undefined}
        >
          {message.text}
        </p>
      ) : null}
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
        <div>
          <label className="mb-2 block text-[11px] font-medium uppercase tracking-[0.15em] text-stone-500">
            ชื่อ - นามสกุล
          </label>
          <input
            type="text"
            name="name"
            required
            className="w-full border-b border-stone-300 py-2 font-light placeholder-stone-300 transition-colors focus:border-stone-900 focus:outline-none"
            placeholder="Your Name"
            autoComplete="name"
          />
        </div>
        <div>
          <label className="mb-2 block text-[11px] font-medium uppercase tracking-[0.15em] text-stone-500">
            เบอร์โทรศัพท์
          </label>
          <input
            type="tel"
            name="phone"
            className="w-full border-b border-stone-300 py-2 font-light placeholder-stone-300 transition-colors focus:border-stone-900 focus:outline-none"
            placeholder="Your Phone"
            autoComplete="tel"
          />
        </div>
      </div>
      <div>
        <label className="mb-2 block text-[11px] font-medium uppercase tracking-[0.15em] text-stone-500">
          อีเมล
        </label>
        <input
          type="email"
          name="email"
          className="w-full border-b border-stone-300 py-2 font-light placeholder-stone-300 transition-colors focus:border-stone-900 focus:outline-none"
          placeholder="email@address.com"
          autoComplete="email"
        />
      </div>
      <div>
        <label className="mb-2 block text-[11px] font-medium uppercase tracking-[0.15em] text-stone-500">
          บริการที่สนใจ
        </label>
        <select
          name="service"
          className="w-full border-b border-stone-300 bg-transparent py-2 font-light transition-colors focus:border-stone-900 focus:outline-none"
          defaultValue=""
        >
          <option value="" disabled>
            เลือกบริการ...
          </option>
          {services.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="mb-2 block text-[11px] font-medium uppercase tracking-[0.15em] text-stone-500">
          รายละเอียดงาน / ขนาด / จำนวน
        </label>
        <textarea
          name="message"
          rows={4}
          className="w-full resize-none border-b border-stone-300 py-2 font-light placeholder-stone-300 transition-colors focus:border-stone-900 focus:outline-none"
          placeholder="Tell us about your project..."
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className={btnPrimaryClassName("w-full justify-center py-4 disabled:opacity-60")}
      >
        {loading ? "กำลังส่ง…" : "ส่งข้อความ"}
      </button>
    </form>
  );
}
