import type { TestimonialItem } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import { StarIcon } from '@/components/ui/icons';

/**
 * Testimonials block. Honesty guard: if EVERY visible testimonial is demo/sample
 * content, the whole section is labelled as illustrative so sample text is never
 * presented as a genuine review. Real testimonials (isDemo: false) render without
 * the sample label. Renders nothing when there are no testimonials at all.
 */
export function Testimonials({ items }: { items: TestimonialItem[] }) {
  if (items.length === 0) return null;

  const allDemo = items.every((t) => t.isDemo);

  return (
    <section className="border-y border-ink-200 bg-white">
      <div className="container py-16 sm:py-20">
        <div className="flex flex-col items-center gap-3 text-center">
          <span className="eyebrow">What people say</span>
          <h2 className="text-2xl font-bold tracking-tight text-ink-900 sm:text-3xl">
            Trusted for digital China access
          </h2>
          {allDemo && (
            <Badge variant="neutral" className="mt-1">
              Sample content — awaiting real customer testimonials
            </Badge>
          )}
        </div>

        <ul className="mt-10 grid gap-5 md:grid-cols-3">
          {items.map((t) => (
            <li key={t.id} className="surface flex h-full flex-col p-6">
              <div className="flex items-center gap-0.5 text-brand-500" aria-label={`${t.rating} out of 5`}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <StarIcon key={i} filled={i < t.rating} className={i < t.rating ? '' : 'text-ink-200'} />
                ))}
              </div>
              <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-ink-700">
                “{t.quote}”
              </blockquote>
              <div className="mt-5 flex items-center justify-between border-t border-ink-100 pt-4">
                <div>
                  <p className="text-sm font-semibold text-ink-900">{t.author}</p>
                  {t.role && <p className="text-xs text-ink-500">{t.role}</p>}
                </div>
                {t.isDemo && (
                  <span className="rounded-full bg-ink-100 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-ink-500">
                    Sample
                  </span>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
