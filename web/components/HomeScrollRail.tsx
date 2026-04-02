"use client";

import { useEffect, useMemo, useState } from "react";

const SECTIONS = [
  { id: "section-hero", labelTh: "บทนำ", labelEn: "Intro" },
  { id: "section-philosophy", labelTh: "ปรัชญา", labelEn: "Philosophy" },
  { id: "section-expertise", labelTh: "ความเชี่ยวชาญ", labelEn: "Expertise" },
  { id: "section-services", labelTh: "บริการ", labelEn: "Services" },
  { id: "section-featured", labelTh: "ผลงาน", labelEn: "Featured" },
  { id: "section-clients", labelTh: "ลูกค้า", labelEn: "Clients" },
] as const;

function activeSectionFromScroll(): string {
  const probe = window.scrollY + window.innerHeight * 0.28;
  for (let i = SECTIONS.length - 1; i >= 0; i--) {
    const el = document.getElementById(SECTIONS[i].id);
    if (!el) continue;
    const top = el.getBoundingClientRect().top + window.scrollY;
    if (probe >= top - 1) return SECTIONS[i].id;
  }
  return SECTIONS[0].id;
}

export function HomeScrollRail() {
  const [activeId, setActiveId] = useState<string>(SECTIONS[0].id);
  const [progress, setProgress] = useState(0);

  const active = useMemo(
    () => SECTIONS.find((s) => s.id === activeId) ?? SECTIONS[0],
    [activeId],
  );

  useEffect(() => {
    const tick = () => {
      setActiveId(activeSectionFromScroll());
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0);
    };
    tick();
    window.addEventListener("scroll", tick, { passive: true });
    window.addEventListener("resize", tick, { passive: true });
    return () => {
      window.removeEventListener("scroll", tick);
      window.removeEventListener("resize", tick);
    };
  }, []);

  return (
    <div
      className="pointer-events-none fixed right-4 top-1/2 z-40 hidden -translate-y-1/2 lg:block lg:right-6"
      aria-live="polite"
      aria-atomic="true"
    >
      <div className="flex items-center gap-3">
        <div className="rounded-2xl border border-stone-200/70 bg-white/75 px-3 py-2.5 text-right shadow-[0_2px_20px_-8px_rgba(0,0,0,0.12)] backdrop-blur-md">
          <p className="text-[9px] font-medium uppercase tracking-[0.28em] text-stone-400">
            ตอนนี้
          </p>
          <p
            key={active.id}
            className="mt-0.5 max-w-[9rem] text-sm font-medium leading-snug text-stone-900 transition-opacity duration-300"
          >
            {active.labelTh}
          </p>
          <p className="mt-0.5 text-[10px] font-medium uppercase tracking-[0.22em] text-stone-400">
            {active.labelEn}
          </p>
        </div>

        <div
          className="relative h-40 w-[3px] overflow-hidden rounded-full bg-stone-200/90 ring-1 ring-stone-300/50"
          aria-hidden
        >
          <div
            className="absolute bottom-0 left-0 w-full rounded-full bg-gradient-to-t from-black via-stone-800 to-stone-500 transition-[height] duration-150 ease-out"
            style={{ height: `${progress * 100}%` }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/25 to-transparent opacity-40" />
        </div>
      </div>
    </div>
  );
}
