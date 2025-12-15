export type CategoryId = 'marketing' | 'sales' | 'product-design' | 'engineering' | 'productivity';

export type ToolId = 'claude' | 'chatgpt' | 'gemini' | 'other';

export type OutputType = 'checklist' | 'email' | 'report' | 'code' | 'analysis' | 'documentation' | 'other';

export type DifficultyLevel = 'beginner' | 'intermediate' | 'advanced';

export type SortOption = 'newest' | 'oldest' | 'most-upvoted' | 'alphabetical';

export interface Category {
  id: CategoryId;
  name: string;
  description: string;
  icon: string;
}

export interface Prompt {
  id: string;
  title: string;
  description: string;
  content: string;
  category: CategoryId;
  tags: string[];
  author?: string;
  exampleOutput?: string;
  urls?: string[];
  // New metadata fields
  tools?: ToolId[];
  outputType?: OutputType;
  difficulty?: DifficultyLevel;
  useCount?: number;
  createdAt?: string;
}

export interface FilterState {
  search: string;
  category: CategoryId | 'all';
  tags: string[];
  tools?: ToolId[];
  outputType?: OutputType | 'all';
  difficulty?: DifficultyLevel | 'all';
}
