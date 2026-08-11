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
    'Surjora provides verified digital Chinese accounts and services with fast, responsive support. Learn how we work and why customers choose us.',
  path: '/about',
});

const values = [
  {
    title: 'What we do',
    text: 'Everything we provide is digital. There are no physical products or shipping — you receive your account and credentials electronically, with setup guidance and after-sale support.',
  },
  {
    title: 'How we work',
    text: 'Start by telling us what you need. We confirm details, share a quote, and deliver once everything is agreed. Our team is reachable directly on Telegram and WhatsApp.',
  },
  {
    title: 'Why choose Surjora',
    text: 'Clear communication, transparent pricing, and support that stays available after delivery. We treat every request seriously and keep your information private.',
  },
  {
    title: 'Staying in touch',
    text: 'Reach us anytime via Telegram, WhatsApp, or the contact form. We typically respond within a few hours, wherever you are in the world.',
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
          description="Surjora helps individuals and businesses around the world get verified accounts and digital services for WeChat, QQ, Alipay, WeCom, Xiaohongshu, Douyin, Taobao and more — all delivered digitally."
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
            description="Three simple steps from question to delivery — no accounts, no checkout friction."
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
        description="Tell us what you need and we'll reply with a quote — usually within a few hours."
      />
    </>
  );
}
