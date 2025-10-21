import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Yannova Bouw - Van Begin tot Eind',
    short_name: 'Yannova Bouw',
    description: 'Professionele bouwoplossingen van begin tot eind. Yannova Bouw realiseert uw droomproject met vakmanschap en passie in Keerbergen, Mechelen, Putte, Bonheiden, Rijmenam en Leuven.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#D4A574',
    orientation: 'portrait-primary',
    categories: ['business', 'construction', 'building'],
    lang: 'nl-BE',
    scope: '/',
    id: 'yannova-bouw-app',
    display_override: ['window-controls-overlay'],
    icons: [
      {
        src: '/icons/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable'
      },
      {
        src: '/icons/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable'
      },
      {
        src: '/icons/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any'
      },
      {
        src: '/icons/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any'
      }
    ],
    screenshots: [
      {
        src: '/screenshots/desktop.png',
        sizes: '1280x720',
        type: 'image/png'
      },
      {
        src: '/screenshots/mobile.png',
        sizes: '390x844',
        type: 'image/png'
      }
    ],
    related_applications: [],
    prefer_related_applications: false
  }
}
