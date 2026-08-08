import Link from 'next/link';

type ProductCardProps = {
  slug: string;
  title: string;
  seoDescription: string | null;
  priceFrom: number | null;
  href: string;
};

export function ProductCard({ slug, title, seoDescription, priceFrom, href }: ProductCardProps) {
  return (
    <li>
      <Link
        href={href}
        className="flex h-full flex-col rounded-lg border border-ink-200 bg-white p-6 transition hover:border-brand-400 hover:shadow-sm"
      >
        <h3 className="text-lg font-semibold text-ink-900">{title}</h3>
        {seoDescription && <p className="mt-2 flex-1 text-sm text-ink-600">{seoDescription}</p>}
        <div className="mt-4 flex items-center justify-between">
          {priceFrom ? (
            <span className="text-sm text-ink-500">
              From <span className="font-semibold text-ink-900">${priceFrom}</span>
            </span>
          ) : (
            <span className="text-sm text-ink-500">Custom quote</span>
          )}
          <span aria-hidden="true" className="text-brand-600">
            →
          </span>
        </div>
      </Link>
    </li>
  );
}
