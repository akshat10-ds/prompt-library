'use client';

import Link from 'next/link';
import { Search } from 'lucide-react';
import { ThemeToggle } from '@/components/ui/ThemeToggle';

export function LandingHeader() {
  return (
    <header className="sticky top-0 z-20 bg-background/80 backdrop-blur-lg border-b border-border-subtle">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="font-serif text-xl text-text-primary">
          <span className="text-accent">Docusign</span> Prompts
        </Link>

        <div className="flex items-center gap-4">
          <Link
            href="/library"
            className="flex items-center gap-2 px-3 py-2 text-text-secondary hover:text-text-primary transition-colors"
          >
            <Search size={18} />
            <span className="hidden sm:inline">Search Library</span>
          </Link>

          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
