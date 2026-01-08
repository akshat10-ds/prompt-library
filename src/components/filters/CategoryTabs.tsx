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

// Category color classes for active state
const categoryColors: Record<CategoryId, { bg: string; text: string; hover: string }> = {
  'marketing': {
    bg: 'bg-[var(--color-marketing)]',
    text: 'text-white',
    hover: 'hover:bg-[var(--color-marketing-light)] hover:text-[var(--color-marketing)]'
  },
  'sales': {
    bg: 'bg-[var(--color-sales)]',
    text: 'text-white',
    hover: 'hover:bg-[var(--color-sales-light)] hover:text-[var(--color-sales)]'
  },
  'product-design': {
    bg: 'bg-[var(--color-product-design)]',
    text: 'text-white',
    hover: 'hover:bg-[var(--color-product-design-light)] hover:text-[var(--color-product-design)]'
  },
  'engineering': {
    bg: 'bg-[var(--color-engineering)]',
    text: 'text-white',
    hover: 'hover:bg-[var(--color-engineering-light)] hover:text-[var(--color-engineering)]'
  },
  'productivity': {
    bg: 'bg-[var(--color-productivity)]',
    text: 'text-white',
    hover: 'hover:bg-[var(--color-productivity-light)] hover:text-[var(--color-productivity)]'
  },
};

interface CategoryTabsProps {
  activeCategory: CategoryId | 'all';
  onChange: (category: CategoryId | 'all') => void;
  counts?: Record<CategoryId | 'all', number>;
}

export function CategoryTabs({
  activeCategory,
  onChange,
  counts,
}: CategoryTabsProps) {
  return (
    <div className="border-b border-border-subtle bg-surface/50">
      <nav className="flex items-center gap-1.5 px-6 py-3 overflow-x-auto scrollbar-hide max-w-5xl mx-auto">
        {/* All Prompts */}
        <button
          type="button"
          onClick={() => onChange('all')}
          className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm whitespace-nowrap transition-all duration-200 ${
            activeCategory === 'all'
              ? 'bg-text-primary text-background font-medium shadow-sm'
              : 'text-text-secondary hover:text-text-primary hover:bg-black/5 font-normal'
          }`}
        >
          <LayoutGrid size={15} />
          <span>All</span>
          {counts && (
            <span className={`text-xs tabular-nums ${activeCategory === 'all' ? 'opacity-60' : 'text-text-tertiary'}`}>
              {counts.all}
            </span>
          )}
        </button>

        {/* Category tabs */}
        {categories.map((category) => {
          const Icon = iconMap[category.icon];
          const isActive = activeCategory === category.id;
          const colors = categoryColors[category.id];
          return (
            <button
              key={category.id}
              type="button"
              onClick={() => onChange(category.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm whitespace-nowrap transition-all duration-200 ${
                isActive
                  ? `${colors.bg} ${colors.text} font-medium shadow-sm`
                  : `text-text-secondary ${colors.hover} font-normal`
              }`}
            >
              {Icon && <Icon size={15} />}
              <span>{category.name}</span>
              {counts && counts[category.id] !== undefined && (
                <span className={`text-xs tabular-nums ${isActive ? 'opacity-80' : 'text-text-tertiary'}`}>
                  {counts[category.id]}
                </span>
              )}
            </button>
          );
        })}
      </nav>
    </div>
  );
}
