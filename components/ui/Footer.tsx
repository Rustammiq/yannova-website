"use client";

import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-yannova-dark text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-2xl font-bold text-yannova-primary mb-4">Yannova</h3>
            <p className="text-gray-300 mb-4">Van Begin tot Eind - Project Afronding</p>
            <p className="text-gray-300 text-sm">Professionele bouwoplossingen met vakmanschap en passie.</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4 text-yannova-primary">Snelle Links</h4>
            <ul className="space-y-2">
              <li><Link className="text-gray-300 hover:text-yannova-primary transition-colors" href="/over">Over Ons</Link></li>
              <li><Link className="text-gray-300 hover:text-yannova-primary transition-colors" href="/diensten">Diensten</Link></li>
              <li><Link className="text-gray-300 hover:text-yannova-primary transition-colors" href="/projecten">Projecten</Link></li>
              <li><Link className="text-gray-300 hover:text-yannova-primary transition-colors" href="/contact">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4 text-yannova-primary">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <Mail className="text-yannova-primary mt-1 flex-shrink-0" size={20} />
                <Link href="mailto:info@yannova.nl" className="text-gray-300 hover:text-yannova-primary transition-colors">info@yannova.nl</Link>
              </li>
              <li className="flex items-start space-x-3">
                <Phone className="text-yannova-primary mt-1 flex-shrink-0" size={20} />
                <Link href="tel:+31612345678" className="text-gray-300 hover:text-yannova-primary transition-colors">+31 6 12 34 56 78</Link>
              </li>
              <li className="flex items-start space-x-3">
                <MapPin className="text-yannova-primary mt-1 flex-shrink-0" size={20} />
                <span className="text-gray-300">Nederland</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400 text-sm">
          <p>© 2025 Yannova Bouw. Alle rechten voorbehouden.</p>
        </div>
      </div>
    </footer>
  );
}