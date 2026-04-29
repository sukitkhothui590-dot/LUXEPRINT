import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { ClientMarquee } from "@/components/ClientMarquee";
import { HeroAtmosphere } from "@/components/HeroAtmosphere";
import { HeroCtaRow } from "@/components/HeroCtaRow";
import { HomeScrollRail } from "@/components/HomeScrollRail";
import { PageEyebrow, PageSectionTitle } from "@/components/PageBlocks";

const homeServices = [
  {
    slug: "sticker" as const,
    title: "รับพิมพ์สติ๊กเกอร์",
    desc: "สติ๊กเกอร์คุณภาพสูง กันน้ำ สีคมชัด สำหรับฉลากสินค้าและตกแต่ง",
  },
  {
    slug: "box" as const,
    title: "รับพิมพ์กล่อง",
    desc: "กล่องบรรจุภัณฑ์ดีไซน์หรู ปกป้องสินค้าและสร้างความประทับใจแรก",
  },
  {
    slug: "vinyl" as const,
    title: "รับพิมพ์ไวนิล",
    desc: "ป้ายไวนิลขนาดใหญ่ ทนแดดทนฝน สำหรับงานโฆษณาทุกประเภท",
  },
  {
    slug: "uv" as const,
    title: "รับพิมพ์ UV",
    desc: "นวัตกรรมงานพิมพ์ UV ลงบนวัสดุโดยตรง เช่น อะคริลิค ไม้ กระจก",
  },
  {
    slug: "brochure" as const,
    title: "รับทำโบรชัวร์",
    desc: "ใบปลิว โบรชัวร์ แผ่นพับ — พิมพ์คม สีตรงแบรนด์ สำหรับโปรโมชันและองค์กร",
  },
];

const featured = [
  {
    title: "Premium Box",
    subtitle: "งานพิมพ์กล่องบรรจุภัณฑ์ปั๊มฟอยล์",
    imageSrc: "/Featured%20Work/Gemini_Generated_Image_yr28hlyr28hlyr28.png",
  },
  {
    title: "Business Cards",
    subtitle: "นามบัตรกระดาษ Cotton 100%",
    imageSrc: "/Featured%20Work/Gemini_Generated_Image_73vci973vci973vc.png",
  },
  {
    title: "UV Printing",
    subtitle: "พิมพ์ UV ลงบนอะคริลิคใส",
    imageSrc: "/Featured%20Work/Gemini_Generated_Image_6c92vc6c92vc6c92.png",
  },
];

