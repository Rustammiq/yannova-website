import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import StructuredData from "@/components/StructuredData";
import Chatbot from "@/components/chatbot/Chatbot";
import GoogleAnalytics from "@/components/analytics/GoogleAnalytics";
import AnalyticsTracker from "@/components/analytics/AnalyticsTracker";
import ServiceWorkerRegistration from "@/components/pwa/ServiceWorkerRegistration";
import PWAInstallPrompt from "@/components/pwa/PWAInstallPrompt";
import OfflinePage from "@/components/pwa/OfflinePage";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Yannova Bouw - Van Begin tot Eind",
    template: "%s | Yannova Bouw"
  },
  description: "Professionele bouwoplossingen van begin tot eind. Yannova Bouw realiseert uw droomproject met vakmanschap en passie. Nieuwbouw, verbouwingen en renovaties in Keerbergen, Mechelen, Putte, Bonheiden, Rijmenam en Leuven.",
  keywords: [
    "bouw", "renovatie", "nieuwbouw", "aannemer", "Yannova",
    "verbouwing", "dakwerken", "gevelbekleding", "badkamer renovatie", "keuken installatie",
    "Keerbergen", "Mechelen", "Putte", "Bonheiden", "Rijmenam", "Leuven",
    "crepi", "ramen", "deuren", "gevelrenovatie", "bouwbedrijf Vlaanderen",
    "aannemer Keerbergen", "bouwbedrijf Mechelen", "renovatie Putte", "nieuwbouw Bonheiden",
    "verbouwing Rijmenam", "aannemer Leuven", "crepi specialist", "ramen deuren vervangen"
  ],
  authors: [{ name: "Yannova Bouw" }],
  creator: "Yannova Bouw",
  publisher: "Yannova Bouw",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://yannova.nl'),
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/icons/icon-192x192.png',
  },
  openGraph: {
    type: 'website',
    locale: 'nl_BE',
    url: 'https://yannova.nl',
    title: 'Yannova Bouw - Van Begin tot Eind | Aannemer Keerbergen, Mechelen, Leuven',
    description: 'Professionele bouwoplossingen van begin tot eind. Yannova Bouw realiseert uw droomproject met vakmanschap en passie in Keerbergen, Mechelen, Putte, Bonheiden, Rijmenam en Leuven.',
    siteName: 'Yannova Bouw',
    images: [
      {
        url: '/images/logo-yannova.png',
        width: 1200,
        height: 630,
        alt: 'Yannova Bouw Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Yannova Bouw - Aannemer Keerbergen, Mechelen, Leuven',
    description: 'Professionele bouwoplossingen van begin tot eind. Yannova Bouw realiseert uw droomproject met vakmanschap en passie.',
    images: ['/images/logo-yannova.png'],
  },
      robots: {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          'max-video-preview': -1,
          'max-image-preview': 'large',
          'max-snippet': -1,
        },
      },
      verification: {
        google: 'your-google-verification-code',
        yandex: 'your-yandex-verification-code',
        yahoo: 'your-yahoo-verification-code',
      },
      category: 'construction',
      classification: 'business',
      other: {
        'mobile-web-app-capable': 'yes',
        'apple-mobile-web-app-capable': 'yes',
        'apple-mobile-web-app-status-bar-style': 'default',
        'apple-mobile-web-app-title': 'Yannova Bouw',
        'application-name': 'Yannova Bouw',
        'msapplication-TileColor': '#D4A574',
        'msapplication-config': '/browserconfig.xml',
        'theme-color': '#D4A574',
      },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
        <html lang="nl">
          <head>
            <StructuredData />
            {/* No-JS fallback script */}
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  document.documentElement.classList.add('no-js');
                  document.addEventListener('DOMContentLoaded', function() {
                    document.documentElement.classList.remove('no-js');
                  });
                `,
              }}
            />
          </head>
          <body className={inter.className}>
            <GoogleAnalytics />
            <AnalyticsTracker />
            <ServiceWorkerRegistration />
            <Providers>
              {children}
              <Chatbot />
              <PWAInstallPrompt />
              <OfflinePage />
            </Providers>
          </body>
        </html>
  );
}
