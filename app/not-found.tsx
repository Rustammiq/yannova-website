"use client";

import Link from "next/link";
import { ArrowLeft, Home, Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center px-4">
      <div className="max-w-2xl mx-auto text-center">
        {/* 404 Icon */}
        <div className="mb-8">
          <div className="bg-stone-100 w-32 h-32 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#8B4513" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/>
              <path d="m15 9-6 6"/>
              <path d="m9 9 6 6"/>
            </svg>
          </div>
        </div>

        {/* Error Message */}
        <h1 className="text-6xl font-bold text-yannova-primary mb-4">404</h1>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Pagina Niet Gevonden</h2>
        <p className="text-xl text-gray-600 mb-8 max-w-lg mx-auto">
          Sorry, de pagina die u zoekt bestaat niet of is verplaatst. 
          Laat ons u helpen terug te navigeren naar de juiste plek.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Link
            href="/"
            className="group bg-yannova-primary hover:bg-yannova-primary/90 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
          >
            <Home size={20} />
            Terug naar Home
          </Link>
          <Link
            href="/contact"
            className="group bg-white hover:bg-gray-50 text-yannova-primary border-2 border-yannova-primary px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
          >
            <Search size={20} />
            Contact Opnemen
          </Link>
        </div>

        {/* Quick Links */}
        <div className="bg-white rounded-xl p-8 shadow-lg">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Populaire Pagina's</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link
              href="/diensten"
              className="text-yannova-primary hover:text-yannova-primary/80 transition-colors flex items-center gap-2 p-3 rounded-lg hover:bg-gray-50"
            >
              <div className="bg-stone-100 w-8 h-8 rounded flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#8B4513" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"/>
                  <path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"/>
                  <path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2"/>
                </svg>
              </div>
              Onze Diensten
            </Link>
            <Link
              href="/projecten"
              className="text-yannova-primary hover:text-yannova-primary/80 transition-colors flex items-center gap-2 p-3 rounded-lg hover:bg-gray-50"
            >
              <div className="bg-stone-100 w-8 h-8 rounded flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#8B4513" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                  <circle cx="8.5" cy="8.5" r="1.5"/>
                  <polyline points="21,15 16,10 5,21"/>
                </svg>
              </div>
              Projecten
            </Link>
            <Link
              href="/keerbergen"
              className="text-yannova-primary hover:text-yannova-primary/80 transition-colors flex items-center gap-2 p-3 rounded-lg hover:bg-gray-50"
            >
              <div className="bg-stone-100 w-8 h-8 rounded flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#8B4513" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
              </div>
              Keerbergen
            </Link>
            <Link
              href="/mechelen"
              className="text-yannova-primary hover:text-yannova-primary/80 transition-colors flex items-center gap-2 p-3 rounded-lg hover:bg-gray-50"
            >
              <div className="bg-stone-100 w-8 h-8 rounded flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#8B4513" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
              </div>
              Mechelen
            </Link>
          </div>
        </div>

        {/* Back Button */}
        <div className="mt-8">
          <button
            onClick={() => window.history.back()}
            className="text-gray-500 hover:text-yannova-primary transition-colors flex items-center gap-2 mx-auto"
          >
            <ArrowLeft size={16} />
            Ga Terug
          </button>
        </div>
      </div>
    </div>
  );
}
