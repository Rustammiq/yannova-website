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
        type: 'image/png',
        form_factor: 'wide',
        label: 'Yannova Bouw Desktop View'
      },
      {
        src: '/screenshots/mobile.png',
        sizes: '390x844',
        type: 'image/png',
        form_factor: 'narrow',
        label: 'Yannova Bouw Mobile View'
      }
    ],
    related_applications: [],
    prefer_related_applications: false,
    scope: '/',
    id: 'yannova-bouw-app',
    dir: 'ltr',
    iarc_rating_id: 'e84b072d-71b3-4d3e-86ae-31a8ce4e53b7'
  }
}
