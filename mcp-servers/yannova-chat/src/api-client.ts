import fetch from 'node-fetch';
import { ChatRequest, ChatResponse, YannovaService, YannovaProject, YannovaPhoto } from './types.js';

export class YannovaApiClient {
  private baseUrl: string;

  constructor(baseUrl: string = 'http://localhost:3000') {
    this.baseUrl = baseUrl;
  }

  async chatWithAI(request: ChatRequest): Promise<ChatResponse> {
    const response = await fetch(`${this.baseUrl}/api/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      throw new Error(`Chat API error: ${response.status} ${response.statusText}`);
    }

    return (await response.json()) as ChatResponse;
  }

  async getProjects(): Promise<YannovaProject[]> {
    const response = await fetch(`${this.baseUrl}/api/projects`);

    if (!response.ok) {
      throw new Error(`Projects API error: ${response.status} ${response.statusText}`);
    }

    return (await response.json()) as YannovaProject[];
  }

  async getServices(): Promise<YannovaService[]> {
    // Return hardcoded services for now - could be made into an API endpoint
    return [
      {
        id: 'nieuwbouw',
        name: 'Nieuwbouw',
        description: 'Complete nieuwbouwprojecten van ontwerp tot oplevering',
        category: 'nieuwbouw'
      },
      {
        id: 'renovatie',
        name: 'Renovatie',
        description: 'Badkamer- en keukenrenovaties, dakwerken en gevelbekleding',
        category: 'renovatie'
      },
      {
        id: 'crepi',
        name: 'Crepi Gevelafwerking',
        description: 'Moderne gevelafwerking met isolatie voor energiebesparing',
        category: 'crepi'
      },
      {
        id: 'ramen-deuren',
        name: 'Ramen en Deuren',
        description: 'Nieuwe ramen en deuren voor betere isolatie en uitstraling',
        category: 'ramen-deuren'
      }
    ];
  }

  async getPhotos(): Promise<YannovaPhoto[]> {
    const response = await fetch(`${this.baseUrl}/api/photos`);

    if (!response.ok) {
      throw new Error(`Photos API error: ${response.status} ${response.statusText}`);
    }

    return (await response.json()) as YannovaPhoto[];
  }
}
