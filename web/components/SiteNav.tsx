"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { ChevronDown, MessageCircle, Phone } from "lucide-react";
import { services } from "@/lib/services";

const LINE_OA_URL = "https://line.me/R/ti/p/@LabelCraftStudio";
const PHONE_HREF = "tel:02-XXX-XXXX";
const BRAND_NAME = "LabelCraft Studio";
const BRAND_LOGO_SRC = "/logo/5b637035-febf-4480-a0f2-49f2c6b49bb8.png";

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-900/80 focus-visible:ring-offset-2 focus-visible:ring-offset-stone-100 rounded-sm";

function navLinkClass(active: boolean) {
  const base = `relative inline-flex items-center gap-0.5 py-8 text-[13px] tracking-wide transition-colors ${focusRing}`;
  return active
    ? `${base} font-medium text-stone-900 underline decoration-stone-900 decoration-2 underline-offset-[10px]`
    : `${base} text-stone-500 hover:text-stone-900`;
}

/** ลำดับเมนูมือถือ — ให้สอดคล้องลิงก์หลักเดิม */
const MOBILE_NAV_LINKS = [
  { href: "/", label: "หน้าแรก" },
  { href: "/about", label: "เกี่ยวกับเรา" },
  { href: "/services", label: "บริการทั้งหมด" },
  { href: "/articles", label: "บทความ" },
  { href: "/contact", label: "ติดต่อเรา" },
] as const;

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(href + "/");
}

