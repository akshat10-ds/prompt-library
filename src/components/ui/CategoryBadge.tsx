'use client';

import { CategoryId, categories } from '@/data';
import {
  Code2,
  PenTool,
  BarChart3,
  Sparkles,
  Briefcase,
  GraduationCap,
} from 'lucide-react';

const iconMap: Record<string, React.ComponentType<{ size?: number }>> = {
  Code2,
  PenTool,
  BarChart3,
  Sparkles,
  Briefcase,
  GraduationCap,
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
