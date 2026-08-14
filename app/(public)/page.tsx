import Link from 'next/link';
import { buildMetadata } from '@/lib/seo';
import { accountCategories, howItWorks, serviceHighlights, siteConfig } from '@/lib/constants';
import { slugify } from '@/lib/slug';
import { getFeaturedItems, getPublishedArticles } from '@/lib/data';
import { JsonLd } from '@/components/seo/json-ld';
import { ButtonLink } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ProductCard } from '@/components/product/product-card';
import { ArticleCard } from '@/components/content/article-card';
import { PlatformVisual } from '@/components/product/platform-visual';
import { TrustBar } from '@/components/marketing/trust-bar';
import { CtaSection } from '@/components/marketing/cta-section';
import {
  ArrowRightIcon,
  ServiceIcon,
  GlobeIcon,
  ShieldIcon,
  HeadsetIcon,
  BoltIcon,
} from '@/components/ui/icons';

export const revalidate = 3600;

export const metadata = buildMetadata({
  title: 'Buy Verified Chinese Accounts & Digital Services',
  description:
    'Verified Chinese accounts: WeChat, QQ, Alipay, WeCom, Xiaohongshu, Douyin, Taobao, JD, Baidu, Bilibili and more. Fast delivery, real support — request a quote today.',
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

/** Honest value points — describes how the service works, no invented statistics. */
const whySurjora = [
  {
    icon: GlobeIcon,
    title: 'Many platforms, one place',
    text: 'WeChat, Alipay, Douyin, Taobao, JD and more — find what you need without hunting across sellers.',
  },
  {
    icon: BoltIcon,
    title: 'Easy to browse',
    text: 'Clear categories and product pages make it simple to find the right account or service.',
  },
  {
    icon: ShieldIcon,
    title: 'Clear product info',
    text: 'Every listing explains what is included, so you know exactly what you are getting.',
  },
  {
    icon: HeadsetIcon,
    title: 'Support when you need it',
    text: 'Reach us on Telegram, WhatsApp or the contact form — we usually reply within a few hours.',
  },
];

export default async function HomePage() {
  const [featured, articles] = await Promise.all([getFeaturedItems(6), getPublishedArticles()]);

  const recentArticles = articles.slice(0, 3);

  return (
    <>
      <JsonLd data={organizationJsonLd} />

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-ink-200 bg-white">
        <div
          className="bg-grid pointer-events-none absolute inset-0 opacity-60"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-brand-50/60 to-transparent"
          aria-hidden="true"
        />
        <div className="container relative py-20 sm:py-28">
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="brand" className="mb-5">
              Chinese accounts &amp; services
            </Badge>
            <h1 className="text-balance text-4xl font-bold tracking-tight text-ink-900 sm:text-5xl lg:text-6xl">
              Access China&apos;s top platforms, made simple
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-ink-600">
              Verified accounts for WeChat, Alipay, Douyin, Taobao and more — plus verification and
              account help when you need it. Browse the catalog or ask us for a quote.
            </p>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
              <ButtonLink href="/products" size="lg">
                Browse products
              </ButtonLink>
              <ButtonLink href="/services" size="lg" variant="secondary">
                Explore services
              </ButtonLink>
            </div>
            <p className="mt-6 text-sm text-ink-500">
              13 account categories · 4 services · replies within hours
            </p>
          </div>
        </div>
      </section>

      <TrustBar />

      {/* Account categories */}
      <section className="container py-16 sm:py-20">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="eyebrow">Browse by platform</span>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-ink-900 sm:text-3xl">
              Chinese accounts we provide
            </h2>
            <p className="mt-2 max-w-2xl text-ink-600">
              Pick a platform to see accounts and pricing. Every category links straight to its
              products.
            </p>
          </div>
          <Link
            href="/products"
            className="inline-flex items-center gap-1 text-sm font-medium text-brand-600 hover:text-brand-700"
          >
            View all accounts
            <ArrowRightIcon />
          </Link>
        </div>
        <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {accountCategories.map((category) => (
            <li key={category.name}>
              <Link
                href={`/products/category/${slugify(category.name)}`}
                className="surface-interactive group flex h-full flex-col overflow-hidden focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500"
              >
                <PlatformVisual
                  name={category.name}
                  icon={<GlobeIcon className="h-6 w-6" />}
                  className="aspect-[16/9] w-full"
                />
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="font-semibold text-ink-900 transition-colors group-hover:text-brand-700">
                    {category.name}
                  </h3>
                  <p className="mt-1.5 flex-1 text-sm leading-relaxed text-ink-600">
                    {category.blurb}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-brand-600">
                    View category
                    <ArrowRightIcon className="transition-transform group-hover:translate-x-0.5" />
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>

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
                <p className="mt-2 max-w-2xl text-ink-600">
                  A selection of what customers ask for most often.
                </p>
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
                  categoryName={item.category?.name ?? null}
                  coverImageId={item.coverImageId}
                  href={
                    item.type === 'SERVICE' ? `/services/${item.slug}` : `/products/${item.slug}`
                  }
                />
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* Services */}
      <section className="border-y border-ink-200 bg-white">
        <div className="container py-16 sm:py-20">
          <span className="eyebrow">Services</span>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-ink-900 sm:text-3xl">
            Services to help you along the way
          </h2>
          <p className="mt-2 max-w-2xl text-ink-600">
            Beyond the accounts themselves — verification, QR scanning and hands-on help.
          </p>
          <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {serviceHighlights.map((service) => {
              const slug = slugify(service.name);
              return (
                <li key={service.name}>
                  <Link
                    href={`/services/${slug}`}
                    className="surface-interactive group flex h-full flex-col overflow-hidden focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500"
                  >
                    <PlatformVisual
                      name={service.name}
                      icon={<ServiceIcon slug={slug} className="h-6 w-6" />}
                      className="aspect-[16/9] w-full"
                    />
                    <div className="flex flex-1 flex-col p-5">
                      <h3 className="font-semibold text-ink-900 transition-colors group-hover:text-brand-700">
                        {service.name}
                      </h3>
                      <p className="mt-1.5 flex-1 text-sm leading-relaxed text-ink-600">
                        {service.blurb}
                      </p>
                      <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-brand-600">
                        Learn more
                        <ArrowRightIcon className="transition-transform group-hover:translate-x-0.5" />
                      </span>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* Why Surjora */}
      <section className="border-b border-ink-200 bg-ink-50/50">
        <div className="container py-16 sm:py-20">
          <span className="eyebrow">Why Surjora</span>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-ink-900 sm:text-3xl">
            A simpler way to get set up in China
          </h2>
          <p className="mt-2 max-w-2xl text-ink-600">
            Everything in one place, with clear information and real people to help.
          </p>
          <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {whySurjora.map((point) => (
              <li key={point.title} className="surface flex flex-col gap-3 p-6">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-50 text-brand-600 ring-1 ring-inset ring-brand-100">
                  <point.icon />
                </span>
                <h3 className="font-semibold text-ink-900">{point.title}</h3>
                <p className="text-sm leading-relaxed text-ink-600">{point.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* How it works */}
      <section className="container py-16 sm:py-20">
        <span className="eyebrow">How it works</span>
        <h2 className="mt-2 text-2xl font-bold tracking-tight text-ink-900 sm:text-3xl">
          Three simple steps
        </h2>
        <p className="mt-2 max-w-2xl text-ink-600">
          From question to delivery — no account or checkout required.
        </p>
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

      {/* Knowledge Hub preview */}
      {recentArticles.length > 0 && (
        <section className="border-y border-ink-200 bg-ink-50/50">
          <div className="container py-16 sm:py-20">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <span className="eyebrow">Knowledge Hub</span>
                <h2 className="mt-2 text-2xl font-bold tracking-tight text-ink-900 sm:text-3xl">
                  Guides &amp; tips for Chinese platforms
                </h2>
                <p className="mt-2 max-w-2xl text-ink-600">
                  Practical articles for getting set up and making the most of each platform.
                </p>
              </div>
              <Link
                href="/knowledge"
                className="inline-flex items-center gap-1 text-sm font-medium text-brand-600 hover:text-brand-700"
              >
                View all articles
                <ArrowRightIcon />
              </Link>
            </div>
            <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {recentArticles.map((article) => (
                <ArticleCard
                  key={article.id}
                  slug={article.slug}
                  title={article.title}
                  excerpt={article.excerpt}
                  categoryName={article.category?.name ?? null}
                  categorySlug={article.category?.slug ?? null}
                  readTimeMinutes={article.readTimeMinutes}
                  publishedAt={article.publishedAt?.toISOString() ?? null}
                  coverImageId={article.coverImageId}
                  showCover
                />
              ))}
            </ul>
          </div>
        </section>
      )}

      <CtaSection />
    </>
  );
}
