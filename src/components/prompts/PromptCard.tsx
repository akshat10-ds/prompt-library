'use client';

import Link from 'next/link';
import { Prompt, ToolId } from '@/data';
import { Tag } from '@/components/ui/Tag';
import { CopyButton } from './CopyButton';
// VoteButtons no longer needed - using inline pill-style buttons
import { useVoteContext } from '@/contexts/VoteContext';
import { useCommentCountContext } from '@/contexts/CommentCountContext';
import { useSavedContext } from '@/contexts/SavedContext';
import { Bot, ChevronUp, ChevronDown, MessageSquare, Bookmark, Star } from 'lucide-react';
import { featuredPrompts } from '@/data/featured';

const toolLabels: Record<ToolId, string> = {
  askgpt: 'AskGPT',
  gemini: 'Gemini',
  glean: 'Glean',
};


interface PromptCardProps {
  prompt: Prompt;
  onTagClick?: (tag: string) => void;
  showTags?: boolean;
  showTools?: boolean;
}

export function PromptCard({ prompt, onTagClick, showTags = false, showTools = false }: PromptCardProps) {
  const { vote, getVoteCount, getUserVote } = useVoteContext();
  const { getCommentCount } = useCommentCountContext();
  const commentCount = getCommentCount(prompt.id);
  const voteCount = getVoteCount(prompt.id);
  const userVote = getUserVote(prompt.id);

  // Check if featured
  const featured = featuredPrompts.find(f => f.id === prompt.id);

  const { isSaved: checkIsSaved, toggleSave } = useSavedContext();
  const isSaved = checkIsSaved(prompt.id);

  // Truncate content for preview
  const contentPreview =
    prompt.content.length > 200
      ? prompt.content.slice(0, 200) + '...'
      : prompt.content;

  return (
    <Link href={`/prompt/${prompt.id}`} className="block">
      <article className={`prompt-card p-5 flex flex-col h-full group ${featured
        ? 'border-amber-200/50 dark:border-amber-900/50 bg-amber-50/10 dark:bg-amber-900/5 ring-1 ring-amber-200/20 dark:ring-amber-900/20'
        : ''
        }`}>
        <div className="flex items-start justify-between gap-3 mb-2">
          {featured && (
            <span className="flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 border border-amber-200 dark:border-amber-800">
              <Star size={10} fill="currentColor" />
              {featured.highlight || 'Featured'}
            </span>
          )}
          {!featured && <div />}
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleSave(prompt.id);
            }}
            className={`p-1.5 rounded-md border transition-colors ${isSaved
              ? 'bg-accent text-background border-accent'
              : 'bg-surface-elevated text-text-tertiary border-border-subtle hover:text-text-primary hover:border-border'
              }`}
            title={isSaved ? "Remove from saved" : "Save prompt"}
          >
            <Bookmark size={14} fill={isSaved ? "currentColor" : "none"} />
          </button>
        </div>

        <h3 className="font-serif text-xl text-text-primary group-hover:text-accent transition-colors truncate mb-1">
          {prompt.title}
        </h3>

        <p className="text-xs text-text-secondary mb-4 line-clamp-1">
          {prompt.description}
        </p>

        {/* Tools Row - only show if filter active */}
        {showTools && prompt.tools && prompt.tools.length > 0 && (
          <div className="flex flex-wrap items-center gap-3 mb-4 text-xs text-text-tertiary">
            <div className="flex items-center gap-1">
              <Bot size={12} className="opacity-60" />
              <span>{prompt.tools.map(t => toolLabels[t]).join(', ')}</span>
            </div>
          </div>
        )}

        {/* Tags row - only if filter active */}
        {showTags && (
          <div className="flex flex-wrap gap-2 mb-3" onClick={(e) => e.stopPropagation()}>
            {prompt.tags.slice(0, 3).map((tag) => (
              <Tag key={tag} tag={tag} onClick={() => onTagClick?.(tag)} />
            ))}
            {prompt.tags.length > 3 && (
              <span className="text-[10px] text-text-tertiary flex items-center">
                +{prompt.tags.length - 3}
              </span>
            )}
          </div>
        )}

        {/* Action pills row */}
        <div className="flex items-center gap-2 mt-auto" onClick={(e) => e.stopPropagation()}>
          {/* Vote pill */}
          <div className="flex items-center gap-1 px-2 py-1.5 bg-surface-elevated rounded-full">
            <button
              onClick={(e) => {
                e.preventDefault();
                vote(prompt.id, 'upvote');
              }}
              className={`p-1 rounded transition-colors ${
                userVote === 'up'
                  ? 'text-accent bg-accent/10'
                  : 'text-text-secondary hover:text-text-primary hover:bg-black/10'
              }`}
            >
              <ChevronUp size={16} />
            </button>
            <span className="text-xs font-medium min-w-[1.5ch] text-center text-text-primary">
              {voteCount}
            </span>
            <button
              onClick={(e) => {
                e.preventDefault();
                vote(prompt.id, 'downvote');
              }}
              className={`p-1 rounded transition-colors ${
                userVote === 'down'
                  ? 'text-accent bg-accent/10'
                  : 'text-text-secondary hover:text-text-primary hover:bg-black/10'
              }`}
            >
              <ChevronDown size={16} />
            </button>
          </div>

          {/* Comments pill */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-surface-elevated rounded-full text-text-secondary hover:text-text-primary transition-colors">
            <MessageSquare size={14} />
            <span className="text-xs font-medium">{commentCount}</span>
          </div>

          {/* Copy pill */}
          <CopyButton content={prompt.content} variant="pill" />
        </div>
      </article>
    </Link>
  );
}
