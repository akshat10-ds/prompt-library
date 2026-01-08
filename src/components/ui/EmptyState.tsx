'use client';

import { motion } from 'framer-motion';
import { SearchX, Sparkles } from 'lucide-react';

interface EmptyStateProps {
  onClearFilters?: () => void;
}

export function EmptyState({ onClearFilters }: EmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col items-center justify-center py-20 text-center"
    >
      {/* Animated icon container */}
      <motion.div
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.1, type: 'spring', stiffness: 200 }}
        className="relative w-20 h-20 rounded-2xl bg-gradient-to-br from-surface-elevated to-surface flex items-center justify-center mb-6 border border-border-subtle"
      >
        <SearchX size={36} className="text-text-tertiary" />
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-surface-elevated border border-border-subtle flex items-center justify-center"
        >
          <Sparkles size={12} className="text-text-tertiary" />
        </motion.div>
      </motion.div>

      <motion.h3
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="font-serif text-2xl text-text-primary mb-3"
      >
        No prompts found
      </motion.h3>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-text-secondary mb-8 max-w-sm leading-relaxed"
      >
        We couldn&apos;t find any prompts matching your filters. Try adjusting your search or explore a different category.
      </motion.p>

      {onClearFilters && (
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="button"
          onClick={onClearFilters}
          className="px-5 py-2.5 bg-text-primary text-background font-medium rounded-full
            hover:shadow-lg transition-shadow"
        >
          Clear all filters
        </motion.button>
      )}
    </motion.div>
  );
}
