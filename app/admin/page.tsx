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
    } catch (error) {
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
                  <span>AI Instellingen</span>
                </a>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Welcome Card */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Welkom, {session.user?.name}
              </h2>
              <p className="text-gray-600">
                Beheer hier de AI instellingen voor de Yannova website.
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
                    AI Instellingen
                  </h3>
                  <p className="text-sm text-gray-600">
                    Configureer Google Gemini API
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

              {/* Info Box */}
              <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-semibold text-blue-900 mb-2">
                  💡 Belangrijk
                </h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• De API key wordt veilig opgeslagen</li>
                  <li>• Herstart de applicatie na het opslaan</li>
                  <li>
                    • Test de chatbot op de homepage om te controleren of alles
                    werkt
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
