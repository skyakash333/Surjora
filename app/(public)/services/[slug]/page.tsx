import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import {
  getProductBySlug,
  getPublishedServiceSlugs,
  getRelatedArticles,
  getRelatedProducts,
} from '@/lib/data';
import { siteConfig } from '@/lib/constants';
import { ContentBlocks } from '@/components/content/content-blocks';
import { FaqAccordion } from '@/components/content/faq-accordion';
import { RelatedList } from '@/components/product/related-list';
import { Breadcrumbs } from '@/components/layout/breadcrumbs';
import { BreadcrumbSchema, FaqSchema, ServiceSchema } from '@/components/seo/schemas';
import { QuoteForm } from '@/components/forms/quote-form';
import { CoverImage } from '@/components/media/cover-image';

export const revalidate = 3600;

type PageProps = {
  params: { slug: string };
};

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const slugs = await getPublishedServiceSlugs();
  return slugs.map((slug) => ({ slug }));
}

async function getData(slug: string) {
  return getProductBySlug(slug);
}

function isService(service: NonNullable<Awaited<ReturnType<typeof getData>>>): boolean {
  return service.type === 'SERVICE';
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const service = await getData(params.slug);
  if (!service || !isService(service)) return {};
  return {
    title: service.seoTitle ?? `${service.title} | ${siteConfig.name}`,
    description: service.seoDescription ?? undefined,
  };
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const service = await getData(params.slug);
  if (!service || !isService(service)) notFound();

  const url = `${siteConfig.url}/services/${service.slug}`;
  const description = service.seoDescription ?? service.title;
  const faqs = service.faqs ?? [];
  const related = await getRelatedProducts(service.relatedProductIds, service.slug);
  const relatedArticles = await getRelatedArticles(service.relatedArticleIds, '');

  return (
    <>
      <BreadcrumbSchema
        items={[
          { label: 'Home', href: `${siteConfig.url}/` },
          { label: 'Services', href: `${siteConfig.url}/services` },
          { label: service.title, href: url },
        ]}
      />
      <ServiceSchema name={service.title} description={description} url={url} />
      <FaqSchema faqs={faqs} />

      <div className="container py-12">
        <Breadcrumbs items={[{ label: 'Services', href: '/services' }, { label: service.title }]} />
        <div className="grid gap-10 lg:grid-cols-5">
          <article className="lg:col-span-3">
            <h1 className="text-4xl font-bold tracking-tight text-ink-900">
              {service.h1 ?? service.title}
            </h1>
            {service.coverImageId && (
              <div className="mt-6">
                <CoverImage mediaId={service.coverImageId} alt={service.title} className="aspect-video w-full rounded-xl object-cover" />
              </div>
            )}
            {service.description && (
              <div className="mt-6">
                <ContentBlocks blocks={service.description} />
              </div>
            )}
            {faqs.length > 0 && <FaqAccordion faqs={faqs} />}
          </article>

          <aside className="lg:col-span-2">
            <div className="space-y-4 lg:sticky lg:top-24">
              <div className="rounded-lg border border-ink-200 bg-white p-6">
                {service.priceFrom ? (
                  <p className="text-sm text-ink-500">
                    Starting at{' '}
                    <span className="text-2xl font-bold text-ink-900">${service.priceFrom}</span>
                  </p>
                ) : (
                  <p className="text-sm text-ink-500">Custom quote</p>
                )}
                <p className="mt-2 text-sm text-ink-600">
                  All services handled personally. No payment required upfront.
                </p>
                <div className="mt-5">
                  <QuoteForm productId={service.id} requestType="buy" cta="Request this service" />
                </div>
                <p className="mt-3 text-xs text-ink-500">
                  Prefer instant chat? Message us on Telegram or WhatsApp via the contact page.
                </p>
              </div>

              {service.features && service.features.length > 0 && (
                <div className="rounded-lg border border-ink-200 bg-white p-6">
                  <h2 className="text-sm font-semibold uppercase tracking-wide text-ink-500">
                    What you get
                  </h2>
                  <ul className="mt-4 space-y-4">
                    {service.features.map((feature) => (
                      <li key={feature.title}>
                        <p className="font-medium text-ink-900">{feature.title}</p>
                        <p className="mt-1 text-sm text-ink-600">{feature.text}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </aside>
        </div>

        <RelatedList
          items={related.map((p) => ({
            id: p.id,
            title: p.title,
            description: p.seoDescription,
            href: p.type === 'SERVICE' ? `/services/${p.slug}` : `/products/${p.slug}`,
          }))}
          title="Related services"
        />

        {relatedArticles.length > 0 && (
          <RelatedList
            items={relatedArticles.map((a) => ({
              id: a.id,
              title: a.title,
              description: a.excerpt,
              href: `/knowledge/${a.category?.slug ?? 'articles'}/${a.slug}`,
            }))}
            title="Related reading"
          />
        )}
      </div>
    </>
  );
}
