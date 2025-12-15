export type CategoryId = 'coding' | 'writing' | 'analysis' | 'creative' | 'business' | 'education';

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
}

export interface FilterState {
  search: string;
  category: CategoryId | 'all';
  tags: string[];
}
