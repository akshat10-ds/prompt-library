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
}

export function CategoryBadge({ categoryId }: CategoryBadgeProps) {
  const category = categories.find((c) => c.id === categoryId);
  if (!category) return null;

  const Icon = iconMap[category.icon];

  return (
    <span className="category-badge">
      {Icon && <Icon size={12} />}
      {category.name}
    </span>
  );
}
