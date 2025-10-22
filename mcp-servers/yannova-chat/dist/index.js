#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_js_1 = require("@modelcontextprotocol/sdk/server/index.js");
const stdio_js_1 = require("@modelcontextprotocol/sdk/server/stdio.js");
const types_js_1 = require("@modelcontextprotocol/sdk/types.js");
const api_client_js_1 = require("./api-client.js");
class YannovaChatServer {
    server;
    apiClient;
    constructor() {
        this.apiClient = new api_client_js_1.YannovaApiClient(process.env.YANNOVA_API_URL);
        this.server = new index_js_1.Server({
            name: 'yannova-chat-server',
            version: '1.0.0',
        }, {
            capabilities: {
                resources: {},
                tools: {},
            },
        });
        this.setupResourceHandlers();
        this.setupToolHandlers();
    }
    setupResourceHandlers() {
        // Resources for services information
        this.server.setRequestHandler(types_js_1.ListResourcesRequestSchema, async () => {
            return {
                resources: [
                    {
                        uri: 'yannova://services',
                        name: 'Yannova Services',
                        description: 'Available construction services offered by Yannova Bouw',
                        mimeType: 'application/json',
                    },
                    {
                        uri: 'yannova://projects',
                        name: 'Yannova Projects',
                        description: 'Current and completed construction projects',
                        mimeType: 'application/json',
                    },
                    {
                        uri: 'yannova://photos',
                        name: 'Yannova Photos',
                        description: 'Photo gallery of construction projects',
                        mimeType: 'application/json',
                    },
                ],
            };
        });
        this.server.setRequestHandler(types_js_1.ReadResourceRequestSchema, async (request) => {
            const { uri } = request.params;
            try {
                switch (uri) {
                    case 'yannova://services':
                        const services = await this.apiClient.getServices();
                        return {
                            contents: [
                                {
                                    uri,
                                    mimeType: 'application/json',
                                    text: JSON.stringify(services, null, 2),
                                },
                            ],
                        };
                    case 'yannova://projects':
                        const projects = await this.apiClient.getProjects();
                        return {
                            contents: [
                                {
                                    uri,
                                    mimeType: 'application/json',
                                    text: JSON.stringify(projects, null, 2),
                                },
                            ],
                        };
                    case 'yannova://photos':
                        const photos = await this.apiClient.getPhotos();
                        return {
                            contents: [
                                {
                                    uri,
                                    mimeType: 'application/json',
                                    text: JSON.stringify(photos, null, 2),
                                },
                            ],
                        };
                    default:
                        throw new Error(`Unknown resource: ${uri}`);
                }
            }
            catch (error) {
                console.error('Error reading resource:', error);
                throw error;
            }
        });
    }
    setupToolHandlers() {
        // Tools for chat functionality
        this.server.setRequestHandler(types_js_1.CallToolRequestSchema, async (request) => {
            const { name, arguments: args } = request.params;
            try {
                switch (name) {
                    case 'chat':
                        return await this.handleChat(args);
                    case 'get_services':
                        return await this.handleGetServices();
                    case 'get_projects':
                        return await this.handleGetProjects();
                    case 'get_photos':
                        return await this.handleGetPhotos();
                    case 'generate_project_ideas':
                        return await this.handleGenerateProjectIdeas(args);
                    default:
                        throw new Error(`Unknown tool: ${name}`);
                }
            }
            catch (error) {
                console.error('Error executing tool:', error);
                return {
                    content: [
                        {
                            type: 'text',
                            text: `Error: ${error instanceof Error ? error.message : 'Unknown error'}`,
                        },
                    ],
                    isError: true,
                };
            }
        });
    }
    async handleChat(args) {
        const { message, history } = args;
        const response = await this.apiClient.chatWithAI({
            message,
            history: history || [],
        });
        return {
            content: [
                {
                    type: 'text',
                    text: response.response,
                },
            ],
        };
    }
    async handleGetServices() {
        const services = await this.apiClient.getServices();
        return {
            content: [
                {
                    type: 'text',
                    text: `Yannova Bouw biedt de volgende diensten:\n\n${services
                        .map((service) => `• ${service.name}: ${service.description}`)
                        .join('\n')}`,
                },
            ],
        };
    }
    async handleGetProjects() {
        const projects = await this.apiClient.getProjects();
        const projectSummary = projects
            .map((project) => {
            const statusEmoji = {
                planning: '📋',
                'in-progress': '🔨',
                completed: '✅'
            }[project.status] || '❓';
            return `${statusEmoji} **${project.title}** (${project.location})\n   ${project.description}\n   Budget: ${project.budget} | Status: ${project.status}`;
        })
            .join('\n\n');
        return {
            content: [
                {
                    type: 'text',
                    text: `📁 **Yannova Projecten Overzicht**\n\n${projectSummary}`,
                },
            ],
        };
    }
    async handleGetPhotos() {
        const photos = await this.apiClient.getPhotos();
        const photoSummary = photos
            .map((photo) => {
            const aiBadge = photo.aiGenerated ? '🤖' : '';
            return `${aiBadge}📸 **${photo.filename}**\n   ${photo.alt}\n   Category: ${photo.category} | Tags: ${photo.tags.join(', ')}`;
        })
            .join('\n\n');
        return {
            content: [
                {
                    type: 'text',
                    text: `🖼️ **Yannova Foto Gallerij**\n\n${photoSummary}`,
                },
            ],
        };
    }
    async handleGenerateProjectIdeas(args) {
        const { type, budget, location } = args;
        const prompt = `Genereer bouwproject ideeën voor Yannova Bouw.${type ? ` Focus op ${type}.` : ''}${budget ? ` Budget: ${budget}.` : ''}${location ? ` Locatie: ${location}.` : ''} Geef 3 concrete projectvoorstellen met kostenraming en tijdsduur.`;
        const response = await this.apiClient.chatWithAI({
            message: prompt,
            history: [
                {
                    role: 'user',
                    content: 'Je bent een bouwadviseur voor Yannova Bouw. Geef praktische, realistische projectvoorstellen met concrete details over kosten, tijdsduur en werkgebied (Vlaanderen).'
                }
            ]
        });
        return {
            content: [
                {
                    type: 'text',
                    text: `💡 **Project Ideeën Generator**\n\n${response.response}`,
                },
            ],
        };
    }
    async start() {
        const transport = new stdio_js_1.StdioServerTransport();
        await this.server.connect(transport);
        console.error('Yannova Chat MCP server is running...');
    }
}
// Start the server
const server = new YannovaChatServer();
server.start().catch((error) => {
    console.error('Failed to start server:', error);
    process.exit(1);
});
//# sourceMappingURL=index.js.map