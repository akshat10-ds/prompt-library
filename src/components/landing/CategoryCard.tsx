'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Category, CategoryId } from '@/data';
import { Megaphone, TrendingUp, Palette, Code2, Zap, LucideIcon } from 'lucide-react';

const iconMap: Record<string, LucideIcon> = {
  Megaphone,
  TrendingUp,
  Palette,
  Code2,
  Zap,
};

// Category color classes
const categoryColors: Record<CategoryId, { icon: string; hover: string }> = {
  'marketing': {
    icon: 'text-[var(--color-marketing)]',
    hover: 'hover:border-[var(--color-marketing)] hover:shadow-[0_8px_30px_-12px_rgba(249,115,22,0.3)]'
  },
  'sales': {
    icon: 'text-[var(--color-sales)]',
    hover: 'hover:border-[var(--color-sales)] hover:shadow-[0_8px_30px_-12px_rgba(16,185,129,0.3)]'
  },
  'product-design': {
    icon: 'text-[var(--color-product-design)]',
    hover: 'hover:border-[var(--color-product-design)] hover:shadow-[0_8px_30px_-12px_rgba(139,92,246,0.3)]'
  },
  'engineering': {
    icon: 'text-[var(--color-engineering)]',
    hover: 'hover:border-[var(--color-engineering)] hover:shadow-[0_8px_30px_-12px_rgba(59,130,246,0.3)]'
  },
  'productivity': {
    icon: 'text-[var(--color-productivity)]',
    hover: 'hover:border-[var(--color-productivity)] hover:shadow-[0_8px_30px_-12px_rgba(245,158,11,0.3)]'
  },
};

interface CategoryCardProps {
  category: Category;
  count: number;
  index: number;
}

export function CategoryCard({ category, count, index }: CategoryCardProps) {
  const Icon = iconMap[category.icon];
  const colors = categoryColors[category.id];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
    >
      <Link
        href={`/library?category=${category.id}`}
        className="block"
      >
        <div className={`p-6 bg-surface border border-border-subtle rounded-2xl ${colors.hover} transition-all duration-300 group h-full hover:scale-[1.02]`}>
          <div className="flex items-center gap-3 mb-3">
            {Icon && (
              <Icon
                size={24}
                className={`${colors.icon} transition-colors`}
              />
            )}
          </div>

          <h3 className="font-serif text-lg text-text-primary mb-1">
            {category.name}
          </h3>

          <p className="text-sm text-text-secondary mb-3 leading-relaxed">
            {category.description}
          </p>

          <span className="text-xs text-text-tertiary font-medium">
            {count} {count === 1 ? 'prompt' : 'prompts'}
          </span>
        </div>
      </Link>
    </motion.div>
  );
}
