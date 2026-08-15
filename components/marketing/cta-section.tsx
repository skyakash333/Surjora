import { ButtonLink } from '@/components/ui/button';
import { siteConfig } from '@/lib/constants';

type CtaSectionProps = {
  title?: string;
  description?: string;
};

/**
 * Conversion CTA reused across pages: primary contact button plus direct
 * Telegram/WhatsApp channels when configured.
 */
export function CtaSection({
  title = 'Ready to get started?',
  description = 'Send the platform, intended use, country and quantity so we can review the request.',
}: CtaSectionProps) {
  return (
    <section className="border-t border-ink-200 bg-gradient-to-b from-white to-ink-50">
      <div className="container py-16 sm:py-20">
        <div className="surface relative overflow-hidden bg-ink-900 px-6 py-12 text-center sm:px-12">
          <div
            className="bg-grid pointer-events-none absolute inset-0 opacity-10"
            aria-hidden="true"
          />
          <div className="relative">
            <h2 className="text-balance text-2xl font-bold tracking-tight text-white sm:text-3xl">
              {title}
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-ink-300">{description}</p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <ButtonLink href="/contact" size="lg">
                Request a quote
              </ButtonLink>
              {siteConfig.telegram && (
                <a
                  href={siteConfig.telegram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-xl bg-sky-500 px-6 py-3.5 font-semibold text-white transition hover:bg-sky-600"
                >
                  Telegram
                </a>
              )}
              {siteConfig.whatsapp && (
                <a
                  href={siteConfig.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-xl bg-emerald-600 px-6 py-3.5 font-semibold text-white transition hover:bg-emerald-700"
                >
                  WhatsApp
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
