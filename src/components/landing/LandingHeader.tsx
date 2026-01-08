'use client';

import Link from 'next/link';
import { MessageSquare } from 'lucide-react';
import { SettingsDropdown } from '@/components/ui/SettingsDropdown';
import { Logo } from '@/components/ui/Logo';

export function LandingHeader() {
  return (
    <header className="sticky top-0 z-20 bg-background/80 backdrop-blur-lg border-b border-border-subtle">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="hover:opacity-80 transition-opacity">
          <Logo className="h-6 w-auto" />
        </Link>

        <div className="flex items-center gap-2">
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSdSzX7tXoW783cCJVeSHthjHJQf8NFrKJzxu7WBo6TraLh3sg/viewform?usp=dialog"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3 py-2 text-text-secondary hover:text-text-primary transition-colors"
            title="Leave Feedback"
          >
            <MessageSquare size={18} />
            <span className="hidden sm:inline">Feedback</span>
          </a>

          <SettingsDropdown />
        </div>
      </div>
    </header>
  );
}
