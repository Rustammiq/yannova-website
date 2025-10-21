"use client";

import Navigation from "@/components/ui/Navigation";
import Footer from "@/components/ui/Footer";
import Chatbot from "@/components/chatbot/Chatbot";
import Image from "next/image";
import {
  Building2,
  Hammer,
  Home,
  PaintBucket,
  Wrench,
  Sparkles,
} from "lucide-react";

export default function DienstenPage() {
  const services = [
    {
      id: "nieuwbouw",
      icon: Building2,
      title: "Nieuwbouw",
      image: "/images/projects/project-1-villa.jpg",
      description:
        "Complete nieuwbouwprojecten van fundament tot dak. Wij realiseren uw droomwoning of bedrijfspand volgens de laatste normen en met oog voor duurzaamheid.",
      features: [
        "Complete projectrealisatie",
        "Duurzame bouwmethoden",
        "Energiezuinige oplossingen",
        "Moderne architectuur",
      ],
    },
    {
      id: "verbouwing",
      icon: Hammer,
      title: "Verbouwing & Renovatie",
      image: "/images/projects/project-4-bathroom.jpg",
      description:
        "Geef uw bestaande pand een nieuwe uitstraling. Van kleine aanpassingen tot complete renovaties, wij maken het mogelijk.",
      features: [
        "Badkamer renovaties",
        "Keuken verbouwingen",
        "Dakopbouw & aanbouw",
        "Complete renovaties",
      ],
    },
    {
      id: "dakwerk",
      icon: Home,
      title: "Dakwerk",
      image: "/images/projects/project-5-extension.jpg",
      description:
        "Professionele dakwerken voor elk type dak. Van nieuwe dakbedekking tot reparaties en onderhoud.",
      features: [
        "Pannendaken",
        "Platte daken",
        "Dakreparaties",
        "Dakisolatie",
      ],
    },
    {
      id: "gevelbekleding",
      icon: PaintBucket,
      title: "Gevelbekleding & Crepi",
      image: "/images/projects/project-7-crepi.jpg",
      description:
        "Professionele gevelbekleding en crepi werkzaamheden voor een moderne en duurzame uitstraling. Van traditionele crepi tot moderne gevelmaterialen.",
      features: [
        "Crepi aanbrengen en herstellen",
        "Houtbekleding",
        "Kunststof gevels",
        "Steenstrips",
        "Gevelisolatie",
        "Gevelreiniging",
      ],
    },
    {
      id: "onderhoud",
      icon: Wrench,
      title: "Onderhoud & Reparatie",
      image: "/images/projects/project-2-monument.jpg",
      description:
        "Regelmatig onderhoud voorkomt grote problemen. Wij helpen u met al uw onderhoudswerkzaamheden.",
      features: [
        "Preventief onderhoud",
        "Kleine reparaties",
        "Schilderwerk",
        "Houtrot herstel",
      ],
    },
    {
      id: "ramen-deuren",
      icon: Home,
      title: "Ramen & Deuren",
      image: "/images/projects/project-8-windows.jpg",
      description:
        "Professionele plaatsing en renovatie van ramen en deuren. Van moderne kunststof kozijnen tot klassieke houten deuren, wij verzorgen de complete uitvoering.",
      features: [
        "Nieuwe ramen plaatsen",
        "Deuren vervangen",
        "Kozijn renovatie",
        "Glas vervangen",
        "Afdichting en isolatie",
        "Veiligheidsglas",
      ],
    },
    {
      id: "maatwerk",
      icon: Sparkles,
      title: "Maatwerk Oplossingen",
      description:
        "Elk project is uniek. Wij denken graag met u mee voor op maat gemaakte bouwoplossingen die perfect bij uw wensen passen.",
      features: [
        "Custom designs",
        "Persoonlijk advies",
        "Flexibele aanpak",
        "Creatieve oplossingen",
      ],
    },
  ];

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-yannova-dark to-yannova-gray text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Onze Diensten
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl">
            Van nieuwbouw tot renovatie - wij leveren kwaliteit en vakmanschap
            voor elk bouwproject
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            {services.map((service, index) => (
              <div
                key={service.id}
                id={service.id}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? "lg:flex-row-reverse" : ""
                }`}
              >
                <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                  <div className="bg-yannova-primary/10 w-16 h-16 rounded-lg flex items-center justify-center mb-6">
                    <service.icon className="text-yannova-primary" size={32} />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    {service.title}
                  </h2>
                  <p className="text-lg text-gray-600 mb-6">
                    {service.description}
                  </p>
                  <ul className="space-y-3">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-center text-gray-700">
                        <span className="w-2 h-2 bg-yannova-primary rounded-full mr-3"></span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <a
                    href="/contact"
                    className="inline-block mt-6 text-yannova-primary font-semibold hover:underline"
                  >
                    Vraag offerte aan →
                  </a>
                </div>
                <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                  <div className="aspect-video rounded-xl overflow-hidden">
                    <Image
                      src={service.image || "/images/projects/project-1-villa.jpg"}
                      alt={`${service.title} project foto`}
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

      {/* Uitgebreide SEO Content */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Gespecialiseerde Renovatiediensten
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Van foto's en crepi tot ramen en deuren - professionele renovatiewerken door ervaren vakmensen
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            {/* Crepi Werkzaamheden */}
            <div className="bg-gray-50 rounded-xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Crepi Aanbrengen en Renovatie
              </h3>
              <p className="text-gray-600 mb-6">
                Crepi is een duurzame en esthetische gevelafwerking die uw woning of bedrijfspand een moderne uitstraling geeft. 
                Onze ervaren vakmensen verzorgen het complete crepi proces, van voorbereiding tot afwerking.
              </p>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Wat is crepi?</h4>
                  <p className="text-gray-600 text-sm">
                    Crepi is een decoratieve pleisterlaag die wordt aangebracht op gevels voor een textuurrijke, 
                    beschermende en isolerende afwerking. Het is verkrijgbaar in verschillende kleuren en structuren.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Onze crepi diensten:</h4>
                  <ul className="text-gray-600 text-sm space-y-1">
                    <li>• Nieuwe crepi aanbrengen</li>
                    <li>• Crepi herstellen en renoveren</li>
                    <li>• Kleurkeuze en advies</li>
                    <li>• Voorbehandeling van de ondergrond</li>
                    <li>• Afdichting en voegwerk</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Ramen en Deuren */}
            <div className="bg-gray-50 rounded-xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Ramen en Deuren Renovatie
              </h3>
              <p className="text-gray-600 mb-6">
                Moderne ramen en deuren verbeteren niet alleen de uitstraling van uw pand, maar ook de energie-efficiëntie 
                en veiligheid. Wij verzorgen de complete uitvoering van ramen- en deurenprojecten.
              </p>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Ramen vervangen</h4>
                  <p className="text-gray-600 text-sm">
                    Van enkelglas naar dubbelglas of HR++ glas voor betere isolatie. 
                    Wij plaatsen alle soorten ramen: kunststof, aluminium en hout.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Deuren renovatie</h4>
                  <ul className="text-gray-600 text-sm space-y-1">
                    <li>• Voordeur vervangen</li>
                    <li>• Binnendeuren renoveren</li>
                    <li>• Kozijn reparatie</li>
                    <li>• Veiligheidsglas plaatsen</li>
                    <li>• Afdichting en isolatie</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Foto's en Documentatie */}
          <div className="bg-yannova-primary/5 rounded-xl p-8 mb-16">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Projectfoto's en Documentatie
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-semibold text-gray-900 mb-4">Voor en na foto's</h4>
                <p className="text-gray-600 mb-4">
                  Wij documenteren elk project met professionele foto's die de transformatie 
                  van uw pand duidelijk laten zien. Van de eerste schets tot de finale oplevering.
                </p>
                <ul className="text-gray-600 text-sm space-y-1">
                  <li>• Voor- en na foto's van renovaties</li>
                  <li>• Tussentijdse voortgangsfoto's</li>
                  <li>• Detailfoto's van afwerking</li>
                  <li>• 360° panoramafoto's</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-4">Technische documentatie</h4>
                <p className="text-gray-600 mb-4">
                  Alle werkzaamheden worden gedocumenteerd met technische specificaties, 
                  materialenlijsten en garantiecertificaten voor uw administratie.
                </p>
                <ul className="text-gray-600 text-sm space-y-1">
                  <li>• Materialenlijst en specificaties</li>
                  <li>• Garantiecertificaten</li>
                  <li>• Technische tekeningen</li>
                  <li>• Onderhoudsadvies</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Renovatiewerken Overzicht */}
          <div className="bg-white border border-gray-200 rounded-xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Complete Renovatiewerken
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-yannova-primary/10 w-16 h-16 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <PaintBucket className="text-yannova-primary" size={32} />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Gevelrenovatie</h4>
                <p className="text-gray-600 text-sm">
                  Complete gevelrenovatie met crepi, isolatie en nieuwe afwerking voor een moderne uitstraling.
                </p>
              </div>
              <div className="text-center">
                <div className="bg-yannova-primary/10 w-16 h-16 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Home className="text-yannova-primary" size={32} />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Ramen & Deuren</h4>
                <p className="text-gray-600 text-sm">
                  Vervanging van ramen en deuren voor betere isolatie, veiligheid en esthetiek.
                </p>
              </div>
              <div className="text-center">
                <div className="bg-yannova-primary/10 w-16 h-16 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Hammer className="text-yannova-primary" size={32} />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Interieur Renovatie</h4>
                <p className="text-gray-600 text-sm">
                  Complete interieurrenovatie van keuken tot badkamer met moderne materialen en technieken.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Werkwijze */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Onze Werkwijze
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Van eerste contact tot oplevering - zo werken wij
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-yannova-primary text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                1
              </div>
              <h3 className="font-bold text-gray-900 mb-2">
                Kennismaking & Advies
              </h3>
              <p className="text-gray-600 text-sm">
                Vrijblijvend gesprek over uw wensen en mogelijkheden
              </p>
            </div>
            <div className="text-center">
              <div className="bg-yannova-primary text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                2
              </div>
              <h3 className="font-bold text-gray-900 mb-2">
                Offerte & Planning
              </h3>
              <p className="text-gray-600 text-sm">
                Gedetailleerde offerte en realistische planning
              </p>
            </div>
            <div className="text-center">
              <div className="bg-yannova-primary text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                3
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Uitvoering</h3>
              <p className="text-gray-600 text-sm">
                Professionele realisatie met reguliere updates
              </p>
            </div>
            <div className="text-center">
              <div className="bg-yannova-primary text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                4
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Oplevering</h3>
              <p className="text-gray-600 text-sm">
                Finale inspectie en tevreden klant
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-yannova-primary">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Klaar om te starten?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Vraag een vrijblijvende offerte aan of plan een kennismakingsgesprek
          </p>
          <a
            href="/contact"
            className="inline-block bg-white text-yannova-primary px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
          >
            Contact Opnemen
          </a>
        </div>
      </section>

      <Footer />
      <Chatbot />
    </div>
  );
}
