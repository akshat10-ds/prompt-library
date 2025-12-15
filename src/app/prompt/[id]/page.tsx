'use client';

import { useParams, useRouter } from 'next/navigation';
import { prompts, categories } from '@/data';
import { CategoryBadge } from '@/components/ui/CategoryBadge';
import { Tag } from '@/components/ui/Tag';
import { CopyButton } from '@/components/prompts/CopyButton';
import { ArrowLeft } from 'lucide-react';

export default function PromptDetailPage() {
  const params = useParams();
  const router = useRouter();
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
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-text-secondary hover:text-text-primary transition-colors"
          >
            <ArrowLeft size={20} />
            <span>Back to Library</span>
          </button>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-6 py-8">
        <article className="animate-fade-in-up">
          {/* Category & Copy */}
          <div className="flex items-center justify-between mb-6">
            <CategoryBadge categoryId={prompt.category} />
            <CopyButton content={prompt.content} />
          </div>

          {/* Title */}
          <h1 className="font-serif text-3xl md:text-4xl text-text-primary mb-4">
            {prompt.title}
          </h1>

          {/* Description */}
          <p className="text-lg text-text-secondary mb-8">
            {prompt.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-8">
            {prompt.tags.map((tag) => (
              <Tag key={tag} tag={tag} />
            ))}
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

          {/* Usage Tips */}
          <div className="mt-8 p-6 bg-surface rounded-xl border border-border-subtle">
            <h3 className="font-serif text-lg text-text-primary mb-3">
              How to use this prompt
            </h3>
            <ol className="list-decimal list-inside space-y-2 text-text-secondary">
              <li>Copy the prompt using the button above</li>
              <li>Replace the bracketed placeholders with your specific details</li>
              <li>Paste into your AI assistant of choice</li>
              <li>Iterate and refine based on the response</li>
            </ol>
          </div>
        </article>
      </main>

      <div className="noise-overlay" />
    </div>
  );
}
