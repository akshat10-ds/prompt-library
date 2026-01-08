'use client';

import { useState, useMemo, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Copy, Sparkles, RotateCcw, ChevronUp } from 'lucide-react';
import { useToast } from '@/contexts/ToastContext';

interface PromptFillerProps {
  content: string;
  accentColor?: {
    text: string;
    bg: string;
    light: string;
  };
  onCopy?: (content: string) => void;
}

interface PlaceholderInfo {
  id: string;
  original: string;
  label: string;
  value: string;
}

function placeholderToLabel(placeholder: string): string {
  return placeholder
    .slice(1, -1)
    .split(/[-_\s]+/)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

function extractPlaceholders(content: string): PlaceholderInfo[] {
  const regex = /\[([^\]]+)\]/g;
  const matches: PlaceholderInfo[] = [];
  const seen = new Set<string>();

  let match;
  while ((match = regex.exec(content)) !== null) {
    const original = match[0];
    if (!seen.has(original.toLowerCase())) {
      seen.add(original.toLowerCase());
      matches.push({
        id: original.toLowerCase().replace(/[\[\]\s]/g, '-'),
        original,
        label: placeholderToLabel(original),
        value: '',
      });
    }
  }

  return matches;
}

// Refined number badge component
function NumberBadge({ count, total, isComplete }: { count: number; total: number; isComplete: boolean }) {
  return (
    <div className={`
      inline-flex items-center justify-center min-w-[2.5rem] h-7 px-2 rounded-full text-xs font-semibold tabular-nums
      transition-all duration-300
      ${isComplete
        ? 'bg-emerald-500/15 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400'
        : 'bg-text-primary/5 text-text-tertiary dark:bg-white/10'
      }
    `}>
      {count}/{total}
    </div>
  );
}

