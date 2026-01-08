'use client';

import { Prompt } from '@/data';
import { PromptCard } from './PromptCard';

interface PromptGridProps {
  prompts: Prompt[];
  onTagClick?: (tag: string) => void;
  showTags?: boolean;
  showTools?: boolean;
}

export function PromptGrid({ prompts, onTagClick, showTags = false, showTools = false }: PromptGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 stagger-children">
      {prompts.map((prompt) => (
        <PromptCard
          key={prompt.id}
          prompt={prompt}
          onTagClick={onTagClick}
          showTags={showTags}
          showTools={showTools}
        />
      ))}
    </div>
  );
}
