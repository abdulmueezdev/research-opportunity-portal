import { type ReactNode } from 'react';
import { type OpportunityStatus } from '../../types/opportunity';
import { StatusBadge } from './StatusBadge';
import { cn } from '../../lib/utils';

export type PillBadgeVariant = 'open' | 'closed' | 'stat' | 'neutral';

export interface PillBadgeProps {
  variant: PillBadgeVariant | OpportunityStatus;
  label: string;
  icon?: ReactNode;
  className?: string;
}

export function PillBadge({ variant, label, icon, className }: PillBadgeProps) {
  const normalizedVariant = String(variant).toLowerCase();

  if (normalizedVariant === 'open') {
    return <StatusBadge status="Open" label={label} icon={icon} className={className} />;
  }

  if (normalizedVariant === 'closed') {
    return <StatusBadge status="Closed" label={label} icon={icon} className={className} />;
  }

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border border-carbon px-3 py-1 text-xs font-bold uppercase tracking-wider text-carbon select-none',
        normalizedVariant === 'stat' ? 'bg-sky-wash' : 'bg-soft-mist',
        className
      )}
    >
      {icon}
      <span>{label}</span>
    </span>
  );
}
