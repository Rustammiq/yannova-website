"use client";

import Navigation from "@/components/ui/Navigation";
import Footer from "@/components/ui/Footer";
// import Chatbot from "@/components/chatbot/Chatbot";
import { Hammer, CheckCircle, Camera, Clock, Shield } from "lucide-react";
import Link from "next/link";
import NextImage from "next/image";
import { photoManager } from "@/lib/photoManager";

export default function RenovatiewerkenPage() {
  // Functie om unieke afbeeldingen toe te wijzen aan elke stap
  const getStapImage = (stapNumber: string) => {
    const imageMap: { [key: string]: string } = {
      "1": '/images/projects/project-2-monument.jpg',   // Voorbereiding & Inspectie
      "2": '/images/projects/project-5-extension.jpg',  // Demontage & Voorbereiding
      "3": '/images/projects/project-7-crepi.jpg',      // Renovatie & Crepi
      "4": '/images/projects/project-8-windows.jpg'     // Afwerking & Oplevering
    };
    return imageMap[stapNumber] || '/images/projects/project-2-monument.jpg';
  };

  const renovationServices = [
    {
      title: "Complete Gevelrenovatie",
      description: "Volledige gevelrenovatie met crepi, isolatie en nieuwe ramen",
      features: ["Crepi aanbrengen", "Gevelisolatie", "Ramen vervangen", "Afdichting"],
      price: "Vanaf €85/m²",
    },
    {
      title: "Interieur Renovatie",
      description: "Complete interieurrenovatie van keuken tot badkamer",
      features: ["Keuken renovatie", "Badkamer renovatie", "Vloeren", "Wanden"],
      price: "Vanaf €150/m²",
    },
    {
      title: "Dakrenovatie",
      description: "Complete dakrenovatie met nieuwe dakbedekking en isolatie",
      features: ["Dakbedekking", "Dakisolatie", "Goten", "Dakramen"],
      price: "Vanaf €65/m²",
    },
  ];

  const renovationSteps = [
    {
      step: "1",
      title: "Inspectie & Planning",
      description: "Gedetailleerde inspectie van het pand en opstellen van renovatieplan",
      details: ["Schade inventariseren", "Metingen verrichten", "Planning maken", "Offerte opstellen"],
    },
    {
      step: "2",
      title: "Voorbereiding",
      description: "Voorbereiding van de werkzaamheden en bescherming van omgeving",
      details: ["Werkplaats inrichten", "Bescherming aanbrengen", "Materialen bestellen", "Team samenstellen"],
    },
    {
      step: "3",
      title: "Uitvoering",
      description: "Professionele uitvoering van alle renovatiewerkzaamheden",
      details: ["Demontage oude materialen", "Nieuwe materialen plaatsen", "Afdichting en afwerking", "Kwaliteitscontrole"],
    },
    {
      step: "4",
      title: "Documentatie & Oplevering",
      description: "Documentatie van het project en oplevering aan de klant",
      details: ["Projectfoto's maken", "Garantiecertificaten", "Onderhoudsadvies", "Finale inspectie"],
    },
  ];

  const photoServices = [
    {
      title: "Voor en Na Foto's",
      description: "Professionele foto's van de transformatie van uw pand",
      features: ["Hoge resolutie", "Verschillende hoeken", "Detailfoto's", "Professionele belichting"],
    },
    {
      title: "Tussentijdse Foto's",
      description: "Documentatie van de voortgang tijdens de renovatie",
      features: ["Dagelijkse updates", "Detailfoto's", "Probleem documentatie", "Voortgangsrapportage"],
    },
    {
      title: "Technische Documentatie",
      description: "Complete technische documentatie van alle werkzaamheden",
      features: ["Materialenlijst", "Garantiecertificaten", "Technische tekeningen", "Onderhoudsvoorschriften"],
    },
  ];

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-yannova-dark to-yannova-gray text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Renovatiewerken
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl">
            Complete renovatiewerken met professionele documentatie. Van crepi en gevelrenovatie 
            tot ramen en deuren - wij verzorgen het complete proces met foto's en technische specificaties.
          </p>
        </div>
      </section>

      {/* Introductie */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Complete Renovatiewerken
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Wij verzorgen complete renovatiewerken van begin tot eind. Van de eerste inspectie 
                tot de finale oplevering met professionele documentatie en foto's. Onze ervaren 
                vakmensen zorgen voor een perfecte uitvoering van uw renovatieproject.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                Elke renovatie wordt volledig gedocumenteerd met professionele foto's, technische 
                specificaties en garantiecertificaten. Van voor- en na foto's tot detailopnames 
                van de afwerking - u krijgt een complete documentatie van uw project.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="bg-yannova-primary/10 text-yannova-primary px-4 py-2 rounded-full text-sm font-semibold">
                  Complete Uitvoering
                </div>
                <div className="bg-yannova-primary/10 text-yannova-primary px-4 py-2 rounded-full text-sm font-semibold">
                  Professionele Foto's
                </div>
                <div className="bg-yannova-primary/10 text-yannova-primary px-4 py-2 rounded-full text-sm font-semibold">
                  Technische Documentatie
                </div>
                <div className="bg-yannova-primary/10 text-yannova-primary px-4 py-2 rounded-full text-sm font-semibold">
                  Garantie
                </div>
              </div>
            </div>
            <div className="bg-yannova-primary/10 rounded-xl p-8">
              <div className="aspect-video rounded-lg overflow-hidden">
                <NextImage
                  src={photoManager.getCategoryPhoto('renovatie').src}
                  alt="Renovatiewerken project - Woningrenovatie in uitvoering"
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

      {/* Renovatiediensten */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Onze Renovatiediensten
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Van gevelrenovatie tot interieur - wij verzorgen alle renovatiewerkzaamheden
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {renovationServices.map((service, index) => (
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

      {/* Werkwijze */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Onze Renovatie Werkwijze
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Van eerste inspectie tot finale oplevering - zo werken wij aan uw renovatieproject
            </p>
          </div>

          <div className="space-y-12">
            {renovationSteps.map((step, index) => (
              <div key={index} className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                  <div className="bg-yannova-primary text-white w-12 h-12 rounded-full flex items-center justify-center mb-6 text-xl font-bold">
                    {step.step}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {step.title}
                  </h3>
                  <p className="text-lg text-gray-600 mb-6">
                    {step.description}
                  </p>
                  <ul className="space-y-2">
                    {step.details.map((detail, i) => (
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
                      src={getStapImage(step.step)}
                      alt={`Stap ${step.step} - ${step.title}`}
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

      {/* Foto's en Documentatie */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Projectfoto's en Documentatie
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Elke renovatie wordt volledig gedocumenteerd met professionele foto's en technische specificaties
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {photoServices.map((service, index) => (
              <div key={index} className="bg-white rounded-xl p-8 shadow-md">
                <div className="bg-yannova-primary/10 w-16 h-16 rounded-lg flex items-center justify-center mb-6">
                  <Camera className="text-yannova-primary" size={32} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {service.title}
                </h3>
                <p className="text-gray-600 mb-6">
                  {service.description}
                </p>
                <ul className="space-y-2">
                  {service.features.map((feature, i) => (
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

      {/* Projectfoto Galerij */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Projectfoto Galerij
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Bekijk onze meest recente projecten met crepi, ramen en deuren renovaties
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group cursor-pointer">
              <div className="aspect-video rounded-xl overflow-hidden mb-4">
                <NextImage
                  src="/images/gallery/renovatiewerken-gallery-1.jpg"
                  alt="Crepi Gevelrenovatie Project"
                  width={600}
                  height={400}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Crepi Gevelrenovatie</h3>
              <p className="text-gray-600">Complete gevelrenovatie met moderne crepi afwerking</p>
            </div>

            <div className="group cursor-pointer">
              <div className="aspect-video rounded-xl overflow-hidden mb-4">
                <NextImage
                  src="/images/gallery/renovatiewerken-gallery-2.jpg"
                  alt="Ramen & Deuren Vervanging Project"
                  width={600}
                  height={400}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Ramen & Deuren</h3>
              <p className="text-gray-600">Vervanging van ramen en deuren voor betere isolatie</p>
            </div>

            <div className="group cursor-pointer">
              <div className="aspect-video rounded-xl overflow-hidden mb-4">
                <NextImage
                  src="/images/gallery/renovatiewerken-gallery-3.jpg"
                  alt="Badkamer Renovatie Project"
                  width={600}
                  height={400}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Badkamer Renovatie</h3>
              <p className="text-gray-600">Complete badkamer renovatie met moderne afwerking</p>
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
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Waarom Kiezen voor Yannova Renovatiewerken?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Ervaring, vakmanschap en complete projectafronding met documentatie
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
                Met renovatiewerken, crepi en ramen & deuren projecten
              </p>
            </div>
            <div className="text-center">
              <div className="bg-yannova-primary/10 w-16 h-16 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Camera className="text-yannova-primary" size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Professionele Foto's
              </h3>
              <p className="text-gray-600 text-sm">
                Elke renovatie wordt volledig gedocumenteerd met foto's
              </p>
            </div>
            <div className="text-center">
              <div className="bg-yannova-primary/10 w-16 h-16 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Shield className="text-yannova-primary" size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Garantie
              </h3>
              <p className="text-gray-600 text-sm">
                Uitgebreide garantie op alle werkzaamheden en materialen
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
                Van begin tot eind - wij verzorgen het complete project
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
              Renovatiewerken Projectfoto's
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Bekijk onze recente renovatieprojecten en de transformatie van verschillende panden
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="aspect-square bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg flex items-center justify-center">
                <span className="text-gray-500 text-sm">Renovatie {i}</span>
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
            Klaar voor uw Renovatieproject?
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
      {/* <Chatbot /> */}
    </div>
  );
}
