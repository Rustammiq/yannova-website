"use client";

import Navigation from "@/components/ui/Navigation";
import Footer from "@/components/ui/Footer";
import Chatbot from "@/components/chatbot/Chatbot";
import { Users, Award, Target, Heart } from "lucide-react";
import Image from "next/image";

export default function OverPage() {
  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-yannova-dark to-yannova-gray text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Over Yannova Bouw
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl">
            Uw betrouwbare partner in bouwen met jarenlange ervaring en passie
            voor kwaliteit
          </p>
        </div>
      </section>

      {/* Onze Missie */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Van Begin tot Eind
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Bij Yannova Bouw geloven we in complete projectafronding. Wij
                begeleiden elk project van de eerste schets tot de laatste
                afwerking, met oog voor detail en betrokkenheid bij het
                eindresultaat.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                Ons motto "Van Begin tot Eind - Project Afronding" staat voor
                onze toewijding om elk project succesvol af te ronden, met de
                hoogste kwaliteitsstandaarden en klanttevredenheid als uitgangspunt.
              </p>
            </div>
            <div className="bg-yannova-primary/10 rounded-xl p-8">
              <div className="aspect-video rounded-lg overflow-hidden">
                <Image
                  src="/images/projects/project-9-commercial.jpg"
                  alt="Yannova Bouw team aan het werk"
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

      {/* Onze Waarden */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Onze Waarden
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Deze principes vormen de basis van alles wat we doen
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Kwaliteit */}
            <div className="bg-white rounded-xl p-8 text-center hover:shadow-xl transition-shadow">
              <div className="bg-yannova-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Award className="text-yannova-primary" size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Kwaliteit
              </h3>
              <p className="text-gray-600">
                Hoogste kwaliteitsstandaarden in elk project, van materialen tot
                afwerking
              </p>
            </div>

            {/* Vakmanschap */}
            <div className="bg-white rounded-xl p-8 text-center hover:shadow-xl transition-shadow">
              <div className="bg-yannova-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="text-yannova-primary" size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Vakmanschap
              </h3>
              <p className="text-gray-600">
                Ervaren professionals met oog voor detail en liefde voor het vak
              </p>
            </div>

            {/* Betrouwbaarheid */}
            <div className="bg-white rounded-xl p-8 text-center hover:shadow-xl transition-shadow">
              <div className="bg-yannova-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Target className="text-yannova-primary" size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Betrouwbaarheid
              </h3>
              <p className="text-gray-600">
                Afspraken nakomen en transparante communicatie gedurende het
                gehele project
              </p>
            </div>

            {/* Klantgericht */}
            <div className="bg-white rounded-xl p-8 text-center hover:shadow-xl transition-shadow">
              <div className="bg-yannova-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="text-yannova-primary" size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Klantgericht
              </h3>
              <p className="text-gray-600">
                Uw wensen en tevredenheid staan centraal in al onze projecten
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Klaar om samen te werken?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Neem contact op voor een vrijblijvend gesprek over uw project
          </p>
          <a
            href="/contact"
            className="inline-block bg-yannova-primary hover:bg-yannova-primary/90 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 hover:scale-105"
          >
            Neem Contact Op
          </a>
        </div>
      </section>

      <Footer />
      <Chatbot />
    </div>
  );
}
