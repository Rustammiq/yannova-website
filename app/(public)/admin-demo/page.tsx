'use client';

import Navigation from "@/components/ui/Navigation";
import Footer from "@/components/ui/Footer";
import InlineTextEditor from "@/components/admin/InlineTextEditor";
import InlineImageEditor from "@/components/admin/InlineImageEditor";
import { useContent } from "@/lib/useContent";
import { useAdmin } from "@/lib/adminContext";
import { AlertCircle, CheckCircle } from "lucide-react";

export default function AdminDemoPage() {
  const { isAdmin, isEditing } = useAdmin();
  
  // Content voor verschillende secties
  const heroTitle = useContent({ 
    key: 'demo-hero-title', 
    defaultValue: 'Inline Editing Demo' 
  });
  
  const heroDescription = useContent({ 
    key: 'demo-hero-description', 
    defaultValue: 'Deze pagina toont hoe admins direct op de website tekst en afbeeldingen kunnen bewerken zonder naar de admin panel te gaan.' 
  });
  
  const sectionTitle = useContent({ 
    key: 'demo-section-title', 
    defaultValue: 'Bewerkbare Content' 
  });
  
  const sectionText = useContent({ 
    key: 'demo-section-text', 
    defaultValue: 'Klik op de bewerkingsknop rechtsboven om de bewerkingsmodus in te schakelen. Vervolgens kun je op tekst en afbeeldingen klikken om ze direct te bewerken.' 
  });

  if (!isAdmin) {
    return (
      <div className="min-h-screen">
        <Navigation />
        <div className="pt-32 pb-16 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Toegang Geweigerd</h1>
            <p className="text-lg text-gray-600 mb-8">
              Deze pagina is alleen toegankelijk voor admin gebruikers.
            </p>
            <a
              href="/admin/login"
              className="inline-block bg-yannova-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-yannova-primary/90 transition-colors"
            >
              Inloggen als Admin
            </a>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-yannova-dark to-yannova-gray text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">
            <InlineTextEditor
              value={heroTitle.content}
              onSave={heroTitle.updateContent}
              className="text-5xl font-bold"
              fieldName="Hero Titel"
            />
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            <InlineTextEditor
              value={heroDescription.content}
              onSave={heroDescription.updateContent}
              className="text-xl text-gray-300"
              multiline={true}
              fieldName="Hero Beschrijving"
            />
          </p>
          
          {isEditing && (
            <div className="bg-green-600/20 border border-green-500/30 rounded-lg p-4 mb-8">
              <div className="flex items-center gap-2 text-green-300">
                <CheckCircle className="w-5 h-5" />
                <span className="font-semibold">Bewerkingsmodus Actief</span>
              </div>
              <p className="text-green-200 text-sm mt-1">
                Klik op tekst of afbeeldingen om ze te bewerken
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                <InlineTextEditor
                  value={sectionTitle.content}
                  onSave={sectionTitle.updateContent}
                  className="text-3xl font-bold text-gray-900"
                  fieldName="Sectie Titel"
                />
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                <InlineTextEditor
                  value={sectionText.content}
                  onSave={sectionText.updateContent}
                  className="text-lg text-gray-600"
                  multiline={true}
                  fieldName="Sectie Tekst"
                />
              </p>
            </div>
            
            <div>
              <InlineImageEditor
                src="/images/projects/project-1-villa.jpg"
                alt="Demo afbeelding"
                onSave={async (file) => {
                  const formData = new FormData();
                  formData.append('file', file);
                  formData.append('category', 'demo');
                  
                  const response = await fetch('/api/photos', {
                    method: 'POST',
                    body: formData,
                  });
                  
                  if (!response.ok) {
                    throw new Error('Failed to upload image');
                  }
                  
                  const result = await response.json();
                  await fetch('/api/admin/content', {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ 
                      key: 'demo-image', 
                      content: result.url 
                    }),
                  });
                }}
                width={400}
                height={300}
                className="rounded-lg shadow-lg"
                fieldName="Demo Afbeelding"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Inline Editing Features
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg p-6 shadow-md">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Tekst Bewerken</h3>
              <p className="text-gray-600 mb-4">
                Klik op tekst om deze direct te bewerken. Ondersteunt zowel enkelvoudige als meerdere regels.
              </p>
              <div className="bg-yannova-primary/10 text-yannova-primary px-3 py-1 rounded text-sm font-semibold">
                ✓ Real-time editing
              </div>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-md">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Afbeelding Uploaden</h3>
              <p className="text-gray-600 mb-4">
                Vervang afbeeldingen door nieuwe te uploaden. Automatische optimalisatie en preview.
              </p>
              <div className="bg-yannova-primary/10 text-yannova-primary px-3 py-1 rounded text-sm font-semibold">
                ✓ Image optimization
              </div>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-md">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Admin Only</h3>
              <p className="text-gray-600 mb-4">
                Alleen ingelogde admin gebruikers kunnen de bewerkingsmodus activeren en content wijzigen.
              </p>
              <div className="bg-yannova-primary/10 text-yannova-primary px-3 py-1 rounded text-sm font-semibold">
                ✓ Secure editing
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
