"use client";

import { useEffect, useRef, useState } from 'react';

interface LazyLoadProps {
  children: React.ReactNode;
  className?: string;
  threshold?: number;
  rootMargin?: string;
  fallback?: React.ReactNode;
}

export default function LazyLoad({
  children,
  className = '',
  threshold = 0.1,
  rootMargin = '50px',
  fallback = null
}: LazyLoadProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasLoaded) {
          setIsVisible(true);
          setHasLoaded(true);
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, [threshold, rootMargin, hasLoaded]);

  // Fallback: toon content na 2 seconden als intersection observer niet werkt
  useEffect(() => {
    if (!hasLoaded) {
      const timer = setTimeout(() => {
        setIsVisible(true);
        setHasLoaded(true);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [hasLoaded]);

  return (
    <div ref={elementRef} className={className}>
      {isVisible ? children : fallback}
    </div>
  );
}


