'use client';

import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { prompts, ToolId, OutputType, CategoryId, categories } from '@/data';
import { CopyButton } from '@/components/prompts/CopyButton';
import { Comments } from '@/components/prompts/Comments';
import { PromptFiller } from '@/components/prompts/PromptFiller';
import { useVoteContext } from '@/contexts/VoteContext';
import { useSavedContext } from '@/contexts/SavedContext';
import {
  ArrowLeft,
  ExternalLink,
  Bot,
  FileOutput,
  ChevronUp,
  ChevronDown,
  Bookmark,
  Megaphone,
  TrendingUp,
  Palette,
  Code2,
  Zap,
  Copy,
  Check,
} from 'lucide-react';
import { useState } from 'react';

const toolLabels: Record<ToolId, string> = {
  askgpt: 'AskGPT',
  gemini: 'Gemini',
  glean: 'Glean',
};

const outputTypeLabels: Record<OutputType, string> = {
  checklist: 'Checklist',
  email: 'Email',
  report: 'Report',
  code: 'Code',
  analysis: 'Analysis',
  documentation: 'Documentation',
  other: 'Other',
};

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Megaphone,
  TrendingUp,
  Palette,
  Code2,
  Zap,
};

// Category color classes for accents
const categoryAccents: Record<CategoryId, { text: string; bg: string; border: string; light: string }> = {
  'marketing': {
    text: 'text-[var(--color-marketing)]',
    bg: 'bg-[var(--color-marketing)]',
    border: 'border-[var(--color-marketing)]',
    light: 'bg-[var(--color-marketing-light)]',
  },
  'sales': {
    text: 'text-[var(--color-sales)]',
    bg: 'bg-[var(--color-sales)]',
    border: 'border-[var(--color-sales)]',
    light: 'bg-[var(--color-sales-light)]',
  },
  'product-design': {
    text: 'text-[var(--color-product-design)]',
    bg: 'bg-[var(--color-product-design)]',
    border: 'border-[var(--color-product-design)]',
    light: 'bg-[var(--color-product-design-light)]',
  },
  'engineering': {
    text: 'text-[var(--color-engineering)]',
    bg: 'bg-[var(--color-engineering)]',
    border: 'border-[var(--color-engineering)]',
    light: 'bg-[var(--color-engineering-light)]',
  },
  'productivity': {
    text: 'text-[var(--color-productivity)]',
    bg: 'bg-[var(--color-productivity)]',
    border: 'border-[var(--color-productivity)]',
    light: 'bg-[var(--color-productivity-light)]',
  },
};

