import Link from 'next/link';
import { getAllCatalogItemsForAdmin } from '@/lib/data';
import { ButtonLink } from '@/components/ui/button';

export const revalidate = 0;

export default async function AdminCatalogPage() {
  const items = await getAllCatalogItemsForAdmin();

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-ink-900">Catalog</h1>
          <p className="mt-2 text-ink-600">Products and services on the site.</p>
        </div>
        <ButtonLink href="/admin/catalog/new" size="md">
          New item
        </ButtonLink>
      </div>

      {items.length === 0 ? (
        <div className="mt-8 rounded-lg border border-dashed border-ink-300 bg-white p-10 text-center">
          <p className="text-ink-600">No catalog items yet.</p>
          <ButtonLink href="/admin/catalog/new" size="sm" className="mt-4">
            Add your first item
          </ButtonLink>
        </div>
      ) : (
        <div className="mt-8 overflow-hidden rounded-lg border border-ink-200 bg-white">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-ink-200 bg-ink-50">
              <tr>
                <th className="px-4 py-3 font-medium text-ink-600">Title</th>
                <th className="px-4 py-3 font-medium text-ink-600">Type</th>
                <th className="px-4 py-3 font-medium text-ink-600">Category</th>
                <th className="px-4 py-3 font-medium text-ink-600">Status</th>
                <th className="px-4 py-3 font-medium text-ink-600">Updated</th>
                <th className="px-4 py-3 font-medium text-ink-600">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink-100">
              {items.map((item) => (
                <tr key={item.id}>
                  <td className="px-4 py-3 font-medium text-ink-900">{item.title}</td>
                  <td className="px-4 py-3 text-ink-600">
                    {item.type === 'SERVICE' ? 'Service' : 'Product'}
                  </td>
                  <td className="px-4 py-3 text-ink-600">{item.category?.name ?? '—'}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${
                        item.status === 'PUBLISHED'
                          ? 'bg-green-100 text-green-700'
                          : item.status === 'DRAFT'
                            ? 'bg-amber-100 text-amber-700'
                            : 'bg-ink-100 text-ink-600'
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-ink-600">
                    {item.updatedAt.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/${item.type === 'SERVICE' ? 'services' : 'products'}/${item.slug}`}
                        className="text-xs font-medium text-brand-600 hover:text-brand-700"
                      >
                        View
                      </Link>
                      <Link
                        href={`/admin/catalog/${item.slug}/edit`}
                        className="text-xs font-medium text-brand-600 hover:text-brand-700"
                      >
                        Edit
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
