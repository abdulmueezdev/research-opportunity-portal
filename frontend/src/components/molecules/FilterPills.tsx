import { type OpportunityFilter } from '../../types/opportunity';
import { cn } from '../../lib/utils';

export interface FilterPillsProps {
  filter: OpportunityFilter;
  onFilterChange: (f: OpportunityFilter) => void;
  counts: {
    all: number;
    open: number;
    closed: number;
  };
  className?: string;
}

interface FilterOption {
  value: OpportunityFilter;
  label: string;
  countKey: keyof FilterPillsProps['counts'];
}

const FILTER_OPTIONS: FilterOption[] = [
  { value: 'All', label: 'ALL', countKey: 'all' },
  { value: 'Open', label: 'OPEN', countKey: 'open' },
  { value: 'Closed', label: 'CLOSED', countKey: 'closed' },
];

export function FilterPills({
  filter,
  onFilterChange,
  counts,
  className,
}: FilterPillsProps) {
  return (
    <div
      role="group"
      aria-label="Filter opportunities by status"
      className={cn('inline-flex flex-wrap items-center gap-2 select-none', className)}
    >
      {FILTER_OPTIONS.map((item) => {
        const isActive = filter.toLowerCase() === item.value.toLowerCase();
        const count = counts[item.countKey] ?? 0;

        return (
          <button
            key={item.value}
            type="button"
            aria-pressed={isActive}
            onClick={() => onFilterChange(item.value)}
            className={cn(
              'rounded-full px-4 py-1.5 text-xs font-bold uppercase transition-colors cursor-pointer',
              'focus-visible:outline-2 focus-visible:outline-voltage-violet focus-visible:outline-offset-2',
              isActive
                ? 'bg-carbon text-paper border border-carbon'
                : 'bg-paper text-carbon border border-carbon hover:bg-soft-mist'
            )}
          >
            <span>{item.label}</span>
            <span
              className={cn(
                'ml-1.5 font-normal',
                isActive ? 'text-paper/80' : 'text-carbon/70'
              )}
            >
              ({count})
            </span>
          </button>
        );
      })}
    </div>
  );
}
