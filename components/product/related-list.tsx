import Link from 'next/link';
import { ArrowRightIcon } from '@/components/ui/icons';

export type RelatedItem = {
  id: string;
  title: string;
  description: string | null;
  href: string;
};

export function RelatedList({ items, title }: { items: RelatedItem[]; title: string }) {
  if (items.length === 0) return null;

  return (
    <section aria-labelledby="related-heading" className="mt-16">
      <h2 id="related-heading" className="text-xl font-bold tracking-tight text-ink-900">
        {title}
      </h2>
      <ul className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <li key={item.id}>
            <Link
              href={item.href}
              className="group surface-interactive flex h-full flex-col p-5"
            >
              <h3 className="font-semibold text-ink-900 group-hover:text-brand-700">
                {item.title}
              </h3>
              {item.description && (
                <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-600">
                  {item.description}
                </p>
              )}
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-brand-600">
                Learn more
                <ArrowRightIcon className="transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
