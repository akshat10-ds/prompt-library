'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { prompts } from '@/data';

export function HeroSection() {
  return (
    <section className="relative py-16 md:py-24 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-serif text-4xl md:text-5xl lg:text-6xl text-text-primary mb-6"
        >
          Prompt Library
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-lg md:text-xl text-text-secondary mb-8 max-w-2xl mx-auto"
        >
          A curated collection of AI prompts for marketing, sales, design,
          engineering, and productivity. Copy, customize, and create.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Link
            href="/library"
            className="inline-flex items-center gap-2 px-6 py-3 bg-text-primary text-background rounded-lg font-medium hover:bg-text-secondary transition-colors"
          >
            Browse All {prompts.length} Prompts
            <ArrowRight size={18} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
