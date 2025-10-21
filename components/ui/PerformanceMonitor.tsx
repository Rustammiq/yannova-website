"use client";

import { useEffect, useState } from 'react';

const PerformanceMonitor = () => {
  const [metrics, setMetrics] = useState<any>(null);

  useEffect(() => {
    if (process.env.NODE_ENV === 'production') {
      const script = document.createElement('script');
      script.src = 'https://unpkg.com/web-vitals';
      script.onload = () => {
        const { getCLS, getFID, getFCP, getLCP, getTTFB } = (window as any).webVitals;
        getCLS(setMetrics);
        getFID(setMetrics);
        getFCP(setMetrics);
        getLCP(setMetrics);
        getTTFB(setMetrics);
      };
      document.head.appendChild(script);
    }
  }, []);

  if (process.env.NODE_ENV !== 'production' || !metrics) {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-4 z-50 bg-white/80 backdrop-blur-sm p-2 rounded-lg shadow-md text-xs text-gray-700">
      <p><strong>{metrics.name}:</strong> {metrics.value.toFixed(2)}</p>
    </div>
  );
};

export default PerformanceMonitor;