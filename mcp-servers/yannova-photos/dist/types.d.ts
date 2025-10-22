export interface YannovaPhoto {
    id: string;
    filename: string;
    url: string;
    alt: string;
    category: string;
    tags: string[];
    size: number;
    dimensions: {
        width: number;
        height: number;
    };
    uploadedAt: string;
    aiGenerated: boolean;
    projectId?: string;
}
export interface CreatePhotoRequest {
    file?: string;
    filename?: string;
    alt?: string;
    category?: string;
    tags?: string[];
    projectId?: string;
}
export interface UpdatePhotoRequest {
    id: string;
    alt?: string;
    category?: string;
    tags?: string[];
    projectId?: string;
}
export interface PhotoFilter {
    category?: string;
    tags?: string[];
    aiGenerated?: boolean;
    projectId?: string;
}
export interface PhotoStats {
    total: number;
    aiGenerated: number;
    uploaded: number;
    categories: string[];
    totalSize: string;
    averageSize: string;
}
export interface GenerateImageRequest {
    prompt: string;
    count?: number;
    style?: 'modern' | 'classic' | 'minimalist' | 'rustic';
    category?: string;
    projectId?: string;
}
export interface GeneratedImage {
    url: string;
    prompt: string;
    style: string;
    category: string;
    createdAt: string;
}
export interface PhotoAnalysis {
    description: string;
    tags: string[];
    category: string;
    mood: string;
    colors: string[];
    composition: string;
}
//# sourceMappingURL=types.d.ts.map