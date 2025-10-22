"use client";

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

interface DynamicSEOProps {
  title?: string;
  description?: string;
  image?: string;
  type?: 'website' | 'article' | 'product';
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  section?: string;
  tags?: string[];
}

export default function DynamicSEO({
  title,
  description,
  image,
  type = 'website',
  publishedTime,
  modifiedTime,
  author,
  section,
  tags
}: DynamicSEOProps) {
  const pathname = usePathname();

  useEffect(() => {
    // Update document title
    if (title) {
      document.title = title;
    }

    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription && description) {
      metaDescription.setAttribute('content', description);
    }

    // Update Open Graph tags
    updateOpenGraphTags({
      title,
      description,
      image,
      type,
      publishedTime,
      modifiedTime,
      author,
      section,
      tags,
      url: `https://yannova.be${pathname}`
    });

    // Update Twitter Card tags
    updateTwitterCardTags({
      title,
      description,
      image,
      type
    });

    // Update canonical URL
    updateCanonicalUrl(pathname);

  }, [title, description, image, type, publishedTime, modifiedTime, author, section, tags, pathname]);

  return null;
}

function updateOpenGraphTags({
  title,
  description,
  image,
  type,
  publishedTime,
  modifiedTime,
  author,
  section,
  tags,
  url
}: any) {
  const updateMetaTag = (property: string, content: string) => {
    let meta = document.querySelector(`meta[property="${property}"]`);
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('property', property);
      document.head.appendChild(meta);
    }
    meta.setAttribute('content', content);
  };

  // Basic Open Graph tags
  updateMetaTag('og:title', title || 'Yannova Bouw - Van Begin tot Eind');
  updateMetaTag('og:description', description || 'Professionele bouwoplossingen van begin tot eind. Yannova Bouw realiseert uw droomproject met vakmanschap en passie in Keerbergen, Mechelen, Putte, Bonheiden, Rijmenam en Leuven.');
  updateMetaTag('og:image', image || 'https://yannova.be/images/hero-construction.jpg');
  updateMetaTag('og:url', url);
  updateMetaTag('og:type', type);
  updateMetaTag('og:site_name', 'Yannova Bouw');
  updateMetaTag('og:locale', 'nl_BE');

  // Article-specific tags
  if (type === 'article') {
    if (publishedTime) updateMetaTag('article:published_time', publishedTime);
    if (modifiedTime) updateMetaTag('article:modified_time', modifiedTime);
    if (author) updateMetaTag('article:author', author);
    if (section) updateMetaTag('article:section', section);
    if (tags) {
      tags.forEach((tag: string) => {
        updateMetaTag('article:tag', tag);
      });
    }
  }

  // Business-specific tags
  updateMetaTag('business:contact_data:street_address', 'Keerbergen');
  updateMetaTag('business:contact_data:locality', 'Vlaams-Brabant');
  updateMetaTag('business:contact_data:region', 'Vlaanderen');
  updateMetaTag('business:contact_data:postal_code', '3140');
  updateMetaTag('business:contact_data:country_name', 'Belgium');
}

function updateTwitterCardTags({
  title,
  description,
  image,
  type
}: any) {
  const updateMetaTag = (name: string, content: string) => {
    let meta = document.querySelector(`meta[name="${name}"]`);
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('name', name);
      document.head.appendChild(meta);
    }
    meta.setAttribute('content', content);
  };

  updateMetaTag('twitter:card', 'summary_large_image');
  updateMetaTag('twitter:title', title || 'Yannova Bouw - Van Begin tot Eind');
  updateMetaTag('twitter:description', description || 'Professionele bouwoplossingen van begin tot eind. Yannova Bouw realiseert uw droomproject met vakmanschap en passie.');
  updateMetaTag('twitter:image', image || 'https://yannova.be/images/hero-construction.jpg');
  updateMetaTag('twitter:site', '@yannovabouw');
  updateMetaTag('twitter:creator', '@yannovabouw');
}

function updateCanonicalUrl(pathname: string) {
  const canonicalUrl = `https://yannova.be${pathname}`;

  let canonical = document.querySelector('link[rel="canonical"]');
  if (!canonical) {
    canonical = document.createElement('link');
    canonical.setAttribute('rel', 'canonical');
    document.head.appendChild(canonical);
  }
  canonical.setAttribute('href', canonicalUrl);
}

// SEO utilities for different page types
export const SEOUtils = {
  // Service page SEO
  servicePage: (service: string, location?: string) => ({
    title: `${service} in ${location || 'Vlaams-Brabant'} | Yannova Bouw`,
    description: `Professionele ${service.toLowerCase()} door Yannova Bouw. ${location ? `Lokale service in ${location}` : 'Service in heel Vlaanderen'}. Vraag vrijblijvend een offerte aan.`,
    type: 'website' as const,
    tags: [service.toLowerCase(), location?.toLowerCase(), 'bouw', 'renovatie'].filter(Boolean)
  }),

  // Project page SEO
  projectPage: (projectType: string, location?: string) => ({
    title: `${projectType} Project${location ? ` in ${location}` : ''} | Yannova Bouw Portfolio`,
    description: `Bekijk dit ${projectType.toLowerCase()} project${location ? ` in ${location}` : ''} door Yannova Bouw. Professionele uitvoering met oog voor detail en kwaliteitsafwerking.`,
    type: 'website' as const,
    tags: [projectType.toLowerCase(), location?.toLowerCase(), 'portfolio', 'bouwprojecten'].filter(Boolean)
  }),

  // Location page SEO
  locationPage: (city: string) => ({
    title: `Bouw en Renovatie in ${city} | Yannova Bouw - Lokale Aannemer`,
    description: `Yannova Bouw is uw lokale aannemer in ${city}. Nieuwbouw, renovatie, crepi gevelafwerking en ramen & deuren. ${city} en omgeving.`,
    type: 'website' as const,
    tags: [city.toLowerCase(), 'bouw', 'renovatie', 'aannemer', 'crepi', 'ramen deuren']
  }),

  // Contact page SEO
  contactPage: () => ({
    title: 'Contact | Yannova Bouw - Offerte Aanvragen',
    description: 'Neem contact op met Yannova Bouw voor een vrijblijvende offerte. Nieuwbouw, renovatie, crepi gevelafwerking in Keerbergen, Mechelen, Leuven en omgeving.',
    type: 'website' as const,
    tags: ['contact', 'offerte', 'bouw', 'renovatie', 'crepi']
  })
};


