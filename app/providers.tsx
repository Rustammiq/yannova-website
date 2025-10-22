"use client";

import { SessionProvider } from "next-auth/react";
import { ToasterProvider } from "@/components/ui/Toaster";
import { AdminProvider } from "@/lib/adminContext";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <AdminProvider>
        <ToasterProvider>{children}</ToasterProvider>
      </AdminProvider>
    </SessionProvider>
  );
}
