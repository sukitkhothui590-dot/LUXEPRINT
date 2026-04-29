import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Banknote, Check } from "lucide-react";
import { ClientMarquee } from "@/components/ClientMarquee";
import { HeroAtmosphere } from "@/components/HeroAtmosphere";
import { PageEyebrow, btnSecondaryClassName } from "@/components/PageBlocks";
import type { Service } from "@/lib/services";
import {
  getHeroVisualForService,
  getPrepForService,
  getPricesForService,
} from "@/lib/services";
import {
  getServiceHighlightIcons,
  getServiceIcon,
  PROCESS_STEP_ICONS,
} from "@/lib/service-icons";

const STEPS = [
  {
    n: "01",
    t: "ส่งไฟล์ & ประเมินราคา",
    d: "ส่งไฟล์และรายละเอียด เพื่อรับใบเสนอราคาและช่วงเวลาผลิตโดยประมาณ",
  },
  {
    n: "02",
    t: "ยืนยันแบบ & ชำระเงิน",
    d: "ตรวจสอบสเปคสี ขนาด และชำระมัดจำหรือเต็มจำนวนตามที่ตกลง",
  },
  {
    n: "03",
    t: "ผลิต & ควบคุมคุณภาพ",
    d: "ดำเนินการพิมพ์และตรวจชิ้นงานก่อนส่งมอบ",
  },
  {
    n: "04",
    t: "ส่งมอบ",
    d: "รับที่ร้านหรือจัดส่งตามที่เลือก พร้อมแพ็กอย่างปลอดภัย",
  },
] as const;

const portfolioFrames = [
  { label: "Sample 01", tone: "from-stone-100 to-stone-50" },
  { label: "Sample 02", tone: "from-stone-50 to-stone-100" },
  { label: "Sample 03", tone: "from-stone-100 via-stone-50 to-white" },
] as const;

type Props = { service: Service };

