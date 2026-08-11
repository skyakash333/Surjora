import Link from 'next/link';
import { buildMetadata } from '@/lib/seo';
import { accountTypes, howItWorks, serviceTypes, siteConfig } from '@/lib/constants';
import { slugify } from '@/lib/slug';
import { getFeaturedItems, getVisibleTestimonials } from '@/lib/data';
import { JsonLd } from '@/components/seo/json-ld';
import { ButtonLink } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ProductCard } from '@/components/product/product-card';
import { TrustBar } from '@/components/marketing/trust-bar';
import { Testimonials } from '@/components/marketing/testimonials';
import { CtaSection } from '@/components/marketing/cta-section';
import { ArrowRightIcon, ServiceIcon } from '@/components/ui/icons';

export const revalidate = 3600;

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
  description: siteConfig.description,
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'sales',
    email: siteConfig.email,
  },
  sameAs: [siteConfig.telegram, siteConfig.whatsapp].filter(Boolean),
};

export default async function HomePage() {
  const [featured, testimonials] = await Promise.all([
    getFeaturedItems(6),
    getVisibleTestimonials(),
  ]);

  return (
    <>
      <JsonLd data={organizationJsonLd} />

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-ink-200 bg-white">
        <div className="bg-grid pointer-events-none absolute inset-0 opacity-60" aria-hidden="true" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-brand-50/60 to-transparent" aria-hidden="true" />
        <div className="container relative py-20 sm:py-28">
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="brand" className="mb-5">
              Digital-only · No shipping, no hardware
            </Badge>
            <h1 className="text-balance text-4xl font-bold tracking-tight text-ink-900 sm:text-5xl lg:text-6xl">
              Verified Chinese accounts &amp; digital services
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-ink-600">
              WeChat, QQ, Alipay, WeCom, Xiaohongshu, Douyin, Taobao and more — delivered digitally
              with real support. Get a quote in minutes.
            </p>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
              <ButtonLink href="/products" size="lg">
                Browse accounts
              </ButtonLink>
              <ButtonLink href="/contact" size="lg" variant="secondary">
                Request a quote
              </ButtonLink>
            </div>
            <p className="mt-6 text-sm text-ink-500">
              13 account categories · 4 digital services · replies within hours
            </p>
          </div>
        </div>
      </section>

      <TrustBar />

      {/* Featured */}
      {featured.length > 0 && (
        <section className="border-t border-ink-200 bg-ink-50/50">
          <div className="container py-16 sm:py-20">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <span className="eyebrow">Most requested</span>
                <h2 className="mt-2 text-2xl font-bold tracking-tight text-ink-900 sm:text-3xl">
                  Popular accounts &amp; services
                </h2>
              </div>
              <Link
                href="/products"
                className="inline-flex items-center gap-1 text-sm font-medium text-brand-600 hover:text-brand-700"
              >
                View all
                <ArrowRightIcon />
              </Link>
            </div>
            <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {featured.map((item) => (
                <ProductCard
                  key={item.id}
                  slug={item.slug}
                  title={item.title}
                  description={item.shortDescription ?? item.seoDescription}
                  priceFrom={item.priceFrom}
                  type={item.type}
                  featured
                  href={item.type === 'SERVICE' ? `/services/${item.slug}` : `/products/${item.slug}`}
                />
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* Account categories */}
      <section className="container py-16 sm:py-20">
        <span className="eyebrow">Accounts</span>
        <h2 className="mt-2 text-2xl font-bold tracking-tight text-ink-900 sm:text-3xl">
          Chinese accounts we provide
        </h2>
        <p className="mt-2 max-w-2xl text-ink-600">
          Every major platform, delivered digitally — no shipping, no hardware.
        </p>
        <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {accountTypes.map((item) => (
            <li key={item}>
              <Link
                href={`/products/${slugify(item)}`}
                className="group flex h-full items-center justify-between gap-3 rounded-xl border border-ink-200 bg-white px-5 py-4 text-sm font-medium text-ink-800 transition-all hover:border-brand-300 hover:bg-brand-50/40 hover:shadow-card"
              >
                {item}
                <ArrowRightIcon className="text-brand-600 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* Services */}
      <section className="border-y border-ink-200 bg-white">
        <div className="container py-16 sm:py-20">
          <span className="eyebrow">Services</span>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-ink-900 sm:text-3xl">
            Digital services
          </h2>
          <p className="mt-2 max-w-2xl text-ink-600">
            Beyond accounts — everything you need to access and run a Chinese digital presence.
          </p>
          <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {serviceTypes.map((item) => {
              const slug = slugify(item);
              return (
                <li key={item}>
                  <Link
                    href={`/services/${slug}`}
                    className="group surface-interactive flex h-full flex-col gap-3 p-6"
                  >
                    <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-50 text-brand-600 ring-1 ring-inset ring-brand-100 transition-colors group-hover:bg-brand-100">
                      <ServiceIcon slug={slug} />
                    </span>
                    <h3 className="font-semibold text-ink-900 group-hover:text-brand-700">{item}</h3>
                    <span className="mt-auto inline-flex items-center gap-1 text-sm font-medium text-brand-600">
                      Learn more
                      <ArrowRightIcon className="transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* How it works */}
      <section className="container py-16 sm:py-20">
        <span className="eyebrow">How it works</span>
        <h2 className="mt-2 text-2xl font-bold tracking-tight text-ink-900 sm:text-3xl">
          Three simple steps
        </h2>
        <ol className="mt-8 grid gap-6 sm:grid-cols-3">
          {howItWorks.map((item, index) => (
            <li key={item.title} className="surface relative p-6">
              <span className="grid h-10 w-10 items-center justify-center rounded-full bg-brand-600 text-sm font-bold text-white">
                {index + 1}
              </span>
              <h3 className="mt-4 font-semibold text-ink-900">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-600">{item.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <Testimonials items={testimonials} />

      <CtaSection />
    </>
  );
}
