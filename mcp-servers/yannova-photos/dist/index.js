#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_js_1 = require("@modelcontextprotocol/sdk/server/index.js");
const stdio_js_1 = require("@modelcontextprotocol/sdk/server/stdio.js");
const types_js_1 = require("@modelcontextprotocol/sdk/types.js");
const api_client_js_1 = require("./api-client.js");
class YannovaPhotosServer {
    server;
    apiClient;
    constructor() {
        this.apiClient = new api_client_js_1.YannovaPhotosApiClient(process.env.YANNOVA_API_URL);
        this.server = new index_js_1.Server({
            name: 'yannova-photos-server',
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
        // Resources for photos information
        this.server.setRequestHandler(types_js_1.ListResourcesRequestSchema, async () => {
            return {
                resources: [
                    {
                        uri: 'yannova://photos',
                        name: 'All Photos',
                        description: 'Complete list of all Yannova photos',
                        mimeType: 'application/json',
                    },
                    {
                        uri: 'yannova://photos/stats',
                        name: 'Photo Statistics',
                        description: 'Statistics and analytics about Yannova photos',
                        mimeType: 'application/json',
                    },
                    {
                        uri: 'yannova://photos/by-category',
                        name: 'Photos by Category',
                        description: 'Photos grouped by category',
                        mimeType: 'application/json',
                    },
                    {
                        uri: 'yannova://photos/by-project',
                        name: 'Photos by Project',
                        description: 'Photos grouped by project',
                        mimeType: 'application/json',
                    },
                ],
            };
        });
        this.server.setRequestHandler(types_js_1.ReadResourceRequestSchema, async (request) => {
            const { uri } = request.params;
            try {
                switch (uri) {
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
                    case 'yannova://photos/stats':
                        const stats = await this.apiClient.getPhotoStats();
                        return {
                            contents: [
                                {
                                    uri,
                                    mimeType: 'application/json',
                                    text: JSON.stringify(stats, null, 2),
                                },
                            ],
                        };
                    case 'yannova://photos/by-category':
                        const byCategory = await this.apiClient.getPhotosByCategory();
                        return {
                            contents: [
                                {
                                    uri,
                                    mimeType: 'application/json',
                                    text: JSON.stringify(byCategory, null, 2),
                                },
                            ],
                        };
                    case 'yannova://photos/by-project':
                        const byProject = await this.apiClient.getPhotosByProject();
                        return {
                            contents: [
                                {
                                    uri,
                                    mimeType: 'application/json',
                                    text: JSON.stringify(byProject, null, 2),
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
        // Tools for photo management
        this.server.setRequestHandler(types_js_1.CallToolRequestSchema, async (request) => {
            const { name, arguments: args } = request.params;
            try {
                switch (name) {
                    case 'get_photos':
                        return await this.handleGetPhotos(args);
                    case 'get_photo':
                        return await this.handleGetPhoto(args);
                    case 'create_photo':
                        return await this.handleCreatePhoto(args);
                    case 'update_photo':
                        return await this.handleUpdatePhoto(args);
                    case 'delete_photo':
                        return await this.handleDeletePhoto(args);
                    case 'filter_photos':
                        return await this.handleFilterPhotos(args);
                    case 'search_photos':
                        return await this.handleSearchPhotos(args);
                    case 'get_photo_stats':
                        return await this.handleGetPhotoStats();
                    case 'generate_images':
                        return await this.handleGenerateImages(args);
                    case 'analyze_photo':
                        return await this.handleAnalyzePhoto(args);
                    case 'get_photos_summary':
                        return await this.handleGetPhotosSummary();
                    case 'get_construction_styles':
                        return await this.handleGetConstructionStyles();
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
    async handleGetPhotos(args) {
        let photos;
        if (args.filter) {
            photos = await this.apiClient.getPhotosByFilter(args.filter);
        }
        else {
            photos = await this.apiClient.getPhotos();
        }
        const photoList = photos
            .map((photo) => {
            const aiBadge = photo.aiGenerated ? '🤖' : '📷';
            const categoryBadge = `🏷️ ${photo.category}`;
            const tagsText = photo.tags.length > 0 ? ` | Tags: ${photo.tags.join(', ')}` : '';
            return `${aiBadge} **${photo.filename}**\n   ${categoryBadge}${tagsText}\n   📐 ${photo.dimensions.width}x${photo.dimensions.height} | 📏 ${this.formatFileSize(photo.size)}\n   📝 ${photo.alt}`;
        })
            .join('\n\n');
        return {
            content: [
                {
                    type: 'text',
                    text: `🖼️ **Yannova Foto Gallerij (${photos.length} foto's)**\n\n${photoList}`,
                },
            ],
        };
    }
    async handleGetPhoto(args) {
        const { id } = args;
        const photo = await this.apiClient.getPhoto(id);
        const aiBadge = photo.aiGenerated ? '🤖' : '📷';
        const projectText = photo.projectId ? ` | Project: ${photo.projectId}` : '';
        const photoDetails = `${aiBadge} **${photo.filename}**\n\n` +
            `📂 **Bestand:** ${photo.url}\n` +
            `🏷️ **Category:** ${photo.category}${projectText}\n` +
            `📐 **Afmetingen:** ${photo.dimensions.width}x${photo.dimensions.height}\n` +
            `📏 **Grootte:** ${this.formatFileSize(photo.size)}\n` +
            `📅 **Upload:** ${photo.uploadedAt}\n` +
            `🏷️ **Tags:** ${photo.tags.join(', ') || 'Geen tags'}\n` +
            `📝 **Beschrijving:** ${photo.alt}`;
        return {
            content: [
                {
                    type: 'text',
                    text: photoDetails,
                },
            ],
        };
    }
    async handleCreatePhoto(args) {
        const photo = await this.apiClient.createPhoto(args);
        return {
            content: [
                {
                    type: 'text',
                    text: `✅ **Foto geüpload!**\n\n📷 **${photo.filename}**\n📂 ${photo.url}\n🏷️ ${photo.category}\n📐 ${photo.dimensions.width}x${photo.dimensions.height}\n📏 ${this.formatFileSize(photo.size)}`,
                },
            ],
        };
    }
    async handleUpdatePhoto(args) {
        const photo = await this.apiClient.updatePhoto(args);
        return {
            content: [
                {
                    type: 'text',
                    text: `🔄 **Foto bijgewerkt!**\n\n📷 **${photo.filename}**\n🏷️ ${photo.category}\n🏷️ Tags: ${photo.tags.join(', ')}\n📝 ${photo.alt}`,
                },
            ],
        };
    }
    async handleDeletePhoto(args) {
        const { id } = args;
        await this.apiClient.deletePhoto(id);
        return {
            content: [
                {
                    type: 'text',
                    text: `🗑️ **Foto verwijderd!**\n\nFoto met ID ${id} is succesvol verwijderd.`,
                },
            ],
        };
    }
    async handleFilterPhotos(args) {
        const filter = {};
        if (args.category)
            filter.category = args.category;
        if (args.tags)
            filter.tags = args.tags;
        if (args.aiGenerated !== undefined)
            filter.aiGenerated = args.aiGenerated;
        if (args.projectId)
            filter.projectId = args.projectId;
        const photos = await this.apiClient.getPhotosByFilter(filter);
        return await this.handleGetPhotos({ filter });
    }
    async handleSearchPhotos(args) {
        const { query } = args;
        const photos = await this.apiClient.searchPhotos(query);
        return await this.handleGetPhotos({ filter: {} });
    }
    async handleGetPhotoStats() {
        const stats = await this.apiClient.getPhotoStats();
        const statsText = `📊 **Yannova Foto Statistieken**\n\n` +
            `📸 **Totaal Foto's:** ${stats.total}\n` +
            `🤖 **AI Gegenereerd:** ${stats.aiGenerated}\n` +
            `📷 **Geüpload:** ${stats.uploaded}\n\n` +
            `💾 **Totale Grootte:** ${stats.totalSize}\n` +
            `📏 **Gemiddelde Grootte:** ${stats.averageSize}\n\n` +
            `🏷️ **Categories:** ${stats.categories.join(', ')}`;
        return {
            content: [
                {
                    type: 'text',
                    text: statsText,
                },
            ],
        };
    }
    async handleGenerateImages(args) {
        const images = await this.apiClient.generateImages(args);
        const imageList = images
            .map((image, index) => {
            return `🖼️ **Afbeelding ${index + 1}**\n   📂 ${image.url}\n   🎨 ${image.style}\n   📝 ${image.prompt}`;
        })
            .join('\n\n');
        return {
            content: [
                {
                    type: 'text',
                    text: `🎨 **AI Afbeeldingen Gegeneerd (${images.length})**\n\n${imageList}`,
                },
            ],
        };
    }
    async handleAnalyzePhoto(args) {
        const analysis = await this.apiClient.analyzePhoto(args.id);
        const analysisText = `🔍 **Foto Analyse**\n\n` +
            `📝 **Beschrijving:** ${analysis.description}\n\n` +
            `🏷️ **Category:** ${analysis.category}\n` +
            `😊 **Mood:** ${analysis.mood}\n` +
            `🎨 **Kleuren:** ${analysis.colors.join(', ')}\n` +
            `📐 **Compositie:** ${analysis.composition}\n\n` +
            `🏷️ **Tags:** ${analysis.tags.join(', ')}`;
        return {
            content: [
                {
                    type: 'text',
                    text: analysisText,
                },
            ],
        };
    }
    async handleGetPhotosSummary() {
        const photos = await this.apiClient.getPhotos();
        const stats = await this.apiClient.getPhotoStats();
        const aiGenerated = photos.filter(p => p.aiGenerated);
        const uploaded = photos.filter(p => !p.aiGenerated);
        let summary = `🖼️ **Yannova Foto Overzicht**\n\n`;
        summary += `📊 **Samenvatting:** ${stats.total} foto's, ${stats.totalSize} totaal\n\n`;
        if (aiGenerated.length > 0) {
            summary += `🤖 **AI Gegenereerde Foto's (${aiGenerated.length}):**\n`;
            aiGenerated.slice(0, 3).forEach(photo => {
                summary += `   • ${photo.filename} (${photo.category})\n`;
            });
            if (aiGenerated.length > 3) {
                summary += `   ... en ${aiGenerated.length - 3} andere\n`;
            }
            summary += `\n`;
        }
        if (uploaded.length > 0) {
            summary += `📷 **Geüploade Foto's (${uploaded.length}):**\n`;
            uploaded.slice(0, 3).forEach(photo => {
                summary += `   • ${photo.filename} (${photo.category})\n`;
            });
            if (uploaded.length > 3) {
                summary += `   ... en ${uploaded.length - 3} andere\n`;
            }
            summary += `\n`;
        }
        return {
            content: [
                {
                    type: 'text',
                    text: summary,
                },
            ],
        };
    }
    async handleGetConstructionStyles() {
        const styles = [
            {
                name: 'Modern',
                description: 'Strakke lijnen, minimalistische ontwerpen, grote ramen',
                features: ['strakke lijnen', 'minimalistisch', 'grote ramen', 'beton', 'staal', 'glas'],
                colors: ['wit', 'grijs', 'zwart', 'metallic']
            },
            {
                name: 'Klassiek',
                description: 'Traditionele architectuur, ornamenten, symmetrie',
                features: ['ornamenten', 'symmetrie', 'baksteen', 'hout', 'klassieke details'],
                colors: ['rood', 'bruin', 'beige', 'naturel']
            },
            {
                name: 'Minimalistisch',
                description: 'Less is more, functioneel design, eenvoud',
                features: ['eenvoud', 'functioneel', 'cleane lijnen', 'neutrale kleuren'],
                colors: ['wit', 'grijs', 'zwart', 'beige']
            },
            {
                name: 'Rustiek',
                description: 'Landelijke stijl, natuurlijke materialen, warme sfeer',
                features: ['natuursteen', 'hout', 'warme kleuren', 'authentiek', 'gezellig'],
                colors: ['bruin', 'beige', 'groen', 'oranje']
            }
        ];
        const stylesText = styles
            .map(style => {
            return `🏗️ **${style.name}**\n   📝 ${style.description}\n   🎨 ${style.colors.join(', ')}\n   ✨ ${style.features.join(', ')}`;
        })
            .join('\n\n');
        return {
            content: [
                {
                    type: 'text',
                    text: `🎨 **Bouwstijlen voor Yannova**\n\n${stylesText}`,
                },
            ],
        };
    }
    formatFileSize(bytes) {
        if (bytes === 0)
            return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }
    async start() {
        const transport = new stdio_js_1.StdioServerTransport();
        await this.server.connect(transport);
        console.error('Yannova Photos MCP server is running...');
    }
}
// Start the server
const server = new YannovaPhotosServer();
server.start().catch((error) => {
    console.error('Failed to start server:', error);
    process.exit(1);
});
//# sourceMappingURL=index.js.map