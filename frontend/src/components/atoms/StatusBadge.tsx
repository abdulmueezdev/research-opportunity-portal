import { type ReactNode } from 'react';
import { type OpportunityStatus } from '../../types/opportunity';
import { cn } from '../../lib/utils';

export interface StatusBadgeProps {
  status: OpportunityStatus | 'Open' | 'Closed';
  label?: string;
  icon?: ReactNode;
  className?: string;
}

function LockIcon() {
  return (
    <svg
      className="size-3 shrink-0"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}

export function StatusBadge({ status, label, icon, className }: StatusBadgeProps) {
  const isOpen = status === 'Open';
  const displayLabel = label ?? (isOpen ? 'OPEN' : 'CLOSED');

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border border-carbon px-3 py-1 text-xs font-bold uppercase tracking-wider text-carbon select-none',
        isOpen ? 'bg-lavender' : 'bg-soft-mist',
        className
      )}
    >
      {icon ? (
        icon
      ) : isOpen ? (
        <span className="size-1.5 rounded-full bg-carbon shrink-0" aria-hidden="true" />
      ) : (
        <LockIcon />
      )}
      <span>{displayLabel}</span>
    </span>
  );
}
