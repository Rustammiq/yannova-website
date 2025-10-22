"use client";

import { useEffect, useMemo, useRef, useState } from 'react';

interface ScrollRevealProps {
  children: React.ReactNode;
  delay?: number; // in ms
  direction?: 'up' | 'down' | 'left' | 'right';
  distance?: number; // in px
  duration?: number; // in s
  className?: string;
}

export default function ScrollReveal({
  children,
  delay = 0,
  direction = 'up',
  distance = 30,
  duration = 0.6,
  className = ''
}: ScrollRevealProps) {
  const elementRef = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);

  // Respecteer gebruikersvoorkeur voor minder beweging
  const prefersReducedMotion = useMemo(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  useEffect(() => {
    const el = elementRef.current;
    if (!el) return;

    // Als gebruiker minder beweging prefereert: direct tonen zonder animatie
    if (prefersReducedMotion) {
      el.dataset.revealed = 'true';
      el.style.opacity = '1';
      el.style.transform = 'none';
      setRevealed(true);
      return;
    }

    let rafId: number | null = null;
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          // Eénmalige reveal, plan in rAF voor consistente paint
          const revealFn = () => {
            setTimeout(() => {
              el.dataset.revealed = 'true';
              setRevealed(true);
              observer.unobserve(el);
            }, delay);
          };
          if (typeof window !== 'undefined' && 'requestAnimationFrame' in window) {
            rafId = window.requestAnimationFrame(revealFn);
          } else {
            revealFn();
          }
        }
      },
      { threshold: 0.2, rootMargin: '0px 0px -10% 0px' }
    );

    observer.observe(el);

    // Fallback: toon na een redelijke timeout indien observer niet triggert
    const fallback = window.setTimeout(() => {
      if (!revealed) {
        el.dataset.revealed = 'true';
        setRevealed(true);
      }
    }, Math.max(1200, delay + 800));

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      try {
        observer.disconnect();
      } catch {}
      clearTimeout(fallback);
    };
  }, [delay, prefersReducedMotion, revealed]);

  // Stel initiële style in via inline op basis van direction/distance; verdere controle via data-attribute
  const initialTransform = useMemo(() => {
    switch (direction) {
      case 'up':
        return `translateY(${distance}px)`;
      case 'down':
        return `translateY(-${distance}px)`;
      case 'left':
        return `translateX(${distance}px)`;
      case 'right':
        return `translateX(-${distance}px)`;
      default:
        return `translateY(${distance}px)`;
    }
  }, [direction, distance]);

  return (
    <div
      ref={elementRef}
      className={`scroll-reveal ${className}`}
      data-revealed={revealed ? 'true' : 'false'}
      style={{
        opacity: revealed ? 1 : 0,
        transform: revealed ? 'none' : initialTransform,
        transitionProperty: 'opacity, transform',
        transitionTimingFunction: 'ease-out',
        transitionDuration: `${duration}s`,
        transitionDelay: `${delay}ms`
      }}
    >
      {children}
    </div>
  );
}
