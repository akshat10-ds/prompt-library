'use client';

import { CategoryId, getAllTags } from '@/data';
import { CategoryFilter } from '@/components/filters/CategoryFilter';
import { TagFilter } from '@/components/filters/TagFilter';
import { X, Plus } from 'lucide-react';

interface SidebarProps {
  activeCategory: CategoryId | 'all';
  onCategoryChange: (category: CategoryId | 'all') => void;
  selectedTags: string[];
  onTagToggle: (tag: string) => void;
  counts?: Record<CategoryId | 'all', number>;
  isOpen?: boolean;
  onClose?: () => void;
}

export function Sidebar({
  activeCategory,
  onCategoryChange,
  selectedTags,
  onTagToggle,
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
          {/* Mobile close button */}
          <div className="flex items-center justify-between mb-6 lg:hidden">
            <h2 className="font-serif text-lg text-text-primary">Filters</h2>
            <button
              type="button"
              onClick={onClose}
              className="p-2 text-text-secondary hover:text-text-primary"
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

          {/* Submit Prompt Button */}
          <div className="pt-4 border-t border-border-subtle">
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-3 px-4
                bg-text-primary text-background rounded-lg font-medium text-sm
                hover:bg-text-secondary transition-colors"
            >
              <Plus size={18} />
              Submit your prompt
            </a>
          </div>
        </div>
      </aside>
    </>
  );
}
