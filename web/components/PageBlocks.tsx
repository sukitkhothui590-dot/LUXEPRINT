import type { ReactNode } from "react";

type Align = "left" | "center" | "right";

function alignClass(a: Align) {
  if (a === "center") return "text-center";
  if (a === "right") return "text-right";
  return "text-left";
}

export function PageLayout({
  children,
  maxWidthClass = "max-w-7xl",
  className,
}: {
  children: ReactNode;
  /** Tailwind max-width + optional width overrides */
  maxWidthClass?: string;
  className?: string;
}) {
  return (
    <div className="bg-white">
      <div
        className={`mx-auto px-4 pb-32 pt-24 sm:px-6 sm:pb-40 sm:pt-28 lg:px-8 lg:pb-44 lg:pt-32 ${maxWidthClass} ${className ?? ""}`}
      >
        {children}
      </div>
    </div>
  );
}

export function PageEyebrow({
  children,
  align = "center",
  variant = "default",
  className,
}: {
  children: ReactNode;
  align?: Align;
  /** `dark` = บนพื้นมืด (เช่น hero บริการ) */
  variant?: "default" | "dark";
  className?: string;
}) {
  const tone = variant === "dark" ? "text-stone-300" : "text-stone-400";
  return (
    <p
      className={`mb-4 text-[11px] font-medium uppercase tracking-[0.22em] ${tone} ${alignClass(align)} ${className ?? ""}`}
    >
      {children}
    </p>
  );
}

export function PageTitle({
  children,
  align = "center",
  className,
}: {
  children: ReactNode;
  align?: Align;
  className?: string;
}) {
  return (
    <h1
      className={`text-4xl font-normal leading-snug text-stone-900 md:text-5xl ${alignClass(align)} ${className ?? ""}`}
    >
      {children}
    </h1>
  );
}

export function PageLead({
  children,
  align = "center",
  className,
}: {
  children: ReactNode;
  align?: Align;
  className?: string;
}) {
  return (
    <p
      className={`mb-12 max-w-prose font-light leading-relaxed text-stone-500 md:mb-16 ${align === "center" ? "mx-auto" : ""} ${alignClass(align)} ${className ?? ""}`}
    >
      {children}
    </p>
  );
}

/** Section heading (h2) — same scale as home sections */
export function PageSectionTitle({
  children,
  align = "center",
  className,
}: {
  children: ReactNode;
  align?: Align;
  className?: string;
}) {
  return (
    <h2
      className={`text-3xl font-normal text-stone-900 md:text-4xl ${alignClass(align)} ${className ?? ""}`}
    >
      {children}
    </h2>
  );
}

/**
 * ปุ่มหลัก / รอง แบบ hero (มุมมนไม่เกิน ~8px)
 * หลัก: พื้นดำ ตัวหนา — รอง: เส้นขอบเทา พื้นขาว
 */
export function btnPrimaryClassName(extra?: string) {
  return `inline-flex min-h-[52px] items-center justify-center rounded-lg border border-black bg-black px-8 py-3.5 text-center text-sm font-semibold tracking-wide text-white transition-colors hover:border-neutral-800 hover:bg-neutral-900 ${extra ?? ""}`;
}

export function btnSecondaryClassName(extra?: string) {
  return `inline-flex min-h-[52px] items-center justify-center rounded-lg border border-stone-300 bg-white px-8 py-3.5 text-center text-sm font-medium tracking-wide text-stone-900 transition-colors hover:border-stone-400 hover:bg-stone-50 ${extra ?? ""}`;
}
