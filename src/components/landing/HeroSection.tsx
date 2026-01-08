'use client';

import { motion } from 'framer-motion';
import { RolePicker } from './RolePicker';

export function HeroSection() {
  return (
    <section className="relative py-20 md:py-28 px-6 pb-32">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-surface/30 to-transparent pointer-events-none" />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-serif text-5xl md:text-6xl lg:text-7xl text-text-primary mb-6 tracking-tight"
        >
          Prompt Library
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-lg md:text-xl text-text-secondary mb-10 max-w-2xl mx-auto leading-relaxed"
        >
          A curated collection of AI prompts for marketing, sales, design,
          engineering, and productivity. Copy, customize, and create.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <RolePicker />
        </motion.div>
      </div>
    </section>
  );
}
