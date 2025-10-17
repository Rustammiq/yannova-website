import Navigation from "@/components/ui/Navigation";
import Footer from "@/components/ui/Footer";
import Chatbot from "@/components/chatbot/Chatbot";
import { Calendar, MapPin, Tag } from "lucide-react";

export default function ProjectenPage() {
  const projects = [
    {
      id: 1,
      title: "Moderne Villa - Amsterdam",
      category: "Nieuwbouw",
      location: "Amsterdam",
      date: "2024",
      description:
        "Complete nieuwbouw van een luxe villa met duurzame materialen en moderne architectuur. Het project omvatte alle fases van fundament tot afwerking.",
      features: ["350m² woonoppervlak", "Energieneutraal", "Smart home systeem"],
    },
    {
      id: 2,
      title: "Renovatie Monumentaal Pand",
      category: "Renovatie",
      location: "Utrecht",
      date: "2023",
      description:
        "Volledige renovatie van een monumentaal pand met behoud van authentieke details en toevoeging van moderne voorzieningen.",
      features: ["Monumentenstatus behouden", "Moderne isolatie", "Authentieke details"],
    },
    {
      id: 3,
      title: "Bedrijfspand Verbouwing",
      category: "Verbouwing",
      location: "Rotterdam",
      date: "2024",
      description:
        "Transformatie van een oud bedrijfspand tot modern kantoorgebouw met open werkruimtes en moderne faciliteiten.",
      features: ["500m² kantoorruimte", "Open concept", "Duurzame materialen"],
    },
    {
      id: 4,
      title: "Luxe Badkamer Suite",
      category: "Renovatie",
      location: "Den Haag",
      date: "2024",
      description:
        "Complete badkamerrenovatie met natuursteen, inloopdouche en maatwerk meubels voor een spa-achtige ervaring.",
      features: ["Natuursteen", "Vloerverwarming", "Luxe sanitair"],
    },
    {
      id: 5,
      title: "Aanbouw Woonhuis",
      category: "Verbouwing",
      location: "Haarlem",
      date: "2023",
      description:
        "Stijlvolle aanbouw met grote raampartijen en naadloze verbinding met de bestaande woning.",
      features: ["40m² uitbreiding", "Grote ramen", "Geïntegreerd design"],
    },
    {
      id: 6,
      title: "Duurzaam Appartementencomplex",
      category: "Nieuwbouw",
      location: "Eindhoven",
      date: "2023",
      description:
        "Nieuwbouw van 12 energieneutrale appartementen met gedeelde groene ruimte en moderne voorzieningen.",
      features: ["12 appartementen", "Energie neutraal", "Groene buitenruimte"],
    },
    {
      id: 7,
      title: "Gevelrenovatie met Crepi",
      category: "Renovatie",
      location: "Amsterdam",
      date: "2024",
      description:
        "Complete gevelrenovatie van een jaren '70 woning met moderne crepi afwerking, isolatie en nieuwe ramen voor een frisse uitstraling.",
      features: ["Crepi gevelafwerking", "Nieuwe ramen", "Gevelisolatie", "Kleurrenovatie"],
    },
    {
      id: 8,
      title: "Ramen en Deuren Vervanging",
      category: "Renovatie",
      location: "Utrecht",
      date: "2024",
      description:
        "Vervanging van alle ramen en deuren in een monumentaal pand met behoud van de authentieke uitstraling en verbeterde isolatie.",
      features: ["HR++ glas", "Houten kozijnen", "Veiligheidsglas", "Afdichting"],
    },
    {
      id: 9,
      title: "Bedrijfspand Gevelrenovatie",
      category: "Renovatie",
      location: "Rotterdam",
      date: "2024",
      description:
        "Moderne gevelrenovatie van een bedrijfspand met crepi, nieuwe ramen en professionele documentatie van het hele proces.",
      features: ["Crepi renovatie", "Kantoorramen", "Professionele foto's", "Documentatie"],
    },
  ];

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-yannova-dark to-yannova-gray text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Onze Projecten
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl">
            Bekijk een selectie van onze succesvol afgeronde projecten
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-yannova-primary mb-2">
                100+
              </div>
              <div className="text-gray-600">Projecten Afgerond</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-yannova-primary mb-2">
                15+
              </div>
              <div className="text-gray-600">Jaar Ervaring</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-yannova-primary mb-2">
                98%
              </div>
              <div className="text-gray-600">Klanttevredenheid</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-yannova-primary mb-2">
                24/7
              </div>
              <div className="text-gray-600">Bereikbaar</div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <div
                key={project.id}
                className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
              >
                {/* Project Image Placeholder */}
                <div className="aspect-video bg-gradient-to-br from-yannova-primary/20 to-yannova-primary/5 flex items-center justify-center">
                  <span className="text-yannova-primary text-lg font-semibold">
                    [Project {project.id}]
                  </span>
                </div>

                {/* Project Info */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="inline-block bg-yannova-primary/10 text-yannova-primary px-3 py-1 rounded-full text-sm font-semibold">
                      {project.category}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {project.title}
                  </h3>

                  <p className="text-gray-600 text-sm mb-4">
                    {project.description}
                  </p>

                  {/* Features */}
                  <ul className="space-y-2 mb-4">
                    {project.features.map((feature, i) => (
                      <li key={i} className="text-sm text-gray-700 flex items-center">
                        <span className="w-1.5 h-1.5 bg-yannova-primary rounded-full mr-2"></span>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {/* Meta Info */}
                  <div className="flex items-center gap-4 text-sm text-gray-500 pt-4 border-t">
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
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Foto's en Documentatie Sectie */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Projectfoto's en Documentatie
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Elke renovatie wordt volledig gedocumenteerd met professionele foto's en technische specificaties
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            {/* Voor en Na Foto's */}
            <div className="bg-gray-50 rounded-xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Voor en Na Foto's
              </h3>
              <p className="text-gray-600 mb-6">
                Wij maken professionele foto's van elk project om de transformatie duidelijk te laten zien. 
                Van de eerste schets tot de finale oplevering - elk moment wordt vastgelegd.
              </p>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white rounded-lg p-4 text-center">
                    <div className="aspect-square bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg mb-3 flex items-center justify-center">
                      <span className="text-gray-500 text-sm">Voor foto</span>
                    </div>
                    <p className="text-sm text-gray-600">Voor renovatie</p>
                  </div>
                  <div className="bg-white rounded-lg p-4 text-center">
                    <div className="aspect-square bg-gradient-to-br from-yannova-primary/20 to-yannova-primary/5 rounded-lg mb-3 flex items-center justify-center">
                      <span className="text-yannova-primary text-sm">Na foto</span>
                    </div>
                    <p className="text-sm text-gray-600">Na renovatie</p>
                  </div>
                </div>
                <ul className="text-gray-600 text-sm space-y-1">
                  <li>• Hoge resolutie foto's</li>
                  <li>• Verschillende hoeken en details</li>
                  <li>• Professionele belichting</li>
                  <li>• 360° panoramafoto's</li>
                </ul>
              </div>
            </div>

            {/* Technische Documentatie */}
            <div className="bg-gray-50 rounded-xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Technische Documentatie
              </h3>
              <p className="text-gray-600 mb-6">
                Alle werkzaamheden worden gedocumenteerd met technische specificaties, 
                materialenlijsten en garantiecertificaten voor uw administratie en toekomstig onderhoud.
              </p>
              <div className="space-y-4">
                <div className="bg-white rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Crepi Projecten</h4>
                  <ul className="text-gray-600 text-sm space-y-1">
                    <li>• Crepi type en kleur specificaties</li>
                    <li>• Voorbehandeling documentatie</li>
                    <li>• Weersomstandigheden tijdens aanbreng</li>
                    <li>• Garantie en onderhoudsadvies</li>
                  </ul>
                </div>
                <div className="bg-white rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Ramen & Deuren</h4>
                  <ul className="text-gray-600 text-sm space-y-1">
                    <li>• U-waarde en isolatiewaarden</li>
                    <li>• Glas specificaties en garantie</li>
                    <li>• Afdichting en voegwerk details</li>
                    <li>• Onderhoudsvoorschriften</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Foto Galerij Placeholder */}
          <div className="bg-gradient-to-r from-yannova-primary/5 to-yannova-primary/10 rounded-xl p-8 text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Projectfoto Galerij
            </h3>
            <p className="text-gray-600 mb-6">
              Bekijk onze meest recente projecten met crepi, ramen en deuren renovaties
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <div key={i} className="aspect-square bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg flex items-center justify-center">
                  <span className="text-gray-500 text-sm">Foto {i}</span>
                </div>
              ))}
            </div>
            <button className="mt-6 bg-yannova-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-yannova-primary/90 transition-colors">
              Bekijk Alle Foto's
            </button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Wat Onze Klanten Zeggen
            </h2>
            <p className="text-xl text-gray-600">
              Tevreden klanten zijn onze beste referentie
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 rounded-xl p-8">
              <div className="text-yannova-primary text-4xl mb-4">"</div>
              <p className="text-gray-700 mb-6">
                Professioneel team dat precies wist wat ze deden. Ons huis is
                prachtig verbouwd en alles werd op tijd opgeleverd!
              </p>
              <div className="font-semibold text-gray-900">- Familie Jansen</div>
              <div className="text-sm text-gray-500">Amsterdam</div>
            </div>

            <div className="bg-gray-50 rounded-xl p-8">
              <div className="text-yannova-primary text-4xl mb-4">"</div>
              <p className="text-gray-700 mb-6">
                Uitstekende communicatie en vakmanschap. Ze dachten actief mee
                en kwamen met goede suggesties.
              </p>
              <div className="font-semibold text-gray-900">- P. de Vries</div>
              <div className="text-sm text-gray-500">Utrecht</div>
            </div>

            <div className="bg-gray-50 rounded-xl p-8">
              <div className="text-yannova-primary text-4xl mb-4">"</div>
              <p className="text-gray-700 mb-6">
                Van begin tot eind perfect geregeld. Aanrader voor iedereen die
                een betrouwbare aannemer zoekt!
              </p>
              <div className="font-semibold text-gray-900">- M. Bakker</div>
              <div className="text-sm text-gray-500">Rotterdam</div>
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
            Neem contact op en ontdek wat wij voor u kunnen betekenen
          </p>
          <a
            href="/contact"
            className="inline-block bg-white text-yannova-primary px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
          >
            Start Uw Project
          </a>
        </div>
      </section>

      <Footer />
      <Chatbot />
    </div>
  );
}
