import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getArticlesByCategory, getKnowledgeCategories } from '@/lib/data';
import { buildMetadata } from '@/lib/seo';
import { ArticleCard } from '@/components/content/article-card';
import { Breadcrumbs } from '@/components/layout/breadcrumbs';
import { SectionHeading } from '@/components/ui/section-heading';
import { EmptyState } from '@/components/ui/empty-state';
import { CtaSection } from '@/components/marketing/cta-section';
import { BreadcrumbSchema } from '@/components/seo/schemas';
import { siteConfig } from '@/lib/constants';

export const revalidate = 3600;

type PageProps = {
  params: { category: string };
};

export function generateStaticParams(): [] {
  return [];
}

async function getCategory(slug: string) {
  const categories = await getKnowledgeCategories();
  return categories.find((c) => c.slug === slug) ?? null;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const category = await getCategory(params.category);
  if (!category) notFound();
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
        <SectionHeading
          as="h1"
          eyebrow="Knowledge Hub"
          title={category.name}
          description={
            category.description ??
            `${category.name} articles, guides and tutorials from the Surjora Knowledge Hub.`
          }
        />

        {articles.length === 0 ? (
          <div className="mt-10">
            <EmptyState
              title="No articles here yet"
              description="This category is still being written. Check back soon or contact us with your questions."
              action={{ label: 'Contact us', href: '/contact' }}
            />
          </div>
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

      <CtaSection
        title="Have a question we haven't covered?"
        description="Tell us what you're trying to do with a Chinese platform and we'll point you the right way."
      />
    </>
  );
}
