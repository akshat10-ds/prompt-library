'use client';

import { useState } from 'react';
import Link from 'next/link';
import { CategoryId, getAllTags, ToolId, OutputType, DifficultyLevel } from '@/data';
import { CategoryFilter } from '@/components/filters/CategoryFilter';
import { TagFilter } from '@/components/filters/TagFilter';
import { MetadataFilters } from '@/components/filters/MetadataFilters';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { FontSwitcher } from '@/components/ui/FontSwitcher';
import { Logo } from '@/components/ui/Logo';
import { X, MessageSquare, ChevronDown, ChevronUp, SlidersHorizontal } from 'lucide-react';

interface SidebarProps {
  activeCategory: CategoryId | 'all';
  onCategoryChange: (category: CategoryId | 'all') => void;
  selectedTags: string[];
  onTagToggle: (tag: string) => void;
  selectedTools: ToolId[];
  onToggleTool: (tool: ToolId) => void;
  selectedOutputType: OutputType | 'all';
  onOutputTypeChange: (type: OutputType | 'all') => void;
  selectedDifficulty: DifficultyLevel | 'all';
  onDifficultyChange: (diff: DifficultyLevel | 'all') => void;
  counts?: Record<CategoryId | 'all', number>;
  isOpen?: boolean;
  onClose?: () => void;
}

export function Sidebar({
  activeCategory,
  onCategoryChange,
  selectedTags,
  onTagToggle,
  selectedTools,
  onToggleTool,
  selectedOutputType,
  onOutputTypeChange,
  selectedDifficulty,
  onDifficultyChange,
  counts,
  isOpen,
  onClose,
}: SidebarProps) {
  const allTags = getAllTags();
  const [showMoreFilters, setShowMoreFilters] = useState(false);

  // Check if any advanced filters are active
  const hasActiveAdvancedFilters =
    selectedTools.length > 0 ||
    selectedOutputType !== 'all' ||
    selectedDifficulty !== 'all';

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-screen w-72 bg-surface border-r border-border-subtle
          z-40 overflow-y-auto transition-transform duration-300 ease-out
          lg:translate-x-0 lg:sticky lg:z-0 lg:shrink-0
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <div className="p-6">
          {/* Header with title and mobile close */}
          <div className="flex items-center justify-between mb-6">
            <Link href="/" className="hover:opacity-80 transition-opacity">
              <Logo className="h-6 w-auto" />
            </Link>
            <button
              type="button"
              onClick={onClose}
              className="p-2 text-text-secondary hover:text-text-primary lg:hidden"
            >
              <X size={20} />
            </button>
          </div>

          {/* Leave Feedback - Subtle top placement */}
          <div className="mb-8">
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSdSzX7tXoW783cCJVeSHthjHJQf8NFrKJzxu7WBo6TraLh3sg/viewform?usp=dialog"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full px-4 py-2 text-sm text-text-secondary hover:text-text-primary bg-surface-elevated border border-border-subtle rounded-lg hover:border-border transition-colors"
            >
              <MessageSquare size={16} />
              <span>Leave Feedback</span>
            </a>
          </div>

          {/* Categories */}
          <div className="mb-8">
            <h3 className="text-xs font-medium text-text-tertiary uppercase tracking-wider mb-3">
              Categories
            </h3>
            <CategoryFilter
              activeCategory={activeCategory}
              onChange={onCategoryChange}
              counts={counts}
            />
          </div>

          {/* Tags */}
          <div className="mb-6">
            <h3 className="text-xs font-medium text-text-tertiary uppercase tracking-wider mb-3">
              Tags
            </h3>
            <TagFilter
              tags={allTags}
              selectedTags={selectedTags}
              onToggle={onTagToggle}
            />
          </div>

          {/* More Filters Toggle */}
          <div className="mb-6">
            <button
              type="button"
              onClick={() => setShowMoreFilters(!showMoreFilters)}
              className={`flex items-center gap-2 w-full px-3 py-2 text-sm rounded-lg border transition-all ${
                showMoreFilters || hasActiveAdvancedFilters
                  ? 'bg-surface-elevated border-border text-text-primary'
                  : 'bg-transparent border-border-subtle text-text-secondary hover:border-border hover:text-text-primary'
              }`}
            >
              <SlidersHorizontal size={16} />
              <span className="flex-grow text-left">More Filters</span>
              {hasActiveAdvancedFilters && !showMoreFilters && (
                <span className="w-2 h-2 rounded-full bg-accent" />
              )}
              {showMoreFilters ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>

            {/* Collapsible Metadata Filters */}
            {showMoreFilters && (
              <div className="mt-4 pt-4 border-t border-border-subtle">
                <MetadataFilters
                  selectedTools={selectedTools}
                  onToggleTool={onToggleTool}
                  selectedOutputType={selectedOutputType}
                  onOutputTypeChange={onOutputTypeChange}
                  selectedDifficulty={selectedDifficulty}
                  onDifficultyChange={onDifficultyChange}
                />
              </div>
            )}
          </div>

          {/* Settings */}
          <div className="pt-4 mt-4 border-t border-border-subtle space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-text-secondary">Theme</span>
              <ThemeToggle />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-text-secondary">Fonts</span>
              <FontSwitcher openUp />
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
