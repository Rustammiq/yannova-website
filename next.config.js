/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
      },
    ],
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 86400, // Verhoogd naar 24 uur
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    // Nieuwe optimalisaties
    unoptimized: false,
  },

  // Performance optimalisaties
  experimental: {
    esmExternals: 'loose',
    optimizePackageImports: ['lucide-react'],
    scrollRestoration: true,
    optimizeCss: true,
  },

  // Static optimization
  staticPageGenerationTimeout: 1000,

  // Bundle optimalisatie
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Fix for server-side rendering issues
    if (isServer) {
      // Prevent client-side code from being bundled in server bundle
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          ...config.optimization?.splitChunks,
          cacheGroups: {
            ...config.optimization?.splitChunks?.cacheGroups,
            default: false,
            vendors: false,
          },
        },
      };

      // Exclude 'self' package from server bundle to prevent conflicts
      config.externals = config.externals || [];
      config.externals.push({
        'self': 'self'
      });
    } else {
      // Client-side polyfills
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
        crypto: false,
        stream: false,
        url: false,
        zlib: false,
        http: false,
        https: false,
        assert: false,
        os: false,
        path: false,
        // Browser polyfills
        global: require.resolve('globalthis/polyfill'),
        self: require.resolve('self'),
      };

      // Add browser polyfills
      config.resolve.alias = {
        ...config.resolve.alias,
        global: require.resolve('globalthis/polyfill'),
        self: require.resolve('self'),
      };
    }

    // Global polyfills for both server and client
    config.plugins.push(
      new webpack.ProvidePlugin({
        Buffer: ['buffer', 'Buffer'],
        process: 'process/browser',
      })
    );

    // Define browser globals
    config.plugins.push(
      new webpack.DefinePlugin({
        'typeof window': JSON.stringify('object'),
        'typeof document': JSON.stringify('object'),
        'typeof self': JSON.stringify('object'),
        'typeof global': JSON.stringify('object'),
        'global': 'globalThis',
        'self': 'self',
        'global.self': 'globalThis.self',
      })
    );

    // Performance optimalisaties
    if (!dev) {
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          chunks: 'all',
          cacheGroups: {
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name: 'vendors',
              chunks: 'all',
              priority: 10,
            },
            lucide: {
              test: /[\\/]node_modules[\\/]lucide-react[\\/]/,
              name: 'lucide',
              chunks: 'all',
              priority: 20,
            },
          },
        },
      };
    }

    return config;
  },

  // Build optimalisatie
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  async headers() {
    return [
      {
        source: '/((?!_next/static).*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
      {
        source: '/_next/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/images/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/favicon.ico',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/icons/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/videos/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400',
          },
        ],
      },
    ];
  },
}

module.exports = nextConfig
