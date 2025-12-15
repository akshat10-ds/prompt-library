'use client';

import { useState, ReactNode } from 'react';
import { CategoryId, ToolId, OutputType, DifficultyLevel } from '@/data';
import { Sidebar } from './Sidebar';
import { Header } from './Header';

interface MainLayoutProps {
  children: ReactNode;
  searchValue: string;
  onSearchChange: (value: string) => void;
  activeCategory: CategoryId | 'all';
  onCategoryChange: (category: CategoryId | 'all') => void;
  selectedTags: string[];
  onTagToggle: (tag: string) => void;
  selectedTools: ToolId[];
  onToggleTool: (tool: ToolId) => void;
  selectedOutputType: OutputType | 'all';
  onOutputTypeChange: (type: OutputType | 'all') => void;
  selectedDifficulty: DifficultyLevel | 'all';
  onDifficultyChange: (diff: DifficultyLevel | 'all') => void;
  counts?: Record<CategoryId | 'all', number>;
}

export function MainLayout({
  children,
  searchValue,
  onSearchChange,
  activeCategory,
  onCategoryChange,
  selectedTags,
  onTagToggle,
  selectedTools,
  onToggleTool,
  selectedOutputType,
  onOutputTypeChange,
  selectedDifficulty,
  onDifficultyChange,
  counts,
}: MainLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex">
      <Sidebar
        activeCategory={activeCategory}
        onCategoryChange={(cat) => {
          onCategoryChange(cat);
          setSidebarOpen(false);
        }}
        selectedTags={selectedTags}
        onTagToggle={onTagToggle}
        selectedTools={selectedTools}
        onToggleTool={onToggleTool}
        selectedOutputType={selectedOutputType}
        onOutputTypeChange={onOutputTypeChange}
        selectedDifficulty={selectedDifficulty}
        onDifficultyChange={onDifficultyChange}
        counts={counts}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="flex-grow flex flex-col min-w-0">
        <Header
          searchValue={searchValue}
          onSearchChange={onSearchChange}
          onCategorySelect={onCategoryChange}
          onTagSelect={onTagToggle}
          selectedCategory={activeCategory}
          selectedTags={selectedTags}
          onMenuClick={() => setSidebarOpen(true)}
        />

        <main className="flex-grow p-6">{children}</main>
      </div>
    </div>
  );
}