export default function HomePage() {
  return (
    <>
      <HomeScrollRail />
      <section
        id="section-hero"
        className="relative min-h-dvh overflow-x-clip bg-white"
      >
        <HeroAtmosphere />

        <div className="relative z-10 flex min-h-dvh flex-col">
          <div className="h-16 shrink-0 md:h-20" aria-hidden />
          <div className="flex flex-1 flex-col justify-center px-4 pb-16 sm:px-6 lg:px-8">
            <div className="mx-auto w-full max-w-3xl text-center">
              <p className="mb-6 text-[11px] font-medium uppercase tracking-[0.22em] text-stone-400">
                Premium Inkjet & Printing Services
              </p>
              <h1 className="mb-8 break-words text-4xl font-normal leading-tight tracking-tight text-stone-900 md:text-5xl lg:text-6xl">
                สร้างสรรค์งานพิมพ์ <br />
                <span className="font-medium">เหนือระดับเพื่อแบรนด์คุณ</span>
              </h1>
              <p className="mx-auto mb-12 max-w-2xl text-lg font-light leading-relaxed text-stone-500">
                เราคือโรงพิมพ์อิงค์เจ็ทที่เน้นความพิถีพิถันในทุกรายละเอียด
                ตั้งแต่การเลือกวัสดุไปจนถึงเทคโนโลยีการพิมพ์ที่ทันสมัยที่สุด
                เพื่อส่งมอบผลงานที่สมบูรณ์แบบ
              </p>
              <HeroCtaRow />
            </div>
          </div>
        </div>
      </section>

      <section id="section-philosophy" className="bg-white py-24">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <PageEyebrow>Our Philosophy</PageEyebrow>
          <h2 className="text-3xl font-normal leading-snug text-stone-900 md:text-[2.25rem]">
            นิยามใหม่ของงานพิมพ์{" "}
            <span className="italic text-stone-600">ที่สะท้อนคุณค่า</span>
          </h2>
          <p className="mt-8 text-base font-light leading-relaxed text-stone-500">
            ที่ LabelCraft Studio เราไม่ได้เพียงแค่ผลิตสื่อสิ่งพิมพ์ แต่เราสร้างสรรค์
            &quot;มูลค่า&quot; ผ่านนวัตกรรมการพิมพ์ที่ทันสมัย ควบคู่ไปกับดีไซน์มินิมอลที่เรียบหรู
            ทุกชิ้นงานคือตัวแทนภาพลักษณ์ของแบรนด์คุณ
          </p>
        </div>
      </section>

      <section
        id="section-expertise"
        className="bg-stone-900 py-24 text-white"
      >
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <PageSectionTitle className="!text-white">
            ความเชี่ยวชาญของเรา
          </PageSectionTitle>
          <div className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-5">
            <div className="rounded-lg border border-stone-700/80 bg-stone-900/50 p-10 text-left transition-colors hover:border-stone-600 hover:bg-stone-800/40">
              <h3 className="mb-3 text-lg font-medium tracking-wide">
                Commercial
              </h3>
              <p className="text-sm font-light leading-relaxed text-stone-400">
                งานพิมพ์สื่อโฆษณา ป้าย แบนเนอร์ สำหรับห้างสรรพสินค้าและหน้าร้าน
              </p>
            </div>
            <div className="rounded-lg border border-stone-700/80 bg-stone-900/50 p-10 text-left transition-colors hover:border-stone-600 hover:bg-stone-800/40">
              <h3 className="mb-3 text-lg font-medium tracking-wide">
                Packaging
              </h3>
              <p className="text-sm font-light leading-relaxed text-stone-400">
                บรรจุภัณฑ์ กล่อง ฉลากสินค้า ที่ช่วยยกระดับแบรนด์ให้ดูพรีเมียม
              </p>
            </div>
            <div className="rounded-lg border border-stone-700/80 bg-stone-900/50 p-10 text-left transition-colors hover:border-stone-600 hover:bg-stone-800/40">
              <h3 className="mb-3 text-lg font-medium tracking-wide">
                Custom & Exhibition
              </h3>
              <p className="text-sm font-light leading-relaxed text-stone-400">
                งานพิมพ์โครงสร้าง งานนิทรรศการ พิมพ์ลงวัสดุพิเศษตามสั่ง
              </p>
            </div>
          </div>
        </div>
      </section>

      <section
        id="section-services"
        className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8"
      >
        <div className="grid grid-cols-1 gap-20 lg:grid-cols-2">
          <div>
            <PageEyebrow align="left">Services</PageEyebrow>
            <PageSectionTitle
              align="left"
              className="leading-snug md:text-[2.25rem]"
            >
              บริการครบวงจร
              <br />
              <span className="text-stone-600">ตอบโจทย์ทุกธุรกิจ</span>
            </PageSectionTitle>
            <p className="mb-8 mt-6 font-light leading-relaxed text-stone-500">
              ไม่ว่าจะเป็นงานพิมพ์สเกลเล็กที่ต้องการความละเอียดสูง
              หรืองานพิมพ์ป้ายโฆษณาขนาดใหญ่ เรามีเครื่องจักรและทีมผู้เชี่ยวชาญพร้อมเนรมิตไอเดียของคุณให้เป็นจริง
            </p>
            <Link
              href="/services"
              className="group inline-flex items-center text-sm font-medium text-stone-900"
            >
              ดูรายละเอียดเพิ่มเติม{" "}
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-2" />
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2">
            {homeServices.map((item) => (
              <Link
                key={item.slug}
                href={`/services/${item.slug}`}
                className="group cursor-pointer rounded-lg p-2 transition-colors hover:bg-white hover:shadow-[0_12px_40px_-16px_rgba(0,0,0,0.1)] hover:ring-1 hover:ring-stone-200/80"
              >
                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-lg bg-white shadow-sm ring-1 ring-stone-200/80 transition-colors duration-300 group-hover:bg-stone-900 group-hover:text-white group-hover:ring-0">
                  <CheckCircle2 className="h-5 w-5" aria-hidden />
                </div>
                <h3 className="mb-2 text-base font-medium text-stone-900">
                  {item.title}
                </h3>
                <p className="line-clamp-2 text-sm font-light text-stone-500">
                  {item.desc}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section
        id="section-featured"
        className="border-t border-stone-200/80 bg-stone-50 py-24"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 flex items-end justify-between">
            <div>
              <PageEyebrow align="left" className="!mb-3">
                Featured Work
              </PageEyebrow>
              <PageSectionTitle align="left">ผลงานที่โดดเด่น</PageSectionTitle>
            </div>
            <span className="hidden text-sm text-stone-500 sm:block">
              ดูผลงานทั้งหมด
            </span>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {featured.map((item) => (
              <div
                key={item.title}
                className="group relative flex aspect-[4/3] flex-col justify-end overflow-hidden rounded-[10px] bg-stone-100 p-8 shadow-sm ring-1 ring-stone-200/60"
              >
                <Image
                  src={item.imageSrc}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/20 to-black/0" />
                <div className="relative min-w-0">
                  <span className="text-lg text-white break-words">
                    {item.title}
                  </span>
                  <p className="mt-1 text-sm font-light text-stone-100">
                    {item.subtitle}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ClientMarquee
        id="section-clients"
        title="แบรนด์ที่ไว้วางใจเรา"
      />
    </>
  );
}
