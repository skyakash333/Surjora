'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { articleSchema, type ArticleInput } from '@/schema/article';
import { Button } from '@/components/ui/button';

type CategoryOption = { id: string; name: string; slug: string };
type CatalogOption = { id: string; title: string; type: string };

type ArticleEditorProps = {
  categories: CategoryOption[];
  catalog: CatalogOption[];
  article?: {
    slug: string;
    title: string;
    seoTitle: string | null;
    seoDescription: string | null;
    excerpt: string | null;
    categoryId: string;
    author: string | null;
    readTimeMinutes: number | null;
    publishedAt: string | null;
    tags: string[];
    relatedProductIds: string[];
    status: string;
    body: Array<{ type: string; data: Record<string, unknown> }>;
  };
};

type BlockType = 'paragraph' | 'heading' | 'list' | 'callout';

const blockTypes: BlockType[] = ['paragraph', 'heading', 'list', 'callout'];

export function ArticleEditor({ categories, catalog, article }: ArticleEditorProps) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<ArticleInput>({
    resolver: zodResolver(articleSchema),
    defaultValues: {
      slug: article?.slug ?? '',
      title: article?.title ?? '',
      seoTitle: article?.seoTitle ?? '',
      seoDescription: article?.seoDescription ?? '',
      excerpt: article?.excerpt ?? '',
      categoryId: article?.categoryId ?? categories[0]?.id ?? '',
      author: article?.author ?? '',
      readTimeMinutes: article?.readTimeMinutes ?? undefined,
      publishedAt: article?.publishedAt ?? '',
      tags: article?.tags ?? [],
      relatedProductIds: article?.relatedProductIds ?? [],
      status: (article?.status as ArticleInput['status']) ?? 'DRAFT',
      body: (article?.body ?? []) as ArticleInput['body'],
    },
  });

  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = form;

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'body',
  });

  const bodyValue = watch('body');

  async function onSubmit(values: ArticleInput) {
    setSaving(true);
    setError(null);

    const response = await fetch('/api/admin/articles', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values),
    });

    setSaving(false);

    if (!response.ok) {
      const body = await response.json().catch(() => null);
      setError(body?.error ?? 'Failed to save article.');
      return;
    }

    router.push('/admin/articles');
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
          <label htmlFor="author" className="mb-1 block text-sm font-medium text-ink-700">
            Author
          </label>
          <input id="author" {...register('author')} className={inputClass} />
        </div>

        <div>
          <label htmlFor="readTimeMinutes" className="mb-1 block text-sm font-medium text-ink-700">
            Read time (minutes)
          </label>
          <input
            id="readTimeMinutes"
            type="number"
            min={0}
            max={240}
            {...register('readTimeMinutes')}
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="publishedAt" className="mb-1 block text-sm font-medium text-ink-700">
            Published at (ISO datetime)
          </label>
          <input id="publishedAt" type="datetime-local" {...register('publishedAt')} className={inputClass} />
        </div>

        <div>
          <label htmlFor="tags" className="mb-1 block text-sm font-medium text-ink-700">
            Tags (comma separated)
          </label>
          <Controller
            control={control}
            name="tags"
            render={({ field }) => (
              <input
                id="tags"
                className={inputClass}
                value={(field.value ?? []).join(', ')}
                onChange={(e) =>
                  field.onChange(
                    e.target.value
                      .split(',')
                      .map((t) => t.trim())
                      .filter(Boolean),
                  )
                }
              />
            )}
          />
        </div>
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
        <label htmlFor="excerpt" className="mb-1 block text-sm font-medium text-ink-700">
          Excerpt
        </label>
        <textarea id="excerpt" {...register('excerpt')} rows={2} className={inputClass} />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-ink-700">Related products/services</label>
        <div className="grid max-h-48 gap-2 overflow-y-auto rounded-lg border border-ink-200 p-4 sm:grid-cols-2">
          {catalog.map((item) => (
            <label key={item.id} className="flex items-center gap-2 text-sm text-ink-700">
              <Controller
                control={control}
                name="relatedProductIds"
                render={({ field }) => (
                  <input
                    type="checkbox"
                    className="rounded border-ink-300 text-brand-600 focus:ring-brand-500"
                    checked={(field.value ?? []).includes(item.id)}
                    onChange={(e) => {
                      const current = field.value ?? [];
                      field.onChange(
                        e.target.checked
                          ? [...current, item.id]
                          : current.filter((id) => id !== item.id),
                      );
                    }}
                  />
                )}
              />
              {item.title}
              <span className="text-xs uppercase text-ink-400">{item.type === 'SERVICE' ? 'Service' : 'Product'}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-ink-700">Content blocks *</label>
          <Button
            type="button"
            variant="secondary"
            size="sm"
            onClick={() => append({ type: 'paragraph', data: { text: '' } })}
          >
            + Add block
          </Button>
        </div>
        {fieldError('body') && (
          <p className="mt-1 text-xs text-red-600">{fieldError('body')?.message}</p>
        )}

        <div className="mt-4 space-y-4">
          {fields.map((field, index) => {
            const type = bodyValue?.[index]?.type ?? 'paragraph';
            return (
              <div key={field.id} className="rounded-lg border border-ink-200 bg-white p-4">
                <div className="mb-3 flex items-center justify-between gap-3">
                  <select
                    aria-label="Block type"
                    className="rounded-lg border border-ink-300 px-3 py-1.5 text-sm text-ink-700"
                    value={type}
                    onChange={(e) => {
                      const nextType = e.target.value as BlockType;
                      form.setValue('body', [
                        ...bodyValue.slice(0, index),
                        emptyBlock(nextType),
                        ...bodyValue.slice(index + 1),
                      ]);
                    }}
                  >
                    {blockTypes.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                  <Button type="button" variant="ghost" size="sm" className="text-red-600" onClick={() => remove(index)}>
                    Remove
                  </Button>
                </div>

                {type === 'paragraph' && (
                  <textarea
                    {...register(`body.${index}.data.text`)}
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
                      {...register(`body.${index}.data.level` as const)}
                    >
                      <option value="2">H2</option>
                      <option value="3">H3</option>
                      <option value="4">H4</option>
                    </select>
                    <input
                      {...register(`body.${index}.data.text`)}
                      placeholder="Heading text"
                      className={inputClass}
                    />
                  </div>
                )}

                {type === 'callout' && (
                  <div className="space-y-2">
                    <input
                      {...register(`body.${index}.data.title`)}
                      placeholder="Callout title"
                      className={inputClass}
                    />
                    <textarea
                      {...register(`body.${index}.data.text`)}
                      placeholder="Callout text"
                      rows={2}
                      className={inputClass}
                    />
                  </div>
                )}

                {type === 'list' && (
                  <Controller
                    control={control}
                    name={`body.${index}.data.items`}
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

          {fields.length === 0 && (
            <p className="rounded-lg border border-dashed border-ink-300 p-6 text-center text-sm text-ink-500">
              No content blocks yet. Add one to start writing.
            </p>
          )}
        </div>
      </div>

      {error && (
        <p role="alert" className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
          {error}
        </p>
      )}

      <div className="flex items-center gap-3">
        <Button type="submit" disabled={saving}>
          {saving ? 'Saving…' : 'Save article'}
        </Button>
        <Button type="button" variant="ghost" onClick={() => router.push('/admin/articles')}>
          Cancel
        </Button>
      </div>
    </form>
  );
}

function emptyBlock(type: BlockType): ArticleInput['body'][number] {
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
