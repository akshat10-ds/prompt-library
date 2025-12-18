'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Category } from '@/data';
import { Megaphone, TrendingUp, Palette, Code2, Zap, LucideIcon } from 'lucide-react';

const iconMap: Record<string, LucideIcon> = {
  Megaphone,
  TrendingUp,
  Palette,
  Code2,
  Zap,
};

interface CategoryCardProps {
  category: Category;
  count: number;
  index: number;
}

export function CategoryCard({ category, count, index }: CategoryCardProps) {
  const Icon = iconMap[category.icon];

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
        <div className="p-6 bg-surface border border-border-subtle rounded-xl hover:border-border hover:shadow-lg transition-all duration-300 group h-full">
          <div className="flex items-center gap-3 mb-3">
            {Icon && (
              <Icon
                size={24}
                className="text-text-tertiary group-hover:text-accent transition-colors"
              />
            )}
          </div>

          <h3 className="font-medium text-text-primary mb-1 group-hover:text-accent transition-colors">
            {category.name}
          </h3>

          <p className="text-sm text-text-tertiary mb-3">
            {category.description}
          </p>

          <span className="text-xs text-text-tertiary">
            {count} {count === 1 ? 'prompt' : 'prompts'}
          </span>
        </div>
      </Link>
    </motion.div>
  );
}
