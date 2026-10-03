import { cn } from '../../lib/utils';

export interface MarqueeBannerProps {
  /** Optional custom announcements list or ticker segments */
  items?: string[];
  /** Optional container class name */
  className?: string;
  /** Optional animation duration in seconds (default: 32s) */
  speedSeconds?: number;
}

const DEFAULT_ANNOUNCEMENT =
  'CAMPUS RESEARCH OPPORTUNITIES · FACULTY SPONSORED PROJECTS · SPRING & SUMMER 2026 COHORTS · UNDERGRADUATE & GRADUATE OPENINGS · APPLY DIRECTLY';

export function MarqueeBanner({
  items,
  className,
  speedSeconds = 32,
}: MarqueeBannerProps) {
  const content = items && items.length > 0 ? items.join(' · ') : DEFAULT_ANNOUNCEMENT;

  return (
    <aside
      aria-label="Campus announcements"
      aria-hidden="true"
      className={cn(
        'group marquee-container relative w-full overflow-hidden border-b border-carbon bg-carbon text-paper py-2 select-none',
        'font-bold text-[12px] leading-tight tracking-[0.032em] uppercase',
        className
      )}
    >
      <style>{`
        @keyframes marquee-scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .marquee-track {
          display: flex;
          width: max-content;
          will-change: transform;
          animation: marquee-scroll ${speedSeconds}s linear infinite;
        }
        .marquee-container:hover .marquee-track,
        .marquee-container:focus-within .marquee-track {
          animation-play-state: paused;
        }
        @media (prefers-reduced-motion: reduce) {
          .marquee-track {
            animation: none !important;
            transform: none !important;
          }
        }
      `}</style>

      <div className="marquee-track">
        {/* First segment */}
        <div className="flex shrink-0 items-center whitespace-nowrap pr-8">
          <span>{content}</span>
          <span className="mx-4 text-paper/70">·</span>
        </div>

        {/* Cloned segment for seamless loop */}
        <div className="flex shrink-0 items-center whitespace-nowrap pr-8" aria-hidden="true">
          <span>{content}</span>
          <span className="mx-4 text-paper/70">·</span>
        </div>

        {/* Third duplicate to ensure wide displays never show blank space */}
        <div className="flex shrink-0 items-center whitespace-nowrap pr-8" aria-hidden="true">
          <span>{content}</span>
          <span className="mx-4 text-paper/70">·</span>
        </div>
      </div>
    </aside>
  );
}
