import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import { ArticleViewCounter } from "@/components/ArticleViewCounter";
import {
  PageEyebrow,
  PageLayout,
  PageTitle,
} from "@/components/PageBlocks";
import { getPublishedArticleDetail, getPublishedSlugs } from "@/lib/articles-public";
import { notFound } from "next/navigation";

type Props = { params: Promise<{ slug: string }> };

export const revalidate = 60;

export async function generateStaticParams() {
  const slugs = await getPublishedSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = await getPublishedArticleDetail(slug);
  if (!article) return { title: "ไม่พบบทความ | LabelCraft Studio" };
  return {
    title: `${article.title} | LabelCraft Studio`,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      images: [{ url: article.coverImageUrl, alt: article.coverImageAlt }],
    },
  };
}

function formatDate(iso: string) {
  return new Date(iso + "T12:00:00").toLocaleDateString("th-TH", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function ArticleDetailPage({ params }: Props) {
  const { slug } = await params;
  const article = await getPublishedArticleDetail(slug);
  if (!article) notFound();

  return (
    <PageLayout maxWidthClass="max-w-3xl">
      <Link
        href="/articles"
        className="mb-10 inline-flex items-center gap-2 text-sm font-medium text-stone-500 transition-colors hover:text-stone-900"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden />
        กลับไปรายการบทความ
      </Link>

      <PageEyebrow align="left">Blog</PageEyebrow>
      <p className="mb-4 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-stone-400">
        <span>{formatDate(article.publishedAt)}</span>
        <span className="text-stone-300" aria-hidden>
          ·
        </span>
        <span>อ่านประมาณ {article.readTimeMin} นาที</span>
        <span className="text-stone-300" aria-hidden>
          ·
        </span>
        <ArticleViewCounter
          slug={slug}
          initialCount={article.viewCount}
          className="text-stone-400"
        />
      </p>
      <PageTitle align="left" className="mb-8 text-left">
        {article.title}
      </PageTitle>

      <div className="relative mb-12 aspect-[21/9] w-full overflow-hidden rounded-xl bg-stone-200 sm:aspect-[2/1]">
        <Image
          src={article.coverImageUrl}
          alt={article.coverImageAlt}
          fill
          priority
          sizes="(max-width: 768px) 100vw, 768px"
          className="object-cover"
        />
      </div>

      <div
        className="article-html break-words text-left font-light leading-relaxed text-stone-600"
        dangerouslySetInnerHTML={{ __html: article.bodyHtml }}
      />
    </PageLayout>
  );
}
