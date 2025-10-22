import fetch from 'node-fetch';
import fs from 'fs';
import path from 'path';
import FormData from 'form-data';
import {
  YannovaPhoto,
  CreatePhotoRequest,
  UpdatePhotoRequest,
  PhotoFilter,
  PhotoStats,
  GenerateImageRequest,
  GeneratedImage,
  PhotoAnalysis
} from './types.js';

export class YannovaPhotosApiClient {
  private baseUrl: string;

  constructor(baseUrl: string = 'http://localhost:3000') {
    this.baseUrl = baseUrl;
  }

  async getPhotos(): Promise<YannovaPhoto[]> {
    const response = await fetch(`${this.baseUrl}/api/photos`);

    if (!response.ok) {
      throw new Error(`Photos API error: ${response.status} ${response.statusText}`);
    }

    return (await response.json()) as YannovaPhoto[];
  }

  async getPhoto(id: string): Promise<YannovaPhoto> {
    const photos = await this.getPhotos();
    const photo = photos.find(p => p.id === id);

    if (!photo) {
      throw new Error(`Photo with id ${id} not found`);
    }

    return photo;
  }

  async createPhoto(request: CreatePhotoRequest): Promise<YannovaPhoto> {
    const formData = new FormData();

    if (request.file) {
      // If file is base64, convert to buffer
      if (request.file.startsWith('data:')) {
        const base64Data = request.file.split(',')[1];
        const buffer = Buffer.from(base64Data, 'base64');
        formData.append('file', buffer, request.filename || 'uploaded-image.jpg');
      } else {
        // Assume it's a file path
        const buffer = fs.readFileSync(request.file);
        const filename = request.filename || path.basename(request.file);
        formData.append('file', buffer, filename);
      }
    }

    if (request.alt) formData.append('alt', request.alt);
    if (request.category) formData.append('category', request.category);
    if (request.tags) formData.append('tags', request.tags.join(','));
    if (request.projectId) formData.append('projectId', request.projectId);

    const response = await fetch(`${this.baseUrl}/api/photos`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Create photo API error: ${response.status} ${response.statusText}`);
    }

    return (await response.json()) as YannovaPhoto;
  }

  async updatePhoto(request: UpdatePhotoRequest): Promise<YannovaPhoto> {
    const response = await fetch(`${this.baseUrl}/api/photos`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      throw new Error(`Update photo API error: ${response.status} ${response.statusText}`);
    }

    return (await response.json()) as YannovaPhoto;
  }

  async deletePhoto(id: string): Promise<void> {
    const response = await fetch(`${this.baseUrl}/api/photos?id=${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error(`Delete photo API error: ${response.status} ${response.statusText}`);
    }
  }

  async getPhotosByFilter(filter: PhotoFilter): Promise<YannovaPhoto[]> {
    const photos = await this.getPhotos();

    return photos.filter(photo => {
      if (filter.category && photo.category !== filter.category) return false;
      if (filter.aiGenerated !== undefined && photo.aiGenerated !== filter.aiGenerated) return false;
      if (filter.projectId && photo.projectId !== filter.projectId) return false;
      if (filter.tags && filter.tags.length > 0) {
        const hasMatchingTag = filter.tags.some(tag =>
          photo.tags.some(photoTag => photoTag.toLowerCase().includes(tag.toLowerCase()))
        );
        if (!hasMatchingTag) return false;
      }

      return true;
    });
  }

  async getPhotoStats(): Promise<PhotoStats> {
    const photos = await this.getPhotos();

    const stats: PhotoStats = {
      total: photos.length,
      aiGenerated: photos.filter(p => p.aiGenerated).length,
      uploaded: photos.filter(p => !p.aiGenerated).length,
      categories: [],
      totalSize: '0 MB',
      averageSize: '0 MB'
    };

    if (photos.length > 0) {
      const totalSizeBytes = photos.reduce((sum, photo) => sum + photo.size, 0);
      const totalSizeMB = totalSizeBytes / (1024 * 1024);
      const averageSizeMB = totalSizeMB / photos.length;

      stats.totalSize = `${totalSizeMB.toFixed(1)} MB`;
      stats.averageSize = `${averageSizeMB.toFixed(1)} MB`;

      stats.categories = [...new Set(photos.map(p => p.category))];
    }

    return stats;
  }

  async generateImages(request: GenerateImageRequest): Promise<GeneratedImage[]> {
    const response = await fetch(`${this.baseUrl}/api/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: request.prompt,
        generateImages: true,
        imageCount: request.count || 4,
        history: [
          {
            role: 'user',
            content: 'Je bent een AI assistent voor Yannova Bouw. Genereer professionele bouwafbeeldingen gebaseerd op de volgende prompt.'
          }
        ]
      }),
    });

    if (!response.ok) {
      throw new Error(`Generate images API error: ${response.status} ${response.statusText}`);
    }

    const result = await response.json() as any;

    return (result.images || []).map((url: string, index: number) => ({
      url,
      prompt: request.prompt,
      style: request.style || 'modern',
      category: request.category || 'general',
      createdAt: new Date().toISOString()
    }));
  }

  async analyzePhoto(photoId: string): Promise<PhotoAnalysis> {
    const photo = await this.getPhoto(photoId);

    // Generate analysis using AI
    const analysisPrompt = `Analyseer deze bouwfoto en geef een gedetailleerde beschrijving:

Foto: ${photo.filename}
Category: ${photo.category}
Tags: ${photo.tags.join(', ')}

Geef:
1. Een beschrijvende tekst van wat er te zien is
2. Relevante tags voor de bouwsector
3. De juiste category (nieuwbouw, renovatie, crepi, ramen-deuren, badkamer, keuken)
4. De sfeer/mood van de foto
5. Dominante kleuren
6. Compositie/techniek opmerkingen

Formaat: JSON met description, tags, category, mood, colors, composition`;

    const response = await fetch(`${this.baseUrl}/api/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: analysisPrompt,
        history: [
          {
            role: 'user',
            content: 'Je bent een bouwfotografie expert. Analyseer bouwproject foto\'s en geef professionele feedback in JSON formaat.'
          }
        ]
      }),
    });

    if (!response.ok) {
      throw new Error(`Analyze photo API error: ${response.status} ${response.statusText}`);
    }

    const result = await response.json() as any;

    try {
      return JSON.parse(result.response) as PhotoAnalysis;
    } catch (error) {
      // Fallback if AI doesn't return valid JSON
      return {
        description: result.response,
        tags: photo.tags,
        category: photo.category,
        mood: 'professional',
        colors: ['neutral'],
        composition: 'standard'
      };
    }
  }

  async getPhotosByCategory(): Promise<Record<string, YannovaPhoto[]>> {
    const photos = await this.getPhotos();

    return photos.reduce((acc, photo) => {
      if (!acc[photo.category]) {
        acc[photo.category] = [];
      }
      acc[photo.category].push(photo);
      return acc;
    }, {} as Record<string, YannovaPhoto[]>);
  }

  async getPhotosByProject(): Promise<Record<string, YannovaPhoto[]>> {
    const photos = await this.getPhotos();

    return photos.reduce((acc, photo) => {
      const projectKey = photo.projectId || 'no-project';
      if (!acc[projectKey]) {
        acc[projectKey] = [];
      }
      acc[projectKey].push(photo);
      return acc;
    }, {} as Record<string, YannovaPhoto[]>);
  }

  async searchPhotos(query: string): Promise<YannovaPhoto[]> {
    const photos = await this.getPhotos();

    const searchTerm = query.toLowerCase();

    return photos.filter(photo =>
      photo.filename.toLowerCase().includes(searchTerm) ||
      photo.alt.toLowerCase().includes(searchTerm) ||
      photo.category.toLowerCase().includes(searchTerm) ||
      photo.tags.some(tag => tag.toLowerCase().includes(searchTerm))
    );
  }
}
