import Link from 'next/link';

export type RelatedItem = {
  id: string;
  title: string;
  description: string | null;
  href: string;
};

export function RelatedList({ items, title }: { items: RelatedItem[]; title: string }) {
  if (items.length === 0) return null;

  return (
    <section aria-labelledby="related-heading" className="mt-14">
      <h2 id="related-heading" className="text-xl font-bold tracking-tight text-ink-900">
        {title}
      </h2>
      <ul className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <li key={item.id}>
            <Link
              href={item.href}
              className="flex h-full flex-col rounded-lg border border-ink-200 bg-white p-5 transition hover:border-brand-400"
            >
              <h3 className="font-semibold text-ink-900">{item.title}</h3>
              {item.description && (
                <p className="mt-2 flex-1 text-sm text-ink-600">{item.description}</p>
              )}
              <span aria-hidden="true" className="mt-3 text-brand-600">
                →
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
