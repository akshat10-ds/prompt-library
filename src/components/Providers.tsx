'use client';

import { ReactNode } from 'react';
import { VoteProvider } from '@/contexts/VoteContext';

export function Providers({ children }: { children: ReactNode }) {
  return <VoteProvider>{children}</VoteProvider>;
}
