import type { Metadata } from "next";
import { MapPin, Mail, Phone } from "lucide-react";
import { ContactForm } from "@/components/ContactForm";
import {
  PageEyebrow,
  PageLayout,
  PageLead,
  PageTitle,
} from "@/components/PageBlocks";

export const metadata: Metadata = {
  title: "ติดต่อเรา | LabelCraft Studio",
  description: "ปรึกษางานพิมพ์ ขอใบเสนอราคา ติดต่อ LabelCraft Studio",
};

export default function ContactPage() {
  return (
    <PageLayout maxWidthClass="max-w-5xl">
      <div className="mb-20 text-center md:mb-24">
        <PageEyebrow>Start your project</PageEyebrow>
        <PageTitle className="mb-6">
          ปรึกษาเราเกี่ยวกับงานพิมพ์ของคุณ
        </PageTitle>
        <PageLead>
          ทีมงานของเราพร้อมให้คำแนะนำและประเมินราคางานเบื้องต้นให้คุณ
        </PageLead>
      </div>

      <div className="grid grid-cols-1 gap-16 md:grid-cols-2">
        <ContactForm />

        <div className="space-y-12">
          <div className="space-y-6">
            <div>
              <h2 className="mb-2 text-[11px] font-medium uppercase tracking-[0.22em] text-stone-400">
                ที่อยู่โรงพิมพ์
              </h2>
              <p className="flex items-start font-light text-stone-800">
                <MapPin
                  className="mr-3 mt-0.5 h-5 w-5 shrink-0 text-stone-400"
                  aria-hidden
                />
                <span>
                  123 ถนนสุขุมวิท แขวงคลองเตยเหนือ
                  <br />
                  เขตวัฒนา กรุงเทพมหานคร 10110
                </span>
              </p>
            </div>
            <div>
              <h2 className="mb-2 text-[11px] font-medium uppercase tracking-[0.22em] text-stone-400">
                ติดต่อด่วน
              </h2>
              <p className="mb-2 flex items-start font-light text-stone-800">
                <Phone
                  className="mr-3 mt-0.5 h-5 w-5 shrink-0 text-stone-400"
                  aria-hidden
                />
                <span className="min-w-0 break-words">
                  02-XXX-XXXX, 081-XXX-XXXX
                </span>
              </p>
              <p className="flex items-center font-light text-stone-800">
                <Mail className="mr-3 h-5 w-5 shrink-0 text-stone-400" aria-hidden />
                <span className="min-w-0 break-all">
                  hello@labelcraftstudio.com
                </span>
              </p>
            </div>
            <div>
              <h2 className="mb-2 text-[11px] font-medium uppercase tracking-[0.22em] text-stone-400">
                เวลาทำการ
              </h2>
              <p className="font-light text-stone-800">
                จันทร์ - เสาร์: 09:00 - 18:00 น.
                <br />
                (หยุดวันอาทิตย์และวันหยุดนักขัตฤกษ์)
              </p>
            </div>
          </div>

          <div className="min-h-56 min-w-0 overflow-hidden rounded-lg border border-stone-200 bg-stone-50 sm:min-h-64">
            <iframe
              title="แผนที่ LabelCraft Studio"
              src="https://www.google.com/maps?q=123%20%E0%B8%96%E0%B8%99%E0%B8%99%E0%B8%AA%E0%B8%B8%E0%B8%82%E0%B8%B8%E0%B8%A1%E0%B8%A7%E0%B8%B4%E0%B8%97%20%E0%B9%81%E0%B8%82%E0%B8%A7%E0%B8%87%E0%B8%84%E0%B8%A5%E0%B8%AD%E0%B8%87%E0%B9%80%E0%B8%95%E0%B8%A2%20%E0%B9%80%E0%B8%82%E0%B8%95%E0%B8%A7%E0%B8%B1%E0%B8%92%E0%B8%99%E0%B8%B2%20%E0%B8%81%E0%B8%A3%E0%B8%B8%E0%B8%87%E0%B9%80%E0%B8%97%E0%B8%9E%E0%B8%A1%E0%B8%AB%E0%B8%B2%E0%B8%99%E0%B8%84%E0%B8%A3%2010110&z=15&output=embed"
              className="h-56 w-full min-w-0 border-0 sm:h-64"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
