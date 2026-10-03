import { OutlinedButton } from '../atoms/OutlinedButton';
import { Sticker } from '../atoms/Sticker';
import { cn } from '../../lib/utils';

export interface ErrorStateProps {
  /** Optional custom error message string */
  message?: string;
  /** Callback invoked when the user clicks the RETRY action button */
  onRetry: () => void;
  /** Optional custom CSS classes */
  className?: string;
}

const DEFAULT_ERROR_MESSAGE =
  'Check that the backend is running on port 4000.';

export function ErrorState({
  message,
  onRetry,
  className,
}: ErrorStateProps) {
  return (
    <div
      role="alert"
      aria-live="assertive"
      className={cn(
        'bg-paper border border-carbon rounded-[20px] p-8 sm:p-12 text-center max-w-lg mx-auto flex flex-col items-center justify-center my-6 sm:my-10 select-none',
        className
      )}
    >
      {/* Circular Ember #fb4903 Sticker Badge with "!" Icon */}
      <div className="mb-4">
        <Sticker
          name="exclamation"
          size={32}
          badge="ember"
          aria-hidden={true}
        />
      </div>

      {/* Heading */}
      <h2 className="text-2xl sm:text-3xl font-bold uppercase tracking-tight text-carbon mb-2">
        Couldn't reach the server
      </h2>

      {/* Body Copy */}
      <p className="text-carbon/80 text-sm sm:text-base leading-relaxed max-w-sm mb-6">
        {message || DEFAULT_ERROR_MESSAGE}
      </p>

      {/* Outlined RETRY Button */}
      <OutlinedButton
        onClick={onRetry}
        aria-label="Retry loading opportunities"
      >
        RETRY
      </OutlinedButton>
    </div>
  );
}