export function PromptFiller({ content, accentColor, onCopy }: PromptFillerProps) {
  const [isCustomizeMode, setIsCustomizeMode] = useState(false);
  const [placeholders, setPlaceholders] = useState<PlaceholderInfo[]>([]);
  const [focusedId, setFocusedId] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [justFilled, setJustFilled] = useState<string | null>(null);
  const inputRefs = useRef<Record<string, HTMLInputElement | HTMLTextAreaElement | null>>({});
  const { showToast } = useToast();

  useEffect(() => {
    setPlaceholders(extractPlaceholders(content));
  }, [content]);

  const filledCount = placeholders.filter(p => p.value.trim()).length;
  const totalCount = placeholders.length;
  const progress = totalCount > 0 ? (filledCount / totalCount) * 100 : 0;
  const isFullyFilled = filledCount === totalCount && totalCount > 0;
  const hasAnyFilled = filledCount > 0;
  const prevFilledCount = useRef(filledCount);

  const customizedContent = useMemo(() => {
    let result = content;
    placeholders.forEach(p => {
      if (p.value.trim()) {
        const regex = new RegExp(p.original.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
        result = result.replace(regex, p.value);
      }
    });
    return result;
  }, [content, placeholders]);

  // Auto-copy when all fields are filled
  useEffect(() => {
    if (isFullyFilled && prevFilledCount.current < totalCount && totalCount > 0) {
      // User just completed filling all fields
      navigator.clipboard.writeText(customizedContent);
      setCopied(true);
      setIsCustomizeMode(false);
      showToast('Prompt customized and copied to clipboard!', 'success');
      setTimeout(() => setCopied(false), 2000);
    }
    prevFilledCount.current = filledCount;
  }, [filledCount, isFullyFilled, totalCount, customizedContent, showToast]);

  const updatePlaceholder = (id: string, value: string) => {
    setPlaceholders(prev =>
      prev.map(p => p.id === id ? { ...p, value } : p)
    );
    setJustFilled(id);
    setTimeout(() => setJustFilled(null), 600);
  };

  const resetAll = () => {
    setPlaceholders(prev => prev.map(p => ({ ...p, value: '' })));
    setIsCustomizeMode(true);
  };

  const handleCopy = async () => {
    const textToCopy = hasAnyFilled ? customizedContent : content;
    await navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    onCopy?.(textToCopy);

    // Show toast with context about what was copied
    if (isFullyFilled) {
      showToast('Customized prompt copied to clipboard!', 'success');
    } else if (hasAnyFilled) {
      showToast(`Prompt copied (${filledCount}/${totalCount} fields filled)`, 'success');
    } else {
      showToast('Prompt template copied to clipboard', 'success');
    }

    setTimeout(() => setCopied(false), 2000);
  };

  // When clicking a placeholder in the prompt, open customize mode and focus that field
  const handlePlaceholderClick = (placeholderId: string) => {
    setIsCustomizeMode(true);
    setFocusedId(placeholderId);
    // Small delay to let the form render
    setTimeout(() => {
      inputRefs.current[placeholderId]?.focus();
    }, 100);
  };

  const renderContent = () => {
    const parts = content.split(/(\[[^\]]+\])/g);

    return parts.map((part, index) => {
      if (part.startsWith('[') && part.endsWith(']')) {
        const placeholder = placeholders.find(
          p => p.original.toLowerCase() === part.toLowerCase()
        );

        if (!placeholder) return part;

        const isFilled = placeholder.value.trim() !== '';
        const isFocused = focusedId === placeholder.id;
        const wasJustFilled = justFilled === placeholder.id;

        return (
          <motion.span
            key={`${index}-${placeholder.id}`}
            className={`
              inline-block px-2.5 py-1 rounded-lg cursor-pointer transition-all duration-200 font-medium
              ${isFilled
                ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-500/40 hover:bg-emerald-200 dark:hover:bg-emerald-500/30'
                : 'bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400 border border-amber-300 dark:border-amber-500/40 hover:bg-amber-200 dark:hover:bg-amber-500/30'
              }
              ${isFocused ? 'ring-2 ring-amber-400 ring-offset-2 ring-offset-surface' : ''}
            `}
            animate={wasJustFilled ? { scale: [1, 1.05, 1] } : {}}
            transition={{ duration: 0.25 }}
            onClick={() => handlePlaceholderClick(placeholder.id)}
            title={isFilled ? 'Click to edit' : 'Click to fill in'}
          >
            {isFilled ? placeholder.value : part}
          </motion.span>
        );
      }

      if (part.startsWith('**') && part.endsWith('**')) {
        return (
          <span key={index} className="font-semibold text-text-primary">
            {part.slice(2, -2)}
          </span>
        );
      }

      return part;
    });
  };

  // No placeholders - simple copy
  if (totalCount === 0) {
    return (
      <div className="relative group">
        <motion.button
          onClick={handleCopy}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`absolute top-4 right-4 z-10 flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium text-sm transition-all duration-200 opacity-0 group-hover:opacity-100 ${
            copied
              ? 'bg-emerald-500 text-white'
              : 'bg-surface/90 backdrop-blur-sm text-text-primary shadow-lg border border-border-subtle hover:bg-surface-elevated'
          }`}
        >
          {copied ? <Check size={14} /> : <Copy size={14} />}
          <span>{copied ? 'Copied!' : 'Copy'}</span>
        </motion.button>

        <div className="prompt-content-enhanced relative overflow-hidden rounded-2xl bg-surface">
          <div className="p-6 md:p-8">
            <pre className="font-mono text-sm md:text-base text-text-secondary whitespace-pre-wrap leading-relaxed">
              {content}
            </pre>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {/* STATE 1: Default - Not customizing, nothing filled */}
      {!isCustomizeMode && !hasAnyFilled && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-surface-elevated via-surface to-surface-elevated border border-border-subtle"
        >
          {/* Subtle decorative gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-accent/5 via-transparent to-accent/5 pointer-events-none" />

          <div className="relative p-5">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <p className="font-medium text-text-primary">
                  Personalize this prompt
                </p>
                <p className="text-sm text-text-tertiary mt-0.5">
                  {totalCount} customizable field{totalCount !== 1 ? 's' : ''} available
                </p>
              </div>

              <div className="flex items-center gap-3 sm:flex-shrink-0">
                <motion.button
                  onClick={() => setIsCustomizeMode(true)}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-full font-medium text-sm bg-text-primary text-background transition-all duration-200"
                >
                  <Sparkles size={15} />
                  <span>Customize</span>
                </motion.button>
                <button
                  onClick={handleCopy}
                  className="px-4 py-2.5 rounded-full text-sm font-medium text-text-secondary hover:text-text-primary transition-all duration-200"
                >
                  Copy as-is
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* STATE 2: Completed - All filled, form collapsed */}
      {!isCustomizeMode && isFullyFilled && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-50 via-emerald-50/50 to-emerald-100/50 dark:from-emerald-950/30 dark:via-emerald-950/20 dark:to-emerald-900/20 border border-emerald-200/50 dark:border-emerald-800/30"
        >
          <div className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-emerald-700 dark:text-emerald-400">
                  Ready to use
                </p>
                <p className="text-sm text-emerald-600/70 dark:text-emerald-500/70 mt-0.5">
                  All {totalCount} fields customized
                </p>
              </div>
              <button
                onClick={() => setIsCustomizeMode(true)}
                className="px-4 py-2 rounded-full text-sm font-medium text-emerald-600 dark:text-emerald-400 hover:bg-emerald-100 dark:hover:bg-emerald-900/30 transition-all duration-200"
              >
                Edit
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* STATE 3: Partial - Some filled, form collapsed */}
      {!isCustomizeMode && hasAnyFilled && !isFullyFilled && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-surface-elevated via-surface to-surface-elevated border border-border-subtle"
        >
          <div className="p-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div>
                  <p className="font-medium text-text-primary">
                    In progress
                  </p>
                  <p className="text-sm text-text-tertiary mt-0.5">
                    {totalCount - filledCount} field{totalCount - filledCount !== 1 ? 's' : ''} remaining
                  </p>
                </div>
                <NumberBadge count={filledCount} total={totalCount} isComplete={false} />
              </div>
              <motion.button
                onClick={() => setIsCustomizeMode(true)}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full font-medium text-sm bg-text-primary text-background transition-all duration-200"
              >
                Continue
              </motion.button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Form Panel - Only when customizing */}
      <AnimatePresence>
        {isCustomizeMode && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="relative rounded-2xl bg-surface-elevated border border-border-subtle overflow-hidden">
              {/* Subtle top gradient accent */}
              <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent" />

              <div className="p-5">
                {/* Header */}
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setIsCustomizeMode(false)}
                      className="p-2 rounded-xl hover:bg-surface transition-all duration-200 text-text-tertiary hover:text-text-primary"
                    >
                      <ChevronUp size={18} />
                    </button>
                    <div className="flex items-center gap-3">
                      <h4 className="font-medium text-text-primary">Customize fields</h4>
                      <NumberBadge count={filledCount} total={totalCount} isComplete={isFullyFilled} />
                    </div>
                  </div>

                  {hasAnyFilled && (
                    <button
                      onClick={resetAll}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm text-text-tertiary hover:text-text-secondary hover:bg-surface transition-all duration-200"
                    >
                      <RotateCcw size={14} />
                      <span>Reset</span>
                    </button>
                  )}
                </div>

                {/* Progress Bar - refined */}
                <div className="h-1 bg-border-subtle/50 rounded-full overflow-hidden mb-6">
                  <motion.div
                    className={`h-full rounded-full ${isFullyFilled ? 'bg-gradient-to-r from-emerald-500 to-emerald-400' : 'bg-gradient-to-r from-accent to-accent/80'}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.4, ease: 'easeOut' }}
                  />
                </div>

                {/* Input Fields - refined */}
                <div className="grid gap-4 sm:grid-cols-2">
                  {placeholders.map((placeholder, index) => {
                    const isFilled = placeholder.value.trim() !== '';
                    const needsTextarea = placeholder.label.toLowerCase().includes('description') ||
                                         placeholder.label.toLowerCase().includes('content') ||
                                         placeholder.label.toLowerCase().includes('details') ||
                                         placeholder.label.toLowerCase().includes('features') ||
                                         placeholder.label.toLowerCase().includes('code') ||
                                         placeholder.label.toLowerCase().includes('notes') ||
                                         placeholder.label.toLowerCase().includes('paste');

                    return (
                      <motion.div
                        key={placeholder.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.03 }}
                        className={needsTextarea ? 'sm:col-span-2' : ''}
                      >
                        <label className="flex items-center gap-2 text-sm font-medium text-text-secondary mb-2">
                          <span>{placeholder.label}</span>
                          {isFilled && (
                            <motion.span
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-emerald-500"
                            >
                              <Check size={10} className="text-white" strokeWidth={3} />
                            </motion.span>
                          )}
                        </label>

                        {needsTextarea ? (
                          <textarea
                            ref={(el) => { inputRefs.current[placeholder.id] = el; }}
                            value={placeholder.value}
                            onChange={(e) => updatePlaceholder(placeholder.id, e.target.value)}
                            onFocus={() => setFocusedId(placeholder.id)}
                            onBlur={() => setFocusedId(null)}
                            placeholder={`Enter ${placeholder.label.toLowerCase()}...`}
                            rows={3}
                            className={`w-full px-4 py-3 bg-surface border-2 rounded-xl text-text-primary placeholder:text-text-tertiary/60 focus:outline-none transition-all duration-200 resize-none ${
                              focusedId === placeholder.id
                                ? 'border-accent/50 ring-4 ring-accent/10'
                                : isFilled
                                  ? 'border-emerald-400/50 bg-emerald-50/30 dark:bg-emerald-950/20'
                                  : 'border-border-subtle hover:border-border'
                            }`}
                          />
                        ) : (
                          <input
                            ref={(el) => { inputRefs.current[placeholder.id] = el; }}
                            type="text"
                            value={placeholder.value}
                            onChange={(e) => updatePlaceholder(placeholder.id, e.target.value)}
                            onFocus={() => setFocusedId(placeholder.id)}
                            onBlur={() => setFocusedId(null)}
                            placeholder={`Enter ${placeholder.label.toLowerCase()}...`}
                            className={`w-full px-4 py-3 bg-surface border-2 rounded-xl text-text-primary placeholder:text-text-tertiary/60 focus:outline-none transition-all duration-200 ${
                              focusedId === placeholder.id
                                ? 'border-accent/50 ring-4 ring-accent/10'
                                : isFilled
                                  ? 'border-emerald-400/50 bg-emerald-50/30 dark:bg-emerald-950/20'
                                  : 'border-border-subtle hover:border-border'
                            }`}
                          />
                        )}
                      </motion.div>
                    );
                  })}
                </div>

                {/* Done Button - appears when fully filled */}
                {isFullyFilled && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-6 pt-5 border-t border-border-subtle flex justify-end"
                  >
                    <motion.button
                      onClick={() => setIsCustomizeMode(false)}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      className="flex items-center gap-2 px-6 py-3 rounded-full font-medium text-sm bg-emerald-500 text-white transition-all duration-200"
                    >
                      <Check size={16} strokeWidth={2.5} />
                      <span>Done</span>
                    </motion.button>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Prompt Content */}
      <div className="relative group">
        <div className="relative overflow-hidden rounded-2xl bg-surface border border-border-subtle">
          {/* Subtle decorative corner */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-accent/5 to-transparent pointer-events-none" />

          <div className="p-6 md:p-8 relative">
            <pre className="font-mono text-sm md:text-base text-text-secondary whitespace-pre-wrap leading-relaxed">
              {renderContent()}
            </pre>
          </div>

          {/* Copy Button */}
          <div className="px-6 pb-6 flex justify-center">
            <motion.button
              onClick={handleCopy}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              animate={copied ? { scale: [1, 1.05, 1] } : {}}
              className={`flex items-center gap-2.5 rounded-full font-medium transition-all duration-200 ${
                copied
                  ? 'bg-emerald-500 text-white px-8 py-4 text-base'
                  : isFullyFilled
                    ? 'bg-emerald-500 text-white px-8 py-4 text-base'
                    : hasAnyFilled
                      ? 'bg-text-primary text-background px-6 py-3'
                      : 'bg-surface-elevated border border-border-subtle text-text-secondary hover:text-text-primary hover:border-border px-6 py-3'
              }`}
            >
              {copied ? (
                <>
                  <Check size={20} strokeWidth={2.5} />
                  <span>Copied to clipboard!</span>
                </>
              ) : isFullyFilled ? (
                <>
                  <Sparkles size={20} />
                  <span>Copy Customized Prompt</span>
                </>
              ) : hasAnyFilled ? (
                <>
                  <Copy size={18} />
                  <span>Copy Prompt</span>
                  <span className="text-xs opacity-70">({filledCount}/{totalCount})</span>
                </>
              ) : (
                <>
                  <Copy size={18} />
                  <span>Copy Template</span>
                </>
              )}
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
}
