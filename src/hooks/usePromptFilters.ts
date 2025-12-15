'use client';

import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useMemo, useCallback } from 'react';
import { prompts, filterPrompts, CategoryId, ToolId, OutputType, DifficultyLevel, SortOption } from '@/data';

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
      tools: searchParams.getAll('tool') as ToolId[],
      outputType: (searchParams.get('outputType') ?? 'all') as OutputType | 'all',
      difficulty: (searchParams.get('difficulty') ?? 'all') as DifficultyLevel | 'all',
      sort: (searchParams.get('sort') ?? 'newest') as SortOption,
    }),
    [searchParams]
  );

  // Compute filtered and sorted prompts
  const filteredPrompts = useMemo(() => {
    const filtered = filterPrompts(prompts, filters);

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
          // For now, sort by title since we don't have vote counts in the data
          // This will be replaced with actual vote counts from context
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });
  }, [filters]);

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
    toggleTool: (tool: ToolId) => {
      const newTools = filters.tools.includes(tool)
        ? filters.tools.filter((t) => t !== tool)
        : [...filters.tools, tool];
      updateParams({ tool: newTools.length ? newTools : null });
    },
    setOutputType: (type: OutputType | 'all') =>
      updateParams({ outputType: type === 'all' ? null : type }),
    setDifficulty: (diff: DifficultyLevel | 'all') =>
      updateParams({ difficulty: diff === 'all' ? null : diff }),
    setSort: (sort: SortOption) =>
      updateParams({ sort: sort === 'newest' ? null : sort }),
    clearFilters: () => router.push(pathname),
    hasActiveFilters:
      filters.search !== '' ||
      filters.category !== 'all' ||
      filters.tags.length > 0 ||
      filters.tools.length > 0 ||
      filters.outputType !== 'all' ||
      filters.difficulty !== 'all',
  };
}
