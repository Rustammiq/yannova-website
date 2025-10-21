import Navigation from "@/components/ui/Navigation";
import Footer from "@/components/ui/Footer";
import Chatbot from "@/components/chatbot/Chatbot";
import { Building2, CheckCircle, Clock, Shield, Home, Wrench } from "lucide-react";
import Link from "next/link";
import NextImage from "next/image";
import { photoManager } from "@/lib/photoManager";

export const metadata = {
  title: "Nieuwbouw | Yannova Bouw",
  description: "Complete nieuwbouwprojecten van fundament tot dak in Keerbergen, Mechelen, Leuven. Professionele nieuwbouw met vakmanschap en duurzaamheid. Vraag offerte aan!",
  keywords: [
    "nieuwbouw", "nieuwbouwprojecten", "fundament", "dak", "duurzaam bouwen",
    "energiezuinig", "moderne architectuur", "Keerbergen", "Mechelen", "Leuven", "Putte", "Bonheiden", "Rijmenam"
  ]
};

export default function NieuwbouwPage() {
  // Functie om unieke afbeeldingen toe te wijzen aan elke fase
  const getFaseImage = (faseNumber: string) => {
    const imageMap: { [key: string]: string } = {
      "1": '/images/projects/project-1-villa.jpg',      // Ontwerp & Planning
      "2": '/images/projects/project-2-monument.jpg',   // Fundament & Constructie  
      "3": '/images/projects/project-3-office.jpg',     // Installaties & Afwerking
      "4": '/images/projects/project-4-bathroom.jpg'    // Oplevering & Nazorg
    };
    return imageMap[faseNumber] || '/images/projects/project-1-villa.jpg';
  };

  const nieuwbouwServices = [
    {
      title: "Eengezinswoningen",
      description: "Complete nieuwbouw van moderne eengezinswoningen met duurzame materialen",
      features: ["Fundament tot dak", "Energiezuinig", "Moderne architectuur", "Duurzame materialen"],
      price: "Vanaf €1.200/m²",
    },
    {
      title: "Meergezinswoningen",
      description: "Nieuwbouw van appartementen en meergezinswoningen met moderne voorzieningen",
      features: ["Appartementen", "Gemeenschappelijke ruimtes", "Parking", "Lift"],
      price: "Vanaf €1.000/m²",
    },
    {
      title: "Bedrijfspanden",
      description: "Professionele nieuwbouw van bedrijfspanden en kantoren",
      features: ["Kantoren", "Werkplaatsen", "Parking", "Logistiek"],
      price: "Vanaf €800/m²",
    },
  ];

  const nieuwbouwFases = [
    {
      fase: "1",
      title: "Ontwerp & Planning",
      description: "Gedetailleerd ontwerp en planning van uw nieuwbouwproject",
      details: ["Architectuur ontwerp", "Bouwaanvraag", "Technische tekeningen", "Kostenraming"],
    },
    {
      fase: "2",
      title: "Fundament & Constructie",
      description: "Aanleg van fundament en opbouw van de constructie",
      details: ["Fundament graven", "Betonwerk", "Metselwerk", "Dakconstructie"],
    },
    {
      fase: "3",
      title: "Installaties & Afwerking",
      description: "Plaatsing van installaties en afwerking van het pand",
      details: ["Elektriciteit", "Sanitair", "Verwarming", "Interieur afwerking"],
    },
    {
      fase: "4",
      title: "Oplevering & Nazorg",
      description: "Finale oplevering en nazorg van uw nieuwbouwproject",
      details: ["Kwaliteitscontrole", "Oplevering", "Garantie", "Onderhoudsadvies"],
    },
  ];

  const voordelen = [
    {
      icon: Home,
      title: "Duurzaam Bouwen",
      description: "Energiezuinige nieuwbouw met duurzame materialen en moderne technieken",
    },
    {
      icon: Shield,
      title: "Kwaliteitsgarantie",
      description: "Uitgebreide garantie op constructie en materialen voor jarenlang plezier",
    },
    {
      icon: Clock,
      title: "Tijdige Oplevering",
      description: "Realistische planning en tijdige oplevering van uw nieuwbouwproject",
    },
    {
      icon: Wrench,
      title: "Complete Uitvoering",
      description: "Van fundament tot sleutel - wij verzorgen het complete bouwproces",
    },
  ];

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-yannova-dark to-yannova-gray text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Nieuwbouw
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl">
            Complete nieuwbouwprojecten van fundament tot dak. Wij realiseren uw droomwoning of bedrijfspand 
            volgens de laatste normen en met oog voor duurzaamheid en vakmanschap.
          </p>
        </div>
      </section>

      {/* Introductie */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Professionele Nieuwbouw
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Wij verzorgen complete nieuwbouwprojecten van begin tot eind. Van de eerste schets tot de 
                sleuteloverdracht - onze ervaren vakmensen zorgen voor een perfecte uitvoering van uw 
                nieuwbouwproject.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                Onze nieuwbouwprojecten worden uitgevoerd volgens de laatste normen en met oog voor 
                duurzaamheid. Wij werken met hoogwaardige materialen en moderne technieken voor een 
                energiezuinig en toekomstbestendig resultaat.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="bg-yannova-primary/10 text-yannova-primary px-4 py-2 rounded-full text-sm font-semibold">
                  Duurzaam
                </div>
                <div className="bg-yannova-primary/10 text-yannova-primary px-4 py-2 rounded-full text-sm font-semibold">
                  Energiezuinig
                </div>
                <div className="bg-yannova-primary/10 text-yannova-primary px-4 py-2 rounded-full text-sm font-semibold">
                  Modern
                </div>
                <div className="bg-yannova-primary/10 text-yannova-primary px-4 py-2 rounded-full text-sm font-semibold">
                  Garantie
                </div>
              </div>
            </div>
            <div className="bg-yannova-primary/10 rounded-xl p-8">
              <div className="aspect-video rounded-lg overflow-hidden">
                <NextImage
                  src={photoManager.getCategoryPhoto('nieuwbouw').src}
                  alt="Nieuwbouw project - Moderne woning in aanbouw"
                  width={800}
                  height={450}
                  className="w-full h-full object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Nieuwbouw Diensten */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Onze Nieuwbouw Diensten
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Van eengezinswoningen tot bedrijfspanden - wij realiseren elk nieuwbouwproject
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {nieuwbouwServices.map((service, index) => (
              <div key={index} className="bg-white rounded-xl p-8 shadow-md hover:shadow-xl transition-shadow">
                <div className="bg-yannova-primary/10 w-16 h-16 rounded-lg flex items-center justify-center mb-6">
                  <Building2 className="text-yannova-primary" size={32} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {service.title}
                </h3>
                <p className="text-gray-600 mb-6">
                  {service.description}
                </p>
                <ul className="space-y-3 mb-6">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-center text-gray-700">
                      <CheckCircle className="text-yannova-primary mr-3" size={20} />
                      {feature}
                    </li>
                  ))}
                </ul>
                <div className="text-yannova-primary font-bold text-xl mb-4">
                  {service.price}
                </div>
                <Link
                  href="/contact"
                  className="inline-block bg-yannova-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-yannova-primary/90 transition-colors"
                >
                  Vraag Offerte Aan
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bouwproces */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Ons Nieuwbouw Proces
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Van eerste ontwerp tot sleuteloverdracht - zo realiseren wij uw nieuwbouwproject
            </p>
          </div>

          <div className="space-y-12">
            {nieuwbouwFases.map((fase, index) => (
              <div key={index} className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                  <div className="bg-yannova-primary text-white w-12 h-12 rounded-full flex items-center justify-center mb-6 text-xl font-bold">
                    {fase.fase}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {fase.title}
                  </h3>
                  <p className="text-lg text-gray-600 mb-6">
                    {fase.description}
                  </p>
                  <ul className="space-y-2">
                    {fase.details.map((detail, i) => (
                      <li key={i} className="flex items-center text-gray-700">
                        <span className="w-2 h-2 bg-yannova-primary rounded-full mr-3"></span>
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                  <div className="aspect-video rounded-xl overflow-hidden">
                    <NextImage
                      src={getFaseImage(fase.fase)}
                      alt={`Fase ${fase.fase} - ${fase.title}`}
                      width={600}
                      height={400}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projectfoto Galerij */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Projectfoto Galerij
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Bekijk onze meest recente nieuwbouwprojecten van fundament tot oplevering
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group cursor-pointer">
              <div className="aspect-video rounded-xl overflow-hidden mb-4">
                <NextImage
                  src="/images/gallery/nieuwbouw-gallery-1.jpg"
                  alt="Moderne Villa Nieuwbouw Project"
                  width={600}
                  height={400}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Moderne Villa</h3>
              <p className="text-gray-600">Complete nieuwbouw van een luxe villa met duurzame materialen</p>
            </div>

            <div className="group cursor-pointer">
              <div className="aspect-video rounded-xl overflow-hidden mb-4">
                <NextImage
                  src="/images/gallery/nieuwbouw-gallery-2.jpg"
                  alt="Appartementen Complex Project"
                  width={600}
                  height={400}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Appartementen Complex</h3>
              <p className="text-gray-600">Meergezinswoning met moderne architectuur en duurzaamheid</p>
            </div>

            <div className="group cursor-pointer">
              <div className="aspect-video rounded-xl overflow-hidden mb-4">
                <NextImage
                  src="/images/gallery/nieuwbouw-gallery-3.jpg"
                  alt="Kantoor Gebouw Project"
                  width={600}
                  height={400}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Kantoor Gebouw</h3>
              <p className="text-gray-600">Commerciële nieuwbouw met focus op energie-efficiëntie</p>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link
              href="/projecten"
              className="inline-flex items-center gap-2 bg-yannova-primary hover:bg-yannova-primaryDark text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-yannova-primary focus-visible:outline-offset-2"
            >
              Bekijk Alle Projecten
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Voordelen */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Waarom Kiezen voor Yannova Nieuwbouw?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Ervaring, vakmanschap en complete projectafronding
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {voordelen.map((voordeel, index) => (
              <div key={index} className="text-center">
                <div className="bg-yannova-primary/10 w-16 h-16 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <voordeel.icon className="text-yannova-primary" size={32} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {voordeel.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {voordeel.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projectfoto's */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Nieuwbouw Projectfoto's
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Bekijk onze recente nieuwbouwprojecten en de realisatie van verschillende panden
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="aspect-square bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg flex items-center justify-center">
                <span className="text-gray-500 text-sm">Nieuwbouw {i}</span>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link
              href="/projecten"
              className="inline-block bg-yannova-primary text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-yannova-primary/90 transition-colors"
            >
              Bekijk Alle Projectfoto's
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-yannova-primary">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Klaar voor uw Nieuwbouwproject?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Vraag een vrijblijvende offerte aan of plan een kennismakingsgesprek
          </p>
          <Link
            href="/contact"
            className="inline-block bg-white text-yannova-primary px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
          >
            Vraag Offerte Aan
          </Link>
        </div>
      </section>

      <Footer />
      <Chatbot />
    </div>
  );
}
