"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { signOut } from "next-auth/react";
import Image from "next/image";
import {
  Upload,
  Image as ImageIcon,
  Trash2,
  Edit,
  Download,
  Search,
  Filter,
  ArrowLeft,
  Bot,
  Loader2,
  Grid3X3,
  List,
  Folder,
} from "lucide-react";

interface Photo {
  id: string;
  filename: string;
  url: string;
  alt: string;
  category: string;
  tags: string[];
  size: number;
  dimensions: { width: number; height: number };
  uploadedAt: string;
  aiGenerated: boolean;
}

interface Category {
  id: string;
  name: string;
  count: number;
  color: string;
}

export default function PhotosPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedPhotos, setSelectedPhotos] = useState<string[]>([]);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadFiles, setUploadFiles] = useState<FileList | null>(null);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/admin/login");
    }
  }, [status, router]);

  useEffect(() => {
    loadPhotos();
    loadCategories();
  }, []);

  const loadPhotos = async () => {
    setIsLoading(true);
    try {
      // Simulated data
      const mockPhotos: Photo[] = [
        {
          id: "1",
          filename: "project-1-villa.jpg",
          url: "/images/projects/project-1-villa.jpg",
          alt: "Moderne villa nieuwbouw project",
          category: "nieuwbouw",
          tags: ["villa", "nieuwbouw", "modern", "keerbergen"],
          size: 2048000,
          dimensions: { width: 1920, height: 1080 },
          uploadedAt: "2024-02-15",
          aiGenerated: false,
        },
        {
          id: "2",
          filename: "project-4-bathroom.jpg",
          url: "/images/projects/project-4-bathroom.jpg",
          alt: "Badkamer renovatie project",
          category: "renovatie",
          tags: ["badkamer", "renovatie", "tegels", "sanitair"],
          size: 1536000,
          dimensions: { width: 1600, height: 1200 },
          uploadedAt: "2024-02-10",
          aiGenerated: false,
        },
        {
          id: "3",
          filename: "project-7-crepi.jpg",
          url: "/images/projects/project-7-crepi.jpg",
          alt: "Crepi gevelafwerking",
          category: "gevelwerk",
          tags: ["crepi", "gevel", "isolatie", "putte"],
          size: 1280000,
          dimensions: { width: 1400, height: 900 },
          uploadedAt: "2024-02-08",
          aiGenerated: false,
        },
        {
          id: "4",
          filename: "ai-generated-construction.jpg",
          url: "/images/ai-generated-construction.jpg",
          alt: "AI gegenereerde bouwafbeelding",
          category: "ai-generated",
          tags: ["ai", "bouw", "modern", "generated"],
          size: 1024000,
          dimensions: { width: 1200, height: 800 },
          uploadedAt: "2024-02-20",
          aiGenerated: true,
        },
      ];
      setPhotos(mockPhotos);
    } catch (error) {
      console.error("Error loading photos:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadCategories = async () => {
    try {
      const mockCategories: Category[] = [
        { id: "nieuwbouw", name: "Nieuwbouw", count: 15, color: "bg-blue-100 text-blue-800" },
        { id: "renovatie", name: "Renovatie", count: 23, color: "bg-green-100 text-green-800" },
        { id: "gevelwerk", name: "Gevelwerk", count: 12, color: "bg-purple-100 text-purple-800" },
        { id: "ai-generated", name: "AI Gegenereerd", count: 8, color: "bg-orange-100 text-orange-800" },
        { id: "team", name: "Team", count: 5, color: "bg-gray-100 text-gray-800" },
      ];
      setCategories(mockCategories);
    } catch (error) {
      console.error("Error loading categories:", error);
    }
  };

  const handleUpload = async () => {
    if (!uploadFiles) return;
    
    setIsUploading(true);
    try {
      // Simulate upload
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const newPhotos: Photo[] = Array.from(uploadFiles).map((file, index) => ({
        id: Date.now().toString() + index,
        filename: file.name,
        url: URL.createObjectURL(file),
        alt: file.name.split('.')[0],
        category: "nieuwbouw",
        tags: [],
        size: file.size,
        dimensions: { width: 1920, height: 1080 },
        uploadedAt: new Date().toISOString().split('T')[0],
        aiGenerated: false,
      }));
      
      setPhotos([...newPhotos, ...photos]);
      setUploadFiles(null);
      setShowUploadModal(false);
    } catch (error) {
      console.error("Error uploading photos:", error);
    } finally {
      setIsUploading(false);
    }
  };

  const generateAIPhotos = async (prompt: string, count: number = 4) => {
    setIsGenerating(true);
    try {
      // Simulate AI generation
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      const aiPhotos: Photo[] = Array.from({ length: count }, (_, index) => ({
        id: `ai-${Date.now()}-${index}`,
        filename: `ai-generated-${index + 1}.jpg`,
        url: `/images/ai-generated-${index + 1}.jpg`,
        alt: `AI gegenereerde afbeelding: ${prompt}`,
        category: "ai-generated",
        tags: ["ai", "generated", prompt.toLowerCase()],
        size: 1024000,
        dimensions: { width: 1200, height: 800 },
        uploadedAt: new Date().toISOString().split('T')[0],
        aiGenerated: true,
      }));
      
      setPhotos([...aiPhotos, ...photos]);
    } catch (error) {
      console.error("Error generating AI photos:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDeletePhoto = async (id: string) => {
    if (confirm("Weet je zeker dat je deze foto wilt verwijderen?")) {
      setPhotos(photos.filter(p => p.id !== id));
    }
  };

  const handleBulkDelete = async () => {
    if (confirm(`Weet je zeker dat je ${selectedPhotos.length} foto's wilt verwijderen?`)) {
      setPhotos(photos.filter(p => !selectedPhotos.includes(p.id)));
      setSelectedPhotos([]);
    }
  };

  const filteredPhotos = photos.filter(photo => {
    const matchesSearch = photo.filename.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         photo.alt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         photo.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === "all" || photo.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
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
              <button
                onClick={() => router.push("/admin")}
                className="flex items-center space-x-2 text-gray-600 hover:text-yannova-primary transition-colors"
              >
                <ArrowLeft size={20} />
                <span>Terug naar Dashboard</span>
              </button>
              <span className="text-gray-400">|</span>
              <h1 className="text-2xl font-bold text-yannova-primary">
                Foto Management
              </h1>
            </div>
            <button
              onClick={() => signOut({ callbackUrl: "/admin/login" })}
              className="text-gray-600 hover:text-red-600 transition-colors"
            >
              Uitloggen
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Totaal Foto's</p>
                <p className="text-3xl font-bold text-blue-600">{photos.length}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <ImageIcon className="text-blue-600" size={24} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">AI Gegenereerd</p>
                <p className="text-3xl font-bold text-purple-600">
                  {photos.filter(p => p.aiGenerated).length}
                </p>
              </div>
              <div className="bg-purple-100 p-3 rounded-full">
                <Bot className="text-purple-600" size={24} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Categorieën</p>
                <p className="text-3xl font-bold text-green-600">{categories.length}</p>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <Folder className="text-green-600" size={24} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Totale Grootte</p>
                <p className="text-3xl font-bold text-orange-600">
                  {formatFileSize(photos.reduce((sum, p) => sum + p.size, 0))}
                </p>
              </div>
              <div className="bg-orange-100 p-3 rounded-full">
                <Download className="text-orange-600" size={24} />
              </div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-4 flex-1">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Zoek foto's..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yannova-primary"
                />
              </div>

              {/* Category Filter */}
              <div className="flex items-center space-x-2">
                <Filter size={20} className="text-gray-400" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yannova-primary"
                  title="Filter op categorie"
                >
                  <option value="all">Alle Categorieën</option>
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.name} ({category.count})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              {/* View Mode */}
              <div className="flex border border-gray-300 rounded-lg">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 ${viewMode === "grid" ? "bg-yannova-primary text-white" : "text-gray-600"}`}
                  title="Grid weergave"
                >
                  <Grid3X3 size={20} />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 ${viewMode === "list" ? "bg-yannova-primary text-white" : "text-gray-600"}`}
                  title="Lijst weergave"
                >
                  <List size={20} />
                </button>
              </div>

              {/* Bulk Actions */}
              {selectedPhotos.length > 0 && (
                <button
                  onClick={handleBulkDelete}
                  className="bg-red-100 text-red-800 px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-red-200 transition-colors"
                >
                  <Trash2 size={20} />
                  <span>Verwijder ({selectedPhotos.length})</span>
                </button>
              )}

              {/* Upload Button */}
              <button
                onClick={() => setShowUploadModal(true)}
                className="bg-yannova-primary text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-yannova-primary/90 transition-colors"
              >
                <Upload size={20} />
                <span>Upload</span>
              </button>
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Categorieën</h3>
          <div className="flex flex-wrap gap-3">
            {categories.map(category => (
              <div
                key={category.id}
                className={`px-4 py-2 rounded-lg flex items-center space-x-2 cursor-pointer hover:opacity-80 transition-opacity ${
                  selectedCategory === category.id ? 'ring-2 ring-yannova-primary' : ''
                }`}
                onClick={() => setSelectedCategory(category.id)}
              >
                <div className={`w-3 h-3 rounded-full ${category.color.split(' ')[0]}`} />
                <span className="text-sm font-medium">{category.name}</span>
                <span className="text-xs text-gray-500">({category.count})</span>
              </div>
            ))}
          </div>
        </div>

        {/* Photos Grid/List */}
        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {filteredPhotos.map((photo) => (
              <div key={photo.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="relative aspect-square">
                  <Image
                    src={photo.url}
                    alt={photo.alt}
                    width={400}
                    height={300}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2">
                    <input
                      type="checkbox"
                      checked={selectedPhotos.includes(photo.id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedPhotos([...selectedPhotos, photo.id]);
                        } else {
                          setSelectedPhotos(selectedPhotos.filter(id => id !== photo.id));
                        }
                      }}
                      className="w-4 h-4 text-yannova-primary"
                      title="Selecteer foto"
                    />
                  </div>
                  {photo.aiGenerated && (
                    <div className="absolute top-2 left-2">
                      <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full">
                        AI
                      </span>
                    </div>
                  )}
                </div>
                <div className="p-3">
                  <h4 className="font-medium text-gray-900 text-sm truncate">{photo.filename}</h4>
                  <p className="text-xs text-gray-600 mt-1">{photo.dimensions.width}x{photo.dimensions.height}</p>
                  <p className="text-xs text-gray-500">{formatFileSize(photo.size)}</p>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {photo.tags.slice(0, 2).map((tag, index) => (
                      <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                        {tag}
                      </span>
                    ))}
                    {photo.tags.length > 2 && (
                      <span className="text-gray-500 text-xs">+{photo.tags.length - 2}</span>
                    )}
                  </div>
                  <div className="flex space-x-1 mt-2">
                  <button
                    onClick={() => setEditingPhoto(photo)}
                    className="flex-1 bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs hover:bg-blue-200 transition-colors"
                    title="Foto bewerken"
                  >
                    <Edit size={12} />
                  </button>
                  <button
                    onClick={() => handleDeletePhoto(photo.id)}
                    className="flex-1 bg-red-100 text-red-800 px-2 py-1 rounded text-xs hover:bg-red-200 transition-colors"
                    title="Foto verwijderen"
                  >
                    <Trash2 size={12} />
                  </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        <input
                          type="checkbox"
                          checked={selectedPhotos.length === filteredPhotos.length}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedPhotos(filteredPhotos.map(p => p.id));
                            } else {
                              setSelectedPhotos([]);
                            }
                          }}
                          className="w-4 h-4 text-yannova-primary"
                          title="Selecteer alle foto's"
                        />
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Foto</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bestandsnaam</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Categorie</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Grootte</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tags</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acties</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredPhotos.map((photo) => (
                    <tr key={photo.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <input
                          type="checkbox"
                          checked={selectedPhotos.includes(photo.id)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedPhotos([...selectedPhotos, photo.id]);
                            } else {
                              setSelectedPhotos(selectedPhotos.filter(id => id !== photo.id));
                            }
                          }}
                          className="w-4 h-4 text-yannova-primary"
                          title="Selecteer foto"
                        />
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <Image
                            src={photo.url}
                            alt={photo.alt}
                            width={64}
                            height={64}
                            className="w-16 h-16 object-cover rounded"
                          />
                          {photo.aiGenerated && (
                            <span className="ml-2 bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full">
                              AI
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{photo.filename}</div>
                          <div className="text-sm text-gray-500">{photo.alt}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          categories.find(c => c.id === photo.category)?.color || 'bg-gray-100 text-gray-800'
                        }`}>
                          {categories.find(c => c.id === photo.category)?.name || photo.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {formatFileSize(photo.size)}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-1">
                          {photo.tags.slice(0, 3).map((tag, index) => (
                            <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                              {tag}
                            </span>
                          ))}
                          {photo.tags.length > 3 && (
                            <span className="text-gray-500 text-xs">+{photo.tags.length - 3}</span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => setEditingPhoto(photo)}
                            className="text-blue-600 hover:text-blue-800"
                            title="Foto bewerken"
                          >
                            <Edit size={16} />
                          </button>
                          <button
                            onClick={() => handleDeletePhoto(photo.id)}
                            className="text-red-600 hover:text-red-800"
                            title="Foto verwijderen"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {filteredPhotos.length === 0 && (
          <div className="text-center py-12">
            <ImageIcon className="mx-auto text-gray-400" size={48} />
            <h3 className="mt-4 text-lg font-medium text-gray-900">Geen foto's gevonden</h3>
            <p className="mt-2 text-gray-600">Probeer je zoekterm aan te passen of upload nieuwe foto's.</p>
          </div>
        )}
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-xl shadow-2xl p-6 max-w-2xl w-full">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Foto's Uploaden</h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Selecteer Foto's</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <Upload className="mx-auto text-gray-400" size={48} />
                  <p className="mt-2 text-sm text-gray-600">Sleep foto's hierheen of klik om te selecteren</p>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={(e) => setUploadFiles(e.target.files)}
                    className="mt-4"
                    title="Selecteer foto's om te uploaden"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">AI Foto's Genereren</label>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    placeholder="Beschrijf de foto's die je wilt genereren..."
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yannova-primary"
                    title="Beschrijf de foto's die je wilt genereren"
                  />
                  <button
                    onClick={() => generateAIPhotos("moderne bouw project")}
                    disabled={isGenerating}
                    className="bg-purple-100 text-purple-800 px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-purple-200 transition-colors disabled:opacity-50"
                  >
                    {isGenerating ? (
                      <>
                        <Loader2 className="animate-spin" size={20} />
                        <span>Genereren...</span>
                      </>
                    ) : (
                      <>
                        <Bot size={20} />
                        <span>AI Genereren</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowUploadModal(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                Annuleren
              </button>
              <button
                onClick={handleUpload}
                disabled={!uploadFiles || isUploading}
                className="bg-yannova-primary text-white px-6 py-2 rounded-lg flex items-center space-x-2 hover:bg-yannova-primary/90 transition-colors disabled:opacity-50"
              >
                {isUploading ? (
                  <>
                    <Loader2 className="animate-spin" size={20} />
                    <span>Uploaden...</span>
                  </>
                ) : (
                  <>
                    <Upload size={20} />
                    <span>Uploaden</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
