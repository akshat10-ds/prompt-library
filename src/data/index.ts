export * from './types';
export { categories } from './categories';
export { prompts } from './prompts';

import { Prompt, CategoryId, FilterState } from './types';
import { prompts } from './prompts';

export function getAllTags(): string[] {
  const tagSet = new Set<string>();
  prompts.forEach((prompt) => {
    prompt.tags.forEach((tag) => tagSet.add(tag));
  });
  return Array.from(tagSet).sort();
}

export function filterPrompts(
  allPrompts: Prompt[],
  filters: FilterState
): Prompt[] {
  return allPrompts.filter((prompt) => {
    // Search filter
    if (filters.search) {
      const query = filters.search.toLowerCase();
      const matchesSearch =
        prompt.title.toLowerCase().includes(query) ||
        prompt.description.toLowerCase().includes(query) ||
        prompt.content.toLowerCase().includes(query) ||
        prompt.tags.some((tag) => tag.toLowerCase().includes(query));
      if (!matchesSearch) return false;
    }

    // Category filter
    if (filters.category !== 'all' && prompt.category !== filters.category) {
      return false;
    }

    // Tags filter (AND logic - must have all selected tags)
    if (filters.tags.length > 0) {
      const hasAllTags = filters.tags.every((tag) => prompt.tags.includes(tag));
      if (!hasAllTags) return false;
    }

    // Tools filter (OR logic - must have at least one selected tool)
    if (filters.tools && filters.tools.length > 0) {
      const hasAnyTool = prompt.tools?.some(tool => filters.tools?.includes(tool));
      if (!hasAnyTool) return false;
    }

    // Output type filter
    if (filters.outputType && filters.outputType !== 'all') {
      if (prompt.outputType !== filters.outputType) return false;
    }

    // Difficulty filter
    if (filters.difficulty && filters.difficulty !== 'all') {
      if (prompt.difficulty !== filters.difficulty) return false;
    }

    return true;
  });
}

export function getCategoryById(id: CategoryId) {
  const { categories } = require('./categories');
  return categories.find((c: { id: CategoryId }) => c.id === id);
}
