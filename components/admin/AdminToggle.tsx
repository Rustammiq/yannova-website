'use client';

import { useAdmin } from '@/lib/adminContext';
import { Edit3, Eye, Loader2 } from 'lucide-react';

export default function AdminToggle() {
  const { isAdmin, isEditing, toggleEditing, isLoading } = useAdmin();

  if (isLoading) {
    return (
      <div className="fixed top-4 right-4 z-50">
        <div className="bg-gray-800 text-white px-4 py-2 rounded-lg shadow-lg">
          <Loader2 className="w-4 h-4 animate-spin" />
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="fixed top-4 right-4 z-50">
      <button
        onClick={toggleEditing}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg shadow-lg transition-all duration-200 ${
          isEditing
            ? 'bg-yannova-primary text-white hover:bg-yannova-primary/80'
            : 'bg-gray-800 text-white hover:bg-gray-700'
        }`}
        title={isEditing ? 'Bewerkingsmodus uit' : 'Bewerkingsmodus aan'}
      >
        {isEditing ? (
          <>
            <Edit3 className="w-4 h-4" />
            <span className="hidden sm:inline">Bewerken Uit</span>
          </>
        ) : (
          <>
            <Eye className="w-4 h-4" />
            <span className="hidden sm:inline">Bewerken Aan</span>
          </>
        )}
      </button>
      
      {isEditing && (
        <div className="mt-2 bg-yannova-primary/10 border border-yannova-primary/20 rounded-lg p-3 text-sm text-gray-700 max-w-xs">
          <div className="font-semibold text-yannova-primary mb-1">Bewerkingsmodus Actief</div>
          <div className="text-xs">
            Klik op tekst of afbeeldingen om ze te bewerken. Wijzigingen worden direct opgeslagen.
          </div>
        </div>
      )}
    </div>
  );
}
