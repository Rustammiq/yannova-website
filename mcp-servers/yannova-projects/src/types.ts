// Types for Yannova Projects MCP Server

export interface YannovaProject {
  id: string;
  title: string;
  description: string;
  location: string;
  type: string;
  status: 'planning' | 'in-progress' | 'completed';
  budget: string;
  images: string[];
  createdAt: string;
  updatedAt: string;
}

export interface CreateProjectRequest {
  title: string;
  description: string;
  location: string;
  type: string;
  budget: string;
  images?: string[];
}

export interface UpdateProjectRequest {
  id: string;
  title?: string;
  description?: string;
  location?: string;
  type?: string;
  status?: 'planning' | 'in-progress' | 'completed';
  budget?: string;
  images?: string[];
}

export interface ProjectFilter {
  status?: 'planning' | 'in-progress' | 'completed';
  type?: string;
  location?: string;
  budgetMin?: number;
  budgetMax?: number;
}

export interface ProjectStats {
  total: number;
  completed: number;
  inProgress: number;
  planning: number;
  totalBudget: string;
  averageBudget: string;
  locations: string[];
  types: string[];
}
