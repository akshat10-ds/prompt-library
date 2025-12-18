'use client';

import { Suspense, useState } from 'react';
import { usePromptFilters } from '@/hooks/usePromptFilters';
import { MainLayout } from '@/components/layout/MainLayout';
import { PromptGrid } from '@/components/prompts/PromptGrid';
import { EmptyState } from '@/components/ui/EmptyState';
import { SubmitPromptModal } from '@/components/prompts/SubmitPromptModal';
import { Plus } from 'lucide-react';
import { SortOption } from '@/data';

const sortOptions: { value: SortOption; label: string }[] = [
  { value: 'newest', label: 'Newest First' },
  { value: 'oldest', label: 'Oldest First' },
  { value: 'most-upvoted', label: 'Most Upvoted' },
  { value: 'alphabetical', label: 'Alphabetical' },
];

function PromptLibrary() {
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const {
    search,
    category,
    tags,
    tools,
    outputType,
    difficulty,
    sort,
    filteredPrompts,
    counts,
    setSearch,
    setCategory,
    toggleTag,
    toggleTool,
    setOutputType,
    setDifficulty,
    setSort,
    clearFilters,
    hasActiveFilters,
  } = usePromptFilters();

  return (
    <MainLayout
      searchValue={search}
      onSearchChange={setSearch}
      activeCategory={category}
      onCategoryChange={setCategory}
      selectedTags={tags}
      onTagToggle={toggleTag}
      selectedTools={tools}
      onToggleTool={toggleTool}
      selectedOutputType={outputType}
      onOutputTypeChange={setOutputType}
      selectedDifficulty={difficulty}
      onDifficultyChange={setDifficulty}
      counts={counts}
    >
      {/* Header row with count, sort, and submit button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-text-primary">
            {filteredPrompts.length === 1
              ? '1 prompt'
              : `${filteredPrompts.length} prompts`}
          </span>
          {hasActiveFilters && (
            <>
              <span className="text-text-tertiary">·</span>
              <button
                type="button"
                onClick={clearFilters}
                className="text-sm text-accent hover:underline"
              >
                Clear filters
              </button>
            </>
          )}
          <span className="text-text-tertiary mx-2">|</span>
          {/* Sort Dropdown */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-text-tertiary">Sort by:</span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortOption)}
              className="px-2 py-1 text-sm bg-transparent text-text-primary focus:outline-none cursor-pointer font-medium"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        {/* Submit Button */}
        <button
          type="button"
          onClick={() => setIsSubmitModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-text-primary text-background rounded-lg font-medium text-sm hover:bg-text-secondary transition-colors"
        >
          <Plus size={18} />
          <span className="hidden sm:inline">Submit Prompt</span>
          <span className="sm:hidden">Submit</span>
        </button>
      </div>

      {/* Prompts grid or empty state */}
      {filteredPrompts.length > 0 ? (
        <PromptGrid prompts={filteredPrompts} onTagClick={toggleTag} />
      ) : (
        <EmptyState onClearFilters={clearFilters} />
      )}

      {/* Submit Modal */}
      <SubmitPromptModal
        isOpen={isSubmitModalOpen}
        onClose={() => setIsSubmitModalOpen(false)}
      />
    </MainLayout>
  );
}

export default function LibraryPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-text-secondary">Loading...</div>
        </div>
      }
    >
      <PromptLibrary />
    </Suspense>
  );
}
