'use client';

import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useMemo, useCallback } from 'react';
import { prompts, CategoryId, SortOption } from '@/data';

export type ViewMode = 'grid' | 'list';

import { useSavedContext } from '@/contexts/SavedContext';

export function usePromptFilters() {
  const { savedIds } = useSavedContext();
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  // Read filters from URL
  const filters = useMemo(
    () => ({
      search: searchParams.get('q') ?? '',
      category: (searchParams.get('category') ?? 'all') as CategoryId | 'all',
      sort: (searchParams.get('sort') ?? 'most-upvoted') as SortOption,
      savedOnly: searchParams.get('saved') === 'true',
      view: (searchParams.get('view') ?? 'list') as ViewMode,
    }),
    [searchParams]
  );

  // Compute filtered and sorted prompts
  const filteredPrompts = useMemo(() => {
    let filtered = prompts.filter((prompt) => {
      // Filter by search
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        const matchesSearch =
          prompt.title.toLowerCase().includes(searchLower) ||
          prompt.description.toLowerCase().includes(searchLower) ||
          prompt.content.toLowerCase().includes(searchLower) ||
          prompt.tags?.some((tag) => tag.toLowerCase().includes(searchLower));
        if (!matchesSearch) return false;
      }

      // Filter by category
      if (filters.category !== 'all' && prompt.category !== filters.category) {
        return false;
      }

      return true;
    });

    if (filters.savedOnly) {
      filtered = filtered.filter(p => savedIds.includes(p.id));
    }

    // Sort the filtered prompts
    return [...filtered].sort((a, b) => {
      switch (filters.sort) {
        case 'newest':
          return (b.createdAt ?? '').localeCompare(a.createdAt ?? '');
        case 'oldest':
          return (a.createdAt ?? '').localeCompare(b.createdAt ?? '');
        case 'alphabetical':
          return a.title.localeCompare(b.title);
        case 'most-upvoted':
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });
  }, [filters, savedIds]);

  // Compute counts per category
  const counts = useMemo(() => {
    const result: Record<CategoryId | 'all', number> = {
      all: prompts.length,
      marketing: 0,
      sales: 0,
      'product-design': 0,
      engineering: 0,
      productivity: 0,
    };

    prompts.forEach((prompt) => {
      result[prompt.category]++;
    });

    return result;
  }, []);

  // Update URL params helper
  const updateParams = useCallback(
    (updates: Record<string, string | null>) => {
      const params = new URLSearchParams(searchParams.toString());

      Object.entries(updates).forEach(([key, value]) => {
        params.delete(key);
        if (value) {
          params.set(key, value);
        }
      });

      const queryString = params.toString();
      router.push(queryString ? `${pathname}?${queryString}` : pathname, {
        scroll: false,
      });
    },
    [searchParams, router, pathname]
  );

  return {
    ...filters,
    filteredPrompts,
    counts,
    setSearch: (q: string) => updateParams({ q: q || null }),
    setCategory: (c: CategoryId | 'all') =>
      updateParams({ category: c === 'all' ? null : c }),
    setSort: (sort: SortOption) =>
      updateParams({ sort: sort === 'most-upvoted' ? null : sort }),
    toggleSavedOnly: () =>
      updateParams({ saved: filters.savedOnly ? null : 'true' }),
    setView: (view: ViewMode) =>
      updateParams({ view: view === 'list' ? null : view }),
    clearFilters: () => router.push(pathname),
    hasActiveFilters:
      filters.search !== '' ||
      filters.category !== 'all',
  };
}
