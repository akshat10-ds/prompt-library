'use client';

import { ReactNode } from 'react';
import { VoteProvider } from '@/contexts/VoteContext';
import { ToastProvider } from '@/contexts/ToastContext';

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ToastProvider>
      <VoteProvider>{children}</VoteProvider>
    </ToastProvider>
  );
}
