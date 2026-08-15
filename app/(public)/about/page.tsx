import { buildMetadata } from '@/lib/seo';
import { siteConfig, howItWorks } from '@/lib/constants';
import { JsonLd } from '@/components/seo/json-ld';
import { Breadcrumbs } from '@/components/layout/breadcrumbs';
import { SectionHeading } from '@/components/ui/section-heading';
import { CtaSection } from '@/components/marketing/cta-section';
import { TrustBar } from '@/components/marketing/trust-bar';

export const metadata = buildMetadata({
  title: 'About Surjora',
  description:
    'Learn how Surjora manually reviews Chinese platform account and assistance requests before quote, payment and digital delivery.',
  path: '/about',
});

const values = [
  {
    title: 'What we do',
    text: 'We review requests for Chinese platform account options and related assistance. Available scope, customer requirements and delivery details depend on the platform and use case.',
  },
  {
    title: 'How we work',
    text: 'Start by describing what you need. We review eligibility and availability, define the scope in writing, and proceed only after you accept the quote.',
  },
  {
    title: 'Why choose Surjora',
    text: 'The request process separates inquiry, quote, payment and fulfilment. Platform limitations and customer-side steps are stated before payment.',
  },
  {
    title: 'Staying in touch',
    text: 'Use email, Telegram, WhatsApp or the contact form. The reply channel and any time-sensitive coordination are confirmed for each request.',
  },
];

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'AboutPage',
          name: 'About Surjora',
          url: `${siteConfig.url}/about`,
        }}
      />
      <div className="container py-12">
        <Breadcrumbs items={[{ label: 'About' }]} />
        <SectionHeading
          as="h1"
          eyebrow="About"
          title="Digital Chinese accounts, handled personally"
          description="Surjora helps individuals and businesses review account and assistance options for WeChat, QQ, Alipay, WeCom, Xiaohongshu, Douyin, Taobao and more."
        />

        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          {values.map((value) => (
            <section key={value.title} className="surface p-6">
              <h2 className="text-lg font-semibold text-ink-900">{value.title}</h2>
              <p className="mt-3 leading-relaxed text-ink-600">{value.text}</p>
            </section>
          ))}
        </div>

        <div className="mt-16">
          <SectionHeading
            as="h2"
            eyebrow="Process"
            title="How it works"
            description="Three clear steps from initial request to agreed digital delivery."
          />
          <ol className="mt-8 grid gap-5 sm:grid-cols-3">
            {howItWorks.map((step, index) => (
              <li key={step.title} className="surface p-6">
                <span className="grid h-9 w-9 place-items-center rounded-full bg-brand-50 text-sm font-bold text-brand-600">
                  {index + 1}
                </span>
                <h3 className="mt-4 font-semibold text-ink-900">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-600">{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>

      <TrustBar />

      <CtaSection
        title="Ready to get started?"
        description="Tell us the platform, intended use, country and quantity so we can review the request."
      />
    </>
  );
}
