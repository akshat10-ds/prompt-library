'use client';

import { createContext, useContext, ReactNode } from 'react';
import { useCommentCounts } from '@/hooks/useCommentCounts';

interface CommentCountContextType {
  isLoading: boolean;
  getCommentCount: (promptId: string) => number;
  incrementCount: (promptId: string) => void;
  refetch: () => Promise<void>;
}

const CommentCountContext = createContext<CommentCountContextType | null>(null);

export function CommentCountProvider({ children }: { children: ReactNode }) {
  const { isLoading, getCommentCount, incrementCount, refetch } = useCommentCounts();

  return (
    <CommentCountContext.Provider value={{ isLoading, getCommentCount, incrementCount, refetch }}>
      {children}
    </CommentCountContext.Provider>
  );
}

export function useCommentCountContext() {
  const context = useContext(CommentCountContext);
  if (!context) {
    throw new Error('useCommentCountContext must be used within a CommentCountProvider');
  }
  return context;
}
