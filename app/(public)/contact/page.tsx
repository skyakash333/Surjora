import { buildMetadata } from '@/lib/seo';
import { siteConfig } from '@/lib/constants';
import { JsonLd } from '@/components/seo/json-ld';
import { Breadcrumbs } from '@/components/layout/breadcrumbs';
import { ContactForm } from '@/components/forms/contact-form';

export const metadata = buildMetadata({
  title: 'Contact Us',
  description:
    'Contact Surjora for Chinese accounts and services: WeChat, QQ, Alipay, Xiaohongshu, Douyin, Taobao and more. Reach us via Telegram, WhatsApp or the contact form.',
  path: '/contact',
});

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'ContactPage',
          name: 'Contact Surjora',
          url: `${siteConfig.url}/contact`,
          mainEntity: {
            '@type': 'Organization',
            name: siteConfig.name,
            email: siteConfig.email,
          },
        }}
      />
      <div className="container py-12">
        <Breadcrumbs items={[{ label: 'Contact' }]} />
        <h1 className="text-4xl font-bold tracking-tight text-ink-900">Contact us</h1>
        <p className="mt-4 max-w-2xl text-lg text-ink-600">
          Tell us which account or service you need and we will get back to you with a quote.
          Prefer instant chat? Use Telegram or WhatsApp.
        </p>

        <div className="mt-10 grid gap-10 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <div className="rounded-lg border border-ink-200 bg-white p-6">
              <h2 className="text-lg font-bold text-ink-900">Send a message</h2>
              <div className="mt-5">
                <ContactForm />
              </div>
            </div>
          </div>

          <aside className="lg:col-span-2">
            <div className="space-y-4">
              <div className="rounded-lg border border-ink-200 bg-white p-6">
                <h2 className="text-sm font-semibold uppercase tracking-wide text-ink-500">
                  Fastest reply
                </h2>
                <div className="mt-4 space-y-3">
                  <a
                    href={siteConfig.telegram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between rounded-lg bg-sky-500 px-4 py-3 text-sm font-medium text-white transition hover:bg-sky-600"
                  >
                    Telegram
                    <span aria-hidden="true">→</span>
                  </a>
                  <a
                    href={siteConfig.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between rounded-lg bg-emerald-600 px-4 py-3 text-sm font-medium text-white transition hover:bg-emerald-700"
                  >
                    WhatsApp
                    <span aria-hidden="true">→</span>
                  </a>
                </div>
              </div>

              <div className="rounded-lg border border-ink-200 bg-white p-6">
                <h2 className="text-sm font-semibold uppercase tracking-wide text-ink-500">
                  What to include
                </h2>
                <ul className="mt-3 list-inside list-disc space-y-1.5 text-sm text-ink-600">
                  <li>Which account or service you need</li>
                  <li>Purpose / how it will be used</li>
                  <li>Preferred contact method</li>
                  <li>Any deadlines</li>
                </ul>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
