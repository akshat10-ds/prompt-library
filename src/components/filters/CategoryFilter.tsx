'use client';

import { CategoryId, categories } from '@/data';
import {
  Megaphone,
  TrendingUp,
  Palette,
  Code2,
  Zap,
  LayoutGrid,
} from 'lucide-react';

const iconMap: Record<string, React.ComponentType<{ size?: number }>> = {
  Megaphone,
  TrendingUp,
  Palette,
  Code2,
  Zap,
};

interface CategoryFilterProps {
  activeCategory: CategoryId | 'all';
  onChange: (category: CategoryId | 'all') => void;
  counts?: Record<CategoryId | 'all', number>;
}

export function CategoryFilter({
  activeCategory,
  onChange,
  counts,
}: CategoryFilterProps) {
  return (
    <nav className="space-y-1">
      <button
        type="button"
        onClick={() => onChange('all')}
        className={`nav-item w-full flex items-center gap-3 text-left ${
          activeCategory === 'all' ? 'active' : ''
        }`}
      >
        <LayoutGrid size={18} />
        <span className="flex-grow">All Prompts</span>
        {counts && (
          <span className="text-xs text-text-tertiary">{counts.all}</span>
        )}
      </button>

      {categories.map((category) => {
        const Icon = iconMap[category.icon];
        return (
          <button
            key={category.id}
            type="button"
            onClick={() => onChange(category.id)}
            className={`nav-item w-full flex items-center gap-3 text-left ${
              activeCategory === category.id ? 'active' : ''
            }`}
          >
            {Icon && <Icon size={18} />}
            <span className="flex-grow">{category.name}</span>
            {counts && counts[category.id] !== undefined && (
              <span className="text-xs text-text-tertiary">
                {counts[category.id]}
              </span>
            )}
          </button>
        );
      })}
    </nav>
  );
}
