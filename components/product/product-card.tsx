import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { ArrowRightIcon, ServiceIcon, GlobeIcon } from '@/components/ui/icons';
import { cn } from '@/lib/cn';

type ProductCardProps = {
  title: string;
  description: string | null;
  priceFrom: number | null;
  href: string;
  slug: string;
  type?: 'PRODUCT' | 'SERVICE';
  featured?: boolean;
  categoryName?: string | null;
};

export function ProductCard({
  title,
  description,
  priceFrom,
  href,
  slug,
  type = 'PRODUCT',
  featured = false,
  categoryName,
}: ProductCardProps) {
  const isService = type === 'SERVICE';
  // In the 1:1 demo catalog a product's category name equals its title; only show
  // the category label when it adds information (i.e. a category with several products).
  const showCategory = Boolean(categoryName && categoryName !== title);

  return (
    <li>
      <Link
        href={href}
        className="group surface-interactive flex h-full flex-col p-6 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500"
      >
        <div className="flex items-start justify-between gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-50 text-brand-600 ring-1 ring-inset ring-brand-100 transition-colors group-hover:bg-brand-100">
            {isService ? <ServiceIcon slug={slug} /> : <GlobeIcon />}
          </span>
          {featured && <Badge variant="brand">Popular</Badge>}
        </div>

        {showCategory && (
          <p className="mt-4 text-xs font-medium uppercase tracking-wide text-brand-600">
            {categoryName}
          </p>
        )}
        <h3 className={cn('text-lg font-semibold text-ink-900', showCategory ? 'mt-1' : 'mt-4')}>
          {title}
        </h3>
        {description && (
          <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-600">{description}</p>
        )}

        <div className="mt-5 flex items-center justify-between border-t border-ink-100 pt-4">
          {priceFrom ? (
            <span className="text-sm text-ink-500">
              From <span className="font-semibold text-ink-900">${priceFrom}</span>
            </span>
          ) : (
            <span className="text-sm font-medium text-ink-500">Custom quote</span>
          )}
          <span className="inline-flex items-center gap-1 text-sm font-medium text-brand-600">
            {isService ? 'View service' : 'View details'}
            <ArrowRightIcon className="transition-transform group-hover:translate-x-0.5" />
          </span>
        </div>
      </Link>
    </li>
  );
}
