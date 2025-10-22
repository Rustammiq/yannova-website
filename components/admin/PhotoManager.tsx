"use client";

import React, { useState, useEffect, useRef } from 'react';
import { useAdmin } from '@/lib/adminContext';
import { Button } from '@/components/ui/Button';
import { 
  Upload, 
  Trash2, 
  Edit, 
  Search, 
  Filter, 
  Grid3X3, 
  List,
  Folder,
  Image as ImageIcon,
  X,
  Check,
  AlertCircle
} from 'lucide-react';
import Image from 'next/image';
import { toast } from 'sonner';

interface Photo {
  id: string;
  filename: string;
  url: string;
  title?: string;
  description?: string;
  alt: string;
  category: string;
  tags: string[];
  size: number;
  dimensions: { width: number; height: number };
  uploadedAt: string;
  aiGenerated: boolean;
  projectId?: string;
}

interface PhotoManagerProps {
  onPhotoUpdate?: () => void;
}

const PhotoManager: React.FC<PhotoManagerProps> = ({ onPhotoUpdate }) => {
  const { isAdmin, isEditing } = useAdmin();
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPhotos, setSelectedPhotos] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [editingPhoto, setEditingPhoto] = useState<Photo | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Categories
  const categories = [
    { id: 'all', name: 'Alle Foto\'s', count: photos.length },
    { id: 'projects', name: 'Projecten', count: photos.filter(p => p.category === 'projects').length },
    { id: 'gallery', name: 'Galerij', count: photos.filter(p => p.category === 'gallery').length },
    { id: 'uploads', name: 'Uploads', count: photos.filter(p => p.category === 'uploads').length },
    { id: 'hero', name: 'Hero Afbeeldingen', count: photos.filter(p => p.category === 'hero').length },
  ];

  // Load photos
  const loadPhotos = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/photos');
      if (response.ok) {
        const data = await response.json();
        setPhotos(data.photos || []);
      } else {
        throw new Error('Failed to load photos');
      }
    } catch (error) {
      console.error('Error loading photos:', error);
      toast.error('Fout bij het laden van foto\'s');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAdmin) {
      loadPhotos();
    }
  }, [isAdmin]);

  // Filter photos
  const filteredPhotos = photos.filter(photo => {
    const matchesSearch = photo.filename.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         photo.alt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         photo.title?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || photo.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  // Upload photo
  const handleUpload = async (files: FileList) => {
    if (!files.length) return;

    setUploading(true);
    try {
      for (const file of Array.from(files)) {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('category', 'uploads');

        const response = await fetch('/api/photos', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          throw new Error(`Failed to upload ${file.name}`);
        }
      }

      toast.success(`${files.length} foto(s) succesvol geüpload!`);
      await loadPhotos();
      onPhotoUpdate?.();
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Fout bij uploaden van foto\'s');
    } finally {
      setUploading(false);
      setShowUploadModal(false);
    }
  };

  // Delete photos
  const handleDelete = async (photoIds: string[]) => {
    if (!photoIds.length) return;

    try {
      const response = await fetch('/api/photos', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ photoIds }),
      });

      if (!response.ok) {
        throw new Error('Failed to delete photos');
      }

      toast.success(`${photoIds.length} foto(s) verwijderd!`);
      await loadPhotos();
      setSelectedPhotos([]);
      onPhotoUpdate?.();
    } catch (error) {
      console.error('Delete error:', error);
      toast.error('Fout bij verwijderen van foto\'s');
    }
  };

  // Update photo
  const handleUpdatePhoto = async (photo: Photo) => {
    try {
      const response = await fetch('/api/photos', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(photo),
      });

      if (!response.ok) {
        throw new Error('Failed to update photo');
      }

      toast.success('Foto bijgewerkt!');
      await loadPhotos();
      setEditingPhoto(null);
      onPhotoUpdate?.();
    } catch (error) {
      console.error('Update error:', error);
      toast.error('Fout bij bijwerken van foto');
    }
  };

  if (!isAdmin) {
    return (
      <div className="text-center py-8">
        <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
        <p className="text-gray-600">Alleen admin gebruikers kunnen foto's beheren.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Foto Beheer</h2>
          <p className="text-gray-600">Beheer alle foto's op de website</p>
        </div>
        
        <div className="flex gap-2">
          <Button
            onClick={() => setShowUploadModal(true)}
            className="flex items-center gap-2"
            disabled={uploading}
          >
            <Upload className="w-4 h-4" />
            {uploading ? 'Uploaden...' : 'Foto\'s Uploaden'}
          </Button>
          
          {selectedPhotos.length > 0 && (
            <Button
              onClick={() => handleDelete(selectedPhotos)}
              variant="destructive"
              className="flex items-center gap-2"
            >
              <Trash2 className="w-4 h-4" />
              Verwijderen ({selectedPhotos.length})
            </Button>
          )}
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Zoek foto's..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yannova-primary focus:border-yannova-primary"
            />
          </div>
        </div>
        
        <div className="flex gap-2">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yannova-primary focus:border-yannova-primary"
          >
            {categories.map(category => (
              <option key={category.id} value={category.id}>
                {category.name} ({category.count})
              </option>
            ))}
          </select>
          
          <div className="flex border border-gray-300 rounded-lg overflow-hidden">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 ${viewMode === 'grid' ? 'bg-yannova-primary text-white' : 'bg-white text-gray-600'}`}
            >
              <Grid3X3 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 ${viewMode === 'list' ? 'bg-yannova-primary text-white' : 'bg-white text-gray-600'}`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Photos Grid/List */}
      {loading ? (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yannova-primary mx-auto"></div>
          <p className="mt-2 text-gray-600">Foto's laden...</p>
        </div>
      ) : filteredPhotos.length === 0 ? (
        <div className="text-center py-12">
          <ImageIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Geen foto's gevonden</h3>
          <p className="text-gray-600 mb-4">
            {searchTerm || categoryFilter !== 'all' 
              ? 'Probeer andere zoektermen of filters.' 
              : 'Upload je eerste foto om te beginnen.'}
          </p>
          <Button onClick={() => setShowUploadModal(true)}>
            <Upload className="w-4 h-4 mr-2" />
            Foto Uploaden
          </Button>
        </div>
      ) : (
        <div className={viewMode === 'grid' 
          ? 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6'
          : 'space-y-4'
        }>
          {filteredPhotos.map((photo) => (
            <div key={photo.id} className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200">
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
                    className="w-4 h-4 text-yannova-primary rounded"
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
              
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-medium text-gray-900 truncate">{photo.filename}</h4>
                  <button
                    onClick={() => setEditingPhoto(photo)}
                    className="text-gray-400 hover:text-yannova-primary"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                </div>
                
                <div className="text-sm text-gray-600 space-y-1">
                  <p><span className="font-medium">Categorie:</span> {photo.category}</p>
                  <p><span className="font-medium">Grootte:</span> {(photo.size / 1024 / 1024).toFixed(2)} MB</p>
                  <p><span className="font-medium">Afmetingen:</span> {photo.dimensions.width} × {photo.dimensions.height}</p>
                  <p><span className="font-medium">Geüpload:</span> {new Date(photo.uploadedAt).toLocaleDateString('nl-NL')}</p>
                </div>
                
                {photo.tags.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-1">
                    {photo.tags.map((tag, index) => (
                      <span key={index} className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Foto's Uploaden</h3>
              <button
                onClick={() => setShowUploadModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 mb-4">Sleep foto's hierheen of klik om te selecteren</p>
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/*"
                onChange={(e) => e.target.files && handleUpload(e.target.files)}
                className="hidden"
              />
              <Button onClick={() => fileInputRef.current?.click()}>
                Bestanden Selecteren
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Photo Modal */}
      {editingPhoto && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Foto Bewerken</h3>
              <button
                onClick={() => setEditingPhoto(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Titel</label>
                <input
                  type="text"
                  value={editingPhoto.title || ''}
                  onChange={(e) => setEditingPhoto({...editingPhoto, title: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yannova-primary focus:border-yannova-primary"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Beschrijving</label>
                <textarea
                  value={editingPhoto.description || ''}
                  onChange={(e) => setEditingPhoto({...editingPhoto, description: e.target.value})}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yannova-primary focus:border-yannova-primary"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Alt Tekst</label>
                <input
                  type="text"
                  value={editingPhoto.alt}
                  onChange={(e) => setEditingPhoto({...editingPhoto, alt: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yannova-primary focus:border-yannova-primary"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Categorie</label>
                <select
                  value={editingPhoto.category}
                  onChange={(e) => setEditingPhoto({...editingPhoto, category: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yannova-primary focus:border-yannova-primary"
                >
                  <option value="projects">Projecten</option>
                  <option value="gallery">Galerij</option>
                  <option value="uploads">Uploads</option>
                  <option value="hero">Hero Afbeeldingen</option>
                </select>
              </div>
              
              <div className="flex gap-2 pt-4">
                <Button
                  onClick={() => handleUpdatePhoto(editingPhoto)}
                  className="flex-1"
                >
                  <Check className="w-4 h-4 mr-2" />
                  Opslaan
                </Button>
                <Button
                  onClick={() => setEditingPhoto(null)}
                  variant="outline"
                  className="flex-1"
                >
                  Annuleren
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PhotoManager;
