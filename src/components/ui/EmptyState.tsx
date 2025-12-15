'use client';

import { SearchX } from 'lucide-react';

interface EmptyStateProps {
  onClearFilters?: () => void;
}

export function EmptyState({ onClearFilters }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="w-16 h-16 rounded-full bg-surface-elevated flex items-center justify-center mb-4">
        <SearchX size={32} className="text-text-tertiary" />
      </div>
      <h3 className="font-serif text-xl text-text-primary mb-2">
        No prompts found
      </h3>
      <p className="text-text-secondary mb-6 max-w-md">
        We couldn&apos;t find any prompts matching your current filters. Try adjusting
        your search or clearing the filters.
      </p>
      {onClearFilters && (
        <button
          type="button"
          onClick={onClearFilters}
          className="px-4 py-2 bg-accent text-background font-medium rounded-lg
            hover:bg-accent-muted transition-colors"
        >
          Clear all filters
        </button>
      )}
    </div>
  );
}
