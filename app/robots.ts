import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/admin/',
          '/api/',
          '/_next/',
          '/private/',
          '/tmp/',
          '*.json$',
        ],
        crawlDelay: 1,
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: [
          '/admin/',
          '/api/',
        ],
        crawlDelay: 0,
      },
      {
        userAgent: 'Googlebot-Mobile',
        allow: '/',
        disallow: [
          '/admin/',
          '/api/',
        ],
        crawlDelay: 0,
      },
      {
        userAgent: 'Googlebot-Image',
        allow: [
          '/images/',
          '/projecten/',
        ],
        disallow: [
          '/admin/',
          '/api/',
        ],
      },
      {
        userAgent: 'bingbot',
        allow: '/',
        disallow: [
          '/admin/',
          '/api/',
          '/private/',
        ],
        crawlDelay: 1,
      },
    ],
    sitemap: 'https://yannova.be/sitemap.xml',
    host: 'https://yannova.be',
  }
}
