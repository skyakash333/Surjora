import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { ArrowRightIcon } from '@/components/ui/icons';

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
        className="group surface-interactive flex h-full flex-col p-6"
      >
        {categoryName && (
          <Badge variant="brand" className="self-start">
            {categoryName}
          </Badge>
        )}
        <h3 className="mt-3 text-lg font-semibold text-ink-900 group-hover:text-brand-700">
          {title}
        </h3>
        {excerpt && (
          <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-600">{excerpt}</p>
        )}
        <div className="mt-5 flex items-center justify-between border-t border-ink-100 pt-4">
          {meta.length > 0 ? (
            <p className="text-xs text-ink-500">{meta.join(' · ')}</p>
          ) : (
            <span />
          )}
          <ArrowRightIcon className="text-brand-600 transition-transform group-hover:translate-x-0.5" />
        </div>
      </Link>
    </li>
  );
}
