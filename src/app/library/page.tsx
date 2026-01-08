'use client';

import { Suspense, useState, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { usePromptFilters } from '@/hooks/usePromptFilters';
import { MainLayout } from '@/components/layout/MainLayout';
import { PromptList } from '@/components/prompts/PromptList';
import { EmptyState } from '@/components/ui/EmptyState';
import { SubmitPromptModal } from '@/components/prompts/SubmitPromptModal';
import { Plus, Bookmark } from 'lucide-react';
import { SortOption } from '@/data';
import { useVoteContext } from '@/contexts/VoteContext';

const sortOptions: { value: SortOption; label: string }[] = [
  { value: 'most-upvoted', label: 'Most Upvoted' },
  { value: 'newest', label: 'Newest First' },
  { value: 'oldest', label: 'Oldest First' },
  { value: 'alphabetical', label: 'Alphabetical' },
];

function PromptLibrary() {
  const searchParams = useSearchParams();
  const autoOpenSearch = searchParams.get('search') === 'open';
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const {
    search,
    category,
    sort,
    savedOnly,
    filteredPrompts,
    counts,
    setSearch,
    setCategory,
    setSort,
    toggleSavedOnly,
    clearFilters,
    hasActiveFilters,
  } = usePromptFilters();

  const { getVoteCount, isLoading: isVotesLoading } = useVoteContext();

  // Final filtered & sorted prompts with actual vote counts
  const finalPrompts = useMemo(() => {
    if (sort !== 'most-upvoted' || isVotesLoading) return filteredPrompts;

    return [...filteredPrompts].sort((a, b) => {
      const votesA = getVoteCount(a.id);
      const votesB = getVoteCount(b.id);
      return votesB - votesA || a.title.localeCompare(b.title);
    });
  }, [filteredPrompts, sort, getVoteCount, isVotesLoading]);

  return (
    <MainLayout
      searchValue={search}
      onSearchChange={setSearch}
      activeCategory={category}
      onCategoryChange={setCategory}
      counts={counts}
      autoOpenSearch={autoOpenSearch}
    >
      {/* Toolbar Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div className="flex flex-wrap items-center gap-3">
          <span className="font-serif text-lg text-text-primary">
            {finalPrompts.length === 1
              ? '1 prompt'
              : `${finalPrompts.length} prompts`}
          </span>

          <div className="flex items-center gap-3">
            <button
              onClick={toggleSavedOnly}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all border ${savedOnly
                ? 'bg-text-primary text-background border-text-primary shadow-sm'
                : 'bg-surface text-text-secondary border-border-subtle hover:border-border hover:shadow-sm'
                }`}
            >
              <Bookmark size={12} fill={savedOnly ? "currentColor" : "none"} />
              Saved
            </button>

            {/* Sort Dropdown */}
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortOption)}
              className="pl-3 pr-8 py-1.5 text-xs bg-surface text-text-secondary border border-border-subtle rounded-full focus:outline-none focus:border-border cursor-pointer hover:border-border hover:shadow-sm transition-all appearance-none bg-no-repeat"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%239ca3af' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`,
                backgroundPosition: 'right 0.75rem center',
              }}
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>

            {hasActiveFilters && (
              <button
                type="button"
                onClick={clearFilters}
                className="text-xs text-text-tertiary hover:text-text-primary transition-colors ml-1"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="button"
          onClick={() => setIsSubmitModalOpen(true)}
          className="flex items-center justify-center gap-2 px-4 py-2 bg-text-primary text-background rounded-full font-medium text-sm hover:shadow-lg hover:scale-[1.02] transition-all active:scale-95"
        >
          <Plus size={16} />
          <span>Submit</span>
        </button>
      </div>

      {/* Prompts list or empty state */}
      <div>
        {finalPrompts.length > 0 ? (
          <PromptList prompts={finalPrompts} />
        ) : (
          <EmptyState onClearFilters={clearFilters} />
        )}
      </div>

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
