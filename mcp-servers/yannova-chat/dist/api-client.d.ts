import { ChatRequest, ChatResponse, YannovaService, YannovaProject, YannovaPhoto } from './types.js';
export declare class YannovaApiClient {
    private baseUrl;
    constructor(baseUrl?: string);
    chatWithAI(request: ChatRequest): Promise<ChatResponse>;
    getProjects(): Promise<YannovaProject[]>;
    getServices(): Promise<YannovaService[]>;
    getPhotos(): Promise<YannovaPhoto[]>;
}
//# sourceMappingURL=api-client.d.ts.map