"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";
import { ADMIN_SESSION_KEY } from "@/lib/mock-admin";

export function AdminArticlesGate({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [ok, setOk] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem(ADMIN_SESSION_KEY) !== "1") {
      router.replace("/admin/login");
      return;
    }
    setOk(true);
  }, [router]);

  if (!ok) {
    return (
      <div className="flex min-h-dvh items-center justify-center bg-stone-100 text-sm text-stone-500">
        กำลังโหลด…
      </div>
    );
  }

  return <>{children}</>;
}
