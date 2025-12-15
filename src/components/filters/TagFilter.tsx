'use client';

import { Tag } from '@/components/ui/Tag';

interface TagFilterProps {
  tags: string[];
  selectedTags: string[];
  onToggle: (tag: string) => void;
}

export function TagFilter({ tags, selectedTags, onToggle }: TagFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <Tag
          key={tag}
          tag={tag}
          active={selectedTags.includes(tag)}
          onClick={() => onToggle(tag)}
        />
      ))}
    </div>
  );
}
