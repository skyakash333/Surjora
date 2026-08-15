import type { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';
import Link from 'next/link';
import { getProductCategoryBySlug, getProductsByCategorySlug } from '@/lib/data';
import { buildMetadata } from '@/lib/seo';
import { siteConfig } from '@/lib/constants';
import { ProductCard } from '@/components/product/product-card';
import { Breadcrumbs } from '@/components/layout/breadcrumbs';
import { SectionHeading } from '@/components/ui/section-heading';
import { EmptyState } from '@/components/ui/empty-state';
import { CtaSection } from '@/components/marketing/cta-section';
import { BreadcrumbSchema } from '@/components/seo/schemas';
import { ArrowRightIcon } from '@/components/ui/icons';

export const revalidate = 3600;

type PageProps = {
  params: { slug: string };
};

export function generateStaticParams(): [] {
  return [];
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const category = await getProductCategoryBySlug(params.slug);
  if (!category) notFound();
  return buildMetadata({
    title: category.name,
    description:
      category.description ??
      `Review ${category.name} scope, requirements, limitations and the Surjora quote process.`,
    path: `/products/category/${category.slug}`,
  });
}

export default async function ProductCategoryPage({ params }: PageProps) {
  const category = await getProductCategoryBySlug(params.slug);
  if (!category) notFound();

  const products = await getProductsByCategorySlug(category.slug);
  if (products.length === 1 && products[0]) {
    redirect(`/products/${products[0].slug}`);
  }

  return (
    <>
      <BreadcrumbSchema
        items={[
          { label: 'Home', href: `${siteConfig.url}/` },
          { label: 'Products', href: `${siteConfig.url}/products` },
          { label: category.name, href: `${siteConfig.url}/products/category/${category.slug}` },
        ]}
      />
      <div className="container py-12">
        <Breadcrumbs items={[{ label: 'Products', href: '/products' }, { label: category.name }]} />
        <SectionHeading
          as="h1"
          eyebrow="Category"
          title={category.name}
          description={
            category.description ??
            `Review the available ${category.name} options, requirements and request process.`
          }
        />

        {products.length === 0 ? (
          <div className="mt-10">
            <EmptyState
              title="Nothing listed here yet"
              description="There are no published options in this category. Send the details for a manual review."
              action={{ label: 'Contact us', href: '/contact' }}
            />
          </div>
        ) : (
          <>
            <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  slug={product.slug}
                  title={product.title}
                  description={product.shortDescription ?? product.seoDescription}
                  priceFrom={product.priceFrom}
                  type={product.type}
                  featured={product.featured}
                  categoryName={category.name}
                  coverImageId={product.coverImageId}
                  href={`/products/${product.slug}`}
                />
              ))}
            </ul>
            <div className="mt-10">
              <Link
                href="/products"
                className="inline-flex items-center gap-1 text-sm font-medium text-brand-600 hover:text-brand-700"
              >
                Browse all accounts
                <ArrowRightIcon />
              </Link>
            </div>
          </>
        )}
      </div>

      <CtaSection
        title={`Questions about ${category.name}?`}
        description="Tell us your country, intended use and quantity so we can review the available options."
      />
    </>
  );
}
