'use client';

import { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import Link from 'next/link';
import { Prompt } from '@/data';
import { CategoryBadge } from '@/components/ui/CategoryBadge';
import { VoteButtons } from '@/components/ui/VoteButtons';
import { useVoteContext } from '@/contexts/VoteContext';

interface FeaturedPromptCardProps {
  prompt: Prompt;
  highlight?: string;
  index: number;
}

export function FeaturedPromptCard({ prompt, index }: FeaturedPromptCardProps) {
  const { getVoteCount, getUserVote, vote } = useVoteContext();
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Mouse position for holographic effect
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  // Smooth spring animation for natural movement
  const springConfig = { damping: 25, stiffness: 150 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Subtle 3D tilt based on mouse position
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

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      style={{ perspective: 800 }}
    >
      <Link href={`/prompt/${prompt.id}`} className="block">
        <motion.article
          ref={cardRef}
          className="prompt-card p-6 h-full group relative overflow-hidden"
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={handleMouseLeave}
          style={{
            rotateX: isHovered ? rotateX : 0,
            rotateY: isHovered ? rotateY : 0,
            transformStyle: 'preserve-3d',
          }}
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
                    rgba(120, 180, 255, 0.25) 0%,
                    rgba(200, 150, 255, 0.18) 20%,
                    rgba(255, 180, 200, 0.12) 40%,
                    transparent 60%
                  )
                `
              ),
            }}
          />

          {/* Prismatic highlight - the "catch light" */}
          <motion.div
            className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              background: useTransform(
                [gradientX, gradientY],
                ([x, y]) => `
                  radial-gradient(
                    ellipse 80% 50% at ${x}% ${y}%,
                    rgba(255, 255, 255, 0.3) 0%,
                    transparent 50%
                  )
                `
              ),
            }}
          />

          {/* Subtle grain texture overlay */}
          <div
            className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-[0.03] transition-opacity duration-300 mix-blend-overlay"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            }}
          />

          <h3 className="font-serif text-xl text-text-primary mb-2 group-hover:text-accent transition-colors relative z-10">
            {prompt.title}
          </h3>

          <p className="text-text-secondary line-clamp-3 mb-4 relative z-10">
            {prompt.description}
          </p>

          <div className="flex items-center justify-between relative z-10">
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
        </motion.article>
      </Link>
    </motion.div>
  );
}
