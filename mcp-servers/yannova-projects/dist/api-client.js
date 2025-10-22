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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.YannovaProjectsApiClient = void 0;
const node_fetch_1 = __importDefault(require("node-fetch"));
class YannovaProjectsApiClient {
    constructor(baseUrl = 'http://localhost:3000') {
        this.baseUrl = baseUrl;
    }
    getProjects() {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield (0, node_fetch_1.default)(`${this.baseUrl}/api/projects`);
            if (!response.ok) {
                throw new Error(`Projects API error: ${response.status} ${response.statusText}`);
            }
            return (yield response.json());
        });
    }
    getProject(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const projects = yield this.getProjects();
            const project = projects.find(p => p.id === id);
            if (!project) {
                throw new Error(`Project with id ${id} not found`);
            }
            return project;
        });
    }
    createProject(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield (0, node_fetch_1.default)(`${this.baseUrl}/api/projects`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(request),
            });
            if (!response.ok) {
                throw new Error(`Create project API error: ${response.status} ${response.statusText}`);
            }
            return (yield response.json());
        });
    }
    updateProject(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield (0, node_fetch_1.default)(`${this.baseUrl}/api/projects`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(request),
            });
            if (!response.ok) {
                throw new Error(`Update project API error: ${response.status} ${response.statusText}`);
            }
            return (yield response.json());
        });
    }
    deleteProject(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield (0, node_fetch_1.default)(`${this.baseUrl}/api/projects?id=${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error(`Delete project API error: ${response.status} ${response.statusText}`);
            }
        });
    }
    getProjectsByFilter(filter) {
        return __awaiter(this, void 0, void 0, function* () {
            const projects = yield this.getProjects();
            return projects.filter(project => {
                if (filter.status && project.status !== filter.status)
                    return false;
                if (filter.type && project.type !== filter.type)
                    return false;
                if (filter.location && !project.location.toLowerCase().includes(filter.location.toLowerCase()))
                    return false;
                if (filter.budgetMin || filter.budgetMax) {
                    const budgetValue = parseFloat(project.budget.replace(/[^0-9.]/g, ''));
                    if (filter.budgetMin && budgetValue < filter.budgetMin)
                        return false;
                    if (filter.budgetMax && budgetValue > filter.budgetMax)
                        return false;
                }
                return true;
            });
        });
    }
    getProjectStats() {
        return __awaiter(this, void 0, void 0, function* () {
            const projects = yield this.getProjects();
            const stats = {
                total: projects.length,
                completed: projects.filter(p => p.status === 'completed').length,
                inProgress: projects.filter(p => p.status === 'in-progress').length,
                planning: projects.filter(p => p.status === 'planning').length,
                totalBudget: '€0',
                averageBudget: '€0',
                locations: [],
                types: []
            };
            if (projects.length > 0) {
                const totalBudget = projects.reduce((sum, project) => {
                    return sum + parseFloat(project.budget.replace(/[^0-9.]/g, ''));
                }, 0);
                stats.totalBudget = `€${totalBudget.toLocaleString()}`;
                stats.averageBudget = `€${Math.round(totalBudget / projects.length).toLocaleString()}`;
                stats.locations = [...new Set(projects.map(p => p.location))];
                stats.types = [...new Set(projects.map(p => p.type))];
            }
            return stats;
        });
    }
    getProjectsByLocation() {
        return __awaiter(this, void 0, void 0, function* () {
            const projects = yield this.getProjects();
            return projects.reduce((acc, project) => {
                if (!acc[project.location]) {
                    acc[project.location] = [];
                }
                acc[project.location].push(project);
                return acc;
            }, {});
        });
    }
    getProjectsByType() {
        return __awaiter(this, void 0, void 0, function* () {
            const projects = yield this.getProjects();
            return projects.reduce((acc, project) => {
                if (!acc[project.type]) {
                    acc[project.type] = [];
                }
                acc[project.type].push(project);
                return acc;
            }, {});
        });
    }
    getProjectsByStatus() {
        return __awaiter(this, void 0, void 0, function* () {
            const projects = yield this.getProjects();
            return projects.reduce((acc, project) => {
                if (!acc[project.status]) {
                    acc[project.status] = [];
                }
                acc[project.status].push(project);
                return acc;
            }, {});
        });
    }
}
exports.YannovaProjectsApiClient = YannovaProjectsApiClient;
//# sourceMappingURL=api-client.js.map