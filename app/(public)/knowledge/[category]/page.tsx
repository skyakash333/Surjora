import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getArticlesByCategory, getKnowledgeCategories } from '@/lib/data';
import { buildMetadata } from '@/lib/seo';
import { ArticleCard } from '@/components/content/article-card';
import { Breadcrumbs } from '@/components/layout/breadcrumbs';
import { BreadcrumbSchema } from '@/components/seo/schemas';
import { siteConfig } from '@/lib/constants';

export const revalidate = 3600;

type PageProps = {
  params: { category: string };
};

export async function generateStaticParams(): Promise<{ category: string }[]> {
  const categories = await getKnowledgeCategories();
  return categories.map((c) => ({ category: c.slug }));
}

async function getCategory(slug: string) {
  const categories = await getKnowledgeCategories();
  return categories.find((c) => c.slug === slug) ?? null;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const category = await getCategory(params.category);
  if (!category) return {};
  return buildMetadata({
    title: category.name,
    description: category.description ?? `${category.name} articles on Surjora Knowledge Hub.`,
    path: `/knowledge/${category.slug}`,
  });
}

export default async function KnowledgeCategoryPage({ params }: PageProps) {
  const category = await getCategory(params.category);
  if (!category) notFound();

  const articles = await getArticlesByCategory(category.slug);

  return (
    <>
      <BreadcrumbSchema
        items={[
          { label: 'Home', href: `${siteConfig.url}/` },
          { label: 'Knowledge', href: `${siteConfig.url}/knowledge` },
          { label: category.name, href: `${siteConfig.url}/knowledge/${category.slug}` },
        ]}
      />
      <div className="container py-12">
        <Breadcrumbs
          items={[{ label: 'Knowledge', href: '/knowledge' }, { label: category.name }]}
        />
        <h1 className="text-4xl font-bold tracking-tight text-ink-900">{category.name}</h1>
        {category.description && (
          <p className="mt-4 max-w-2xl text-lg text-ink-600">{category.description}</p>
        )}

        {articles.length === 0 ? (
          <p className="mt-10 rounded-lg border border-ink-200 bg-white p-8 text-ink-600">
            No articles in this category yet. Check back soon.
          </p>
        ) : (
          <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {articles.map((article) => (
              <ArticleCard
                key={article.id}
                slug={article.slug}
                title={article.title}
                excerpt={article.excerpt}
                categoryName={category.name}
                categorySlug={category.slug}
                readTimeMinutes={article.readTimeMinutes}
                publishedAt={article.publishedAt?.toISOString() ?? null}
              />
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
