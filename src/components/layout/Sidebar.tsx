'use client';

import { CategoryId, getAllTags, ToolId, OutputType, DifficultyLevel } from '@/data';
import { CategoryFilter } from '@/components/filters/CategoryFilter';
import { TagFilter } from '@/components/filters/TagFilter';
import { MetadataFilters } from '@/components/filters/MetadataFilters';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { X } from 'lucide-react';

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
            <h1 className="font-serif text-xl text-text-primary">
              <span className="text-accent">Docusign</span> Prompt Library
            </h1>
            <button
              type="button"
              onClick={onClose}
              className="p-2 text-text-secondary hover:text-text-primary lg:hidden"
            >
              <X size={20} />
            </button>
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
          <div className="mb-8">
            <h3 className="text-xs font-medium text-text-tertiary uppercase tracking-wider mb-3">
              Tags
            </h3>
            <TagFilter
              tags={allTags}
              selectedTags={selectedTags}
              onToggle={onTagToggle}
            />
          </div>

          {/* Metadata Filters */}
          <div className="mb-8">
            <h3 className="text-xs font-medium text-text-tertiary uppercase tracking-wider mb-3">
              Filters
            </h3>
            <MetadataFilters
              selectedTools={selectedTools}
              onToggleTool={onToggleTool}
              selectedOutputType={selectedOutputType}
              onOutputTypeChange={onOutputTypeChange}
              selectedDifficulty={selectedDifficulty}
              onDifficultyChange={onDifficultyChange}
            />
          </div>

          {/* Theme Toggle */}
          <div className="pt-4 mt-4 border-t border-border-subtle flex items-center justify-between">
            <span className="text-sm text-text-secondary">Theme</span>
            <ThemeToggle />
          </div>
        </div>
      </aside>
    </>
  );
}
