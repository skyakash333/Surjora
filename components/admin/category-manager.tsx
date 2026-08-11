'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { categorySchema, categoryKinds, type CategoryInput } from '@/schema/category';
import { slugify } from '@/lib/slug';
import { Button } from '@/components/ui/button';

type CategoryRow = {
  id: string;
  slug: string;
  name: string;
  kind: string;
  description: string | null;
  _count: { products: number; articles: number };
};

type CategoryManagerProps = {
  categories: CategoryRow[];
};

const kindLabels: Record<(typeof categoryKinds)[number], string> = {
  PRODUCT: 'Product',
  SERVICE: 'Service',
  CONTENT: 'Knowledge',
};

const inputClass =
  'w-full rounded-lg border border-ink-300 px-3 py-2 text-sm text-ink-900 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500';

export function CategoryManager({ categories }: CategoryManagerProps) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [slugLocked, setSlugLocked] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<CategoryInput>({
    resolver: zodResolver(categorySchema),
    defaultValues: { slug: '', name: '', kind: 'PRODUCT', description: '', seoTitle: '' },
  });

  function startEdit(category: CategoryRow) {
    setEditingId(category.id);
    setSlugLocked(true);
    setError(null);
    reset({
      slug: category.slug,
      name: category.name,
      kind: category.kind as CategoryInput['kind'],
      description: category.description ?? '',
      seoTitle: '',
    });
    if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function startNew() {
    setEditingId(null);
    setSlugLocked(false);
    setError(null);
    reset({ slug: '', name: '', kind: 'PRODUCT', description: '', seoTitle: '' });
  }

  async function onSubmit(values: CategoryInput) {
    setSaving(true);
    setError(null);

    const response = await fetch('/api/admin/categories', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values),
    });

    setSaving(false);

    if (!response.ok) {
      const body = await response.json().catch(() => null);
      setError(body?.error ?? 'Failed to save category.');
      return;
    }

    startNew();
    router.refresh();
  }

  async function onDelete(category: CategoryRow) {
    if (category._count.products > 0 || category._count.articles > 0) return;
    if (typeof window !== 'undefined' && !window.confirm(`Delete “${category.name}”?`)) return;

    const response = await fetch(`/api/admin/categories?id=${category.id}`, { method: 'DELETE' });
    if (!response.ok) {
      const body = await response.json().catch(() => null);
      setError(body?.error ?? 'Failed to delete category.');
      return;
    }
    if (editingId === category.id) startNew();
    router.refresh();
  }

  const grouped = categoryKinds.map((kind) => ({
    kind,
    items: categories.filter((c) => c.kind === kind),
  }));

  return (
    <div className="grid gap-8 lg:grid-cols-3">
      <div className="lg:col-span-1">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4 rounded-lg border border-ink-200 bg-white p-6 lg:sticky lg:top-24"
        >
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-ink-900">
              {editingId ? 'Edit category' : 'New category'}
            </h2>
            {editingId && (
              <button
                type="button"
                onClick={startNew}
                className="text-xs font-medium text-brand-600 hover:text-brand-700"
              >
                Cancel edit
              </button>
            )}
          </div>

          <div>
            <label htmlFor="cat-name" className="mb-1 block text-sm font-medium text-ink-700">
              Name *
            </label>
            <input
              id="cat-name"
              {...register('name', {
                onChange: (e) => {
                  if (!slugLocked) setValue('slug', slugify(e.target.value));
                },
              })}
              className={inputClass}
            />
            {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name.message}</p>}
          </div>

          <div>
            <label htmlFor="cat-slug" className="mb-1 block text-sm font-medium text-ink-700">
              Slug *
            </label>
            <input
              id="cat-slug"
              {...register('slug', { onChange: () => setSlugLocked(true) })}
              className={inputClass}
              readOnly={Boolean(editingId)}
            />
            {editingId && (
              <p className="mt-1 text-xs text-ink-500">Slug can&apos;t be changed after creation.</p>
            )}
            {errors.slug && <p className="mt-1 text-xs text-red-600">{errors.slug.message}</p>}
          </div>

          <div>
            <label htmlFor="cat-kind" className="mb-1 block text-sm font-medium text-ink-700">
              Kind *
            </label>
            <select id="cat-kind" {...register('kind')} className={inputClass}>
              {categoryKinds.map((kind) => (
                <option key={kind} value={kind}>
                  {kindLabels[kind]}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="cat-description" className="mb-1 block text-sm font-medium text-ink-700">
              Description
            </label>
            <textarea
              id="cat-description"
              {...register('description')}
              rows={3}
              className={inputClass}
            />
          </div>

          {error && (
            <p role="alert" className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
              {error}
            </p>
          )}

          <Button type="submit" disabled={saving} className="w-full justify-center">
            {saving ? 'Saving…' : editingId ? 'Update category' : 'Create category'}
          </Button>
        </form>
      </div>

      <div className="space-y-8 lg:col-span-2">
        {grouped.map(({ kind, items }) => (
          <section key={kind}>
            <h2 className="text-sm font-semibold uppercase tracking-wide text-ink-500">
              {kindLabels[kind]} categories
              <span className="ml-2 text-ink-400">({items.length})</span>
            </h2>
            {items.length === 0 ? (
              <p className="mt-3 rounded-lg border border-dashed border-ink-300 p-4 text-sm text-ink-500">
                No {kindLabels[kind].toLowerCase()} categories yet.
              </p>
            ) : (
              <ul className="mt-3 divide-y divide-ink-100 overflow-hidden rounded-lg border border-ink-200 bg-white">
                {items.map((category) => {
                  const inUse = category._count.products + category._count.articles;
                  return (
                    <li key={category.id} className="flex flex-wrap items-center justify-between gap-3 px-4 py-3">
                      <div className="min-w-0">
                        <p className="font-medium text-ink-900">{category.name}</p>
                        <p className="truncate text-xs text-ink-500">
                          /{category.slug}
                          {inUse > 0 && ` · ${inUse} item${inUse === 1 ? '' : 's'}`}
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() => startEdit(category)}
                          className="text-xs font-medium text-brand-600 hover:text-brand-700"
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => onDelete(category)}
                          disabled={inUse > 0}
                          title={inUse > 0 ? 'Reassign its items before deleting' : 'Delete category'}
                          className="text-xs font-medium text-red-600 hover:text-red-700 disabled:cursor-not-allowed disabled:text-ink-300"
                        >
                          Delete
                        </button>
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
          </section>
        ))}
      </div>
    </div>
  );
}
