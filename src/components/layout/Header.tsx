'use client';

import { Menu } from 'lucide-react';
import { SearchInput } from '@/components/filters/SearchInput';
import { CategoryId } from '@/data/types';

interface HeaderProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
  onCategorySelect?: (category: CategoryId | 'all') => void;
  onTagSelect?: (tag: string) => void;
  selectedCategory?: CategoryId | 'all';
  selectedTags?: string[];
  onMenuClick?: () => void;
}

export function Header({
  searchValue,
  onSearchChange,
  onCategorySelect,
  onTagSelect,
  selectedCategory,
  selectedTags,
  onMenuClick,
}: HeaderProps) {
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
          />
        </div>
      </div>
    </header>
  );
}
