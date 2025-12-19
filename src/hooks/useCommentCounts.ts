'use client';

import { useState, useEffect, useCallback } from 'react';

export function useCommentCounts() {
  const [counts, setCounts] = useState<Record<string, number>>({});
  const [isLoading, setIsLoading] = useState(true);

  const fetchCounts = useCallback(async () => {
    try {
      const response = await fetch('/api/comments/counts');
      if (response.ok) {
        const data = await response.json();
        setCounts(data);
      }
    } catch (error) {
      console.error('Error fetching comment counts:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCounts();
  }, [fetchCounts]);

  const getCommentCount = useCallback(
    (promptId: string) => counts[promptId] || 0,
    [counts]
  );

  const incrementCount = useCallback((promptId: string) => {
    setCounts((prev) => ({
      ...prev,
      [promptId]: (prev[promptId] || 0) + 1,
    }));
  }, []);

  return {
    isLoading,
    getCommentCount,
    incrementCount,
    refetch: fetchCounts,
  };
}
