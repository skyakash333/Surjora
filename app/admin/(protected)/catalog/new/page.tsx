import type { Metadata } from 'next';
import { getAllCatalogItems, getProductCategories } from '@/lib/data';
import { CatalogEditor } from '@/components/admin/catalog-editor';

export const revalidate = 0;

export const metadata: Metadata = {
  title: 'New item | Surjora Admin',
  robots: { index: false, follow: false },
};

export default async function NewCatalogItemPage() {
  const [categories, catalog] = await Promise.all([
    getProductCategories(),
    getAllCatalogItems(),
  ]);

  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight text-ink-900">New item</h1>
      <p className="mt-2 text-ink-600">Add a product or service to the catalog.</p>
      <div className="mt-8">
        <CatalogEditor
          categories={categories.map((c) => ({ id: c.id, name: c.name, slug: c.slug }))}
          catalog={catalog.map((p) => ({ id: p.id, title: p.title, type: p.type }))}
        />
      </div>
    </div>
  );
}
