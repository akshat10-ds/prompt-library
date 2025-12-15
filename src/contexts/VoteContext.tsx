'use client';

import { createContext, useContext, ReactNode } from 'react';
import { useVotes } from '@/hooks/useVotes';

interface VoteContextType {
  isLoading: boolean;
  vote: (promptId: string, action: 'upvote' | 'downvote') => Promise<void>;
  getVoteCount: (promptId: string) => number;
  getUserVote: (promptId: string) => 'up' | 'down' | null;
}

const VoteContext = createContext<VoteContextType | null>(null);

export function VoteProvider({ children }: { children: ReactNode }) {
  const { isLoading, vote, getVoteCount, getUserVote } = useVotes();

  return (
    <VoteContext.Provider value={{ isLoading, vote, getVoteCount, getUserVote }}>
      {children}
    </VoteContext.Provider>
  );
}

export function useVoteContext() {
  const context = useContext(VoteContext);
  if (!context) {
    throw new Error('useVoteContext must be used within a VoteProvider');
  }
  return context;
}
