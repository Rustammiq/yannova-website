"use client";

import { useEffect } from "react";
import Link from "next/link";
import { RefreshCw, Home, AlertTriangle } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Application error:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center px-4">
      <div className="max-w-2xl mx-auto text-center">
        {/* Error Icon */}
        <div className="mb-8">
          <div className="bg-red-100 w-32 h-32 rounded-full flex items-center justify-center mx-auto mb-6">
            <AlertTriangle className="text-red-600" size={64} />
          </div>
        </div>

        {/* Error Message */}
        <h1 className="text-4xl font-bold text-red-600 mb-4">Oeps! Er ging iets mis</h1>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Onverwachte Fout</h2>
        <p className="text-lg text-gray-600 mb-8 max-w-lg mx-auto">
          Er is een onverwachte fout opgetreden. Onze technici zijn op de hoogte gesteld 
          en werken aan een oplossing.
        </p>

        {/* Error Details (Development only) */}
        {process.env.NODE_ENV === "development" && (
          <div className="bg-gray-100 rounded-lg p-4 mb-8 text-left">
            <h3 className="font-semibold text-gray-900 mb-2">Error Details:</h3>
            <code className="text-sm text-red-600 break-all">{error.message}</code>
            {error.digest && (
              <p className="text-sm text-gray-500 mt-2">Error ID: {error.digest}</p>
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <button
            onClick={reset}
            className="group bg-yannova-primary hover:bg-yannova-primary/90 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
          >
            <RefreshCw size={20} />
            Opnieuw Proberen
          </button>
          <Link
            href="/"
            className="group bg-white hover:bg-gray-50 text-yannova-primary border-2 border-yannova-primary px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
          >
            <Home size={20} />
            Terug naar Home
          </Link>
        </div>

        {/* Contact Info */}
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Hulp Nodig?</h3>
          <p className="text-gray-600 mb-4">
            Als dit probleem aanhoudt, neem dan contact met ons op.
          </p>
          <Link
            href="/contact"
            className="text-yannova-primary hover:text-yannova-primary/80 transition-colors font-semibold"
          >
            Contact Opnemen →
          </Link>
        </div>
      </div>
    </div>
  );
}
