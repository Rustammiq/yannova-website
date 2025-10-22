"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { signOut } from "next-auth/react";
import {
  TrendingUp,
  Bot,
  Save,
  Loader2,
  Plus,
  Edit,
  ArrowLeft,
  Target,
  BarChart3,
  Globe,
  Hash,
} from "lucide-react";

interface SEOData {
  id: string;
  page: string;
  title: string;
  description: string;
  keywords: string[];
  metaTags: string;
  adText: string;
  score: number;
  lastUpdated: string;
}

interface Keyword {
  id: string;
  keyword: string;
  position: number;
  volume: number;
  difficulty: number;
  trend: 'up' | 'down' | 'stable';
}

export default function SEOPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [seoData, setSeoData] = useState<SEOData[]>([]);
  const [keywords, setKeywords] = useState<Keyword[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [editingPage, setEditingPage] = useState<SEOData | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newSEO, setNewSEO] = useState({
    page: "",
    title: "",
    description: "",
    keywords: "",
    metaTags: "",
    adText: "",
  });

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/admin/login");
    }
  }, [status, router]);

  useEffect(() => {
    loadSEOData();
    loadKeywords();
  }, []);

  const loadSEOData = async () => {
    setIsLoading(true);
    try {
      // Simulated data
      const mockSEOData: SEOData[] = [
        {
          id: "1",
          page: "Homepage",
          title: "Yannova Bouw - Van Begin tot Eind | Aannemer Keerbergen, Mechelen, Leuven",
          description: "Professionele bouwoplossingen van begin tot eind. Yannova Bouw realiseert uw droomproject met vakmanschap en passie in Keerbergen, Mechelen, Putte, Bonheiden, Rijmenam en Leuven.",
          keywords: ["bouw", "renovatie", "nieuwbouw", "aannemer", "Yannova", "Keerbergen", "Mechelen", "Leuven"],
          metaTags: "bouwbedrijf, renovatie, nieuwbouw, aannemer, Keerbergen, Mechelen, Leuven, Putte, Bonheiden, Rijmenam",
          adText: "Ontdek professionele bouwoplossingen in Keerbergen, Mechelen en Leuven. Yannova Bouw - uw betrouwbare partner voor nieuwbouw, renovatie en verbouwingen.",
          score: 85,
          lastUpdated: "2024-02-15",
        },
        {
          id: "2",
          page: "Diensten",
          title: "Bouw Diensten | Nieuwbouw, Renovatie & Verbouwing | Yannova Bouw",
          description: "Complete bouwdiensten: nieuwbouw, renovatie, verbouwing, crepi, ramen & deuren. Professioneel vakmanschap in Keerbergen, Mechelen en omgeving.",
          keywords: ["bouw diensten", "nieuwbouw", "renovatie", "verbouwing", "crepi", "ramen deuren"],
          metaTags: "bouw diensten, nieuwbouw, renovatie, verbouwing, crepi, ramen, deuren, Keerbergen, Mechelen",
          adText: "Professionele bouwdiensten in uw regio. Van nieuwbouw tot renovatie - Yannova Bouw zorgt voor kwaliteit en vakmanschap.",
          score: 78,
          lastUpdated: "2024-02-10",
        },
        {
          id: "3",
          page: "Projecten",
          title: "Bouwprojecten Portfolio | Yannova Bouw | Villa's, Renovaties & Meer",
          description: "Bekijk onze uitgevoerde bouwprojecten: moderne villa's, badkamerrenovaties, gevelafwerking en meer. Kwaliteit en vakmanschap in elke project.",
          keywords: ["bouwprojecten", "portfolio", "villa", "renovatie", "gevelafwerking", "badkamer"],
          metaTags: "bouwprojecten, portfolio, villa, renovatie, gevelafwerking, badkamer, Keerbergen, Mechelen",
          adText: "Ontdek onze succesvolle bouwprojecten. Van moderne villa's tot badkamerrenovaties - kwaliteit die spreekt.",
          score: 82,
          lastUpdated: "2024-02-12",
        },
      ];
      setSeoData(mockSEOData);
    } catch (error) {
      console.error("Error loading SEO data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadKeywords = async () => {
    try {
      const mockKeywords: Keyword[] = [
        { id: "1", keyword: "bouwbedrijf Keerbergen", position: 3, volume: 1200, difficulty: 65, trend: 'up' },
        { id: "2", keyword: "renovatie Mechelen", position: 7, volume: 890, difficulty: 58, trend: 'up' },
        { id: "3", keyword: "crepi Leuven", position: 12, volume: 650, difficulty: 45, trend: 'stable' },
        { id: "4", keyword: "nieuwbouw Putte", position: 15, volume: 420, difficulty: 38, trend: 'down' },
        { id: "5", keyword: "badkamer renovatie", position: 8, volume: 1100, difficulty: 52, trend: 'up' },
        { id: "6", keyword: "aannemer Bonheiden", position: 5, volume: 750, difficulty: 48, trend: 'up' },
      ];
      setKeywords(mockKeywords);
    } catch (error) {
      console.error("Error loading keywords:", error);
    }
  };

  const generateAIContent = async (page: string) => {
    setIsGenerating(true);
    try {
      // Simulate AI content generation
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const aiContent = {
        title: `AI-geoptimaliseerde titel voor ${page} - Yannova Bouw`,
        description: `AI-gegenereerde meta beschrijving voor ${page} met focus op lokale SEO en relevante keywords voor bouwbedrijven in de regio.`,
        keywords: ["bouw", "renovatie", "nieuwbouw", "aannemer", "Yannova", "Keerbergen", "Mechelen"],
        adText: `AI-gegenereerde reclame tekst voor ${page} die de unieke waarde van Yannova Bouw benadrukt en lokale klanten aantrekt.`,
      };
      
      if (editingPage) {
        setEditingPage({
          ...editingPage,
          title: aiContent.title,
          description: aiContent.description,
          keywords: aiContent.keywords,
          adText: aiContent.adText,
        });
      } else {
        setNewSEO({
          ...newSEO,
          title: aiContent.title,
          description: aiContent.description,
          keywords: aiContent.keywords.join(", "),
          adText: aiContent.adText,
        });
      }
    } catch (error) {
      console.error("Error generating AI content:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSaveSEO = async (seoData: SEOData) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (editingPage) {
        setSeoData(prevSeoData => prevSeoData.map(item => 
          item.id === editingPage.id 
            ? { ...editingPage, lastUpdated: new Date().toISOString().split('T')[0] }
            : item
        ));
        setEditingPage(null);
      } else {
        const newSEOData: SEOData = {
          id: Date.now().toString(),
          ...newSEO,
          keywords: newSEO.keywords.split(",").map(k => k.trim()),
          score: Math.floor(Math.random() * 20) + 70, // Random score 70-90
          lastUpdated: new Date().toISOString().split('T')[0],
        };
        setSeoData(prevSeoData => [newSEOData, ...prevSeoData]);
        setNewSEO({
          page: "",
          title: "",
          description: "",
          keywords: "",
          metaTags: "",
          adText: "",
        });
        setShowAddModal(false);
      }
    } catch (error) {
      console.error("Error saving SEO data:", error);
    }
  };

  if (status === "loading" || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-800">
        <Loader2 className="animate-spin text-yannova-primary" size={48} />
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-800">
      {/* Header */}
      <header className="bg-gray-900 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => router.push("/admin")}
                className="flex items-center space-x-2 text-gray-300 hover:text-yannova-primary transition-colors"
              >
                <ArrowLeft size={20} />
                <span>Terug naar Dashboard</span>
              </button>
              <span className="text-gray-400">|</span>
              <h1 className="text-2xl font-bold text-yannova-primary">
                SEO Management
              </h1>
            </div>
            <button
              onClick={() => signOut({ callbackUrl: "/admin/login" })}
              className="text-gray-300 hover:text-red-600 transition-colors"
            >
              Uitloggen
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* SEO Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gray-900 rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-300">Gemiddelde SEO Score</p>
                <p className="text-3xl font-bold text-green-600">82</p>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <TrendingUp className="text-green-600" size={24} />
              </div>
            </div>
            <p className="text-sm text-gray-400 mt-2">+5% deze maand</p>
          </div>

          <div className="bg-gray-900 rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-300">Geïndexeerde Pagina's</p>
                <p className="text-3xl font-bold text-blue-600">12</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <Globe className="text-blue-600" size={24} />
              </div>
            </div>
            <p className="text-sm text-gray-400 mt-2">Alle pagina's geïndexeerd</p>
          </div>

          <div className="bg-gray-900 rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-300">Keywords Ranking</p>
                <p className="text-3xl font-bold text-purple-600">6</p>
              </div>
              <div className="bg-purple-100 p-3 rounded-full">
                <Target className="text-purple-600" size={24} />
              </div>
            </div>
            <p className="text-sm text-gray-400 mt-2">Top 10 rankings</p>
          </div>

          <div className="bg-gray-900 rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-300">Organisch Verkeer</p>
                <p className="text-3xl font-bold text-orange-600">2.4K</p>
              </div>
              <div className="bg-orange-100 p-3 rounded-full">
                <BarChart3 className="text-orange-600" size={24} />
              </div>
            </div>
            <p className="text-sm text-gray-400 mt-2">+15% deze maand</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* SEO Pages */}
          <div className="bg-gray-900 rounded-lg shadow-sm">
            <div className="p-6 border-b border-gray-700">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-white">SEO Pagina's</h2>
                <button
                  onClick={() => setShowAddModal(true)}
                  className="bg-yannova-primary text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-yannova-primary/90 transition-colors"
                >
                  <Plus size={20} />
                  <span>Nieuwe Pagina</span>
                </button>
              </div>
            </div>

            <div className="p-6">
              <div className="space-y-4">
                {seoData.map((seo) => (
                  <div key={seo.id} className="border border-gray-700 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-semibold text-white">{seo.page}</h3>
                        <p className="text-sm text-gray-300">{seo.title}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          seo.score >= 80 ? 'bg-green-100 text-green-800' :
                          seo.score >= 60 ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {seo.score}/100
                        </span>
                        <button
                          onClick={() => setEditingPage(seo)}
                          className="text-blue-600 hover:text-blue-800"
                          title="SEO pagina bewerken"
                        >
                          <Edit size={16} />
                        </button>
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-300 mb-3 line-clamp-2">{seo.description}</p>
                    
                    <div className="flex flex-wrap gap-1 mb-3">
                      {seo.keywords.slice(0, 3).map((keyword, index) => (
                        <span key={index} className="bg-gray-700 text-gray-200 px-2 py-1 rounded text-xs">
                          {keyword}
                        </span>
                      ))}
                      {seo.keywords.length > 3 && (
                        <span className="text-gray-400 text-xs">+{seo.keywords.length - 3} meer</span>
                      )}
                    </div>
                    
                    <p className="text-xs text-gray-400">Laatst bijgewerkt: {seo.lastUpdated}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Keywords */}
          <div className="bg-gray-900 rounded-lg shadow-sm">
            <div className="p-6 border-b border-gray-700">
              <h2 className="text-xl font-bold text-white">Keyword Rankings</h2>
            </div>

            <div className="p-6">
              <div className="space-y-4">
                {keywords.map((keyword) => (
                  <div key={keyword.id} className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <Hash className="text-gray-400" size={16} />
                        <span className="font-medium text-white">{keyword.keyword}</span>
                      </div>
                      <div className="flex items-center space-x-4 mt-1 text-sm text-gray-300">
                        <span>Positie: #{keyword.position}</span>
                        <span>Volume: {keyword.volume.toLocaleString()}</span>
                        <span>Moeilijkheid: {keyword.difficulty}%</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        keyword.position <= 3 ? 'bg-green-100 text-green-800' :
                        keyword.position <= 10 ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        #{keyword.position}
                      </span>
                      <div className={`w-2 h-2 rounded-full ${
                        keyword.trend === 'up' ? 'bg-green-500' :
                        keyword.trend === 'down' ? 'bg-red-500' :
                        'bg-gray-400'
                      }`} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit/Add Modal */}
      {(editingPage || showAddModal) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-gray-900 rounded-xl shadow-2xl p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold text-white mb-6">
              {editingPage ? 'SEO Bewerken' : 'Nieuwe SEO Pagina'}
            </h2>
            
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-2">Pagina</label>
                  <input
                    type="text"
                    value={editingPage?.page || newSEO.page}
                    onChange={(e) => editingPage 
                      ? setEditingPage({ ...editingPage, page: e.target.value })
                      : setNewSEO({ ...newSEO, page: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-yannova-primary focus:border-yannova-primary text-white placeholder-gray-400"
                    placeholder="Homepage, Diensten, etc."
                  />
                </div>
                <div className="flex items-end">
                  <button
                    onClick={() => generateAIContent(editingPage?.page || newSEO.page)}
                    disabled={isGenerating}
                    className="w-full bg-purple-100 text-purple-800 px-4 py-2 rounded-lg flex items-center justify-center space-x-2 hover:bg-purple-200 transition-colors disabled:opacity-50"
                  >
                    {isGenerating ? (
                      <>
                        <Loader2 className="animate-spin" size={20} />
                        <span>AI Genereren...</span>
                      </>
                    ) : (
                      <>
                        <Bot size={20} />
                        <span>AI Content Genereren</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">SEO Titel</label>
                <input
                  type="text"
                  value={editingPage?.title || newSEO.title}
                  onChange={(e) => editingPage 
                    ? setEditingPage({ ...editingPage, title: e.target.value })
                    : setNewSEO({ ...newSEO, title: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-yannova-primary focus:border-yannova-primary text-white placeholder-gray-400"
                  placeholder="SEO-geoptimaliseerde titel"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">Meta Beschrijving</label>
                <textarea
                  value={editingPage?.description || newSEO.description}
                  onChange={(e) => editingPage 
                    ? setEditingPage({ ...editingPage, description: e.target.value })
                    : setNewSEO({ ...newSEO, description: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-yannova-primary focus:border-yannova-primary text-white placeholder-gray-400"
                  rows={3}
                  placeholder="Meta beschrijving voor zoekmachines"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">Keywords</label>
                <input
                  type="text"
                  value={editingPage?.keywords.join(", ") || newSEO.keywords}
                  onChange={(e) => editingPage 
                    ? setEditingPage({ ...editingPage, keywords: e.target.value.split(",").map(k => k.trim()) })
                    : setNewSEO({ ...newSEO, keywords: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-yannova-primary focus:border-yannova-primary text-white placeholder-gray-400"
                  placeholder="keyword1, keyword2, keyword3"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">Reclame Tekst</label>
                <textarea
                  value={editingPage?.adText || newSEO.adText}
                  onChange={(e) => editingPage 
                    ? setEditingPage({ ...editingPage, adText: e.target.value })
                    : setNewSEO({ ...newSEO, adText: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-yannova-primary focus:border-yannova-primary text-white placeholder-gray-400"
                  rows={3}
                  placeholder="Reclame tekst voor Google Ads"
                />
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => {
                  setEditingPage(null);
                  setShowAddModal(false);
                }}
                className="px-4 py-2 text-gray-300 hover:text-gray-200 transition-colors"
              >
                Annuleren
              </button>
              <button
                onClick={() => {
                  if (editingPage) {
                    handleSaveSEO(editingPage);
                  } else {
                    const newSEOData: SEOData = {
                      id: Date.now().toString(),
                      ...newSEO,
                      keywords: newSEO.keywords.split(",").map(k => k.trim()),
                      score: Math.floor(Math.random() * 20) + 70,
                      lastUpdated: new Date().toISOString().split('T')[0],
                    };
                    handleSaveSEO(newSEOData);
                  }
                }}
                className="bg-yannova-primary text-white px-6 py-2 rounded-lg flex items-center space-x-2 hover:bg-yannova-primary/90 transition-colors"
              >
                <Save size={20} />
                <span>Opslaan</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
