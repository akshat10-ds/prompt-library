'use client';

import Link from 'next/link';
import { SearchInput } from '@/components/filters/SearchInput';
import { SettingsDropdown } from '@/components/ui/SettingsDropdown';
import { Logo } from '@/components/ui/Logo';
import { CategoryId } from '@/data/types';

interface HeaderProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
  onCategorySelect?: (category: CategoryId | 'all') => void;
  onTagSelect?: (tag: string) => void;
  selectedCategory?: CategoryId | 'all';
  selectedTags?: string[];
  autoOpenSearch?: boolean;
}

export function Header({
  searchValue,
  onSearchChange,
  onCategorySelect,
  onTagSelect,
  selectedCategory,
  selectedTags,
  autoOpenSearch,
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 bg-background/80 backdrop-blur-lg border-b border-border-subtle">
      <div className="flex items-center gap-4 px-6 py-4">
        {/* Logo */}
        <Link href="/" className="hover:opacity-80 transition-opacity">
          <Logo className="h-5 w-auto" />
        </Link>

        {/* Search - Full width */}
        <div className="flex-grow">
          <SearchInput
            value={searchValue}
            onChange={onSearchChange}
            onCategorySelect={onCategorySelect}
            onTagSelect={onTagSelect}
            selectedCategory={selectedCategory}
            selectedTags={selectedTags}
            placeholder="Search prompts..."
            autoOpen={autoOpenSearch}
          />
        </div>

        {/* Settings */}
        <SettingsDropdown />
      </div>
    </header>
  );
}
