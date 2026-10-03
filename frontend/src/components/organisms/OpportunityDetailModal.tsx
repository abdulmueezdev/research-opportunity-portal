import { useEffect, useRef, type MouseEvent, type SyntheticEvent } from 'react';
import { type Opportunity } from '../../types/opportunity';
import { StatusBadge } from '../atoms/StatusBadge';
import { SkillChip } from '../atoms/SkillChip';
import { OutlinedButton } from '../atoms/OutlinedButton';
import { Sticker } from '../atoms/Sticker';
import { cn } from '../../lib/utils';

export interface OpportunityDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  opportunity: Opportunity | null;
  onEdit?: (opp: Opportunity) => void;
  onCloseListing?: (id: number) => void;
  onCloseOpportunity?: (id: number) => void;
}

/**
 * Formats ISO calendar date (YYYY-MM-DD) into uppercase readable format (e.g. 30 NOV 2026).
 */
function formatDeadline(dateString: string): string {
  if (!dateString) return '';
  try {
    const parts = dateString.split('-');
    if (parts.length === 3) {
      const year = parseInt(parts[0], 10);
      const month = parseInt(parts[1], 10) - 1;
      const day = parseInt(parts[2], 10);
      const date = new Date(year, month, day);
      if (!isNaN(date.getTime())) {
        return date
          .toLocaleDateString('en-US', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
          })
          .toUpperCase();
      }
    }
    const d = new Date(dateString);
    if (!isNaN(d.getTime())) {
      return d
        .toLocaleDateString('en-US', {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
        })
        .toUpperCase();
    }
  } catch {
    // Fallback to raw string
  }
  return dateString;
}

/**
 * OpportunityDetailModal - Native HTML dialog displaying full opportunity record.
 * Conforms strictly to Stitch S5 and Slush Design System specifications.
 */
