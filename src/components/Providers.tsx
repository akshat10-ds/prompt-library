'use client';

import { ReactNode } from 'react';
import { VoteProvider } from '@/contexts/VoteContext';
import { CommentCountProvider } from '@/contexts/CommentCountContext';
import { ToastProvider } from '@/contexts/ToastContext';

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ToastProvider>
      <VoteProvider>
        <CommentCountProvider>{children}</CommentCountProvider>
      </VoteProvider>
    </ToastProvider>
  );
}
