import type { ProductFaq } from '@/lib/content-blocks';

type FaqAccordionProps = {
  faqs: ProductFaq[];
  title?: string | null;
};

/**
 * Native <details> accordion styled as stacked cards. Used on product/service
 * pages and reused by the support page. Passing `title={null}` renders just the
 * list (for pages that supply their own heading).
 */
export function FaqAccordion({ faqs, title = 'Frequently asked questions' }: FaqAccordionProps) {
  if (faqs.length === 0) return null;

  return (
    <section aria-labelledby="faq-heading" className="mt-12">
      {title && (
        <h2 id="faq-heading" className="text-xl font-bold tracking-tight text-ink-900 sm:text-2xl">
          {title}
        </h2>
      )}
      <div className="mt-6 space-y-3">
        {faqs.map((faq) => (
          <details
            key={faq.question}
            className="group surface overflow-hidden [&_summary]:list-none"
          >
            <summary className="flex cursor-pointer items-center justify-between gap-4 px-5 py-4 font-medium text-ink-900 transition-colors hover:bg-ink-50">
              {faq.question}
              <span
                aria-hidden="true"
                className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-brand-50 text-brand-600 transition-transform duration-200 group-open:rotate-45"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-3.5 w-3.5">
                  <path d="M12 5v14M5 12h14" strokeLinecap="round" />
                </svg>
              </span>
            </summary>
            <p className="px-5 pb-5 text-sm leading-relaxed text-ink-600">{faq.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
