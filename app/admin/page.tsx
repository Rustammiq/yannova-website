"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { signOut } from "next-auth/react";
import {
  LayoutDashboard,
  Settings,
  LogOut,
  Bot,
  Key,
  Loader2,
  Save,
  CheckCircle,
  TrendingUp,
  Mail,
  FileText,
  Eye,
  Image as ImageIcon,
} from "lucide-react";

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [apiKey, setApiKey] = useState("");
  const [hasApiKey, setHasApiKey] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/admin/login");
    }
  }, [status, router]);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/admin/settings");
      if (response.ok) {
        const data = await response.json();
        setHasApiKey(data.hasApiKey);
      }
    } catch (error) {
      console.error("Error loading settings:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveSettings = async () => {
    if (!apiKey.trim()) {
      setMessage({ type: "error", text: "Voer een API key in" });
      return;
    }

    setIsSaving(true);
    setMessage(null);

    try {
      const response = await fetch("/api/admin/settings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ apiKey }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({ type: "success", text: data.message });
        setHasApiKey(true);
        setApiKey("");
      } else {
        setMessage({ type: "error", text: data.error });
      }
    } catch {
      setMessage({ type: "error", text: "Er ging iets mis" });
    } finally {
      setIsSaving(false);
    }
  };

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/admin/login" });
  };

  if (status === "loading" || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="animate-spin text-yannova-primary" size={48} />
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-yannova-primary">
                Yannova
              </h1>
              <span className="text-gray-400">|</span>
              <span className="text-gray-600">Admin Dashboard</span>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 text-gray-600 hover:text-red-600 transition-colors"
            >
              <LogOut size={20} />
              <span>Uitloggen</span>
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Navigatie
              </h2>
              <nav className="space-y-2">
                <a
                  href="#dashboard"
                  className="flex items-center space-x-3 px-4 py-3 text-yannova-primary bg-yannova-primary/10 rounded-lg"
                >
                  <LayoutDashboard size={20} />
                  <span>Dashboard</span>
                </a>
                <a
                  href="#ai-settings"
                  className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg"
                >
                  <Bot size={20} />
                  <span>AI Chatbot</span>
                </a>
                <a
                  href="#analytics"
                  className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg"
                >
                  <TrendingUp size={20} />
                  <span>Analytics</span>
                </a>
                <a
                  href="#contacts"
                  className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg"
                >
                  <Mail size={20} />
                  <span>Contact Forms</span>
                </a>
                <a
                  href="/admin/projects"
                  className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg"
                >
                  <FileText size={20} />
                  <span>Projecten</span>
                </a>
                <a
                  href="/admin/photos"
                  className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg"
                >
                  <ImageIcon size={20} />
                  <span>Foto's</span>
                </a>
                <a
                  href="/admin/seo"
                  className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg"
                >
                  <Eye size={20} />
                  <span>SEO Tools</span>
                </a>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Dashboard Overview */}
            <div id="dashboard" className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center space-x-3 mb-6">
                <div className="bg-yannova-primary/10 p-3 rounded-lg">
                  <LayoutDashboard className="text-yannova-primary" size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">
                    Dashboard Overzicht
                  </h3>
                  <p className="text-sm text-gray-600">
                    Beheer en monitor uw Yannova website
                  </p>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-blue-600">Website Bezoekers</p>
                      <p className="text-2xl font-bold text-blue-900">2,847</p>
                    </div>
                    <div className="bg-blue-500 p-3 rounded-full">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="flex items-center text-sm">
                      <span className="text-green-600 font-medium">+12.5%</span>
                      <span className="text-gray-600 ml-2">van vorige maand</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-green-600">Chatbot Conversaties</p>
                      <p className="text-2xl font-bold text-green-900">156</p>
                    </div>
                    <div className="bg-green-500 p-3 rounded-full">
                      <Bot className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="flex items-center text-sm">
                      <span className="text-green-600 font-medium">+23.1%</span>
                      <span className="text-gray-600 ml-2">van vorige maand</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-purple-600">Contact Formulieren</p>
                      <p className="text-2xl font-bold text-purple-900">28</p>
                    </div>
                    <div className="bg-purple-500 p-3 rounded-full">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="flex items-center text-sm">
                      <span className="text-red-600 font-medium">-4.2%</span>
                      <span className="text-gray-600 ml-2">van vorige maand</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-orange-600">Gemiddelde Score</p>
                      <p className="text-2xl font-bold text-orange-900">4.8/5</p>
                    </div>
                    <div className="bg-orange-500 p-3 rounded-full">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                      </svg>
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="flex items-center text-sm">
                      <span className="text-green-600 font-medium">+0.1</span>
                      <span className="text-gray-600 ml-2">van vorige maand</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="border-t border-gray-200 pt-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Recente Activiteit</h4>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                    <div className="bg-blue-100 p-2 rounded-full">
                      <Bot className="w-4 h-4 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">Nieuwe chatbot conversatie gestart</p>
                      <p className="text-xs text-gray-500">2 minuten geleden</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                    <div className="bg-green-100 p-2 rounded-full">
                      <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">Contactformulier ingediend</p>
                      <p className="text-xs text-gray-500">15 minuten geleden</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                    <div className="bg-purple-100 p-2 rounded-full">
                      <Settings className="w-4 h-4 text-purple-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">AI instellingen bijgewerkt</p>
                      <p className="text-xs text-gray-500">1 uur geleden</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Welcome Card */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Welkom, {session.user?.name}
              </h2>
              <p className="text-gray-600">
                Beheer hier de AI instellingen en monitor uw Yannova website.
              </p>
            </div>

            {/* AI Settings Card */}
            <div id="ai-settings" className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center space-x-3 mb-6">
                <div className="bg-yannova-primary/10 p-3 rounded-lg">
                  <Settings className="text-yannova-primary" size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">
                    AI Chatbot Configuratie
                  </h3>
                  <p className="text-sm text-gray-600">
                    Beheer Madina Assistent - Uw AI bouwadviseur
                  </p>
                </div>
              </div>

              {/* API Key Status */}
              <div className="mb-6">
                <div className="flex items-center space-x-2 mb-2">
                  <Key size={16} className="text-gray-500" />
                  <span className="text-sm font-medium text-gray-700">
                    API Key Status:
                  </span>
                </div>
                <div
                  className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full text-sm ${
                    hasApiKey
                      ? "bg-green-100 text-green-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {hasApiKey ? (
                    <>
                      <CheckCircle size={16} />
                      <span>API Key is ingesteld</span>
                    </>
                  ) : (
                    <>
                      <span>⚠️</span>
                      <span>Geen API Key geconfigureerd</span>
                    </>
                  )}
                </div>
              </div>

              {/* API Key Input */}
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="apiKey"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Google Gemini API Key
                  </label>
                  <input
                    id="apiKey"
                    type="password"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    placeholder="Voer uw Gemini API key in"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yannova-primary text-gray-900"
                  />
                  <p className="mt-2 text-sm text-gray-500">
                    Verkrijg een API key op{" "}
                    <a
                      href="https://makersuite.google.com/app/apikey"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-yannova-primary hover:underline"
                    >
                      Google AI Studio
                    </a>
                  </p>
                </div>

                {/* Message */}
                {message && (
                  <div
                    className={`p-4 rounded-lg ${
                      message.type === "success"
                        ? "bg-green-50 text-green-800 border border-green-200"
                        : "bg-red-50 text-red-800 border border-red-200"
                    }`}
                  >
                    {message.text}
                  </div>
                )}

                {/* Save Button */}
                <button
                  onClick={handleSaveSettings}
                  disabled={isSaving}
                  className="w-full bg-yannova-primary hover:bg-yannova-primary/90 text-white font-semibold py-3 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSaving ? (
                    <>
                      <Loader2 className="animate-spin" size={20} />
                      Opslaan...
                    </>
                  ) : (
                    <>
                      <Save size={20} />
                      Opslaan
                    </>
                  )}
                </button>
              </div>

              {/* Chatbot Training */}
              <div className="mt-6 border-t border-gray-200 pt-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Chatbot Training</h4>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600 mb-4">
                    Verbeter de AI responses door veelgestelde vragen toe te voegen aan de kennisbank.
                  </p>
                  <button className="bg-yannova-primary text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-yannova-primary/90 transition-colors">
                    Nieuwe Vraag Toevoegen
                  </button>
                </div>
              </div>
            </div>

            {/* Analytics Section */}
            <div id="analytics" className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center space-x-3 mb-6">
                <div className="bg-blue-100 p-3 rounded-lg">
                  <TrendingUp className="text-blue-600" size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Website Analytics</h3>
                  <p className="text-sm text-gray-600">Gedetailleerde inzichten in website verkeer</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-3">Top Pagina's</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Homepage</span>
                      <span className="text-sm font-medium">1,247 views</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Projecten</span>
                      <span className="text-sm font-medium">892 views</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Diensten</span>
                      <span className="text-sm font-medium">634 views</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-3">Verkeersbronnen</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Google</span>
                      <span className="text-sm font-medium">68%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Direct</span>
                      <span className="text-sm font-medium">22%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Social Media</span>
                      <span className="text-sm font-medium">10%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Forms Section */}
            <div id="contacts" className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center space-x-3 mb-6">
                <div className="bg-green-100 p-3 rounded-lg">
                  <Mail className="text-green-600" size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Contact Formulieren</h3>
                  <p className="text-sm text-gray-600">Beheer ingediende contactverzoeken</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-semibold text-gray-900">Jan De Vries</h4>
                      <p className="text-sm text-gray-600">jan.devries@email.com</p>
                    </div>
                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Nieuw</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">
                    "Ik wil graag een offerte voor een complete badkamerrenovatie. Kunnen jullie langskomen voor een vrijblijvend gesprek?"
                  </p>
                  <div className="flex space-x-2">
                    <button className="text-xs bg-blue-100 text-blue-800 px-3 py-1 rounded-full hover:bg-blue-200">
                      Beantwoord
                    </button>
                    <button className="text-xs bg-gray-100 text-gray-800 px-3 py-1 rounded-full hover:bg-gray-200">
                      Archiveer
                    </button>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-semibold text-gray-900">Marie Van der Berg</h4>
                      <p className="text-sm text-gray-600">marie.vandenberg@email.com</p>
                    </div>
                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">Beantwoord</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">
                    "Zeer tevreden met de crepi gevelafwerking! Kwaliteit is uitstekend."
                  </p>
                  <div className="flex space-x-2">
                    <button className="text-xs bg-green-100 text-green-800 px-3 py-1 rounded-full hover:bg-green-200">
                      Archiveer
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Projects Section */}
            <div id="projects" className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center space-x-3 mb-6">
                <div className="bg-purple-100 p-3 rounded-lg">
                  <FileText className="text-purple-600" size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Projecten Beheer</h3>
                  <p className="text-sm text-gray-600">Beheer uw bouwprojecten en portfolio</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <div className="bg-gray-200 h-32 flex items-center justify-center">
                    <span className="text-gray-500 text-sm">Project Foto</span>
                  </div>
                  <div className="p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Moderne Villa Keerbergen</h4>
                    <p className="text-sm text-gray-600 mb-3">Complete nieuwbouw villa met energiezuinige technologieën</p>
                    <div className="flex justify-between items-center">
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">Voltooid</span>
                      <span className="text-xs text-gray-500">€450.000</span>
                    </div>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <div className="bg-gray-200 h-32 flex items-center justify-center">
                    <span className="text-gray-500 text-sm">Project Foto</span>
                  </div>
                  <div className="p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Badkamer Renovatie Mechelen</h4>
                    <p className="text-sm text-gray-600 mb-3">Complete badkamerrenovatie met moderne tegels en sanitair</p>
                    <div className="flex justify-between items-center">
                      <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">Bezig</span>
                      <span className="text-xs text-gray-500">€25.000</span>
                    </div>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <div className="bg-gray-200 h-32 flex items-center justify-center">
                    <span className="text-gray-500 text-sm">Project Foto</span>
                  </div>
                  <div className="p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Crepi Gevelafwerking Putte</h4>
                    <p className="text-sm text-gray-600 mb-3">Moderne gevelafwerking met isolatie voor energiebesparing</p>
                    <div className="flex justify-between items-center">
                      <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">Planning</span>
                      <span className="text-xs text-gray-500">€18.500</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 text-center">
                <button className="bg-yannova-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-yannova-primary/90 transition-colors">
                  Nieuw Project Toevoegen
                </button>
              </div>
            </div>

            {/* SEO Tools Section */}
            <div id="seo" className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center space-x-3 mb-6">
                <div className="bg-orange-100 p-3 rounded-lg">
                  <Eye className="text-orange-600" size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">SEO Tools</h3>
                  <p className="text-sm text-gray-600">Optimaliseer uw website voor zoekmachines</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-3">SEO Score</h4>
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full w-[85%]"></div>
                    </div>
                    <span className="text-sm font-medium text-green-600">85/100</span>
                  </div>
                  <p className="text-xs text-gray-600">Uitstekend! Uw website is goed geoptimaliseerd.</p>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-3">Keyword Rankings</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>"bouwbedrijf Keerbergen"</span>
                      <span className="text-green-600 font-medium">#3</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>"renovatie Mechelen"</span>
                      <span className="text-blue-600 font-medium">#7</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>"crepi Leuven"</span>
                      <span className="text-orange-600 font-medium">#12</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex space-x-3">
                <button 
                  onClick={() => router.push("/admin/seo")}
                  className="bg-blue-600 text-white px-4 py-3 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                >
                  SEO Audit Uitvoeren
                </button>
                <button 
                  onClick={() => router.push("/admin/seo")}
                  className="bg-gray-600 text-white px-4 py-3 rounded-lg text-sm font-medium hover:bg-gray-700 transition-colors"
                >
                  Keywords Onderzoek
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
