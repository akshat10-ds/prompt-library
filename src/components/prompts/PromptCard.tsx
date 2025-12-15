'use client';

import Link from 'next/link';
import { Prompt } from '@/data';
import { CategoryBadge } from '@/components/ui/CategoryBadge';
import { Tag } from '@/components/ui/Tag';
import { CopyButton } from './CopyButton';

interface PromptCardProps {
  prompt: Prompt;
  onTagClick?: (tag: string) => void;
}

export function PromptCard({ prompt, onTagClick }: PromptCardProps) {
  // Truncate content for preview
  const contentPreview =
    prompt.content.length > 200
      ? prompt.content.slice(0, 200) + '...'
      : prompt.content;

  return (
    <article className="prompt-card p-5 flex flex-col h-full">
      <div className="flex items-start justify-between gap-3 mb-3">
        <CategoryBadge categoryId={prompt.category} />
        <CopyButton content={prompt.content} />
      </div>

      <Link href={`/prompt/${prompt.id}`} className="group">
        <h3 className="font-serif text-lg text-text-primary mb-2 group-hover:text-accent transition-colors">
          {prompt.title}
        </h3>
      </Link>

      <p className="text-sm text-text-secondary mb-4 line-clamp-2">
        {prompt.description}
      </p>

      <Link
        href={`/prompt/${prompt.id}`}
        className="prompt-content text-xs max-h-28 overflow-hidden mb-4 flex-grow hover:border-accent transition-colors cursor-pointer"
      >
        {contentPreview}
      </Link>

      <div className="flex flex-wrap gap-2 mt-auto">
        {prompt.tags.map((tag) => (
          <Tag key={tag} tag={tag} onClick={() => onTagClick?.(tag)} />
        ))}
      </div>
    </article>
  );
}
