'use client';

import { ToolId, OutputType, DifficultyLevel } from '@/data';
import { Bot, FileOutput, Gauge } from 'lucide-react';

interface MetadataFiltersProps {
  selectedTools: ToolId[];
  onToggleTool: (tool: ToolId) => void;
  selectedOutputType: OutputType | 'all';
  onOutputTypeChange: (type: OutputType | 'all') => void;
  selectedDifficulty: DifficultyLevel | 'all';
  onDifficultyChange: (diff: DifficultyLevel | 'all') => void;
}

const tools: { id: ToolId; label: string }[] = [
  { id: 'claude', label: 'Claude' },
  { id: 'chatgpt', label: 'ChatGPT' },
  { id: 'gemini', label: 'Gemini' },
  { id: 'other', label: 'Other' },
];

const outputTypes: { id: OutputType | 'all'; label: string }[] = [
  { id: 'all', label: 'All Types' },
  { id: 'checklist', label: 'Checklist' },
  { id: 'email', label: 'Email' },
  { id: 'report', label: 'Report' },
  { id: 'code', label: 'Code' },
  { id: 'analysis', label: 'Analysis' },
  { id: 'documentation', label: 'Documentation' },
  { id: 'other', label: 'Other' },
];

const difficulties: { id: DifficultyLevel | 'all'; label: string; color: string }[] = [
  { id: 'all', label: 'All Levels', color: 'text-text-secondary' },
  { id: 'beginner', label: 'Beginner', color: 'text-green-500' },
  { id: 'intermediate', label: 'Intermediate', color: 'text-amber-500' },
  { id: 'advanced', label: 'Advanced', color: 'text-red-500' },
];

export function MetadataFilters({
  selectedTools,
  onToggleTool,
  selectedOutputType,
  onOutputTypeChange,
  selectedDifficulty,
  onDifficultyChange,
}: MetadataFiltersProps) {
  return (
    <div className="space-y-6">
      {/* Tools Filter */}
      <div>
        <div className="flex items-center gap-2 text-text-tertiary mb-3">
          <Bot size={14} />
          <h4 className="text-xs font-medium uppercase tracking-wider">Works with</h4>
        </div>
        <div className="flex flex-wrap gap-2">
          {tools.map((tool) => (
            <button
              key={tool.id}
              type="button"
              onClick={() => onToggleTool(tool.id)}
              className={`px-3 py-1.5 text-xs rounded-lg border transition-all ${
                selectedTools.includes(tool.id)
                  ? 'bg-text-primary text-background border-text-primary'
                  : 'bg-transparent text-text-secondary border-border-subtle hover:border-border hover:text-text-primary'
              }`}
            >
              {tool.label}
            </button>
          ))}
        </div>
      </div>

      {/* Output Type Filter */}
      <div>
        <div className="flex items-center gap-2 text-text-tertiary mb-3">
          <FileOutput size={14} />
          <h4 className="text-xs font-medium uppercase tracking-wider">Output Type</h4>
        </div>
        <select
          value={selectedOutputType}
          onChange={(e) => onOutputTypeChange(e.target.value as OutputType | 'all')}
          className="w-full px-3 py-2 text-sm bg-background border border-border-subtle rounded-lg text-text-primary focus:outline-none focus:border-text-secondary transition-colors"
        >
          {outputTypes.map((type) => (
            <option key={type.id} value={type.id}>
              {type.label}
            </option>
          ))}
        </select>
      </div>

      {/* Difficulty Filter */}
      <div>
        <div className="flex items-center gap-2 text-text-tertiary mb-3">
          <Gauge size={14} />
          <h4 className="text-xs font-medium uppercase tracking-wider">Difficulty</h4>
        </div>
        <div className="space-y-1">
          {difficulties.map((diff) => (
            <button
              key={diff.id}
              type="button"
              onClick={() => onDifficultyChange(diff.id)}
              className={`w-full text-left px-3 py-2 text-sm rounded-lg transition-all ${
                selectedDifficulty === diff.id
                  ? 'bg-surface-elevated text-text-primary'
                  : 'text-text-secondary hover:text-text-primary hover:bg-surface-elevated/50'
              }`}
            >
              <span className={diff.id !== 'all' ? diff.color : ''}>
                {diff.label}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
