'use client';

import Link from 'next/link';
import { prompts } from '@/data';
import { featuredPrompts } from '@/data/featured';
import { PromptListItem } from '@/components/prompts/PromptListItem';

export function FeaturedPrompts() {
  const featured = featuredPrompts
    .map(fp => ({
      ...fp,
      prompt: prompts.find(p => p.id === fp.id)
    }))
    .filter(fp => fp.prompt);

  return (
    <section className="py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-serif text-2xl md:text-3xl text-text-primary">
            Featured Prompts
          </h2>
          <Link
            href="/library"
            className="text-sm text-text-secondary hover:text-text-primary transition-colors"
          >
            View all →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.slice(0, 6).map((item, index) => (
            <PromptListItem
              key={item.id}
              prompt={item.prompt!}
              index={index}
              showActions={false}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
