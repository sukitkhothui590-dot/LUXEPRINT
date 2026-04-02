import type { Metadata } from "next";
import { Noto_Sans_Thai } from "next/font/google";
import "./globals.css";
import { FloatingDock } from "@/components/FloatingDock";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteNav } from "@/components/SiteNav";

const notoSansThai = Noto_Sans_Thai({
  subsets: ["latin", "thai"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: "LuxePrint - Premium Inkjet & Printing Services",
  description:
    "โรงพิมพ์อิงค์เจ็ทระดับพรีเมียม งานพิมพ์คุณภาพสูงสำหรับแบรนด์ของคุณ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th" className="h-full antialiased">
      <body
        className={`${notoSansThai.className} min-h-full flex flex-col bg-stone-100 text-stone-800 selection:bg-stone-900 selection:text-white`}
      >
        <SiteNav />
        <main className="flex-1">{children}</main>
        <SiteFooter />
        <FloatingDock />
      </body>
    </html>
  );
}
