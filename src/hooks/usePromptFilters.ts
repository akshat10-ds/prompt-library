'use client';

import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useMemo, useCallback } from 'react';
import { prompts, filterPrompts, CategoryId, categories } from '@/data';

export function usePromptFilters() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  // Read filters from URL
  const filters = useMemo(
    () => ({
      search: searchParams.get('q') ?? '',
      category: (searchParams.get('category') ?? 'all') as CategoryId | 'all',
      tags: searchParams.getAll('tag'),
    }),
    [searchParams]
  );

  // Compute filtered prompts
  const filteredPrompts = useMemo(
    () => filterPrompts(prompts, filters),
    [filters]
  );

  // Compute counts per category
  const counts = useMemo(() => {
    const result: Record<CategoryId | 'all', number> = {
      all: prompts.length,
      coding: 0,
      writing: 0,
      analysis: 0,
      creative: 0,
      business: 0,
      education: 0,
    };

    prompts.forEach((prompt) => {
      result[prompt.category]++;
    });

    return result;
  }, []);

  // Update URL params helper
  const updateParams = useCallback(
    (updates: Record<string, string | string[] | null>) => {
      const params = new URLSearchParams(searchParams.toString());

      Object.entries(updates).forEach(([key, value]) => {
        params.delete(key);
        if (value === null) return;
        if (Array.isArray(value)) {
          value.forEach((v) => params.append(key, v));
        } else if (value) {
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
    toggleTag: (tag: string) => {
      const newTags = filters.tags.includes(tag)
        ? filters.tags.filter((t) => t !== tag)
        : [...filters.tags, tag];
      updateParams({ tag: newTags.length ? newTags : null });
    },
    clearFilters: () => router.push(pathname),
    hasActiveFilters:
      filters.search !== '' ||
      filters.category !== 'all' ||
      filters.tags.length > 0,
  };
}
