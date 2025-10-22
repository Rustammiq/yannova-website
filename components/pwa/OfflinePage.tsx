"use client";

import { useState, useEffect } from 'react';
import { WifiOff, RefreshCw, Phone, Mail } from 'lucide-react';
import Link from 'next/link';

export default function OfflinePage() {
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Initial check
    setIsOnline(navigator.onLine);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const handleRefresh = () => {
    window.location.reload();
  };

  if (isOnline) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 bg-white flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg border border-gray-200 p-6 text-center">
        {/* Icon */}
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <WifiOff className="w-8 h-8 text-gray-500" />
        </div>

        {/* Title */}
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Geen internetverbinding
        </h1>

        {/* Message */}
        <p className="text-gray-600 mb-6 leading-relaxed">
          Het lijkt erop dat je offline bent. Sommige functies zijn mogelijk niet beschikbaar.
          Probeer opnieuw te verbinden zodra je internet hebt.
        </p>

        {/* Contact Info */}
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <h3 className="font-semibold text-gray-900 mb-3">
            Noodzakelijke contactgegevens:
          </h3>
          <div className="space-y-2 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-yannova-primary" />
              <span>+32 489960001</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-yannova-primary" />
              <span>info@yannova.nl</span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={handleRefresh}
            className="flex items-center justify-center gap-2 bg-yannova-primary text-white px-4 py-2 rounded-lg font-medium hover:bg-yannova-primary/90 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            Opnieuw proberen
          </button>

          <Link
            href="/contact"
            className="flex items-center justify-center gap-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-200 transition-colors"
          >
            Offline contact
          </Link>
        </div>

        {/* Footer */}
        <p className="text-xs text-gray-500 mt-4">
          Yannova Bouw - Wij blijven bereikbaar, ook offline
        </p>
      </div>
    </div>
  );
}


