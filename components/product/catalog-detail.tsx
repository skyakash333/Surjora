import type { ProductWithCategory } from '@/lib/types';
import { ContentBlocks } from '@/components/content/content-blocks';
import { FaqAccordion } from '@/components/content/faq-accordion';
import { QuoteForm } from '@/components/forms/quote-form';
import { CoverImage } from '@/components/media/cover-image';
import { PlatformVisual } from '@/components/product/platform-visual';
import { Badge } from '@/components/ui/badge';
import { buttonClasses } from '@/components/ui/button';
import { ArrowRightIcon, CheckIcon, GlobeIcon, ServiceIcon } from '@/components/ui/icons';
import { cn } from '@/lib/cn';
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
  const deliveryNotes = isService
    ? [
        'Scope and eligibility reviewed before confirmation',
        'Digital coordination through your preferred contact channel',
        'Timing confirmed in writing before payment',
      ]
    : [
        'Availability and account specification confirmed before payment',
        'Digital delivery through an agreed secure channel',
        'Setup and first-login guidance included',
      ];

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
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <a
            href="#order"
            className={cn(
              buttonClasses.base,
              buttonClasses.variants.primary,
              buttonClasses.sizes.lg,
            )}
          >
            {isService ? 'Check service availability' : 'Check availability'}
            <ArrowRightIcon className="rotate-90" />
          </a>
          {item.priceFrom != null && (
            <span className="text-sm text-ink-500">
              Indicative price from{' '}
              <span className="font-semibold text-ink-900">${item.priceFrom}</span>
            </span>
          )}
        </div>
        <div className="relative mt-8 aspect-video overflow-hidden rounded-2xl border border-ink-200 bg-ink-100">
          <PlatformVisual
            name={item.category?.name ?? item.title}
            icon={
              isService ? (
                <ServiceIcon slug={item.slug} className="h-8 w-8" />
              ) : (
                <GlobeIcon className="h-8 w-8" />
              )
            }
            className="h-full w-full"
          />
          <CoverImage
            mediaId={item.coverImageId}
            alt={item.title}
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>
        {item.description && (
          <div className="mt-8">
            <ContentBlocks blocks={item.description} />
          </div>
        )}
        <section className="mt-10 grid gap-5 sm:grid-cols-2">
          <div className="surface p-6">
            <h2 className="text-lg font-semibold text-ink-900">Before you request</h2>
            <ul className="mt-4 space-y-3">
              <li className="flex gap-2.5 text-sm leading-relaxed text-ink-600">
                <CheckIcon className="mt-0.5 shrink-0 text-brand-600" />
                Tell us your country, intended use and required quantity.
              </li>
              <li className="flex gap-2.5 text-sm leading-relaxed text-ink-600">
                <CheckIcon className="mt-0.5 shrink-0 text-brand-600" />
                Do not send passwords, payment PINs or identity documents in the first request.
              </li>
              <li className="flex gap-2.5 text-sm leading-relaxed text-ink-600">
                <CheckIcon className="mt-0.5 shrink-0 text-brand-600" />
                Wait for written confirmation of exact scope, availability and final price.
              </li>
            </ul>
          </div>
          <div className="surface p-6">
            <h2 className="text-lg font-semibold text-ink-900">Delivery and support</h2>
            <ul className="mt-4 space-y-3">
              {deliveryNotes.map((note) => (
                <li key={note} className="flex gap-2.5 text-sm leading-relaxed text-ink-600">
                  <CheckIcon className="mt-0.5 shrink-0 text-brand-600" />
                  {note}
                </li>
              ))}
            </ul>
          </div>
          <div className="surface p-6 sm:col-span-2">
            <h2 className="text-lg font-semibold text-ink-900">Important limitations</h2>
            <p className="mt-3 text-sm leading-relaxed text-ink-600">
              Platform access, verification, payments and business features are controlled by the
              platform and may depend on country, identity, device, phone number and current rules.
              Surjora does not guarantee permanent access, unrestricted features or approval by a
              third-party platform. Review the final written quote and policy terms before payment.
            </p>
          </div>
        </section>
        {faqs.length > 0 && <FaqAccordion faqs={faqs} />}
      </article>

      <aside className="lg:col-span-2">
        <div className="space-y-4 lg:sticky lg:top-24">
          <div id="order" className="surface scroll-mt-24 p-6">
            {item.priceFrom != null ? (
              <p className="text-sm text-ink-500">
                Indicative price from{' '}
                <span className="text-3xl font-bold text-ink-900">${item.priceFrom}</span>
              </p>
            ) : (
              <p className="text-lg font-semibold text-ink-900">Custom quote</p>
            )}
            <p className="mt-2 text-sm text-ink-600">
              Availability, exact scope and final price are confirmed manually before payment.
            </p>
            <ol className="mt-4 space-y-2 text-xs text-ink-600">
              <li>
                <span className="font-semibold text-ink-800">1.</span> Submit your requirements.
              </li>
              <li>
                <span className="font-semibold text-ink-800">2.</span> Receive availability, final
                price and delivery estimate.
              </li>
              <li>
                <span className="font-semibold text-ink-800">3.</span> Pay only after accepting the
                quote.
              </li>
            </ol>
            <div className="mt-5">
              <QuoteForm productId={item.id} requestType="quote" cta={quoteCta} />
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
