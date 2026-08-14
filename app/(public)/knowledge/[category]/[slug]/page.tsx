import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import {
  getArticleBySlug,
  getPublishedArticles,
  getRelatedArticles,
  getRelatedProducts,
} from '@/lib/data';
import { siteConfig } from '@/lib/constants';
import { ContentBlocks } from '@/components/content/content-blocks';
import { FaqAccordion } from '@/components/content/faq-accordion';
import { RelatedList } from '@/components/product/related-list';
import { Breadcrumbs } from '@/components/layout/breadcrumbs';
import { ArticleSchema, BreadcrumbSchema, FaqSchema } from '@/components/seo/schemas';
import { CoverImage } from '@/components/media/cover-image';
import { getMediaById } from '@/lib/media';
import { ViewCounter } from '@/components/analytics/view-counter';
import type { ContentBlock } from '@/lib/content-blocks';

export const revalidate = 3600;
export const dynamicParams = false;

type PageProps = {
  params: { category: string; slug: string };
};

export async function generateStaticParams(): Promise<{ category: string; slug: string }[]> {
  const articles = await getPublishedArticles();
  return articles.map((article) => ({
    category: article.category?.slug ?? 'articles',
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const article = await getArticleBySlug(params.slug);
  if (!article) return {};
  const cover = await getMediaById(article.coverImageId);
  const categorySlug = article.category?.slug ?? 'articles';
  const title = article.seoTitle ?? `${article.title} | ${siteConfig.name}`;
  const description = article.seoDescription ?? article.excerpt ?? undefined;
  const url = `${siteConfig.url}/knowledge/${categorySlug}/${article.slug}`;
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: url },
    openGraph: {
      type: 'article',
      url,
      siteName: siteConfig.name,
      title,
      description: description ?? undefined,
      publishedTime: article.publishedAt?.toISOString(),
      modifiedTime: article.updatedAt?.toISOString(),
      authors: article.author ? [article.author] : undefined,
      images: cover?.url ? [{ url: cover.url, alt: cover.alt }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: description ?? undefined,
      images: cover?.url ? [cover.url] : undefined,
    },
  };
}

export default async function ArticlePage({ params }: PageProps) {
  const article = await getArticleBySlug(params.slug);
  if (!article) notFound();

  const categorySlug = article.category?.slug ?? 'articles';
  if (params.category !== categorySlug) notFound();

  const categoryName = article.category?.name ?? 'Articles';
  const url = `${siteConfig.url}/knowledge/${categorySlug}/${article.slug}`;
  const blocks = Array.isArray(article.body) ? (article.body as ContentBlock[]) : [];
  const faqs = Array.isArray(article.faqs)
    ? (article.faqs as Array<{ question: string; answer: string }>)
    : [];
  const [relatedArticles, relatedProducts, cover] = await Promise.all([
    getRelatedArticles(article.relatedArticleIds, article.slug),
    getRelatedProducts(article.relatedProductIds, article.slug),
    getMediaById(article.coverImageId),
  ]);

  return (
    <>
      <BreadcrumbSchema
        items={[
          { label: 'Home', href: `${siteConfig.url}/` },
          { label: 'Knowledge', href: `${siteConfig.url}/knowledge` },
          { label: categoryName, href: `${siteConfig.url}/knowledge/${categorySlug}` },
          { label: article.title, href: url },
        ]}
      />
      <ArticleSchema
        headline={article.title}
        description={article.excerpt}
        url={url}
        author={article.author}
        datePublished={article.publishedAt?.toISOString()}
        dateModified={article.updatedAt?.toISOString()}
        image={cover?.url}
      />
      <FaqSchema faqs={faqs} />
      <div className="container py-12">
        <Breadcrumbs
          items={[
            { label: 'Knowledge', href: '/knowledge' },
            { label: categoryName, href: `/knowledge/${categorySlug}` },
            { label: article.title },
          ]}
        />
        <article className="mx-auto max-w-3xl">
          <ViewCounter slug={article.slug} />
          <a
            href={`/knowledge/${categorySlug}`}
            className="eyebrow text-brand-600 hover:text-brand-700"
          >
            {categoryName}
          </a>
          <h1 className="mt-3 text-balance text-3xl font-bold tracking-tight text-ink-900 sm:text-4xl">
            {article.title}
          </h1>
          <p className="mt-4 text-sm text-ink-500">
            By {article.author}
            {article.publishedAt &&
              ` · ${article.publishedAt.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}`}
            {article.readTimeMinutes && ` · ${article.readTimeMinutes} min read`}
            {article.views > 0 && ` · ${article.views} views`}
          </p>
          {article.excerpt && (
            <p className="mt-6 text-lg leading-relaxed text-ink-600">{article.excerpt}</p>
          )}
          {article.coverImageId && (
            <div className="mt-8">
              <CoverImage
                mediaId={article.coverImageId}
                alt={cover?.alt ?? article.title}
                className="aspect-video w-full rounded-2xl border border-ink-200 object-cover"
              />
            </div>
          )}
          <div className="prose-content mt-8">
            <ContentBlocks blocks={blocks} />
          </div>
          {faqs.length > 0 && <FaqAccordion faqs={faqs} />}
        </article>
        {relatedArticles.length > 0 && (
          <div className="mt-14">
            <RelatedList
              items={relatedArticles.map((a) => ({
                id: a.id,
                title: a.title,
                description: a.excerpt,
                href: `/knowledge/${a.category?.slug ?? 'articles'}/${a.slug}`,
              }))}
              title="Related reading"
            />
          </div>
        )}
        {relatedProducts.length > 0 && (
          <div className="mt-14">
            <RelatedList
              items={relatedProducts.map((p) => ({
                id: p.id,
                title: p.title,
                description: p.seoDescription,
                href: p.type === 'SERVICE' ? `/services/${p.slug}` : `/products/${p.slug}`,
              }))}
              title="Related products & services"
            />
          </div>
        )}
      </div>
    </>
  );
}
