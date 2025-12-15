'use client';

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
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onUpvote();
        }}
        className={`${paddingClass} rounded transition-colors ${
          userVote === 'up'
            ? 'bg-text-primary text-background'
            : 'text-text-tertiary hover:text-text-primary hover:bg-surface-elevated'
        }`}
        aria-label="Upvote"
      >
        <ChevronUp size={iconSize} />
      </button>

      <span
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
      </span>

      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onDownvote();
        }}
        className={`${paddingClass} rounded transition-colors ${
          userVote === 'down'
            ? 'bg-text-primary text-background'
            : 'text-text-tertiary hover:text-text-primary hover:bg-surface-elevated'
        }`}
        aria-label="Downvote"
      >
        <ChevronDown size={iconSize} />
      </button>
    </div>
  );
}
