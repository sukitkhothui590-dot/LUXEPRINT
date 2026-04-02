import { AdminArticlesGate } from "@/components/admin/AdminArticlesGate";
import { AdminSidebar } from "@/components/admin/AdminSidebar";

export default function AdminArticlesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminArticlesGate>
      <div className="flex min-h-[calc(100dvh-0)] flex-col md:flex-row">
        <AdminSidebar />
        <main className="min-h-0 flex-1 overflow-auto bg-stone-50/80">
          {children}
        </main>
      </div>
    </AdminArticlesGate>
  );
}
