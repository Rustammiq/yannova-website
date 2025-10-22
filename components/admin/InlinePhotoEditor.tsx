"use client";

import React, { useState, useRef, useEffect } from 'react';
import { useAdmin } from '@/lib/adminContext';
import { Button } from '@/components/ui/Button';
import dynamic from 'next/dynamic';
import { 
  Upload, 
  Trash2, 
  Edit, 
  Image as ImageIcon, 
  X, 
  Check, 
  Loader2,
  Plus
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

interface InlinePhotoEditorProps {
  photos: Photo[];
  onPhotosUpdate: (photos: Photo[]) => void;
  className?: string;
  maxPhotos?: number;
  category?: string;
  aspectRatio?: string;
}

const InlinePhotoEditor: React.FC<InlinePhotoEditorProps> = ({
  photos = [],
  onPhotosUpdate,
  className = "",
  maxPhotos = 6,
  category = "gallery",
  aspectRatio = "aspect-square"
}) => {
  const { isAdmin, isEditing } = useAdmin();
  const [isUploading, setIsUploading] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [editingPhoto, setEditingPhoto] = useState<Photo | null>(null);
  const [mounted, setMounted] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Upload photo
  const handleUpload = async (files: FileList) => {
    if (!files.length) return;

    setIsUploading(true);
    try {
      const uploadPromises = Array.from(files).map(async (file) => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('category', category);

        const response = await fetch('/api/photos', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          throw new Error(`Failed to upload ${file.name}`);
        }

        return response.json();
      });

      const newPhotos = await Promise.all(uploadPromises);
      const updatedPhotos = [...photos, ...newPhotos].slice(0, maxPhotos);
      
      onPhotosUpdate(updatedPhotos);
      toast.success(`${newPhotos.length} foto(s) toegevoegd!`);
      setShowUploadModal(false);
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Fout bij uploaden van foto\'s');
    } finally {
      setIsUploading(false);
    }
  };

  // Delete photo
  const handleDelete = async (photoId: string) => {
    try {
      const response = await fetch('/api/photos', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ photoIds: [photoId] }),
      });

      if (!response.ok) {
        throw new Error('Failed to delete photo');
      }

      const updatedPhotos = photos.filter(photo => photo.id !== photoId);
      onPhotosUpdate(updatedPhotos);
      toast.success('Foto verwijderd!');
    } catch (error) {
      console.error('Delete error:', error);
      toast.error('Fout bij verwijderen van foto');
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

      const updatedPhotos = photos.map(p => p.id === photo.id ? photo : p);
      onPhotosUpdate(updatedPhotos);
      setEditingPhoto(null);
      toast.success('Foto bijgewerkt!');
    } catch (error) {
      console.error('Update error:', error);
      toast.error('Fout bij bijwerken van foto');
    }
  };

  // Prevent hydration mismatch
  if (!mounted) {
    return (
      <div className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ${className}`}>
        {photos.map((photo) => (
          <div key={photo.id} className={`${aspectRatio} relative overflow-hidden rounded-lg`}>
            <Image
              src={photo.url}
              alt={photo.alt}
              width={300}
              height={300}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
    );
  }

  if (!isAdmin || !isEditing) {
    return (
      <div className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ${className}`}>
        {photos.map((photo) => (
          <div key={photo.id} className={`${aspectRatio} relative overflow-hidden rounded-lg`}>
            <Image
              src={photo.url}
              alt={photo.alt}
              width={300}
              height={300}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Photo Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {photos.map((photo) => (
          <div key={photo.id} className={`${aspectRatio} relative overflow-hidden rounded-lg border-2 border-gray-300 group`}>
            <Image
              src={photo.url}
              alt={photo.alt}
              width={300}
              height={300}
              className="w-full h-full object-cover"
            />
            
            {/* Overlay with controls */}
            <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
              <div className="flex gap-2">
                <button
                  onClick={() => setEditingPhoto(photo)}
                  className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
                  title="Bewerken"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(photo.id)}
                  className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                  title="Verwijderen"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
        
        {/* Add Photo Button */}
        {photos.length < maxPhotos && (
          <button
            onClick={() => setShowUploadModal(true)}
            className={`${aspectRatio} border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center hover:border-yannova-primary hover:bg-yannova-primary/5 transition-colors`}
          >
            <Plus className="w-8 h-8 text-gray-400 mb-2" />
            <span className="text-sm text-gray-600">Foto Toevoegen</span>
          </button>
        )}
      </div>

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
              <p className="text-gray-600 mb-4">
                Upload maximaal {maxPhotos - photos.length} foto(s)
              </p>
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/*"
                onChange={(e) => e.target.files && handleUpload(e.target.files)}
                className="hidden"
              />
              <Button 
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploading}
              >
                {isUploading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Uploaden...
                  </>
                ) : (
                  <>
                    <Upload className="w-4 h-4 mr-2" />
                    Bestanden Selecteren
                  </>
                )}
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

export default InlinePhotoEditor;