export function SiteNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);

  const isHome = pathname === "/";
  const isArticles =
    pathname === "/articles" || pathname.startsWith("/articles/");
  const isAbout = pathname === "/about";
  const isServices = pathname.startsWith("/services");
  const isContact = pathname === "/contact";

  useEffect(() => {
    queueMicrotask(() => setMounted(true));
  }, []);

  const setScroll = useCallback(() => {
    setScrolled(window.scrollY > 8);
  }, []);

  useEffect(() => {
    queueMicrotask(setScroll);
    window.addEventListener("scroll", setScroll, { passive: true });
    return () => window.removeEventListener("scroll", setScroll);
  }, [setScroll]);

  useEffect(() => {
    if (!open) return;
    const fn = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [open]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const root = document.documentElement;
    if (open) root.setAttribute("data-mobile-nav-open", "");
    else root.removeAttribute("data-mobile-nav-open");
    return () => {
      document.body.style.overflow = "";
      root.removeAttribute("data-mobile-nav-open");
    };
  }, [open]);

  useEffect(() => {
    queueMicrotask(() => setOpen(false));
  }, [pathname]);

  if (pathname.startsWith("/admin")) return null;

  const solidBar = scrolled || open;
  const navShell = solidBar
    ? "border-b border-stone-200/90 bg-white/95 shadow-[0_1px_0_0_rgba(0,0,0,0.04),0_8px_24px_-12px_rgba(0,0,0,0.1)] backdrop-blur-md"
    : isHome && !open
      ? "border-b border-stone-200/30 bg-stone-100/35 backdrop-blur-md"
      : "border-b border-stone-200/70 bg-stone-100/90 backdrop-blur-md";

  const desktopLinks = (
    <>
      <Link href="/" className={navLinkClass(isHome)}>
        หน้าแรก
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
      <Link href="/articles" className={navLinkClass(isArticles)}>
        บทความ
      </Link>
      <Link href="/contact" className={navLinkClass(isContact)}>
        ติดต่อเรา
      </Link>
    </>
  );

  const mobileDrawer =
    open && mounted
      ? createPortal(
          <>
            <div
              className="fixed inset-0 z-[200] bg-black/20 backdrop-blur-sm md:hidden"
              onClick={() => setOpen(false)}
              aria-hidden
            />
            <div className="nav-drawer-panel fixed inset-y-0 right-0 z-[210] flex w-full max-w-[320px] flex-col bg-white shadow-2xl md:hidden">
              <div className="flex h-16 items-center justify-between px-6">
                <Link
                  href="/"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-2 text-sm font-semibold text-stone-900"
                >
                  <Image
                    src={BRAND_LOGO_SRC}
                    alt={BRAND_NAME}
                    width={26}
                    height={26}
                    className="h-6 w-6 rounded object-cover"
                  />
                  <span>{BRAND_NAME}</span>
                </Link>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="flex h-9 w-9 items-center justify-center rounded-full text-stone-600 transition-colors hover:bg-stone-100 hover:text-stone-900"
                  aria-label="ปิดเมนู"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <path d="M4 4l8 8M12 4l-8 8" />
                  </svg>
                </button>
              </div>

              <div className="h-px bg-stone-100" />

              <nav className="flex-1 overflow-y-auto px-6 py-6">
                <ul className="space-y-1">
                  {MOBILE_NAV_LINKS.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        onClick={() => setOpen(false)}
                        className={`block rounded-lg px-3 py-2.5 text-[15px] transition-colors ${
                          isActive(pathname, link.href)
                            ? "bg-stone-50 font-medium text-stone-900"
                            : "text-stone-500 hover:bg-stone-50 hover:text-stone-900"
                        }`}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>

                <div className="my-5 h-px bg-stone-100" />
                <p className="mb-2 px-3 text-[10px] font-medium uppercase tracking-[0.2em] text-stone-400">
                  บริการย่อย
                </p>
                <ul className="space-y-0.5">
                  {services.map((s) => (
                    <li key={s.id}>
                      <Link
                        href={`/services/${s.id}`}
                        onClick={() => setOpen(false)}
                        className="block rounded-lg px-3 py-2 text-[13px] text-stone-500 transition-colors hover:bg-stone-50 hover:text-stone-900"
                      >
                        {s.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>

              <div className="space-y-2 border-t border-stone-100 px-6 py-5">
                <a
                  href={LINE_OA_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center justify-center gap-2 rounded-lg border border-stone-200 bg-white px-4 py-3 text-sm font-medium text-stone-800 shadow-sm transition-colors hover:bg-stone-50"
                >
                  <MessageCircle className="h-4 w-4" aria-hidden />
                  LINE OA
                </a>
                <a
                  href={PHONE_HREF}
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-stone-900 px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-stone-800"
                >
                  <Phone className="h-4 w-4" aria-hidden />
                  02-XXX-XXXX
                </a>
              </div>
            </div>
          </>,
          document.body,
        )
      : null;

  return (
    <>
      <nav
        className={`fixed top-0 z-[100] w-full transition-[background-color,box-shadow,border-color] duration-300 ${navShell}`}
      >
        {isHome && !open ? (
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

        <div className="relative z-50 mx-auto flex h-16 max-w-7xl min-w-0 items-center justify-between gap-2 px-4 sm:px-6 md:h-20 lg:px-8">
          <Link
            href="/"
            className={`relative z-20 min-w-0 max-w-[min(220px,calc(100vw-5.5rem))] shrink transition-opacity duration-300 hover:opacity-90 md:max-w-none ${focusRing}`}
            aria-label={BRAND_NAME}
          >
            <Image
              src={BRAND_LOGO_SRC}
              alt={BRAND_NAME}
              width={360}
              height={108}
              className="h-14 w-auto max-h-14 object-contain object-left md:h-[5rem] md:max-h-none"
              priority
            />
          </Link>

          <div className="absolute left-1/2 z-10 hidden -translate-x-1/2 md:flex md:items-center md:gap-9 lg:gap-10">
            {desktopLinks}
          </div>

          <div className="relative z-20 flex items-center gap-2 md:gap-2.5">
            <a
              href={LINE_OA_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={`hidden items-center rounded-lg bg-white px-4 py-2 text-[12px] font-medium text-stone-800 shadow-sm ring-1 ring-stone-200/90 transition-all hover:bg-stone-900 hover:text-white hover:ring-stone-900 lg:inline-flex ${focusRing}`}
            >
              <MessageCircle className="mr-1.5 h-3.5 w-3.5" aria-hidden />
              LINE
            </a>
            <a
              href={PHONE_HREF}
              className={`hidden items-center rounded-lg bg-stone-900 px-4 py-2 text-[12px] font-medium text-white transition-all hover:bg-stone-950 hover:ring-2 hover:ring-stone-400/40 sm:inline-flex ${focusRing}`}
            >
              <Phone className="mr-1.5 h-3.5 w-3.5" aria-hidden />
              โทรหาเรา
            </a>

            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              className="relative z-[999] flex h-9 w-9 flex-col items-center justify-center gap-[5px] md:hidden"
              aria-expanded={open}
              aria-label={open ? "ปิดเมนู" : "เปิดเมนู"}
            >
              <span
                className={`block h-[1.5px] w-5 rounded-full bg-stone-900 transition-all duration-300 ${
                  open ? "translate-y-[3.25px] rotate-45" : ""
                }`}
              />
              <span
                className={`block h-[1.5px] w-5 rounded-full bg-stone-900 transition-all duration-300 ${
                  open ? "-translate-y-[3.25px] -rotate-45" : ""
                }`}
              />
            </button>
          </div>
        </div>
      </nav>
      {mobileDrawer}
    </>
  );
}
