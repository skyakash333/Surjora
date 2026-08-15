import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { cache } from 'react';
import { getProductBySlug, getRelatedArticles, getRelatedProducts } from '@/lib/data';
import { siteConfig } from '@/lib/constants';
import { getMediaById } from '@/lib/media';
import { RelatedList } from '@/components/product/related-list';
import { CatalogDetail } from '@/components/product/catalog-detail';
import { Breadcrumbs } from '@/components/layout/breadcrumbs';
import { BreadcrumbSchema, FaqSchema, ProductSchema } from '@/components/seo/schemas';
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
  const product = await getData(slug);
  const image = product?.coverImageId ? await getMediaById(product.coverImageId) : null;
  return { product, image };
});

function isProduct(product: NonNullable<Awaited<ReturnType<typeof getData>>>): boolean {
  return product.type === 'PRODUCT';
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { product, image } = await getPageData(params.slug);
  if (!product || !isProduct(product)) notFound();
  const title = product.seoTitle ?? `${product.title} | ${siteConfig.name}`;
  const description = product.seoDescription ?? product.shortDescription ?? undefined;
  const url = `${siteConfig.url}/products/${product.slug}`;
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

export default async function ProductDetailPage({ params }: PageProps) {
  const { product, image } = await getPageData(params.slug);
  if (!product || !isProduct(product)) notFound();

  const url = `${siteConfig.url}/products/${product.slug}`;
  const description = product.seoDescription ?? product.shortDescription ?? product.title;
  const faqs = product.faqs ?? [];
  const related = await getRelatedProducts(product.relatedProductIds, product.slug);
  const relatedArticles = await getRelatedArticles(product.relatedArticleIds, '');

  return (
    <>
      <BreadcrumbSchema
        items={[
          { label: 'Home', href: `${siteConfig.url}/` },
          { label: 'Products', href: `${siteConfig.url}/products` },
          { label: product.title, href: url },
        ]}
      />
      <ProductSchema name={product.title} description={description} url={url} image={image?.url} />
      <FaqSchema faqs={faqs} />

      <div className="container py-12">
        <Breadcrumbs items={[{ label: 'Products', href: '/products' }, { label: product.title }]} />

        <CatalogDetail item={product} quoteCta="Request availability & quote" />

        <RelatedList
          items={related.map((p) => ({
            id: p.id,
            title: p.title,
            description: p.shortDescription ?? p.seoDescription,
            href: p.type === 'SERVICE' ? `/services/${p.slug}` : `/products/${p.slug}`,
          }))}
          title="Related accounts"
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
