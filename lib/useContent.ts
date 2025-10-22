'use client';

import { useState, useCallback } from 'react';

interface UseContentOptions {
  key: string;
  defaultValue: string;
}

export function useContent({ key, defaultValue }: UseContentOptions) {
  const [content, setContent] = useState(defaultValue);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateContent = useCallback(async (newContent: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/admin/content', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ key, content: newContent }),
      });

      if (!response.ok) {
        throw new Error('Failed to update content');
      }

      const result = await response.json();
      setContent(result.content);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [key]);

  const loadContent = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/admin/content?key=${encodeURIComponent(key)}`);
      
      if (!response.ok) {
        throw new Error('Failed to load content');
      }

      const result = await response.json();
      setContent(result.content || defaultValue);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setContent(defaultValue);
    } finally {
      setIsLoading(false);
    }
  }, [key, defaultValue]);

  return {
    content,
    updateContent,
    loadContent,
    isLoading,
    error,
  };
}
