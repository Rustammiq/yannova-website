import Navigation from "@/components/ui/Navigation";
import Footer from "@/components/ui/Footer";
import Chatbot from "@/components/chatbot/Chatbot";
import { Hammer, CheckCircle, Clock, Shield, Home, Wrench } from "lucide-react";
import Link from "next/link";
import NextImage from "next/image";
import { photoManager } from "@/lib/photoManager";

export const metadata = {
  title: "Verbouwing & Renovatie | Yannova Bouw",
  description: "Professionele verbouwing en renovatie in Keerbergen, Mechelen, Leuven. Van kleine aanpassingen tot complete renovaties. Vraag offerte aan!",
  keywords: [
    "verbouwing", "renovatie", "badkamer renovatie", "keuken verbouwing", "dakopbouw", "aanbouw",
    "interieur renovatie", "Keerbergen", "Mechelen", "Leuven", "Putte", "Bonheiden", "Rijmenam"
  ]
};

export default function VerbouwingPage() {
  // Functie om unieke afbeeldingen toe te wijzen aan elke stap
  const getStapImage = (stapNumber: string) => {
    const imageMap: { [key: string]: string } = {
      "1": '/images/projects/project-4-bathroom.jpg',   // Planning & Ontwerp
      "2": '/images/projects/project-5-extension.jpg',  // Voorbereiding & Demontage
      "3": '/images/projects/project-6-apartments.jpg', // Uitvoering & Bouw
      "4": '/images/projects/project-9-commercial.jpg'  // Afwerking & Oplevering
    };
    return imageMap[stapNumber] || '/images/projects/project-4-bathroom.jpg';
  };

  const verbouwingServices = [
    {
      title: "Badkamer Renovatie",
      description: "Complete badkamer renovatie met moderne voorzieningen en duurzame materialen",
      features: ["Sanitair vervangen", "Tegelwerk", "Verwarming", "Ventilatie"],
      price: "Vanaf €8.500",
    },
    {
      title: "Keuken Verbouwing",
      description: "Moderne keuken verbouwing met nieuwe apparatuur en optimale indeling",
      features: ["Keukenblok", "Apparatuur", "Werkblad", "Verlichting"],
      price: "Vanaf €12.500",
    },
    {
      title: "Dakopbouw & Aanbouw",
      description: "Uitbreiding van uw woning met dakopbouw of aanbouw voor extra ruimte",
      features: ["Dakopbouw", "Aanbouw", "Isolatie", "Afdichting"],
      price: "Vanaf €1.200/m²",
    },
  ];

  const verbouwingTypes = [
    {
      title: "Interieur Renovatie",
      description: "Complete interieurrenovatie van woonkamer tot slaapkamer",
      features: ["Vloeren", "Wanden", "Plafonds", "Verlichting", "Schilderwerk"],
      icon: Home,
    },
    {
      title: "Sanitair Renovatie",
      description: "Renovatie van badkamer, toilet en keuken met moderne voorzieningen",
      features: ["Sanitair", "Tegelwerk", "Verwarming", "Ventilatie", "Verlichting"],
      icon: Wrench,
    },
    {
      title: "Exterieur Verbouwing",
      description: "Externe verbouwingen zoals dakopbouw, aanbouw en gevelrenovatie",
      features: ["Dakopbouw", "Aanbouw", "Gevelrenovatie", "Ramen & deuren", "Isolatie"],
      icon: Hammer,
    },
  ];

  const verbouwingStappen = [
    {
      stap: "1",
      title: "Inspectie & Advies",
      description: "Gedetailleerde inspectie en advies over de beste verbouwingsoplossing",
      details: ["Situatie analyse", "Mogelijkheden onderzoeken", "Advies geven", "Kostenraming"],
    },
    {
      stap: "2",
      title: "Planning & Voorbereiding",
      description: "Gedetailleerde planning en voorbereiding van de verbouwing",
      details: ["Werkplanning", "Materialen bestellen", "Vergunningen", "Werkplaats inrichten"],
    },
    {
      stap: "3",
      title: "Uitvoering",
      description: "Professionele uitvoering van alle verbouwingswerkzaamheden",
      details: ["Demontage", "Nieuwe materialen", "Installaties", "Afwerking"],
    },
    {
      stap: "4",
      title: "Oplevering & Nazorg",
      description: "Finale oplevering en nazorg van uw verbouwingsproject",
      details: ["Kwaliteitscontrole", "Oplevering", "Garantie", "Onderhoudsadvies"],
    },
  ];

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-yannova-dark to-yannova-gray text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Verbouwing & Renovatie
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl">
            Geef uw bestaande pand een nieuwe uitstraling. Van kleine aanpassingen tot complete 
            renovaties, wij maken het mogelijk met vakmanschap en aandacht voor detail.
          </p>
        </div>
      </section>

      {/* Introductie */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Professionele Verbouwing
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Wij verzorgen alle soorten verbouwingen en renovaties. Van badkamer renovatie tot 
                complete interieurrenovatie - onze ervaren vakmensen zorgen voor een perfecte 
                uitvoering van uw verbouwingsproject.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                Elke verbouwing wordt aangepakt met oog voor detail en kwaliteit. Wij werken met 
                hoogwaardige materialen en moderne technieken voor een duurzaam en esthetisch resultaat.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="bg-yannova-primary/10 text-yannova-primary px-4 py-2 rounded-full text-sm font-semibold">
                  Vakmanschap
                </div>
                <div className="bg-yannova-primary/10 text-yannova-primary px-4 py-2 rounded-full text-sm font-semibold">
                  Kwaliteit
                </div>
                <div className="bg-yannova-primary/10 text-yannova-primary px-4 py-2 rounded-full text-sm font-semibold">
                  Duurzaam
                </div>
                <div className="bg-yannova-primary/10 text-yannova-primary px-4 py-2 rounded-full text-sm font-semibold">
                  Garantie
                </div>
              </div>
            </div>
            <div className="bg-yannova-primary/10 rounded-xl p-8">
              <div className="aspect-video rounded-lg overflow-hidden">
                <NextImage
                  src={photoManager.getCategoryPhoto('verbouwing').src}
                  alt="Verbouwing project - Woningverbouwing in uitvoering"
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

      {/* Verbouwingsdiensten */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Onze Verbouwingsdiensten
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Van badkamer renovatie tot complete interieurrenovatie - wij verzorgen alle werkzaamheden
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {verbouwingServices.map((service, index) => (
              <div key={index} className="bg-white rounded-xl p-8 shadow-md hover:shadow-xl transition-shadow">
                <div className="bg-yannova-primary/10 w-16 h-16 rounded-lg flex items-center justify-center mb-6">
                  <Hammer className="text-yannova-primary" size={32} />
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

      {/* Verbouwing Types */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Soorten Verbouwingen
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Wij verzorgen verschillende soorten verbouwingen, elk met hun eigen specialisatie
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {verbouwingTypes.map((type, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-8">
                <div className="bg-yannova-primary/10 w-16 h-16 rounded-lg flex items-center justify-center mb-6">
                  <type.icon className="text-yannova-primary" size={32} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {type.title}
                </h3>
                <p className="text-gray-600 mb-6">
                  {type.description}
                </p>
                <ul className="space-y-2">
                  {type.features.map((feature, i) => (
                    <li key={i} className="flex items-center text-gray-700">
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

      {/* Werkwijze */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Onze Verbouwings Werkwijze
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Van eerste inspectie tot finale oplevering - zo werken wij aan uw verbouwingsproject
            </p>
          </div>

          <div className="space-y-12">
            {verbouwingStappen.map((stap, index) => (
              <div key={index} className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                  <div className="bg-yannova-primary text-white w-12 h-12 rounded-full flex items-center justify-center mb-6 text-xl font-bold">
                    {stap.stap}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {stap.title}
                  </h3>
                  <p className="text-lg text-gray-600 mb-6">
                    {stap.description}
                  </p>
                  <ul className="space-y-2">
                    {stap.details.map((detail, i) => (
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
                      src={getStapImage(stap.stap)}
                      alt={`Stap ${stap.stap} - ${stap.title}`}
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

      {/* Voordelen */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Waarom Kiezen voor Yannova Verbouwing?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Ervaring, vakmanschap en complete projectafronding
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-yannova-primary/10 w-16 h-16 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Clock className="text-yannova-primary" size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                15+ Jaar Ervaring
              </h3>
              <p className="text-gray-600 text-sm">
                Met verbouwingen en renovaties in de regio
              </p>
            </div>
            <div className="text-center">
              <div className="bg-yannova-primary/10 w-16 h-16 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Shield className="text-yannova-primary" size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Kwaliteitsgarantie
              </h3>
              <p className="text-gray-600 text-sm">
                Uitgebreide garantie op alle werkzaamheden
              </p>
            </div>
            <div className="text-center">
              <div className="bg-yannova-primary/10 w-16 h-16 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Wrench className="text-yannova-primary" size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Vakmanschap
              </h3>
              <p className="text-gray-600 text-sm">
                Ervaren vakmensen met oog voor detail
              </p>
            </div>
            <div className="text-center">
              <div className="bg-yannova-primary/10 w-16 h-16 rounded-lg flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="text-yannova-primary" size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Complete Uitvoering
              </h3>
              <p className="text-gray-600 text-sm">
                Van begin tot eind - wij verzorgen alles
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* AI Automatisering in Verbouwing */}
      <section className="py-20 bg-gradient-to-br from-yannova-primary/5 to-yannova-primary/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              AI-Powered Verbouwing
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Ontdek hoe Yannova AI en moderne technologie gebruikt om uw verbouwingsproject te optimaliseren
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {/* AI Project Management */}
            <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 group">
              <div className="aspect-video relative">
                <video
                  src="/videos/ai-automation/ai-project-management.mp4"
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  muted
                  loop
                  playsInline
                  poster="/images/projects/project-4-bathroom.jpg"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-lg font-bold">AI Project Management</h3>
                  <p className="text-sm opacity-90">Smart planning & tracking</p>
                </div>
                <div className="absolute top-4 right-4">
                  <span className="bg-yannova-primary text-white px-3 py-1 rounded-full text-xs font-semibold pulse-ai">
                    AI
                  </span>
                </div>
              </div>
            </div>

            {/* Smart Materials Tracking */}
            <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 group">
              <div className="aspect-video relative">
                <video
                  src="/videos/ai-automation/smart-materials-tracking.mp4"
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  muted
                  loop
                  playsInline
                  poster="/images/projects/project-8-windows.jpg"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-lg font-bold">Smart Materialen Tracking</h3>
                  <p className="text-sm opacity-90">Geautomatiseerde voorraad</p>
                </div>
                <div className="absolute top-4 right-4">
                  <span className="bg-yannova-primary text-white px-3 py-1 rounded-full text-xs font-semibold pulse-ai">
                    AI
                  </span>
                </div>
              </div>
            </div>

            {/* AI Quality Control */}
            <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 group">
              <div className="aspect-video relative">
                <video
                  src="/videos/ai-automation/ai-quality-control.mp4"
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  muted
                  loop
                  playsInline
                  poster="/images/projects/project-9-commercial.jpg"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-lg font-bold">AI Kwaliteitscontrole</h3>
                  <p className="text-sm opacity-90">Automatische inspectie</p>
                </div>
                <div className="absolute top-4 right-4">
                  <span className="bg-yannova-primary text-white px-3 py-1 rounded-full text-xs font-semibold pulse-ai">
                    AI
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* AI Features voor Verbouwing */}
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                AI-Ondersteunde Verbouwingsprocessen
              </h3>
              <p className="text-gray-600">
                Moderne technologie maakt uw verbouwingsproject efficiënter en nauwkeuriger
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center p-6 rounded-lg bg-gradient-to-br from-yannova-primary/5 to-yannova-primary/10 hover:shadow-md transition-shadow">
                <div className="w-16 h-16 bg-yannova-primary/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-yannova-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                  </svg>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Smart Planning</h4>
                <p className="text-sm text-gray-600">AI-geoptimaliseerde werkplanning en tijdschema's</p>
              </div>
              
              <div className="text-center p-6 rounded-lg bg-gradient-to-br from-yannova-primary/5 to-yannova-primary/10 hover:shadow-md transition-shadow">
                <div className="w-16 h-16 bg-yannova-primary/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-yannova-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Materialen Tracking</h4>
                <p className="text-sm text-gray-600">Automatische voorraadbeheer en levering</p>
              </div>
              
              <div className="text-center p-6 rounded-lg bg-gradient-to-br from-yannova-primary/5 to-yannova-primary/10 hover:shadow-md transition-shadow">
                <div className="w-16 h-16 bg-yannova-primary/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-yannova-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Kwaliteitscontrole</h4>
                <p className="text-sm text-gray-600">AI-gestuurde kwaliteitsinspectie en monitoring</p>
              </div>
              
              <div className="text-center p-6 rounded-lg bg-gradient-to-br from-yannova-primary/5 to-yannova-primary/10 hover:shadow-md transition-shadow">
                <div className="w-16 h-16 bg-yannova-primary/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-yannova-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">24/7 Support</h4>
                <p className="text-sm text-gray-600">AI chatbot voor directe ondersteuning</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projectfoto's */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Verbouwing Projectfoto's
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Bekijk onze recente verbouwingsprojecten en de transformatie van verschillende ruimtes
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group cursor-pointer">
              <div className="aspect-video rounded-xl overflow-hidden mb-4">
                <NextImage
                  src={photoManager.getGalleryPhoto('verbouwing', 0).src}
                  alt={photoManager.getGalleryPhoto('verbouwing', 0).alt}
                  width={600}
                  height={400}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Keuken Verbouwing</h3>
              <p className="text-gray-600">Complete keuken renovatie met moderne apparatuur en afwerking</p>
            </div>

            <div className="group cursor-pointer">
              <div className="aspect-video rounded-xl overflow-hidden mb-4">
                <NextImage
                  src={photoManager.getGalleryPhoto('verbouwing', 1).src}
                  alt={photoManager.getGalleryPhoto('verbouwing', 1).alt}
                  width={600}
                  height={400}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Zolder Verbouwing</h3>
              <p className="text-gray-600">Zolder omgebouwd tot extra woonruimte met isolatie</p>
            </div>

            <div className="group cursor-pointer">
              <div className="aspect-video rounded-xl overflow-hidden mb-4">
                <NextImage
                  src={photoManager.getGalleryPhoto('verbouwing', 2).src}
                  alt={photoManager.getGalleryPhoto('verbouwing', 2).alt}
                  width={600}
                  height={400}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Uitbouw Project</h3>
              <p className="text-gray-600">Uitbouw voor extra woonruimte met moderne architectuur</p>
            </div>
          </div>

          <div className="text-center">
            <Link
              href="/projecten"
              className="inline-block bg-yannova-primary text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-yannova-primary/90 transition-all duration-300 hover:scale-105 hover:shadow-xl"
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
            Klaar voor uw Verbouwingsproject?
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
