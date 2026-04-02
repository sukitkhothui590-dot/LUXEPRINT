import type { Metadata } from "next";
import { Play, Sparkles, Target, Users } from "lucide-react";
import { PageEyebrow, PageSectionTitle } from "@/components/PageBlocks";

export const metadata: Metadata = {
  title: "เกี่ยวกับเรา | LuxePrint",
  description: "ผู้เชี่ยวชาญด้านงานพิมพ์ที่แบรนด์ชั้นนำไว้วางใจ",
};

function WaveToWhite() {
  return (
    <div
      className="pointer-events-none absolute inset-x-0 bottom-0 h-14 w-full md:h-20"
      aria-hidden
    >
      <svg
        className="h-full w-full text-white"
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
      >
        <path
          fill="currentColor"
          d="M0,48 C320,8 640,88 960,48 C1200,16 1320,24 1440,40 L1440,80 L0,80 Z"
        />
      </svg>
    </div>
  );
}

function ImagePlaceholder({ label }: { label: string }) {
  return (
    <div
      className="hero-grid relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-gradient-to-br from-stone-200 via-stone-100 to-stone-300 ring-1 ring-stone-200/80 md:rounded-[10px]"
      aria-hidden
    >
      <span className="absolute inset-0 flex items-center justify-center text-xs font-medium tracking-wide text-stone-500/80">
        {label}
      </span>
    </div>
  );
}

