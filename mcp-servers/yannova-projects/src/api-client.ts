import fetch from 'node-fetch';
import { YannovaProject, CreateProjectRequest, UpdateProjectRequest, ProjectFilter, ProjectStats } from './types.js';

export class YannovaProjectsApiClient {
  private baseUrl: string;

  constructor(baseUrl: string = 'http://localhost:3000') {
    this.baseUrl = baseUrl;
  }

  async getProjects(): Promise<YannovaProject[]> {
    const response = await fetch(`${this.baseUrl}/api/projects`);

    if (!response.ok) {
      throw new Error(`Projects API error: ${response.status} ${response.statusText}`);
    }

    return (await response.json()) as YannovaProject[];
  }

  async getProject(id: string): Promise<YannovaProject> {
    const projects = await this.getProjects();
    const project = projects.find(p => p.id === id);

    if (!project) {
      throw new Error(`Project with id ${id} not found`);
    }

    return project;
  }

  async createProject(request: CreateProjectRequest): Promise<YannovaProject> {
    const response = await fetch(`${this.baseUrl}/api/projects`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      throw new Error(`Create project API error: ${response.status} ${response.statusText}`);
    }

    return (await response.json()) as YannovaProject;
  }

  async updateProject(request: UpdateProjectRequest): Promise<YannovaProject> {
    const response = await fetch(`${this.baseUrl}/api/projects`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      throw new Error(`Update project API error: ${response.status} ${response.statusText}`);
    }

    return (await response.json()) as YannovaProject;
  }

  async deleteProject(id: string): Promise<void> {
    const response = await fetch(`${this.baseUrl}/api/projects?id=${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error(`Delete project API error: ${response.status} ${response.statusText}`);
    }
  }

  async getProjectsByFilter(filter: ProjectFilter): Promise<YannovaProject[]> {
    const projects = await this.getProjects();

    return projects.filter(project => {
      if (filter.status && project.status !== filter.status) return false;
      if (filter.type && project.type !== filter.type) return false;
      if (filter.location && !project.location.toLowerCase().includes(filter.location.toLowerCase())) return false;

      if (filter.budgetMin || filter.budgetMax) {
        const budgetValue = parseFloat(project.budget.replace(/[^0-9.]/g, ''));
        if (filter.budgetMin && budgetValue < filter.budgetMin) return false;
        if (filter.budgetMax && budgetValue > filter.budgetMax) return false;
      }

      return true;
    });
  }

  async getProjectStats(): Promise<ProjectStats> {
    const projects = await this.getProjects();

    const stats: ProjectStats = {
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
  }

  async getProjectsByLocation(): Promise<Record<string, YannovaProject[]>> {
    const projects = await this.getProjects();

    return projects.reduce((acc, project) => {
      if (!acc[project.location]) {
        acc[project.location] = [];
      }
      acc[project.location].push(project);
      return acc;
    }, {} as Record<string, YannovaProject[]>);
  }

  async getProjectsByType(): Promise<Record<string, YannovaProject[]>> {
    const projects = await this.getProjects();

    return projects.reduce((acc, project) => {
      if (!acc[project.type]) {
        acc[project.type] = [];
      }
      acc[project.type].push(project);
      return acc;
    }, {} as Record<string, YannovaProject[]>);
  }

  async getProjectsByStatus(): Promise<Record<string, YannovaProject[]>> {
    const projects = await this.getProjects();

    return projects.reduce((acc, project) => {
      if (!acc[project.status]) {
        acc[project.status] = [];
      }
      acc[project.status].push(project);
      return acc;
    }, {} as Record<string, YannovaProject[]>);
  }
}
