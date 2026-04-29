import type { Metadata, Viewport } from "next";
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

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  title: "LabelCraft Studio - Premium Inkjet & Printing Services",
  description:
    "โรงพิมพ์อิงค์เจ็ทระดับพรีเมียม งานพิมพ์คุณภาพสูงสำหรับแบรนด์ของคุณ",
  icons: {
    icon: "/logo/Gemini_Generated_Image_b9ghnkb9ghnkb9gh.png?v=3",
    shortcut: "/logo/Gemini_Generated_Image_b9ghnkb9ghnkb9gh.png?v=3",
    apple: "/logo/Gemini_Generated_Image_b9ghnkb9ghnkb9gh.png?v=3",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th" className="h-full overflow-x-clip antialiased">
      <body
        className={`${notoSansThai.className} min-h-full min-w-0 overflow-x-clip flex flex-col bg-stone-100 text-stone-800 selection:bg-stone-900 selection:text-white`}
      >
        <SiteNav />
        <main className="min-w-0 flex-1 overflow-x-clip">{children}</main>
        <SiteFooter />
        <FloatingDock />
      </body>
    </html>
  );
}
