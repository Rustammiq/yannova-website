import { Loader2 } from 'lucide-react';

interface LoadingProps {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
  fullScreen?: boolean;
}

export default function Loading({ 
  size = 'md', 
  text = 'Laden...', 
  fullScreen = false 
}: LoadingProps) {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12'
  };

  const containerClasses = fullScreen 
    ? 'min-h-screen flex items-center justify-center bg-gray-50'
    : 'flex items-center justify-center p-8';

  return (
    <div className={containerClasses}>
      <div className="flex flex-col items-center space-y-4">
        <Loader2 className={`${sizeClasses[size]} animate-spin text-yannova-primary`} />
        {text && (
          <p className="text-gray-600 text-sm">{text}</p>
        )}
      </div>
    </div>
  );
}

// Skeleton loading components
export function SkeletonCard() {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <div className="loading-skeleton h-4 w-3/4 rounded mb-4"></div>
      <div className="loading-skeleton h-3 w-full rounded mb-2"></div>
      <div className="loading-skeleton h-3 w-5/6 rounded mb-4"></div>
      <div className="loading-skeleton h-8 w-24 rounded"></div>
    </div>
  );
}

export function SkeletonText({ lines = 3 }: { lines?: number }) {
  return (
    <div className="space-y-2">
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className={`loading-skeleton h-4 rounded ${
            i === lines - 1 ? 'w-3/4' : 'w-full'
          }`}
        ></div>
      ))}
    </div>
  );
}
