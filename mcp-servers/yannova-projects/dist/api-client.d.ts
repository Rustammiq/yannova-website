import { YannovaProject, CreateProjectRequest, UpdateProjectRequest, ProjectFilter, ProjectStats } from './types.js';
export declare class YannovaProjectsApiClient {
    private baseUrl;
    constructor(baseUrl?: string);
    getProjects(): Promise<YannovaProject[]>;
    getProject(id: string): Promise<YannovaProject>;
    createProject(request: CreateProjectRequest): Promise<YannovaProject>;
    updateProject(request: UpdateProjectRequest): Promise<YannovaProject>;
    deleteProject(id: string): Promise<void>;
    getProjectsByFilter(filter: ProjectFilter): Promise<YannovaProject[]>;
    getProjectStats(): Promise<ProjectStats>;
    getProjectsByLocation(): Promise<Record<string, YannovaProject[]>>;
    getProjectsByType(): Promise<Record<string, YannovaProject[]>>;
    getProjectsByStatus(): Promise<Record<string, YannovaProject[]>>;
}
//# sourceMappingURL=api-client.d.ts.map