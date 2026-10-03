import { PrimaryButton } from '../atoms/PrimaryButton';
import { PillBadge } from '../atoms/PillBadge';
import { cn } from '../../lib/utils';

export interface NavBarProps {
  /** Callback invoked when "+ POST OPPORTUNITY" is clicked */
  onPostClick: () => void;
  /** Total count of opportunities */
  totalCount?: number;
  /** Count of open opportunities */
  openCount?: number;
  /** Optional custom CSS classes */
  className?: string;
}

export function NavBar({
  onPostClick,
  totalCount = 0,
  openCount = 0,
  className,
}: NavBarProps) {
  return (
    <header
      role="banner"
      className={cn(
        'border-b border-carbon bg-paper px-4 sm:px-6 py-4 flex items-center justify-between gap-4 select-none',
        className
      )}
    >
      {/* Left: 'R' Badge Logo & Portal Title */}
      <div className="flex items-center gap-3">
        <a
          href="/"
          className="flex items-center gap-3 group focus-visible:outline-2 focus-visible:outline-voltage-violet focus-visible:outline-offset-2 rounded-full"
          aria-label="Research Board Home"
        >
          <span
            className="size-10 rounded-full bg-carbon text-paper font-display text-xl flex items-center justify-center border border-carbon shrink-0 select-none group-hover:opacity-90 transition-opacity"
            aria-hidden="true"
          >
            R
          </span>
          <span className="font-bold text-base sm:text-lg uppercase tracking-tight text-carbon">
            RESEARCH BOARD
          </span>
        </a>
      </div>

      {/* Center: Stat badge pills (ACTIVE, OPENINGS) */}
      <div
        role="status"
        aria-label="Portal openings overview"
        className="hidden sm:flex items-center gap-2"
      >
        <PillBadge
          variant="open"
          label={`${openCount} ACTIVE`}
          className="shadow-none"
        />
        <PillBadge
          variant="stat"
          label={`${totalCount} OPENINGS`}
          className="shadow-none bg-paper"
        />
      </div>

      {/* Right: + POST OPPORTUNITY CTA */}
      <div className="flex items-center">
        <PrimaryButton
          onClick={onPostClick}
          aria-label="Post new research opportunity"
          className="whitespace-nowrap"
        >
          + POST OPPORTUNITY
        </PrimaryButton>
      </div>
    </header>
  );
}
