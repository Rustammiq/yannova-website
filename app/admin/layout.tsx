'use client';

import { Suspense, useState } from 'react';
import Loading from '@/components/ui/Loading';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Image as ImageIcon, FileText, Mail, Eye, LogOut, Lock } from 'lucide-react';
import ChangePasswordModal from '@/components/admin/ChangePasswordModal';

function SidebarNav({ onPasswordChange }: { onPasswordChange: () => void }) {
  const pathname = usePathname();
  const items = [
    { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/admin/photos', label: "Foto's", icon: ImageIcon },
    { href: '/admin/projects', label: 'Projecten', icon: FileText },
    { href: '/admin/contacts', label: 'Contacten', icon: Mail },
    { href: '/admin/seo', label: 'SEO', icon: Eye },
  ];
  return (
    <aside className="hidden md:flex md:flex-col w-64 shrink-0 border-r border-gray-700 bg-gray-900">
      <div className="h-16 px-4 flex items-center border-b border-gray-700">
        <Link href="/admin" className="flex items-center gap-2">
          <span className="inline-block w-8 h-8 bg-yannova-primary rounded" />
          <span className="font-bold text-white">Yannova Admin</span>
        </Link>
      </div>
      <nav className="p-3 space-y-1">
        {items.map((item) => {
          const active = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                active
                  ? 'bg-yannova-primary text-white'
                  : 'text-gray-300 hover:bg-gray-800 hover:text-white'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{item.label}</span>
            </Link>
          );
        })}
        <button
          onClick={onPasswordChange}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-gray-300 hover:bg-gray-800 hover:text-white"
        >
          <Lock className="w-4 h-4" />
          <span>Wachtwoord Wijzigen</span>
        </button>
        <button
          onClick={() => window.location.href = '/api/auth/signout'}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-gray-300 hover:bg-gray-800 hover:text-white"
        >
          <LogOut className="w-4 h-4" />
          <span>Uitloggen</span>
        </button>
      </nav>
    </aside>
  );
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  return (
    <div className="min-h-screen bg-gray-800">
      <div className="md:flex md:min-h-screen">
        <SidebarNav onPasswordChange={() => setShowPasswordModal(true)} />
        <main className="flex-1 min-w-0">
          <div className="md:h-16 h-14 bg-gray-900 border-b border-gray-700 flex items-center px-4">
            <h1 className="text-lg font-semibold text-white">Beheer</h1>
          </div>
          <div className="p-4 md:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto">
              <Suspense fallback={<Loading text="Laden..." />}>{children}</Suspense>
            </div>
          </div>
        </main>
      </div>

      <ChangePasswordModal
        isOpen={showPasswordModal}
        onClose={() => setShowPasswordModal(false)}
      />
    </div>
  );
}
