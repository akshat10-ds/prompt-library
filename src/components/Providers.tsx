'use client';

import { ReactNode } from 'react';
import { VoteProvider } from '@/contexts/VoteContext';
import { CommentCountProvider } from '@/contexts/CommentCountContext';
import { ToastProvider } from '@/contexts/ToastContext';
import { SavedProvider } from '@/contexts/SavedContext';

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ToastProvider>
      <SavedProvider>
        <VoteProvider>
          <CommentCountProvider>{children}</CommentCountProvider>
        </VoteProvider>
      </SavedProvider>
    </ToastProvider>
  );
}
