import { cn } from '../../lib/utils';

export interface LoadingSkeletonProps {
  /** Number of skeleton placeholder cards to render (default: 6) */
  count?: number;
  /** Optional custom CSS classes for the grid container */
  className?: string;
}

export function LoadingSkeleton({
  count = 6,
  className,
}: LoadingSkeletonProps) {
  const cards = Array.from({ length: count }, (_, i) => i);

  return (
    <div
      role="status"
      aria-label="Loading research opportunities"
      className={cn(
        'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full',
        className
      )}
    >
      <span className="sr-only">Loading research opportunities...</span>

      {cards.map((index) => (
        <article
          key={index}
          className={cn(
            'bg-soft-mist border border-carbon rounded-[20px] overflow-hidden flex flex-col justify-between select-none',
            'animate-pulse motion-reduce:animate-none'
          )}
          style={{ animationDuration: '1.8s' }}
        >
          {/* Card Header Strip Placeholder */}
          <div className="h-14 bg-paper/60 border-b border-carbon/20 px-5 flex items-center justify-between">
            <div className="h-5 w-28 bg-carbon/20 rounded-full" />
            <div className="h-5 w-16 bg-carbon/20 rounded-full" />
          </div>

          {/* Card Body Placeholder */}
          <div className="p-6 flex flex-col gap-4 flex-1">
            {/* Title Placeholder */}
            <div className="space-y-2">
              <div className="h-6 bg-carbon/25 rounded-full w-4/5" />
              <div className="h-6 bg-carbon/20 rounded-full w-2/3" />
            </div>

            {/* Faculty & Department Placeholder */}
            <div className="h-4 bg-carbon/15 rounded-full w-1/2" />

            {/* Description lines Placeholder */}
            <div className="space-y-2 py-1">
              <div className="h-3.5 bg-carbon/10 rounded-full w-full" />
              <div className="h-3.5 bg-carbon/10 rounded-full w-5/6" />
              <div className="h-3.5 bg-carbon/10 rounded-full w-3/4" />
            </div>

            {/* Skill tags Placeholder */}
            <div className="flex flex-wrap gap-2 pt-2">
              <div className="h-6 w-16 bg-carbon/15 rounded-full" />
              <div className="h-6 w-20 bg-carbon/15 rounded-full" />
              <div className="h-6 w-14 bg-carbon/15 rounded-full" />
            </div>
          </div>

          {/* Card Footer Actions Placeholder */}
          <div className="px-6 py-4 border-t border-carbon/20 flex items-center justify-between bg-paper/40">
            <div className="flex items-center gap-2">
              <div className="h-9 w-24 bg-carbon/20 rounded-full" />
              <div className="h-9 w-16 bg-carbon/15 rounded-full" />
            </div>
            <div className="size-9 rounded-full bg-carbon/20" />
          </div>
        </article>
      ))}
    </div>
  );
}
