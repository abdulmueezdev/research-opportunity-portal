import { type ButtonHTMLAttributes, type ReactNode } from 'react';
import { cn } from '../../lib/utils';
import { PrimaryButton } from './PrimaryButton';
import { OutlinedButton } from './OutlinedButton';

export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'icon' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  loadingText?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  children?: ReactNode;
}

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-[11px]',
  md: 'px-5 py-2.5 text-xs',
  lg: 'px-6 py-3 text-sm',
};

export function Button({
  variant = 'primary',
  size = 'md',
  className,
  children,
  leftIcon,
  rightIcon,
  isLoading,
  loadingText,
  disabled,
  type = 'button',
  ...props
}: ButtonProps) {
  if (variant === 'primary') {
    return (
      <PrimaryButton
        type={type}
        disabled={disabled}
        isLoading={isLoading}
        loadingText={loadingText}
        leftIcon={leftIcon}
        rightIcon={rightIcon}
        className={cn(sizeClasses[size], className)}
        {...props}
      >
        {children}
      </PrimaryButton>
    );
  }

  if (variant === 'secondary') {
    return (
      <OutlinedButton
        type={type}
        disabled={disabled}
        isLoading={isLoading}
        loadingText={loadingText}
        leftIcon={leftIcon}
        rightIcon={rightIcon}
        className={cn(sizeClasses[size], className)}
        {...props}
      >
        {children}
      </OutlinedButton>
    );
  }

  if (variant === 'icon') {
    const iconSize = size === 'sm' ? 'size-8' : size === 'lg' ? 'size-12' : 'size-10';
    return (
      <button
        type={type}
        disabled={disabled || isLoading}
        className={cn(
          'inline-flex items-center justify-center rounded-full border border-carbon bg-paper text-carbon',
          iconSize,
          'hover:bg-soft-mist active:translate-y-px transition-colors',
          'focus-visible:outline-2 focus-visible:outline-voltage-violet focus-visible:outline-offset-2',
          'disabled:opacity-50 disabled:pointer-events-none',
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }

  if (variant === 'danger') {
    return (
      <button
        type={type}
        disabled={disabled || isLoading}
        className={cn(
          'inline-flex items-center justify-center gap-2 min-h-11 rounded-full border border-carbon bg-carbon text-paper font-bold uppercase tracking-wider',
          sizeClasses[size],
          'hover:border-ember hover:text-ember active:translate-y-px transition-colors',
          'focus-visible:outline-2 focus-visible:outline-voltage-violet focus-visible:outline-offset-2',
          'disabled:opacity-50 disabled:pointer-events-none',
          className
        )}
        {...props}
      >
        {isLoading ? (loadingText || children) : children}
      </button>
    );
  }

  return (
    <button
      type={type}
      disabled={disabled || isLoading}
      className={cn(
        'inline-flex items-center justify-center gap-2 min-h-11 rounded-full border border-transparent bg-transparent text-carbon font-bold uppercase tracking-wider',
        sizeClasses[size],
        'hover:bg-soft-mist active:translate-y-px transition-colors',
        'focus-visible:outline-2 focus-visible:outline-voltage-violet focus-visible:outline-offset-2',
        'disabled:opacity-50 disabled:pointer-events-none',
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
