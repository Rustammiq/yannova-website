// Photo Manager - Ensures no duplicate photos across the website
export interface PhotoInfo {
  src: string;
  alt: string;
  category: string;
  used: boolean;
}

export class PhotoManager {
  private static instance: PhotoManager;
  private photos: PhotoInfo[] = [
    { src: "/images/projects/project-1-villa.jpg", alt: "Villa nieuwbouw project - Professional", category: "nieuwbouw", used: false },
    { src: "/images/projects/project-1-nieuwbouw.jpg", alt: "Moderne Villa Keerbergen - Nieuwbouw project", category: "nieuwbouw", used: false },
    { src: "/images/projects/project-2-monument.jpg", alt: "Monument renovatie project - Professional", category: "renovatie", used: false },
    { src: "/images/projects/project-2-renovatie.jpg", alt: "Badkamer Renovatie Mechelen - Renovatie project", category: "renovatie", used: false },
    { src: "/images/projects/project-3-office.jpg", alt: "Kantoor renovatie project - Professional", category: "verbouwing", used: false },
    { src: "/images/projects/project-3-gevelwerk.jpg", alt: "Crepi Gevelafwerking Putte - Gevelwerk project", category: "crepi", used: false },
    { src: "/images/projects/project-4-bathroom.jpg", alt: "Badkamer renovatie project - Professional", category: "renovatie", used: false },
    { src: "/images/projects/project-4-ramen-&-deuren.jpg", alt: "Ramen en Deuren Renovatie - Ramen & Deuren project", category: "ramen-deuren", used: false },
    { src: "/images/projects/project-5-extension.jpg", alt: "Uitbreiding project - Professional", category: "verbouwing", used: false },
    { src: "/images/projects/project-5-renovatie.jpg", alt: "Keuken Renovatie Project - Renovatie project", category: "renovatie", used: false },
    { src: "/images/projects/project-6-apartments.jpg", alt: "Appartementen project - Professional", category: "nieuwbouw", used: false },
    { src: "/images/projects/project-7-crepi.jpg", alt: "Crepi gevelafwerking project - Professional", category: "crepi", used: false },
    { src: "/images/projects/project-8-windows.jpg", alt: "Ramen en deuren project - Professional", category: "ramen-deuren", used: false },
    { src: "/images/projects/project-9-commercial.jpg", alt: "Commerciële renovatie project - Professional", category: "renovatie", used: false },
    { src: "/images/projects/project-10-refurbishment.jpg", alt: "Woning verbouwing project", category: "verbouwing", used: false }
  ];

  private galleryPhotos: PhotoInfo[] = [
    // Verbouwing Gallery
    { src: "/images/gallery/verbouwing-gallery-1.jpg", alt: "Keuken verbouwing project - Yannova", category: "verbouwing", used: false },
    { src: "/images/gallery/verbouwing-gallery-2.jpg", alt: "Zolder verbouwing project - Yannova", category: "verbouwing", used: false },
    { src: "/images/gallery/verbouwing-gallery-3.jpg", alt: "Uitbouw project - Yannova", category: "verbouwing", used: false },
    
    // Nieuwbouw Gallery
    { src: "/images/gallery/nieuwbouw-gallery-1.jpg", alt: "Nieuwbouw project 1 - Yannova", category: "nieuwbouw", used: false },
    { src: "/images/gallery/nieuwbouw-gallery-2.jpg", alt: "Nieuwbouw project 2 - Yannova", category: "nieuwbouw", used: false },
    { src: "/images/gallery/nieuwbouw-gallery-3.jpg", alt: "Nieuwbouw project 3 - Yannova", category: "nieuwbouw", used: false },
    
    // Renovatiewerken Gallery
    { src: "/images/gallery/renovatiewerken-gallery-1.jpg", alt: "Renovatiewerken project 1 - Yannova", category: "renovatie", used: false },
    { src: "/images/gallery/renovatiewerken-gallery-2.jpg", alt: "Renovatiewerken project 2 - Yannova", category: "renovatie", used: false },
    { src: "/images/gallery/renovatiewerken-gallery-3.jpg", alt: "Renovatiewerken project 3 - Yannova", category: "renovatie", used: false },
    
    // Crepi Gallery
    { src: "/images/gallery/crepi-gallery-1.jpg", alt: "Crepi gevelafwerking project 1 - Yannova", category: "crepi", used: false },
    { src: "/images/gallery/crepi-gallery-2.jpg", alt: "Crepi gevelafwerking project 2 - Yannova", category: "crepi", used: false },
    { src: "/images/gallery/crepi-gallery-3.jpg", alt: "Crepi gevelafwerking project 3 - Yannova", category: "crepi", used: false },
    
    // Ramen & Deuren Gallery
    { src: "/images/gallery/ramen-deuren-gallery-1.jpg", alt: "Ramen en deuren project 1 - Yannova", category: "ramen-deuren", used: false },
    { src: "/images/gallery/ramen-deuren-gallery-2.jpg", alt: "Ramen en deuren project 2 - Yannova", category: "ramen-deuren", used: false },
    { src: "/images/gallery/ramen-deuren-gallery-3.jpg", alt: "Ramen en deuren project 3 - Yannova", category: "ramen-deuren", used: false }
  ];

