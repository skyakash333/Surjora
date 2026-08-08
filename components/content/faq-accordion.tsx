import type { ProductFaq } from '@/lib/content-blocks';

export function FaqAccordion({ faqs }: { faqs: ProductFaq[] }) {
  if (faqs.length === 0) return null;

  return (
    <section aria-labelledby="faq-heading" className="mt-10">
      <h2 id="faq-heading" className="text-xl font-bold tracking-tight text-ink-900">
        Frequently asked questions
      </h2>
      <div className="mt-5 divide-y divide-ink-200 border-y border-ink-200">
        {faqs.map((faq) => (
          <details key={faq.question} className="group py-4">
            <summary className="flex cursor-pointer list-none items-center justify-between font-medium text-ink-900">
              {faq.question}
              <span
                aria-hidden="true"
                className="text-brand-600 transition-transform group-open:rotate-45"
              >
                +
              </span>
            </summary>
            <p className="mt-3 text-sm text-ink-600">{faq.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
