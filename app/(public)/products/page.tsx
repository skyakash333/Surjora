import { getPublishedProducts } from '@/lib/data';
import { buildMetadata } from '@/lib/seo';
import { siteConfig } from '@/lib/constants';
import { ProductCard } from '@/components/product/product-card';
import { Breadcrumbs } from '@/components/layout/breadcrumbs';
import { SectionHeading } from '@/components/ui/section-heading';
import { EmptyState } from '@/components/ui/empty-state';
import { CtaSection } from '@/components/marketing/cta-section';
import { BreadcrumbSchema } from '@/components/seo/schemas';

export const revalidate = 3600;

export const metadata = buildMetadata({
  title: 'Chinese Accounts',
  description:
    'Buy verified Chinese accounts: WeChat, QQ, Alipay, WeCom, Xiaohongshu, Douyin, Taobao, 1688, JD, Baidu, Bilibili and more. Digital delivery with real support.',
  path: '/products',
});

export default async function ProductsPage() {
  const products = await getPublishedProducts();

  return (
    <>
      <BreadcrumbSchema
        items={[
          { label: 'Home', href: `${siteConfig.url}/` },
          { label: 'Products', href: `${siteConfig.url}/products` },
        ]}
      />
      <div className="container py-12">
        <Breadcrumbs items={[{ label: 'Products' }]} />
        <SectionHeading
          as="h1"
          eyebrow="Accounts"
          title="Chinese Accounts"
          description="Verified accounts for China's most important platforms — ready to use, with setup guidance and responsive support."
        />

        {products.length === 0 ? (
          <div className="mt-10">
            <EmptyState
              title="No accounts listed yet"
              description="We're preparing the catalog. Message us and we'll help you get exactly what you need."
              action={{ label: 'Contact us', href: '/contact' }}
            />
          </div>
        ) : (
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
                categoryName={product.category?.name ?? null}
                coverImageId={product.coverImageId}
                href={`/products/${product.slug}`}
              />
            ))}
          </ul>
        )}
      </div>

      <CtaSection
        title="Not sure which account you need?"
        description="Tell us your goal and we'll recommend the right account or service — and quote it for you."
      />
    </>
  );
}
