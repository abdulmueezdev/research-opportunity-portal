import { forwardRef, type TextareaHTMLAttributes } from 'react';
import { cn } from '../../lib/utils';

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  isInvalid?: boolean;
  hasError?: boolean;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  { className, rows = 5, isInvalid, hasError, disabled, ...props },
  ref
) {
  const isError = Boolean(isInvalid || hasError);

  return (
    <textarea
      ref={ref}
      rows={rows}
      disabled={disabled}
      aria-invalid={isError ? 'true' : undefined}
      className={cn(
        'w-full min-h-[120px] p-4 rounded-2xl bg-paper text-carbon text-sm font-medium resize-y',
        'transition-colors placeholder:text-concrete',
        isError
          ? 'border-2 border-ember focus:outline-2 focus:outline-ember focus:outline-offset-2'
          : 'border border-carbon focus:outline-2 focus:outline-voltage-violet focus:outline-offset-2',
        'disabled:bg-soft-mist disabled:cursor-not-allowed disabled:opacity-70',
        className
      )}
      {...props}
    />
  );
});
