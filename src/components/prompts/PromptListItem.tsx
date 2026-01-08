'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Prompt, CategoryId, categories } from '@/data';
import { useVoteContext } from '@/contexts/VoteContext';
import { useCommentCountContext } from '@/contexts/CommentCountContext';
import { useSavedContext } from '@/contexts/SavedContext';
import { ChevronUp, ChevronDown, MessageSquare, Bookmark, Megaphone, TrendingUp, Palette, Code2, Zap } from 'lucide-react';

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Megaphone,
  TrendingUp,
  Palette,
  Code2,
  Zap,
};

// Category color classes
const categoryColors: Record<CategoryId, { text: string; bg: string; shadow: string }> = {
  'marketing': {
    text: 'text-[var(--color-marketing)]',
    bg: 'bg-[var(--color-marketing)]/10',
    shadow: 'hover:shadow-[0_8px_30px_-12px_rgba(249,115,22,0.25)]',
  },
  'sales': {
    text: 'text-[var(--color-sales)]',
    bg: 'bg-[var(--color-sales)]/10',
    shadow: 'hover:shadow-[0_8px_30px_-12px_rgba(16,185,129,0.25)]',
  },
  'product-design': {
    text: 'text-[var(--color-product-design)]',
    bg: 'bg-[var(--color-product-design)]/10',
    shadow: 'hover:shadow-[0_8px_30px_-12px_rgba(139,92,246,0.25)]',
  },
  'engineering': {
    text: 'text-[var(--color-engineering)]',
    bg: 'bg-[var(--color-engineering)]/10',
    shadow: 'hover:shadow-[0_8px_30px_-12px_rgba(59,130,246,0.25)]',
  },
  'productivity': {
    text: 'text-[var(--color-productivity)]',
    bg: 'bg-[var(--color-productivity)]/10',
    shadow: 'hover:shadow-[0_8px_30px_-12px_rgba(245,158,11,0.25)]',
  },
};

interface PromptListItemProps {
  prompt: Prompt;
  index?: number;
  showActions?: boolean;
}

