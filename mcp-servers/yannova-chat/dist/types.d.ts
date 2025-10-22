export interface ChatMessage {
    role: 'user' | 'assistant';
    content: string;
}
export interface ChatRequest {
    message: string;
    history?: ChatMessage[];
    generateImages?: boolean;
    imageCount?: number;
}
export interface ChatResponse {
    response: string;
    images?: string[];
    timestamp: string;
}
export interface YannovaService {
    id: string;
    name: string;
    description: string;
    category: 'nieuwbouw' | 'renovatie' | 'crepi' | 'ramen-deuren' | 'badkamer' | 'keuken';
}
export interface YannovaProject {
    id: string;
    title: string;
    description: string;
    location: string;
    type: string;
    status: 'planning' | 'in-progress' | 'completed';
    budget: string;
    images: string[];
    createdAt: string;
    updatedAt: string;
}
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
//# sourceMappingURL=types.d.ts.map