export default function AboutPage() {
  return (
    <div className="bg-white">
      {/* Hero — พื้น stone + คลื่นล่าง (ไม่ใช้ negative margin ดึงการ์ดทับข้อความ) */}
      <section className="relative overflow-hidden bg-stone-100 pt-24 pb-28 md:pt-28 md:pb-36">
        <div className="relative z-10 mx-auto max-w-3xl px-4 pb-4 text-center sm:px-6 lg:px-8">
          <PageEyebrow>About Us</PageEyebrow>
          <h1 className="text-4xl font-normal leading-snug text-stone-900 md:text-5xl">
            ผู้เชี่ยวชาญด้านงานพิมพ์{" "}
            <span className="text-stone-600">
              ที่แบรนด์ชั้นนำไว้วางใจ
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg font-light leading-relaxed text-stone-600 md:mt-8">
            LuxePrint เริ่มต้นจากความหลงใหลในศิลปะแห่งการพิมพ์และการออกแบบ
            เราเชื่อว่า &quot;กระดาษและหมึก&quot;
            สามารถสื่อสารอัตลักษณ์ของแบรนด์ได้อย่างทรงพลัง
          </p>
        </div>
        <WaveToWhite />
      </section>

      {/* แถบรูป — พื้นขาวเต็ม ไม่ทับข้อความ hero */}
      <section className="relative z-10 bg-white px-4 pt-10 sm:px-6 sm:pt-12 lg:px-8">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4 md:gap-5">
          <ImagePlaceholder label="งานพิมพ์ความละเอียดสูง" />
          <ImagePlaceholder label="บรรจุภัณฑ์ & แบรนด์" />
          <ImagePlaceholder label="เทคโนโลยีอิงค์เจ็ท" />
          <ImagePlaceholder label="ผลงานพรีเมียม" />
        </div>
      </section>

      {/* หัวข้อใหญ่ + เนื้อหาสองคอลัมน์ */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-28 lg:px-8">
        <h2 className="mb-12 max-w-4xl text-3xl font-normal leading-snug text-stone-900 md:mb-16 md:text-4xl">
          เรามั่นใจว่าแนวคิดและงานของคุณ
          <span className="text-stone-600"> ถูกส่งมอบอย่างตั้งใจ</span>
        </h2>
        <div className="grid grid-cols-1 gap-10 text-justify text-base font-light leading-relaxed text-stone-600 md:grid-cols-2 md:gap-12 md:text-lg">
          <p>
            เราจึงมุ่งมั่นที่จะยกระดับมาตรฐานงานพิมพ์อิงค์เจ็ทในประเทศไทยให้เทียบเท่าระดับสากล
            ด้วยเครื่องจักรเทคโนโลยีล่าสุดนำเข้าจากต่างประเทศ
            ผสานกับความประณีตของทีมงานช่างพิมพ์ผู้มากประสบการณ์
          </p>
          <p>
            ทำให้เราสามารถควบคุมคุณภาพสี ความคมชัด และรายละเอียดต่างๆ ได้อย่างสมบูรณ์แบบ
            ไม่ว่าจะเป็นงานพิมพ์สเกลเล็กที่เน้นความละเอียดสูงสุด หรืองานป้ายขนาดใหญ่
            เราพร้อมใส่ใจในทุกขั้นตอน
          </p>
        </div>
      </section>

      {/* Split — ซ้ายรูป + quote / ขวาข้อความ + blockquote */}
      <section className="border-t border-stone-100 bg-stone-50/50">
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-14 px-4 py-20 sm:px-6 md:gap-16 md:py-28 lg:grid-cols-2 lg:px-8">
          <div className="relative">
            <div
              className="hero-grid relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-gradient-to-br from-stone-300 via-stone-200 to-stone-100 ring-1 ring-stone-200/80 md:rounded-[10px] lg:aspect-[5/4]"
              aria-hidden
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/95 text-stone-900 shadow-lg ring-1 ring-stone-200/80 backdrop-blur-sm">
                  <Play className="ml-1 h-7 w-7" fill="currentColor" aria-hidden />
                </span>
              </div>
            </div>
            <div className="absolute -bottom-4 left-4 right-4 max-w-sm rounded-lg border border-stone-100 bg-white p-5 shadow-[0_12px_40px_-16px_rgba(0,0,0,0.15)] md:left-6 md:right-auto md:rounded-[10px] md:p-6">
              <p className="text-sm font-light italic leading-relaxed text-stone-600">
                &quot;ความสมบูรณ์แบบอยู่ที่รายละเอียด — ทุกชิ้นงานคือตัวแทนของแบรนด์คุณ&quot;
              </p>
              <p className="mt-3 text-[11px] font-medium uppercase tracking-[0.18em] text-stone-400">
                LuxePrint
              </p>
            </div>
          </div>

          <div className="pt-8 lg:pt-0">
            <PageSectionTitle align="left" className="mb-6 text-3xl md:text-4xl">
              เราพร้อมเสริมพลังผู้ประกอบการและแบรนด์
            </PageSectionTitle>
            <p className="mb-8 text-lg font-light leading-relaxed text-stone-600">
              สไตล์ &quot;มินิมอล&quot; ไม่ใช่แค่เทรนด์การออกแบบ แต่คือปรัชญาในการทำงานของเรา
              ที่เน้นความชัดเจน ตัดสิ่งที่ไม่จำเป็นออก และโฟกัสที่แก่นแท้ของคุณภาพ
            </p>
            <blockquote className="border-l-[3px] border-stone-900 pl-6 text-base font-light italic leading-relaxed text-stone-600">
              เพื่อให้ผลงานที่ส่งถึงมือลูกค้าคือความสมบูรณ์แบบอย่างแท้จริง
              — ทั้งงานเล็กหรือใหญ่ เรายึดมาตรฐานเดียวกัน
            </blockquote>
          </div>
        </div>
      </section>

      {/* กลาง — หัวข้อ + ตกแต่ง */}
      <section className="relative overflow-hidden px-4 py-20 sm:px-6 md:py-28 lg:px-8">
        <span className="pointer-events-none absolute left-[8%] top-1/4 text-stone-300/80" aria-hidden>
          <Sparkles className="h-5 w-5" />
        </span>
        <span className="pointer-events-none absolute right-[12%] top-1/3 text-stone-300/80" aria-hidden>
          <Sparkles className="h-4 w-4" />
        </span>
        <span className="pointer-events-none absolute bottom-1/4 left-[15%] text-stone-200" aria-hidden>
          +
        </span>
        <span className="pointer-events-none absolute bottom-1/3 right-[18%] text-stone-200" aria-hidden>
          +
        </span>
        <div className="relative mx-auto max-w-3xl text-center">
          <PageSectionTitle className="mb-6">
            ช่วยให้งานพิมพ์ของคุณเติบโตอย่างมั่นใจ
          </PageSectionTitle>
          <p className="text-lg font-light leading-relaxed text-stone-500">
            จากไฟล์งานไปจนถึงชิ้นสุดท้าย เราอยู่เคียงข้างคุณด้วยกระบวนการที่ชัดเจน
            การันตีคุณภาพ และการสื่อสารที่โปร่งใส
          </p>
        </div>
      </section>

      {/* ไอคอน 3 คอลัมน์ */}
      <section className="border-t border-stone-100 bg-white pb-24 pt-12 md:pb-32 md:pt-16">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-4 sm:px-6 md:grid-cols-3 md:gap-10 lg:px-8">
          <div className="text-center md:text-left">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-stone-100 text-stone-900 ring-1 ring-stone-200/80 md:mx-0">
              <Users className="h-7 w-7" strokeWidth={1.5} aria-hidden />
            </div>
            <h3 className="mb-3 text-lg font-medium text-stone-900">
              ทีมงานมืออาชีพ
            </h3>
            <p className="text-sm font-light leading-relaxed text-stone-600">
              ช่างพิมพ์และทีมควบคุมคุณภาพผู้มากประสบการณ์
              ดูแลสี ความคมชัด และรายละเอียดจนถึงมือคุณ
            </p>
          </div>
          <div className="text-center md:text-left">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-stone-100 text-stone-900 ring-1 ring-stone-200/80 md:mx-0">
              <Target className="h-7 w-7" strokeWidth={1.5} aria-hidden />
            </div>
            <h3 className="mb-3 text-lg font-medium text-stone-900">
              เน้นเป้าหมายคุณภาพ
            </h3>
            <p className="text-sm font-light leading-relaxed text-stone-600">
              ตั้งแต่การปรับไฟล์ CMYK ไปจนถึงงานจริงบนวัสดุ
              เราโฟกัสที่มาตรฐานที่คุณต้องการ
            </p>
          </div>
          <div className="text-center md:text-left">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-stone-100 text-stone-900 ring-1 ring-stone-200/80 md:mx-0">
              <Sparkles className="h-7 w-7" strokeWidth={1.5} aria-hidden />
            </div>
            <h3 className="mb-3 text-lg font-medium text-stone-900">
              นวัตกรรมการพิมพ์
            </h3>
            <p className="text-sm font-light leading-relaxed text-stone-600">
              เครื่องจักรและเทคโนโลยีล่าสุด รองรับงานหลากหลายวัสดุ
              ตั้งแต่งานเล็กไปจนถึงป้ายขนาดใหญ่
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
