'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Copy, Check } from 'lucide-react';
import { useToast } from '@/contexts/ToastContext';

interface CopyButtonProps {
  content: string;
  className?: string;
}

export function CopyButton({ content, className = '' }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const { showToast } = useToast();
  const buttonRef = useRef<HTMLButtonElement>(null);

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const springConfig = { damping: 20, stiffness: 200 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const rotateX = useTransform(smoothY, [0, 1], [4, -4]);
  const rotateY = useTransform(smoothX, [0, 1], [-4, 4]);

  const gradientX = useTransform(smoothX, [0, 1], [0, 100]);
  const gradientY = useTransform(smoothY, [0, 1], [0, 100]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
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

  const handleCopy = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      showToast('Copied to clipboard');
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
      showToast('Failed to copy', 'error');
    }
  };

  return (
    <div style={{ perspective: 400 }}>
      <motion.button
        ref={buttonRef}
        type="button"
        onClick={handleCopy}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        whileTap={{ scale: 0.95 }}
        style={{
          rotateX: isHovered ? rotateX : 0,
          rotateY: isHovered ? rotateY : 0,
          transformStyle: 'preserve-3d',
        }}
        className={`copy-button relative overflow-hidden p-2 rounded-lg bg-surface-elevated border border-border-subtle
          text-text-secondary hover:text-text-primary hover:border-border
          ${copied ? 'copied' : ''} ${className}`}
        title={copied ? 'Copied!' : 'Copy to clipboard'}
      >
        {/* Holographic foil layer */}
        <motion.div
          className="absolute inset-0 pointer-events-none transition-opacity duration-200"
          style={{
            opacity: isHovered ? 1 : 0,
            background: useTransform(
              [gradientX, gradientY],
              ([x, y]) => `
                radial-gradient(
                  circle at ${x}% ${y}%,
                  rgba(120, 180, 255, 0.35) 0%,
                  rgba(200, 150, 255, 0.25) 30%,
                  rgba(255, 180, 200, 0.15) 60%,
                  transparent 80%
                )
              `
            ),
          }}
        />

        {/* Prismatic highlight */}
        <motion.div
          className="absolute inset-0 pointer-events-none transition-opacity duration-200"
          style={{
            opacity: isHovered ? 1 : 0,
            background: useTransform(
              [gradientX, gradientY],
              ([x, y]) => `
                radial-gradient(
                  ellipse 70% 50% at ${x}% ${y}%,
                  rgba(255, 255, 255, 0.5) 0%,
                  transparent 50%
                )
              `
            ),
          }}
        />

        <AnimatePresence mode="wait">
          {copied ? (
            <motion.div
              key="check"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 180 }}
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              className="relative z-10"
            >
              <Check size={16} className="text-success" />
            </motion.div>
          ) : (
            <motion.div
              key="copy"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              className="relative z-10"
            >
              <Copy size={16} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
