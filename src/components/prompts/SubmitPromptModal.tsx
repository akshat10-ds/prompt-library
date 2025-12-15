'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, CheckCircle } from 'lucide-react';
import { CategoryId, categories, ToolId, OutputType, DifficultyLevel } from '@/data';
import { useToast } from '@/contexts/ToastContext';

interface SubmitPromptModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type FormState = 'form' | 'submitting' | 'success' | 'error';

export function SubmitPromptModal({ isOpen, onClose }: SubmitPromptModalProps) {
  const [formState, setFormState] = useState<FormState>('form');
  const [errorMessage, setErrorMessage] = useState('');
  const { showToast } = useToast();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    content: '',
    category: '' as CategoryId | '',
    tags: '',
    author: '',
    email: '',
    exampleOutput: '',
    urls: '',
    tools: [] as ToolId[],
    outputType: '' as OutputType | '',
    difficulty: '' as DifficultyLevel | '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('submitting');
    setErrorMessage('');

    try {
      const response = await fetch('/api/prompts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          tags: formData.tags
            .split(',')
            .map((tag) => tag.trim().toLowerCase())
            .filter(Boolean),
          urls: formData.urls
            .split('\n')
            .map((url) => url.trim())
            .filter(Boolean),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit prompt');
      }

      setFormState('success');
      showToast('Prompt submitted successfully!');
      // Reset form after success
      setFormData({
        title: '',
        description: '',
        content: '',
        category: '',
        tags: '',
        author: '',
        email: '',
        exampleOutput: '',
        urls: '',
        tools: [],
        outputType: '',
        difficulty: '',
      });
    } catch (error) {
      setFormState('error');
      const message = error instanceof Error ? error.message : 'Something went wrong';
      setErrorMessage(message);
      showToast(message, 'error');
    }
  };

  const handleClose = () => {
    setFormState('form');
    setErrorMessage('');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            onClick={handleClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-4 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-2xl md:max-h-[85vh] bg-surface border border-border-subtle rounded-xl shadow-2xl z-50 overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-border-subtle">
              <h2 className="font-serif text-xl text-text-primary">Submit Your Prompt</h2>
              <button
                onClick={handleClose}
                className="p-2 rounded-lg text-text-tertiary hover:text-text-primary hover:bg-surface-elevated transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6">
              {formState === 'success' ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col items-center justify-center py-12 text-center"
                >
                  <CheckCircle size={64} className="text-green-500 mb-4" />
                  <h3 className="font-serif text-2xl text-text-primary mb-2">
                    Prompt Submitted!
                  </h3>
                  <p className="text-text-secondary max-w-sm">
                    Thank you for your contribution. Our team will review your prompt and add it to the library if approved.
                  </p>
                  <button
                    onClick={handleClose}
                    className="mt-6 px-6 py-2 bg-text-primary text-background rounded-lg hover:opacity-90 transition-opacity"
                  >
                    Done
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Author Info */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-text-secondary mb-1.5">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.author}
                        onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                        className="w-full px-4 py-2.5 bg-background border border-border-subtle rounded-lg text-text-primary placeholder:text-text-tertiary focus:outline-none focus:border-text-secondary transition-colors"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-text-secondary mb-1.5">
                        Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-2.5 bg-background border border-border-subtle rounded-lg text-text-primary placeholder:text-text-tertiary focus:outline-none focus:border-text-secondary transition-colors"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  {/* Title */}
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-1.5">
                      Prompt Title *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="w-full px-4 py-2.5 bg-background border border-border-subtle rounded-lg text-text-primary placeholder:text-text-tertiary focus:outline-none focus:border-text-secondary transition-colors"
                      placeholder="e.g., Code Review Assistant"
                    />
                  </div>

                  {/* Category */}
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-1.5">
                      Category *
                    </label>
                    <select
                      required
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value as CategoryId })}
                      className="w-full px-4 py-2.5 bg-background border border-border-subtle rounded-lg text-text-primary focus:outline-none focus:border-text-secondary transition-colors"
                    >
                      <option value="">Select a category</option>
                      {categories.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                          {cat.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Works With Tools */}
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-2">
                      Works with *
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {[
                        { id: 'claude' as ToolId, label: 'Claude' },
                        { id: 'chatgpt' as ToolId, label: 'ChatGPT' },
                        { id: 'gemini' as ToolId, label: 'Gemini' },
                        { id: 'other' as ToolId, label: 'Other' },
                      ].map((tool) => (
                        <label
                          key={tool.id}
                          className={`flex items-center gap-2 px-3 py-2 rounded-lg border cursor-pointer transition-all ${
                            formData.tools.includes(tool.id)
                              ? 'bg-text-primary text-background border-text-primary'
                              : 'bg-background border-border-subtle hover:border-border text-text-secondary'
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={formData.tools.includes(tool.id)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setFormData({ ...formData, tools: [...formData.tools, tool.id] });
                              } else {
                                setFormData({ ...formData, tools: formData.tools.filter((t) => t !== tool.id) });
                              }
                            }}
                            className="sr-only"
                          />
                          <span className="text-sm font-medium">{tool.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Output Type & Difficulty */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-text-secondary mb-1.5">
                        Output Type *
                      </label>
                      <select
                        required
                        value={formData.outputType}
                        onChange={(e) => setFormData({ ...formData, outputType: e.target.value as OutputType })}
                        className="w-full px-4 py-2.5 bg-background border border-border-subtle rounded-lg text-text-primary focus:outline-none focus:border-text-secondary transition-colors"
                      >
                        <option value="">Select output type</option>
                        <option value="checklist">Checklist</option>
                        <option value="email">Email</option>
                        <option value="report">Report</option>
                        <option value="code">Code</option>
                        <option value="analysis">Analysis</option>
                        <option value="documentation">Documentation</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-text-secondary mb-1.5">
                        Difficulty *
                      </label>
                      <select
                        required
                        value={formData.difficulty}
                        onChange={(e) => setFormData({ ...formData, difficulty: e.target.value as DifficultyLevel })}
                        className="w-full px-4 py-2.5 bg-background border border-border-subtle rounded-lg text-text-primary focus:outline-none focus:border-text-secondary transition-colors"
                      >
                        <option value="">Select difficulty</option>
                        <option value="beginner">Beginner</option>
                        <option value="intermediate">Intermediate</option>
                        <option value="advanced">Advanced</option>
                      </select>
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-1.5">
                      Short Description *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className="w-full px-4 py-2.5 bg-background border border-border-subtle rounded-lg text-text-primary placeholder:text-text-tertiary focus:outline-none focus:border-text-secondary transition-colors"
                      placeholder="Brief description of what this prompt does"
                    />
                  </div>

                  {/* Content */}
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-1.5">
                      Prompt Content *
                    </label>
                    <textarea
                      required
                      rows={8}
                      value={formData.content}
                      onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                      className="w-full px-4 py-2.5 bg-background border border-border-subtle rounded-lg text-text-primary placeholder:text-text-tertiary focus:outline-none focus:border-text-secondary transition-colors font-mono text-sm resize-none"
                      placeholder="Enter your prompt content here. Use [brackets] for placeholder variables."
                    />
                  </div>

                  {/* Tags */}
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-1.5">
                      Tags (comma-separated)
                    </label>
                    <input
                      type="text"
                      value={formData.tags}
                      onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                      className="w-full px-4 py-2.5 bg-background border border-border-subtle rounded-lg text-text-primary placeholder:text-text-tertiary focus:outline-none focus:border-text-secondary transition-colors"
                      placeholder="e.g., productivity, automation, analysis"
                    />
                  </div>

                  {/* Example Output */}
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-1.5">
                      Example Output (optional)
                    </label>
                    <textarea
                      rows={5}
                      value={formData.exampleOutput}
                      onChange={(e) => setFormData({ ...formData, exampleOutput: e.target.value })}
                      className="w-full px-4 py-2.5 bg-background border border-border-subtle rounded-lg text-text-primary placeholder:text-text-tertiary focus:outline-none focus:border-text-secondary transition-colors font-mono text-sm resize-none"
                      placeholder="Show an example of what the AI might output when using this prompt"
                    />
                  </div>

                  {/* Related URLs */}
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-1.5">
                      Related URLs (one per line, optional)
                    </label>
                    <textarea
                      rows={3}
                      value={formData.urls}
                      onChange={(e) => setFormData({ ...formData, urls: e.target.value })}
                      className="w-full px-4 py-2.5 bg-background border border-border-subtle rounded-lg text-text-primary placeholder:text-text-tertiary focus:outline-none focus:border-text-secondary transition-colors text-sm resize-none"
                      placeholder="https://example.com/resource&#10;https://docs.example.com/guide"
                    />
                  </div>

                  {/* Error Message */}
                  {formState === 'error' && (
                    <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-500 text-sm">
                      {errorMessage}
                    </div>
                  )}

                  {/* Submit Button */}
                  <div className="pt-2">
                    <motion.button
                      type="submit"
                      disabled={formState === 'submitting'}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      className="btn-primary-glow w-full flex items-center justify-center gap-2 px-6 py-3 bg-text-primary text-background rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {formState === 'submitting' ? (
                        <>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                            className="w-5 h-5 border-2 border-background/30 border-t-background rounded-full"
                          />
                          Submitting...
                        </>
                      ) : (
                        <>
                          <Send size={18} />
                          Submit Prompt
                        </>
                      )}
                    </motion.button>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
