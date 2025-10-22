"use client";

import Navigation from "@/components/ui/Navigation";
import Footer from "@/components/ui/Footer";
import Chatbot from "@/components/chatbot/Chatbot";
import Image from "next/image";
import { photoManager } from "@/lib/photoManager";
import { useEffect, useState } from "react";
import InlinePhotoEditor from "@/components/admin/InlinePhotoEditor";
import { usePhotos } from "@/lib/usePhotos";

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

export default function ProjectenPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Load photos for gallery
  const { photos: galleryPhotos, updatePhotos: updateGalleryPhotos } = usePhotos({ 
    category: 'gallery', 
    limit: 8 
  });

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

  // Get unique project image using PhotoManager
  const _getProjectImage = (id: number) => {
    const photo = photoManager.getProjectPhoto(id);
    return photo.src;
  };

  // Video mapping for projects with videos - using real Yannova videos
  const _getProjectVideo = (id: number) => {
    const videoMap: { [key: number]: string } = {
      1: 'project-1-slideshow.mp4',
      2: 'project-2-slideshow.mp4',
      5: 'project-5-slideshow.mp4',
      7: 'yannova-renovatie.mp4',        // Real Yannova renovation video
      8: 'yannova-ramen-deuren.mp4',     // Real Yannova windows & doors video
      9: 'yannova-vakmanschap.mp4'       // Real Yannova craftsmanship video
    };
    return videoMap[id] ? `/videos/projects/${videoMap[id]}` : null;
  };

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-yannova-dark to-yannova-gray text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Onze Projecten
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl">
            Bekijk een selectie van onze succesvol afgeronde projecten
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-yannova-primary mb-2">
                100+
              </div>
              <div className="text-gray-600">Projecten Afgerond</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-yannova-primary mb-2">
                15+
              </div>
              <div className="text-gray-600">Jaar Ervaring</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-yannova-primary mb-2">
                98%
              </div>
              <div className="text-gray-600">Klanttevredenheid</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-yannova-primary mb-2">
                24/7
              </div>
              <div className="text-gray-600">Bereikbaar</div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {isLoading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yannova-primary mx-auto"></div>
              <p className="mt-4 text-gray-600">Projecten laden...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project) => (
                <div
                  key={project.id}
                  className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 hover:scale-105 group"
                >
                  {/* Project Media */}
                  <div className="aspect-video relative overflow-hidden">
                    {project.images.length > 0 ? (
                      <Image
                        src={project.images[0]}
                        alt={`${project.title} - ${project.type}`}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-400">Geen afbeelding</span>
                      </div>
                    )}
                    
                    {/* Status Badge */}
                    <div className="absolute top-4 left-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        project.status === 'completed' ? 'bg-green-500/90 text-white' :
                        project.status === 'in-progress' ? 'bg-blue-500/90 text-white' :
                        'bg-yellow-500/90 text-white'
                      }`}>
                        {project.status === 'completed' ? 'Voltooid' :
                         project.status === 'in-progress' ? 'Bezig' : 'Planning'}
                      </span>
                    </div>
                    
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>

                  {/* Project Info */}
                  <div className="p-6 transform group-hover:translate-y-[-4px] transition-transform duration-300">
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-yannova-primary transition-colors duration-300">
                      {project.title}
                    </h3>

                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                      {project.description}
                    </p>

                    {/* Meta Info */}
                    <div className="flex items-center gap-4 text-sm text-gray-500 pt-4 border-t border-gray-100 group-hover:border-yannova-primary/20 transition-colors duration-300">
                      <div className="flex items-center gap-1 group-hover:text-yannova-primary transition-colors duration-300">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:scale-110 transition-transform duration-300">
                          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                          <circle cx="12" cy="10" r="3"></circle>
                        </svg>
                        <span>{project.location}</span>
                      </div>
                      <div className="flex items-center gap-1 group-hover:text-yannova-primary transition-colors duration-300">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:scale-110 transition-transform duration-300">
                          <rect width="18" height="18" x="3" y="4" rx="2" ry="2"></rect>
                          <line x1="16" y1="2" x2="16" y2="6"></line>
                          <line x1="8" y1="2" x2="8" y2="6"></line>
                          <line x1="3" y1="10" x2="21" y2="10"></line>
                        </svg>
                        <span>{project.createdAt}</span>
                      </div>
                    </div>
                    
                    {/* Budget */}
                    <div className="mt-2 text-sm text-yannova-primary font-semibold">
                      {project.budget}
                    </div>
                    
                    {/* View Project Button */}
                    <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <button
                        className="w-full bg-yannova-primary/10 text-yannova-primary px-4 py-2 rounded-lg font-semibold text-sm hover:bg-yannova-primary hover:text-white transition-all duration-300 transform hover:scale-105"
                        onClick={() => console.log(`Bekijk project: ${project.title}`)}
                      >
                        Bekijk Project
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Video Showcase Sectie */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Project Video's
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Bekijk onze projecten in beweging - van nieuwbouw tot renovatie
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {/* Yannova Renovatie Video */}
            <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105">
              <div className="aspect-video relative group">
                <video
                  src="/videos/projects/yannova-renovatie.mp4"
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  muted
                  loop
                  playsInline
                  poster="/images/projects/project-7-crepi.png"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-xl font-bold">Yannova Renovatie</h3>
                  <p className="text-sm opacity-90">Professioneel vakmanschap</p>
                </div>
                {/* Play indicator */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-white/20 backdrop-blur-sm rounded-full p-4">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                      <polygon points="5,3 19,12 5,21"></polygon>
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Yannova Ramen & Deuren Video */}
            <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105">
              <div className="aspect-video relative group">
                <video
                  src="/videos/projects/yannova-ramen-deuren.mp4"
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  muted
                  loop
                  playsInline
                  poster="/images/projects/project-8-windows.png"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-xl font-bold">Ramen & Deuren</h3>
                  <p className="text-sm opacity-90">Nieuwe uitstraling</p>
                </div>
                {/* Play indicator */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-white/20 backdrop-blur-sm rounded-full p-4">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                      <polygon points="5,3 19,12 5,21"></polygon>
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Yannova Vakmanschap Video */}
            <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105">
              <div className="aspect-video relative group">
                <video
                  src="/videos/projects/yannova-vakmanschap.mp4"
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  muted
                  loop
                  playsInline
                  poster="/images/projects/project-3-office.png"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-xl font-bold">Yannova Vakmanschap</h3>
                  <p className="text-sm opacity-90">Kwaliteit en precisie</p>
                </div>
                {/* Play indicator */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-white/20 backdrop-blur-sm rounded-full p-4">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                      <polygon points="5,3 19,12 5,21"></polygon>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI Automatisering Video Sectie */}
      <section className="py-20 bg-gradient-to-br from-yannova-primary/5 to-yannova-primary/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              AI Automatisering & Innovatie
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Ontdek hoe Yannova AI en moderne technologie gebruikt om bouwprocessen te optimaliseren
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* AI Chatbot */}
            <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 group">
              <div className="aspect-video relative">
                <video
                  src="/videos/ai-automation/ai-chatbot-construction-advice.mp4"
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  muted
                  loop
                  playsInline
                  poster="/images/projects/project-1-villa.jpg"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-lg font-bold">AI Chatbot Bouwadvies</h3>
                  <p className="text-sm opacity-90">24/7 bouwadvies</p>
                </div>
                <div className="absolute top-4 right-4">
                  <span className="bg-yannova-primary text-white px-3 py-1 rounded-full text-xs font-semibold pulse-ai">
                    AI
                  </span>
                </div>
              </div>
            </div>

            {/* Process Automation */}
            <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 group">
              <div className="aspect-video relative">
                <video
                  src="/videos/ai-automation/construction-process-automation.mp4"
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  muted
                  loop
                  playsInline
                  poster="/images/projects/project-2-monument.jpg"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-lg font-bold">Automatisering Bouwproces</h3>
                  <p className="text-sm opacity-90">Smart project management</p>
                </div>
                <div className="absolute top-4 right-4">
                  <span className="bg-yannova-primary text-white px-3 py-1 rounded-full text-xs font-semibold pulse-ai">
                    AI
                  </span>
                </div>
              </div>
            </div>

            {/* Smart Home */}
            <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 group">
              <div className="aspect-video relative">
                <video
                  src="/videos/ai-automation/smart-home-integration.mp4"
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  muted
                  loop
                  playsInline
                  poster="/images/projects/project-3-office.jpg"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-lg font-bold">Smart Home Integratie</h3>
                  <p className="text-sm opacity-90">IoT & automatisering</p>
                </div>
                <div className="absolute top-4 right-4">
                  <span className="bg-yannova-primary text-white px-3 py-1 rounded-full text-xs font-semibold pulse-ai">
                    AI
                  </span>
                </div>
              </div>
            </div>

            {/* VR Planning */}
            <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 group">
              <div className="aspect-video relative">
                <video
                  src="/videos/ai-automation/vr-construction-planning.mp4"
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  muted
                  loop
                  playsInline
                  poster="/images/projects/project-5-extension.jpg"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-lg font-bold">VR Bouwplanning</h3>
                  <p className="text-sm opacity-90">Virtual reality design</p>
                </div>
                <div className="absolute top-4 right-4">
                  <span className="bg-purple-600 text-white px-3 py-1 rounded-full text-xs font-semibold pulse-ai">
                    VR
                  </span>
                </div>
              </div>
            </div>

            {/* Drone Inspection */}
            <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 group">
              <div className="aspect-video relative">
                <video
                  src="/videos/ai-automation/drone-construction-inspection.mp4"
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  muted
                  loop
                  playsInline
                  poster="/images/projects/project-6-apartments.jpg"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-lg font-bold">Drone Inspectie</h3>
                  <p className="text-sm opacity-90">Aerial quality control</p>
                </div>
                <div className="absolute top-4 right-4">
                  <span className="bg-yannova-primary text-white px-3 py-1 rounded-full text-xs font-semibold pulse-ai">
                    AI
                  </span>
                </div>
              </div>
            </div>

            {/* AI Cost Calculator */}
            <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 group">
              <div className="aspect-video relative">
                <video
                  src="/videos/ai-automation/ai-cost-calculator.mp4"
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  muted
                  loop
                  playsInline
                  poster="/images/projects/project-7-crepi.jpg"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-lg font-bold">AI Kosten Calculator</h3>
                  <p className="text-sm opacity-90">Real-time pricing</p>
                </div>
                <div className="absolute top-4 right-4">
                  <span className="bg-yannova-primary text-white px-3 py-1 rounded-full text-xs font-semibold pulse-ai">
                    AI
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* AI Features Overview */}
          <div className="mt-16 bg-white rounded-2xl p-8 shadow-lg">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                AI-Powered Bouwoplossingen
              </h3>
              <p className="text-gray-600">
                Yannova gebruikt de nieuwste AI technologie om uw bouwproject te optimaliseren
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center p-4 rounded-lg bg-gradient-to-br from-yannova-primary/5 to-yannova-primary/10">
                <div className="w-12 h-12 bg-yannova-primary/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-yannova-primary">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                  </svg>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">AI Chatbot</h4>
                <p className="text-sm text-gray-600">24/7 bouwadvies en ondersteuning</p>
              </div>
              
              <div className="text-center p-4 rounded-lg bg-gradient-to-br from-yannova-primary/5 to-yannova-primary/10">
                <div className="w-12 h-12 bg-yannova-primary/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-yannova-primary">
                    <polyline points="22,12 18,12 15,21 9,3 6,12 2,12"></polyline>
                  </svg>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Smart Planning</h4>
                <p className="text-sm text-gray-600">Geautomatiseerde project planning</p>
              </div>
              
              <div className="text-center p-4 rounded-lg bg-gradient-to-br from-yannova-primary/5 to-yannova-primary/10">
                <div className="w-12 h-12 bg-yannova-primary/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-yannova-primary">
                    <polygon points="23,7 16,12 23,17 23,7"></polygon>
                    <rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>
                  </svg>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">VR Design</h4>
                <p className="text-sm text-gray-600">Virtual reality project visualisatie</p>
              </div>
              
              <div className="text-center p-4 rounded-lg bg-gradient-to-br from-yannova-primary/5 to-yannova-primary/10">
                <div className="w-12 h-12 bg-yannova-primary/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-yannova-primary">
                    <circle cx="12" cy="12" r="5"></circle>
                    <line x1="12" y1="1" x2="12" y2="3"></line>
                    <line x1="12" y1="21" x2="12" y2="23"></line>
                    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                    <line x1="1" y1="12" x2="3" y2="12"></line>
                    <line x1="21" y1="12" x2="23" y2="12"></line>
                    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                  </svg>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Smart Home</h4>
                <p className="text-sm text-gray-600">IoT en automatisering integratie</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Foto's en Documentatie Sectie */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Projectfoto's en Documentatie
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Elke renovatie wordt volledig gedocumenteerd met professionele foto's en technische specificaties
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            {/* Voor en Na Foto's */}
            <div className="bg-gray-50 rounded-xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Voor en Na Foto's
              </h3>
              <p className="text-gray-600 mb-6">
                Wij maken professionele foto's van elk project om de transformatie duidelijk te laten zien. 
                Van de eerste schets tot de finale oplevering - elk moment wordt vastgelegd.
              </p>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white rounded-lg p-4 text-center">
                    <div className="aspect-square bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg mb-3 flex items-center justify-center">
                      <span className="text-gray-500 text-sm">Voor foto</span>
                    </div>
                    <p className="text-sm text-gray-600">Voor renovatie</p>
                  </div>
                  <div className="bg-white rounded-lg p-4 text-center">
                    <div className="aspect-square bg-gradient-to-br from-yannova-primary/20 to-yannova-primary/5 rounded-lg mb-3 flex items-center justify-center">
                      <span className="text-yannova-primary text-sm">Na foto</span>
                    </div>
                    <p className="text-sm text-gray-600">Na renovatie</p>
                  </div>
                </div>
                <ul className="text-gray-600 text-sm space-y-1">
                  <li>• Hoge resolutie foto's</li>
                  <li>• Verschillende hoeken en details</li>
                  <li>• Professionele belichting</li>
                  <li>• 360° panoramafoto's</li>
                </ul>
              </div>
            </div>

            {/* Technische Documentatie */}
            <div className="bg-gray-50 rounded-xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Technische Documentatie
              </h3>
              <p className="text-gray-600 mb-6">
                Alle werkzaamheden worden gedocumenteerd met technische specificaties, 
                materialenlijsten en garantiecertificaten voor uw administratie en toekomstig onderhoud.
              </p>
              <div className="space-y-4">
                <div className="bg-white rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Crepi Projecten</h4>
                  <ul className="text-gray-600 text-sm space-y-1">
                    <li>• Crepi type en kleur specificaties</li>
                    <li>• Voorbehandeling documentatie</li>
                    <li>• Weersomstandigheden tijdens aanbreng</li>
                    <li>• Garantie en onderhoudsadvies</li>
                  </ul>
                </div>
                <div className="bg-white rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Ramen & Deuren</h4>
                  <ul className="text-gray-600 text-sm space-y-1">
                    <li>• U-waarde en isolatiewaarden</li>
                    <li>• Glas specificaties en garantie</li>
                    <li>• Afdichting en voegwerk details</li>
                    <li>• Onderhoudsvoorschriften</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Foto Galerij met Inline Editor */}
          <div className="bg-gradient-to-r from-yannova-primary/5 to-yannova-primary/10 rounded-xl p-8">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Projectfoto Galerij
              </h3>
              <p className="text-gray-600">
                Bekijk onze meest recente projecten met crepi, ramen en deuren renovaties
              </p>
            </div>
            
            <InlinePhotoEditor
              photos={galleryPhotos}
              onPhotosUpdate={updateGalleryPhotos}
              maxPhotos={8}
              category="gallery"
              aspectRatio="aspect-square"
            />
            
            <div className="text-center mt-6">
              <button
                className="bg-yannova-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-yannova-primary/90 transition-colors"
                onClick={() => console.log('Bekijk alle foto\'s')}
              >
                Bekijk Alle Foto's
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Wat Onze Klanten Zeggen
            </h2>
            <p className="text-xl text-gray-600">
              Tevreden klanten zijn onze beste referentie
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 rounded-xl p-8">
              <div className="text-yannova-primary text-4xl mb-4">"</div>
              <p className="text-gray-700 mb-6">
                Professioneel team dat precies wist wat ze deden. Ons huis is
                prachtig verbouwd en alles werd op tijd opgeleverd!
              </p>
              <div className="font-semibold text-gray-900">- Familie Jansen</div>
              <div className="text-sm text-gray-500">Amsterdam</div>
            </div>

            <div className="bg-gray-50 rounded-xl p-8">
              <div className="text-yannova-primary text-4xl mb-4">"</div>
              <p className="text-gray-700 mb-6">
                Uitstekende communicatie en vakmanschap. Ze dachten actief mee
                en kwamen met goede suggesties.
              </p>
              <div className="font-semibold text-gray-900">- P. de Vries</div>
              <div className="text-sm text-gray-500">Utrecht</div>
            </div>

            <div className="bg-gray-50 rounded-xl p-8">
              <div className="text-yannova-primary text-4xl mb-4">"</div>
              <p className="text-gray-700 mb-6">
                Van begin tot eind perfect geregeld. Aanrader voor iedereen die
                een betrouwbare aannemer zoekt!
              </p>
              <div className="font-semibold text-gray-900">- M. Bakker</div>
              <div className="text-sm text-gray-500">Rotterdam</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-yannova-primary">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Wilt u ook zo'n mooi project?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Neem contact op en ontdek wat wij voor u kunnen betekenen
          </p>
          <a
            href="/contact"
            className="inline-block bg-white text-yannova-primary px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
          >
            Start Uw Project
          </a>
        </div>
      </section>

      <Footer />
      <Chatbot />
    </div>
  );
}
