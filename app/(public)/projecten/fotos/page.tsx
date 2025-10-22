"use client";

import Navigation from "@/components/ui/Navigation";
import Footer from "@/components/ui/Footer";
import Chatbot from "@/components/chatbot/Chatbot";
// Lucide icons are now inline SVG elements
import Link from "next/link";
import Image from "next/image";
import { photoManager } from "@/lib/photoManager";
import dynamic from 'next/dynamic';
import { usePhotos } from "@/lib/usePhotos";

const InlinePhotoEditor = dynamic(() => import("@/components/admin/InlinePhotoEditor"), {
  ssr: false,
  loading: () => (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {Array.from({ length: 16 }).map((_, i) => (
        <div key={i} className="aspect-square bg-gray-200 rounded-lg animate-pulse" />
      ))}
    </div>
  ),
});

export default function ProjectfotosPage() {
  // Load photos for gallery
  const { photos: galleryPhotos, updatePhotos: updateGalleryPhotos } = usePhotos({ 
    category: 'gallery', 
    limit: 16 
  });

  const photoCategories = [
    {
      title: "Crepi Projecten",
      description: "Voor en na foto's van crepi gevelrenovaties",
      count: 24,
      color: "from-blue-500 to-blue-600",
    },
    {
      title: "Ramen & Deuren",
      description: "Renovatie en vervanging van ramen en deuren",
      count: 18,
      color: "from-green-500 to-green-600",
    },
    {
      title: "Complete Renovaties",
      description: "Volledige renovatieprojecten van begin tot eind",
      count: 32,
      color: "from-purple-500 to-purple-600",
    },
    {
      title: "Gevelrenovaties",
      description: "Gevelrenovaties met isolatie en nieuwe afwerking",
      count: 15,
      color: "from-orange-500 to-orange-600",
    },
  ];

  const recentProjects = [
    {
      id: 1,
      title: "Gevelrenovatie Amsterdam",
      category: "Crepi",
      location: "Amsterdam",
      date: "2024",
      description: "Complete gevelrenovatie met moderne crepi afwerking en nieuwe ramen",
      beforeImage: "/images/projects/amsterdam-before.jpg",
      afterImage: "/images/projects/amsterdam-after.jpg",
      features: ["Crepi gevelafwerking", "Nieuwe ramen", "Gevelisolatie", "Kleurrenovatie"],
    },
    {
      id: 2,
      title: "Ramen Vervanging Utrecht",
      category: "Ramen & Deuren",
      location: "Utrecht",
      date: "2024",
      description: "Vervanging van alle ramen met HR++ glas voor betere isolatie",
      beforeImage: "/images/projects/utrecht-before.jpg",
      afterImage: "/images/projects/utrecht-after.jpg",
      features: ["HR++ glas", "Kunststof kozijnen", "Afdichting", "Garantie"],
    },
    {
      id: 3,
      title: "Complete Renovatie Rotterdam",
      category: "Renovatie",
      location: "Rotterdam",
      date: "2024",
      description: "Volledige renovatie van een jaren '70 woning met moderne materialen",
      beforeImage: "/images/projects/rotterdam-before.jpg",
      afterImage: "/images/projects/rotterdam-after.jpg",
      features: ["Gevelrenovatie", "Ramen vervanging", "Interieur", "Dakrenovatie"],
    },
    {
      id: 4,
      title: "Bedrijfspand Gevelrenovatie",
      category: "Gevelrenovatie",
      location: "Den Haag",
      date: "2024",
      description: "Moderne gevelrenovatie van een bedrijfspand met crepi en isolatie",
      beforeImage: "/images/projects/denhaag-before.jpg",
      afterImage: "/images/projects/denhaag-after.jpg",
      features: ["Crepi renovatie", "Gevelisolatie", "Kantoorramen", "Documentatie"],
    },
  ];

  const photoTypes = [
    {
      title: "Voor en Na Foto's",
      description: "Professionele foto's die de transformatie van uw pand duidelijk laten zien",
      icon: "📸",
      features: ["Hoge resolutie", "Verschillende hoeken", "Professionele belichting", "Detailfoto's"],
    },
    {
      title: "Tussentijdse Foto's",
      description: "Documentatie van de voortgang tijdens de renovatie",
      icon: "📷",
      features: ["Dagelijkse updates", "Voortgangsrapportage", "Probleem documentatie", "Detailfoto's"],
    },
    {
      title: "Technische Foto's",
      description: "Detailfoto's van technische aspecten en afwerking",
      icon: "🔍",
      features: ["Detailfoto's", "Technische specificaties", "Kwaliteitscontrole", "Afdichting"],
    },
    {
      title: "360° Panoramafoto's",
      description: "Interactieve panoramafoto's voor een complete projectweergave",
      icon: "🌐",
      features: ["360° weergave", "Interactief", "Volledig overzicht", "Professioneel"],
    },
  ];

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-yannova-dark to-yannova-gray text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Projectfoto's
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl">
            Bekijk onze projectfoto's en ontdek de transformatie van verschillende renovatieprojecten. 
            Van crepi en gevelrenovaties tot ramen en deuren - elke renovatie wordt volledig gedocumenteerd.
          </p>
        </div>
      </section>

      {/* Foto Categorieën */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Projectfoto Categorieën
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Blader door onze foto's per type renovatiewerk
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {photoCategories.map((category, index) => (
              <div key={index} className="group cursor-pointer">
                <div className={`bg-gradient-to-br ${category.color} rounded-xl p-8 text-white hover:scale-105 transition-transform duration-300`}>
                  <div className="text-4xl mb-4">📸</div>
                  <h3 className="text-2xl font-bold mb-2">
                    {category.title}
                  </h3>
                  <p className="text-white/90 mb-4">
                    {category.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-white/80 text-sm">
                      {category.count} foto's
                    </span>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white/80">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                      <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recente Projecten */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Recente Projecten
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Bekijk onze meest recente renovatieprojecten met voor en na foto's
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {recentProjects.map((project) => (
              <div key={project.id} className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="inline-block bg-yannova-primary/10 text-yannova-primary px-3 py-1 rounded-full text-sm font-semibold">
                      {project.category}
                    </span>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                          <circle cx="12" cy="10" r="3"></circle>
                        </svg>
                        <span>{project.location}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect width="18" height="18" x="3" y="4" rx="2" ry="2"></rect>
                          <line x1="16" y1="2" x2="16" y2="6"></line>
                          <line x1="8" y1="2" x2="8" y2="6"></line>
                          <line x1="3" y1="10" x2="21" y2="10"></line>
                        </svg>
                        <span>{project.date}</span>
                      </div>
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {project.title}
                  </h3>

                  <p className="text-gray-600 mb-6">
                    {project.description}
                  </p>

                  {/* Voor en Na Foto's */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="text-center">
                      <div className="aspect-square rounded-lg mb-3 overflow-hidden">
                        <Image
                          src={`/images/projects/project-${project.id}-before.jpg`}
                          alt={`${project.title} - Voor renovatie`}
                          width={200}
                          height={200}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            // Fallback to a different project image if before image doesn't exist
                            const target = e.target as HTMLImageElement;
                            target.src = `/images/projects/project-${(project.id % 9) + 1}-villa.jpg`;
                          }}
                        />
                      </div>
                      <p className="text-sm text-gray-600">Voor renovatie</p>
                    </div>
                    <div className="text-center">
                      <div className="aspect-square rounded-lg mb-3 overflow-hidden">
                        <Image
                          src={`/images/projects/project-${project.id}-after.jpg`}
                          alt={`${project.title} - Na renovatie`}
                          width={200}
                          height={200}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            // Fallback to the main project image if after image doesn't exist
                            const target = e.target as HTMLImageElement;
                            target.src = `/images/projects/project-${project.id}-villa.jpg`;
                          }}
                        />
                      </div>
                      <p className="text-sm text-gray-600">Na renovatie</p>
                    </div>
                  </div>

                  {/* Features */}
                  <ul className="space-y-2 mb-6">
                    {project.features.map((feature, i) => (
                      <li key={i} className="text-sm text-gray-700 flex items-center">
                        <span className="w-1.5 h-1.5 bg-yannova-primary rounded-full mr-2"></span>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <div className="flex gap-4">
                    <button 
                      onClick={() => alert('Foto\'s bekijken functionaliteit komt binnenkort!')}
                      className="flex-1 bg-yannova-primary text-white px-4 py-2 rounded-lg font-semibold hover:bg-yannova-primary/90 transition-colors flex items-center justify-center gap-2"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                        <circle cx="12" cy="12" r="3"></circle>
                      </svg>
                      Bekijk Foto's
                    </button>
                    <button 
                      onClick={() => alert('Download functionaliteit komt binnenkort!')}
                      className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg font-semibold hover:bg-gray-200 transition-colors flex items-center gap-2"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                        <polyline points="7,10 12,15 17,10"></polyline>
                        <line x1="12" y1="15" x2="12" y2="3"></line>
                      </svg>
                      Download
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Soorten Foto's */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Soorten Projectfoto's
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Wij maken verschillende soorten foto's om uw project volledig te documenteren
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {photoTypes.map((type, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-8 text-center">
                <div className="text-4xl mb-4">{type.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {type.title}
                </h3>
                <p className="text-gray-600 mb-6">
                  {type.description}
                </p>
                <ul className="space-y-2 text-sm text-gray-700">
                  {type.features.map((feature, i) => (
                    <li key={i} className="flex items-center">
                      <span className="w-2 h-2 bg-yannova-primary rounded-full mr-3"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Foto Galerij */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Projectfoto Galerij
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Bekijk een selectie van onze meest indrukwekkende projectfoto's
            </p>
          </div>

          <InlinePhotoEditor
            photos={galleryPhotos}
            onPhotosUpdate={updateGalleryPhotos}
            maxPhotos={16}
            category="gallery"
            aspectRatio="aspect-square"
            className="mb-8"
          />

          <div className="text-center">
            <button
              className="bg-yannova-primary text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-yannova-primary/90 transition-colors"
              onClick={() => console.log('Bekijk alle foto\'s')}
            >
              Bekijk Alle Foto's
            </button>
          </div>
        </div>
      </section>

      {/* Technische Documentatie */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Technische Documentatie
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Naast foto's ontvangt u ook complete technische documentatie van uw project
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gray-50 rounded-xl p-8">
              <div className="bg-yannova-primary/10 w-16 h-16 rounded-lg flex items-center justify-center mb-6">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-yannova-primary">
                  <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
                  <circle cx="12" cy="13" r="4"></circle>
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Projectfoto's
              </h3>
              <p className="text-gray-600 mb-6">
                Hoge resolutie foto's van alle fases van uw renovatieproject
              </p>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Voor en na foto's</li>
                <li>• Tussentijdse voortgangsfoto's</li>
                <li>• Detailfoto's van afwerking</li>
                <li>• 360° panoramafoto's</li>
              </ul>
            </div>

            <div className="bg-gray-50 rounded-xl p-8">
              <div className="bg-yannova-primary/10 w-16 h-16 rounded-lg flex items-center justify-center mb-6">
                <span className="text-yannova-primary text-2xl">📋</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Technische Specificaties
              </h3>
              <p className="text-gray-600 mb-6">
                Gedetailleerde specificaties van alle gebruikte materialen en technieken
              </p>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Materialenlijst</li>
                <li>• Technische tekeningen</li>
                <li>• U-waarden en isolatiewaarden</li>
                <li>• Garantiecertificaten</li>
              </ul>
            </div>

            <div className="bg-gray-50 rounded-xl p-8">
              <div className="bg-yannova-primary/10 w-16 h-16 rounded-lg flex items-center justify-center mb-6">
                <span className="text-yannova-primary text-2xl">🔧</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Onderhoudsadvies
              </h3>
              <p className="text-gray-600 mb-6">
                Praktisch advies voor het onderhoud van uw gerenoveerde pand
              </p>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Onderhoudsvoorschriften</li>
                <li>• Schoonmaakadvies</li>
                <li>• Controlepunten</li>
                <li>• Contactinformatie</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-yannova-primary">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Wilt u ook zo'n mooi project?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Neem contact op en ontdek wat wij voor u kunnen betekenen met professionele documentatie
          </p>
          <Link
            href="/contact"
            className="inline-block bg-white text-yannova-primary px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
          >
            Start Uw Project
          </Link>
        </div>
      </section>

      <Footer />
      <Chatbot />
    </div>
  );
}
