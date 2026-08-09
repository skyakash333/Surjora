import { getKnowledgeCategories, getPublishedArticles } from '@/lib/data';
import { buildMetadata } from '@/lib/seo';
import { ArticleCard } from '@/components/content/article-card';
import { Breadcrumbs } from '@/components/layout/breadcrumbs';
import { BreadcrumbSchema } from '@/components/seo/schemas';
import { siteConfig } from '@/lib/constants';

export const revalidate = 3600;

export const metadata = buildMetadata({
  title: 'Knowledge Hub',
  description:
    'Guides, tutorials, comparisons and news about Chinese platforms: WeChat, Alipay, Douyin, Xiaohongshu, Taobao and more.',
  path: '/knowledge',
});

export default async function KnowledgePage() {
  const categories = await getKnowledgeCategories();
  const articles = await getPublishedArticles();

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
        <h1 className="text-4xl font-bold tracking-tight text-ink-900">Knowledge Hub</h1>
        <p className="mt-4 max-w-2xl text-lg text-ink-600">
          Guides, tutorials and comparisons for buying and using Chinese accounts and services.
        </p>

        {categories.length > 0 && (
          <nav className="mt-8 flex flex-wrap gap-3">
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
          <div className="mt-10 rounded-lg border border-ink-200 bg-white p-8">
            <p className="text-ink-600">
              No articles are published yet. Check back soon or contact us with your questions.
            </p>
            <a href="/contact" className="mt-4 inline-block font-medium text-brand-600 hover:text-brand-700">
              Contact us →
            </a>
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
    </>
  );
}
