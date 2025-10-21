import Navigation from "@/components/ui/Navigation";
import Footer from "@/components/ui/Footer";
import Chatbot from "@/components/chatbot/Chatbot";
import { Home, CheckCircle, Shield, Thermometer, Lock } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { photoManager } from "@/lib/photoManager";

export const metadata = {
  title: "Ramen & Deuren | Yannova Renovatie",
  description: "Professionele ramen en deuren renovatie in Keerbergen, Mechelen, Leuven. Van moderne kunststof kozijnen tot klassieke houten deuren. Vraag offerte aan!",
  keywords: [
    "ramen vervangen", "deuren vervangen", "kozijn renovatie", "HR++ glas",
    "kunststof ramen", "aluminium ramen", "houten kozijnen", "veiligheidsdeuren",
    "Keerbergen", "Mechelen", "Leuven", "Putte", "Bonheiden", "Rijmenam"
  ]
};

export default function RamenDeurenPage() {
  const services = [
    {
      title: "Nieuwe Ramen Plaatsen",
      description: "Vervanging van oude ramen door moderne, energiezuinige ramen",
      features: ["HR++ glas", "Kunststof kozijnen", "Afdichting", "Garantie"],
      price: "Vanaf €350 per raam",
    },
    {
      title: "Deuren Vervangen",
      description: "Nieuwe voordeur of binnendeuren voor verbeterde veiligheid en esthetiek",
      features: ["Veiligheidsglas", "Hoge kwaliteit sloten", "Afdichting", "Montage"],
      price: "Vanaf €450 per deur",
    },
    {
      title: "Kozijn Renovatie",
      description: "Herstel en renovatie van bestaande kozijnen met behoud van karakter",
      features: ["Houtrot herstel", "Nieuwe verf", "Afdichting", "Onderhoud"],
      price: "Vanaf €200 per kozijn",
    },
  ];

  const windowTypes = [
    {
      name: "Kunststof Ramen",
      description: "Moderne, onderhoudsvriendelijke ramen met uitstekende isolatie",
      benefits: ["Onderhoudsvrij", "Goede isolatie", "Kleurvast", "Duurzaam"],
    },
    {
      name: "Aluminium Ramen",
      description: "Sterke en slanke ramen met moderne uitstraling",
      benefits: ["Sterk", "Slank profiel", "Weersbestendig", "Modern"],
    },
    {
      name: "Houten Ramen",
      description: "Klassieke houten ramen met natuurlijke uitstraling",
      benefits: ["Natuurlijk", "Warm", "Aanpasbaar", "Traditioneel"],
    },
  ];

  const doorTypes = [
    {
      name: "Voordeur",
      description: "Veilige en stijlvolle voordeur als visitekaartje van uw woning",
      features: ["Veiligheidsglas", "Sterke sloten", "Weersbestendig", "Maatwerk"],
    },
    {
      name: "Binnendeuren",
      description: "Stijlvolle binnendeuren die passen bij uw interieur",
      features: ["Geluiddempend", "Brandwerend", "Maatwerk", "Diverse stijlen"],
    },
    {
      name: "Schuifdeuren",
      description: "Ruimtebesparende schuifdeuren voor moderne woningen",
      features: ["Ruimtebesparend", "Modern", "Geluiddempend", "Eenvoudig bedienbaar"],
    },
  ];

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-yannova-dark to-yannova-gray text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Ramen & Deuren
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl">
            Professionele plaatsing en renovatie van ramen en deuren. Van moderne kunststof kozijnen 
            tot klassieke houten deuren, wij verzorgen de complete uitvoering.
          </p>
        </div>
      </section>

      {/* Introductie */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Moderne Ramen en Deuren
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Moderne ramen en deuren verbeteren niet alleen de uitstraling van uw pand, maar ook de 
                energie-efficiëntie en veiligheid. Wij verzorgen de complete uitvoering van ramen- en 
                deurenprojecten met aandacht voor detail en kwaliteit.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                Van enkelglas naar dubbelglas of HR++ glas voor betere isolatie. Wij plaatsen alle 
                soorten ramen: kunststof, aluminium en hout. Ook voor deuren hebben wij een breed 
                assortiment en kunnen wij maatwerk leveren.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="bg-yannova-primary/10 text-yannova-primary px-4 py-2 rounded-full text-sm font-semibold">
                  HR++ Glas
                </div>
                <div className="bg-yannova-primary/10 text-yannova-primary px-4 py-2 rounded-full text-sm font-semibold">
                  Veiligheidsglas
                </div>
                <div className="bg-yannova-primary/10 text-yannova-primary px-4 py-2 rounded-full text-sm font-semibold">
                  Maatwerk
                </div>
                <div className="bg-yannova-primary/10 text-yannova-primary px-4 py-2 rounded-full text-sm font-semibold">
                  Garantie
                </div>
              </div>
            </div>
            <div className="bg-yannova-primary/10 rounded-xl p-8">
              <div className="aspect-video rounded-lg overflow-hidden">
                <Image
                  src={photoManager.getCategoryPhoto('ramen-deuren').src}
                  alt="Ramen & deuren project - Nieuwe ramen en deuren installatie"
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

      {/* Diensten */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Onze Ramen & Deuren Diensten
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Van nieuwe ramen plaatsen tot deuren vervangen - wij verzorgen alle werkzaamheden
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-white rounded-xl p-8 shadow-md hover:shadow-xl transition-shadow">
                <div className="bg-yannova-primary/10 w-16 h-16 rounded-lg flex items-center justify-center mb-6">
                  <Home className="text-yannova-primary" size={32} />
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

      {/* Ramen Types */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Soorten Ramen
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Wij werken met verschillende soorten ramen, elk met hun eigen voordelen
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {windowTypes.map((type, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {type.name}
                </h3>
                <p className="text-gray-600 mb-6">
                  {type.description}
                </p>
                <ul className="space-y-2">
                  {type.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-center text-gray-700">
                      <span className="w-2 h-2 bg-yannova-primary rounded-full mr-3"></span>
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Deuren Types */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Soorten Deuren
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Van voordeur tot binnendeuren - wij hebben de juiste deur voor elke toepassing
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {doorTypes.map((type, index) => (
              <div key={index} className="bg-white rounded-xl p-8 shadow-md">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {type.name}
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

      {/* Voordelen */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Voordelen van Nieuwe Ramen en Deuren
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Waarom investeren in nieuwe ramen en deuren?
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-yannova-primary/10 w-16 h-16 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Thermometer className="text-yannova-primary" size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Energiebesparing
              </h3>
              <p className="text-gray-600 text-sm">
                HR++ glas en goede afdichting zorgen voor lagere energiekosten
              </p>
            </div>
            <div className="text-center">
              <div className="bg-yannova-primary/10 w-16 h-16 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Shield className="text-yannova-primary" size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Veiligheid
              </h3>
              <p className="text-gray-600 text-sm">
                Veiligheidsglas en sterke sloten voor extra beveiliging
              </p>
            </div>
            <div className="text-center">
              <div className="bg-yannova-primary/10 w-16 h-16 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Home className="text-yannova-primary" size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Waardevermeerdering
              </h3>
              <p className="text-gray-600 text-sm">
                Verhoogt de waarde en uitstraling van uw woning
              </p>
            </div>
            <div className="text-center">
              <div className="bg-yannova-primary/10 w-16 h-16 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Lock className="text-yannova-primary" size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Geluiddemping
              </h3>
              <p className="text-gray-600 text-sm">
                Moderne ramen en deuren dempen geluid van buiten
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Projectfoto's Galerij */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Ramen & Deuren Projectfoto's
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Bekijk onze recente ramen en deuren projecten. Van moderne kunststof kozijnen tot klassieke houten deuren - 
              elke transformatie wordt vastgelegd met professionele foto's en video's.
            </p>
          </div>

          {/* Voor en Na Sectie */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
              Voor en Na Transformatie
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Project 1 - Kunststof Ramen */}
              <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow group cursor-pointer">
                <div className="grid grid-cols-2">
                  <div className="aspect-square bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center relative overflow-hidden">
                    <Image
                      src="/images/ramen-deuren/voor-kunststof-ramen.jpg"
                      alt="Oude houten ramen voor renovatie"
                      width={400}
                      height={300}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                      <span className="text-gray-500 text-xs">Voor</span>
                    </div>
                  </div>
                  <div className="aspect-square bg-gradient-to-br from-yannova-primary/20 to-yannova-primary/5 flex items-center justify-center relative overflow-hidden">
                    <Image
                      src="/images/ramen-deuren/na-kunststof-ramen.jpg"
                      alt="Nieuwe kunststof ramen na renovatie"
                      width={400}
                      height={300}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-yannova-primary/20 to-yannova-primary/5 flex items-center justify-center">
                      <span className="text-yannova-primary text-xs">Na</span>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Moderne Kunststof Ramen</h4>
                  <p className="text-sm text-gray-600">Vervanging van oude houten ramen door HR++ kunststof kozijnen</p>
                  <div className="mt-2 flex items-center gap-2 text-xs text-gray-500">
                    <span>📅 2024</span>
                    <span>📍 Keerbergen</span>
                  </div>
                </div>
              </div>

              {/* Project 2 - Voordeur */}
              <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow group cursor-pointer">
                <div className="grid grid-cols-2">
                  <div className="aspect-square bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center relative overflow-hidden">
                    <Image
                      src="/images/ramen-deuren/voor-voordeur.jpg"
                      alt="Oude voordeur voor renovatie"
                      width={400}
                      height={300}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                      <span className="text-gray-500 text-xs">Voor</span>
                    </div>
                  </div>
                  <div className="aspect-square bg-gradient-to-br from-yannova-primary/20 to-yannova-primary/5 flex items-center justify-center relative overflow-hidden">
                    <Image
                      src="/images/ramen-deuren/na-voordeur.jpg"
                      alt="Nieuwe voordeur na renovatie"
                      width={400}
                      height={300}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-yannova-primary/20 to-yannova-primary/5 flex items-center justify-center">
                      <span className="text-yannova-primary text-xs">Na</span>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Nieuwe Voordeur</h4>
                  <p className="text-sm text-gray-600">Moderne voordeur met veiligheidsglas en sterke sloten</p>
                  <div className="mt-2 flex items-center gap-2 text-xs text-gray-500">
                    <span>📅 2024</span>
                    <span>📍 Mechelen</span>
                  </div>
                </div>
              </div>

              {/* Project 3 - Aluminium Ramen */}
              <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow group cursor-pointer">
                <div className="grid grid-cols-2">
                  <div className="aspect-square bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center relative overflow-hidden">
                    <Image
                      src="/images/ramen-deuren/voor-aluminium-ramen.jpg"
                      alt="Oude ramen voor aluminium renovatie"
                      width={400}
                      height={300}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                      <span className="text-gray-500 text-xs">Voor</span>
                    </div>
                  </div>
                  <div className="aspect-square bg-gradient-to-br from-yannova-primary/20 to-yannova-primary/5 flex items-center justify-center relative overflow-hidden">
                    <Image
                      src="/images/ramen-deuren/na-aluminium-ramen.jpg"
                      alt="Nieuwe aluminium ramen na renovatie"
                      width={400}
                      height={300}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-yannova-primary/20 to-yannova-primary/5 flex items-center justify-center">
                      <span className="text-yannova-primary text-xs">Na</span>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Aluminium Ramen</h4>
                  <p className="text-sm text-gray-600">Slanke aluminium kozijnen voor moderne uitstraling</p>
                  <div className="mt-2 flex items-center gap-2 text-xs text-gray-500">
                    <span>📅 2024</span>
                    <span>📍 Leuven</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Detail Foto's */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
              Detail Foto's en Technische Specificaties
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { title: "HR++ Glas Detail", desc: "Hoge isolatiewaarde", img: "/images/ramen-deuren/hr-glas-detail.jpg" },
                { title: "Afdichting Werk", desc: "Professionele voegwerk", img: "/images/ramen-deuren/afdichting-werk.jpg" },
                { title: "Kozijn Montage", desc: "Precisie plaatsing", img: "/images/ramen-deuren/kozijn-montage.jpg" },
                { title: "Veiligheidsglas", desc: "Extra beveiliging", img: "/images/ramen-deuren/veiligheidsglas.jpg" },
                { title: "Houten Kozijn", desc: "Klassieke uitstraling", img: "/images/ramen-deuren/houten-kozijn.jpg" },
                { title: "Schuifdeur", desc: "Ruimtebesparend", img: "/images/ramen-deuren/schuifdeur.jpg" },
                { title: "Binnendeuren", desc: "Stijlvolle afwerking", img: "/images/ramen-deuren/binnendeuren.jpg" },
                { title: "Garantie Certificaat", desc: "Kwaliteitsborging", img: "/images/ramen-deuren/garantie-certificaat.jpg" }
              ].map((item, i) => (
                <div key={i} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow group cursor-pointer">
                  <div className="aspect-square bg-gradient-to-br from-yannova-primary/10 to-yannova-primary/5 flex items-center justify-center relative overflow-hidden">
                    <Image
                      src={item.img}
                      alt={item.title}
                      width={300}
                      height={200}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-yannova-primary/10 to-yannova-primary/5 flex items-center justify-center">
                      <span className="text-yannova-primary text-xs font-semibold text-center px-2">{item.title}</span>
                    </div>
                  </div>
                  <div className="p-3">
                    <p className="text-xs text-gray-600 text-center">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Video Sectie */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
              Project Video's
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl overflow-hidden shadow-lg group cursor-pointer">
                <div className="aspect-video bg-gradient-to-br from-yannova-primary/20 to-yannova-primary/5 flex items-center justify-center relative overflow-hidden">
                  <video 
                    className="w-full h-full object-cover"
                    poster="/images/ramen-deuren/ramen-video-thumbnail.jpg"
                    controls
                    preload="metadata"
                  >
                    <source src="/videos/ramen-deuren/ramen-plaatsing-proces.mp4" type="video/mp4" />
                    <source src="/videos/ramen-deuren/ramen-plaatsing-proces.webm" type="video/webm" />
                    Uw browser ondersteunt geen video elementen.
                  </video>
                  <div className="absolute inset-0 bg-gradient-to-br from-yannova-primary/20 to-yannova-primary/5 flex items-center justify-center group-hover:opacity-0 transition-opacity duration-300">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-yannova-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-yannova-primary text-2xl">▶</span>
                      </div>
                      <span className="text-yannova-primary font-semibold">Ramen Plaatsing Proces</span>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h4 className="font-semibold text-gray-900 mb-2">Complete Ramen Renovatie</h4>
                  <p className="text-sm text-gray-600 mb-4">
                    Bekijk hoe wij stap voor stap oude ramen vervangen door moderne HR++ kunststof kozijnen. 
                    Van demontage tot afwerking - het complete proces in beeld.
                  </p>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <span>⏱️ 3:45 min</span>
                    <span>📅 2024</span>
                    <span>📍 Keerbergen</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl overflow-hidden shadow-lg group cursor-pointer">
                <div className="aspect-video bg-gradient-to-br from-yannova-primary/20 to-yannova-primary/5 flex items-center justify-center relative overflow-hidden">
                  <video 
                    className="w-full h-full object-cover"
                    poster="/images/ramen-deuren/deuren-video-thumbnail.jpg"
                    controls
                    preload="metadata"
                  >
                    <source src="/videos/ramen-deuren/deuren-installatie.mp4" type="video/mp4" />
                    <source src="/videos/ramen-deuren/deuren-installatie.webm" type="video/webm" />
                    Uw browser ondersteunt geen video elementen.
                  </video>
                  <div className="absolute inset-0 bg-gradient-to-br from-yannova-primary/20 to-yannova-primary/5 flex items-center justify-center group-hover:opacity-0 transition-opacity duration-300">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-yannova-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-yannova-primary text-2xl">▶</span>
                      </div>
                      <span className="text-yannova-primary font-semibold">Deuren Installatie</span>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h4 className="font-semibold text-gray-900 mb-2">Nieuwe Voordeur Plaatsing</h4>
                  <p className="text-sm text-gray-600 mb-4">
                    Van oude houten deur naar moderne veiligheidsdeur met glas. 
                    Zie hoe wij zorgvuldig te werk gaan voor een perfecte pasvorm.
                  </p>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <span>⏱️ 2:30 min</span>
                    <span>📅 2024</span>
                    <span>📍 Mechelen</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Extra Project Galerij */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
              Meer Project Foto's
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {[
                { img: "/images/gallery/ramen-deuren-gallery-1.jpg", title: "Kunststof Ramen" },
                { img: "/images/gallery/ramen-deuren-gallery-2.jpg", title: "Houten Kozijnen" },
                { img: "/images/gallery/ramen-deuren-gallery-3.jpg", title: "Veiligheidsdeuren" },
                { img: "/images/projects/project-8-windows.jpg", title: "Moderne Ramen" },
                { img: "/images/projects/project-1-villa.jpg", title: "Villa Ramen" },
                { img: "/images/projects/project-2-monument.jpg", title: "Monument Ramen" },
                { img: "/images/projects/project-3-office.jpg", title: "Kantoor Ramen" },
                { img: "/images/projects/project-4-bathroom.jpg", title: "Badkamer Ramen" },
                { img: "/images/projects/project-5-extension.jpg", title: "Uitbouw Ramen" },
                { img: "/images/projects/project-6-apartments.jpg", title: "Appartement Ramen" },
                { img: "/images/projects/project-7-crepi.jpg", title: "Crepi Ramen" },
                { img: "/images/projects/project-9-commercial.jpg", title: "Commerciële Ramen" }
              ].map((item, i) => (
                <div key={i} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow group cursor-pointer">
                  <div className="aspect-square bg-gradient-to-br from-yannova-primary/10 to-yannova-primary/5 flex items-center justify-center relative overflow-hidden">
                    <Image
                      src={item.img}
                      alt={item.title}
                      width={300}
                      height={200}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-yannova-primary/10 to-yannova-primary/5 flex items-center justify-center">
                      <span className="text-yannova-primary text-xs font-semibold text-center px-2">{item.title}</span>
                    </div>
                  </div>
                  <div className="p-2">
                    <p className="text-xs text-gray-600 text-center">{item.title}</p>
                  </div>
              </div>
            ))}
            </div>
          </div>

          {/* Project Locaties */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
              Projecten in de Regio
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-md">
                <h4 className="font-semibold text-gray-900 mb-3">Keerbergen</h4>
                <div className="space-y-2">
                  <div className="text-sm text-gray-600">• 15+ ramen projecten</div>
                  <div className="text-sm text-gray-600">• Moderne kunststof kozijnen</div>
                  <div className="text-sm text-gray-600">• HR++ glas installaties</div>
                </div>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-md">
                <h4 className="font-semibold text-gray-900 mb-3">Mechelen</h4>
                <div className="space-y-2">
                  <div className="text-sm text-gray-600">• Monumentale panden</div>
                  <div className="text-sm text-gray-600">• Houten kozijn renovatie</div>
                  <div className="text-sm text-gray-600">• Veiligheidsdeuren</div>
                </div>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-md">
                <h4 className="font-semibold text-gray-900 mb-3">Leuven</h4>
                <div className="space-y-2">
                  <div className="text-sm text-gray-600">• Aluminium ramen</div>
                  <div className="text-sm text-gray-600">• Schuifdeuren</div>
                  <div className="text-sm text-gray-600">• Binnendeuren sets</div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center">
            <Link
              href="/projecten"
              className="inline-block bg-yannova-primary text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-yannova-primary/90 transition-colors mr-4"
            >
              Bekijk Alle Projectfoto's
            </Link>
            <Link
              href="/contact"
              className="inline-block bg-white text-yannova-primary border-2 border-yannova-primary px-8 py-4 rounded-lg font-semibold text-lg hover:bg-yannova-primary hover:text-white transition-colors"
            >
              Vraag Uw Project Aan
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-yannova-primary">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Klaar voor Nieuwe Ramen of Deuren?
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
