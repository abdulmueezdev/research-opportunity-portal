import { cn } from '../../lib/utils';

export interface SkillChipProps {
  skill: string;
  selected?: boolean;
  onClick?: (skill: string) => void;
  className?: string;
}

export function SkillChip({ skill, selected = false, onClick, className }: SkillChipProps) {
  const baseClasses = cn(
    'inline-flex items-center rounded-full border border-carbon px-3 py-1 text-xs font-bold transition-colors select-none',
    selected
      ? 'bg-voltage-violet text-paper border-carbon'
      : 'bg-paper text-carbon border-carbon',
    onClick && (selected ? 'cursor-pointer hover:opacity-90' : 'cursor-pointer hover:bg-soft-mist'),
    onClick && 'focus-visible:outline-2 focus-visible:outline-voltage-violet focus-visible:outline-offset-2 active:translate-y-px',
    className
  );

  if (onClick) {
    return (
      <button
        type="button"
        onClick={() => onClick(skill)}
        className={baseClasses}
      >
        {skill}
      </button>
    );
  }

  return (
    <span className={baseClasses}>
      {skill}
    </span>
  );
}
