export type CategoryId = 'marketing' | 'sales' | 'product-design' | 'engineering';

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
}

export interface FilterState {
  search: string;
  category: CategoryId | 'all';
  tags: string[];
}
