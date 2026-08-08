import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getArticleForEditing, getKnowledgeCategories, getAllCatalogItems } from '@/lib/data';
import { ArticleEditor } from '@/components/admin/article-editor';

export const revalidate = 0;

export const metadata: Metadata = {
  title: 'Edit article | Surjora Admin',
  robots: { index: false, follow: false },
};

export default async function EditArticlePage({ params }: { params: { slug: string } }) {
  const [article, categories, catalog] = await Promise.all([
    getArticleForEditing(params.slug),
    getKnowledgeCategories(),
    getAllCatalogItems(),
  ]);

  if (!article) notFound();

  const body = (article.body as Array<{ type: string; data: Record<string, unknown> }>).map(
    (block) => {
      if (block.type === 'heading' && typeof block.data.level === 'number') {
        return {
          ...block,
          data: { ...block.data, level: String(block.data.level) as '2' | '3' | '4' },
        };
      }
      return block;
    },
  );

  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight text-ink-900">Edit article</h1>
      <p className="mt-2 text-ink-600">Editing “{article.title}”.</p>
      <div className="mt-8">
        <ArticleEditor
          categories={categories.map((c) => ({ id: c.id, name: c.name, slug: c.slug }))}
          catalog={catalog.map((p) => ({ id: p.id, title: p.title, type: p.type }))}
          article={{
            slug: article.slug,
            title: article.title,
            seoTitle: article.seoTitle,
            seoDescription: article.seoDescription,
            excerpt: article.excerpt,
            categoryId: article.categoryId,
            author: article.author,
            readTimeMinutes: article.readTimeMinutes,
            publishedAt: article.publishedAt ? article.publishedAt.toISOString() : null,
            tags: article.tags,
            relatedProductIds: article.relatedProductIds,
            status: article.status,
            body,
          }}
        />
      </div>
    </div>
  );
}
