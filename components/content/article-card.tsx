import Link from 'next/link';

type ArticleCardProps = {
  slug: string;
  title: string;
  excerpt: string | null;
  categoryName: string | null;
  categorySlug: string | null;
  readTimeMinutes?: number | null;
  publishedAt?: string | null;
};

function formatDate(value: string | null | undefined): string | null {
  if (!value) return null;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

export function ArticleCard({
  slug,
  title,
  excerpt,
  categoryName,
  categorySlug,
  readTimeMinutes,
  publishedAt,
}: ArticleCardProps) {
  const meta: string[] = [];
  if (formatDate(publishedAt)) meta.push(formatDate(publishedAt) as string);
  if (readTimeMinutes) meta.push(`${readTimeMinutes} min read`);
  return (
    <li>
      <Link
        href={`/knowledge/${categorySlug ?? 'articles'}/${slug}`}
        className="flex h-full flex-col rounded-lg border border-ink-200 bg-white p-6 transition hover:border-brand-400 hover:shadow-sm"
      >
        {categoryName && (
          <span className="mb-2 text-xs font-semibold uppercase tracking-wide text-brand-600">
            {categoryName}
          </span>
        )}
        <h3 className="text-lg font-semibold text-ink-900">{title}</h3>
        {excerpt && <p className="mt-2 flex-1 text-sm text-ink-600">{excerpt}</p>}
        {meta.length > 0 && <p className="mt-4 text-xs text-ink-500">{meta.join(' · ')}</p>}
      </Link>
    </li>
  );
}
