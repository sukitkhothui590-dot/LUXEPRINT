"use client";

import { FormEvent } from "react";
import { services } from "@/lib/services";
import { btnPrimaryClassName } from "@/components/PageBlocks";

export function ContactForm() {
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
  }

  return (
    <form className="space-y-8" onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
        <div>
          <label className="mb-2 block text-[11px] font-medium uppercase tracking-[0.15em] text-stone-500">
            ชื่อ - นามสกุล
          </label>
          <input
            type="text"
            name="name"
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
        className={btnPrimaryClassName("w-full justify-center py-4")}
      >
        ส่งข้อความ
      </button>
    </form>
  );
}
