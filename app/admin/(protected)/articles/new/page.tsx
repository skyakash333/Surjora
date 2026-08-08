import { getKnowledgeCategories, getAllCatalogItems } from '@/lib/data';
import { ArticleEditor } from '@/components/admin/article-editor';

export const revalidate = 0;

export default async function NewArticlePage() {
  const categories = await getKnowledgeCategories();
  const catalog = await getAllCatalogItems();

  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight text-ink-900">New article</h1>
      <p className="mt-2 text-ink-600">Create a new knowledge hub article.</p>
      <div className="mt-8">
        <ArticleEditor
          categories={categories.map((c) => ({ id: c.id, name: c.name, slug: c.slug }))}
          catalog={catalog.map((p) => ({ id: p.id, title: p.title, type: p.type }))}
        />
      </div>
    </div>
  );
}
