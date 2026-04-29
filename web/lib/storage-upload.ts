import type { SupabaseClient } from "@supabase/supabase-js";

/** อัปโหลดรูปปกจาก data URL ไป bucket article-covers — คืน public URL */
export async function uploadCoverFromDataUrl(
  supabase: SupabaseClient,
  articleId: string,
  dataUrl: string,
): Promise<string> {
  const res = await fetch(dataUrl);
  const blob = await res.blob();
  const ext =
    blob.type.includes("png") ? "png" : blob.type.includes("webp") ? "webp" : "jpg";
  const path = `${articleId}/cover.${ext}`;
  const { error } = await supabase.storage
    .from("article-covers")
    .upload(path, blob, {
      contentType: blob.type || "image/jpeg",
      upsert: true,
    });
  if (error) throw error;
  const { data } = supabase.storage.from("article-covers").getPublicUrl(path);
  return data.publicUrl;
}

/** รูปในเนื้อหาบทความ — เก็บใต้ {articleId}/body/ */
export async function uploadBodyImageFromDataUrl(
  supabase: SupabaseClient,
  articleId: string,
  dataUrl: string,
): Promise<string> {
  const res = await fetch(dataUrl);
  const blob = await res.blob();
  const id = crypto.randomUUID();
  const ext = blob.type.includes("png")
    ? "png"
    : blob.type.includes("webp")
      ? "webp"
      : "jpg";
  const path = `${articleId}/body/${id}.${ext}`;
  const { error } = await supabase.storage
    .from("article-covers")
    .upload(path, blob, {
      contentType: blob.type || "image/jpeg",
      upsert: false,
    });
  if (error) throw error;
  const { data } = supabase.storage.from("article-covers").getPublicUrl(path);
  return data.publicUrl;
}