export function ServiceDetailView({ service }: Props) {
  const prices = getPricesForService(service);
  const prepItems = getPrepForService(service);
  const ServiceIcon = getServiceIcon(service.id);
  const highlightIcons = getServiceHighlightIcons(service.id);
  const heroVisual = getHeroVisualForService(service);

  return (
    <>
      <header className="relative min-h-[min(53.856dvh,551px)] overflow-x-clip border-b border-stone-100 bg-white">
        <HeroAtmosphere />

        {/* รูปเต็มความสูง hero ชิดขวาจอ — mask ซ้ายทำให้ไม่มีขอบตัด + fade ทับอ่อนๆ */}
        <div
          className="pointer-events-none absolute inset-y-0 right-0 z-[5] hidden w-[min(56vw,880px)] lg:block"
          style={{
            maskImage:
              "linear-gradient(to right, transparent 0%, black 18%, black 100%)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent 0%, black 18%, black 100%)",
          }}
        >
          <div className="relative h-full w-full overflow-hidden bg-white">
            <Image
              src={heroVisual.src}
              alt={heroVisual.alt}
              fill
              priority
              sizes="(max-width: 1024px) 0px, 56vw"
              className="object-cover object-right"
              unoptimized={
                heroVisual.src.endsWith(".svg") ||
                heroVisual.src.includes(".svg")
              }
            />
            <div
              className="absolute inset-0 bg-gradient-to-r from-white/90 from-[0%] via-white/35 via-[45%] to-transparent to-[100%]"
              aria-hidden
            />
          </div>
        </div>

        <div className="relative z-10 mx-auto max-w-6xl px-4 pb-20 pt-24 sm:px-6 md:pb-24 md:pt-28 lg:px-8">
          <nav
            className="mb-10 flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] font-medium uppercase tracking-[0.18em] text-stone-400"
            aria-label="Breadcrumb"
          >
            <Link href="/" className="transition-colors hover:text-stone-800">
              หน้าแรก
            </Link>
            <span className="text-stone-300" aria-hidden>
              /
            </span>
            <Link
              href="/services"
              className="transition-colors hover:text-stone-800"
            >
              บริการ
            </Link>
            <span className="text-stone-300" aria-hidden>
              /
            </span>
            <span className="text-stone-600">{service.name}</span>
          </nav>

          <div className="relative">
            <div className="relative z-20 min-w-0 max-w-2xl xl:max-w-2xl">
              <div className="mb-6 flex flex-wrap items-center gap-4">
                <span
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-stone-200/90 bg-white/90 text-stone-800 shadow-sm backdrop-blur-sm md:h-14 md:w-14"
                  aria-hidden
                >
                  <ServiceIcon
                    className="h-6 w-6 md:h-7 md:w-7"
                    strokeWidth={1.25}
                  />
                </span>
                <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-stone-400">
                  Premium Inkjet & Printing Services
                </p>
              </div>
              <h1 className="break-words text-4xl font-normal leading-tight tracking-tight text-stone-900 md:text-5xl lg:text-6xl">
                {service.name}
              </h1>
              <p className="mt-6 max-w-xl text-lg font-light leading-relaxed text-stone-500">
                {service.tagline}
              </p>
            </div>

            {/* มือถือ: การ์ดรูป + fade ซ้ายเบาๆ */}
            <div className="relative z-10 mt-12 aspect-[4/5] w-full max-w-md overflow-hidden rounded-2xl border border-stone-200/80 bg-stone-100 shadow-[0_28px_90px_-36px_rgba(0,0,0,0.18)] sm:aspect-[5/6] sm:max-w-lg lg:hidden">
              <Image
                src={heroVisual.src}
                alt={heroVisual.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 0px"
                className="object-cover"
                unoptimized={
                  heroVisual.src.endsWith(".svg") ||
                  heroVisual.src.includes(".svg")
                }
              />
              <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-r from-white/95 from-[0%] via-white/25 via-[28%] to-transparent to-[55%]"
                aria-hidden
              />
              <div
                className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-stone-900/[0.06]"
                aria-hidden
              />
            </div>
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-3xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
        <p className="break-words text-center text-lg font-light leading-[1.75] text-stone-600 md:text-left md:text-xl">
          {service.intro}
        </p>
        <p className="mt-8 text-center text-sm text-stone-400 md:text-left">
          <span className="font-medium text-stone-500">ระยะเวลาโดยประมาณ:</span>{" "}
          {service.turnaround}
        </p>
      </section>

      <section className="border-y border-stone-100 bg-stone-50/40">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
          <div className="grid gap-12 md:grid-cols-3 md:gap-10">
            {service.highlights.map((h, i) => {
              const Hi = highlightIcons[i] ?? highlightIcons[0];
              return (
              <div key={h.title} className="relative md:pt-2">
                <div
                  className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-stone-200/50 text-stone-700 ring-1 ring-stone-200/60"
                  aria-hidden
                >
                  <Hi className="h-5 w-5" strokeWidth={1.5} />
                </div>
                <h3 className="text-base font-medium text-stone-900">
                  {h.title}
                </h3>
                <p className="mt-3 text-sm font-light leading-relaxed text-stone-500">
                  {h.body}
                </p>
              </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
        <p className="mb-6 text-[11px] font-medium uppercase tracking-[0.22em] text-stone-400">
          เหมาะกับ
        </p>
        <ul className="space-y-4">
          {service.useCases.map((line) => (
            <li key={line} className="flex gap-3 text-sm font-light text-stone-600">
              <span
                className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-stone-900/40"
                aria-hidden
              />
              {line}
            </li>
          ))}
        </ul>
      </section>

      <section className="border-t border-stone-100 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
          <div className="mb-14 text-center md:mb-16">
            <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.22em] text-stone-400">
              Process
            </p>
            <h2 className="text-2xl font-light text-stone-900 md:text-3xl">
              ขั้นตอนการทำงาน
            </h2>
          </div>
          <ol className="grid gap-12 md:grid-cols-2 lg:grid-cols-4 lg:gap-10">
            {STEPS.map((step, i) => {
              const StepIcon = PROCESS_STEP_ICONS[i] ?? PROCESS_STEP_ICONS[0];
              return (
              <li key={step.n} className="group relative flex flex-col pt-2">
                <span
                  className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl border border-stone-200/90 bg-stone-50 text-stone-600 transition-colors group-hover:border-stone-300 group-hover:bg-white group-hover:text-stone-900"
                  aria-hidden
                >
                  <StepIcon className="h-5 w-5" strokeWidth={1.45} />
                </span>
                <span className="mb-3 inline-flex h-8 w-8 items-center justify-center rounded-full border border-stone-200 bg-white font-mono text-[11px] tabular-nums text-stone-500 transition-colors group-hover:border-stone-300 group-hover:text-stone-800">
                  {step.n}
                </span>
                <h3 className="text-base font-medium text-stone-900">{step.t}</h3>
                <p className="mt-2 text-sm font-light leading-relaxed text-stone-500">
                  {step.d}
                </p>
              </li>
              );
            })}
          </ol>
        </div>
      </section>

      <section className="border-t border-stone-100 bg-stone-50/30">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
          <div className="mb-12 max-w-2xl md:mb-14">
            <PageEyebrow align="left">Preparation</PageEyebrow>
            <h2 className="mt-2 text-2xl font-light text-stone-900 md:text-3xl">
              ไฟล์ที่ควรเตรียม
            </h2>
            <p className="mt-5 font-light leading-relaxed text-stone-500">
              เพื่อลดรอบแก้ไขและให้สีใกล้เคียงที่สุด โปรดเตรียมไฟล์ตามข้อแนะนำทั้งสี่ข้อ — รูปด้านบนแต่ละการ์ดแทนที่ได้เมื่อคุณมีภาพประกอบจริง
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            {prepItems.map((item) => (
              <article
                key={item.title}
                className="group flex flex-col overflow-hidden rounded-2xl border border-stone-100 bg-white shadow-[0_1px_0_0_rgb(0_0_0/0.03)] transition-shadow duration-300 hover:shadow-md"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-br from-stone-50 to-stone-100">
                  {item.prepImage ? (
                    <Image
                      src={item.prepImage}
                      alt={item.prepImageAlt ?? item.title}
                      fill
                      sizes="(max-width: 640px) 100vw, 50vw"
                      unoptimized={item.prepImage.endsWith(".svg")}
                      className="object-cover object-center transition duration-500 ease-out group-hover:scale-[1.04]"
                    />
                  ) : (
                    <div
                      className="hero-bg-grid flex h-full items-center justify-center"
                      aria-hidden
                    >
                      <span className="rounded-full border border-dashed border-stone-300 px-4 py-2 text-xs font-light text-stone-400">
                        เพิ่ม prepImage ใน prepItems
                      </span>
                    </div>
                  )}
                  <div
                    className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-stone-900/[0.06]"
                    aria-hidden
                  />
                </div>
                <div className="flex gap-4 p-5 sm:p-6">
                  <Check
                    className="mt-0.5 h-5 w-5 shrink-0 text-stone-900/70 transition-colors group-hover:text-stone-900"
                    strokeWidth={1.5}
                    aria-hidden
                  />
                  <div>
                    <h3 className="font-medium text-stone-800">{item.title}</h3>
                    <p className="mt-2 text-sm font-light leading-relaxed text-stone-500">
                      {item.body}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-stone-100 bg-white">
        <div className="mx-auto max-w-3xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
          <div className="mb-12 text-center">
            <p className="mb-3 flex items-center justify-center gap-2 text-[11px] font-medium uppercase tracking-[0.22em] text-stone-400">
              <Banknote className="h-3.5 w-3.5" aria-hidden />
              Pricing
            </p>
            <h2 className="text-2xl font-light text-stone-900 md:text-3xl">
              ราคาเริ่มต้น
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-sm font-light text-stone-500">
              {service.name} — ราคาอ้างอิงเบื้องต้น (ยังไม่รวม VAT 7%)
              อาจปรับตามวัสดุและจำนวนจริง
            </p>
          </div>

          <div className="-mx-4 overflow-x-auto rounded-2xl border border-stone-100 sm:mx-0">
            <table className="w-full min-w-0 text-left text-sm">
              <thead>
                <tr className="border-b border-stone-100 bg-stone-50/80">
                  <th className="min-w-0 px-4 py-4 font-medium text-stone-700 sm:px-5">
                    รายละเอียด / วัสดุ
                  </th>
                  <th className="hidden px-5 py-4 text-center font-medium text-stone-700 sm:table-cell">
                    จำนวน
                  </th>
                  <th className="whitespace-nowrap px-4 py-4 text-right font-medium text-stone-700 sm:px-5">
                    ราคา
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 font-light text-stone-600">
                {prices.map((row) => (
                  <tr
                    key={`${row.size}-${row.qty}`}
                    className="transition-colors hover:bg-stone-50/50"
                  >
                    <td className="min-w-0 max-w-[70vw] break-words px-4 py-5 text-stone-800 sm:max-w-none sm:px-5">
                      {row.size}
                    </td>
                    <td className="hidden px-5 py-5 text-center sm:table-cell">
                      {row.qty}
                    </td>
                    <td className="whitespace-nowrap px-4 py-5 text-right tabular-nums font-medium text-stone-900 sm:px-5">
                      {row.price}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-12 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/contact"
              className={`${btnSecondaryClassName(
                "inline-flex items-center gap-2 px-8 py-3.5 text-sm",
              )}`}
            >
              ขอใบเสนอราคา
              <ArrowUpRight className="h-4 w-4" aria-hidden />
            </Link>
            <Link
              href="/services"
              className="text-sm font-medium text-stone-500 underline decoration-stone-300 underline-offset-4 transition-colors hover:text-stone-900 hover:decoration-stone-900"
            >
              ดูบริการอื่น
            </Link>
          </div>
        </div>
      </section>

      <ClientMarquee
        title={`แบรนด์ที่ไว้ใจงาน ${service.name} กับ LabelCraft Studio`}
      />

      <section className="border-t border-stone-100 bg-stone-50/20">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
          <div className="mb-12 text-center md:mb-14">
            <p className="mb-3 flex items-center justify-center gap-2 text-[11px] font-medium uppercase tracking-[0.22em] text-stone-400">
              <ServiceIcon className="h-3.5 w-3.5" strokeWidth={2} aria-hidden />
              Portfolio
            </p>
            <h2 className="text-2xl font-light text-stone-900 md:text-3xl">
              ผลงานตัวอย่าง
            </h2>
            <p className="mx-auto mt-3 max-w-md text-sm font-light text-stone-500">
              ภาพตัวอย่าง — สามารถขอดูชิ้นจริงหรือสเปกเพิ่มเติมที่ร้าน
            </p>
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-3 sm:gap-6">
            {service.portfolioSamples && service.portfolioSamples.length > 0
              ? service.portfolioSamples.map((s) => (
                  <div
                    key={s.src}
                    className="group relative aspect-[3/4] overflow-hidden rounded-2xl border border-stone-100 bg-stone-100 shadow-[0_1px_0_0_rgb(0_0_0/0.03)]"
                  >
                    <Image
                      src={s.src}
                      alt={s.label}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition duration-500 ease-out group-hover:scale-[1.03]"
                    />
                    <div
                      className="pointer-events-none absolute inset-0 bg-gradient-to-t from-stone-900/55 via-stone-900/5 to-transparent"
                      aria-hidden
                    />
                    <span className="absolute bottom-0 left-0 right-0 p-5 text-xs font-medium uppercase tracking-wider text-white/95 drop-shadow-sm transition-opacity group-hover:opacity-95">
                      {s.label}
                    </span>
                  </div>
                ))
              : portfolioFrames.map((p) => (
                  <div
                    key={p.label}
                    className={`group relative flex aspect-[3/4] flex-col justify-end overflow-hidden rounded-2xl border border-stone-100 bg-gradient-to-br p-6 ${p.tone}`}
                  >
                    <div
                      className="pointer-events-none absolute inset-0 opacity-[0.07]"
                      style={{
                        backgroundImage:
                          "repeating-linear-gradient(-12deg, transparent, transparent 14px, currentColor 14px, currentColor 15px)",
                      }}
                      aria-hidden
                    />
                    <span className="relative text-xs font-medium uppercase tracking-wider text-stone-400 transition-colors group-hover:text-stone-600">
                      {p.label}
                    </span>
                  </div>
                ))}
          </div>
        </div>
      </section>
    </>
  );
}
