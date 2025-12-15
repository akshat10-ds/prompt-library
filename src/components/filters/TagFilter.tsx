'use client';

import { useState } from 'react';
import { Tag } from '@/components/ui/Tag';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface TagFilterProps {
  tags: string[];
  selectedTags: string[];
  onToggle: (tag: string) => void;
}

const INITIAL_VISIBLE_TAGS = 8;

export function TagFilter({ tags, selectedTags, onToggle }: TagFilterProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const visibleTags = isExpanded ? tags : tags.slice(0, INITIAL_VISIBLE_TAGS);
  const hasMoreTags = tags.length > INITIAL_VISIBLE_TAGS;
  const hiddenCount = tags.length - INITIAL_VISIBLE_TAGS;

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        {visibleTags.map((tag) => (
          <Tag
            key={tag}
            tag={tag}
            active={selectedTags.includes(tag)}
            onClick={() => onToggle(tag)}
          />
        ))}
      </div>

      {hasMoreTags && (
        <button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-1 text-xs text-text-tertiary hover:text-text-secondary transition-colors"
        >
          {isExpanded ? (
            <>
              <ChevronUp size={14} />
              Show less
            </>
          ) : (
            <>
              <ChevronDown size={14} />
              Show {hiddenCount} more
            </>
          )}
        </button>
      )}
    </div>
  );
}
