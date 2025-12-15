'use client';

import { useState, useRef, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Megaphone, TrendingUp, Palette, Code2, Zap, Tag as TagIcon, Sparkles, Hash } from 'lucide-react';
import { categories, getAllTags, prompts } from '@/data';
import { CategoryId } from '@/data/types';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  onCategorySelect?: (category: CategoryId | 'all') => void;
  onTagSelect?: (tag: string) => void;
  selectedCategory?: CategoryId | 'all';
  selectedTags?: string[];
  placeholder?: string;
}

const categoryIcons: Record<string, React.ElementType> = {
  Megaphone,
  TrendingUp,
  Palette,
  Code2,
  Zap,
};

export function SearchInput({
  value,
  onChange,
  onCategorySelect,
  onTagSelect,
  selectedCategory = 'all',
  selectedTags = [],
  placeholder = 'Search prompts...',
}: SearchInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const allTags = getAllTags();
  const popularTags = allTags.slice(0, 12);

  // Filter tags based on search query
  const matchingTags = useMemo(() => {
    if (!value.trim()) return [];
    const query = value.toLowerCase();
    return allTags.filter(tag => tag.toLowerCase().includes(query)).slice(0, 8);
  }, [value, allTags]);

  // Get suggested prompts based on search
  const suggestedPrompts = useMemo(() => {
    if (!value.trim()) return [];
    const query = value.toLowerCase();
    return prompts
      .filter(p =>
        p.title.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query)
      )
      .slice(0, 4);
  }, [value]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setShowOverlay(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleFocus = () => {
    setIsFocused(true);
    setShowOverlay(true);
  };

  const handleCategoryClick = (categoryId: CategoryId) => {
    onCategorySelect?.(categoryId);
    setShowOverlay(false);
    inputRef.current?.blur();
  };

  const handleTagClick = (tag: string) => {
    onTagSelect?.(tag);
    setShowOverlay(false);
    inputRef.current?.blur();
  };

  const handleClear = () => {
    onChange('');
    inputRef.current?.focus();
  };

  return (
    <div ref={containerRef} className="relative">
      {/* Search Input */}
      <div className="relative">
        <Search
          size={18}
          className={`absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none transition-colors duration-200 ${
            isFocused ? 'text-text-primary' : 'text-text-tertiary'
          }`}
        />
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={handleFocus}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          className="search-input input-glow pr-10"
        />
        {value && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={handleClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-md text-text-tertiary hover:text-text-primary hover:bg-surface-elevated transition-colors"
          >
            <X size={16} />
          </motion.button>
        )}
      </div>

      {/* Search Overlay */}
      <AnimatePresence>
        {showOverlay && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            className="absolute top-full left-0 right-0 mt-2 p-4 bg-surface border border-border-subtle rounded-xl shadow-xl z-50 overflow-hidden max-h-[70vh] overflow-y-auto"
          >
            {/* Search Results - show when typing */}
            {value.trim() && (matchingTags.length > 0 || suggestedPrompts.length > 0) && (
              <>
                {/* Matching Tags */}
                {matchingTags.length > 0 && (
                  <div className="mb-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Hash size={14} className="text-text-tertiary" />
                      <span className="text-xs font-medium text-text-tertiary uppercase tracking-wider">
                        Matching Tags
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {matchingTags.map((tag, index) => {
                        const isSelected = selectedTags.includes(tag);
                        return (
                          <motion.button
                            key={tag}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.02 }}
                            onClick={() => handleTagClick(tag)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className={`px-3 py-1.5 text-xs font-medium rounded-md border transition-all ${
                              isSelected
                                ? 'bg-accent text-background border-accent'
                                : 'bg-background text-text-secondary border-border-subtle hover:border-accent hover:text-accent'
                            }`}
                          >
                            {tag}
                          </motion.button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Suggested Prompts */}
                {suggestedPrompts.length > 0 && (
                  <div className="mb-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Search size={14} className="text-text-tertiary" />
                      <span className="text-xs font-medium text-text-tertiary uppercase tracking-wider">
                        Suggested Prompts
                      </span>
                    </div>
                    <div className="space-y-2">
                      {suggestedPrompts.map((prompt, index) => (
                        <motion.a
                          key={prompt.id}
                          href={`/prompt/${prompt.id}`}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className="block p-3 rounded-lg bg-background border border-border-subtle hover:border-border hover:bg-surface-elevated transition-all"
                        >
                          <div className="text-sm font-medium text-text-primary">{prompt.title}</div>
                          <div className="text-xs text-text-tertiary line-clamp-1">{prompt.description}</div>
                        </motion.a>
                      ))}
                    </div>
                  </div>
                )}

                {/* Divider */}
                <div className="h-px bg-border-subtle my-4" />
              </>
            )}

            {/* Departments Section */}
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles size={14} className="text-text-tertiary" />
                <span className="text-xs font-medium text-text-tertiary uppercase tracking-wider">
                  Departments
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {categories.map((category, index) => {
                  const Icon = categoryIcons[category.icon] || Code2;
                  const isSelected = selectedCategory === category.id;

                  return (
                    <motion.button
                      key={category.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      onClick={() => handleCategoryClick(category.id)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`flex items-center gap-3 p-3 rounded-lg border transition-all text-left ${
                        isSelected
                          ? 'bg-text-primary text-background border-text-primary'
                          : 'bg-background border-border-subtle hover:border-border hover:bg-surface-elevated'
                      }`}
                    >
                      <Icon size={18} className={isSelected ? 'text-background' : 'text-text-secondary'} />
                      <div>
                        <div className={`text-sm font-medium ${isSelected ? 'text-background' : 'text-text-primary'}`}>
                          {category.name}
                        </div>
                        <div className={`text-xs ${isSelected ? 'text-background/70' : 'text-text-tertiary'}`}>
                          {category.description}
                        </div>
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* Divider */}
            <div className="h-px bg-border-subtle my-4" />

            {/* Tags Section */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <TagIcon size={14} className="text-text-tertiary" />
                <span className="text-xs font-medium text-text-tertiary uppercase tracking-wider">
                  Popular Tags
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {popularTags.map((tag, index) => {
                  const isSelected = selectedTags.includes(tag);

                  return (
                    <motion.button
                      key={tag}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.2 + index * 0.02 }}
                      onClick={() => handleTagClick(tag)}
                      whileHover={{ scale: 1.05, y: -1 }}
                      whileTap={{ scale: 0.95 }}
                      className={`px-3 py-1.5 text-xs font-medium rounded-md border transition-all ${
                        isSelected
                          ? 'bg-text-primary text-background border-text-primary'
                          : 'bg-background text-text-secondary border-border-subtle hover:border-border hover:text-text-primary'
                      }`}
                    >
                      {tag}
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* Keyboard hint */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mt-4 pt-3 border-t border-border-subtle flex items-center justify-between text-xs text-text-tertiary"
            >
              <span>Click to filter, or type to search</span>
              <kbd className="px-2 py-0.5 bg-background rounded border border-border-subtle font-mono">
                esc
              </kbd>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
