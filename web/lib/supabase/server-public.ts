import { createClient } from "@supabase/supabase-js";
import { isSupabaseConfigured } from "@/lib/supabase/config";

/**
 * อ่านข้อมูลสาธารณะ (เช่น articles ที่ publish) โดยไม่ใช้ cookies()
 * — ใช้ได้ใน generateStaticParams / build ที่ไม่มี request
 */
export function createPublicSupabaseClient() {
  if (!isSupabaseConfigured()) {
    throw new Error(
      "Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY",
    );
  }
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
}
