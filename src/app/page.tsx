'use client';

import { Suspense } from 'react';
import { usePromptFilters } from '@/hooks/usePromptFilters';
import { MainLayout } from '@/components/layout/MainLayout';
import { PromptGrid } from '@/components/prompts/PromptGrid';
import { EmptyState } from '@/components/ui/EmptyState';

function PromptLibrary() {
  const {
    search,
    category,
    tags,
    filteredPrompts,
    counts,
    setSearch,
    setCategory,
    toggleTag,
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
      counts={counts}
    >
      {/* Results count */}
      <div className="mb-6">
        <p className="text-sm text-text-secondary">
          {filteredPrompts.length === 1
            ? '1 prompt'
            : `${filteredPrompts.length} prompts`}
          {hasActiveFilters && (
            <button
              type="button"
              onClick={clearFilters}
              className="ml-2 text-accent hover:underline"
            >
              Clear filters
            </button>
          )}
        </p>
      </div>

      {/* Prompts grid or empty state */}
      {filteredPrompts.length > 0 ? (
        <PromptGrid prompts={filteredPrompts} onTagClick={toggleTag} />
      ) : (
        <EmptyState onClearFilters={clearFilters} />
      )}
    </MainLayout>
  );
}

export default function Home() {
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
