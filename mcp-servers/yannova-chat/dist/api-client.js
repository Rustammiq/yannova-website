"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.YannovaApiClient = void 0;
const node_fetch_1 = __importDefault(require("node-fetch"));
class YannovaApiClient {
    baseUrl;
    constructor(baseUrl = 'http://localhost:3000') {
        this.baseUrl = baseUrl;
    }
    async chatWithAI(request) {
        const response = await (0, node_fetch_1.default)(`${this.baseUrl}/api/chat`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(request),
        });
        if (!response.ok) {
            throw new Error(`Chat API error: ${response.status} ${response.statusText}`);
        }
        return (await response.json());
    }
    async getProjects() {
        const response = await (0, node_fetch_1.default)(`${this.baseUrl}/api/projects`);
        if (!response.ok) {
            throw new Error(`Projects API error: ${response.status} ${response.statusText}`);
        }
        return (await response.json());
    }
    async getServices() {
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
    async getPhotos() {
        const response = await (0, node_fetch_1.default)(`${this.baseUrl}/api/photos`);
        if (!response.ok) {
            throw new Error(`Photos API error: ${response.status} ${response.statusText}`);
        }
        return (await response.json());
    }
}
exports.YannovaApiClient = YannovaApiClient;
//# sourceMappingURL=api-client.js.map