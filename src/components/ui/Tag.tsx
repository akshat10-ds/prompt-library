'use client';

import { motion } from 'framer-motion';

interface TagProps {
  tag: string;
  active?: boolean;
  onClick?: () => void;
}

export function Tag({ tag, active, onClick }: TagProps) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{ scale: 1.05, y: -1 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
      className={`tag tag-interactive cursor-pointer min-h-[32px] px-4 py-1.5 flex items-center justify-center text-xs ${active
          ? 'selected bg-text-primary border-text-primary text-background'
          : ''
        }`}
    >
      {tag}
    </motion.button>
  );
}
