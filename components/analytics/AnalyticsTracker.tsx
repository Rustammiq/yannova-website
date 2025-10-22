"use client";

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import {
  trackPageView,
  trackEvent,
  trackContactForm,
  trackProjectView,
  trackServiceView,
  trackVideoPlay,
  trackScrollDepth,
  ANALYTICS_EVENTS,
  SERVICES,
  LOCATIONS
} from '@/lib/analytics';

export default function AnalyticsTracker() {
  const pathname = usePathname();

  // Track page views
  useEffect(() => {
    trackPageView(pathname, document.title);
  }, [pathname]);

  // Track scroll depth
  useEffect(() => {
    let lastTrackedPercentage = 0;

    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;

      const currentPercentage = Math.floor(scrollPercent / 25) * 25;

      if (currentPercentage > lastTrackedPercentage && currentPercentage <= 100) {
        trackScrollDepth(currentPercentage);
        lastTrackedPercentage = currentPercentage;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Track service page views
  useEffect(() => {
    const servicePaths = {
      '/diensten/nieuwbouw': SERVICES.NIEUWBOUW,
      '/diensten/verbouwing': SERVICES.VERBOUWING,
      '/diensten/renovatiewerken': SERVICES.RENOVATIE,
      '/diensten/crepi': SERVICES.CREPI,
      '/diensten/ramen-deuren': SERVICES.RAMEN_DEUREN,
    };

    const locationPaths = {
      '/keerbergen': LOCATIONS.KEERBERGEN,
      '/mechelen': LOCATIONS.MECHELEN,
      '/leuven': LOCATIONS.LEUVEN,
    };

    // Track service pages
    if (servicePaths[pathname as keyof typeof servicePaths]) {
      trackServiceView(servicePaths[pathname as keyof typeof servicePaths]);
    }

    // Track location pages
    if (locationPaths[pathname as keyof typeof locationPaths]) {
      trackEvent('location_page_view', {
        location: locationPaths[pathname as keyof typeof locationPaths]
      });
    }
  }, [pathname]);

  // Track project page views
  useEffect(() => {
    if (pathname === '/projecten') {
      trackEvent('projects_page_view');
    }

    // Track individual project views (if we had dynamic routes)
    const projectMatch = pathname.match(/\/projecten\/(\d+)/);
    if (projectMatch) {
      trackProjectView(projectMatch[1], `Project ${projectMatch[1]}`);
    }
  }, [pathname]);

  // Track contact page views
  useEffect(() => {
    if (pathname === '/contact') {
      trackEvent('contact_page_view');
    }
  }, [pathname]);

  return null;
}


