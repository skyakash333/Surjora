import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { cache } from 'react';
import { getProductBySlug, getRelatedArticles, getRelatedProducts } from '@/lib/data';
import { siteConfig } from '@/lib/constants';
import { getMediaById } from '@/lib/media';
import { RelatedList } from '@/components/product/related-list';
import { CatalogDetail } from '@/components/product/catalog-detail';
import { Breadcrumbs } from '@/components/layout/breadcrumbs';
import { BreadcrumbSchema, FaqSchema, ServiceSchema } from '@/components/seo/schemas';

export const revalidate = 3600;

type PageProps = {
  params: { slug: string };
};

export function generateStaticParams(): [] {
  return [];
}

async function getData(slug: string) {
  return getProductBySlug(slug);
}

const getPageData = cache(async (slug: string) => {
  const service = await getData(slug);
  const image = service?.coverImageId ? await getMediaById(service.coverImageId) : null;
  return { service, image };
});

function isService(service: NonNullable<Awaited<ReturnType<typeof getData>>>): boolean {
  return service.type === 'SERVICE';
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { service, image } = await getPageData(params.slug);
  if (!service || !isService(service)) notFound();
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
      ...(image ? { images: [{ url: image.url, alt: image.alt }] } : {}),
    },
    twitter: {
      card: image ? 'summary_large_image' : 'summary',
      title,
      description: description ?? undefined,
      ...(image ? { images: [image.url] } : {}),
    },
  };
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const { service, image } = await getPageData(params.slug);
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
      <ServiceSchema name={service.title} description={description} url={url} image={image?.url} />
      <FaqSchema faqs={faqs} />

      <div className="container py-12">
        <Breadcrumbs items={[{ label: 'Services', href: '/services' }, { label: service.title }]} />

        <CatalogDetail item={service} quoteCta="Request service availability" />

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
