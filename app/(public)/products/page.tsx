import { getPublishedProducts } from '@/lib/data';
import { buildMetadata } from '@/lib/seo';
import { siteConfig } from '@/lib/constants';
import { ProductCard } from '@/components/product/product-card';
import { Breadcrumbs } from '@/components/layout/breadcrumbs';
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
          {
            label: 'Products',
            href: `${siteConfig.url}/products`,
          },
        ]}
      />
      <div className="container py-12">
        <Breadcrumbs items={[{ label: 'Products' }]} />
        <h1 className="text-4xl font-bold tracking-tight text-ink-900">Chinese Accounts</h1>
        <p className="mt-4 max-w-2xl text-lg text-ink-600">
          Verified digital accounts for China&apos;s most important platforms. All delivered
          digitally — no shipping, no hardware.
        </p>

        {products.length === 0 ? (
          <div className="mt-10 rounded-lg border border-ink-200 bg-white p-8">
            <p className="text-ink-600">
              No products are listed right now. Message us and we&apos;ll help you get what you need.
            </p>
            <a href="/contact" className="mt-4 inline-block font-medium text-brand-600 hover:text-brand-700">
              Contact us →
            </a>
          </div>
        ) : (
          <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                slug={product.slug}
                title={product.title}
                seoDescription={product.seoDescription}
                priceFrom={product.priceFrom}
                href={`/products/${product.slug}`}
              />
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
