"use client";

import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-yannova-dark text-white" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <Link href="/" className="block mb-4">
              <Image
                src="/images/logo-yannova.png"
                alt="Yannova Bouw Logo"
                width={250}
                height={125}
                className="h-24 w-auto"
              />
            </Link>
            <p className="text-gray-300 mb-4">Van Begin tot Eind - Project Afronding</p>
            <p className="text-gray-300 text-sm">Professionele bouwoplossingen met vakmanschap en passie in Keerbergen, Mechelen, Leuven en omgeving.</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4 text-yannova-primary">Snelle Links</h4>
            <nav aria-label="Footer navigatie">
              <ul className="space-y-2">
                <li><Link className="text-gray-300 hover:text-yannova-primary transition-colors focus-visible:outline-2 focus-visible:outline-yannova-primary focus-visible:outline-offset-2" href="/over">Over Ons</Link></li>
                <li><Link className="text-gray-300 hover:text-yannova-primary transition-colors focus-visible:outline-2 focus-visible:outline-yannova-primary focus-visible:outline-offset-2" href="/diensten">Diensten</Link></li>
                <li><Link className="text-gray-300 hover:text-yannova-primary transition-colors focus-visible:outline-2 focus-visible:outline-yannova-primary focus-visible:outline-offset-2" href="/projecten">Projecten</Link></li>
                <li><Link className="text-gray-300 hover:text-yannova-primary transition-colors focus-visible:outline-2 focus-visible:outline-yannova-primary focus-visible:outline-offset-2" href="/contact">Contact</Link></li>
              </ul>
            </nav>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4 text-yannova-primary">Contact</h4>
            <address className="not-italic">
              <ul className="space-y-3">
                <li className="flex items-start space-x-3">
                  <div className="bg-stone-100 w-6 h-6 rounded flex items-center justify-center mt-1 flex-shrink-0" aria-hidden="true">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#8B4513" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect width="20" height="16" x="2" y="4" rx="2"/>
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                    </svg>
                  </div>
                  <Link 
                    href="mailto:info@yannova.nl" 
                    className="text-gray-300 hover:text-yannova-primary transition-colors focus-visible:outline-2 focus-visible:outline-yannova-primary focus-visible:outline-offset-2"
                    aria-label="Stuur een e-mail naar info@yannova.nl"
                  >
                    info@yannova.nl
                  </Link>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="bg-stone-100 w-6 h-6 rounded flex items-center justify-center mt-1 flex-shrink-0" aria-hidden="true">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#8B4513" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                    </svg>
                  </div>
                  <Link 
                    href="tel:+31612345678" 
                    className="text-gray-300 hover:text-yannova-primary transition-colors focus-visible:outline-2 focus-visible:outline-yannova-primary focus-visible:outline-offset-2"
                    aria-label="Bel ons op +31 6 12 34 56 78"
                  >
                    +31 6 12 34 56 78
                  </Link>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="bg-stone-100 w-6 h-6 rounded flex items-center justify-center mt-1 flex-shrink-0" aria-hidden="true">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#8B4513" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
                      <circle cx="12" cy="10" r="3"/>
                    </svg>
                  </div>
                  <span className="text-gray-300">Keerbergen, Mechelen, Leuven en omgeving</span>
                </li>
              </ul>
            </address>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400 text-sm">
          <p>© 2025 Yannova Bouw. Alle rechten voorbehouden.</p>
        </div>
      </div>
    </footer>
  );
}