'use client';

import { ReactNode } from 'react';
import { CategoryId } from '@/data';
import { Header } from './Header';
import { CategoryTabs } from '@/components/filters/CategoryTabs';

interface MainLayoutProps {
  children: ReactNode;
  searchValue: string;
  onSearchChange: (value: string) => void;
  activeCategory: CategoryId | 'all';
  onCategoryChange: (category: CategoryId | 'all') => void;
  counts?: Record<CategoryId | 'all', number>;
  autoOpenSearch?: boolean;
}

export function MainLayout({
  children,
  searchValue,
  onSearchChange,
  activeCategory,
  onCategoryChange,
  counts,
  autoOpenSearch,
}: MainLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Subtle gradient overlay for depth */}
      <div className="fixed inset-0 bg-gradient-to-b from-transparent via-transparent to-black/[0.02] pointer-events-none" />

      <Header
        searchValue={searchValue}
        onSearchChange={onSearchChange}
        onCategorySelect={onCategoryChange}
        selectedCategory={activeCategory}
        autoOpenSearch={autoOpenSearch}
      />

      <CategoryTabs
        activeCategory={activeCategory}
        onChange={onCategoryChange}
        counts={counts}
      />

      <main className="flex-grow w-full max-w-5xl mx-auto px-6 py-8">
        {children}
      </main>
    </div>
  );
}