export function PromptListItem({ prompt, index = 0, showActions = true }: PromptListItemProps) {
  const { vote, getVoteCount, getUserVote } = useVoteContext();
  const { getCommentCount } = useCommentCountContext();
  const { isSaved, toggleSave } = useSavedContext();
  const commentCount = getCommentCount(prompt.id);
  const voteCount = getVoteCount(prompt.id);
  const userVote = getUserVote(prompt.id);
  const saved = isSaved(prompt.id);

  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Mouse position for holographic effect
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  // Smooth spring animation
  const springConfig = { damping: 25, stiffness: 150 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Subtle 3D tilt
  const rotateX = useTransform(smoothY, [0, 1], [2, -2]);
  const rotateY = useTransform(smoothX, [0, 1], [-2, 2]);

  // Gradient position for holographic sheen
  const gradientX = useTransform(smoothX, [0, 1], [0, 100]);
  const gradientY = useTransform(smoothY, [0, 1], [0, 100]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  // Get category info
  const category = categories.find(c => c.id === prompt.category);
  const CategoryIcon = category ? iconMap[category.icon] : null;
  const categoryColorClass = categoryColors[prompt.category];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      style={{ perspective: 800 }}
      className="h-full"
    >
      <Link href={`/prompt/${prompt.id}`} className="block h-full">
        <motion.article
          ref={cardRef}
          className={`p-5 rounded-2xl bg-surface border border-border-subtle group relative overflow-hidden hover:border-border ${categoryColorClass.shadow} transition-shadow h-full flex flex-col`}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={handleMouseLeave}
          style={{
            rotateX: isHovered ? rotateX : 0,
            rotateY: isHovered ? rotateY : 0,
            transformStyle: 'preserve-3d',
          }}
          whileHover={{ scale: 1.01 }}
          transition={{ type: 'spring', damping: 20, stiffness: 100 }}
        >
          {/* Holographic foil layer */}
          <motion.div
            className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              background: useTransform(
                [gradientX, gradientY],
                ([x, y]) => `
                  radial-gradient(
                    circle at ${x}% ${y}%,
                    rgba(120, 180, 255, 0.15) 0%,
                    rgba(200, 150, 255, 0.1) 20%,
                    rgba(255, 180, 200, 0.08) 40%,
                    transparent 60%
                  )
                `
              ),
            }}
          />

          {/* Prismatic highlight */}
          <motion.div
            className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              background: useTransform(
                [gradientX, gradientY],
                ([x, y]) => `
                  radial-gradient(
                    ellipse 80% 50% at ${x}% ${y}%,
                    rgba(255, 255, 255, 0.2) 0%,
                    transparent 50%
                  )
                `
              ),
            }}
          />

          {/* Category badge */}
          {CategoryIcon && (
            <div className={`flex items-center gap-1.5 ${categoryColorClass.text} ${categoryColorClass.bg} px-2 py-1 rounded-lg mb-3 relative z-10 w-fit`}>
              <CategoryIcon size={12} />
              <span className="text-[11px] font-semibold uppercase tracking-wide">
                {category?.name}
              </span>
            </div>
          )}

          {/* Title */}
          <h3 className="font-serif text-xl font-normal text-text-primary mb-2 leading-snug relative z-10">
            {prompt.title}
          </h3>

          {/* Description */}
          <p className="text-sm text-text-secondary mb-5 line-clamp-2 leading-relaxed relative z-10 flex-grow">
            {prompt.description}
          </p>

          {/* Action pills row */}
          {showActions && (
            <div className="flex items-center gap-2.5 relative z-10 mt-auto" onClick={(e) => e.preventDefault()}>
              {/* Vote pill */}
              <div className="flex items-center h-8 px-1.5 bg-surface-elevated rounded-full border border-border-subtle hover:border-border transition-all duration-200 hover:shadow-sm">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    vote(prompt.id, 'upvote');
                  }}
                  className={`p-1 rounded-full transition-all duration-150 vote-btn ${
                    userVote === 'up'
                      ? 'text-emerald-600 bg-emerald-500/10 scale-110'
                      : 'text-text-tertiary hover:text-emerald-600 hover:bg-emerald-500/10'
                  }`}
                >
                  <ChevronUp size={16} strokeWidth={2.5} />
                </button>
                <span className={`text-sm font-semibold min-w-[2ch] text-center tabular-nums transition-colors ${
                  voteCount > 0 ? 'text-text-primary' : 'text-text-tertiary'
                }`}>
                  {voteCount}
                </span>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    vote(prompt.id, 'downvote');
                  }}
                  className={`p-1 rounded-full transition-all duration-150 vote-btn ${
                    userVote === 'down'
                      ? 'text-rose-500 bg-rose-500/10 scale-110'
                      : 'text-text-tertiary hover:text-rose-500 hover:bg-rose-500/10'
                  }`}
                >
                  <ChevronDown size={16} strokeWidth={2.5} />
                </button>
              </div>

              {/* Comments pill */}
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  window.location.href = `/prompt/${prompt.id}#comments`;
                }}
                className="flex items-center gap-1.5 h-8 px-3 bg-surface-elevated rounded-full border border-border-subtle text-text-tertiary hover:text-text-primary hover:border-border hover:shadow-sm transition-all duration-200"
              >
                <MessageSquare size={14} />
                <span className={`text-sm font-medium tabular-nums ${commentCount > 0 ? 'text-text-secondary' : ''}`}>
                  {commentCount}
                </span>
              </button>

              {/* Bookmark pill */}
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  toggleSave(prompt.id);
                }}
                className={`flex items-center gap-1.5 h-8 px-3 bg-surface-elevated rounded-full border border-border-subtle transition-all duration-200 ${
                  saved
                    ? 'text-amber-500 border-amber-200 bg-amber-50 dark:bg-amber-900/20 dark:border-amber-800'
                    : 'text-text-tertiary hover:text-amber-500 hover:border-border hover:shadow-sm'
                }`}
              >
                <Bookmark size={14} fill={saved ? 'currentColor' : 'none'} />
              </button>
            </div>
          )}
        </motion.article>
      </Link>
    </motion.div>
  );
}
