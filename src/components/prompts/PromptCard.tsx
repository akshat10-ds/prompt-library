'use client';

import Link from 'next/link';
import { Prompt } from '@/data';
import { CategoryBadge } from '@/components/ui/CategoryBadge';
import { Tag } from '@/components/ui/Tag';
import { VoteButtons } from '@/components/ui/VoteButtons';
import { CopyButton } from './CopyButton';
import { useVoteContext } from '@/contexts/VoteContext';

interface PromptCardProps {
  prompt: Prompt;
  onTagClick?: (tag: string) => void;
}

export function PromptCard({ prompt, onTagClick }: PromptCardProps) {
  const { vote, getVoteCount, getUserVote } = useVoteContext();

  // Truncate content for preview
  const contentPreview =
    prompt.content.length > 200
      ? prompt.content.slice(0, 200) + '...'
      : prompt.content;

  return (
    <Link href={`/prompt/${prompt.id}`} className="block">
      <article className="prompt-card p-5 flex flex-col h-full group">
        <div className="flex items-start justify-between gap-3 mb-3">
          <CategoryBadge categoryId={prompt.category} />
          <div className="flex items-center gap-2" onClick={(e) => e.preventDefault()}>
            <VoteButtons
              voteCount={getVoteCount(prompt.id)}
              userVote={getUserVote(prompt.id)}
              onUpvote={() => vote(prompt.id, 'upvote')}
              onDownvote={() => vote(prompt.id, 'downvote')}
              size="sm"
            />
            <CopyButton content={prompt.content} />
          </div>
        </div>

        <h3 className="font-serif text-lg text-text-primary mb-1 group-hover:text-accent transition-colors">
          {prompt.title}
        </h3>

        {prompt.author && (
          <p className="text-xs text-text-tertiary mb-2">by {prompt.author}</p>
        )}

        <p className="text-sm text-text-secondary mb-4 line-clamp-2">
          {prompt.description}
        </p>

        <div className="prompt-content text-xs max-h-28 overflow-hidden mb-4 flex-grow">
          {contentPreview}
        </div>

        <div className="flex flex-wrap gap-2 mt-auto" onClick={(e) => e.stopPropagation()}>
          {prompt.tags.map((tag) => (
            <Tag key={tag} tag={tag} onClick={() => onTagClick?.(tag)} />
          ))}
        </div>
      </article>
    </Link>
  );
}
