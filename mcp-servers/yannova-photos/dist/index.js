#!/usr/bin/env node
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_js_1 = require("@modelcontextprotocol/sdk/server/index.js");
const stdio_js_1 = require("@modelcontextprotocol/sdk/server/stdio.js");
const types_js_1 = require("@modelcontextprotocol/sdk/types.js");
const api_client_js_1 = require("./api-client.js");
class YannovaPhotosServer {
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
        this.server.setRequestHandler(types_js_1.ListResourcesRequestSchema, () => __awaiter(this, void 0, void 0, function* () {
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
        }));
        this.server.setRequestHandler(types_js_1.ReadResourceRequestSchema, (request) => __awaiter(this, void 0, void 0, function* () {
            const { uri } = request.params;
            try {
                switch (uri) {
                    case 'yannova://photos':
                        const photos = yield this.apiClient.getPhotos();
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
                        const stats = yield this.apiClient.getPhotoStats();
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
                        const byCategory = yield this.apiClient.getPhotosByCategory();
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
                        const byProject = yield this.apiClient.getPhotosByProject();
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
        }));
    }
    setupToolHandlers() {
        // Tools for photo management
        this.server.setRequestHandler(types_js_1.CallToolRequestSchema, (request) => __awaiter(this, void 0, void 0, function* () {
            const { name, arguments: args } = request.params;
            try {
                switch (name) {
                    case 'get_photos':
                        return yield this.handleGetPhotos(args);
                    case 'get_photo':
                        return yield this.handleGetPhoto(args);
                    case 'create_photo':
                        return yield this.handleCreatePhoto(args);
                    case 'update_photo':
                        return yield this.handleUpdatePhoto(args);
                    case 'delete_photo':
                        return yield this.handleDeletePhoto(args);
                    case 'filter_photos':
                        return yield this.handleFilterPhotos(args);
                    case 'search_photos':
                        return yield this.handleSearchPhotos(args);
                    case 'get_photo_stats':
                        return yield this.handleGetPhotoStats();
                    case 'generate_images':
                        return yield this.handleGenerateImages(args);
                    case 'analyze_photo':
                        return yield this.handleAnalyzePhoto(args);
                    case 'get_photos_summary':
                        return yield this.handleGetPhotosSummary();
                    case 'get_construction_styles':
                        return yield this.handleGetConstructionStyles();
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
        }));
    }
    handleGetPhotos(args) {
        return __awaiter(this, void 0, void 0, function* () {
            let photos;
            if (args.filter) {
                photos = yield this.apiClient.getPhotosByFilter(args.filter);
            }
            else {
                photos = yield this.apiClient.getPhotos();
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
        });
    }
    handleGetPhoto(args) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = args;
            const photo = yield this.apiClient.getPhoto(id);
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
        });
    }
    handleCreatePhoto(args) {
        return __awaiter(this, void 0, void 0, function* () {
            const photo = yield this.apiClient.createPhoto(args);
            return {
                content: [
                    {
                        type: 'text',
                        text: `✅ **Foto geüpload!**\n\n📷 **${photo.filename}**\n📂 ${photo.url}\n🏷️ ${photo.category}\n📐 ${photo.dimensions.width}x${photo.dimensions.height}\n📏 ${this.formatFileSize(photo.size)}`,
                    },
                ],
            };
        });
    }
    handleUpdatePhoto(args) {
        return __awaiter(this, void 0, void 0, function* () {
            const photo = yield this.apiClient.updatePhoto(args);
            return {
                content: [
                    {
                        type: 'text',
                        text: `🔄 **Foto bijgewerkt!**\n\n📷 **${photo.filename}**\n🏷️ ${photo.category}\n🏷️ Tags: ${photo.tags.join(', ')}\n📝 ${photo.alt}`,
                    },
                ],
            };
        });
    }
    handleDeletePhoto(args) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = args;
            yield this.apiClient.deletePhoto(id);
            return {
                content: [
                    {
                        type: 'text',
                        text: `🗑️ **Foto verwijderd!**\n\nFoto met ID ${id} is succesvol verwijderd.`,
                    },
                ],
            };
        });
    }
    handleFilterPhotos(args) {
        return __awaiter(this, void 0, void 0, function* () {
            const filter = {};
            if (args.category)
                filter.category = args.category;
            if (args.tags)
                filter.tags = args.tags;
            if (args.aiGenerated !== undefined)
                filter.aiGenerated = args.aiGenerated;
            if (args.projectId)
                filter.projectId = args.projectId;
            const photos = yield this.apiClient.getPhotosByFilter(filter);
            return yield this.handleGetPhotos({ filter });
        });
    }
    handleSearchPhotos(args) {
        return __awaiter(this, void 0, void 0, function* () {
            const { query } = args;
            const photos = yield this.apiClient.searchPhotos(query);
            return yield this.handleGetPhotos({ filter: {} });
        });
    }
    handleGetPhotoStats() {
        return __awaiter(this, void 0, void 0, function* () {
            const stats = yield this.apiClient.getPhotoStats();
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
        });
    }
    handleGenerateImages(args) {
        return __awaiter(this, void 0, void 0, function* () {
            const images = yield this.apiClient.generateImages(args);
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
        });
    }
    handleAnalyzePhoto(args) {
        return __awaiter(this, void 0, void 0, function* () {
            const analysis = yield this.apiClient.analyzePhoto(args.id);
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
        });
    }
    handleGetPhotosSummary() {
        return __awaiter(this, void 0, void 0, function* () {
            const photos = yield this.apiClient.getPhotos();
            const stats = yield this.apiClient.getPhotoStats();
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
        });
    }
    handleGetConstructionStyles() {
        return __awaiter(this, void 0, void 0, function* () {
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
        });
    }
    formatFileSize(bytes) {
        if (bytes === 0)
            return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            const transport = new stdio_js_1.StdioServerTransport();
            yield this.server.connect(transport);
            console.error('Yannova Photos MCP server is running...');
        });
    }
}
// Start the server
const server = new YannovaPhotosServer();
server.start().catch((error) => {
    console.error('Failed to start server:', error);
    process.exit(1);
});
//# sourceMappingURL=index.js.map