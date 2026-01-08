'use client';

import { Prompt } from '@/data';
import { PromptListItem } from './PromptListItem';

interface PromptListProps {
  prompts: Prompt[];
}

export function PromptList({ prompts }: PromptListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      {prompts.map((prompt, index) => (
        <PromptListItem key={prompt.id} prompt={prompt} index={index} />
      ))}
    </div>
  );
}
