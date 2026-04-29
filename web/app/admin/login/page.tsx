import { Suspense } from "react";
import { AdminLoginForm } from "./LoginForm";

export default function AdminLoginPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[calc(100dvh-3.5rem)] items-center justify-center text-sm text-stone-500">
          กำลังโหลด…
        </div>
      }
    >
      <AdminLoginForm />
    </Suspense>
  );
}
