'use client';

import { Prompt } from '@/data';
import { PromptCard } from './PromptCard';

interface PromptGridProps {
  prompts: Prompt[];
  onTagClick?: (tag: string) => void;
}

export function PromptGrid({ prompts, onTagClick }: PromptGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 stagger-children">
      {prompts.map((prompt) => (
        <PromptCard key={prompt.id} prompt={prompt} onTagClick={onTagClick} />
      ))}
    </div>
  );
}
