'use client';

import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { prompts } from '@/data';
import { CategoryBadge } from '@/components/ui/CategoryBadge';
import { Tag } from '@/components/ui/Tag';
import { VoteButtons } from '@/components/ui/VoteButtons';
import { Accordion } from '@/components/ui/Accordion';
import { CopyButton } from '@/components/prompts/CopyButton';
import { Comments } from '@/components/prompts/Comments';
import { useVoteContext } from '@/contexts/VoteContext';
import { ArrowLeft, ExternalLink } from 'lucide-react';

export default function PromptDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { vote, getVoteCount, getUserVote } = useVoteContext();
  const promptId = params.id as string;

  const prompt = prompts.find((p) => p.id === promptId);

  if (!prompt) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-serif text-text-primary mb-4">
            Prompt not found
          </h1>
          <button
            onClick={() => router.push('/')}
            className="text-accent hover:underline"
          >
            Go back home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="gradient-mesh" />

      {/* Header */}
      <header className="sticky top-0 z-20 bg-background/80 backdrop-blur-lg border-b border-border-subtle">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <motion.button
            onClick={() => router.back()}
            whileHover={{ x: -4 }}
            whileTap={{ scale: 0.98 }}
            className="group flex items-center gap-2 px-3 py-2 -ml-3 rounded-lg text-text-secondary hover:text-text-primary hover:bg-surface-elevated transition-colors"
          >
            <motion.span
              className="inline-flex"
              whileHover={{ x: -2 }}
              transition={{ type: 'spring', stiffness: 400, damping: 17 }}
            >
              <ArrowLeft size={20} />
            </motion.span>
            <span>Back to Library</span>
          </motion.button>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-6 py-8">
        <article className="animate-fade-in-up">
          {/* Category & Actions */}
          <div className="flex items-center justify-between mb-6">
            <CategoryBadge categoryId={prompt.category} />
            <div className="flex items-center gap-3">
              <VoteButtons
                voteCount={getVoteCount(prompt.id)}
                userVote={getUserVote(prompt.id)}
                onUpvote={() => vote(prompt.id, 'upvote')}
                onDownvote={() => vote(prompt.id, 'downvote')}
                size="md"
              />
              <CopyButton content={prompt.content} />
            </div>
          </div>

          {/* Title */}
          <h1 className="font-serif text-3xl md:text-4xl text-text-primary mb-2">
            {prompt.title}
          </h1>

          {/* Author */}
          {prompt.author && (
            <p className="text-sm text-text-tertiary mb-4">by {prompt.author}</p>
          )}

          {/* Description */}
          <p className="text-lg text-text-secondary mb-6">
            {prompt.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {prompt.tags.map((tag) => (
              <Tag key={tag} tag={tag} />
            ))}
          </div>

          {/* Usage Tips - Accordion (moved above content) */}
          <div className="mb-8">
            <Accordion title="How to use this prompt" defaultOpen={false}>
              <ol className="list-decimal list-inside space-y-2 text-text-secondary">
                <li>Copy the prompt using the button above</li>
                <li>Replace the bracketed placeholders with your specific details</li>
                <li>Paste into your AI assistant of choice</li>
                <li>Iterate and refine based on the response</li>
              </ol>
            </Accordion>
          </div>

          {/* Prompt Content */}
          <div className="relative">
            <div className="absolute top-4 right-4">
              <CopyButton content={prompt.content} />
            </div>
            <div className="prompt-content text-sm md:text-base whitespace-pre-wrap">
              {prompt.content}
            </div>
          </div>

          {/* Example Output (if available) */}
          {prompt.exampleOutput && (
            <div className="mt-8">
              <Accordion title="Example Output" defaultOpen={false}>
                <div className="prompt-content text-sm whitespace-pre-wrap bg-background/50">
                  {prompt.exampleOutput}
                </div>
              </Accordion>
            </div>
          )}

          {/* Related URLs (if available) */}
          {prompt.urls && prompt.urls.length > 0 && (
            <div className="mt-8 p-6 bg-surface rounded-xl border border-border-subtle">
              <h3 className="font-serif text-lg text-text-primary mb-3">
                Related Resources
              </h3>
              <ul className="space-y-2">
                {prompt.urls.map((url, index) => (
                  <li key={index}>
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-text-secondary hover:text-text-primary transition-colors"
                    >
                      <ExternalLink size={16} />
                      <span className="underline">{url}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Comments Section */}
          <Comments promptId={prompt.id} />
        </article>
      </main>

      <div className="noise-overlay" />
    </div>
  );
}
