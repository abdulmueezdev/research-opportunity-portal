import { type ButtonHTMLAttributes, type ReactNode } from 'react';
import { cn } from '../../lib/utils';

export interface PrimaryButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  isLoading?: boolean;
  loadingText?: string;
}

export function PrimaryButton({
  children,
  className,
  disabled,
  isLoading,
  loadingText,
  leftIcon,
  rightIcon,
  type = 'button',
  ...props
}: PrimaryButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled || isLoading}
      className={cn(
        'inline-flex items-center justify-center gap-2 min-h-11 min-w-11',
        'bg-carbon text-paper border border-carbon rounded-full px-5 py-2.5 font-bold uppercase tracking-wider text-xs hover:opacity-90 active:translate-y-px transition-transform',
        'focus-visible:outline-2 focus-visible:outline-voltage-violet focus-visible:outline-offset-2',
        'disabled:opacity-50 disabled:pointer-events-none disabled:active:translate-y-0',
        className
      )}
      {...props}
    >
      {isLoading ? (
        <>
          <span className="inline-block size-3.5 border-2 border-paper border-t-transparent rounded-full animate-spin" aria-hidden="true" />
          <span>{loadingText || children}</span>
        </>
      ) : (
        <>
          {leftIcon}
          {children}
          {rightIcon}
        </>
      )}
    </button>
  );
}
