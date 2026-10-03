import { forwardRef, type InputHTMLAttributes } from 'react';
import { cn } from '../../lib/utils';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  isInvalid?: boolean;
  hasError?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { className, type = 'text', isInvalid, hasError, disabled, ...props },
  ref
) {
  const isError = Boolean(isInvalid || hasError);

  return (
    <input
      ref={ref}
      type={type}
      disabled={disabled}
      aria-invalid={isError ? 'true' : undefined}
      className={cn(
        'w-full min-h-11 px-4 py-2.5 rounded-2xl bg-paper text-carbon text-sm font-medium',
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
