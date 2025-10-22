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
import { useToast } from "@/components/ui/Toaster";

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
  projectId?: string;
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
  const [editingPhoto, setEditingPhoto] = useState<Photo | null>(null);
  const [uploadCategory, setUploadCategory] = useState<string>("nieuwbouw");
  const [uploadProjectId, setUploadProjectId] = useState<string>("");
  const [dragOver, setDragOver] = useState(false);
  const [aiPrompt, setAiPrompt] = useState<string>("");
  const { show } = useToast();

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
      const response = await fetch('/api/photos', { cache: 'no-store' });
      if (!response.ok) {
        throw new Error('Failed to fetch photos');
      }
      const data: Photo[] = await response.json();
      setPhotos(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error loading photos:", error);
      // Fallback naar mock data als API niet werkt
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
      ];
      setPhotos(mockPhotos);
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

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      setUploadFiles(files);
      setShowUploadModal(true);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setUploadFiles(e.target.files);
    }
  };

  const handleUpload = async () => {
    if (!uploadFiles) return;
    
    setIsUploading(true);
    try {
      const uploadPromises = Array.from(uploadFiles).map(async (file) => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('category', uploadCategory);
        formData.append('alt', file.name.split('.')[0]);
        formData.append('tags', 'uploaded,admin');
        if (uploadProjectId) {
          formData.append('projectId', uploadProjectId);
        }
        
        const response = await fetch('/api/photos', {
          method: 'POST',
          body: formData,
        });
        
        if (!response.ok) {
          throw new Error(`Failed to upload ${file.name}`);
        }
        
        return response.json();
      });
      
      const uploadedPhotos = await Promise.all(uploadPromises);
      setPhotos([...uploadedPhotos, ...photos]);
      setUploadFiles(null);
      setUploadCategory("nieuwbouw");
      setUploadProjectId("");
      setShowUploadModal(false);
      
      // Reload photos om zeker te zijn dat alles gesynchroniseerd is
      await loadPhotos();
      
    } catch (error) {
      console.error("Error uploading photos:", error);
      show({ type: "error", title: "Upload mislukt", message: "Er ging iets mis. Probeer opnieuw." });
    } finally {
      setIsUploading(false);
    }
  };

  const assignPhotoToProject = async (photoId: string, projectId: string) => {
    try {
      const response = await fetch('/api/photos', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ id: photoId, projectId }),
      });

      if (!response.ok) throw new Error('Failed to assign photo to project');

      setPhotos(prev => prev.map(photo => photo.id === photoId ? { ...photo, projectId } : photo));
      await updateProjectImages(projectId, photoId);
    } catch (error) {
      console.error("Error assigning photo to project:", error);
      show({ type: "error", title: "Koppelen mislukt", message: "Foto kon niet aan project gekoppeld worden." });
    }
  };

  const updateProjectImages = async (projectId: string, photoId: string) => {
    try {
      const photo = photos.find(p => p.id === photoId);
      if (!photo) return;

      const projectResponse = await fetch('/api/projects', { cache: 'no-store' });
      if (!projectResponse.ok) return;
      const projects = await projectResponse.json();
      const project = projects.find((p: any) => p.id === projectId);

      if (project) {
        const images = Array.isArray(project.images) ? project.images : [];
        const updatedImages = images.includes(photo.url) ? images : [...images, photo.url];

        await fetch('/api/projects', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id: projectId, images: updatedImages }),
        });
      }
    } catch (error) {
      console.error("Error updating project images:", error);
    }
  };

  const generateAIPhotos = async (prompt: string, count: number = 4) => {
    setIsGenerating(true);
    try {
      // Gebruik de nieuwe Gemini API voor afbeelding generatie
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: prompt,
          generateImages: true,
          imageCount: count
        }),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('AI generation response:', result);
        
        // Als AI generatie succesvol is, voeg foto's toe
        if (result.images && result.images.length > 0) {
          const aiPhotos: Photo[] = result.images.map((imageUrl: string, index: number) => ({
            id: `ai-${Date.now()}-${index}`,
            filename: `ai-generated-${index + 1}.jpg`,
            url: imageUrl,
            alt: `AI gegenereerde afbeelding: ${prompt}`,
            category: uploadCategory || "ai-generated",
            tags: ["ai", "generated", prompt.toLowerCase()],
            size: 1024000,
            dimensions: { width: 1200, height: 800 },
            uploadedAt: new Date().toISOString().split('T')[0],
            aiGenerated: true,
            projectId: uploadProjectId || undefined
          }));
          
          setPhotos([...aiPhotos, ...photos]);
          show({ type: "success", title: "AI gegenereerd", message: `${aiPhotos.length} afbeeldingen toegevoegd.` });
        } else {
          throw new Error('Geen afbeeldingen gegenereerd');
        }
      } else {
        throw new Error('AI generatie API niet beschikbaar');
      }
    } catch (error) {
      console.error("Error generating AI photos:", error);
      show({ type: "error", title: "AI generatie niet beschikbaar", message: "Er worden placeholders toegevoegd." });

      // Fallback naar placeholder generatie
      console.log("Fallback naar placeholder generatie...");
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const aiPhotos: Photo[] = Array.from({ length: count }, (_, index) => ({
        id: `ai-${Date.now()}-${index}`,
        filename: `ai-placeholder-${index + 1}.jpg`,
        url: `/images/projects/project-${(index % 5) + 1}-${uploadCategory || 'nieuwbouw'}.jpg`, // Gebruik bestaande afbeeldingen als placeholder
        alt: `AI gegenereerde afbeelding: ${prompt}`,
        category: uploadCategory || "ai-generated",
        tags: ["ai", "generated", prompt.toLowerCase()],
        size: 1024000,
        dimensions: { width: 1200, height: 800 },
        uploadedAt: new Date().toISOString().split('T')[0],
        aiGenerated: true,
        projectId: uploadProjectId || undefined
      }));
      
      setPhotos([...aiPhotos, ...photos]);
      show({ type: "info", title: "Placeholders toegevoegd", message: `${aiPhotos.length} afbeeldingen toegevoegd.` });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDeletePhoto = async (id: string) => {
    if (confirm("Weet je zeker dat je deze foto wilt verwijderen?")) {
      setPhotos(photos.filter(p => p.id !== id));
      show({ type: "success", title: "Foto verwijderd", message: "De foto is verwijderd." });
    }
  };

  const handleBulkDelete = async () => {
    if (confirm(`Weet je zeker dat je ${selectedPhotos.length} foto's wilt verwijderen?`)) {
      setPhotos(photos.filter(p => !selectedPhotos.includes(p.id)));
      setSelectedPhotos([]);
      show({ type: "success", title: "Verwijderd", message: `${selectedPhotos.length} foto's verwijderd.` });
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

  const handleExport = async (format: 'csv' | 'json') => {
    try {
      const exportData = photos.map(photo => ({
        id: photo.id,
        filename: photo.filename,
        url: photo.url,
        alt: photo.alt,
        category: photo.category,
        tags: photo.tags.join(', '),
        size: photo.size,
        dimensions: `${photo.dimensions.width}x${photo.dimensions.height}`,
        uploadedAt: photo.uploadedAt,
        aiGenerated: photo.aiGenerated,
        projectId: photo.projectId || 'Geen project'
      }));

      let content: string;
      let filename: string;
      let mimeType: string;

      if (format === 'csv') {
        const headers = Object.keys(exportData[0]).join(',');
        const rows = exportData.map(row => Object.values(row).map(value => `"${value}"`).join(','));
        content = [headers, ...rows].join('\n');
        filename = `fotos-export-${new Date().toISOString().split('T')[0]}.csv`;
        mimeType = 'text/csv';
      } else {
        content = JSON.stringify(exportData, null, 2);
        filename = `fotos-export-${new Date().toISOString().split('T')[0]}.json`;
        mimeType = 'application/json';
      }

      const blob = new Blob([content], { type: mimeType });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error exporting photos:", error);
      show({ type: "error", title: "Export mislukt", message: "Kon geen exportbestand genereren." });
    }
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Foto Management</h1>
          <p className="text-sm text-gray-600">Upload, beheer en koppel foto’s aan projecten.</p>
        </div>
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

              {/* Export Dropdown */}
              <div className="relative">
                <details className="group">
                  <summary className="list-none">
                    <button className="bg-gray-100 text-gray-800 px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-gray-200 transition-colors">
                      <Download size={20} />
                      <span>Export</span>
                    </button>
                  </summary>
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
                    <button
                      onClick={() => handleExport('csv')}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-t-lg"
                    >
                      Export als CSV
                    </button>
                    <button
                      onClick={() => handleExport('json')}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-b-lg"
                    >
                      Export als JSON
                    </button>
                  </div>
                </details>
              </div>

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
          <div 
            className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 p-6 rounded-lg border-2 border-dashed transition-colors ${
              dragOver 
                ? 'border-yannova-primary bg-yannova-primary/5' 
                : 'border-gray-300 hover:border-gray-400'
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
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
                  
                  {/* Project Assignment */}
                  <div className="mt-3 pt-2 border-t border-gray-100">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-600">Project:</span>
                      <select
                        value={photo.projectId || ''}
                        onChange={(e) => {
                          if (e.target.value) {
                            assignPhotoToProject(photo.id, e.target.value);
                          }
                        }}
                        className="text-xs border border-gray-300 rounded px-1 py-0.5 focus:outline-none focus:ring-1 focus:ring-yannova-primary"
                        title="Selecteer project voor deze foto"
                      >
                        <option value="">Geen project</option>
                        <option value="1">Moderne Villa Keerbergen</option>
                        <option value="2">Badkamer Renovatie Mechelen</option>
                        <option value="3">Crepi Gevelafwerking Putte</option>
                        <option value="4">Ramen en Deuren Renovatie</option>
                        <option value="5">Keuken Renovatie Project</option>
                      </select>
                    </div>
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
                <div 
                  className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                    dragOver 
                      ? 'border-yannova-primary bg-yannova-primary/5' 
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                >
                  <Upload className="mx-auto text-gray-400" size={48} />
                  <p className="mt-2 text-sm text-gray-600">Sleep foto's hierheen of klik om te selecteren</p>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleFileSelect}
                    className="mt-4"
                    title="Selecteer foto's om te uploaden"
                  />
                  {uploadFiles && (
                    <div className="mt-4">
                      <p className="text-sm text-gray-600">
                        {uploadFiles.length} foto(s) geselecteerd
                      </p>
                      <div className="mt-2 space-y-1">
                        {Array.from(uploadFiles).map((file, index) => (
                          <p key={index} className="text-xs text-gray-500">
                            {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
                          </p>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Categorie</label>
                <select
                  value={uploadCategory}
                  onChange={(e) => setUploadCategory(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yannova-primary"
                  title="Selecteer categorie voor de foto's"
                >
                  <option value="nieuwbouw">Nieuwbouw</option>
                  <option value="renovatie">Renovatie</option>
                  <option value="gevelwerk">Gevelwerk</option>
                  <option value="ramen-deuren">Ramen & Deuren</option>
                  <option value="verbouwing">Verbouwing</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Koppel aan Project (optioneel)</label>
                <select
                  value={uploadProjectId}
                  onChange={(e) => setUploadProjectId(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yannova-primary"
                  title="Selecteer project om foto's aan te koppelen"
                >
                  <option value="">Geen project</option>
                  <option value="1">Moderne Villa Keerbergen</option>
                  <option value="2">Badkamer Renovatie Mechelen</option>
                  <option value="3">Crepi Gevelafwerking Putte</option>
                  <option value="4">Ramen en Deuren Renovatie</option>
                  <option value="5">Keuken Renovatie Project</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">AI Foto's Genereren</label>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={aiPrompt}
                    onChange={(e) => setAiPrompt(e.target.value)}
                    placeholder="Beschrijf de foto's die je wilt genereren..."
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yannova-primary"
                    title="Beschrijf de foto's die je wilt genereren"
                  />
                  <button
                    onClick={() => generateAIPhotos(aiPrompt || "moderne bouw project")}
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
