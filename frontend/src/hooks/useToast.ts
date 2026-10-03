/**
 * Research Opportunity Portal - useToast Hook
 *
 * Provides a notification queue hook with auto-dismissal:
 * - Toast items: { id, type: 'success' | 'error', message, duration, onRetry? }
 * - addToast: Queues new toast and arms auto-dismiss timer (default 4000ms)
 * - removeToast: Immediately dismisses toast and clears timeout
 * - Cleanup on component unmount
 */

import { useState, useCallback, useRef, useEffect } from 'react';

export interface Toast {
  id: string;
  type: 'success' | 'error';
  message: string;
  duration?: number;
  onRetry?: () => void;
}

export interface UseToastReturn {
  toasts: Toast[];
  addToast: (type: 'success' | 'error', message: string, duration?: number) => void;
  removeToast: (id: string) => void;

  // Convenience aliases for atomic component consumption
  showSuccess: (message: string, duration?: number) => void;
  showError: (message: string, onRetryOrDuration?: (() => void) | number, duration?: number) => void;
  dismissToast: (id: string) => void;
}

const DEFAULT_TOAST_DURATION = 4000;

/**
 * React hook providing a toast notification queue with auto-dismissal.
 *
 * @returns Queue of active toasts along with add and dismiss handlers
 */
export function useToast(): UseToastReturn {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const timersRef = useRef<Map<string, ReturnType<typeof setTimeout>>>(new Map());

  // Clean up all pending timers on unmount
  useEffect(() => {
    const timers = timersRef.current;
    return () => {
      timers.forEach((timerId) => clearTimeout(timerId));
      timers.clear();
    };
  }, []);

  const removeToast = useCallback((id: string) => {
    const timer = timersRef.current.get(id);
    if (timer) {
      clearTimeout(timer);
      timersRef.current.delete(id);
    }
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const addToast = useCallback(
    (type: 'success' | 'error', message: string, duration = DEFAULT_TOAST_DURATION) => {
      const id =
        typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function'
          ? crypto.randomUUID()
          : `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;

      const toast: Toast = { id, type, message, duration };

      setToasts((prev) => [...prev, toast]);

      if (duration > 0 && duration !== Infinity) {
        const timerId = setTimeout(() => {
          removeToast(id);
        }, duration);
        timersRef.current.set(id, timerId);
      }
    },
    [removeToast]
  );

  const showSuccess = useCallback(
    (message: string, duration = DEFAULT_TOAST_DURATION) => {
      addToast('success', message, duration);
    },
    [addToast]
  );

  const showError = useCallback(
    (message: string, onRetryOrDuration?: (() => void) | number, duration?: number) => {
      if (typeof onRetryOrDuration === 'function') {
        const id =
          typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function'
            ? crypto.randomUUID()
            : `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;

        const toastDuration = duration ?? DEFAULT_TOAST_DURATION;
        const toast: Toast = {
          id,
          type: 'error',
          message,
          duration: toastDuration,
          onRetry: onRetryOrDuration,
        };

        setToasts((prev) => [...prev, toast]);

        if (toastDuration > 0 && toastDuration !== Infinity) {
          const timerId = setTimeout(() => {
            removeToast(id);
          }, toastDuration);
          timersRef.current.set(id, timerId);
        }
      } else {
        const toastDuration =
          typeof onRetryOrDuration === 'number' ? onRetryOrDuration : DEFAULT_TOAST_DURATION;
        addToast('error', message, toastDuration);
      }
    },
    [addToast, removeToast]
  );

  return {
    toasts,
    addToast,
    removeToast,
    showSuccess,
    showError,
    dismissToast: removeToast,
  };
}
