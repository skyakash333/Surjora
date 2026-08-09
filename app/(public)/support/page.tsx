import { buildMetadata } from '@/lib/seo';
import { siteConfig } from '@/lib/constants';
import { JsonLd } from '@/components/seo/json-ld';
import { Breadcrumbs } from '@/components/layout/breadcrumbs';

export const metadata = buildMetadata({
  title: 'Support',
  description:
    'Frequently asked questions and support for Surjora accounts and services — delivery, usage, privacy, and how to get in touch.',
  path: '/support',
});

const faqs = [
  {
    question: 'How do I receive the account after ordering?',
    answer:
      'Everything is delivered digitally. Once your request is confirmed, we send the account details and credentials through a secure channel, along with setup guidance.',
  },
  {
    question: 'What payment methods do you accept?',
    answer:
      'Payments are handled manually on a per-order basis. Contact us for the current options available in your region.',
  },
  {
    question: 'Is it safe to buy a Chinese account?',
    answer:
      'We focus on accounts and services obtained and delivered in a way that protects your personal information. Your details are never shared, and we advise you on how to keep your account secure.',
  },
  {
    question: 'What do I need to get started?',
    answer:
      'Usually just the account or service you want and a contact method. For some services like verification, we may ask for a few details so we can confirm the process.',
  },
  {
    question: 'How fast is delivery?',
    answer:
      'Most requests are fulfilled within a short time after confirmation. Timeframes depend on the specific account or service and availability.',
  },
  {
    question: 'Can you handle custom requests?',
    answer:
      'Yes. If you need something specific that is not listed, tell us what you are trying to do and we will see how we can help.',
  },
];

export default function SupportPage() {
  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: faqs.map((faq) => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: { '@type': 'Answer', text: faq.answer },
          })),
        }}
      />
      <div className="container py-12">
        <Breadcrumbs items={[{ label: 'Support' }]} />
        <h1 className="text-4xl font-bold tracking-tight text-ink-900">Support</h1>
        <p className="mt-4 max-w-2xl text-lg text-ink-600">
          Answers to common questions about our accounts and services. Can&apos;t find what you
          need? Contact us directly.
        </p>

        <div className="mt-10 max-w-3xl">
          <h2 className="text-xl font-bold text-ink-900">Frequently asked questions</h2>
          <div className="mt-6 divide-y divide-ink-200 border-y border-ink-200">
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
        </div>

        <div className="mt-12 rounded-lg border border-ink-200 bg-white p-6">
          <h2 className="text-lg font-bold text-ink-900">Still need help?</h2>
          <p className="mt-2 text-sm text-ink-600">
            Message us on Telegram or WhatsApp for the fastest response.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            {siteConfig.telegram && (
              <a
                href={siteConfig.telegram}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg bg-sky-500 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-sky-600"
              >
                Telegram
              </a>
            )}
            {siteConfig.whatsapp && (
              <a
                href={siteConfig.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-emerald-700"
              >
                WhatsApp
              </a>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
