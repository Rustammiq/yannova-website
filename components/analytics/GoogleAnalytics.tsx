"use client";

import { useEffect } from 'react';
import { GA_MEASUREMENT_ID } from '@/lib/analytics';

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

export default function GoogleAnalytics() {
  useEffect(() => {
    // Only run in production and if GA ID is configured
    if (process.env.NODE_ENV !== 'production' || !GA_MEASUREMENT_ID || GA_MEASUREMENT_ID === 'G-XXXXXXXXXX') {
      return;
    }

    // Load Google Analytics script
    const script1 = document.createElement('script');
    script1.async = true;
    script1.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    document.head.appendChild(script1);

    // Initialize gtag
    const script2 = document.createElement('script');
    script2.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${GA_MEASUREMENT_ID}', {
        page_title: document.title,
        page_location: window.location.href,
        anonymize_ip: true,
        allow_enhanced_conversions: true,
        custom_map: {
          'page_path': 'page_path',
          'page_title': 'page_title'
        }
      });
    `;
    document.head.appendChild(script2);

    // Enhanced ecommerce tracking for Yannova
    window.gtag('config', GA_MEASUREMENT_ID, {
      'custom_map': {
        'service_type': 'service_type',
        'project_location': 'project_location',
        'quote_value': 'quote_value',
        'contact_method': 'contact_method'
      }
    });

    // Cleanup function
    return () => {
      if (document.head.contains(script1)) {
        document.head.removeChild(script1);
      }
      if (document.head.contains(script2)) {
        document.head.removeChild(script2);
      }
    };
  }, []);

  // This component doesn't render anything
  return null;
}


