import { buildMetadata } from '@/lib/seo';
import { siteConfig } from '@/lib/constants';
import { JsonLd } from '@/components/seo/json-ld';
import { Breadcrumbs } from '@/components/layout/breadcrumbs';
import { SectionHeading } from '@/components/ui/section-heading';
import { ContactForm } from '@/components/forms/contact-form';
import { CheckIcon } from '@/components/ui/icons';

export const metadata = buildMetadata({
  title: 'Contact Us',
  description:
    'Contact Surjora for Chinese accounts and services: WeChat, QQ, Alipay, Xiaohongshu, Douyin, Taobao and more. Reach us via Telegram, WhatsApp or the contact form.',
  path: '/contact',
});

const checklist = [
  'Which account or service you need',
  'Purpose / how it will be used',
  'Preferred contact method',
  'Any deadlines',
];

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
        <SectionHeading
          as="h1"
          eyebrow="Contact"
          title="Tell us what you need"
          description="Share the account or service you're after and we'll reply with a quote. Prefer instant chat? Use Telegram or WhatsApp."
        />

        <div className="mt-10 grid gap-10 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <div className="surface p-6 sm:p-8">
              <h2 className="text-lg font-semibold text-ink-900">Send a message</h2>
              <div className="mt-5">
                <ContactForm />
              </div>
            </div>
          </div>

          <aside className="lg:col-span-2">
            <div className="space-y-4">
              <div className="surface p-6">
                <h2 className="eyebrow text-ink-500">Fastest reply</h2>
                <div className="mt-4 space-y-3">
                  {siteConfig.telegram && (
                    <a
                      href={siteConfig.telegram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between rounded-lg bg-sky-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-sky-600"
                    >
                      Telegram
                      <span aria-hidden="true">→</span>
                    </a>
                  )}
                  {siteConfig.whatsapp && (
                    <a
                      href={siteConfig.whatsapp}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between rounded-lg bg-emerald-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700"
                    >
                      WhatsApp
                      <span aria-hidden="true">→</span>
                    </a>
                  )}
                  {!siteConfig.telegram && !siteConfig.whatsapp && (
                    <a
                      href={`mailto:${siteConfig.email}`}
                      className="flex items-center justify-between rounded-lg bg-brand-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-brand-700"
                    >
                      Email us
                      <span aria-hidden="true">→</span>
                    </a>
                  )}
                </div>
              </div>

              <div className="surface p-6">
                <h2 className="eyebrow text-ink-500">What to include</h2>
                <ul className="mt-4 space-y-3">
                  {checklist.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-ink-600">
                      <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-brand-50 text-brand-600">
                        <CheckIcon className="h-3 w-3" />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
