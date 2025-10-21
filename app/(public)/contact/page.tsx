import Navigation from "@/components/ui/Navigation";
import Footer from "@/components/ui/Footer";
import Chatbot from "@/components/chatbot/Chatbot";
import { MapPin, Phone, Mail, Clock, Star } from "lucide-react";

export const metadata = {
  title: "Contact | Yannova Bouw",
  description: "Neem contact op met Yannova Bouw voor uw bouwproject in Keerbergen, Mechelen, Putte, Bonheiden, Rijmenam en Leuven. Vrijblijvende offerte.",
  keywords: [
    "contact Yannova Bouw", "offerte aanvragen", "bouwbedrijf contact",
    "Keerbergen", "Mechelen", "Putte", "Bonheiden", "Rijmenam", "Leuven"
  ]
};

export default function ContactPage() {
  // Schema.org structured data for local business
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Yannova Bouw",
    "description": "Professionele bouwoplossingen van begin tot eind. Nieuwbouw, renovatie, crepi en verbouwingen.",
    "url": "https://yannova.nl",
    "telephone": "+31 6 12 34 56 78",
    "email": "info@yannova.nl",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "BE",
      "addressRegion": "Vlaams-Brabant",
      "addressLocality": "Keerbergen"
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
        "name": "Putte"
      },
      {
        "@type": "City",
        "name": "Bonheiden"
      },
      {
        "@type": "City",
        "name": "Rijmenam"
      },
      {
        "@type": "City",
        "name": "Leuven"
      }
    ],
    "serviceArea": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": 51.0039,
        "longitude": 4.6336
      },
      "geoRadius": "50000"
    },
    "openingHours": "Mo-Fr 08:00-18:00,Sa 09:00-13:00",
    "priceRange": "€€",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "98"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Bouwdiensten",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Nieuwbouw"
          }
        },
        {
          "@type": "Offer", 
          "itemOffered": {
            "@type": "Service",
            "name": "Renovatie"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service", 
            "name": "Crepi gevelafwerking"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Ramen en deuren vervangen"
          }
        }
      ]
    }
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Schema.org structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* Hero */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-yannova-dark to-yannova-gray text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Contact</h1>
          <p className="text-xl text-gray-300 max-w-3xl">
            Neem contact op voor vragen, advies of een vrijblijvende offerte voor uw bouwproject
          </p>
        </div>
      </section>

      {/* Service Areas */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Onze Werkgebieden
            </h2>
            <p className="text-xl text-gray-600">
              Wij verzorgen bouwprojecten in de volgende gemeenten
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {[
              { name: "Keerbergen", province: "Vlaams-Brabant" },
              { name: "Mechelen", province: "Antwerpen" },
              { name: "Putte", province: "Antwerpen" },
              { name: "Bonheiden", province: "Vlaams-Brabant" },
              { name: "Rijmenam", province: "Vlaams-Brabant" },
              { name: "Leuven", province: "Vlaams-Brabant" }
            ].map((city, index) => (
              <div key={index} className="text-center p-4 bg-gray-50 rounded-lg hover:bg-yannova-primary/10 transition-colors">
                <MapPin className="text-yannova-primary mx-auto mb-2" size={24} />
                <h3 className="font-semibold text-gray-900">{city.name}</h3>
                <p className="text-sm text-gray-600">{city.province}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Neem Contact Op
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Heeft u een vraag of wilt u een offerte aanvragen? Neem
                gerust contact met ons op. We helpen u graag verder!
              </p>

              {/* Contact Details */}
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-yannova-primary/10 p-3 rounded-lg">
                    <Phone className="text-yannova-primary" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">
                      Telefoon
                    </h3>
                    <a
                      href="tel:+31612345678"
                      className="text-gray-600 hover:text-yannova-primary"
                    >
                      +31 6 12 34 56 78
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-yannova-primary/10 p-3 rounded-lg">
                    <Mail className="text-yannova-primary" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Email</h3>
                    <a
                      href="mailto:info@yannova.nl"
                      className="text-gray-600 hover:text-yannova-primary"
                    >
                      info@yannova.nl
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-yannova-primary/10 p-3 rounded-lg">
                    <MapPin className="text-yannova-primary" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Locatie</h3>
                    <p className="text-gray-600">
                      Keerbergen, Vlaams-Brabant
                      <br />
                      Werkgebied: Keerbergen, Mechelen, Putte, Bonheiden, Rijmenam, Leuven
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-yannova-primary/10 p-3 rounded-lg">
                    <Clock className="text-yannova-primary" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">
                      Openingstijden
                    </h3>
                    <p className="text-gray-600">
                      Ma - Vr: 08:00 - 18:00
                      <br />
                      Za: 09:00 - 13:00
                      <br />
                      Zo: Gesloten
                    </p>
                  </div>
                </div>
              </div>

              {/* Social Proof */}
              <div className="mt-8 bg-yannova-primary/10 rounded-lg p-6">
                <div className="flex items-center mb-2">
                  <Star className="text-yannova-primary mr-1" size={20} />
                  <Star className="text-yannova-primary mr-1" size={20} />
                  <Star className="text-yannova-primary mr-1" size={20} />
                  <Star className="text-yannova-primary mr-1" size={20} />
                  <Star className="text-yannova-primary mr-1" size={20} />
                  <span className="ml-2 font-semibold text-gray-900">4.9/5</span>
                </div>
                <p className="font-semibold text-gray-900 mb-1">
                  98% Klanttevredenheid
                </p>
                <p className="text-sm text-gray-600">
                  Gebaseerd op 100+ projecten in de regio
                </p>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Stuur een Bericht
              </h3>

              <form className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Naam *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yannova-primary text-gray-900"
                    placeholder="Uw naam"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yannova-primary text-gray-900"
                    placeholder="uw@email.nl"
                  />
                </div>

                <div>
                  <label
                    htmlFor="location"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Locatie *
                  </label>
                  <select
                    id="location"
                    name="location"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yannova-primary text-gray-900"
                  >
                    <option value="">Selecteer uw locatie</option>
                    <option value="keerbergen">Keerbergen</option>
                    <option value="mechelen">Mechelen</option>
                    <option value="putte">Putte</option>
                    <option value="bonheiden">Bonheiden</option>
                    <option value="rijmenam">Rijmenam</option>
                    <option value="leuven">Leuven</option>
                    <option value="anders">Anders</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Onderwerp *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yannova-primary text-gray-900"
                  >
                    <option value="">Selecteer een onderwerp</option>
                    <option value="offerte">Offerte aanvragen</option>
                    <option value="nieuwbouw">Nieuwbouw</option>
                    <option value="renovatie">Renovatie</option>
                    <option value="crepi">Crepi gevelafwerking</option>
                    <option value="ramen-deuren">Ramen en deuren</option>
                    <option value="verbouwing">Verbouwing</option>
                    <option value="anders">Anders</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Bericht *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yannova-primary text-gray-900 resize-none"
                    placeholder="Vertel ons over uw project of vraag..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-yannova-primary hover:bg-yannova-primary/90 text-white font-semibold py-4 rounded-lg transition-colors duration-200"
                >
                  Verstuur Bericht
                </button>

                <p className="text-sm text-gray-500 text-center">
                  * Verplichte velden
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <Chatbot />
    </div>
  );
}