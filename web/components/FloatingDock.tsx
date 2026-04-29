"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { ChevronUp, MessageCircle, Phone } from "lucide-react";

/** แก้เป็น LINE OA จริงของร้าน */
const LINE_OA_URL = "https://line.me/R/ti/p/@LabelCraftStudio";
const PHONE_HREF = "tel:02-XXX-XXXX";
const PHONE_LABEL = "02-XXX-XXXX";

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-900/80 focus-visible:ring-offset-2";

const fabBase =
  "flex h-14 w-14 shrink-0 items-center justify-center rounded-full shadow-[0_8px_32px_-8px_rgba(0,0,0,0.35)] ring-2 ring-white/30 transition-transform hover:scale-105 active:scale-95";

export function FloatingDock() {
  const pathname = usePathname();
  const [showTop, setShowTop] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    queueMicrotask(() => setReduceMotion(mq.matches));
    const fn = () => setReduceMotion(mq.matches);
    mq.addEventListener("change", fn);
    return () => mq.removeEventListener("change", fn);
  }, []);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 280);
    queueMicrotask(onScroll);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: reduceMotion ? "auto" : "smooth",
    });
  };

  if (pathname.startsWith("/admin")) return null;

  return (
    <div className="floating-dock pointer-events-none fixed bottom-[calc(1.25rem+env(safe-area-inset-bottom,0px))] right-[calc(1.25rem+env(safe-area-inset-right,0px))] z-40 flex flex-col items-end gap-3 sm:bottom-[calc(1.5rem+env(safe-area-inset-bottom,0px))] sm:right-[calc(1.5rem+env(safe-area-inset-right,0px))]">
      <div className="pointer-events-auto flex flex-col items-end gap-3">
        {/* Back to top */}
        <button
          type="button"
          onClick={scrollTop}
          className={`flex h-11 w-11 items-center justify-center rounded-full border border-stone-200/90 bg-white text-stone-900 shadow-[0_4px_24px_-8px_rgba(0,0,0,0.2)] ring-1 ring-stone-200/60 transition-all duration-300 hover:bg-stone-900 hover:text-white ${focusRing} ${
            showTop
              ? "translate-y-0 opacity-100"
              : "pointer-events-none translate-y-2 opacity-0"
          }`}
          aria-label="กลับขึ้นด้านบน"
        >
          <ChevronUp className="h-5 w-5" strokeWidth={2} aria-hidden />
        </button>

        {/* ติดต่อเรา — ข้อความลอย + ปุ่ม LINE / โทร แยก */}
        <div className="flex flex-col items-end gap-2">
          <p className="contact-float-label select-none pr-0.5 text-right text-[13px] font-medium tracking-wide text-stone-600 drop-shadow-[0_1px_2px_rgba(255,255,255,0.9)]">
            ติดต่อเรา
          </p>
          <a
            href={LINE_OA_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={`${fabBase} border border-stone-200/90 bg-white text-stone-900 shadow-[0_8px_32px_-8px_rgba(0,0,0,0.12)] hover:bg-stone-50 hover:text-stone-900 ${focusRing}`}
            aria-label="แชท LINE"
          >
            <MessageCircle className="h-6 w-6" strokeWidth={2} aria-hidden />
          </a>
          <a
            href={PHONE_HREF}
            className={`${fabBase} bg-stone-900 text-white hover:bg-stone-800 ${focusRing}`}
            aria-label={`โทร ${PHONE_LABEL}`}
          >
            <Phone className="h-6 w-6" strokeWidth={2} aria-hidden />
          </a>
        </div>
      </div>
    </div>
  );
}
