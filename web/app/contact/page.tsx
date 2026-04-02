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
  title: "ติดต่อเรา | LuxePrint",
  description: "ปรึกษางานพิมพ์ ขอใบเสนอราคา ติดต่อ LuxePrint",
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
              <p className="mb-2 flex items-center font-light text-stone-800">
                <Phone className="mr-3 h-5 w-5 text-stone-400" aria-hidden />
                02-XXX-XXXX, 081-XXX-XXXX
              </p>
              <p className="flex items-center font-light text-stone-800">
                <Mail className="mr-3 h-5 w-5 text-stone-400" aria-hidden />
                hello@luxeprint.com
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

          <div className="flex h-64 items-center justify-center rounded-lg border border-stone-200 bg-stone-50">
            <span className="flex items-center font-light text-stone-400">
              <MapPin className="mr-2 h-5 w-5" aria-hidden />
              [พื้นที่สำหรับใส่ Google Maps Embed]
            </span>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
