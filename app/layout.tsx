import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

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
  openGraph: {
    type: 'website',
    locale: 'nl_BE',
    url: 'https://yannova.nl',
    title: 'Yannova Bouw - Van Begin tot Eind | Aannemer Keerbergen, Mechelen, Leuven',
    description: 'Professionele bouwoplossingen van begin tot eind. Yannova Bouw realiseert uw droomproject met vakmanschap en passie in Keerbergen, Mechelen, Putte, Bonheiden, Rijmenam en Leuven.',
    siteName: 'Yannova Bouw',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Yannova Bouw - Aannemer Keerbergen, Mechelen, Leuven',
    description: 'Professionele bouwoplossingen van begin tot eind. Yannova Bouw realiseert uw droomproject met vakmanschap en passie.',
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl">
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
