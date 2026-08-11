import type { Metadata } from 'next';
import { getAllCategoriesForAdmin } from '@/lib/data';
import { CategoryManager } from '@/components/admin/category-manager';

export const revalidate = 0;

export const metadata: Metadata = {
  title: 'Categories | Surjora Admin',
  robots: { index: false, follow: false },
};

export default async function AdminCategoriesPage() {
  const categories = await getAllCategoriesForAdmin();

  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight text-ink-900">Categories</h1>
      <p className="mt-2 text-ink-600">
        Organise products, services and knowledge articles. Categories in use can&apos;t be deleted
        until their items are reassigned.
      </p>

      <div className="mt-8">
        <CategoryManager
          categories={categories.map((c) => ({
            id: c.id,
            slug: c.slug,
            name: c.name,
            kind: c.kind,
            description: c.description,
            _count: c._count,
          }))}
        />
      </div>
    </div>
  );
}
