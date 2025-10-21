import Head from "next/head";

interface MetaTagsProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: "website" | "article";
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  section?: string;
  tags?: string[];
  noindex?: boolean;
  nofollow?: boolean;
}

export default function MetaTags({
  title = "Yannova Bouw - Professionele Bouwprojecten in Keerbergen, Mechelen, Leuven",
  description = "Yannova Bouw verzorgt complete bouwprojecten van nieuwbouw tot renovatie. Gespecialiseerd in crepi gevelafwerking, ramen en deuren. 15+ jaar ervaring in Keerbergen, Mechelen, Leuven en omgeving.",
  keywords = "bouw, renovatie, nieuwbouw, crepi, gevelafwerking, ramen, deuren, Keerbergen, Mechelen, Leuven, Putte, Bonheiden, Rijmenam, aannemer, bouwbedrijf",
  image = "/images/hero-construction.jpg",
  url,
  type = "website",
  author = "Yannova Bouw",
  publishedTime,
  modifiedTime,
  section,
  tags = [],
  noindex = false,
  nofollow = false
}: MetaTagsProps) {
  const fullTitle = title.includes("Yannova") ? title : `${title} | Yannova Bouw`;
  const fullUrl = url ? `https://yannova.nl${url}` : "https://yannova.nl";
  const fullImage = image.startsWith("http") ? image : `https://yannova.nl${image}`;

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      <meta name="robots" content={`${noindex ? 'noindex' : 'index'}, ${nofollow ? 'nofollow' : 'follow'}`} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="theme-color" content="#D4A574" />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImage} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:site_name" content="Yannova Bouw" />
      <meta property="og:locale" content="nl_BE" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImage} />
      
      {/* Article specific */}
      {type === "article" && (
        <>
          {publishedTime && <meta property="article:published_time" content={publishedTime} />}
          {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
          {section && <meta property="article:section" content={section} />}
          {tags.map((tag, index) => (
            <meta key={index} property="article:tag" content={tag} />
          ))}
        </>
      )}
      
      {/* Canonical URL */}
      <link rel="canonical" href={fullUrl} />
      
      {/* Favicon */}
      <link rel="icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" sizes="180x180" href="/icons/icon-192x192.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/icons/icon-192x192.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/icons/icon-192x192.png" />
      
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Yannova Bouw",
            "url": "https://yannova.nl",
            "logo": "https://yannova.nl/images/logo-yannova.png",
            "description": description,
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Keerbergen",
              "addressCountry": "BE"
            },
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "+32-15-23-45-67",
              "contactType": "customer service",
              "availableLanguage": "Dutch"
            },
            "sameAs": [
              "https://www.facebook.com/yannovabouw",
              "https://www.instagram.com/yannovabouw"
            ],
            "serviceArea": {
              "@type": "GeoCircle",
              "geoMidpoint": {
                "@type": "GeoCoordinates",
                "latitude": 51.0039,
                "longitude": 4.6333
              },
              "geoRadius": "50000"
            },
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": "Bouwdiensten",
              "itemListElement": [
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Nieuwbouw",
                    "description": "Complete nieuwbouwprojecten van fundament tot dak"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Renovatie",
                    "description": "Renovatiewerken inclusief crepi gevelafwerking"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Ramen en Deuren",
                    "description": "Vervanging van ramen en deuren voor betere isolatie"
                  }
                }
              ]
            }
          })
        }}
      />
    </Head>
  );
}

