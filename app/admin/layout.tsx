import { Suspense } from 'react';
import Loading from '@/components/ui/Loading';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense fallback={<Loading fullScreen text="Admin dashboard laden..." />}>
      {children}
    </Suspense>
  );
}
