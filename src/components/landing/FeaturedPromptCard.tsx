'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Prompt } from '@/data';
import { CategoryBadge } from '@/components/ui/CategoryBadge';
import { VoteButtons } from '@/components/ui/VoteButtons';
import { useVoteContext } from '@/contexts/VoteContext';
import { Sparkles } from 'lucide-react';

interface FeaturedPromptCardProps {
  prompt: Prompt;
  highlight?: string;
  index: number;
}

export function FeaturedPromptCard({ prompt, highlight, index }: FeaturedPromptCardProps) {
  const { getVoteCount, getUserVote, vote } = useVoteContext();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <Link href={`/prompt/${prompt.id}`} className="block">
        <article className="prompt-card p-6 h-full group relative">
          {highlight && (
            <div className="absolute -top-2 -right-2 flex items-center gap-1 px-2 py-1 bg-accent text-background text-xs font-medium rounded-full">
              <Sparkles size={10} />
              {highlight}
            </div>
          )}

          <div className="flex items-start justify-between mb-4">
            <CategoryBadge categoryId={prompt.category} />
            <div onClick={(e) => e.preventDefault()}>
              <VoteButtons
                voteCount={getVoteCount(prompt.id)}
                userVote={getUserVote(prompt.id)}
                onUpvote={() => vote(prompt.id, 'upvote')}
                onDownvote={() => vote(prompt.id, 'downvote')}
                size="sm"
              />
            </div>
          </div>

          <h3 className="font-serif text-xl text-text-primary mb-2 group-hover:text-accent transition-colors">
            {prompt.title}
          </h3>

          <p className="text-text-secondary mb-4 line-clamp-3">
            {prompt.description}
          </p>

          <div className="flex flex-wrap gap-2">
            {prompt.tags.slice(0, 3).map(tag => (
              <span key={tag} className="px-2 py-0.5 text-xs bg-surface-elevated text-text-tertiary rounded">
                {tag}
              </span>
            ))}
          </div>
        </article>
      </Link>
    </motion.div>
  );
}
