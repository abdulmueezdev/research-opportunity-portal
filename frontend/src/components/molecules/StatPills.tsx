import { cn } from '../../lib/utils';

export interface StatPillsCounts {
  total?: number;
  all?: number;
  open: number;
  closed: number;
}

export interface StatPillsProps {
  counts?: StatPillsCounts;
  total?: number;
  open?: number;
  closed?: number;
  className?: string;
}

export function StatPills({
  counts,
  total,
  open,
  closed,
  className,
}: StatPillsProps) {
  const resolvedTotal =
    total ??
    counts?.total ??
    counts?.all ??
    ((counts?.open ?? 0) + (counts?.closed ?? 0));
  const resolvedOpen = open ?? counts?.open ?? 0;
  const resolvedClosed = closed ?? counts?.closed ?? 0;

  return (
    <div
      role="status"
      aria-label="Opportunity statistics"
      className={cn('inline-flex flex-wrap items-center gap-2 select-none', className)}
    >
      <span className="inline-flex items-center gap-1.5 rounded-full border border-carbon bg-paper px-3 py-1 text-xs font-bold uppercase tracking-wider text-carbon">
        <span>TOTAL:</span>
        <span className="font-extrabold">{resolvedTotal}</span>
      </span>

      <span className="inline-flex items-center gap-1.5 rounded-full border border-carbon bg-lavender px-3 py-1 text-xs font-bold uppercase tracking-wider text-carbon">
        <span className="size-1.5 rounded-full bg-carbon shrink-0" aria-hidden="true" />
        <span>OPEN:</span>
        <span className="font-extrabold">{resolvedOpen}</span>
      </span>

      <span className="inline-flex items-center gap-1.5 rounded-full border border-carbon bg-soft-mist px-3 py-1 text-xs font-bold uppercase tracking-wider text-carbon">
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
        <span>CLOSED:</span>
        <span className="font-extrabold">{resolvedClosed}</span>
      </span>
    </div>
  );
}
