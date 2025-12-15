'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Send } from 'lucide-react';
import { useToast } from '@/contexts/ToastContext';

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
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="mt-10">
      <div className="flex items-center gap-2 mb-6">
        <MessageCircle size={24} className="text-text-secondary" />
        <h3 className="font-serif text-xl text-text-primary">
          Comments ({comments.length})
        </h3>
      </div>

      {/* Comment Form */}
      <form onSubmit={handleSubmit} className="mb-8 p-6 bg-surface rounded-xl border border-border-subtle">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div className="md:col-span-1">
            <label className="block text-sm font-medium text-text-secondary mb-1.5">
              Your Name
            </label>
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="Enter your name"
              className="w-full px-4 py-2.5 bg-background border border-border-subtle rounded-lg text-text-primary placeholder:text-text-tertiary focus:outline-none focus:border-text-secondary transition-colors"
              required
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-text-secondary mb-1.5">
              Comment
            </label>
            <input
              type="text"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Share your thoughts or tips..."
              className="w-full px-4 py-2.5 bg-background border border-border-subtle rounded-lg text-text-primary placeholder:text-text-tertiary focus:outline-none focus:border-text-secondary transition-colors"
              required
            />
          </div>
        </div>
        {error && (
          <p className="text-red-500 text-sm mb-4">{error}</p>
        )}
        <motion.button
          type="submit"
          disabled={isSubmitting || !author.trim() || !content.trim()}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="btn-primary-glow flex items-center gap-2 px-5 py-2.5 bg-text-primary text-background rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Send size={16} />
          {isSubmitting ? 'Posting...' : 'Post Comment'}
        </motion.button>
      </form>

      {/* Comments List */}
      {isLoading ? (
        <div className="text-center py-8 text-text-tertiary">Loading comments...</div>
      ) : comments.length === 0 ? (
        <div className="text-center py-8 text-text-tertiary">
          No comments yet. Be the first to share your thoughts!
        </div>
      ) : (
        <div className="space-y-4">
          <AnimatePresence>
            {comments.map((comment, index) => (
              <motion.div
                key={comment.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="p-5 bg-surface rounded-xl border border-border-subtle"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-text-primary">{comment.author}</span>
                  <span className="text-xs text-text-tertiary">{formatDate(comment.createdAt)}</span>
                </div>
                <p className="text-text-secondary">{comment.content}</p>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
