"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import {
  ChevronDown,
  Menu,
  MessageCircle,
  Phone,
  X,
} from "lucide-react";
import { services } from "@/lib/services";

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-900/80 focus-visible:ring-offset-2 focus-visible:ring-offset-stone-100 rounded-sm";

function navLinkClass(active: boolean) {
  const base = `relative inline-flex items-center gap-0.5 py-8 text-[13px] tracking-wide transition-colors ${focusRing}`;
  return active
    ? `${base} font-medium text-stone-900 underline decoration-stone-900 decoration-2 underline-offset-[10px]`
    : `${base} text-stone-500 hover:text-stone-900`;
}

export function SiteNav() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const isHome = pathname === "/";
  const isArticles =
    pathname === "/articles" || pathname.startsWith("/articles/");
  const isAbout = pathname === "/about";
  const isServices = pathname.startsWith("/services");
  const isContact = pathname === "/contact";
  const isAdmin = pathname.startsWith("/admin");

  const setScroll = useCallback(() => {
    setScrolled(window.scrollY > 8);
  }, []);

  useEffect(() => {
    setScroll();
    window.addEventListener("scroll", setScroll, { passive: true });
    return () => window.removeEventListener("scroll", setScroll);
  }, [setScroll]);

  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mobileOpen]);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const solidBar = scrolled || mobileOpen;
  const navShell = solidBar
    ? "border-b border-stone-200/90 bg-white/95 shadow-[0_1px_0_0_rgba(0,0,0,0.04),0_8px_24px_-12px_rgba(0,0,0,0.1)] backdrop-blur-md"
    : isHome && !mobileOpen
      ? "border-b border-stone-200/30 bg-stone-100/35 backdrop-blur-md"
      : "border-b border-stone-200/70 bg-stone-100/90 backdrop-blur-md";

  const desktopLinks = (
    <>
      <Link href="/" className={navLinkClass(isHome)}>
        หน้าแรก
      </Link>
      <Link href="/articles" className={navLinkClass(isArticles)}>
        บทความ
      </Link>
      <Link href="/about" className={navLinkClass(isAbout)}>
        เกี่ยวกับเรา
      </Link>
      <div className="group relative">
        <Link
          href="/services"
          className={`${navLinkClass(isServices)} inline-flex items-center gap-0.5`}
        >
          บริการ
          <ChevronDown className="h-3.5 w-3.5 opacity-60" aria-hidden />
        </Link>
        <div className="pointer-events-none absolute left-1/2 top-full z-50 w-56 -translate-x-1/2 pt-1 opacity-0 transition-opacity duration-200 ease-out group-hover:pointer-events-auto group-hover:opacity-100">
          <div className="translate-y-1 rounded-lg border border-stone-200/80 bg-white/95 shadow-[0_16px_48px_-12px_rgba(0,0,0,0.15)] backdrop-blur-sm transition-transform duration-200 ease-out group-hover:translate-y-0">
            <div className="py-2">
              {services.map((s) => (
                <Link
                  key={s.id}
                  href={`/services/${s.id}`}
                  className={`block w-full px-5 py-2.5 text-left text-[13px] text-stone-600 transition-colors hover:bg-stone-50 hover:text-stone-900 ${focusRing}`}
                >
                  {s.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Link href="/contact" className={navLinkClass(isContact)}>
        ติดต่อเรา
      </Link>
    </>
  );

  const mobileLinkClass = (active: boolean) =>
    `rounded-lg px-3 py-3 text-base transition-colors ${focusRing} ${
      active
        ? "font-medium text-stone-900 ring-1 ring-stone-300/80 bg-white/80"
        : "text-stone-800 hover:bg-white/60"
    }`;

  if (isAdmin) return null;

  return (
    <nav
      className={`fixed top-0 z-50 w-full transition-[background-color,box-shadow,border-color] duration-300 ${navShell}`}
    >
      {/* กรอบ 5vw หน้าแรก — แสดงแม้เลื่อนแล้ว ซ่อนเฉพาะตอนเปิดเมนูมือถือ */}
      {isHome && !mobileOpen ? (
        <div
          className="pointer-events-none absolute inset-x-0 top-0 z-[5] hidden h-20 md:block"
          aria-hidden
        >
          <div className="absolute bottom-0 left-[5vw] right-[5vw] h-px bg-stone-400/45" />
          <div className="absolute bottom-0 left-[5vw] top-0 w-px bg-stone-400/45" />
          <div className="absolute bottom-0 right-[5vw] top-0 w-px bg-stone-400/45" />
          <div
            className="absolute size-[7px] rotate-45 border border-stone-500/55 bg-stone-100/85 backdrop-blur-[2px]"
            style={{
              left: "calc(5vw - 3.5px)",
              bottom: "calc(-3.5px)",
            }}
          />
          <div
            className="absolute size-[7px] rotate-45 border border-stone-500/55 bg-stone-100/85 backdrop-blur-[2px]"
            style={{
              right: "calc(5vw - 3.5px)",
              bottom: "calc(-3.5px)",
            }}
          />
        </div>
      ) : null}

      <div className="relative z-50 mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className={`relative z-20 shrink-0 transition-opacity duration-300 hover:opacity-90 ${focusRing}`}
        >
          <span className="inline-block text-xl font-semibold uppercase tracking-[0.18em] text-stone-900 transition-[letter-spacing] duration-300 ease-out hover:tracking-[0.2em] md:text-[1.35rem]">
            LuxePrint
          </span>
        </Link>

        <div className="absolute left-1/2 z-10 hidden -translate-x-1/2 md:flex md:items-center md:gap-9 lg:gap-10">
          {desktopLinks}
        </div>

        <div className="relative z-20 flex items-center gap-2 md:gap-2.5">
          <a
            href="#"
            className={`hidden items-center rounded-lg bg-white px-4 py-2 text-[12px] font-medium text-stone-800 shadow-sm ring-1 ring-stone-200/90 transition-all hover:bg-stone-900 hover:text-white hover:ring-stone-900 lg:inline-flex ${focusRing}`}
          >
            <MessageCircle className="mr-1.5 h-3.5 w-3.5" aria-hidden />
            LINE
          </a>
          <a
            href="tel:02-XXX-XXXX"
            className={`hidden items-center rounded-lg bg-stone-900 px-4 py-2 text-[12px] font-medium text-white transition-all hover:bg-stone-950 hover:ring-2 hover:ring-stone-400/40 sm:inline-flex ${focusRing}`}
          >
            <Phone className="mr-1.5 h-3.5 w-3.5" aria-hidden />
            โทรหาเรา
          </a>
          <button
            type="button"
            onClick={() => setMobileOpen((o) => !o)}
            className={`p-2 text-stone-900 md:hidden ${focusRing}`}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? "ปิดเมนู" : "เปิดเมนู"}
          >
            {mobileOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {mobileOpen ? (
        <>
          <button
            type="button"
            className="fixed inset-0 z-40 bg-black/25 backdrop-blur-[1px] transition-opacity md:hidden"
            aria-label="ปิดเมนู"
            onClick={() => setMobileOpen(false)}
          />
          <aside
            className="nav-drawer-panel fixed bottom-0 right-0 top-20 z-50 flex w-full max-w-sm flex-col overflow-y-auto border-l border-stone-200/80 bg-stone-100 shadow-2xl md:hidden"
          >
            <div className="flex flex-col space-y-1 px-4 py-6">
              <Link
                href="/"
                className={mobileLinkClass(isHome)}
                onClick={() => setMobileOpen(false)}
              >
                หน้าแรก
              </Link>
              <Link
                href="/articles"
                className={mobileLinkClass(isArticles)}
                onClick={() => setMobileOpen(false)}
              >
                บทความ
              </Link>
              <Link
                href="/about"
                className={mobileLinkClass(isAbout)}
                onClick={() => setMobileOpen(false)}
              >
                เกี่ยวกับเรา
              </Link>
              <Link
                href="/services"
                className={mobileLinkClass(isServices)}
                onClick={() => setMobileOpen(false)}
              >
                บริการทั้งหมด
              </Link>
              <div className="border-t border-stone-200/80 pt-3">
                <div className="mb-2 px-3 text-[11px] font-medium uppercase tracking-[0.22em] text-stone-400">
                  บริการย่อย
                </div>
                {services.map((s) => (
                  <Link
                    key={s.id}
                    href={`/services/${s.id}`}
                    className={`block rounded-lg py-2 pl-5 text-[15px] text-stone-600 transition-colors hover:bg-white/60 hover:text-stone-900 ${focusRing}`}
                    onClick={() => setMobileOpen(false)}
                  >
                    {s.name}
                  </Link>
                ))}
              </div>
              <Link
                href="/contact"
                className={mobileLinkClass(isContact)}
                onClick={() => setMobileOpen(false)}
              >
                ติดต่อเรา
              </Link>
              <div className="flex flex-col gap-2 pt-4">
                <a
                  href="#"
                  className={`flex w-full items-center justify-center rounded-lg bg-white py-3 text-sm font-medium text-stone-800 ring-1 ring-stone-200 transition-all hover:bg-stone-900 hover:text-white hover:ring-stone-900 ${focusRing}`}
                >
                  <MessageCircle className="mr-2 h-4 w-4" aria-hidden />
                  LINE OA
                </a>
                <a
                  href="tel:02-XXX-XXXX"
                  className={`flex w-full items-center justify-center rounded-lg bg-stone-900 py-3 text-sm font-medium text-white transition-all hover:bg-stone-950 hover:ring-2 hover:ring-stone-400/40 ${focusRing}`}
                >
                  <Phone className="mr-2 h-4 w-4" aria-hidden />
                  02-XXX-XXXX
                </a>
              </div>
            </div>
          </aside>
        </>
      ) : null}
    </nav>
  );
}
