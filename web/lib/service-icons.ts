import type { LucideIcon } from "lucide-react";
import {
  Award,
  BadgeCheck,
  BookOpen,
  CreditCard,
  Droplets,
  FileText,
  Layers2,
  LayoutGrid,
  Package,
  PackageOpen,
  Palette,
  PanelsTopLeft,
  PenLine,
  Printer,
  Ruler,
  Send,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  SquareStack,
  SunMedium,
  Tag,
  Trees,
  Truck,
} from "lucide-react";

/** ไอคอนหลักต่อบริการ — หน้า hero / การ์ดรายการ */
export const SERVICE_ICONS: Record<string, LucideIcon> = {
  sticker: Tag,
  card: CreditCard,
  bag: ShoppingBag,
  vinyl: PanelsTopLeft,
  uv: Sparkles,
  box: Package,
  foam: LayoutGrid,
  plastwood: Trees,
  brochure: BookOpen,
};

/** ไอคอนประกอบแต่ละหัวข้อ highlights (ลำดับตรงกับข้อมูลใน services) */
export const SERVICE_HIGHLIGHT_ICONS: Record<string, LucideIcon[]> = {
  sticker: [Layers2, Palette, Package],
  card: [PenLine, Award, Ruler],
  bag: [Truck, Palette, Package],
  vinyl: [SunMedium, Ruler, Layers2],
  uv: [Sparkles, Layers2, PenLine],
  box: [Package, ShieldCheck, Palette],
  foam: [LayoutGrid, SquareStack, Palette],
  plastwood: [Trees, Droplets, ShieldCheck],
  brochure: [FileText, BookOpen, Layers2],
};

/** ไอคอนขั้นตอน 01–04 */
export const PROCESS_STEP_ICONS: LucideIcon[] = [
  Send,
  BadgeCheck,
  Printer,
  PackageOpen,
];

export function getServiceIcon(id: string): LucideIcon {
  return SERVICE_ICONS[id] ?? Package;
}

export function getServiceHighlightIcons(id: string): LucideIcon[] {
  return SERVICE_HIGHLIGHT_ICONS[id] ?? [Layers2, Sparkles, Award];
}
