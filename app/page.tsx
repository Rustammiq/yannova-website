"use client";

import Navigation from "@/components/ui/Navigation";
import Footer from "@/components/ui/Footer";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, MapPin, Calendar, Quote, Star } from "lucide-react";
import { photoManager } from "@/lib/photoManager";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Skip link for accessibility */}
      <a href="#main-content" className="skip-link">
        Ga naar hoofdinhoud
      </a>
      <Navigation />
      
      {/* Hero Section */}
      <section id="main-content" className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Enhanced Background Image Overlay */}
        <div className="absolute inset-0 bg-gradient-hero z-10"></div>

        {/* Hero image met optimalisatie */}
        <div className="absolute inset-0">
          <Image
            src="/images/hero-construction.jpg"
            alt="Yannova Bouw - Professionele bouwprojecten in Keerbergen, Mechelen, Leuven. Van nieuwbouw tot renovatie met crepi gevelafwerking."
            className="w-full h-full object-cover scale-105 animate-fade-in"
            priority
            fill
            sizes="100vw"
          />
          {/* Enhanced Fallback gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-yannova-dark via-yannova-gray to-yannova-dark"></div>
        </div>

        {/* Floating Elements for Visual Interest */}
        <div className="absolute inset-0 z-15 pointer-events-none">
          <div className="absolute top-20 left-10 w-20 h-20 bg-yannova-primary/20 rounded-full blur-xl animate-bounce-subtle"></div>
          <div className="absolute bottom-32 right-16 w-32 h-32 bg-yannova-primary/10 rounded-full blur-2xl animate-bounce-subtle animate-delay-1s"></div>
          <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white/10 rounded-full blur-lg animate-bounce-subtle animate-delay-2s"></div>
        </div>

        {/* Enhanced Content */}
        <div className="relative z-20 max-w-5xl mx-auto px-4 text-center text-white">
          {/* Logo */}
          <div className="mb-8 animate-fade-in group cursor-pointer">
            <div className="relative inline-block transform transition-all duration-500 hover:scale-110 hover:rotate-1 group-hover:drop-shadow-2xl">
              <Image
                src="/images/logo-yannova.png"
                alt="Yannova Bouw Logo"
                width={600}
                height={300}
                className="h-64 w-auto mx-auto filter brightness-0 invert transition-all duration-500 group-hover:brightness-100 group-hover:invert-0 group-hover:drop-shadow-[0_0_30px_rgba(255,255,255,0.8)]"
                priority
              />
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-yannova-primary/20 via-white/10 to-yannova-primary/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 scale-150"></div>
              {/* Floating particles effect */}
              <div className="absolute -top-2 -left-2 w-2 h-2 bg-yannova-primary rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-bounce animate-delay-1s"></div>
              <div className="absolute -top-1 -right-3 w-1.5 h-1.5 bg-white rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-bounce animate-delay-2s"></div>
              <div className="absolute -bottom-2 -right-1 w-1 h-1 bg-yannova-primary rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-bounce animate-delay-3s"></div>
            </div>
          </div>

          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium mb-8 animate-fade-in border border-white/20" role="banner">
            <span className="w-2 h-2 bg-yannova-primary rounded-full mr-2 animate-pulse" aria-hidden="true"></span>
            15+ Jaar Ervaring in Bouw
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 animate-fade-in-up leading-tight">
            Van <span className="gradient-text">Begin</span> tot <span className="gradient-text">Eind</span>
            <br />
            <span className="text-4xl md:text-5xl lg:text-6xl font-semibold text-gray-200">Project Afronding</span>
          </h1>

          <p className="text-xl md:text-2xl lg:text-3xl mb-10 text-gray-200 max-w-4xl mx-auto leading-relaxed animate-fade-in-up animate-delay-200ms">
            Van nieuwbouw tot renovatie, crepi gevelafwerking tot ramen en deuren -
            wij verzorgen complete bouwprojecten met vakmanschap en passie in Keerbergen, Mechelen, Leuven en omgeving.
          </p>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8 mb-12 animate-fade-in-up animate-delay-400ms" role="region" aria-label="Bedrijfsstatistieken">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-yannova-primary" aria-label="100 plus projecten">100+</div>
              <div className="text-sm md:text-base text-gray-300">Projecten</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-yannova-primary" aria-label="98 procent tevredenheid">98%</div>
              <div className="text-sm md:text-base text-gray-300">Tevredenheid</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-yannova-primary" aria-label="24/7 bereikbaar">24/7</div>
              <div className="text-sm md:text-base text-gray-300">Bereikbaar</div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up mt-40 animate-delay-600ms">
            <Link
              href="/projecten"
              className="group bg-gradient-primary hover:shadow-yannova-hover text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover-lift flex items-center justify-center gap-2 border border-yannova-primary/20 focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
              aria-label="Bekijk onze projecten en portfolio"
            >
              Bekijk Projecten
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform duration-200" aria-hidden="true" />
            </Link>
            <Link
              href="/contact"
              className="group bg-white/10 backdrop-blur-md hover:bg-white/20 text-white border-2 border-white/60 hover:border-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover-lift focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
              aria-label="Neem contact op voor een offerte"
            >
              Neem Contact Op
            </Link>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce-subtle" aria-hidden="true">
            <div className="w-6 h-10 border-2 border-white/60 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-pulse"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white" aria-labelledby="services-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 id="services-heading" className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Onze <span className="gradient-text">Diensten</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Van nieuwbouw tot renovatie, wij leveren kwaliteit en vakmanschap in de regio
              Keerbergen, Mechelen, Putte, Bonheiden, Rijmenam en Leuven
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Nieuwbouw */}
            <article className="group bg-white rounded-2xl p-8 shadow-soft hover:shadow-yannova transition-all duration-300 hover-lift animate-fade-in-up border border-gray-100">
              <div className="bg-stone-100 w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300" aria-hidden="true">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#8B4513" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"/>
                  <path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"/>
                  <path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2"/>
                  <path d="M10 6h4"/>
                  <path d="M10 10h4"/>
                  <path d="M10 14h4"/>
                  <path d="M10 18h4"/>
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-yannova-primary transition-colors duration-300">
                Nieuwbouw
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Complete nieuwbouwprojecten van fundament tot dak, uitgevoerd volgens de laatste normen en met oog voor detail.
              </p>
              <Link
                href="/diensten/nieuwbouw"
                className="inline-flex items-center gap-2 text-yannova-primary font-semibold hover:text-yannova-primaryDark transition-colors duration-200 group focus-visible:outline-2 focus-visible:outline-yannova-primary focus-visible:outline-offset-2"
                aria-label="Meer informatie over nieuwbouw diensten"
              >
                Meer informatie
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-200" aria-hidden="true" />
              </Link>
            </article>

            {/* Verbouwing */}
            <article className="group bg-white rounded-2xl p-8 shadow-soft hover:shadow-yannova transition-all duration-300 hover-lift animate-fade-in-up animate-delay-100ms">
              <div className="bg-stone-100 w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300" aria-hidden="true">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#8B4513" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m15 12-8.373 8.373a1 1 0 1 1-3-3L12 9"/>
                  <path d="m18 15 4-4"/>
                  <path d="m21.5 11.5-1.914-1.914A2 2 0 0 1 19 8.172V7l-2.26-2.26a6 6 0 0 0-4.202-1.756L9 2.96l.92.80A6.18 6.18 0 0 1 12 8.4V10l2 2h1.172a2 2 0 0 1 1.414.586L18.5 14.5"/>
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-yannova-primary transition-colors duration-300">
                Verbouwing
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Geef uw woning een nieuwe uitstraling met onze professionele verbouwingsdiensten, van kleine aanpassingen tot complete renovaties.
              </p>
              <Link
                href="/diensten/verbouwing"
                className="inline-flex items-center gap-2 text-yannova-primary font-semibold hover:text-yannova-primaryDark transition-colors duration-200 group focus-visible:outline-2 focus-visible:outline-yannova-primary focus-visible:outline-offset-2"
                aria-label="Meer informatie over verbouwingsdiensten"
              >
                Meer informatie
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-200" aria-hidden="true" />
              </Link>
            </article>

            {/* Renovatie */}
            <article className="group bg-white rounded-2xl p-8 shadow-soft hover:shadow-yannova transition-all duration-300 hover-lift animate-fade-in-up animate-delay-200ms">
              <div className="bg-stone-100 w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300" aria-hidden="true">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#8B4513" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"/>
                  <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-yannova-primary transition-colors duration-300">
                Renovatie & Crepi
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Complete renovatiewerken inclusief crepi gevelafwerking, ramen en deuren vervanging. Van voorbereiding tot professionele documentatie met foto's.
              </p>
              <Link
                href="/diensten/renovatiewerken"
                className="inline-flex items-center gap-2 text-yannova-primary font-semibold hover:text-yannova-primaryDark transition-colors duration-200 group focus-visible:outline-2 focus-visible:outline-yannova-primary focus-visible:outline-offset-2"
                aria-label="Meer informatie over renovatie en crepi diensten"
              >
                Meer informatie
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-200" aria-hidden="true" />
              </Link>
            </article>
          </div>
        </div>
      </section>

      {/* Project Showcase Section */}
      <section className="py-20 bg-white" aria-labelledby="projects-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 id="projects-heading" className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Onze <span className="gradient-text">Projecten</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Bekijk een selectie van onze succesvol afgeronde projecten. Van nieuwbouw tot renovatie - 
              elk project wordt uitgevoerd met vakmanschap en aandacht voor detail.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {/* Moderne Villa */}
            <article className="group bg-white rounded-2xl overflow-hidden shadow-soft hover:shadow-yannova transition-all duration-300 hover-lift animate-fade-in-up border border-gray-100">
              <div className="aspect-video relative overflow-hidden">
                <Image
                  src={photoManager.getProjectPhoto(1).src}
                  alt={photoManager.getProjectPhoto(1).alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute top-4 left-4">
                  <span className="bg-yannova-primary/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-semibold">
                    Nieuwbouw
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-yannova-primary transition-colors duration-300">
                  Moderne Villa
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  Complete nieuwbouw van een luxe villa met duurzame materialen en moderne architectuur. 
                  Het project omvatte alle fases van fundament tot afwerking.
                </p>
                <div className="flex items-center gap-4 text-sm text-gray-500 pt-4 border-t border-gray-100 group-hover:border-yannova-primary/20 transition-colors duration-300">
                  <div className="flex items-center gap-1 group-hover:text-yannova-primary transition-colors duration-300">
                    <MapPin size={16} className="group-hover:scale-110 transition-transform duration-300" />
                    <span>Amsterdam</span>
                  </div>
                  <div className="flex items-center gap-1 group-hover:text-yannova-primary transition-colors duration-300">
                    <Calendar size={16} className="group-hover:scale-110 transition-transform duration-300" />
                    <span>2024</span>
                  </div>
                </div>
              </div>
            </article>

            {/* Appartementen Complex */}
            <article className="group bg-white rounded-2xl overflow-hidden shadow-soft hover:shadow-yannova transition-all duration-300 hover-lift animate-fade-in-up animate-delay-100ms">
              <div className="aspect-video relative overflow-hidden">
                <Image
                  src={photoManager.getProjectPhoto(6).src}
                  alt={photoManager.getProjectPhoto(6).alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute top-4 left-4">
                  <span className="bg-yannova-primary/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-semibold">
                    Nieuwbouw
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-yannova-primary transition-colors duration-300">
                  Appartementen Complex
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  Nieuwbouw van 12 energieneutrale appartementen met gedeelde groene ruimte en moderne voorzieningen.
                </p>
                <div className="flex items-center gap-4 text-sm text-gray-500 pt-4 border-t border-gray-100 group-hover:border-yannova-primary/20 transition-colors duration-300">
                  <div className="flex items-center gap-1 group-hover:text-yannova-primary transition-colors duration-300">
                    <MapPin size={16} className="group-hover:scale-110 transition-transform duration-300" />
                    <span>Eindhoven</span>
                  </div>
                  <div className="flex items-center gap-1 group-hover:text-yannova-primary transition-colors duration-300">
                    <Calendar size={16} className="group-hover:scale-110 transition-transform duration-300" />
                    <span>2023</span>
                  </div>
                </div>
              </div>
            </article>

            {/* Kantoor Gebouw */}
            <article className="group bg-white rounded-2xl overflow-hidden shadow-soft hover:shadow-yannova transition-all duration-300 hover-lift animate-fade-in-up animate-delay-200ms">
              <div className="aspect-video relative overflow-hidden">
                <Image
                  src={photoManager.getProjectPhoto(3).src}
                  alt={photoManager.getProjectPhoto(3).alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute top-4 left-4">
                  <span className="bg-yannova-primary/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-semibold">
                    Verbouwing
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-yannova-primary transition-colors duration-300">
                  Kantoor Gebouw
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  Transformatie van een oud bedrijfspand tot modern kantoorgebouw met open werkruimtes en moderne faciliteiten.
                </p>
                <div className="flex items-center gap-4 text-sm text-gray-500 pt-4 border-t border-gray-100 group-hover:border-yannova-primary/20 transition-colors duration-300">
                  <div className="flex items-center gap-1 group-hover:text-yannova-primary transition-colors duration-300">
                    <MapPin size={16} className="group-hover:scale-110 transition-transform duration-300" />
                    <span>Rotterdam</span>
                  </div>
                  <div className="flex items-center gap-1 group-hover:text-yannova-primary transition-colors duration-300">
                    <Calendar size={16} className="group-hover:scale-110 transition-transform duration-300" />
                    <span>2024</span>
                  </div>
                </div>
              </div>
            </article>
          </div>

          {/* View All Projects Button */}
          <div className="text-center">
            <Link
              href="/projecten"
              className="inline-block bg-yannova-primary text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-yannova-primary/90 transition-all duration-300 hover:scale-105 hover:shadow-xl focus-visible:outline-2 focus-visible:outline-yannova-primary focus-visible:outline-offset-2"
              aria-label="Bekijk alle projecten in ons portfolio"
            >
              Bekijk Alle Projecten
              <ArrowRight size={20} className="inline-block ml-2" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white" aria-labelledby="testimonials-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 id="testimonials-heading" className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Wat Onze <span className="gradient-text">Klanten</span> Zeggen
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Ontdek waarom klanten kiezen voor Yannova Bouw
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {/* Testimonial 1 */}
            <blockquote className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 shadow-soft hover:shadow-medium transition-all duration-300 hover-lift animate-fade-in-up border border-gray-100">
              <div className="flex items-center mb-4">
                <Quote className="text-yannova-primary mr-2" size={24} aria-hidden="true" />
                <div className="flex" role="img" aria-label="5 sterren beoordeling">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="text-yannova-primary fill-current" size={16} aria-hidden="true" />
                  ))}
                </div>
              </div>
              <p className="text-gray-700 mb-6 italic leading-relaxed">
                "Uitstekend werk geleverd bij onze crepi renovatie. Professioneel team,
                nette afwerking en heldere communicatie. Zeer tevreden met het resultaat!"
              </p>
              <footer className="flex items-center">
                <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center text-white font-bold mr-4" aria-hidden="true">
                  M
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Marie Van der Berg</div>
                  <div className="text-sm text-gray-600">Keerbergen</div>
                </div>
              </footer>
            </blockquote>

            {/* Testimonial 2 */}
            <blockquote className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 shadow-soft hover:shadow-medium transition-all duration-300 hover-lift animate-fade-in-up animate-delay-100ms">
              <div className="flex items-center mb-4">
                <Quote className="text-yannova-primary mr-2" size={24} aria-hidden="true" />
                <div className="flex" role="img" aria-label="5 sterren beoordeling">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="text-yannova-primary fill-current" size={16} aria-hidden="true" />
                  ))}
                </div>
              </div>
              <p className="text-gray-700 mb-6 italic leading-relaxed">
                "Van begin tot eind perfect begeleid. De nieuwe ramen en deuren zijn prachtig
                en de isolatie is merkbaar beter. Top vakmanschap!"
              </p>
              <footer className="flex items-center">
                <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center text-white font-bold mr-4" aria-hidden="true">
                  J
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Jan De Vries</div>
                  <div className="text-sm text-gray-600">Mechelen</div>
                </div>
              </footer>
            </blockquote>

            {/* Testimonial 3 */}
            <blockquote className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 shadow-soft hover:shadow-medium transition-all duration-300 hover-lift animate-fade-in-up animate-delay-200ms">
              <div className="flex items-center mb-4">
                <Quote className="text-yannova-primary mr-2" size={24} aria-hidden="true" />
                <div className="flex" role="img" aria-label="5 sterren beoordeling">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="text-yannova-primary fill-current" size={16} aria-hidden="true" />
                  ))}
                </div>
              </div>
              <p className="text-gray-700 mb-6 italic leading-relaxed">
                "Complete renovatie van onze woning, inclusief gevelwerk. Yannova heeft
                alles perfect gecoördineerd. Resultaat overtreft verwachtingen!"
              </p>
              <footer className="flex items-center">
                <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center text-white font-bold mr-4" aria-hidden="true">
                  S
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Sarah Jansen</div>
                  <div className="text-sm text-gray-600">Leuven</div>
                </div>
              </footer>
            </blockquote>
          </div>

          {/* Trust Indicators */}
          <div className="bg-gradient-to-r from-yannova-dark to-yannova-gray rounded-2xl p-8 text-white text-center animate-fade-in-up" role="region" aria-label="Bedrijfsstatistieken en vertrouwensindicatoren">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div>
                <div className="text-3xl md:text-4xl font-bold text-yannova-primary mb-2" aria-label="4.9 op 5 gemiddelde beoordeling">4.9/5</div>
                <div className="text-sm opacity-90">Gemiddelde beoordeling</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold text-yannova-primary mb-2" aria-label="100 plus voltooide projecten">100+</div>
                <div className="text-sm opacity-90">Voltooide projecten</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold text-yannova-primary mb-2" aria-label="15 plus jaar ervaring">15+</div>
                <div className="text-sm opacity-90">Jaar ervaring</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold text-yannova-primary mb-2" aria-label="98 procent klanttevredenheid">98%</div>
                <div className="text-sm opacity-90">Klanttevredenheid</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gespecialiseerde Diensten */}
      <section className="py-20 bg-gray-50" aria-labelledby="specialized-services-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 id="specialized-services-heading" className="text-4xl font-bold text-gray-900 mb-4">
              Gespecialiseerde Renovatiediensten
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Van crepi en gevelrenovatie tot ramen en deuren - wij verzorgen complete renovatiewerken met professionele documentatie
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {/* Crepi Werkzaamheden */}
            <article className="bg-white rounded-xl p-8 shadow-md hover:shadow-xl transition-shadow">
              <div className="bg-stone-100 w-16 h-16 rounded-lg flex items-center justify-center mb-6" aria-hidden="true">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#8B4513" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                  <path d="M2 17l10 5 10-5"/>
                  <path d="M2 12l10 5 10-5"/>
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Crepi Gevelafwerking
              </h3>
              <p className="text-gray-600 mb-6">
                Professionele crepi aanbreng en renovatie voor een moderne, duurzame gevelafwerking. 
                Van kleurkeuze tot afwerking - wij verzorgen het complete proces.
              </p>
              <ul className="text-gray-600 text-sm space-y-2 mb-6">
                <li>• Nieuwe crepi aanbrengen</li>
                <li>• Crepi herstellen en renoveren</li>
                <li>• Kleurkeuze en advies</li>
                <li>• Voorbehandeling ondergrond</li>
              </ul>
              <Link
                href="/diensten/crepi"
                className="text-yannova-primary font-semibold hover:underline flex items-center gap-2 focus-visible:outline-2 focus-visible:outline-yannova-primary focus-visible:outline-offset-2"
                aria-label="Meer informatie over crepi gevelafwerking"
              >
                Meer over crepi
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </article>

            {/* Ramen en Deuren */}
            <article className="bg-white rounded-xl p-8 shadow-md hover:shadow-xl transition-shadow">
              <div className="bg-stone-100 w-16 h-16 rounded-lg flex items-center justify-center mb-6" aria-hidden="true">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#8B4513" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                  <path d="M9 9h6v6H9z"/>
                  <path d="M9 1v6"/>
                  <path d="M15 1v6"/>
                  <path d="M9 17v6"/>
                  <path d="M15 17v6"/>
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Ramen & Deuren
              </h3>
              <p className="text-gray-600 mb-6">
                Vervanging en renovatie van ramen en deuren voor betere isolatie, veiligheid en esthetiek. 
                Van moderne kunststof tot klassieke houten kozijnen.
              </p>
              <ul className="text-gray-600 text-sm space-y-2 mb-6">
                <li>• Nieuwe ramen plaatsen</li>
                <li>• Deuren vervangen</li>
                <li>• Kozijn renovatie</li>
                <li>• HR++ glas en isolatie</li>
              </ul>
              <Link
                href="/diensten/ramen-deuren"
                className="text-yannova-primary font-semibold hover:underline flex items-center gap-2 focus-visible:outline-2 focus-visible:outline-yannova-primary focus-visible:outline-offset-2"
                aria-label="Meer informatie over ramen en deuren diensten"
              >
                Meer over ramen & deuren
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </article>

            {/* Foto's en Documentatie */}
            <article className="bg-white rounded-xl p-8 shadow-md hover:shadow-xl transition-shadow">
              <div className="bg-stone-100 w-16 h-16 rounded-lg flex items-center justify-center mb-6" aria-hidden="true">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#8B4513" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                  <circle cx="8.5" cy="8.5" r="1.5"/>
                  <polyline points="21,15 16,10 5,21"/>
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Projectfoto's
              </h3>
              <p className="text-gray-600 mb-6">
                Elke renovatie wordt volledig gedocumenteerd met professionele foto's en technische specificaties. 
                Van voor- en na foto's tot detailopnames.
              </p>
              <ul className="text-gray-600 text-sm space-y-2 mb-6">
                <li>• Voor en na foto's</li>
                <li>• Tussentijdse voortgangsfoto's</li>
                <li>• Technische documentatie</li>
                <li>• Garantiecertificaten</li>
              </ul>
              <Link
                href="/projecten"
                className="text-yannova-primary font-semibold hover:underline flex items-center gap-2 focus-visible:outline-2 focus-visible:outline-yannova-primary focus-visible:outline-offset-2"
                aria-label="Bekijk projectfoto's en documentatie"
              >
                Bekijk projectfoto's
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </article>
          </div>

          {/* Waarom Yannova voor Renovatiewerken */}
          <div className="bg-yannova-primary/5 rounded-xl p-8" role="region" aria-labelledby="why-yannova-heading">
            <div className="text-center mb-8">
              <h3 id="why-yannova-heading" className="text-3xl font-bold text-gray-900 mb-4">
                Waarom Yannova voor uw Renovatiewerken?
              </h3>
              <p className="text-xl text-gray-600">
                Ervaring, vakmanschap en complete projectafronding
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="bg-yannova-primary text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold" aria-label="15 plus jaar ervaring">
                  15+
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Jaar Ervaring</h4>
                <p className="text-gray-600 text-sm">Met crepi, ramen en renovatiewerken</p>
              </div>
              <div className="text-center">
                <div className="bg-yannova-primary text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold" aria-label="100 plus projecten">
                  100+
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Projecten</h4>
                <p className="text-gray-600 text-sm">Succesvol afgerond</p>
              </div>
              <div className="text-center">
                <div className="bg-yannova-primary text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold" aria-label="98 procent tevredenheid">
                  98%
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Tevredenheid</h4>
                <p className="text-gray-600 text-sm">Van onze klanten</p>
              </div>
              <div className="text-center">
                <div className="bg-yannova-primary text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold" aria-label="24/7 bereikbaar">
                  24/7
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Bereikbaar</h4>
                <p className="text-gray-600 text-sm">Voor vragen en ondersteuning</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section voor SEO */}
      <section className="py-20 bg-gray-50" aria-labelledby="faq-heading">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 id="faq-heading" className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Veelgestelde <span className="gradient-text">Vragen</span>
            </h2>
            <p className="text-xl text-gray-600">
              Antwoorden op de meest gestelde vragen over onze bouw- en renovatiediensten
            </p>
          </div>

          <div className="space-y-6 animate-fade-in-up animate-delay-200ms">
            <details className="bg-white rounded-lg shadow-soft p-6 group">
              <summary className="font-semibold text-lg text-gray-900 cursor-pointer list-none flex items-center justify-between group-hover:text-yannova-primary transition-colors">
                Wat zijn jullie werkgebieden?
                <svg className="w-5 h-5 text-yannova-primary group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <p className="mt-4 text-gray-600 leading-relaxed">
                Wij werken voornamelijk in Keerbergen, Mechelen, Leuven, Putte, Bonheiden en Rijmenam.
                Voor grotere projecten kunnen we ook buiten deze regio werken. Neem contact op voor de mogelijkheden.
              </p>
            </details>

            <details className="bg-white rounded-lg shadow-soft p-6 group">
              <summary className="font-semibold text-lg text-gray-900 cursor-pointer list-none flex items-center justify-between group-hover:text-yannova-primary transition-colors">
                Hoe lang duurt een gemiddelde renovatie?
                <svg className="w-5 h-5 text-yannova-primary group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <p className="mt-4 text-gray-600 leading-relaxed">
                De duur van een renovatieproject varieert afhankelijk van de omvang. Een badkamerrenovatie duurt gemiddeld 2-3 weken,
                een complete woningrenovatie kan 2-6 maanden duren. We geven altijd een realistische planning vooraf.
              </p>
            </details>

            <details className="bg-white rounded-lg shadow-soft p-6 group">
              <summary className="font-semibold text-lg text-gray-900 cursor-pointer list-none flex items-center justify-between group-hover:text-yannova-primary transition-colors">
                Werken jullie met crepi gevelafwerking?
                <svg className="w-5 h-5 text-yannova-primary group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <p className="mt-4 text-gray-600 leading-relaxed">
                Ja, crepi gevelafwerking is één van onze specialiteiten. We werken met kwalitatieve crepi producten en zorgen voor een perfecte afwerking.
                Van kleuradvies tot voorbehandeling en afwerking - alles wordt professioneel uitgevoerd.
              </p>
            </details>

            <details className="bg-white rounded-lg shadow-soft p-6 group">
              <summary className="font-semibold text-lg text-gray-900 cursor-pointer list-none flex items-center justify-between group-hover:text-yannova-primary transition-colors">
                Geven jullie garantie op jullie werk?
                <svg className="w-5 h-5 text-yannova-primary group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <p className="mt-4 text-gray-600 leading-relaxed">
                Ja, we geven standaard 2 jaar garantie op al onze werkzaamheden. Voor specifieke materialen geldt vaak de garantie van de fabrikant,
                die kan oplopen tot 10 jaar. We documenteren alles met foto's zodat garantieclaims probleemloos verlopen.
              </p>
            </details>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-yannova-primary py-20" aria-labelledby="cta-heading">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 id="cta-heading" className="text-4xl font-bold text-white mb-6">
            Klaar om uw renovatieproject te starten?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Neem contact op voor een vrijblijvend gesprek over uw crepi, ramen of andere renovatiewerken
          </p>
          <Link
            href="/contact"
            className="inline-block bg-white text-yannova-primary px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
            aria-label="Vraag een offerte aan voor uw renovatieproject"
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
