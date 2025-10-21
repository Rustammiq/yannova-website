"use client";

import Navigation from "@/components/ui/Navigation";
import Footer from "@/components/ui/Footer";
import Chatbot from "@/components/chatbot/Chatbot";
import { PaintBucket, CheckCircle, Clock, Shield } from "lucide-react";
import Link from "next/link";
import NextImage from "next/image";
import { photoManager } from "@/lib/photoManager";

export default function CrepiPage() {
  const crepiServices = [
    {
      title: "Nieuwe Crepi Aanbrengen",
      description: "Complete gevelrenovatie met moderne crepi afwerking voor een frisse uitstraling",
      features: ["Ondergrond voorbereiden", "Primer aanbrengen", "Crepi aanbrengen", "Afdichting"],
      price: "Vanaf €45/m²",
    },
    {
      title: "Crepi Herstellen",
      description: "Reparatie en herstel van bestaande crepi voor optimale bescherming",
      features: ["Schade inventariseren", "Oude crepi verwijderen", "Nieuwe crepi aanbrengen", "Kleurmatchen"],
      price: "Vanaf €35/m²",
    },
    {
      title: "Crepi Kleurrenovatie",
      description: "Nieuwe kleur voor uw gevel met behoud van de bestaande crepi structuur",
      features: ["Kleurkeuze advies", "Ondergrond reinigen", "Nieuwe kleur aanbrengen", "Afdichting"],
      price: "Vanaf €25/m²",
    },
  ];

  const crepiTypes = [
    {
      name: "Mineraal Crepi",
      description: "Duurzaam en ademend crepi op basis van cement en kalk",
      benefits: ["Ademend", "Duurzaam", "Natuurlijke uitstraling", "Weerbestendig"],
    },
    {
      name: "Synthetisch Crepi",
      description: "Flexibel en kleurvast crepi met uitstekende hechting",
      benefits: ["Kleurvast", "Flexibel", "Goede hechting", "Makkelijk te onderhouden"],
    },
    {
      name: "Silicaat Crepi",
      description: "Hoge kwaliteit crepi met uitstekende weersbestendigheid",
      benefits: ["Weersbestendig", "Kleurvast", "Duurzaam", "Professioneel resultaat"],
    },
  ];

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-yannova-dark to-yannova-gray text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Crepi Gevelafwerking
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl">
            Professionele crepi aanbreng en renovatie voor een moderne, duurzame gevelafwerking. 
            Van kleurkeuze tot afwerking - wij verzorgen het complete proces.
          </p>
        </div>
      </section>

      {/* Wat is Crepi */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Wat is Crepi?
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Crepi is een decoratieve pleisterlaag die wordt aangebracht op gevels voor een textuurrijke, 
                beschermende en isolerende afwerking. Het is verkrijgbaar in verschillende kleuren en structuren, 
                en biedt uitstekende bescherming tegen weersinvloeden.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                Onze ervaren vakmensen verzorgen het complete crepi proces, van voorbereiding van de ondergrond 
                tot de finale afwerking. Wij werken met hoogwaardige materialen en moderne technieken voor 
                een duurzaam en esthetisch resultaat.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="bg-yannova-primary/10 text-yannova-primary px-4 py-2 rounded-full text-sm font-semibold">
                  Duurzaam
                </div>
                <div className="bg-yannova-primary/10 text-yannova-primary px-4 py-2 rounded-full text-sm font-semibold">
                  Weersbestendig
                </div>
                <div className="bg-yannova-primary/10 text-yannova-primary px-4 py-2 rounded-full text-sm font-semibold">
                  Kleurvast
                </div>
                <div className="bg-yannova-primary/10 text-yannova-primary px-4 py-2 rounded-full text-sm font-semibold">
                  Ademend
                </div>
              </div>
            </div>
            <div className="bg-yannova-primary/10 rounded-xl p-8">
              <div className="aspect-video rounded-lg overflow-hidden">
                <NextImage
                  src={photoManager.getCategoryPhoto('crepi').src}
                  alt="Crepi project - Gevelafwerking met crepi"
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

      {/* Crepi Diensten */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Onze Crepi Diensten
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Van nieuwe crepi aanbreng tot herstel en renovatie - wij verzorgen alle crepi werkzaamheden
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {crepiServices.map((service, index) => (
              <div key={index} className="bg-white rounded-xl p-8 shadow-md hover:shadow-xl transition-shadow">
                <div className="bg-yannova-primary/10 w-16 h-16 rounded-lg flex items-center justify-center mb-6">
                  <PaintBucket className="text-yannova-primary" size={32} />
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

      {/* Crepi Types */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Soorten Crepi
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Wij werken met verschillende soorten crepi, elk met hun eigen voordelen en toepassingen
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {crepiTypes.map((type, index) => (
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

      {/* Werkwijze */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Onze Crepi Werkwijze
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Van eerste inspectie tot finale oplevering - zo werken wij aan uw crepi project
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-yannova-primary text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                1
              </div>
              <h3 className="font-bold text-gray-900 mb-2">
                Inspectie & Advies
              </h3>
              <p className="text-gray-600 text-sm">
                Vrijblijvende inspectie van uw gevel en advies over de beste crepi oplossing
              </p>
            </div>
            <div className="text-center">
              <div className="bg-yannova-primary text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                2
              </div>
              <h3 className="font-bold text-gray-900 mb-2">
                Voorbereiding
              </h3>
              <p className="text-gray-600 text-sm">
                Ondergrond reinigen, repareren en voorbehandelen voor optimale hechting
              </p>
            </div>
            <div className="text-center">
              <div className="bg-yannova-primary text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                3
              </div>
              <h3 className="font-bold text-gray-900 mb-2">
                Crepi Aanbrengen
              </h3>
              <p className="text-gray-600 text-sm">
                Professionele aanbreng van crepi met aandacht voor detail en kwaliteit
              </p>
            </div>
            <div className="text-center">
              <div className="bg-yannova-primary text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                4
              </div>
              <h3 className="font-bold text-gray-900 mb-2">
                Afwerking & Oplevering
              </h3>
              <p className="text-gray-600 text-sm">
                Finale afwerking, reiniging en oplevering met garantie en onderhoudsadvies
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Voordelen */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Voordelen van Crepi
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Waarom kiezen voor crepi gevelafwerking?
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-yannova-primary/10 w-16 h-16 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Shield className="text-yannova-primary" size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Bescherming
              </h3>
              <p className="text-gray-600 text-sm">
                Uitstekende bescherming tegen weersinvloeden en UV-straling
              </p>
            </div>
            <div className="text-center">
              <div className="bg-yannova-primary/10 w-16 h-16 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Clock className="text-yannova-primary" size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Duurzaam
              </h3>
              <p className="text-gray-600 text-sm">
                Lange levensduur met minimale onderhoudsbehoefte
              </p>
            </div>
            <div className="text-center">
              <div className="bg-yannova-primary/10 w-16 h-16 rounded-lg flex items-center justify-center mx-auto mb-4">
                <PaintBucket className="text-yannova-primary" size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Esthetisch
              </h3>
              <p className="text-gray-600 text-sm">
                Moderne uitstraling met veelzijdige kleur- en structuurkeuze
              </p>
            </div>
            <div className="text-center">
              <div className="bg-yannova-primary/10 w-16 h-16 rounded-lg flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="text-yannova-primary" size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Waardevermeerdering
              </h3>
              <p className="text-gray-600 text-sm">
                Verhoogt de waarde en uitstraling van uw pand
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Projectfoto's */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Crepi Projectfoto's
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Bekijk onze recente crepi projecten en de transformatie van verschillende gevels
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group cursor-pointer">
              <div className="aspect-video rounded-xl overflow-hidden mb-4">
                <NextImage
                  src="/images/gallery/crepi-gallery-1.jpg"
                  alt="Crepi Gevelafwerking Project"
                  width={600}
                  height={400}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Crepi Gevelafwerking</h3>
              <p className="text-gray-600">Moderne crepi gevelafwerking met duurzame materialen</p>
            </div>

            <div className="group cursor-pointer">
              <div className="aspect-video rounded-xl overflow-hidden mb-4">
                <NextImage
                  src="/images/gallery/crepi-gallery-2.jpg"
                  alt="Crepi Renovatie Project"
                  width={600}
                  height={400}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Crepi Renovatie</h3>
              <p className="text-gray-600">Complete gevelrenovatie met nieuwe crepi afwerking</p>
            </div>

            <div className="group cursor-pointer">
              <div className="aspect-video rounded-xl overflow-hidden mb-4">
                <NextImage
                  src="/images/gallery/crepi-gallery-3.jpg"
                  alt="Crepi Kleurkeuze Project"
                  width={600}
                  height={400}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Crepi Kleurkeuze</h3>
              <p className="text-gray-600">Professionele kleuradvies en crepi aanbreng</p>
            </div>
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
            Klaar voor uw Crepi Project?
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
