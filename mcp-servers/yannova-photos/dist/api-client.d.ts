import { YannovaPhoto, CreatePhotoRequest, UpdatePhotoRequest, PhotoFilter, PhotoStats, GenerateImageRequest, GeneratedImage, PhotoAnalysis } from './types.js';
export declare class YannovaPhotosApiClient {
    private baseUrl;
    constructor(baseUrl?: string);
    getPhotos(): Promise<YannovaPhoto[]>;
    getPhoto(id: string): Promise<YannovaPhoto>;
    createPhoto(request: CreatePhotoRequest): Promise<YannovaPhoto>;
    updatePhoto(request: UpdatePhotoRequest): Promise<YannovaPhoto>;
    deletePhoto(id: string): Promise<void>;
    getPhotosByFilter(filter: PhotoFilter): Promise<YannovaPhoto[]>;
    getPhotoStats(): Promise<PhotoStats>;
    generateImages(request: GenerateImageRequest): Promise<GeneratedImage[]>;
    analyzePhoto(photoId: string): Promise<PhotoAnalysis>;
    getPhotosByCategory(): Promise<Record<string, YannovaPhoto[]>>;
    getPhotosByProject(): Promise<Record<string, YannovaPhoto[]>>;
    searchPhotos(query: string): Promise<YannovaPhoto[]>;
}
//# sourceMappingURL=api-client.d.ts.map