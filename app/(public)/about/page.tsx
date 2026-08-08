import { buildMetadata } from '@/lib/seo';
import { siteConfig } from '@/lib/constants';
import { JsonLd } from '@/components/seo/json-ld';
import { Breadcrumbs } from '@/components/layout/breadcrumbs';

export const metadata = buildMetadata({
  title: 'About Surjora',
  description:
    'Surjora provides verified digital Chinese accounts and services with fast, responsive support. Learn how we work and why customers choose us.',
  path: '/about',
});

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
        <h1 className="text-4xl font-bold tracking-tight text-ink-900">About Surjora</h1>
        <p className="mt-4 max-w-2xl text-lg text-ink-600">
          Surjora is a digital services provider focused on Chinese platforms. We help individuals and
          businesses around the world get verified accounts and digital services for WeChat, QQ,
          Alipay, WeCom, Xiaohongshu, Douyin, Taobao and more.
        </p>

        <div className="mt-12 grid gap-8 md:grid-cols-2">
          <section>
            <h2 className="text-xl font-bold text-ink-900">What we do</h2>
            <p className="mt-3 text-ink-600">
              Everything we provide is digital. There are no physical products or shipping — you
              receive your account and credentials electronically, with setup guidance and after-sale
              support.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-ink-900">How we work</h2>
            <p className="mt-3 text-ink-600">
              Start by telling us what you need. We confirm details, share a quote, and deliver once
              everything is agreed. Our team is reachable directly on Telegram and WhatsApp.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-ink-900">Why choose Surjora</h2>
            <p className="mt-3 text-ink-600">
              Clear communication, transparent pricing, and support that stays available after
              delivery. We treat every request seriously and keep your information private.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-ink-900">Contact us</h2>
            <p className="mt-3 text-ink-600">
              Reach us anytime via Telegram, WhatsApp, or the contact form. We typically respond
              within a few hours.
            </p>
          </section>
        </div>
      </div>
    </>
  );
}
