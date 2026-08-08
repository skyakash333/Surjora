import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getArticleBySlug, getPublishedArticles, getRelatedArticles } from '@/lib/data';
import { siteConfig } from '@/lib/constants';
import { ContentBlocks } from '@/components/content/content-blocks';
import { RelatedList } from '@/components/product/related-list';
import { Breadcrumbs } from '@/components/layout/breadcrumbs';
import { BreadcrumbSchema } from '@/components/seo/schemas';
import type { ContentBlock } from '@/lib/content-blocks';

export const revalidate = 3600;

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
  return {
    title: article.seoTitle ?? `${article.title} | ${siteConfig.name}`,
    description: article.seoDescription ?? article.excerpt ?? undefined,
  };
}

export default async function ArticlePage({ params }: PageProps) {
  const article = await getArticleBySlug(params.slug);
  if (!article) notFound();

  const categorySlug = article.category?.slug ?? 'articles';
  const categoryName = article.category?.name ?? 'Articles';
  const url = `${siteConfig.url}/knowledge/${categorySlug}/${article.slug}`;
  const blocks = Array.isArray(article.body) ? (article.body as ContentBlock[]) : [];
  const related = await getRelatedArticles(article.relatedArticleIds, article.slug);

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
      <div className="container py-12">
        <Breadcrumbs
          items={[
            { label: 'Knowledge', href: '/knowledge' },
            { label: categoryName, href: `/knowledge/${categorySlug}` },
            { label: article.title },
          ]}
        />
        <article className="mx-auto max-w-3xl">
          <span className="text-xs font-semibold uppercase tracking-wide text-brand-600">
            {categoryName}
          </span>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-ink-900">{article.title}</h1>
          <p className="mt-4 text-sm text-ink-500">
            By {article.author}
            {article.publishedAt && ` · ${article.publishedAt.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}`}
            {article.readTimeMinutes && ` · ${article.readTimeMinutes} min read`}
          </p>
          {article.excerpt && <p className="mt-6 text-lg text-ink-600">{article.excerpt}</p>}
          <div className="mt-8">
            <ContentBlocks blocks={blocks} />
          </div>
        </article>
        {related.length > 0 && (
          <div className="mt-14">
            <RelatedList
              items={related.map((a) => ({
                id: a.id,
                title: a.title,
                description: a.excerpt,
                href: `/knowledge/${a.category?.slug ?? 'articles'}/${a.slug}`,
              }))}
              title="Related reading"
            />
          </div>
        )}
      </div>
    </>
  );
}
