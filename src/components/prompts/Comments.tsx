'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Send, User } from 'lucide-react';
import { useToast } from '@/contexts/ToastContext';
import { useCommentCountContext } from '@/contexts/CommentCountContext';

interface Comment {
  id: string;
  promptId: string;
  author: string;
  content: string;
  createdAt: string;
}

interface CommentsProps {
  promptId: string;
}

export function Comments({ promptId }: CommentsProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [author, setAuthor] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const { showToast } = useToast();
  const { incrementCount } = useCommentCountContext();

  useEffect(() => {
    async function loadComments() {
      try {
        const response = await fetch(`/api/comments?promptId=${promptId}`);
        const data = await response.json();
        setComments(data);
      } catch (err) {
        console.error('Failed to load comments:', err);
      } finally {
        setIsLoading(false);
      }
    }

    loadComments();
  }, [promptId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!author.trim() || !content.trim()) return;

    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch('/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ promptId, author, content }),
      });

      if (!response.ok) throw new Error('Failed to post comment');

      const newComment = await response.json();
      setComments([newComment, ...comments]);
      setContent('');
      incrementCount(promptId);
      showToast('Comment posted');
    } catch (err) {
      setError('Failed to post comment. Please try again.');
      showToast('Failed to post comment', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;

    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined,
    });
  };

  // Generate initials from author name
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  // Generate a consistent color based on name
  const getAvatarColor = (name: string) => {
    const colors = [
      'bg-blue-500',
      'bg-emerald-500',
      'bg-amber-500',
      'bg-purple-500',
      'bg-rose-500',
      'bg-cyan-500',
      'bg-orange-500',
      'bg-indigo-500',
    ];
    const hash = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return colors[hash % colors.length];
  };

  return (
    <div id="comments" className="scroll-mt-24">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-surface-elevated border border-border-subtle">
          <MessageCircle size={20} className="text-text-secondary" />
        </div>
        <div>
          <h3 className="font-serif text-xl text-text-primary">
            Discussion
          </h3>
          <p className="text-sm text-text-tertiary">
            {comments.length === 0
              ? 'Be the first to comment'
              : `${comments.length} comment${comments.length !== 1 ? 's' : ''}`}
          </p>
        </div>
      </div>

      {/* Comment Form */}
      <form onSubmit={handleSubmit} className="mb-10">
        <div className="flex gap-4">
          {/* Avatar placeholder */}
          <div className="hidden sm:flex items-start">
            <div className="w-10 h-10 rounded-full bg-surface-elevated border border-border-subtle flex items-center justify-center">
              <User size={18} className="text-text-tertiary" />
            </div>
          </div>

          <div className="flex-1 space-y-3">
            {/* Name input */}
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="Your name"
              className="w-full sm:w-auto px-4 py-2.5 bg-surface border border-border-subtle rounded-xl text-text-primary placeholder:text-text-tertiary focus:outline-none focus:border-border focus:ring-2 focus:ring-border/20 transition-all"
              required
            />

            {/* Comment input */}
            <div className="relative">
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Share your thoughts, tips, or suggestions..."
                rows={3}
                className="w-full px-4 py-3 bg-surface border border-border-subtle rounded-xl text-text-primary placeholder:text-text-tertiary focus:outline-none focus:border-border focus:ring-2 focus:ring-border/20 transition-all resize-none"
                required
              />
            </div>

            {error && (
              <p className="text-red-500 text-sm">{error}</p>
            )}

            {/* Submit button */}
            <div className="flex justify-end">
              <motion.button
                type="submit"
                disabled={isSubmitting || !author.trim() || !content.trim()}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-2 px-5 py-2.5 bg-text-primary text-background rounded-full font-medium text-sm hover:shadow-lg transition-all disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:shadow-none"
              >
                <Send size={14} />
                {isSubmitting ? 'Posting...' : 'Post Comment'}
              </motion.button>
            </div>
          </div>
        </div>
      </form>

      {/* Comments List */}
      {isLoading ? (
        <div className="space-y-4">
          {[1, 2].map((i) => (
            <div key={i} className="flex gap-4 animate-pulse">
              <div className="w-10 h-10 rounded-full bg-surface-elevated" />
              <div className="flex-1 space-y-2">
                <div className="h-4 w-24 bg-surface-elevated rounded" />
                <div className="h-4 w-full bg-surface-elevated rounded" />
                <div className="h-4 w-2/3 bg-surface-elevated rounded" />
              </div>
            </div>
          ))}
        </div>
      ) : comments.length === 0 ? (
        <div className="text-center py-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-surface-elevated border border-border-subtle mb-4">
            <MessageCircle size={28} className="text-text-tertiary" />
          </div>
          <p className="text-text-secondary font-medium mb-1">No comments yet</p>
          <p className="text-sm text-text-tertiary">
            Start the conversation by sharing your thoughts above
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          <AnimatePresence>
            {comments.map((comment, index) => (
              <motion.div
                key={comment.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="flex gap-4"
              >
                {/* Avatar */}
                <div className={`w-10 h-10 rounded-full ${getAvatarColor(comment.author)} flex items-center justify-center text-white text-sm font-semibold flex-shrink-0`}>
                  {getInitials(comment.author)}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-text-primary">{comment.author}</span>
                    <span className="text-text-tertiary">·</span>
                    <span className="text-sm text-text-tertiary">{formatDate(comment.createdAt)}</span>
                  </div>
                  <p className="text-text-secondary leading-relaxed">{comment.content}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
