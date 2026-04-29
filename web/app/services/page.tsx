import Link from "next/link";
import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { services } from "@/lib/services";
import { getServiceIcon } from "@/lib/service-icons";

export const metadata: Metadata = {
  title: "บริการของเรา | LabelCraft Studio",
  description:
    "บริการพิมพ์ครบวงจร — สติ๊กเกอร์ นามบัตร กล่อง ไวนิล UV และอื่นๆ พร้อมรายละเอียดและราคาเริ่มต้น",
};

export default function ServicesIndexPage() {
  return (
    <div className="bg-white">
      <div className="relative border-b border-stone-100">
        <div
          className="pointer-events-none absolute inset-0 hero-bg-grid opacity-50"
          aria-hidden
        />
        <div className="relative mx-auto max-w-6xl px-4 pb-16 pt-24 sm:px-6 md:pb-20 md:pt-28 lg:px-8">
          <p className="mb-4 text-[11px] font-medium uppercase tracking-[0.22em] text-stone-400">
            Services
          </p>
          <h1 className="max-w-2xl break-words text-4xl font-light leading-tight tracking-tight text-stone-900 md:text-5xl">
            บริการทั้งหมด
          </h1>
          <p className="mt-6 max-w-xl text-base font-light leading-relaxed text-stone-500 md:text-lg">
            เลือกบริการเพื่อดูรายละเอียด ขั้นตอน การเตรียมไฟล์ และราคาเริ่มต้น
          </p>
          <div className="mt-10 h-px w-12 bg-stone-900" aria-hidden />
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <ul className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-stone-100 bg-stone-100 sm:grid-cols-2">
          {services.map((s, i) => {
            const Icon = getServiceIcon(s.id);
            return (
            <li key={s.id} className="bg-white">
              <Link
                href={`/services/${s.id}`}
                className="group flex h-full flex-col justify-between p-8 transition-colors hover:bg-stone-50/80 md:p-10"
              >
                <div>
                  <div className="flex items-start justify-between gap-4">
                    <span className="font-mono text-xs tabular-nums text-stone-300 transition-colors group-hover:text-stone-500">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-stone-200/90 bg-stone-50 text-stone-700 transition-all duration-300 group-hover:border-stone-300 group-hover:bg-stone-900 group-hover:text-white md:h-14 md:w-14"
                      aria-hidden
                    >
                      <Icon className="h-6 w-6 md:h-7 md:w-7" strokeWidth={1.35} />
                    </span>
                  </div>
                  <h2 className="mt-5 break-words text-xl font-medium tracking-tight text-stone-900 md:text-2xl">
                    {s.name}
                  </h2>
                  <p className="mt-3 text-sm font-light leading-relaxed text-stone-500">
                    {s.desc}
                  </p>
                </div>
                <span className="mt-10 inline-flex items-center gap-2 text-sm font-medium text-stone-900">
                  รายละเอียด
                  <ArrowUpRight
                    className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    aria-hidden
                  />
                </span>
              </Link>
            </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
