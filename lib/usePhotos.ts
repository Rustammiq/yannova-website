"use client";

import { useState, useEffect, useCallback } from 'react';
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

interface UsePhotosOptions {
  category?: string;
  limit?: number;
}

export function usePhotos({ category, limit }: UsePhotosOptions = {}) {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadPhotos = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/photos');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      let allPhotos = data.photos || [];
      
      // Filter by category if specified
      if (category) {
        allPhotos = allPhotos.filter((photo: Photo) => photo.category === category);
      }
      
      // Apply limit if specified
      if (limit) {
        allPhotos = allPhotos.slice(0, limit);
      }
      
      setPhotos(allPhotos);
    } catch (err) {
      console.error("Error loading photos:", err);
      setError("Kon foto's niet laden.");
      setPhotos([]);
    } finally {
      setIsLoading(false);
    }
  }, [category, limit]);

  useEffect(() => {
    loadPhotos();
  }, [loadPhotos]);

  const updatePhotos = useCallback((newPhotos: Photo[]) => {
    setPhotos(newPhotos);
  }, []);

  const addPhoto = useCallback((photo: Photo) => {
    setPhotos(prev => [photo, ...prev]);
  }, []);

  const removePhoto = useCallback((photoId: string) => {
    setPhotos(prev => prev.filter(photo => photo.id !== photoId));
  }, []);

  const updatePhoto = useCallback((updatedPhoto: Photo) => {
    setPhotos(prev => prev.map(photo => 
      photo.id === updatedPhoto.id ? updatedPhoto : photo
    ));
  }, []);

  return { 
    photos, 
    isLoading, 
    error, 
    loadPhotos, 
    updatePhotos, 
    addPhoto, 
    removePhoto, 
    updatePhoto 
  };
}
