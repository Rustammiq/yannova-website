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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yannova-dark via-yannova-gray to-yannova-dark">
        <Loader2 className="animate-spin text-yannova-primary" size={48} />
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <div className="min-h-screen">
      {/* Enhanced Header */}
      <header className="glass-dark shadow-soft border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-yannova-primary">
                Yannova
              </h1>
              <span className="text-gray-400">|</span>
              <span className="text-gray-300">Admin Dashboard</span>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 text-gray-300 hover:text-red-400 transition-colors"
            >
              <LogOut size={20} />
              <span>Uitloggen</span>
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Enhanced Sidebar */}
          <div className="lg:col-span-1">
            <div className="glass-dark rounded-lg shadow-soft p-6 border border-white/10">
              <h2 className="text-lg font-semibold text-white mb-4">
                Navigatie
              </h2>
              <nav className="space-y-2">
                <a
                  href="#dashboard"
                  className="flex items-center space-x-3 px-4 py-3 text-yannova-primary bg-yannova-primary/20 rounded-lg"
                >
                  <LayoutDashboard size={20} />
                  <span>Dashboard</span>
                </a>
                <a
                  href="#ai-settings"
                  className="flex items-center space-x-3 px-4 py-3 text-gray-300 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <Bot size={20} />
                  <span>AI Chatbot</span>
                </a>
                <a
                  href="#analytics"
                  className="flex items-center space-x-3 px-4 py-3 text-gray-300 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <TrendingUp size={20} />
                  <span>Analytics</span>
                </a>
                <a
                  href="/admin/contacts"
                  className="flex items-center space-x-3 px-4 py-3 text-gray-300 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <Mail size={20} />
                  <span>Contact Berichten</span>
                </a>
                <a
                  href="/admin/projects"
                  className="flex items-center space-x-3 px-4 py-3 text-gray-300 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <FileText size={20} />
                  <span>Projecten</span>
                </a>
                <a
                  href="/admin/photos"
                  className="flex items-center space-x-3 px-4 py-3 text-gray-300 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <ImageIcon size={20} />
                  <span>Foto's</span>
                </a>
                <a
                  href="/admin/seo"
                  className="flex items-center space-x-3 px-4 py-3 text-gray-300 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <Eye size={20} />
                  <span>SEO Tools</span>
                </a>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="space-y-6">
              {/* Dashboard Overview */}
              <div id="dashboard" className="glass-dark rounded-lg shadow-soft p-6 border border-white/10">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="bg-yannova-primary/10 p-3 rounded-lg">
                    <LayoutDashboard className="text-yannova-primary" size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">
                      Dashboard Overzicht
                    </h3>
                    <p className="text-sm text-gray-300">
                      Beheer en monitor uw Yannova website
                    </p>
                  </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-lg p-6 border border-blue-400/20">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-blue-300">Website Bezoekers</p>
                        <p className="text-2xl font-bold text-white">2,847</p>
                      </div>
                      <div className="bg-blue-500 p-3 rounded-full">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                    </div>
                    <div className="mt-4">
                      <div className="flex items-center text-sm">
                        <span className="text-green-400 font-medium">+12.5%</span>
                        <span className="text-gray-400 ml-2">van vorige maand</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-green-500/20 to-green-600/20 rounded-lg p-6 border border-green-400/20">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-green-300">Chatbot Conversaties</p>
                        <p className="text-2xl font-bold text-white">156</p>
                      </div>
                      <div className="bg-green-500 p-3 rounded-full">
                        <Bot className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <div className="mt-4">
                      <div className="flex items-center text-sm">
                        <span className="text-green-400 font-medium">+23.1%</span>
                        <span className="text-gray-400 ml-2">van vorige maand</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/20 rounded-lg p-6 border border-purple-400/20">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-purple-300">Contact Formulieren</p>
                        <p className="text-2xl font-bold text-white">28</p>
                      </div>
                      <div className="bg-purple-500 p-3 rounded-full">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                    </div>
                    <div className="mt-4">
                      <div className="flex items-center text-sm">
                        <span className="text-red-400 font-medium">-4.2%</span>
                        <span className="text-gray-400 ml-2">van vorige maand</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-orange-500/20 to-orange-600/20 rounded-lg p-6 border border-orange-400/20">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-orange-300">Gemiddelde Score</p>
                        <p className="text-2xl font-bold text-white">4.8/5</p>
                      </div>
                      <div className="bg-orange-500 p-3 rounded-full">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                        </svg>
                      </div>
                    </div>
                    <div className="mt-4">
                      <div className="flex items-center text-sm">
                        <span className="text-green-400 font-medium">+0.1</span>
                        <span className="text-gray-400 ml-2">van vorige maand</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="border-t border-white/20 pt-6">
                  <h4 className="text-lg font-semibold text-white mb-4">Recente Activiteit</h4>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4 p-3 bg-white/5 rounded-lg border border-white/10">
                      <div className="bg-blue-500/20 p-2 rounded-full">
                        <Bot className="w-4 h-4 text-blue-300" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-white">Nieuwe chatbot conversatie gestart</p>
                        <p className="text-xs text-gray-400">2 minuten geleden</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4 p-3 bg-white/5 rounded-lg border border-white/10">
                      <div className="bg-green-500/20 p-2 rounded-full">
                        <svg className="w-4 h-4 text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-white">Contactformulier ingediend</p>
                        <p className="text-xs text-gray-400">15 minuten geleden</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4 p-3 bg-white/5 rounded-lg border border-white/10">
                      <div className="bg-purple-500/20 p-2 rounded-full">
                        <Settings className="w-4 h-4 text-purple-300" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-white">AI instellingen bijgewerkt</p>
                        <p className="text-xs text-gray-400">1 uur geleden</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Welcome Card */}
              <div className="glass-dark rounded-lg shadow-soft p-6 border border-white/10">
                <h2 className="text-2xl font-bold text-white mb-2">
                  Welkom, {session.user?.name}
                </h2>
                <p className="text-gray-300">
                  Beheer hier de AI instellingen en monitor uw Yannova website.
                </p>
              </div>

              {/* AI Settings Card */}
              <div id="ai-settings" className="glass-dark rounded-lg shadow-soft p-6 border border-white/10">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="bg-yannova-primary/10 p-3 rounded-lg">
                    <Settings className="text-yannova-primary" size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">
                      AI Chatbot Configuratie
                    </h3>
                    <p className="text-sm text-gray-300">
                      Beheer Madina Assistent - Uw AI bouwadviseur
                    </p>
                  </div>
                </div>

                {/* API Key Status */}
                <div className="mb-6">
                  <div className="flex items-center space-x-2 mb-2">
                    <Key size={16} className="text-gray-400" />
                    <span className="text-sm font-medium text-gray-300">
                      API Key Status:
                    </span>
                  </div>
                  <div
                    className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full text-sm ${
                      hasApiKey
                        ? "bg-green-500/20 text-green-300 border border-green-400/30"
                        : "bg-yellow-500/20 text-yellow-300 border border-yellow-400/30"
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
                      className="block text-sm font-medium text-gray-300 mb-2"
                    >
                      Google Gemini API Key
                    </label>
                    <input
                      id="apiKey"
                      type="password"
                      value={apiKey}
                      onChange={(e) => setApiKey(e.target.value)}
                      placeholder="Voer uw Gemini API key in"
                      className="w-full px-4 py-3 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-yannova-primary text-white bg-gray-700"
                    />
                    <p className="mt-2 text-sm text-gray-400">
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
                          ? "bg-green-500/20 text-green-300 border border-green-400/30"
                          : "bg-red-500/20 text-red-300 border border-red-400/30"
                      }`}
                    >
                      {message.text}
                    </div>
                  )}

                  {/* Save Button */}
                  <button
                    onClick={handleSaveSettings}
                    disabled={isSaving}
                    className="w-full bg-gradient-primary hover:shadow-yannova-hover text-white font-semibold py-3 rounded-lg transition-all duration-300 hover-lift flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
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
                <div className="mt-6 border-t border-gray-600 pt-6">
                  <h4 className="text-lg font-semibold text-white mb-4">Chatbot Training</h4>
                  <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                    <p className="text-sm text-gray-300 mb-4">
                      Verbeter de AI responses door veelgestelde vragen toe te voegen aan de kennisbank.
                    </p>
                    <button className="bg-yannova-primary text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-yannova-primary/90 transition-colors">
                      Nieuwe Vraag Toevoegen
                    </button>
                  </div>
                </div>
              </div>

              {/* Analytics Section */}
              <div id="analytics" className="glass-dark rounded-lg shadow-soft p-6 border border-white/10">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="bg-blue-500/20 p-3 rounded-lg">
                    <TrendingUp className="text-blue-300" size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">Website Analytics</h3>
                    <p className="text-sm text-gray-300">Gedetailleerde inzichten in website verkeer</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                    <h4 className="font-semibold text-white mb-3">Top Pagina's (Deze Maand)</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-300">Homepage</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-16 bg-gray-600 rounded-full h-2">
                            <div className="bg-blue-400 h-2 rounded-full w-[85%]"></div>
                          </div>
                          <span className="text-sm font-medium text-white">1,247 views</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-300">Projecten</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-16 bg-gray-600 rounded-full h-2">
                            <div className="bg-green-400 h-2 rounded-full w-[70%]"></div>
                          </div>
                          <span className="text-sm font-medium text-white">892 views</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-300">Diensten</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-16 bg-gray-600 rounded-full h-2">
                            <div className="bg-purple-400 h-2 rounded-full w-[50%]"></div>
                          </div>
                          <span className="text-sm font-medium text-white">634 views</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-300">Contact</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-16 bg-gray-600 rounded-full h-2">
                            <div className="bg-orange-400 h-2 rounded-full w-[40%]"></div>
                          </div>
                          <span className="text-sm font-medium text-white">456 views</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                    <h4 className="font-semibold text-white mb-3">Verkeersbronnen</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-300">Google</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-16 bg-gray-600 rounded-full h-2">
                            <div className="bg-blue-400 h-2 rounded-full w-[68%]"></div>
                          </div>
                          <span className="text-sm font-medium text-white">68%</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-300">Direct</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-16 bg-gray-600 rounded-full h-2">
                            <div className="bg-green-400 h-2 rounded-full w-[22%]"></div>
                          </div>
                          <span className="text-sm font-medium text-white">22%</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-300">Social Media</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-16 bg-gray-600 rounded-full h-2">
                            <div className="bg-purple-400 h-2 rounded-full w-[10%]"></div>
                          </div>
                          <span className="text-sm font-medium text-white">10%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-lg p-4 border border-blue-400/20">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-blue-300">Gemiddelde Sessieduur</p>
                        <p className="text-2xl font-bold text-white">3:24</p>
                      </div>
                      <div className="bg-blue-500 p-2 rounded-full">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                    </div>
                    <p className="text-xs text-blue-300 mt-2">+12% van vorige maand</p>
                  </div>

                  <div className="bg-gradient-to-br from-green-500/20 to-green-600/20 rounded-lg p-4 border border-green-400/20">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-green-300">Bounce Rate</p>
                        <p className="text-2xl font-bold text-white">42%</p>
                      </div>
                      <div className="bg-green-500 p-2 rounded-full">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                        </svg>
                      </div>
                    </div>
                    <p className="text-xs text-green-300 mt-2">-8% van vorige maand</p>
                  </div>

                  <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/20 rounded-lg p-4 border border-purple-400/20">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-purple-300">Conversie Rate</p>
                        <p className="text-2xl font-bold text-white">4.2%</p>
                      </div>
                      <div className="bg-purple-500 p-2 rounded-full">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                      </div>
                    </div>
                    <p className="text-xs text-purple-300 mt-2">+15% van vorige maand</p>
                  </div>
                </div>
              </div>

              {/* Contact Management Section */}
              <div className="glass-dark rounded-lg shadow-soft p-6 border border-white/10">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <div className="bg-green-500/20 p-3 rounded-lg">
                      <Mail className="text-green-300" size={24} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">Contact Berichten</h3>
                      <p className="text-sm text-gray-300">Beheer ingediende contactverzoeken</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => router.push("/admin/contacts")}
                    className="bg-gradient-primary hover:shadow-yannova-hover text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover-lift"
                  >
                    Alle Berichten Bekijken
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="bg-red-500/20 rounded-lg p-4 border border-red-400/20">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-red-300">Nieuwe Berichten</p>
                        <p className="text-2xl font-bold text-white">3</p>
                      </div>
                      <div className="bg-red-500 p-2 rounded-full">
                        <Mail className="w-5 h-5 text-white" />
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-500/20 rounded-lg p-4 border border-blue-400/20">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-blue-300">Totaal Deze Maand</p>
                        <p className="text-2xl font-bold text-white">28</p>
                      </div>
                      <div className="bg-blue-500 p-2 rounded-full">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div className="bg-green-500/20 rounded-lg p-4 border border-green-400/20">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-green-300">Gemiddelde Reactietijd</p>
                        <p className="text-2xl font-bold text-white">2.4h</p>
                      </div>
                      <div className="bg-green-500 p-2 rounded-full">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="border border-white/20 rounded-lg p-4 hover:bg-white/5 transition-colors">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-semibold text-white">Jan De Vries</h4>
                        <p className="text-sm text-gray-300">jan.devries@email.com</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="bg-red-500/20 text-red-300 text-xs px-2 py-1 rounded-full border border-red-400/30">Nieuw</span>
                        <span className="bg-orange-500/20 text-orange-300 text-xs px-2 py-1 rounded-full border border-orange-400/30">Hoog</span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-300 mb-2">
                      "Offerte badkamerrenovatie - Kunnen jullie langskomen voor een vrijblijvend gesprek?"
                    </p>
                    <p className="text-xs text-gray-400">2 uur geleden</p>
                  </div>

                  <div className="border border-white/20 rounded-lg p-4 hover:bg-white/5 transition-colors">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-semibold text-white">Lisa Vermeulen</h4>
                        <p className="text-sm text-gray-300">lisa.vermeulen@email.com</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="bg-red-500/20 text-red-300 text-xs px-2 py-1 rounded-full border border-red-400/30">Nieuw</span>
                        <span className="bg-orange-500/20 text-orange-300 text-xs px-2 py-1 rounded-full border border-orange-400/30">Hoog</span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-300 mb-2">
                      "Urgente reparatie ramen - Er komt tocht binnen"
                    </p>
                    <p className="text-xs text-gray-400">4 uur geleden</p>
                  </div>

                  <div className="border border-white/20 rounded-lg p-4 hover:bg-white/5 transition-colors">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-semibold text-white">Peter Janssen</h4>
                        <p className="text-sm text-gray-300">peter.janssen@email.com</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="bg-green-500/20 text-green-300 text-xs px-2 py-1 rounded-full border border-green-400/30">Gelezen</span>
                        <span className="bg-yellow-500/20 text-yellow-300 text-xs px-2 py-1 rounded-full border border-yellow-400/30">Gemiddeld</span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-300 mb-2">
                      "Vraag over nieuwbouw project in Keerbergen"
                    </p>
                    <p className="text-xs text-gray-400">1 dag geleden</p>
                  </div>
                </div>
              </div>

              {/* Projects Section */}
              <div className="glass-dark rounded-lg shadow-soft p-6 border border-white/10">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="bg-purple-500/20 p-3 rounded-lg">
                    <FileText className="text-purple-300" size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">Projecten Beheer</h3>
                    <p className="text-sm text-gray-300">Beheer uw bouwprojecten en portfolio</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="bg-white/5 border border-white/20 rounded-lg overflow-hidden hover:bg-white/10 transition-colors">
                    <div className="bg-gray-600 h-32 flex items-center justify-center">
                      <span className="text-gray-300 text-sm">Project Foto</span>
                    </div>
                    <div className="p-4">
                      <h4 className="font-semibold text-white mb-2">Moderne Villa Keerbergen</h4>
                      <p className="text-sm text-gray-300 mb-3">Complete nieuwbouw villa met energiezuinige technologieën</p>
                      <div className="flex justify-between items-center">
                        <span className="text-xs bg-green-500/20 text-green-300 px-2 py-1 rounded-full border border-green-400/30">Voltooid</span>
                        <span className="text-xs text-gray-400">€450.000</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/5 border border-white/20 rounded-lg overflow-hidden hover:bg-white/10 transition-colors">
                    <div className="bg-gray-600 h-32 flex items-center justify-center">
                      <span className="text-gray-300 text-sm">Project Foto</span>
                    </div>
                    <div className="p-4">
                      <h4 className="font-semibold text-white mb-2">Badkamer Renovatie Mechelen</h4>
                      <p className="text-sm text-gray-300 mb-3">Complete badkamerrenovatie met moderne tegels en sanitair</p>
                      <div className="flex justify-between items-center">
                        <span className="text-xs bg-blue-500/20 text-blue-300 px-2 py-1 rounded-full border border-blue-400/30">Bezig</span>
                        <span className="text-xs text-gray-400">€25.000</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/5 border border-white/20 rounded-lg overflow-hidden hover:bg-white/10 transition-colors">
                    <div className="bg-gray-600 h-32 flex items-center justify-center">
                      <span className="text-gray-300 text-sm">Project Foto</span>
                    </div>
                    <div className="p-4">
                      <h4 className="font-semibold text-white mb-2">Crepi Gevelafwerking Putte</h4>
                      <p className="text-sm text-gray-300 mb-3">Moderne gevelafwerking met isolatie voor energiebesparing</p>
                      <div className="flex justify-between items-center">
                        <span className="text-xs bg-yellow-500/20 text-yellow-300 px-2 py-1 rounded-full border border-yellow-400/30">Planning</span>
                        <span className="text-xs text-gray-400">€18.500</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 text-center">
                  <button 
                    onClick={() => router.push("/admin/projects")}
                    className="bg-gradient-primary hover:shadow-yannova-hover text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 hover-lift"
                  >
                    Nieuw Project Toevoegen
                  </button>
                </div>
              </div>

              {/* SEO Tools Section */}
              <div className="glass-dark rounded-lg shadow-soft p-6 border border-white/10">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="bg-orange-500/20 p-3 rounded-lg">
                    <Eye className="text-orange-300" size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">SEO Tools</h3>
                    <p className="text-sm text-gray-300">Optimaliseer uw website voor zoekmachines</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                    <h4 className="font-semibold text-white mb-3">SEO Score</h4>
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="flex-1 bg-gray-600 rounded-full h-2">
                        <div className="bg-green-500 h-2 rounded-full w-[85%]"></div>
                      </div>
                      <span className="text-sm font-medium text-green-300">85/100</span>
                    </div>
                    <p className="text-xs text-gray-300">Uitstekend! Uw website is goed geoptimaliseerd.</p>
                  </div>

                  <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                    <h4 className="font-semibold text-white mb-3">Keyword Rankings</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-300">"bouwbedrijf Keerbergen"</span>
                        <span className="text-green-300 font-medium">#3</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-300">"renovatie Mechelen"</span>
                        <span className="text-blue-300 font-medium">#7</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-300">"crepi Leuven"</span>
                        <span className="text-orange-300 font-medium">#12</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex space-x-3">
                  <button 
                    onClick={() => router.push("/admin/seo")}
                    className="bg-gradient-primary hover:shadow-yannova-hover text-white px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300 hover-lift"
                  >
                    SEO Audit Uitvoeren
                  </button>
                  <button 
                    onClick={() => router.push("/admin/seo")}
                    className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-3 rounded-lg text-sm font-medium transition-colors"
                  >
                    Keywords Onderzoek
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}