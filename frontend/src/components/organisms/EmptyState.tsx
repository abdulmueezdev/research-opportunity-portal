import { PrimaryButton } from '../atoms/PrimaryButton';
import { OutlinedButton } from '../atoms/OutlinedButton';
import { Sticker } from '../atoms/Sticker';
import { cn } from '../../lib/utils';

export interface EmptyStateProps {
  /** Indicates whether the empty state is due to active filters/search */
  isFiltered?: boolean;
  /** Callback triggered when user clicks to post an opportunity */
  onPostClick: () => void;
  /** Optional callback to clear active filters when isFiltered is true */
  onResetFilters?: () => void;
  /** Optional custom CSS classes */
  className?: string;
}

export function EmptyState({
  isFiltered = false,
  onPostClick,
  onResetFilters,
  className,
}: EmptyStateProps) {
  return (
    <div
      role="region"
      aria-label="No opportunities found"
      className={cn(
        'bg-paper border border-carbon rounded-[20px] p-8 sm:p-14 text-center max-w-xl mx-auto flex flex-col items-center justify-center select-none my-6 sm:my-10',
        className
      )}
    >
      {/* Playful Tilted Sticker Cluster */}
      <div
        className="flex items-center justify-center gap-3 sm:gap-4 mb-6 select-none"
        aria-hidden="true"
      >
        <Sticker
          name="atom"
          size={24}
          badge="lavender"
          rotation={-8}
          aria-hidden={true}
        />
        <Sticker
          name="flask"
          size={24}
          badge="mint"
          rotation={6}
          aria-hidden={true}
        />
        <Sticker
          name="lightbulb"
          size={24}
          badge="sunburst"
          rotation={-14}
          aria-hidden={true}
        />
        <Sticker
          name="magnifier"
          size={24}
          badge="sky-wash"
          rotation={12}
          aria-hidden={true}
        />
        <Sticker
          name="grad-cap"
          size={24}
          badge="soft-mist"
          rotation={-4}
          aria-hidden={true}
        />
      </div>

      {/* Main Heading */}
      <h2 className="text-2xl sm:text-3xl font-bold uppercase tracking-tight text-carbon mb-3">
        {isFiltered ? 'No matching opportunities' : 'No opportunities yet'}
      </h2>

      {/* Descriptive Subtext */}
      <p className="text-carbon/80 text-sm sm:text-base leading-relaxed max-w-md mb-8">
        {isFiltered
          ? 'No research listings match your active filters or search term. Try adjusting your query or resetting all filters.'
          : 'There are currently no active research positions posted on the board. Faculty members and lab directors can publish new openings now.'}
      </p>

      {/* Primary & Secondary Action CTAs */}
      <div className="flex flex-wrap items-center justify-center gap-3">
        {isFiltered && onResetFilters && (
          <OutlinedButton
            onClick={onResetFilters}
            aria-label="Reset all search filters"
          >
            RESET FILTERS
          </OutlinedButton>
        )}
        <PrimaryButton
          onClick={onPostClick}
          aria-label="Post the first research opportunity"
        >
          + POST THE FIRST ONE
        </PrimaryButton>
      </div>
    </div>
  );
}
