'use client';

import { Menu } from 'lucide-react';
import { SearchInput } from '@/components/filters/SearchInput';
import { ThemeToggle } from '@/components/ui/ThemeToggle';

interface HeaderProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
  onMenuClick?: () => void;
}

export function Header({ searchValue, onSearchChange, onMenuClick }: HeaderProps) {
  return (
    <header className="sticky top-0 z-20 bg-background/80 backdrop-blur-lg border-b border-border-subtle">
      <div className="flex items-center gap-4 px-6 py-4">
        {/* Mobile menu button */}
        <button
          type="button"
          onClick={onMenuClick}
          className="p-2 -ml-2 text-text-secondary hover:text-text-primary lg:hidden"
        >
          <Menu size={24} />
        </button>

        {/* Logo */}
        <h1 className="font-serif text-xl text-text-primary hidden sm:block">
          <span className="text-accent">Docusign</span> Prompt Library
        </h1>

        {/* Search */}
        <div className="flex-grow max-w-xl ml-auto">
          <SearchInput
            value={searchValue}
            onChange={onSearchChange}
            placeholder="Search prompts..."
          />
        </div>

        {/* Theme Toggle */}
        <ThemeToggle />
      </div>
    </header>
  );
}
