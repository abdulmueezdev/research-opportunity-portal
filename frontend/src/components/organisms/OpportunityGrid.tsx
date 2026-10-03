import { type Opportunity } from '../../types/opportunity';
import { OpportunityCard } from './OpportunityCard';
import { cn } from '../../lib/utils';

export interface OpportunityGridProps {
  opportunities: Opportunity[];
  onView: (id: number) => void;
  onEdit: (opp: Opportunity) => void;
  onCloseListing?: (id: number) => void;
  onCloseOpportunity?: (id: number) => void;
  onDelete: (opp: Opportunity) => void;
  className?: string;
}

export function OpportunityGrid({
  opportunities,
  onView,
  onEdit,
  onCloseListing,
  onCloseOpportunity,
  onDelete,
  className,
}: OpportunityGridProps) {
  const handleClose = onCloseListing ?? onCloseOpportunity;

  if (opportunities.length === 0) {
    return (
      <div
        className={cn(
          'text-center py-12 text-carbon/70 font-medium select-none',
          className
        )}
      >
        No opportunities found.
      </div>
    );
  }

  return (
    <div
      className={cn(
        'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6',
        className
      )}
    >
      {opportunities.map((opp) => (
        <OpportunityCard
          key={opp.id}
          opportunity={opp}
          onView={onView}
          onEdit={onEdit}
          onCloseListing={handleClose}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
