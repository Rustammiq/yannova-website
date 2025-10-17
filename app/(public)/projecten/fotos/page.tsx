import Navigation from "@/components/ui/Navigation";
import Footer from "@/components/ui/Footer";
import Chatbot from "@/components/chatbot/Chatbot";
import { Camera, Download, Eye, Calendar, MapPin } from "lucide-react";
import Link from "next/link";

export default function ProjectfotosPage() {
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
                    <Eye className="text-white/80" size={20} />
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
            {recentProjects.map((project, index) => (
              <div key={project.id} className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="inline-block bg-yannova-primary/10 text-yannova-primary px-3 py-1 rounded-full text-sm font-semibold">
                      {project.category}
                    </span>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <MapPin size={16} />
                        <span>{project.location}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar size={16} />
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
                      <div className="aspect-square bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg mb-3 flex items-center justify-center">
                        <span className="text-gray-500 text-sm">Voor</span>
                      </div>
                      <p className="text-sm text-gray-600">Voor renovatie</p>
                    </div>
                    <div className="text-center">
                      <div className="aspect-square bg-gradient-to-br from-yannova-primary/20 to-yannova-primary/5 rounded-lg mb-3 flex items-center justify-center">
                        <span className="text-yannova-primary text-sm">Na</span>
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
                    <button className="flex-1 bg-yannova-primary text-white px-4 py-2 rounded-lg font-semibold hover:bg-yannova-primary/90 transition-colors flex items-center justify-center gap-2">
                      <Eye size={16} />
                      Bekijk Foto's
                    </button>
                    <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg font-semibold hover:bg-gray-200 transition-colors flex items-center gap-2">
                      <Download size={16} />
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

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16].map((i) => (
              <div key={i} className="aspect-square bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg flex items-center justify-center hover:scale-105 transition-transform cursor-pointer">
                <span className="text-gray-500 text-sm">Foto {i}</span>
              </div>
            ))}
          </div>

          <div className="text-center">
            <button className="bg-yannova-primary text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-yannova-primary/90 transition-colors">
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
                <Camera className="text-yannova-primary" size={32} />
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
