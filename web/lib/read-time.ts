/** ประมาณเวลาอ่านจาก HTML (คำ ~200 คำต่อนาที) */
export function estimateReadTimeMin(html: string): number {
  const text = html
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  const words = text.split(/\s/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}
