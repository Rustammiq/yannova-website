"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, Mail, Loader2, ArrowLeft } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("Ongeldige inloggegevens");
      } else {
        router.push("/admin");
        router.refresh();
      }
    } catch {
      setError("Er ging iets mis. Probeer het opnieuw.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yannova-dark via-yannova-gray to-yannova-dark flex items-center justify-center px-4">
      {/* Terug naar Website Knop */}
      <div className="absolute top-4 left-4">
        <button
          onClick={() => router.push("/")}
          className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-lg hover:bg-white/20 transition-colors"
          title="Terug naar hoofdpagina"
        >
          <ArrowLeft size={20} />
          <span>Terug naar Website</span>
        </button>
      </div>
      
      <div className="max-w-md w-full">
        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-yannova-primary mb-2">
            Yannova
          </h1>
          <p className="text-gray-300">Admin Dashboard</p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-xl shadow-2xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Inloggen
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Email
              </label>
              <div className="relative">
                <Mail
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yannova-primary text-gray-900"
                  placeholder="admin@yannova.nl"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Wachtwoord
              </label>
              <div className="relative">
                <Lock
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yannova-primary text-gray-900"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-yannova-primary hover:bg-yannova-primary/90 text-white font-semibold py-3 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  Inloggen...
                </>
              ) : (
                "Inloggen"
              )}
            </button>
          </form>

          {/* Info */}
          <div className="mt-6 text-center text-sm text-gray-500">
            <p>Standaard inloggegevens:</p>
            <p className="font-mono text-xs mt-1">
              Email: admin@yannova.nl
            </p>
            <p className="text-xs text-gray-400 mt-2">
              Wachtwoord: admin123 (demo mode)
            </p>
            <div className="mt-3 pt-3 border-t border-gray-200">
              <p className="text-xs text-gray-600 mb-2">
                Eerste keer inloggen? Gebruik "admin123" als wachtwoord.
              </p>
              <p className="text-xs text-gray-600">
                Na inloggen kun je je wachtwoord wijzigen via de admin interface.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
