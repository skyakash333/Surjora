import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import {
  getProductBySlug,
  getPublishedServiceSlugs,
  getRelatedArticles,
  getRelatedProducts,
} from '@/lib/data';
import { siteConfig } from '@/lib/constants';
import { RelatedList } from '@/components/product/related-list';
import { CatalogDetail } from '@/components/product/catalog-detail';
import { Breadcrumbs } from '@/components/layout/breadcrumbs';
import { BreadcrumbSchema, FaqSchema, ServiceSchema } from '@/components/seo/schemas';

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
  const title = service.seoTitle ?? `${service.title} | ${siteConfig.name}`;
  const description = service.seoDescription ?? service.shortDescription ?? undefined;
  const url = `${siteConfig.url}/services/${service.slug}`;
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: url },
    openGraph: {
      type: 'website',
      url,
      siteName: siteConfig.name,
      title,
      description: description ?? undefined,
    },
    twitter: { card: 'summary_large_image', title, description: description ?? undefined },
  };
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const service = await getData(params.slug);
  if (!service || !isService(service)) notFound();

  const url = `${siteConfig.url}/services/${service.slug}`;
  const description = service.seoDescription ?? service.shortDescription ?? service.title;
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

        <CatalogDetail item={service} quoteCta="Request this service" />

        <RelatedList
          items={related.map((p) => ({
            id: p.id,
            title: p.title,
            description: p.shortDescription ?? p.seoDescription,
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
