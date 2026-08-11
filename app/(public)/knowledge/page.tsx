import { getKnowledgeCategories, getPublishedArticles } from '@/lib/data';
import { buildMetadata } from '@/lib/seo';
import { siteConfig } from '@/lib/constants';
import { ArticleCard } from '@/components/content/article-card';
import { Breadcrumbs } from '@/components/layout/breadcrumbs';
import { SectionHeading } from '@/components/ui/section-heading';
import { EmptyState } from '@/components/ui/empty-state';
import { CtaSection } from '@/components/marketing/cta-section';
import { BreadcrumbSchema } from '@/components/seo/schemas';

export const revalidate = 3600;

export const metadata = buildMetadata({
  title: 'Knowledge Hub',
  description:
    'Guides, tutorials, comparisons and news about Chinese platforms: WeChat, Alipay, Douyin, Xiaohongshu, Taobao and more.',
  path: '/knowledge',
});

export default async function KnowledgePage() {
  const [categories, articles] = await Promise.all([
    getKnowledgeCategories(),
    getPublishedArticles(),
  ]);

  return (
    <>
      <BreadcrumbSchema
        items={[
          { label: 'Home', href: `${siteConfig.url}/` },
          { label: 'Knowledge', href: `${siteConfig.url}/knowledge` },
        ]}
      />
      <div className="container py-12">
        <Breadcrumbs items={[{ label: 'Knowledge' }]} />
        <SectionHeading
          as="h1"
          eyebrow="Knowledge Hub"
          title="Guides, tutorials and comparisons"
          description="Everything you need to know about buying and using Chinese accounts and services — written for people outside China."
        />

        {categories.length > 0 && (
          <nav className="mt-8 flex flex-wrap gap-2.5" aria-label="Article categories">
            {categories.map((category) => (
              <a
                key={category.slug}
                href={`/knowledge/${category.slug}`}
                className="rounded-full border border-ink-200 bg-white px-4 py-2 text-sm font-medium text-ink-700 transition hover:border-brand-400 hover:text-brand-700"
              >
                {category.name}
              </a>
            ))}
          </nav>
        )}

        {articles.length === 0 ? (
          <div className="mt-10">
            <EmptyState
              title="No articles published yet"
              description="We're writing the first guides now. Check back soon, or contact us directly with your questions."
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
                categoryName={article.category?.name ?? null}
                categorySlug={article.category?.slug ?? null}
                readTimeMinutes={article.readTimeMinutes}
                publishedAt={article.publishedAt?.toISOString() ?? null}
              />
            ))}
          </ul>
        )}
      </div>

      <CtaSection
        title="Can't find what you're looking for?"
        description="Ask us anything about Chinese platforms, accounts or verification — we reply within hours."
      />
    </>
  );
}
