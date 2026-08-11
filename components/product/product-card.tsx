import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { ArrowRightIcon, ServiceIcon, GlobeIcon } from '@/components/ui/icons';
import { CoverImage } from '@/components/media/cover-image';
import { PlatformVisual } from '@/components/product/platform-visual';
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
  coverImageId?: string | null;
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
  coverImageId,
}: ProductCardProps) {
  const isService = type === 'SERVICE';
  // In the 1:1 demo catalog a product's category name equals its title; only show
  // the category label when it adds information (i.e. a category with several products).
  const showCategory = Boolean(categoryName && categoryName !== title);

  return (
    <li>
      <Link
        href={href}
        className="group surface-interactive flex h-full flex-col overflow-hidden focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500"
      >
        {/* Media: real cover image when available, branded placeholder otherwise */}
        <div className="relative aspect-[16/10] w-full overflow-hidden">
          <PlatformVisual
            name={categoryName ?? title}
            icon={
              isService ? (
                <ServiceIcon slug={slug} className="h-6 w-6" />
              ) : (
                <GlobeIcon className="h-6 w-6" />
              )
            }
            className="h-full w-full"
          />
          <CoverImage
            mediaId={coverImageId}
            alt={title}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          />
          {featured && (
            <Badge variant="brand" className="absolute right-3 top-3 shadow-sm">
              Popular
            </Badge>
          )}
        </div>

        <div className="flex flex-1 flex-col p-6">
          {showCategory && (
            <p className="text-xs font-medium uppercase tracking-wide text-brand-600">
              {categoryName}
            </p>
          )}
          <h3
            className={cn(
              'text-lg font-semibold text-ink-900 transition-colors group-hover:text-brand-700',
              showCategory && 'mt-1',
            )}
          >
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
        </div>
      </Link>
    </li>
  );
}
