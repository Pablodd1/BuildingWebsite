/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 60,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },

  trailingSlash: true,
  compress: true,

  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-DNS-Prefetch-Control', value: 'on' },
          { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        ],
      },
      {
        source: '/raster/:path*',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
      {
        source: '/favicons/:path*',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
    ];
  },

  async redirects() {
    return [
      { source: '/home', destination: '/', permanent: true },
      { source: '/index', destination: '/', permanent: true },
      { source: '/about', destination: '/unidades', permanent: true },
      { source: '/about/:path*', destination: '/unidades/building-innovation', permanent: true },
      { source: '/business-units', destination: '/unidades', permanent: true },
      { source: '/building-innovation', destination: '/unidades/building-innovation', permanent: true },
      { source: '/building-tech', destination: '/unidades/building-tech', permanent: true },
      { source: '/collections', destination: '/catalogo', permanent: true },
      { source: '/collections/interior', destination: '/catalogo?scope=Interior', permanent: true },
      { source: '/collections/exterior', destination: '/catalogo?scope=Exterior', permanent: true },
      { source: '/collections/:path*', destination: '/catalogo', permanent: true },
      { source: '/collection', destination: '/catalogo', permanent: true },
      { source: '/products/:id', destination: '/catalogo/:id', permanent: true },
      { source: '/product', destination: '/catalogo', permanent: true },
      { source: '/cart', destination: '/catalogo', permanent: true },
      { source: '/checkout', destination: '/contacto', permanent: true },
      { source: '/checkout/:path*', destination: '/contacto', permanent: true },
      { source: '/container-selection', destination: '/unidades/building-innovation', permanent: true },
      { source: '/logistics-lab', destination: '/unidades/building-innovation', permanent: true },
      { source: '/contact', destination: '/contacto', permanent: true },
      { source: '/faq', destination: '/contacto', permanent: true },
    ];
  },

  outputFileTracingExcludes: {
    '*': [
      'public/fichas/**/*',
      'public/videos/**/*',
      'public/media/**/*',
      'public/video/**/*',
      'public/raster/**/*',
      'public/catalogs/**/*',
      'static_data/*.pdf',
      'static_data/*.xlsx',
    ],
  },

  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion'],
    scrollRestoration: true,
  },
};

export default nextConfig;
