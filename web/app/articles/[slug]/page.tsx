import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import {
  PageEyebrow,
  PageLayout,
  PageTitle,
} from "@/components/PageBlocks";
import { getArticleBySlug, mockArticles } from "@/lib/mock-articles";
import { notFound } from "next/navigation";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return mockArticles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return { title: "ไม่พบบทความ | LuxePrint" };
  return {
    title: `${article.title} | LuxePrint`,
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
  const article = getArticleBySlug(slug);
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
      <p className="mb-4 text-sm text-stone-400">
        {formatDate(article.publishedAt)}
        <span className="mx-2 text-stone-300">·</span>
        อ่านประมาณ {article.readTimeMin} นาที
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

      <div className="space-y-6 text-left font-light leading-relaxed text-stone-600">
        {article.body.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>
    </PageLayout>
  );
}
