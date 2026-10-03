import { Sticker } from '../atoms/Sticker';
import { cn } from '../../lib/utils';

export interface HeroProps {
  /** Optional supportive subtitle */
  subtitle?: string;
  /** Optional custom CSS classes */
  className?: string;
}

const DEFAULT_SUBTITLE =
  'Explore undergraduate and graduate faculty-mentored research positions across all departments.';

export function Hero({
  subtitle = DEFAULT_SUBTITLE,
  className,
}: HeroProps) {
  return (
    <section
      aria-labelledby="hero-heading"
      className={cn(
        'bg-sky-wash border-b border-carbon py-10 sm:py-12 md:py-16 px-4 sm:px-6 relative overflow-hidden',
        className
      )}
    >
      <div className="max-w-7xl mx-auto flex flex-col items-start">
        {/* Tilted Sticker Cluster */}
        <div
          className="flex flex-wrap items-center gap-2.5 sm:gap-3.5 mb-4 sm:mb-6 select-none"
          aria-hidden="true"
        >
          <Sticker
            name="atom"
            size={24}
            badge="lavender"
            rotation={-6}
            aria-hidden={true}
          />
          <Sticker
            name="flask"
            size={24}
            badge="mint"
            rotation={8}
            aria-hidden={true}
          />
          <Sticker
            name="lightbulb"
            size={24}
            badge="sunburst"
            rotation={-12}
            aria-hidden={true}
          />
          <Sticker
            name="magnifier"
            size={24}
            badge="sky-wash"
            rotation={10}
            aria-hidden={true}
          />
          <Sticker
            name="grad-cap"
            size={24}
            badge="soft-mist"
            rotation={-5}
            aria-hidden={true}
          />
        </div>

        {/* Monumental Display Title */}
        <h1
          id="hero-heading"
          className="font-display leading-[0.8] text-6xl sm:text-8xl md:text-[140px] text-carbon tracking-tight uppercase select-none"
        >
          RESEARCH
          <span className="sr-only">: University Research Opportunities Board</span>
        </h1>

        {/* Supportive Subtitle */}
        <p className="text-carbon/90 text-base sm:text-lg md:text-xl font-medium max-w-2xl mt-4 sm:mt-6 leading-relaxed">
          {subtitle}
        </p>
      </div>
    </section>
  );
}
