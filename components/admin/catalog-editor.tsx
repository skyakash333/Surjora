'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { catalogSchema, type CatalogInput } from '@/schema/catalog';
import { Button } from '@/components/ui/button';

type CategoryOption = { id: string; name: string; slug: string };
type CatalogOption = { id: string; title: string; type: string };

type CatalogEditorProps = {
  categories: CategoryOption[];
  catalog: CatalogOption[];
  item?: {
    slug: string;
    type: string;
    title: string;
    seoTitle: string | null;
    seoDescription: string | null;
    h1: string | null;
    categoryId: string;
    priceFrom: number | null;
    status: string;
    description: Array<{ type: string; data: Record<string, unknown> }>;
    features: Array<{ title: string; text: string; icon?: string | null }>;
    faqs: Array<{ question: string; answer: string }>;
    relatedProductIds: string[];
    relatedArticleIds: string[];
  };
};

type BlockType = 'paragraph' | 'heading' | 'list' | 'callout';

const blockTypes: BlockType[] = ['paragraph', 'heading', 'list', 'callout'];

export function CatalogEditor({ categories, catalog, item }: CatalogEditorProps) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<CatalogInput>({
    resolver: zodResolver(catalogSchema),
    defaultValues: {
      slug: item?.slug ?? '',
      type: (item?.type as CatalogInput['type']) ?? 'PRODUCT',
      title: item?.title ?? '',
      seoTitle: item?.seoTitle ?? '',
      seoDescription: item?.seoDescription ?? '',
      h1: item?.h1 ?? '',
      categoryId: item?.categoryId ?? categories[0]?.id ?? '',
      priceFrom: item?.priceFrom ?? undefined,
      status: (item?.status as CatalogInput['status']) ?? 'DRAFT',
      description: (item?.description ?? []) as CatalogInput['description'],
      features: (item?.features ?? [{ title: '', text: '' }]) as CatalogInput['features'],
      faqs: (item?.faqs ?? [{ question: '', answer: '' }]) as CatalogInput['faqs'],
      relatedProductIds: item?.relatedProductIds ?? [],
      relatedArticleIds: item?.relatedArticleIds ?? [],
    },
  });

  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = form;

  const descFields = useFieldArray({ control, name: 'description' });
  const featureFields = useFieldArray({ control, name: 'features' });
  const faqFields = useFieldArray({ control, name: 'faqs' });

  const descriptionValue = watch('description');

  async function onSubmit(values: CatalogInput) {
    setSaving(true);
    setError(null);

    const response = await fetch('/api/admin/catalog', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values),
    });

    setSaving(false);

    if (!response.ok) {
      const body = await response.json().catch(() => null);
      setError(body?.error ?? 'Failed to save item.');
      return;
    }

    router.push('/admin/catalog');
    router.refresh();
  }

  const fieldError = (path: string) => {
    const keys = path.split('.');
    let current: unknown = errors;
    for (const key of keys) {
      if (typeof current !== 'object' || current === null) return undefined;
      current = (current as Record<string, unknown>)[key];
    }
    return current as { message?: string } | undefined;
  };

  const inputClass =
    'w-full rounded-lg border border-ink-300 px-3 py-2 text-sm text-ink-900 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500';

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <div className="grid gap-5 lg:grid-cols-2">
        <div>
          <label htmlFor="title" className="mb-1 block text-sm font-medium text-ink-700">
            Title *
          </label>
          <input id="title" {...register('title')} className={inputClass} />
          {fieldError('title') && (
            <p className="mt-1 text-xs text-red-600">{fieldError('title')?.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="slug" className="mb-1 block text-sm font-medium text-ink-700">
            Slug *
          </label>
          <input id="slug" {...register('slug')} className={inputClass} />
          {fieldError('slug') && (
            <p className="mt-1 text-xs text-red-600">{fieldError('slug')?.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="type" className="mb-1 block text-sm font-medium text-ink-700">
            Type
          </label>
          <select id="type" {...register('type')} className={inputClass}>
            <option value="PRODUCT">Product</option>
            <option value="SERVICE">Service</option>
          </select>
        </div>

        <div>
          <label htmlFor="categoryId" className="mb-1 block text-sm font-medium text-ink-700">
            Category *
          </label>
          <select id="categoryId" {...register('categoryId')} className={inputClass}>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="status" className="mb-1 block text-sm font-medium text-ink-700">
            Status
          </label>
          <select id="status" {...register('status')} className={inputClass}>
            <option value="DRAFT">Draft</option>
            <option value="PUBLISHED">Published</option>
            <option value="ARCHIVED">Archived</option>
          </select>
        </div>

        <div>
          <label htmlFor="priceFrom" className="mb-1 block text-sm font-medium text-ink-700">
            Price from (USD)
          </label>
          <input
            id="priceFrom"
            type="number"
            min={0}
            step="0.01"
            {...register('priceFrom')}
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label htmlFor="h1" className="mb-1 block text-sm font-medium text-ink-700">
          H1 heading
        </label>
        <input id="h1" {...register('h1')} className={inputClass} />
      </div>

      <div>
        <label htmlFor="seoTitle" className="mb-1 block text-sm font-medium text-ink-700">
          SEO title
        </label>
        <input id="seoTitle" {...register('seoTitle')} className={inputClass} />
      </div>

      <div>
        <label htmlFor="seoDescription" className="mb-1 block text-sm font-medium text-ink-700">
          SEO description
        </label>
        <textarea id="seoDescription" {...register('seoDescription')} rows={2} className={inputClass} />
      </div>

      <div>
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-ink-700">Description blocks *</label>
          <Button
            type="button"
            variant="secondary"
            size="sm"
            onClick={() => descFields.append({ type: 'paragraph', data: { text: '' } })}
          >
            + Add block
          </Button>
        </div>
        {fieldError('description') && (
          <p className="mt-1 text-xs text-red-600">{fieldError('description')?.message}</p>
        )}

        <div className="mt-4 space-y-4">
          {descFields.fields.map((field, index) => {
            const type = descriptionValue?.[index]?.type ?? 'paragraph';
            return (
              <div key={field.id} className="rounded-lg border border-ink-200 bg-white p-4">
                <div className="mb-3 flex items-center justify-between gap-3">
                  <select
                    aria-label="Block type"
                    className="rounded-lg border border-ink-300 px-3 py-1.5 text-sm text-ink-700"
                    value={type}
                    onChange={(e) => {
                      const nextType = e.target.value as BlockType;
                      const current = descriptionValue ?? [];
                      form.setValue('description', [
                        ...current.slice(0, index),
                        emptyBlock(nextType),
                        ...current.slice(index + 1),
                      ]);
                    }}
                  >
                    {blockTypes.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="text-red-600"
                    onClick={() => descFields.remove(index)}
                  >
                    Remove
                  </Button>
                </div>

                {type === 'paragraph' && (
                  <textarea
                    {...register(`description.${index}.data.text`)}
                    placeholder="Paragraph text"
                    rows={3}
                    className={inputClass}
                  />
                )}

                {type === 'heading' && (
                  <div className="flex items-center gap-3">
                    <select
                      aria-label="Heading level"
                      className="rounded-lg border border-ink-300 px-3 py-2 text-sm text-ink-700"
                      {...register(`description.${index}.data.level` as const)}
                    >
                      <option value="2">H2</option>
                      <option value="3">H3</option>
                      <option value="4">H4</option>
                    </select>
                    <input
                      {...register(`description.${index}.data.text`)}
                      placeholder="Heading text"
                      className={inputClass}
                    />
                  </div>
                )}

                {type === 'callout' && (
                  <div className="space-y-2">
                    <input
                      {...register(`description.${index}.data.title`)}
                      placeholder="Callout title"
                      className={inputClass}
                    />
                    <textarea
                      {...register(`description.${index}.data.text`)}
                      placeholder="Callout text"
                      rows={2}
                      className={inputClass}
                    />
                  </div>
                )}

                {type === 'list' && (
                  <Controller
                    control={control}
                    name={`description.${index}.data.items`}
                    render={({ field: listField }) => {
                      const items = listField.value ?? [];
                      return (
                        <div className="space-y-2">
                          {items.map((item, itemIndex) => (
                            <div key={itemIndex} className="flex items-center gap-2">
                              <input
                                value={item}
                                onChange={(e) => {
                                  const next = [...items];
                                  next[itemIndex] = e.target.value;
                                  listField.onChange(next);
                                }}
                                placeholder="List item"
                                className={inputClass}
                              />
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                className="text-red-600"
                                onClick={() =>
                                  listField.onChange(items.filter((_, i) => i !== itemIndex))
                                }
                              >
                                Remove
                              </Button>
                            </div>
                          ))}
                          <Button
                            type="button"
                            variant="secondary"
                            size="sm"
                            onClick={() => listField.onChange([...items, ''])}
                          >
                            + Add item
                          </Button>
                        </div>
                      );
                    }}
                  />
                )}
              </div>
            );
          })}

          {descFields.fields.length === 0 && (
            <p className="rounded-lg border border-dashed border-ink-300 p-6 text-center text-sm text-ink-500">
              No description blocks yet.
            </p>
          )}
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-ink-700">Features</label>
          <Button
            type="button"
            variant="secondary"
            size="sm"
            onClick={() => featureFields.append({ title: '', text: '' })}
          >
            + Add feature
          </Button>
        </div>
        <div className="mt-4 space-y-4">
          {featureFields.fields.map((field, index) => (
            <div key={field.id} className="rounded-lg border border-ink-200 bg-white p-4">
              <div className="grid gap-3 sm:grid-cols-3">
                <input {...register(`features.${index}.title`)} placeholder="Feature title" className={inputClass} />
                <textarea
                  {...register(`features.${index}.text`)}
                  placeholder="Feature text"
                  rows={1}
                  className={`${inputClass} sm:col-span-2`}
                />
              </div>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="mt-2 text-red-600"
                onClick={() => featureFields.remove(index)}
              >
                Remove feature
              </Button>
            </div>
          ))}
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-ink-700">FAQs</label>
          <Button
            type="button"
            variant="secondary"
            size="sm"
            onClick={() => faqFields.append({ question: '', answer: '' })}
          >
            + Add FAQ
          </Button>
        </div>
        <div className="mt-4 space-y-4">
          {faqFields.fields.map((field, index) => (
            <div key={field.id} className="rounded-lg border border-ink-200 bg-white p-4">
              <input {...register(`faqs.${index}.question`)} placeholder="Question" className={inputClass} />
              <textarea
                {...register(`faqs.${index}.answer`)}
                placeholder="Answer"
                rows={2}
                className={`${inputClass} mt-2`}
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="mt-2 text-red-600"
                onClick={() => faqFields.remove(index)}
              >
                Remove FAQ
              </Button>
            </div>
          ))}
        </div>
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-ink-700">Related products/services</label>
        <div className="grid max-h-48 gap-2 overflow-y-auto rounded-lg border border-ink-200 p-4 sm:grid-cols-2">
          {catalog.map((c) => (
            <label key={c.id} className="flex items-center gap-2 text-sm text-ink-700">
              <Controller
                control={control}
                name="relatedProductIds"
                render={({ field }) => (
                  <input
                    type="checkbox"
                    className="rounded border-ink-300 text-brand-600 focus:ring-brand-500"
                    checked={(field.value ?? []).includes(c.id)}
                    onChange={(e) => {
                      const current = field.value ?? [];
                      field.onChange(
                        e.target.checked
                          ? [...current, c.id]
                          : current.filter((id) => id !== c.id),
                      );
                    }}
                  />
                )}
              />
              {c.title}
              <span className="text-xs uppercase text-ink-400">
                {c.type === 'SERVICE' ? 'Service' : 'Product'}
              </span>
            </label>
          ))}
        </div>
      </div>

      {error && (
        <p role="alert" className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
          {error}
        </p>
      )}

      <div className="flex items-center gap-3">
        <Button type="submit" disabled={saving}>
          {saving ? 'Saving…' : 'Save item'}
        </Button>
        <Button type="button" variant="ghost" onClick={() => router.push('/admin/catalog')}>
          Cancel
        </Button>
      </div>
    </form>
  );
}

function emptyBlock(type: BlockType): CatalogInput['description'][number] {
  switch (type) {
    case 'heading':
      return { type: 'heading', data: { level: '2', text: '' } };
    case 'list':
      return { type: 'list', data: { ordered: false, items: [''] } };
    case 'callout':
      return { type: 'callout', data: { title: '', text: '' } };
    default:
      return { type: 'paragraph', data: { text: '' } };
  }
}