export default function PromptDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { vote, getVoteCount, getUserVote } = useVoteContext();
  const { isSaved, toggleSave } = useSavedContext();
  const promptId = params.id as string;
  const [copied, setCopied] = useState(false);

  const prompt = prompts.find((p) => p.id === promptId);

  const handleCopy = async () => {
    if (!prompt) return;
    await navigator.clipboard.writeText(prompt.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Get category info
  const category = prompt ? categories.find(c => c.id === prompt.category) : null;
  const CategoryIcon = category ? iconMap[category.icon] : null;
  const accent = prompt ? categoryAccents[prompt.category] : null;

  if (!prompt) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-serif text-text-primary mb-4">
            Prompt not found
          </h1>
          <button
            onClick={() => router.push('/library')}
            className="text-accent hover:underline"
          >
            Go back home
          </button>
        </div>
      </div>
    );
  }

  const voteCount = getVoteCount(prompt.id);
  const userVote = getUserVote(prompt.id);
  const saved = isSaved(prompt.id);

  return (
    <div className="min-h-screen">
      <div className="gradient-mesh" />

      {/* Compact Header */}
      <header className="sticky top-0 z-20 bg-background/90 backdrop-blur-xl border-b border-border-subtle">
        <div className="max-w-4xl mx-auto px-6 py-3">
          <div className="flex items-center justify-between">
            <motion.button
              onClick={() => router.push('/library')}
              whileHover={{ x: -2 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-1.5 text-sm text-text-secondary hover:text-text-primary transition-colors"
            >
              <ArrowLeft size={16} />
              <span>Library</span>
            </motion.button>

            {/* Header Actions */}
            <div className="flex items-center gap-2">
              {/* Vote pill */}
              <div className="flex items-center h-8 px-1.5 bg-surface-elevated rounded-full border border-border-subtle">
                <button
                  onClick={() => vote(prompt.id, 'upvote')}
                  className={`p-1 rounded-full transition-all duration-150 ${
                    userVote === 'up'
                      ? 'text-emerald-600 bg-emerald-500/10'
                      : 'text-text-tertiary hover:text-emerald-600 hover:bg-emerald-500/10'
                  }`}
                >
                  <ChevronUp size={16} strokeWidth={2.5} />
                </button>
                <span className={`text-sm font-semibold min-w-[2ch] text-center tabular-nums ${
                  voteCount > 0 ? 'text-text-primary' : 'text-text-tertiary'
                }`}>
                  {voteCount}
                </span>
                <button
                  onClick={() => vote(prompt.id, 'downvote')}
                  className={`p-1 rounded-full transition-all duration-150 ${
                    userVote === 'down'
                      ? 'text-rose-500 bg-rose-500/10'
                      : 'text-text-tertiary hover:text-rose-500 hover:bg-rose-500/10'
                  }`}
                >
                  <ChevronDown size={16} strokeWidth={2.5} />
                </button>
              </div>

              {/* Bookmark */}
              <button
                onClick={() => toggleSave(prompt.id)}
                className={`flex items-center justify-center w-8 h-8 rounded-full border transition-all duration-150 ${
                  saved
                    ? 'text-amber-500 bg-amber-50 border-amber-200 dark:bg-amber-900/20 dark:border-amber-800'
                    : 'text-text-tertiary bg-surface-elevated border-border-subtle hover:text-amber-500 hover:border-amber-200'
                }`}
              >
                <Bookmark size={14} fill={saved ? 'currentColor' : 'none'} />
              </button>

              {/* Copy button */}
              <motion.button
                onClick={handleCopy}
                whileTap={{ scale: 0.95 }}
                className={`flex items-center gap-1.5 h-8 px-3 rounded-full font-medium text-sm transition-all duration-200 ${
                  copied
                    ? 'bg-emerald-500 text-white'
                    : 'bg-text-primary text-background hover:shadow-lg'
                }`}
              >
                {copied ? <Check size={14} /> : <Copy size={14} />}
                <span>{copied ? 'Copied!' : 'Copy'}</span>
              </motion.button>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-6 py-10">
        <article>
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-10"
          >
            {/* Category Label */}
            <div className="flex items-center gap-2 mb-4">
              {CategoryIcon && (
                <span className={`${accent?.text}`}>
                  <CategoryIcon size={18} />
                </span>
              )}
              <span className={`text-sm font-medium ${accent?.text}`}>
                {category?.name}
              </span>
              {prompt.author && (
                <>
                  <span className="text-text-tertiary">·</span>
                  <span className="text-sm text-text-tertiary">by {prompt.author}</span>
                </>
              )}
            </div>

            {/* Title */}
            <h1 className="font-serif text-4xl md:text-5xl text-text-primary mb-4 leading-tight">
              {prompt.title}
            </h1>

            {/* Description */}
            <p className="text-xl text-text-secondary leading-relaxed mb-6">
              {prompt.description}
            </p>

            {/* Meta Row */}
            {(prompt.tools || prompt.outputType) && (
              <div className="flex flex-wrap items-center gap-3">
                {prompt.tools && prompt.tools.length > 0 && (
                  <span className="flex items-center gap-1.5 text-sm text-text-tertiary">
                    <Bot size={14} />
                    <span>{prompt.tools.map(t => toolLabels[t]).join(', ')}</span>
                  </span>
                )}
                {prompt.outputType && (
                  <span className="flex items-center gap-1.5 text-sm text-text-tertiary">
                    <FileOutput size={14} />
                    <span>{outputTypeLabels[prompt.outputType]}</span>
                  </span>
                )}
              </div>
            )}
          </motion.div>

          {/* Interactive Prompt Filler */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <PromptFiller
              content={prompt.content}
              accentColor={accent ? {
                text: accent.text,
                bg: accent.bg,
                light: accent.light,
              } : undefined}
            />
          </motion.div>

          {/* Example Output (if available) */}
          {prompt.exampleOutput && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-8"
            >
              <h3 className="font-serif text-xl text-text-primary mb-4 flex items-center gap-2">
                <FileOutput size={18} className="text-text-tertiary" />
                Example Output
              </h3>
              <div className="prompt-content text-sm whitespace-pre-wrap">
                {prompt.exampleOutput}
              </div>
            </motion.div>
          )}

          {/* Related URLs (if available) */}
          {prompt.urls && prompt.urls.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="mt-8 p-6 bg-surface rounded-xl border border-border-subtle"
            >
              <h3 className="font-serif text-lg text-text-primary mb-4 flex items-center gap-2">
                <ExternalLink size={18} className="text-text-tertiary" />
                Related Resources
              </h3>
              <ul className="space-y-3">
                {prompt.urls.map((url, index) => (
                  <li key={index}>
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-text-secondary hover:text-text-primary transition-colors group"
                    >
                      <span className="w-6 h-6 rounded-full bg-surface-elevated border border-border-subtle flex items-center justify-center group-hover:border-border transition-colors">
                        <ExternalLink size={12} />
                      </span>
                      <span className="underline underline-offset-2">{url}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}

          {/* Comments Section - with visual separator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-12 pt-10 border-t border-border-subtle"
          >
            <Comments promptId={prompt.id} />
          </motion.div>
        </article>
      </main>

      <div className="noise-overlay" />
    </div>
  );
}
