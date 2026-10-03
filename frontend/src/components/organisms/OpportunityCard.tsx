import { type Opportunity } from '../../types/opportunity';
import { StatusBadge } from '../atoms/StatusBadge';
import { SkillChip } from '../atoms/SkillChip';
import { Sticker } from '../atoms/Sticker';
import { cn } from '../../lib/utils';

export interface OpportunityCardProps {
  opportunity: Opportunity;
  onView: (id: number) => void;
  onEdit: (opp: Opportunity) => void;
  onCloseListing?: (id: number) => void;
  onCloseOpportunity?: (id: number) => void;
  onDelete: (opp: Opportunity) => void;
  className?: string;
}

function getHeaderWashClass(id: number, status: string): string {
  if (status.toLowerCase() === 'closed') {
    return 'bg-soft-mist';
  }
  const washIndex = Math.abs(id) % 3;
  if (washIndex === 0) return 'bg-lavender';
  if (washIndex === 1) return 'bg-mint';
  return 'bg-sky-wash';
}

function formatDeadline(deadline: string): string {
  if (!deadline) return 'N/A';
  try {
    const parts = deadline.split('-');
    if (parts.length === 3) {
      const year = parseInt(parts[0], 10);
      const month = parseInt(parts[1], 10) - 1;
      const day = parseInt(parts[2], 10);
      const date = new Date(year, month, day);
      if (!isNaN(date.getTime())) {
        return date
          .toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
          })
          .toUpperCase();
      }
    }
    const d = new Date(deadline);
    return isNaN(d.getTime())
      ? deadline
      : d
          .toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
          })
          .toUpperCase();
  } catch {
    return deadline;
  }
}

export function OpportunityCard({
  opportunity,
  onView,
  onEdit,
  onCloseListing,
  onCloseOpportunity,
  onDelete,
  className,
}: OpportunityCardProps) {
  const handleClose = onCloseListing ?? onCloseOpportunity;
  const headerWash = getHeaderWashClass(opportunity.id, opportunity.status);

  const skills = opportunity.required_skills
    ? opportunity.required_skills
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean)
    : [];

  return (
    <article
      id={`opp-card-${opportunity.id}`}
      aria-labelledby={`opp-title-${opportunity.id}`}
      className={cn(
        'flex flex-col justify-between rounded-[20px] border border-carbon bg-paper overflow-hidden',
        'hover:-translate-y-0.5 transition-transform',
        className
      )}
    >
      {/* Pastel Wash Header Strip */}
      <div
        className={cn(
          'flex items-center justify-between border-b border-carbon px-5 py-3.5 min-h-[56px] gap-2 select-none',
          headerWash
        )}
      >
        <span className="inline-flex items-center rounded-full border border-carbon bg-paper px-3 py-1 text-xs font-bold uppercase tracking-wider text-carbon truncate max-w-[60%]">
          {opportunity.area}
        </span>
        <StatusBadge status={opportunity.status} />
      </div>

      {/* Card Body */}
      <div className="flex flex-col gap-3 p-5 flex-1">
        <h3
          id={`opp-title-${opportunity.id}`}
          className="text-xl font-bold text-carbon line-clamp-2 leading-snug tracking-tight"
        >
          {opportunity.title}
        </h3>

        {/* Department & Faculty PI */}
        <div className="flex flex-wrap items-center gap-1.5 text-sm font-medium text-carbon">
          <Sticker name="users" size={14} className="shrink-0" aria-hidden={true} />
          <span className="font-bold">{opportunity.faculty_name}</span>
          <span className="text-carbon/40" aria-hidden="true">
            •
          </span>
          <span className="text-carbon/80">{opportunity.department}</span>
        </div>

        {/* Description snippet */}
        {opportunity.description && (
          <p className="text-sm text-carbon/80 line-clamp-3 leading-relaxed">
            {opportunity.description}
          </p>
        )}

        {/* Positions & Deadline */}
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-bold uppercase tracking-wider text-carbon pt-1">
          <span className="inline-flex items-center gap-1.5">
            <Sticker name="calendar" size={14} className="shrink-0" aria-hidden={true} />
            <span>DEADLINE: {formatDeadline(opportunity.deadline)}</span>
          </span>
          <span className="text-carbon/40" aria-hidden="true">
            •
          </span>
          <span>
            {opportunity.available_positions}{' '}
            {opportunity.available_positions === 1 ? 'POSITION' : 'POSITIONS'}
          </span>
        </div>

        {/* Required Skills */}
        {skills.length > 0 && (
          <div
            className="flex flex-wrap gap-1.5 pt-2"
            aria-label={`Required skills for ${opportunity.title}`}
          >
            {skills.map((skill, index) => (
              <SkillChip key={`${skill}-${index}`} skill={skill} />
            ))}
          </div>
        )}
      </div>

      {/* Card Footer: Outlined Action Buttons */}
      <footer className="flex flex-wrap items-center gap-2 border-t border-carbon px-5 py-3 mt-auto bg-paper">
        <button
          type="button"
          onClick={() => onView(opportunity.id)}
          aria-label={`View Details for ${opportunity.title}`}
          className={cn(
            'inline-flex items-center justify-center rounded-full border border-carbon bg-paper px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-carbon',
            'hover:bg-soft-mist active:translate-y-px transition-colors cursor-pointer',
            'focus-visible:outline-2 focus-visible:outline-voltage-violet focus-visible:outline-offset-2'
          )}
        >
          View Details
        </button>

        <button
          type="button"
          onClick={() => onEdit(opportunity)}
          aria-label={`Edit ${opportunity.title}`}
          className={cn(
            'inline-flex items-center justify-center rounded-full border border-carbon bg-paper px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-carbon',
            'hover:bg-soft-mist active:translate-y-px transition-colors cursor-pointer',
            'focus-visible:outline-2 focus-visible:outline-voltage-violet focus-visible:outline-offset-2'
          )}
        >
          Edit
        </button>

        {opportunity.status === 'Open' && handleClose && (
          <button
            type="button"
            onClick={() => handleClose(opportunity.id)}
            aria-label={`Close listing for ${opportunity.title}`}
            className={cn(
              'inline-flex items-center justify-center rounded-full border border-carbon bg-paper px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-carbon',
              'hover:bg-soft-mist active:translate-y-px transition-colors cursor-pointer',
              'focus-visible:outline-2 focus-visible:outline-voltage-violet focus-visible:outline-offset-2'
            )}
          >
            Close
          </button>
        )}

        <button
          type="button"
          onClick={() => onDelete(opportunity)}
          aria-label={`Delete ${opportunity.title}`}
          className={cn(
            'inline-flex items-center justify-center gap-1 rounded-full border border-carbon bg-paper px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-carbon',
            'hover:bg-soft-mist hover:border-ember hover:text-ember active:translate-y-px transition-colors cursor-pointer ml-auto',
            'focus-visible:outline-2 focus-visible:outline-voltage-violet focus-visible:outline-offset-2'
          )}
        >
          <Sticker name="trash" size={13} className="text-ember shrink-0" aria-hidden={true} />
          <span>Delete</span>
        </button>
      </footer>
    </article>
  );
}