export function OpportunityDetailModal({
  isOpen,
  onClose,
  opportunity,
  onEdit,
  onCloseListing,
  onCloseOpportunity,
}: OpportunityDetailModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  // Synchronize native dialog state with React isOpen prop
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen && opportunity) {
      if (!dialog.open) {
        dialog.showModal();
      }
    } else {
      if (dialog.open) {
        dialog.close();
      }
    }
  }, [isOpen, opportunity]);

  // Cleanup on unmount
  useEffect(() => {
    const dialog = dialogRef.current;
    return () => {
      if (dialog?.open) {
        dialog.close();
      }
    };
  }, []);

  // Handle native escape key cancel
  const handleCancel = (e: SyntheticEvent<HTMLDialogElement, Event>) => {
    e.preventDefault();
    onClose();
  };

  // Handle backdrop clicks outside modal bounding box
  const handleBackdropClick = (e: MouseEvent<HTMLDialogElement>) => {
    const dialog = dialogRef.current;
    if (!dialog || e.target !== dialog) return;

    const rect = dialog.getBoundingClientRect();
    const isOutside =
      e.clientX < rect.left ||
      e.clientX > rect.right ||
      e.clientY < rect.top ||
      e.clientY > rect.bottom;

    if (isOutside) {
      onClose();
    }
  };

  const handleCloseAction = onCloseListing ?? onCloseOpportunity;

  const skills = opportunity?.required_skills
    ? opportunity.required_skills
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean)
    : [];

  return (
    <dialog
      ref={dialogRef}
      onCancel={handleCancel}
      onClick={handleBackdropClick}
      aria-labelledby="opportunity-detail-title"
      aria-modal="true"
      className={cn(
        'fixed inset-0 m-auto w-[calc(100%-2rem)] max-w-2xl max-h-[90vh] rounded-[32px] border border-carbon bg-paper p-0 text-carbon',
        'backdrop:bg-black/50 backdrop:backdrop-blur-none',
        'flex flex-col overflow-hidden focus:outline-none shadow-none z-50'
      )}
    >
      {opportunity ? (
        <>
          {/* Header: Lavender strip with title and outlined Close pill button */}
          <header className="bg-lavender border-b border-carbon px-6 py-5 sm:px-8 sm:py-6 flex items-start justify-between gap-4 shrink-0">
            <div className="space-y-1 pr-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-carbon/70">
                RESEARCH OPPORTUNITY
              </span>
              <h2
                id="opportunity-detail-title"
                className="text-xl sm:text-2xl font-bold tracking-tight text-carbon leading-snug break-words"
              >
                {opportunity.title}
              </h2>
            </div>
            <OutlinedButton
              onClick={onClose}
              aria-label="Close modal"
              className="shrink-0 text-xs px-4 py-1.5 min-h-9"
              leftIcon={<Sticker name="close" size={14} aria-hidden />}
            >
              CLOSE
            </OutlinedButton>
          </header>

          {/* Body: Status, Research Area, Meta Info, Description, Required Skills */}
          <div className="p-6 sm:p-8 space-y-6 overflow-y-auto max-h-[calc(90vh-180px)] flex-1">
            {/* Status & Area Row */}
            <div className="flex flex-wrap items-center justify-between gap-3">
              <StatusBadge status={opportunity.status} />
              <span className="inline-flex items-center rounded-full border border-carbon bg-paper px-3 py-1 text-xs font-bold uppercase tracking-wider text-carbon">
                {opportunity.area}
              </span>
            </div>

            {/* Metadata Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              <div className="rounded-2xl border border-carbon p-3.5 bg-paper flex flex-col justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider text-carbon/70 flex items-center gap-1.5">
                  <Sticker name="grad-cap" size={14} aria-hidden /> Faculty PI
                </span>
                <span className="text-sm font-bold text-carbon mt-1 break-words">
                  {opportunity.faculty_name}
                </span>
              </div>

              <div className="rounded-2xl border border-carbon p-3.5 bg-paper flex flex-col justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider text-carbon/70 flex items-center gap-1.5">
                  <Sticker name="atom" size={14} aria-hidden /> Department
                </span>
                <span className="text-sm font-bold text-carbon mt-1 break-words">
                  {opportunity.department}
                </span>
              </div>

              <div className="rounded-2xl border border-carbon p-3.5 bg-paper flex flex-col justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider text-carbon/70 flex items-center gap-1.5">
                  <Sticker name="users" size={14} aria-hidden /> Positions
                </span>
                <span className="text-sm font-bold text-carbon mt-1">
                  {opportunity.available_positions}{' '}
                  {opportunity.available_positions === 1 ? 'POSITION' : 'POSITIONS'}
                </span>
              </div>

              <div className="rounded-2xl border border-carbon p-3.5 bg-paper flex flex-col justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider text-carbon/70 flex items-center gap-1.5">
                  <Sticker name="calendar" size={14} aria-hidden /> Deadline
                </span>
                <span className="text-sm font-bold text-carbon mt-1">
                  {formatDeadline(opportunity.deadline)}
                </span>
              </div>
            </div>

            {/* Description Section */}
            <div className="space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-carbon/70">
                Description
              </h3>
              <div className="rounded-2xl border border-carbon p-4 sm:p-5 text-sm sm:text-base leading-relaxed text-carbon whitespace-pre-wrap bg-paper">
                {opportunity.description}
              </div>
            </div>

            {/* Required Skills Section */}
            <div className="space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-carbon/70">
                Required Skills
              </h3>
              {skills.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill, index) => (
                    <SkillChip key={`${skill}-${index}`} skill={skill} />
                  ))}
                </div>
              ) : (
                <p className="text-sm text-concrete italic">No specific skills listed</p>
              )}
            </div>
          </div>

          {/* Footer: Outlined Cancel/Close, Edit, and Close Opportunity buttons */}
          <footer className="border-t border-carbon bg-paper px-6 py-4 sm:px-8 flex flex-wrap items-center justify-between gap-3 shrink-0">
            <OutlinedButton onClick={onClose} aria-label="Close opportunity details modal">
              CLOSE
            </OutlinedButton>

            <div className="flex flex-wrap items-center gap-2">
              {opportunity.status === 'Open' && handleCloseAction && (
                <OutlinedButton
                  onClick={() => {
                    handleCloseAction(opportunity.id);
                  }}
                  aria-label={`Close listing for ${opportunity.title}`}
                  leftIcon={<Sticker name="lock" size={14} aria-hidden />}
                >
                  CLOSE OPPORTUNITY
                </OutlinedButton>
              )}

              {onEdit && (
                <OutlinedButton
                  onClick={() => {
                    onEdit(opportunity);
                  }}
                  aria-label={`Edit opportunity: ${opportunity.title}`}
                >
                  EDIT
                </OutlinedButton>
              )}
            </div>
          </footer>
        </>
      ) : null}
    </dialog>
  );
}