  private constructor() {}

  public static getInstance(): PhotoManager {
    if (!PhotoManager.instance) {
      PhotoManager.instance = new PhotoManager();
    }
    return PhotoManager.instance;
  }

  // Get a photo for a specific project ID (ensures unique assignment)
  public getProjectPhoto(projectId: number): PhotoInfo {
    const photo = this.photos[projectId - 1];
    if (photo && !photo.used) {
      photo.used = true;
      return photo;
    }
    // Fallback to first available photo
    const availablePhoto = this.photos.find(p => !p.used);
    if (availablePhoto) {
      availablePhoto.used = true;
      return availablePhoto;
    }
    // If all photos are used, return the first one
    return this.photos[0];
  }

  // Get a photo for a specific category
  public getCategoryPhoto(category: string): PhotoInfo {
    const categoryPhoto = this.photos.find(p => p.category === category && !p.used);
    if (categoryPhoto) {
      categoryPhoto.used = true;
      return categoryPhoto;
    }
    // Fallback to any available photo
    const availablePhoto = this.photos.find(p => !p.used);
    if (availablePhoto) {
      availablePhoto.used = true;
      return availablePhoto;
    }
    // If all photos are used, return the first one
    return this.photos[0];
  }

  // Get multiple unique photos for galleries
  public getUniquePhotos(count: number): PhotoInfo[] {
    const availablePhotos = this.photos.filter(p => !p.used);
    const shuffled = [...availablePhotos].sort(() => Math.random() - 0.5);
    
    const selectedPhotos = [];
    for (let i = 0; i < count; i++) {
      const photo = shuffled[i % shuffled.length];
      if (photo) {
        photo.used = true;
        selectedPhotos.push(photo);
      }
    }
    
    return selectedPhotos;
  }

  // Reset all photos (useful for testing)
  public reset(): void {
    this.photos.forEach(photo => photo.used = false);
  }

  // Get all available photos
  public getAllPhotos(): PhotoInfo[] {
    return [...this.photos];
  }

  // Get photos by category
  public getPhotosByCategory(category: string): PhotoInfo[] {
    return this.photos.filter(p => p.category === category);
  }

  // Get gallery photos for a specific category
  public getGalleryPhotos(category: string): PhotoInfo[] {
    return this.galleryPhotos.filter(p => p.category === category);
  }

  // Get a specific gallery photo by index and category
  public getGalleryPhoto(category: string, index: number): PhotoInfo {
    const categoryPhotos = this.galleryPhotos.filter(p => p.category === category);
    const photo = categoryPhotos[index];
    if (photo && !photo.used) {
      photo.used = true;
      return photo;
    }
    // Fallback to first available photo in category
    const availablePhoto = categoryPhotos.find(p => !p.used);
    if (availablePhoto) {
      availablePhoto.used = true;
      return availablePhoto;
    }
    // If all photos are used, return the first one
    return categoryPhotos[0] || this.galleryPhotos[0];
  }

  // Get all gallery photos
  public getAllGalleryPhotos(): PhotoInfo[] {
    return [...this.galleryPhotos];
  }

  // Reset gallery photos
  public resetGallery(): void {
    this.galleryPhotos.forEach(photo => photo.used = false);
  }

  // Reset all photos (both project and gallery)
  public resetAll(): void {
    this.reset();
    this.resetGallery();
  }
}

// Export singleton instance
export const photoManager = PhotoManager.getInstance();
