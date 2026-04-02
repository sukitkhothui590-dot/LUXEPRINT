import Link from "next/link";
import {
  PageEyebrow,
  PageLayout,
  PageTitle,
  btnPrimaryClassName,
} from "@/components/PageBlocks";

export default function NotFound() {
  return (
    <PageLayout maxWidthClass="max-w-lg">
      <PageEyebrow>404</PageEyebrow>
      <PageTitle className="mb-6">ไม่พบหน้าที่ต้องการ</PageTitle>
      <p className="mb-10 text-center font-light text-stone-500">
        ลิงก์อาจหมดอายุหรือพิมพ์ที่อยู่ไม่ถูกต้อง
      </p>
      <div className="flex justify-center">
        <Link href="/" className={btnPrimaryClassName("min-h-[48px]")}>
          กลับหน้าแรก
        </Link>
      </div>
    </PageLayout>
  );
}
