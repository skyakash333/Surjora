/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      { protocol: 'https', hostname: 'res.cloudinary.com' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
    ],
  },
  async redirects() {
    return [
      // Legacy / alternate entry points → canonical routes
      { source: '/home', destination: '/', permanent: true },
      { source: '/products/index', destination: '/products', permanent: true },
      { source: '/services/index', destination: '/services', permanent: true },
      // Common alternate naming for the catalog and knowledge hub
      { source: '/accounts', destination: '/products', permanent: true },
      { source: '/shop', destination: '/products', permanent: true },
      { source: '/blog', destination: '/knowledge', permanent: true },
      { source: '/blog/:slug', destination: '/knowledge', permanent: true },
      { source: '/articles', destination: '/knowledge', permanent: true },
      { source: '/faq', destination: '/support', permanent: true },
      { source: '/help', destination: '/support', permanent: true },
    ];
  },
};

export default nextConfig;
