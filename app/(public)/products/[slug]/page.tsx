import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getProductBySlug, getPublishedProductSlugs, getRelatedProducts } from '@/lib/data';
import { siteConfig } from '@/lib/constants';
import { ContentBlocks } from '@/components/content/content-blocks';
import { FaqAccordion } from '@/components/content/faq-accordion';
import { RelatedList } from '@/components/product/related-list';
import { Breadcrumbs } from '@/components/layout/breadcrumbs';
import { BreadcrumbSchema, FaqSchema, ProductSchema } from '@/components/seo/schemas';
import { ButtonLink } from '@/components/ui/button';

export const revalidate = 3600;

type PageProps = {
  params: { slug: string };
};

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const slugs = await getPublishedProductSlugs();
  return slugs.map((slug) => ({ slug }));
}

async function getData(slug: string) {
  return getProductBySlug(slug);
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const product = await getData(params.slug);
  if (!product) return {};
  return {
    title: product.seoTitle ?? `${product.title} | ${siteConfig.name}`,
    description: product.seoDescription ?? undefined,
  };
}

export default async function ProductDetailPage({ params }: PageProps) {
  const product = await getData(params.slug);
  if (!product) notFound();

  const url = `${siteConfig.url}/products/${product.slug}`;
  const description = product.seoDescription ?? product.title;
  const faqs = product.faqs ?? [];
  const related = await getRelatedProducts(product.relatedProductIds, product.slug);

  return (
    <>
      <BreadcrumbSchema
        items={[
          { label: 'Home', href: `${siteConfig.url}/` },
          { label: 'Products', href: `${siteConfig.url}/products` },
          { label: product.title, href: url },
        ]}
      />
      <ProductSchema
        name={product.title}
        description={description}
        url={url}
        priceFrom={product.priceFrom}
      />
      <FaqSchema faqs={faqs} />

      <div className="container py-12">
        <Breadcrumbs items={[{ label: 'Products', href: '/products' }, { label: product.title }]} />
        <div className="grid gap-10 lg:grid-cols-5">
          <article className="lg:col-span-3">
            <h1 className="text-4xl font-bold tracking-tight text-ink-900">
              {product.h1 ?? product.title}
            </h1>
            {product.description && (
              <div className="mt-6">
                <ContentBlocks blocks={product.description} />
              </div>
            )}
            {faqs.length > 0 && <FaqAccordion faqs={faqs} />}
          </article>

          <aside className="lg:col-span-2">
            <div className="space-y-4 lg:sticky lg:top-24">
              <div className="rounded-lg border border-ink-200 bg-white p-6">
                {product.priceFrom ? (
                  <p className="text-sm text-ink-500">
                    Starting at{' '}
                    <span className="text-2xl font-bold text-ink-900">${product.priceFrom}</span>
                  </p>
                ) : (
                  <p className="text-sm text-ink-500">Custom quote</p>
                )}
                <p className="mt-2 text-sm text-ink-600">
                  All orders handled personally. No payment required upfront.
                </p>
                <div className="mt-5">
                  <ButtonLink href="/contact" size="lg" className="w-full">
                    Request a quote
                  </ButtonLink>
                </div>
                <p className="mt-3 text-xs text-ink-500">
                  Prefer instant chat? Message us on Telegram or WhatsApp via the contact page.
                </p>
              </div>

              {product.features && product.features.length > 0 && (
                <div className="rounded-lg border border-ink-200 bg-white p-6">
                  <h2 className="text-sm font-semibold uppercase tracking-wide text-ink-500">
                    What you get
                  </h2>
                  <ul className="mt-4 space-y-4">
                    {product.features.map((feature) => (
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

        <RelatedList items={related} title="Related accounts" />
      </div>
    </>
  );
}
