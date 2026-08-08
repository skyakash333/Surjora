import Link from 'next/link';
import { buildMetadata } from '@/lib/seo';
import { accountTypes, serviceTypes, siteConfig } from '@/lib/constants';
import { slugify } from '@/lib/slug';
import { JsonLd } from '@/components/seo/json-ld';
import { ButtonLink } from '@/components/ui/button';

export const metadata = buildMetadata({
  title: 'Buy Verified Chinese Accounts & Digital Services',
  description:
    'Verified digital Chinese accounts: WeChat, QQ, Alipay, WeCom, Xiaohongshu, Douyin, Taobao, JD, Baidu, Bilibili and more. Fast delivery, real support — request a quote today.',
  path: '/',
});

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: siteConfig.name,
  url: siteConfig.url,
  logo: `${siteConfig.url}/logo.png`,
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'sales',
    email: siteConfig.email,
  },
  sameAs: [siteConfig.telegram, siteConfig.whatsapp],
};

export default function HomePage() {
  return (
    <>
      <JsonLd data={organizationJsonLd} />

      <section className="border-b border-ink-200 bg-gradient-to-b from-white to-ink-50">
        <div className="container py-20 text-center">
          <h1 className="mx-auto max-w-3xl text-4xl font-bold tracking-tight text-ink-900 sm:text-5xl">
            Verified Chinese Accounts &amp; Digital Services
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-ink-600">
            WeChat, QQ, Alipay, WeCom, Xiaohongshu, Douyin, Taobao and more — delivered digitally
            with real support. Get a quote in minutes.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <ButtonLink href="/contact" size="lg">
              Request a quote
            </ButtonLink>
            <ButtonLink href="/products" size="lg" variant="secondary">
              Browse accounts
            </ButtonLink>
          </div>
        </div>
      </section>

      <section className="container py-16">
        <h2 className="text-2xl font-bold tracking-tight text-ink-900">
          Chinese accounts we provide
        </h2>
        <p className="mt-2 text-ink-600">All delivered digitally — no shipping, no hardware.</p>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {accountTypes.map((item) => (
            <li key={item}>
              <Link
                href={`/products/${slugify(item)}`}
                className="flex h-full items-center justify-between rounded-lg border border-ink-200 bg-white px-5 py-4 text-sm font-medium text-ink-800 transition hover:border-brand-400 hover:shadow-sm"
              >
                {item}
                <span aria-hidden="true" className="text-brand-600">
                  →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="border-y border-ink-200 bg-white">
        <div className="container py-16">
          <h2 className="text-2xl font-bold tracking-tight text-ink-900">Digital services</h2>
          <p className="mt-2 text-ink-600">
            Beyond accounts — everything you need to access and run a Chinese digital presence.
          </p>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {serviceTypes.map((item) => (
              <li key={item}>
                <Link
                  href={`/services/${slugify(item)}`}
                  className="flex h-full items-center justify-between rounded-lg border border-ink-200 bg-ink-50 px-5 py-6 text-sm font-medium text-ink-800 transition hover:border-brand-400"
                >
                  {item}
                  <span aria-hidden="true" className="text-brand-600">
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="container py-16">
        <h2 className="text-2xl font-bold tracking-tight text-ink-900">How it works</h2>
        <ol className="mt-8 grid gap-6 sm:grid-cols-3">
          {[
            {
              step: '1',
              title: 'Tell us what you need',
              text: 'Pick an account or service and message us on Telegram, WhatsApp or the contact form.',
            },
            {
              step: '2',
              title: 'Get a quote',
              text: 'We reply with pricing and details — usually within a few hours.',
            },
            {
              step: '3',
              title: 'Receive your account',
              text: 'Everything is delivered digitally with setup guidance and support.',
            },
          ].map((item) => (
            <li key={item.step} className="rounded-lg border border-ink-200 bg-white p-6">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-brand-100 text-sm font-bold text-brand-700">
                {item.step}
              </span>
              <h3 className="mt-4 font-semibold text-ink-900">{item.title}</h3>
              <p className="mt-2 text-sm text-ink-600">{item.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="border-t border-ink-200 bg-gradient-to-b from-ink-50 to-white">
        <div className="container py-16 text-center">
          <h2 className="text-2xl font-bold tracking-tight text-ink-900">Ready to get started?</h2>
          <p className="mx-auto mt-3 max-w-xl text-ink-600">
            Message us directly for the fastest reply, or use the contact form.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <ButtonLink href="/contact" size="lg">
              Contact us
            </ButtonLink>
            <a
              href={siteConfig.telegram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-lg bg-sky-500 px-6 py-3 font-medium text-white transition hover:bg-sky-600"
            >
              Telegram
            </a>
            <a
              href={siteConfig.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-lg bg-emerald-600 px-6 py-3 font-medium text-white transition hover:bg-emerald-700"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
