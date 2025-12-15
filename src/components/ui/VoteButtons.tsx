'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { ChevronUp, ChevronDown } from 'lucide-react';

interface VoteButtonsProps {
  voteCount: number;
  userVote: 'up' | 'down' | null;
  onUpvote: () => void;
  onDownvote: () => void;
  size?: 'sm' | 'md';
}

export function VoteButtons({
  voteCount,
  userVote,
  onUpvote,
  onDownvote,
  size = 'sm',
}: VoteButtonsProps) {
  const iconSize = size === 'sm' ? 16 : 20;
  const paddingClass = size === 'sm' ? 'p-1' : 'p-1.5';

  return (
    <div className="flex items-center gap-1">
      <motion.button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onUpvote();
        }}
        whileHover={{ scale: 1.15 }}
        whileTap={{ scale: 0.85 }}
        animate={userVote === 'up' ? { scale: [1, 1.2, 1] } : {}}
        transition={{ type: 'spring', stiffness: 400, damping: 17 }}
        className={`vote-btn ${paddingClass} rounded transition-colors ${
          userVote === 'up'
            ? 'bg-text-primary text-background'
            : 'text-text-tertiary hover:text-text-primary hover:bg-surface-elevated'
        }`}
        aria-label="Upvote"
      >
        <ChevronUp size={iconSize} />
      </motion.button>

      <AnimatePresence mode="wait">
        <motion.span
          key={voteCount}
          initial={{ opacity: 0, y: voteCount > 0 ? -10 : 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: voteCount > 0 ? 10 : -10 }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          className={`min-w-[2ch] text-center font-medium ${
            size === 'sm' ? 'text-xs' : 'text-sm'
          } ${
            voteCount > 0
              ? 'text-text-primary'
              : voteCount < 0
              ? 'text-text-tertiary'
              : 'text-text-secondary'
          }`}
        >
          {voteCount}
        </motion.span>
      </AnimatePresence>

      <motion.button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onDownvote();
        }}
        whileHover={{ scale: 1.15 }}
        whileTap={{ scale: 0.85 }}
        animate={userVote === 'down' ? { scale: [1, 1.2, 1] } : {}}
        transition={{ type: 'spring', stiffness: 400, damping: 17 }}
        className={`vote-btn ${paddingClass} rounded transition-colors ${
          userVote === 'down'
            ? 'bg-text-primary text-background'
            : 'text-text-tertiary hover:text-text-primary hover:bg-surface-elevated'
        }`}
        aria-label="Downvote"
      >
        <ChevronDown size={iconSize} />
      </motion.button>
    </div>
  );
}
