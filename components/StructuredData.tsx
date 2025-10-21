export default function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Yannova Bouw",
    "description": "Professionele bouwoplossingen van begin tot eind. Yannova Bouw realiseert uw droomproject met vakmanschap en passie in Keerbergen, Mechelen, Putte, Bonheiden, Rijmenam en Leuven.",
    "url": "https://yannova.be",
    "logo": "https://yannova.be/images/logo-yannova.png",
    "image": "https://yannova.be/images/hero-construction.jpg",
    "telephone": "+32 15 23 45 67",
    "email": "info@yannova.be",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "BE",
      "addressRegion": "Vlaanderen",
      "addressLocality": "Keerbergen"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "51.0039",
      "longitude": "4.6342"
    },
    "areaServed": [
      {
        "@type": "City",
        "name": "Keerbergen"
      },
      {
        "@type": "City", 
        "name": "Mechelen"
      },
      {
        "@type": "City",
        "name": "Leuven"
      },
      {
        "@type": "City",
        "name": "Putte"
      },
      {
        "@type": "City",
        "name": "Bonheiden"
      },
      {
        "@type": "City",
        "name": "Rijmenam"
      }
    ],
    "serviceType": [
      "Nieuwbouw",
      "Renovatie",
      "Verbouwing", 
      "Crepi gevelafwerking",
      "Ramen en deuren",
      "Badkamer renovatie",
      "Keuken renovatie"
    ],
    "priceRange": "€€",
    "openingHours": "Mo-Fr 08:00-18:00",
    "sameAs": [
      "https://www.facebook.com/yannovabouw",
      "https://www.instagram.com/yannovabouw"
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "100",
      "bestRating": "5",
      "worstRating": "1"
    },
    "review": [
      {
        "@type": "Review",
        "author": {
          "@type": "Person",
          "name": "Marie Van der Berg"
        },
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5",
          "bestRating": "5"
        },
        "reviewBody": "Uitstekend werk geleverd bij onze crepi renovatie. Professioneel team, nette afwerking en heldere communicatie. Zeer tevreden met het resultaat!"
      },
      {
        "@type": "Review", 
        "author": {
          "@type": "Person",
          "name": "Jan De Vries"
        },
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5",
          "bestRating": "5"
        },
        "reviewBody": "Van begin tot eind perfect begeleid. De nieuwe ramen en deuren zijn prachtig en de isolatie is merkbaar beter. Top vakmanschap!"
      },
      {
        "@type": "Review",
        "author": {
          "@type": "Person", 
          "name": "Sarah Jansen"
        },
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5",
          "bestRating": "5"
        },
        "reviewBody": "Complete renovatie van onze woning, inclusief gevelwerk. Yannova heeft alles perfect gecoördineerd. Resultaat overtreft verwachtingen!"
      }
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Bouw Diensten",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Nieuwbouw",
            "description": "Complete nieuwbouwprojecten van fundament tot dak, uitgevoerd volgens de laatste normen en met oog voor detail."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service", 
            "name": "Renovatie & Crepi",
            "description": "Complete renovatiewerken inclusief crepi gevelafwerking, ramen en deuren vervanging. Van voorbereiding tot professionele documentatie met foto's."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Ramen & Deuren", 
            "description": "Vervanging en renovatie van ramen en deuren voor betere isolatie, veiligheid en esthetiek. Van moderne kunststof tot klassieke houten kozijnen."
          }
        }
      ]
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
