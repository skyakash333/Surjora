import type { ProductWithCategory } from '@/lib/types';
import { ContentBlocks } from '@/components/content/content-blocks';
import { FaqAccordion } from '@/components/content/faq-accordion';
import { QuoteForm } from '@/components/forms/quote-form';
import { CoverImage } from '@/components/media/cover-image';
import { Badge } from '@/components/ui/badge';
import { CheckIcon } from '@/components/ui/icons';
import { siteConfig } from '@/lib/constants';

type CatalogDetailProps = {
  item: ProductWithCategory;
  quoteCta: string;
};

/**
 * Shared detail layout for both products and services: intro + rich body + FAQ
 * on the left, a sticky quote/summary card and feature list on the right.
 */
export function CatalogDetail({ item, quoteCta }: CatalogDetailProps) {
  const faqs = item.faqs ?? [];
  const isService = item.type === 'SERVICE';

  return (
    <div className="mt-2 grid gap-10 lg:grid-cols-5">
      <article className="lg:col-span-3">
        <div className="flex flex-wrap items-center gap-2">
          {item.category?.name && <Badge variant="brand">{item.category.name}</Badge>}
          <Badge variant="outline">{isService ? 'Digital service' : 'Digital account'}</Badge>
        </div>
        <h1 className="mt-4 text-balance text-3xl font-bold tracking-tight text-ink-900 sm:text-4xl">
          {item.h1 ?? item.title}
        </h1>
        {item.shortDescription && (
          <p className="mt-4 text-lg leading-relaxed text-ink-600">{item.shortDescription}</p>
        )}
        {item.coverImageId && (
          <div className="mt-8">
            <CoverImage
              mediaId={item.coverImageId}
              alt={item.title}
              className="aspect-video w-full rounded-2xl border border-ink-200 object-cover"
            />
          </div>
        )}
        {item.description && (
          <div className="mt-8">
            <ContentBlocks blocks={item.description} />
          </div>
        )}
        {faqs.length > 0 && <FaqAccordion faqs={faqs} />}
      </article>

      <aside className="lg:col-span-2">
        <div className="space-y-4 lg:sticky lg:top-24">
          <div className="surface p-6">
            {item.priceFrom ? (
              <p className="text-sm text-ink-500">
                Starting at{' '}
                <span className="text-3xl font-bold text-ink-900">${item.priceFrom}</span>
              </p>
            ) : (
              <p className="text-lg font-semibold text-ink-900">Custom quote</p>
            )}
            <p className="mt-2 text-sm text-ink-600">
              {isService ? 'Services' : 'Orders'} handled personally. No payment required upfront.
            </p>
            <div className="mt-5">
              <QuoteForm productId={item.id} requestType="buy" cta={quoteCta} />
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {siteConfig.telegram && (
                <a
                  href={siteConfig.telegram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 rounded-lg bg-sky-500 px-3 py-2 text-center text-xs font-semibold text-white transition hover:bg-sky-600"
                >
                  Telegram
                </a>
              )}
              {siteConfig.whatsapp && (
                <a
                  href={siteConfig.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 rounded-lg bg-emerald-600 px-3 py-2 text-center text-xs font-semibold text-white transition hover:bg-emerald-700"
                >
                  WhatsApp
                </a>
              )}
            </div>
          </div>

          {item.features && item.features.length > 0 && (
            <div className="surface p-6">
              <h2 className="text-xs font-semibold uppercase tracking-[0.12em] text-ink-500">
                What you get
              </h2>
              <ul className="mt-4 space-y-4">
                {item.features.map((feature) => (
                  <li key={feature.title} className="flex items-start gap-3">
                    <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-brand-50 text-brand-600">
                      <CheckIcon className="h-3.5 w-3.5" />
                    </span>
                    <div>
                      <p className="font-medium text-ink-900">{feature.title}</p>
                      <p className="mt-0.5 text-sm leading-relaxed text-ink-600">{feature.text}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </aside>
    </div>
  );
}
