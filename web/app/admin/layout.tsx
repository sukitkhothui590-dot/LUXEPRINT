import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin | LabelCraft Studio",
  robots: { index: false, follow: false },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-dvh bg-stone-100 text-stone-800">{children}</div>
  );
}
