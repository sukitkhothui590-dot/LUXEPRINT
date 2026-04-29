"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MapPin, MessageCircle, Phone } from "lucide-react";
import { services } from "@/lib/services";

const popularIds = ["sticker", "box", "uv", "card"] as const;
const BRAND_NAME = "LabelCraft Studio";
const BRAND_LOGO_SRC = "/logo/5b637035-febf-4480-a0f2-49f2c6b49bb8.png";

export function SiteFooter() {
  const pathname = usePathname();
  if (pathname.startsWith("/admin")) return null;

  const popular = popularIds
    .map((id) => services.find((s) => s.id === id))
    .filter(Boolean) as typeof services;

  return (
    <footer className="border-t border-stone-700/30 bg-stone-900 pt-28 pb-12 text-stone-300 md:pt-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 grid grid-cols-1 gap-12 md:grid-cols-4">
          <div className="md:col-span-1">
            <Link href="/" className="mb-6 inline-flex items-center gap-3">
              <Image
                src={BRAND_LOGO_SRC}
                alt={BRAND_NAME}
                width={40}
                height={40}
                className="h-11 w-11 rounded-md border border-white/35 bg-white p-1 object-contain shadow-[0_0_0_1px_rgba(255,255,255,0.08)]"
              />
              <span className="cursor-pointer text-lg font-semibold tracking-[0.08em] text-white">
                {BRAND_NAME}
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-stone-300">
              โรงพิมพ์อิงค์เจ็ทระดับพรีเมียม ส่งมอบงานพิมพ์คุณภาพสูงที่สะท้อนภาพลักษณ์ความสำเร็จของแบรนด์คุณ
            </p>
          </div>
          <div>
            <p className="mb-6 text-[11px] font-medium uppercase tracking-[0.22em] text-stone-400">
              เมนูหลัก
            </p>
            <ul className="space-y-3 text-sm text-stone-300">
              <li>
                <Link
                  href="/"
                  className="transition-colors hover:text-white"
                >
                  หน้าแรก
                </Link>
              </li>
              <li>
                <Link
                  href="/articles"
                  className="transition-colors hover:text-white"
                >
                  บทความ
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="transition-colors hover:text-white"
                >
                  เกี่ยวกับเรา
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="transition-colors hover:text-white"
                >
                  บริการ
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="transition-colors hover:text-white"
                >
                  ติดต่อเรา
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <p className="mb-6 text-[11px] font-medium uppercase tracking-[0.22em] text-stone-400">
              บริการยอดนิยม
            </p>
            <ul className="space-y-3 text-sm text-stone-300">
              {popular.map((s) => (
                <li key={s.id}>
                  <Link
                    href={`/services/${s.id}`}
                    className="transition-colors hover:text-white"
                  >
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="mb-6 text-[11px] font-medium uppercase tracking-[0.22em] text-stone-400">
              ติดต่อ
            </p>
            <ul className="space-y-3 text-sm text-stone-300">
              <li className="flex items-start">
                <MapPin
                  className="mr-2 mt-0.5 h-4 w-4 shrink-0 text-stone-500"
                  aria-hidden
                />
                <span className="min-w-0 break-words">
                  123 ถนนสุขุมวิท กรุงเทพมหานคร 10110
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="mr-2 h-4 w-4 text-stone-500" aria-hidden />
                02-XXX-XXXX
              </li>
              <li className="flex items-center">
                <MessageCircle
                  className="mr-2 h-4 w-4 text-stone-500"
                  aria-hidden
                />
                @LabelCraftStudio
              </li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col items-center justify-between border-t border-stone-700/40 pt-8 md:flex-row">
          <p className="text-xs text-stone-400">
            © 2026 LabelCraft Studio. All rights reserved.
          </p>
          <div className="mt-4 flex space-x-4 text-xs text-stone-400 md:mt-0">
            <a href="#" className="transition-colors hover:text-white">
              Privacy Policy
            </a>
            <a href="#" className="transition-colors hover:text-white">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
