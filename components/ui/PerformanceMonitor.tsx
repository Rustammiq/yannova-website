"use client";

import { useEffect, useState } from "react";

export default function PerformanceMonitor() {
  const [metrics, setMetrics] = useState<{
    fcp?: number;
    lcp?: number;
    fid?: number;
    cls?: number;
    ttfb?: number;
  }>({});

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Performance Observer for Core Web Vitals
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.entryType === "paint") {
          if (entry.name === "first-contentful-paint") {
            setMetrics(prev => ({ ...prev, fcp: entry.startTime }));
          }
        }
        
        if (entry.entryType === "largest-contentful-paint") {
          setMetrics(prev => ({ ...prev, lcp: entry.startTime }));
        }
        
        if (entry.entryType === "first-input") {
          setMetrics(prev => ({ ...prev, fid: entry.processingStart - entry.startTime }));
        }
        
        if (entry.entryType === "layout-shift") {
          if (!(entry as any).hadRecentInput) {
            setMetrics(prev => ({ 
              ...prev, 
              cls: (prev.cls || 0) + (entry as any).value 
            }));
          }
        }
      }
    });

    // Observe Core Web Vitals
    try {
      observer.observe({ entryTypes: ["paint", "largest-contentful-paint", "first-input", "layout-shift"] });
    } catch (e) {
      // Fallback for browsers that don't support all entry types
      console.log("Performance Observer not fully supported");
    }

    // TTFB measurement
    const navigationEntry = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming;
    if (navigationEntry) {
      setMetrics(prev => ({ 
        ...prev, 
        ttfb: navigationEntry.responseStart - navigationEntry.requestStart 
      }));
    }

    // Log metrics for development
    if (process.env.NODE_ENV === "development") {
      const logMetrics = () => {
        console.log("🚀 Performance Metrics:", {
          "First Contentful Paint": metrics.fcp ? `${metrics.fcp.toFixed(2)}ms` : "Measuring...",
          "Largest Contentful Paint": metrics.lcp ? `${metrics.lcp.toFixed(2)}ms` : "Measuring...",
          "First Input Delay": metrics.fid ? `${metrics.fid.toFixed(2)}ms` : "Measuring...",
          "Cumulative Layout Shift": metrics.cls ? metrics.cls.toFixed(3) : "Measuring...",
          "Time to First Byte": metrics.ttfb ? `${metrics.ttfb.toFixed(2)}ms` : "Measuring...",
        });
      };

      // Log after 3 seconds to allow metrics to collect
      setTimeout(logMetrics, 3000);
    }

    return () => {
      observer.disconnect();
    };
  }, [metrics]);

  // Don't render anything in production
  if (process.env.NODE_ENV !== "development") {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-4 bg-black/80 text-white p-4 rounded-lg text-xs font-mono z-50 max-w-xs">
      <h4 className="font-bold mb-2">Performance Metrics</h4>
      <div className="space-y-1">
        <div>FCP: {metrics.fcp ? `${metrics.fcp.toFixed(2)}ms` : "..."}</div>
        <div>LCP: {metrics.lcp ? `${metrics.lcp.toFixed(2)}ms` : "..."}</div>
        <div>FID: {metrics.fid ? `${metrics.fid.toFixed(2)}ms` : "..."}</div>
        <div>CLS: {metrics.cls ? metrics.cls.toFixed(3) : "..."}</div>
        <div>TTFB: {metrics.ttfb ? `${metrics.ttfb.toFixed(2)}ms` : "..."}</div>
      </div>
    </div>
  );
}
