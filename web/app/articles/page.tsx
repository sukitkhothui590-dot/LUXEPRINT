import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, Eye } from "lucide-react";
import {
  PageEyebrow,
  PageLayout,
  PageLead,
  PageTitle,
} from "@/components/PageBlocks";
import { getPublishedArticlesList } from "@/lib/articles-public";

export const metadata: Metadata = {
  title: "บทความ | LabelCraft Studio",
  description: "เคล็ดลับ ข่าวสาร และความรู้ด้านงานพิมพ์จาก LabelCraft Studio",
};

export const revalidate = 60;

function formatDate(iso: string) {
  return new Date(iso + "T12:00:00").toLocaleDateString("th-TH", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default async function ArticlesPage() {
  const list = await getPublishedArticlesList();

  return (
    <PageLayout>
      <div className="mb-20 text-center md:mb-24">
        <PageEyebrow>Blog</PageEyebrow>
        <PageTitle className="mb-6">บทความ</PageTitle>
        <PageLead className="mx-auto max-w-2xl">
          เคล็ดลับการเตรียมไฟล์ เลือกวัสดุ และไอเดียบรรจุภัณฑ์สำหรับแบรนด์ของคุณ
        </PageLead>
      </div>

      <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {list.map((a) => (
          <li key={a.slug}>
            <Link
              href={`/articles/${a.slug}`}
              className="group flex h-full flex-col overflow-hidden rounded-lg border border-stone-200/90 bg-stone-50/50 transition-colors hover:border-stone-900 hover:bg-white"
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-stone-200">
                <Image
                  src={a.coverImageUrl}
                  alt={a.coverImageAlt}
                  fill
                  sizes="(max-width: 640px) 100vw, 50vw"
                  className="object-cover transition duration-500 group-hover:scale-[1.03]"
                />
              </div>
              <div className="flex flex-1 flex-col justify-between p-6 sm:p-8">
                <div>
                  <p className="mb-3 flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs text-stone-400">
                    <span>{formatDate(a.publishedAt)}</span>
                    <span className="text-stone-300" aria-hidden>
                      ·
                    </span>
                    <span>อ่าน {a.readTimeMin} นาที</span>
                    <span className="text-stone-300" aria-hidden>
                      ·
                    </span>
                    <span className="inline-flex items-center gap-0.5 tabular-nums">
                      <Eye className="h-3 w-3" aria-hidden />
                      {a.viewCount.toLocaleString("th-TH")}
                    </span>
                  </p>
                  <h2 className="break-words text-xl font-medium text-stone-900">
                    {a.title}
                  </h2>
                  <p className="mt-3 line-clamp-3 text-sm font-light leading-relaxed text-stone-500">
                    {a.excerpt}
                  </p>
                </div>
                <span className="mt-8 flex items-center text-sm font-medium text-stone-900">
                  อ่านต่อ
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </PageLayout>
  );
}
