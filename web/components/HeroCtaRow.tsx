import Link from "next/link";
import { btnPrimaryClassName, btnSecondaryClassName } from "@/components/PageBlocks";

type Props = {
  className?: string;
};

/** คู่ CTA มาตรฐาน: ดูบริการทั้งหมด + ปรึกษาประเมินราคา */
export function HeroCtaRow({ className }: Props) {
  return (
    <div
      className={`mx-auto mt-2 flex w-full max-w-md flex-col items-stretch justify-center gap-4 sm:max-w-none sm:flex-row sm:items-center sm:gap-6 ${className ?? ""}`}
    >
      <Link
        href="/services"
        className={btnPrimaryClassName(
          "whitespace-normal text-balance sm:min-w-[220px] sm:px-10",
        )}
      >
        ดูบริการทั้งหมด
      </Link>
      <Link
        href="/contact"
        className={btnSecondaryClassName(
          "whitespace-normal text-balance sm:min-w-[220px] sm:px-10",
        )}
      >
        ปรึกษาประเมินราคา
      </Link>
    </div>
  );
}
