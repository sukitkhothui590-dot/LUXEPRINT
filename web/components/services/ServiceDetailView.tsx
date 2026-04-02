import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import { ClientMarquee } from "@/components/ClientMarquee";
import { PageEyebrow, btnSecondaryClassName } from "@/components/PageBlocks";
import type { Service } from "@/lib/services";
import { getPrepForService, getPricesForService } from "@/lib/services";

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

  return (
    <>
      <header className="relative border-b border-stone-100 bg-white">
        <div
          className="pointer-events-none absolute inset-0 hero-bg-grid opacity-60"
          aria-hidden
        />
        <div className="relative mx-auto max-w-5xl px-4 pb-16 pt-24 sm:px-6 md:pb-20 md:pt-28 lg:px-8">
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

          <PageEyebrow align="left" className="mb-5">
            Services
          </PageEyebrow>
          <h1 className="max-w-3xl text-4xl font-light leading-[1.12] tracking-tight text-stone-900 md:text-5xl lg:text-[3.25rem]">
            {service.name}
          </h1>
          <p className="mt-6 max-w-2xl text-base font-light leading-relaxed text-stone-500 md:text-lg">
            {service.tagline}
          </p>
          <div className="mt-10 h-px w-12 bg-stone-900" aria-hidden />
        </div>
      </header>

      <section className="mx-auto max-w-3xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
        <p className="text-center text-lg font-light leading-[1.75] text-stone-600 md:text-left md:text-xl">
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
            {service.highlights.map((h) => (
              <div key={h.title} className="relative md:pt-2">
                <div
                  className="mb-4 h-px w-full max-w-[2.5rem] bg-stone-900/80"
                  aria-hidden
                />
                <h3 className="text-base font-medium text-stone-900">
                  {h.title}
                </h3>
                <p className="mt-3 text-sm font-light leading-relaxed text-stone-500">
                  {h.body}
                </p>
              </div>
            ))}
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
            {STEPS.map((step) => (
              <li key={step.n} className="group relative flex flex-col pt-2">
                <span className="mb-4 inline-flex h-8 w-8 items-center justify-center rounded-full border border-stone-200 bg-white font-mono text-[11px] tabular-nums text-stone-500 transition-colors group-hover:border-stone-300 group-hover:text-stone-800">
                  {step.n}
                </span>
                <h3 className="text-base font-medium text-stone-900">{step.t}</h3>
                <p className="mt-2 text-sm font-light leading-relaxed text-stone-500">
                  {step.d}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-t border-stone-100 bg-stone-50/30">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
          <div className="grid items-start gap-14 lg:grid-cols-2 lg:gap-20">
            <div>
              <PageEyebrow align="left">Preparation</PageEyebrow>
              <h2 className="mt-2 text-2xl font-light text-stone-900 md:text-3xl">
                ไฟล์ที่ควรเตรียม
              </h2>
              <p className="mt-5 font-light leading-relaxed text-stone-500">
                เพื่อลดรอบแก้ไขและให้สีใกล้เคียงที่สุด โปรดเตรียมไฟล์ตามข้อแนะนำด้านล่าง
              </p>
              <ul className="mt-10 space-y-6">
                {prepItems.map((item) => (
                  <li key={item.title} className="flex gap-4">
                    <Check
                      className="mt-0.5 h-5 w-5 shrink-0 text-stone-900/70"
                      strokeWidth={1.5}
                      aria-hidden
                    />
                    <div>
                      <p className="font-medium text-stone-800">{item.title}</p>
                      <p className="mt-1 text-sm font-light leading-relaxed text-stone-500">
                        {item.body}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div
              className="hero-bg-grid relative min-h-[280px] overflow-hidden rounded-2xl border border-stone-100 bg-white shadow-[0_1px_0_0_rgb(0_0_0/0.03)] lg:min-h-[360px]"
              aria-hidden
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/0 via-white/40 to-stone-100/60" />
              <div className="absolute bottom-8 left-8 right-8 rounded-lg border border-stone-200/80 bg-white/90 px-4 py-3 text-xs font-light text-stone-500 backdrop-blur-sm">
                พื้นที่ตัวอย่างการจัดวางไฟล์ — ส่งแบบมาประเมินได้โดยไม่มีค่าใช้จ่ายในขั้นต้น
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-stone-100 bg-white">
        <div className="mx-auto max-w-3xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
          <div className="mb-12 text-center">
            <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.22em] text-stone-400">
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

          <div className="overflow-hidden rounded-2xl border border-stone-100">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-stone-100 bg-stone-50/80">
                  <th className="px-5 py-4 font-medium text-stone-700">
                    รายละเอียด / วัสดุ
                  </th>
                  <th className="hidden px-5 py-4 text-center font-medium text-stone-700 sm:table-cell">
                    จำนวน
                  </th>
                  <th className="px-5 py-4 text-right font-medium text-stone-700">
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
                    <td className="px-5 py-5 text-stone-800">{row.size}</td>
                    <td className="hidden px-5 py-5 text-center sm:table-cell">
                      {row.qty}
                    </td>
                    <td className="px-5 py-5 text-right tabular-nums font-medium text-stone-900">
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

      <ClientMarquee title={`แบรนด์ที่ไว้ใจงาน ${service.name} กับ LuxePrint`} />

      <section className="border-t border-stone-100 bg-stone-50/20">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
          <div className="mb-12 text-center md:mb-14">
            <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.22em] text-stone-400">
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
            {portfolioFrames.map((p) => (
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
