'use client';

import { CategoryId, categories } from '@/data';
import {
  Megaphone,
  TrendingUp,
  Palette,
  Code2,
} from 'lucide-react';

const iconMap: Record<string, React.ComponentType<{ size?: number }>> = {
  Megaphone,
  TrendingUp,
  Palette,
  Code2,
};

interface CategoryBadgeProps {
  categoryId: CategoryId;
  size?: 'sm' | 'md';
}

export function CategoryBadge({ categoryId, size = 'md' }: CategoryBadgeProps) {
  const category = categories.find((c) => c.id === categoryId);
  if (!category) return null;

  const Icon = iconMap[category.icon];

  const sizeClasses = size === 'sm'
    ? 'text-[10px] px-1.5 py-0.5 gap-1'
    : '';

  return (
    <span className={`category-badge ${sizeClasses}`}>
      {Icon && <Icon size={size === 'sm' ? 10 : 12} />}
      {category.name}
    </span>
  );
}
