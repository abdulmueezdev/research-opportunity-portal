import { type Toast } from '../../hooks/useToast';
import { Sticker } from '../atoms/Sticker';
import { cn } from '../../lib/utils';

export interface ToastContainerProps {
  /** Active toast notification items */
  toasts?: Toast[];
  /** Callback triggered when a toast is dismissed */
  onDismiss?: (id: string) => void;
  /** Optional custom CSS classes for the container */
  className?: string;
}

export function ToastContainer({
  toasts = [],
  onDismiss,
  className,
}: ToastContainerProps) {
  if (!toasts || toasts.length === 0) {
    return null;
  }

  return (
    <div
      role="region"
      aria-label="Notification banners"
      className={cn(
        'fixed top-6 left-1/2 -translate-x-1/2 z-50 flex flex-col gap-2 items-center pointer-events-none w-full max-w-lg px-4',
        className
      )}
    >
      {toasts.map((toast) => {
        const isError = toast.type === 'error';

        return (
          <div
            key={toast.id}
            role={isError ? 'alert' : 'status'}
            aria-live={isError ? 'assertive' : 'polite'}
            className={cn(
              'bg-paper border border-carbon rounded-full px-5 py-3 flex items-center gap-3 text-sm font-bold pointer-events-auto select-none',
              'transition-all duration-200 ease-out'
            )}
          >
            {/* Status Sticker Icon Badge */}
            {isError ? (
              <Sticker
                name="exclamation"
                size={16}
                badge="ember"
                aria-hidden={true}
              />
            ) : (
              <Sticker
                name="checkmark"
                size={16}
                badge="mint"
                aria-hidden={true}
              />
            )}

            {/* Notification Message */}
            <span className="text-carbon leading-snug tracking-tight">
              {toast.message}
            </span>

            {/* Optional Retry Action */}
            {toast.onRetry && (
              <button
                type="button"
                onClick={toast.onRetry}
                className="ml-2 px-2.5 py-1 text-xs font-bold rounded-full border border-carbon bg-paper hover:bg-soft-mist uppercase tracking-wider text-carbon focus-visible:outline-2 focus-visible:outline-voltage-violet active:translate-y-px transition-transform"
              >
                RETRY
              </button>
            )}

            {/* Dismiss Close Trigger */}
            {onDismiss && (
              <button
                type="button"
                onClick={() => onDismiss(toast.id)}
                aria-label="Dismiss notification"
                className="ml-1 p-1 rounded-full text-carbon/60 hover:text-carbon hover:bg-soft-mist focus-visible:outline-2 focus-visible:outline-voltage-violet transition-colors shrink-0"
              >
                <Sticker name="close" size={14} aria-hidden={true} />
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
}
