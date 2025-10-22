"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { signOut } from "next-auth/react";
import Image from "next/image";
import {
  Plus,
  Edit,
  Trash2,
  Upload,
  Image as ImageIcon,
  Bot,
  Save,
  Loader2,
  Search,
  Filter,
  ArrowLeft,
} from "lucide-react";

interface Project {
  id: string;
  title: string;
  description: string;
  location: string;
  type: string;
  status: 'completed' | 'in-progress' | 'planning';
  budget: string;
  images: string[];
  createdAt: string;
  updatedAt: string;
}

export default function ProjectsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [showAddModal, setShowAddModal] = useState(false);
  const [newProject, setNewProject] = useState({
    title: "",
    description: "",
    location: "",
    type: "",
    budget: "",
    status: "planning" as 'planning' | 'in-progress' | 'completed',
  });
  const [aiGenerating, setAiGenerating] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/admin/login");
    }
  }, [status, router]);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/projects');
      if (!response.ok) {
        throw new Error('Failed to fetch projects');
      }
      const data: Project[] = await response.json();
      setProjects(data);
    } catch (error) {
      console.error("Error loading projects:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateProject = async () => {
    setIsCreating(true);
    try {
      const response = await fetch('/api/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProject),
      });

      if (!response.ok) {
        throw new Error('Failed to create project');
      }

      const createdProject: Project = await response.json();
      setProjects([createdProject, ...projects]);
      setNewProject({
        title: "",
        description: "",
        location: "",
        type: "",
        budget: "",
        status: "planning",
      });
      setShowAddModal(false);
    } catch (error) {
      console.error("Error creating project:", error);
    } finally {
      setIsCreating(false);
    }
  };

  const handleDeleteProject = async (id: string) => {
    if (confirm("Weet je zeker dat je dit project wilt verwijderen?")) {
      try {
        const response = await fetch(`/api/projects?id=${id}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          throw new Error('Failed to delete project');
        }

        setProjects(projects.filter(p => p.id !== id));
      } catch (error) {
        console.error("Error deleting project:", error);
        alert("Er is een fout opgetreden bij het verwijderen van het project.");
      }
    }
  };

  const generateAIContent = async (project: Project | typeof newProject) => {
    setAiGenerating(true);
    try {
      // Simulate AI content generation
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const projectTitle = 'title' in project ? project.title : 'Nieuw Project';
      const projectType = 'type' in project ? project.type : 'project';
      const projectLocation = 'location' in project ? project.location : 'deze locatie';
      
      const aiDescription = `AI-gegenereerde beschrijving voor ${projectTitle}: Een prachtig ${projectType.toLowerCase()} project in ${projectLocation} dat perfect aansluit bij de moderne bouwtrends en duurzaamheidseisen. Dit project toont ons vakmanschap en aandacht voor detail.`;
      
      if (editingProject) {
        setEditingProject({ ...editingProject, description: aiDescription });
      } else {
        setNewProject({ ...newProject, description: aiDescription });
      }
    } catch (error) {
      console.error("Error generating AI content:", error);
    } finally {
      setAiGenerating(false);
    }
  };

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === "all" || project.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  if (status === "loading" || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-800">
        <Loader2 className="animate-spin text-yannova-primary" size={48} />
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-800">
      {/* Header */}
      <header className="bg-gray-900 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => router.push("/admin")}
                className="flex items-center space-x-2 text-gray-300 hover:text-yannova-primary transition-colors"
              >
                <ArrowLeft size={20} />
                <span>Terug naar Dashboard</span>
              </button>
              <span className="text-gray-400">|</span>
              <h1 className="text-2xl font-bold text-yannova-primary">
                Projecten Beheer
              </h1>
            </div>
            <button
              onClick={() => signOut({ callbackUrl: "/admin/login" })}
              className="text-gray-300 hover:text-red-600 transition-colors"
            >
              Uitloggen
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Controls */}
        <div className="bg-gray-900 rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-4 flex-1">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Zoek projecten..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-yannova-primary focus:border-yannova-primary text-white placeholder-gray-400"
                />
              </div>

              {/* Filter */}
              <div className="flex items-center space-x-2">
                <Filter size={20} className="text-gray-400" />
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yannova-primary focus:border-yannova-primary text-white"
                  title="Filter op project status"
                >
                  <option value="all">Alle Status</option>
                  <option value="completed">Voltooid</option>
                  <option value="in-progress">Bezig</option>
                  <option value="planning">Planning</option>
                </select>
              </div>
            </div>

            {/* Add Project Button */}
            <button
              onClick={() => setShowAddModal(true)}
              className="bg-yannova-primary text-white px-6 py-2 rounded-lg flex items-center space-x-2 hover:bg-yannova-primary/90 transition-colors"
            >
              <Plus size={20} />
              <span>Nieuw Project</span>
            </button>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <div key={project.id} className="bg-gray-900 rounded-lg shadow-sm overflow-hidden">
              {/* Project Image */}
              <div className="relative h-48 bg-gray-700">
                {project.images.length > 0 ? (
                  <Image
                    src={project.images[0]}
                    alt={project.title}
                    width={400}
                    height={300}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <ImageIcon className="text-gray-400" size={48} />
                  </div>
                )}
                <div className="absolute top-2 right-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    project.status === 'completed' ? 'bg-green-100 text-green-800' :
                    project.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {project.status === 'completed' ? 'Voltooid' :
                     project.status === 'in-progress' ? 'Bezig' : 'Planning'}
                  </span>
                </div>
              </div>

              {/* Project Info */}
              <div className="p-4">
                <h3 className="font-semibold text-white mb-2">{project.title}</h3>
                <p className="text-sm text-gray-300 mb-3 line-clamp-2">{project.description}</p>
                
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Locatie:</span>
                    <span className="font-medium">{project.location}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Type:</span>
                    <span className="font-medium">{project.type}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Budget:</span>
                    <span className="font-medium text-yannova-primary">{project.budget}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex space-x-2">
                  <button
                    onClick={() => setEditingProject(project)}
                    className="flex-1 bg-blue-100 text-blue-800 px-3 py-2 rounded-lg text-sm font-medium hover:bg-blue-200 transition-colors flex items-center justify-center space-x-1"
                  >
                    <Edit size={16} />
                    <span>Bewerken</span>
                  </button>
                  <button
                    onClick={() => handleDeleteProject(project.id)}
                    className="bg-red-100 text-red-800 px-3 py-2 rounded-lg text-sm font-medium hover:bg-red-200 transition-colors"
                    title="Project verwijderen"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <ImageIcon className="mx-auto text-gray-400" size={48} />
            <h3 className="mt-4 text-lg font-medium text-white">Geen projecten gevonden</h3>
            <p className="mt-2 text-gray-300">Probeer je zoekterm aan te passen of voeg een nieuw project toe.</p>
          </div>
        )}
      </div>

      {/* Add Project Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-gray-900 rounded-xl shadow-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold text-white mb-6">Nieuw Project Toevoegen</h2>
            
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-2">Titel</label>
                  <input
                    type="text"
                    value={newProject.title}
                    onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-yannova-primary focus:border-yannova-primary text-white placeholder-gray-400"
                    placeholder="Project titel"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-2">Locatie</label>
                  <input
                    type="text"
                    value={newProject.location}
                    onChange={(e) => setNewProject({ ...newProject, location: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-yannova-primary focus:border-yannova-primary text-white placeholder-gray-400"
                    placeholder="Keerbergen, Mechelen, etc."
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">Beschrijving</label>
                <div className="flex space-x-2">
                  <textarea
                    value={newProject.description}
                    onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                    className="flex-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-yannova-primary focus:border-yannova-primary text-white placeholder-gray-400"
                    rows={3}
                    placeholder="Project beschrijving"
                  />
                  <button
                    onClick={() => generateAIContent(newProject)}
                    disabled={aiGenerating}
                    className="bg-purple-100 text-purple-800 px-3 py-2 rounded-lg hover:bg-purple-200 transition-colors disabled:opacity-50"
                    title="AI beschrijving genereren"
                  >
                    {aiGenerating ? (
                      <Loader2 className="animate-spin" size={20} />
                    ) : (
                      <Bot size={20} />
                    )}
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-2">Type</label>
                  <select
                    value={newProject.type}
                    onChange={(e) => setNewProject({ ...newProject, type: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-yannova-primary focus:border-yannova-primary text-white placeholder-gray-400"
                    title="Project type selecteren"
                  >
                    <option value="">Selecteer type</option>
                    <option value="Nieuwbouw">Nieuwbouw</option>
                    <option value="Renovatie">Renovatie</option>
                    <option value="Gevelwerk">Gevelwerk</option>
                    <option value="Badkamer">Badkamer</option>
                    <option value="Keuken">Keuken</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-2">Status</label>
                  <select
                    value={newProject.status}
                    onChange={(e) => setNewProject({ ...newProject, status: e.target.value as 'planning' | 'in-progress' | 'completed' })}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-yannova-primary focus:border-yannova-primary text-white placeholder-gray-400"
                    title="Project status selecteren"
                  >
                    <option value="planning">Planning</option>
                    <option value="in-progress">Bezig</option>
                    <option value="completed">Voltooid</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-2">Budget</label>
                  <input
                    type="text"
                    value={newProject.budget}
                    onChange={(e) => setNewProject({ ...newProject, budget: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-yannova-primary focus:border-yannova-primary text-white placeholder-gray-400"
                    placeholder="€25.000"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">Foto's Uploaden</label>
                <div className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center">
                  <Upload className="mx-auto text-gray-400" size={48} />
                  <p className="mt-2 text-sm text-gray-300">Sleep foto's hierheen of klik om te uploaden</p>
                  <button className="mt-2 bg-yannova-primary text-white px-4 py-2 rounded-lg text-sm hover:bg-yannova-primary/90 transition-colors">
                    Foto's Selecteren
                  </button>
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 text-gray-300 hover:text-gray-800 transition-colors"
              >
                Annuleren
              </button>
              <button
                onClick={handleCreateProject}
                disabled={isCreating}
                className="bg-yannova-primary text-white px-6 py-2 rounded-lg flex items-center space-x-2 hover:bg-yannova-primary/90 transition-colors disabled:opacity-50"
              >
                {isCreating ? (
                  <>
                    <Loader2 className="animate-spin" size={20} />
                    <span>Toevoegen...</span>
                  </>
                ) : (
                  <>
                    <Save size={20} />
                    <span>Project Toevoegen</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
