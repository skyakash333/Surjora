import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import {
  getAllCatalogItems,
  getCatalogItemForEditing,
  getMediaLibrary,
  getProductCategories,
} from '@/lib/data';
import { CatalogEditor } from '@/components/admin/catalog-editor';

export const revalidate = 0;

export const metadata: Metadata = {
  title: 'Edit item | Surjora Admin',
  robots: { index: false, follow: false },
};

export default async function EditCatalogItemPage({ params }: { params: { slug: string } }) {
  const [item, categories, catalog, media] = await Promise.all([
    getCatalogItemForEditing(params.slug),
    getProductCategories(),
    getAllCatalogItems(),
    getMediaLibrary(),
  ]);

  if (!item) notFound();

  const description = (
    item.description as Array<{ type: string; data: Record<string, unknown> }>
  ).map((block) => {
    if (block.type === 'heading' && typeof block.data.level === 'number') {
      return {
        ...block,
        data: { ...block.data, level: String(block.data.level) as '2' | '3' | '4' },
      };
    }
    return block;
  });

  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight text-ink-900">Edit item</h1>
      <p className="mt-2 text-ink-600">Editing “{item.title}”.</p>
      <div className="mt-8">
        <CatalogEditor
          categories={categories.map((c) => ({ id: c.id, name: c.name, slug: c.slug }))}
          catalog={catalog.map((p) => ({ id: p.id, title: p.title, type: p.type }))}
          media={media.map((mediaItem) => ({
            id: mediaItem.id,
            url: mediaItem.url,
            alt: mediaItem.alt,
          }))}
          item={{
            slug: item.slug,
            type: item.type,
            title: item.title,
            seoTitle: item.seoTitle,
            seoDescription: item.seoDescription,
            shortDescription: item.shortDescription,
            h1: item.h1,
            coverImageId: item.coverImageId,
            categoryId: item.categoryId,
            priceFrom: item.priceFrom,
            featured: item.featured,
            status: item.status,
            description,
            features:
              (item.features as Array<{ title: string; text: string; icon?: string | null }>) ?? [],
            faqs: (item.faqs as Array<{ question: string; answer: string }>) ?? [],
            relatedProductIds: item.relatedProductIds,
            relatedArticleIds: item.relatedArticleIds,
          }}
        />
      </div>
    </div>
  );
}
