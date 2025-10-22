#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_js_1 = require("@modelcontextprotocol/sdk/server/index.js");
const stdio_js_1 = require("@modelcontextprotocol/sdk/server/stdio.js");
const types_js_1 = require("@modelcontextprotocol/sdk/types.js");
const api_client_js_1 = require("./api-client.js");
class YannovaProjectsServer {
    server;
    apiClient;
    constructor() {
        this.apiClient = new api_client_js_1.YannovaProjectsApiClient(process.env.YANNOVA_API_URL);
        this.server = new index_js_1.Server({
            name: 'yannova-projects-server',
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
        // Resources for projects information
        this.server.setRequestHandler(types_js_1.ListResourcesRequestSchema, async () => {
            return {
                resources: [
                    {
                        uri: 'yannova://projects',
                        name: 'All Projects',
                        description: 'Complete list of all Yannova construction projects',
                        mimeType: 'application/json',
                    },
                    {
                        uri: 'yannova://projects/stats',
                        name: 'Project Statistics',
                        description: 'Statistics and analytics about Yannova projects',
                        mimeType: 'application/json',
                    },
                    {
                        uri: 'yannova://projects/by-location',
                        name: 'Projects by Location',
                        description: 'Projects grouped by location',
                        mimeType: 'application/json',
                    },
                    {
                        uri: 'yannova://projects/by-type',
                        name: 'Projects by Type',
                        description: 'Projects grouped by construction type',
                        mimeType: 'application/json',
                    },
                    {
                        uri: 'yannova://projects/by-status',
                        name: 'Projects by Status',
                        description: 'Projects grouped by completion status',
                        mimeType: 'application/json',
                    },
                ],
            };
        });
        this.server.setRequestHandler(types_js_1.ReadResourceRequestSchema, async (request) => {
            const { uri } = request.params;
            try {
                switch (uri) {
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
                    case 'yannova://projects/stats':
                        const stats = await this.apiClient.getProjectStats();
                        return {
                            contents: [
                                {
                                    uri,
                                    mimeType: 'application/json',
                                    text: JSON.stringify(stats, null, 2),
                                },
                            ],
                        };
                    case 'yannova://projects/by-location':
                        const byLocation = await this.apiClient.getProjectsByLocation();
                        return {
                            contents: [
                                {
                                    uri,
                                    mimeType: 'application/json',
                                    text: JSON.stringify(byLocation, null, 2),
                                },
                            ],
                        };
                    case 'yannova://projects/by-type':
                        const byType = await this.apiClient.getProjectsByType();
                        return {
                            contents: [
                                {
                                    uri,
                                    mimeType: 'application/json',
                                    text: JSON.stringify(byType, null, 2),
                                },
                            ],
                        };
                    case 'yannova://projects/by-status':
                        const byStatus = await this.apiClient.getProjectsByStatus();
                        return {
                            contents: [
                                {
                                    uri,
                                    mimeType: 'application/json',
                                    text: JSON.stringify(byStatus, null, 2),
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
        // Tools for project management
        this.server.setRequestHandler(types_js_1.CallToolRequestSchema, async (request) => {
            const { name, arguments: args } = request.params;
            try {
                switch (name) {
                    case 'get_projects':
                        return await this.handleGetProjects(args);
                    case 'get_project':
                        return await this.handleGetProject(args);
                    case 'create_project':
                        return await this.handleCreateProject(args);
                    case 'update_project':
                        return await this.handleUpdateProject(args);
                    case 'delete_project':
                        return await this.handleDeleteProject(args);
                    case 'filter_projects':
                        return await this.handleFilterProjects(args);
                    case 'get_project_stats':
                        return await this.handleGetProjectStats();
                    case 'get_projects_summary':
                        return await this.handleGetProjectsSummary();
                    case 'estimate_project_cost':
                        return await this.handleEstimateProjectCost(args);
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
    async handleGetProjects(args) {
        let projects;
        if (args.filter) {
            projects = await this.apiClient.getProjectsByFilter(args.filter);
        }
        else {
            projects = await this.apiClient.getProjects();
        }
        const projectList = projects
            .map((project) => {
            const statusEmoji = {
                planning: '📋',
                'in-progress': '🔨',
                completed: '✅'
            }[project.status] || '❓';
            return `${statusEmoji} **${project.title}**\n   📍 ${project.location} | ${project.type}\n   💰 ${project.budget}\n   📝 ${project.description}`;
        })
            .join('\n\n');
        return {
            content: [
                {
                    type: 'text',
                    text: `📁 **Yannova Projecten (${projects.length})**\n\n${projectList}`,
                },
            ],
        };
    }
    async handleGetProject(args) {
        const { id } = args;
        const project = await this.apiClient.getProject(id);
        const statusEmoji = {
            planning: '📋',
            'in-progress': '🔨',
            completed: '✅'
        }[project.status] || '❓';
        const projectDetails = `${statusEmoji} **${project.title}**\n\n` +
            `📍 **Locatie:** ${project.location}\n` +
            `🏗️ **Type:** ${project.type}\n` +
            `📊 **Status:** ${project.status}\n` +
            `💰 **Budget:** ${project.budget}\n` +
            `📅 **Aangemaakt:** ${project.createdAt}\n` +
            `📝 **Beschrijving:**\n${project.description}\n\n` +
            `🖼️ **Afbeeldingen:** ${project.images.length > 0 ? project.images.length + ' afbeeldingen' : 'Geen afbeeldingen'}`;
        return {
            content: [
                {
                    type: 'text',
                    text: projectDetails,
                },
            ],
        };
    }
    async handleCreateProject(args) {
        const project = await this.apiClient.createProject(args);
        return {
            content: [
                {
                    type: 'text',
                    text: `✅ **Nieuw project aangemaakt!**\n\n📋 **${project.title}**\n📍 ${project.location}\n🏗️ ${project.type}\n💰 ${project.budget}\n📝 ${project.description}`,
                },
            ],
        };
    }
    async handleUpdateProject(args) {
        const project = await this.apiClient.updateProject(args);
        return {
            content: [
                {
                    type: 'text',
                    text: `🔄 **Project bijgewerkt!**\n\n📋 **${project.title}**\n📍 ${project.location}\n🏗️ ${project.type}\n📊 ${project.status}\n💰 ${project.budget}`,
                },
            ],
        };
    }
    async handleDeleteProject(args) {
        const { id } = args;
        await this.apiClient.deleteProject(id);
        return {
            content: [
                {
                    type: 'text',
                    text: `🗑️ **Project verwijderd!**\n\nProject met ID ${id} is succesvol verwijderd.`,
                },
            ],
        };
    }
    async handleFilterProjects(args) {
        const filter = {};
        if (args.status)
            filter.status = args.status;
        if (args.type)
            filter.type = args.type;
        if (args.location)
            filter.location = args.location;
        const projects = await this.apiClient.getProjectsByFilter(filter);
        return await this.handleGetProjects({ filter });
    }
    async handleGetProjectStats() {
        const stats = await this.apiClient.getProjectStats();
        const statsText = `📊 **Yannova Project Statistieken**\n\n` +
            `📈 **Totaal Projects:** ${stats.total}\n` +
            `✅ **Voltooid:** ${stats.completed}\n` +
            `🔨 **Bezig:** ${stats.inProgress}\n` +
            `📋 **Planning:** ${stats.planning}\n\n` +
            `💰 **Totaal Budget:** ${stats.totalBudget}\n` +
            `📊 **Gemiddeld Budget:** ${stats.averageBudget}\n\n` +
            `📍 **Locaties:** ${stats.locations.join(', ')}\n` +
            `🏗️ **Types:** ${stats.types.join(', ')}`;
        return {
            content: [
                {
                    type: 'text',
                    text: statsText,
                },
            ],
        };
    }
    async handleGetProjectsSummary() {
        const projects = await this.apiClient.getProjects();
        const stats = await this.apiClient.getProjectStats();
        const completedProjects = projects.filter(p => p.status === 'completed');
        const inProgressProjects = projects.filter(p => p.status === 'in-progress');
        const planningProjects = projects.filter(p => p.status === 'planning');
        let summary = `📋 **Yannova Projecten Overzicht**\n\n`;
        summary += `📊 **Samenvatting:** ${stats.total} projecten, ${stats.totalBudget} totaal budget\n\n`;
        if (completedProjects.length > 0) {
            summary += `✅ **Voltooide Projecten (${completedProjects.length}):**\n`;
            completedProjects.slice(0, 3).forEach(project => {
                summary += `   • ${project.title} (${project.location}) - ${project.budget}\n`;
            });
            if (completedProjects.length > 3) {
                summary += `   ... en ${completedProjects.length - 3} andere\n`;
            }
            summary += `\n`;
        }
        if (inProgressProjects.length > 0) {
            summary += `🔨 **Lopende Projecten (${inProgressProjects.length}):**\n`;
            inProgressProjects.forEach(project => {
                summary += `   • ${project.title} (${project.location}) - ${project.budget}\n`;
            });
            summary += `\n`;
        }
        if (planningProjects.length > 0) {
            summary += `📋 **Geplande Projecten (${planningProjects.length}):**\n`;
            planningProjects.forEach(project => {
                summary += `   • ${project.title} (${project.location}) - ${project.budget}\n`;
            });
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
    async handleEstimateProjectCost(args) {
        const { type, size = 'gemiddeld', location = 'Vlaanderen', features = [] } = args;
        // Base costs for different project types (in euros)
        const baseCosts = {
            'nieuwbouw': { min: 200000, max: 600000, avg: 350000 },
            'renovatie': { min: 15000, max: 150000, avg: 50000 },
            'badkamer': { min: 8000, max: 25000, avg: 15000 },
            'keuken': { min: 10000, max: 30000, avg: 18000 },
            'crepi': { min: 5000, max: 20000, avg: 12000 },
            'ramen-deuren': { min: 3000, max: 15000, avg: 8000 },
            'dakwerken': { min: 10000, max: 40000, avg: 22000 }
        };
        const projectType = Object.keys(baseCosts).find(key => type.toLowerCase().includes(key)) || 'renovatie';
        const baseCost = baseCosts[projectType];
        // Size multiplier
        const sizeMultiplier = {
            'klein': 0.7,
            'gemiddeld': 1.0,
            'groot': 1.4,
            'extra-groot': 1.8
        }[size] || 1.0;
        // Feature multipliers
        let featureMultiplier = 1.0;
        if (features.length > 0) {
            featureMultiplier = 1 + (features.length * 0.1); // 10% per extra feature
        }
        // Location multiplier (Vlaanderen variations)
        const locationMultiplier = {
            'antwerpen': 1.1,
            'brussel': 1.3,
            'gent': 1.05,
            'brugge': 1.0,
            'leuven': 1.0,
            'mechelen': 1.0,
            'hasselt': 0.95,
            'vlaanderen': 1.0
        }[location.toLowerCase()] || 1.0;
        const estimatedCost = Math.round(baseCost.avg * sizeMultiplier * featureMultiplier * locationMultiplier);
        const costRange = {
            min: Math.round(baseCost.min * sizeMultiplier * featureMultiplier * locationMultiplier),
            max: Math.round(baseCost.max * sizeMultiplier * featureMultiplier * locationMultiplier)
        };
        const estimate = `💰 **Kostenraming voor ${type}**\n\n` +
            `📍 **Locatie:** ${location}\n` +
            `📐 **Grootte:** ${size}\n` +
            `⭐ **Extra features:** ${features.length > 0 ? features.join(', ') : 'Geen'}\n\n` +
            `💶 **Geschatte kosten:** €${estimatedCost.toLocaleString()}\n` +
            `📊 **Kostenbereik:** €${costRange.min.toLocaleString()} - €${costRange.max.toLocaleString()}\n\n` +
            `📝 **Inclusief:**\n` +
            `   • Materialen en arbeid\n` +
            `   • BTW (21%)\n` +
            `   • Basis planning en coördinatie\n\n` +
            `⚠️ **Let op:** Dit is een indicatie. Voor een exacte offerte nemen we graag de tijd voor een persoonlijk gesprek!`;
        return {
            content: [
                {
                    type: 'text',
                    text: estimate,
                },
            ],
        };
    }
    async start() {
        const transport = new stdio_js_1.StdioServerTransport();
        await this.server.connect(transport);
        console.error('Yannova Projects MCP server is running...');
    }
}
// Start the server
const server = new YannovaProjectsServer();
server.start().catch((error) => {
    console.error('Failed to start server:', error);
    process.exit(1);
});
//# sourceMappingURL=index.js.map