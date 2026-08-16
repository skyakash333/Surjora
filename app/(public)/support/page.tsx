import { buildMetadata } from '@/lib/seo';
import { siteConfig } from '@/lib/constants';
import { JsonLd } from '@/components/seo/json-ld';
import { Breadcrumbs } from '@/components/layout/breadcrumbs';
import { SectionHeading } from '@/components/ui/section-heading';
import { FaqAccordion } from '@/components/content/faq-accordion';
import { ButtonLink } from '@/components/ui/button';

export const metadata = buildMetadata({
  title: 'Support',
  description:
    'Frequently asked questions and support for Wechatscan accounts and services — delivery, usage, privacy, and how to get in touch.',
  path: '/support',
});

const faqs = [
  {
    question: 'How do I receive the account after ordering?',
    answer:
      'First submit an availability request. We confirm the exact scope, final price, delivery estimate and payment method in writing. After you accept the quote and payment is confirmed, delivery is completed digitally through the agreed channel.',
  },
  {
    question: 'What payment methods do you accept?',
    answer:
      'Payments are handled manually on a per-order basis. Contact us for the current options available in your region.',
  },
  {
    question: 'Is it safe to buy a Chinese account?',
    answer:
      'Digital accounts can carry platform, ownership, verification and recovery risks. Review the written specification and policies, use accurate information, keep recovery methods under your control and follow the relevant platform rules.',
  },
  {
    question: 'What do I need to get started?',
    answer:
      'Usually just the account or service you want and a contact method. For some services like verification, we may ask for a few details so we can confirm the process.',
  },
  {
    question: 'How fast is delivery?',
    answer:
      'Timing is confirmed in the written quote after availability and requirements are reviewed. Platform checks and customer-side steps can affect delivery.',
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
        <SectionHeading
          as="h1"
          eyebrow="Support"
          title="How can we help?"
          description="Answers to common questions about requests, quotes, delivery, platform limitations and support."
        />

        <div className="mt-10 grid gap-10 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <FaqAccordion faqs={faqs} title={null} />
          </div>

          <aside className="lg:col-span-2">
            <div className="surface p-6 lg:sticky lg:top-24">
              <h2 className="text-lg font-semibold text-ink-900">Still need help?</h2>
              <p className="mt-2 text-sm leading-relaxed text-ink-600">
                Message us on Telegram or WhatsApp, or send a detailed message through the contact
                form. Include your request reference when you have one.
              </p>
              <div className="mt-5 flex flex-col gap-2.5">
                {siteConfig.telegram && (
                  <a
                    href={siteConfig.telegram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-lg bg-sky-500 px-4 py-2.5 text-center text-sm font-semibold text-white transition hover:bg-sky-600"
                  >
                    Telegram
                  </a>
                )}
                {siteConfig.whatsapp && (
                  <a
                    href={siteConfig.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-lg bg-emerald-600 px-4 py-2.5 text-center text-sm font-semibold text-white transition hover:bg-emerald-700"
                  >
                    WhatsApp
                  </a>
                )}
                <ButtonLink href="/contact" variant="secondary" className="w-full justify-center">
                  Contact form
                </ButtonLink>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
