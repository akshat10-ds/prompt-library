'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { categories, CategoryId } from '@/data';
import { ChevronDown, Megaphone, TrendingUp, Palette, Code2, Zap } from 'lucide-react';

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Megaphone,
  TrendingUp,
  Palette,
  Code2,
  Zap,
};

// Category color classes
const categoryIconColors: Record<CategoryId, string> = {
  'marketing': 'text-[var(--color-marketing)]',
  'sales': 'text-[var(--color-sales)]',
  'product-design': 'text-[var(--color-product-design)]',
  'engineering': 'text-[var(--color-engineering)]',
  'productivity': 'text-[var(--color-productivity)]',
};

interface RolePickerProps {
  className?: string;
}

export function RolePicker({ className = '' }: RolePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (categoryId: string) => {
    setIsOpen(false);
    router.push(`/library?category=${categoryId}`);
  };

  return (
    <div ref={dropdownRef} className={`relative inline-block ${className}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center gap-2 px-6 py-3 bg-text-primary text-background rounded-lg font-medium hover:bg-text-secondary transition-colors"
      >
        Browse Prompts
        <ChevronDown
          size={18}
          className={`transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.15 }}
            className="absolute left-1/2 -translate-x-1/2 mt-2 w-72 bg-surface border border-border-subtle rounded-xl shadow-lg overflow-hidden z-50"
          >
            <div className="p-2">
              <p className="px-3 py-2 text-xs text-text-secondary uppercase tracking-wider">
                Select your role
              </p>
              {categories.map((category) => {
                const Icon = iconMap[category.icon];
                return (
                  <button
                    key={category.id}
                    onClick={() => handleSelect(category.id)}
                    className="w-full flex items-center gap-3 px-3 py-3 rounded-lg text-left hover:bg-black/5 transition-colors group"
                  >
                    {Icon && (
                      <div className="p-2 bg-surface-elevated rounded-lg group-hover:bg-background transition-colors">
                        <Icon size={18} className={categoryIconColors[category.id]} />
                      </div>
                    )}
                    <div>
                      <p className="font-medium text-text-primary">{category.name}</p>
                      <p className="text-sm text-text-secondary">{category.description}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
