'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';

interface AdminContextType {
  isAdmin: boolean;
  isEditing: boolean;
  toggleEditing: () => void;
  isLoading: boolean;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  const isAdmin = session?.user?.role === 'admin';

  useEffect(() => {
    setMounted(true);
    if (status !== 'loading') {
      setIsLoading(false);
    }
  }, [status]);

  // Prevent hydration mismatch
  if (!mounted) {
    return (
      <AdminContext.Provider value={{ isAdmin: false, isEditing: false, toggleEditing: () => {}, isLoading: true }}>
        {children}
      </AdminContext.Provider>
    );
  }

  const toggleEditing = () => {
    if (isAdmin) {
      setIsEditing(!isEditing);
    }
  };

  return (
    <AdminContext.Provider value={{ isAdmin, isEditing, toggleEditing, isLoading }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
}
