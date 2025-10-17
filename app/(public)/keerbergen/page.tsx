import Navigation from "@/components/ui/Navigation";
import Footer from "@/components/ui/Footer";
import Chatbot from "@/components/chatbot/Chatbot";
import { Building2, Hammer, Home, MapPin, Star, Users, Award } from "lucide-react";

export const metadata = {
  title: "Aannemer Keerbergen | Yannova Bouw",
  description: "Professionele aannemer in Keerbergen. Yannova Bouw verzorgt nieuwbouw, renovatie, crepi en verbouwingen in Keerbergen en omgeving. Vrijblijvende offerte.",
  keywords: [
    "aannemer Keerbergen", "bouwbedrijf Keerbergen", "renovatie Keerbergen", 
    "nieuwbouw Keerbergen", "crepi Keerbergen", "verbouwing Keerbergen",
    "Yannova Bouw Keerbergen", "bouwbedrijf Vlaams-Brabant"
  ]
};

export default function KeerbergenPage() {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-yannova-dark to-yannova-gray text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Aannemer Keerbergen
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              Yannova Bouw is uw betrouwbare partner voor alle bouwwerkzaamheden in Keerbergen en omgeving
            </p>
            <div className="flex items-center justify-center gap-2 text-yannova-primary">
              <MapPin size={24} />
              <span className="text-lg font-semibold">Keerbergen, Vlaams-Brabant</span>
            </div>
          </div>
        </div>
      </section>

      {/* Local Services */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Onze Diensten in Keerbergen
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Van kleine renovaties tot complete nieuwbouwprojecten - wij verzorgen alles in Keerbergen
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="bg-gray-50 rounded-xl p-8 hover:shadow-xl transition-shadow">
              <div className="bg-yannova-primary/10 w-16 h-16 rounded-lg flex items-center justify-center mb-6">
                <Building2 className="text-yannova-primary" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Nieuwbouw Keerbergen</h3>
              <p className="text-gray-600 mb-6">
                Complete nieuwbouwprojecten in Keerbergen. Van moderne eengezinswoningen tot bedrijfspanden.
              </p>
              <ul className="text-gray-600 text-sm space-y-2">
                <li>• Eengezinswoningen</li>
                <li>• Bedrijfspanden</li>
                <li>• Duurzame bouw</li>
                <li>• Energiezuinige oplossingen</li>
              </ul>
            </div>

            <div className="bg-gray-50 rounded-xl p-8 hover:shadow-xl transition-shadow">
              <div className="bg-yannova-primary/10 w-16 h-16 rounded-lg flex items-center justify-center mb-6">
                <Hammer className="text-yannova-primary" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Renovatie Keerbergen</h3>
              <p className="text-gray-600 mb-6">
                Professionele renovaties in Keerbergen. Crepi, ramen, deuren en complete verbouwingen.
              </p>
              <ul className="text-gray-600 text-sm space-y-2">
                <li>• Crepi gevelafwerking</li>
                <li>• Ramen en deuren vervangen</li>
                <li>• Badkamer renovatie</li>
                <li>• Keuken installatie</li>
              </ul>
            </div>

            <div className="bg-gray-50 rounded-xl p-8 hover:shadow-xl transition-shadow">
              <div className="bg-yannova-primary/10 w-16 h-16 rounded-lg flex items-center justify-center mb-6">
                <Home className="text-yannova-primary" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Verbouwing Keerbergen</h3>
              <p className="text-gray-600 mb-6">
                Uitbreidingen en verbouwingen in Keerbergen. Van dakkapel tot complete uitbouw.
              </p>
              <ul className="text-gray-600 text-sm space-y-2">
                <li>• Dakkapellen</li>
                <li>• Uitbouwen</li>
                <li>• Zolder verbouwing</li>
                <li>• Garage ombouw</li>
              </ul>
            </div>
          </div>

          {/* Why Choose Yannova in Keerbergen */}
          <div className="bg-yannova-primary/5 rounded-xl p-8">
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                Waarom kiezen voor Yannova Bouw in Keerbergen?
              </h3>
              <p className="text-xl text-gray-600">
                Lokale expertise met internationale kwaliteitsstandaarden
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="bg-yannova-primary text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  <MapPin size={20} />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Lokaal Gevestigd</h4>
                <p className="text-gray-600 text-sm">Kennis van lokale bouwvoorschriften en vergunningen</p>
              </div>
              <div className="text-center">
                <div className="bg-yannova-primary text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  <Star size={20} />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Bewezen Kwaliteit</h4>
                <p className="text-gray-600 text-sm">15+ jaar ervaring in de regio</p>
              </div>
              <div className="text-center">
                <div className="bg-yannova-primary text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  <Users size={20} />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Lokale Klanten</h4>
                <p className="text-gray-600 text-sm">100+ tevreden klanten in Keerbergen</p>
              </div>
              <div className="text-center">
                <div className="bg-yannova-primary text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  <Award size={20} />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Garantie</h4>
                <p className="text-gray-600 text-sm">Uitgebreide garantie op alle werkzaamheden</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-yannova-primary py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Klaar voor uw project in Keerbergen?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Neem contact op voor een vrijblijvend gesprek over uw bouwplannen in Keerbergen
          </p>
          <a
            href="/contact"
            className="inline-block bg-white text-yannova-primary px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
          >
            Vraag Offerte Aan
          </a>
        </div>
      </section>

      <Footer />
      <Chatbot />
    </div>
  );
}
