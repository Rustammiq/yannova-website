"use client";

import { useEffect } from 'react';

interface PreloadProps {
  href: string;
  as: 'image' | 'font' | 'script' | 'style';
  type?: string;
  crossOrigin?: boolean;
}

export default function Preload({ href, as, type, crossOrigin }: PreloadProps) {
  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = href;
    link.as = as;

    if (type) link.type = type;
    if (crossOrigin) link.crossOrigin = 'anonymous';

    document.head.appendChild(link);

    return () => {
      document.head.removeChild(link);
    };
  }, [href, as, type, crossOrigin]);

  return null;
}


