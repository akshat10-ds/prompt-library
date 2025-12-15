'use client';

import { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, AlertCircle, Info } from 'lucide-react';

type ToastType = 'success' | 'error' | 'info';

interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

interface ToastContextType {
  showToast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}

const icons = {
  success: Check,
  error: X,
  info: Info,
};

const iconColors = {
  success: 'text-success',
  error: 'text-red-500',
  info: 'text-text-secondary',
};

const bgColors = {
  success: 'bg-success/10 border-success/20',
  error: 'bg-red-500/10 border-red-500/20',
  info: 'bg-surface-elevated border-border-subtle',
};

function ToastItem({ toast, onRemove }: { toast: Toast; onRemove: () => void }) {
  const Icon = icons[toast.type];

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.9 }}
      transition={{
        type: 'spring',
        stiffness: 500,
        damping: 40,
      }}
      className={`relative flex items-center gap-3 px-4 py-3 rounded-xl border backdrop-blur-sm shadow-lg ${bgColors[toast.type]}`}
    >
      {/* Animated icon container */}
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ delay: 0.1, type: 'spring', stiffness: 500, damping: 25 }}
        className={`flex-shrink-0 ${iconColors[toast.type]}`}
      >
        <Icon size={18} strokeWidth={2.5} />
      </motion.div>

      {/* Message */}
      <motion.span
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.15 }}
        className="text-sm font-medium text-text-primary"
      >
        {toast.message}
      </motion.span>

      {/* Dismiss button */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        onClick={onRemove}
        className="ml-2 p-1 rounded-md text-text-tertiary hover:text-text-primary hover:bg-surface transition-colors"
      >
        <X size={14} />
      </motion.button>

      {/* Progress bar */}
      <motion.div
        initial={{ scaleX: 1 }}
        animate={{ scaleX: 0 }}
        transition={{ duration: 3, ease: 'linear' }}
        className={`absolute bottom-0 left-0 right-0 h-0.5 origin-left rounded-b-xl ${
          toast.type === 'success' ? 'bg-success' : toast.type === 'error' ? 'bg-red-500' : 'bg-text-tertiary'
        }`}
      />
    </motion.div>
  );
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((message: string, type: ToastType = 'success') => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    setToasts((prev) => [...prev, { id, message, type }]);

    // Auto remove after 3 seconds
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      {/* Toast Container */}
      <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-2 max-w-sm">
        <AnimatePresence mode="popLayout">
          {toasts.map((toast) => (
            <ToastItem key={toast.id} toast={toast} onRemove={() => removeToast(toast.id)} />
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}
