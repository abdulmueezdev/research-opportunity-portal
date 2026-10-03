import { useEffect, useRef, type MouseEvent, type SyntheticEvent } from 'react';
import { type Opportunity } from '../../types/opportunity';
import { PrimaryButton } from '../atoms/PrimaryButton';
import { OutlinedButton } from '../atoms/OutlinedButton';
import { Sticker } from '../atoms/Sticker';
import { cn } from '../../lib/utils';

export interface DeleteConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  opportunity: Opportunity | null;
  onConfirm: () => Promise<void>;
  isDeleting?: boolean;
  onCancel?: () => void;
}

/**
 * DeleteConfirmModal - Native HTML dialog confirming destructive deletion
 * of a research opportunity matching Stitch S8 and Slush Design System.
 */
export function DeleteConfirmModal({
  isOpen,
  onClose,
  opportunity,
  onConfirm,
  isDeleting = false,
  onCancel,
}: DeleteConfirmModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const handleClose = onCancel ?? onClose;

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
  const handleDialogCancel = (e: SyntheticEvent<HTMLDialogElement, Event>) => {
    e.preventDefault();
    if (isDeleting) return;
    handleClose();
  };

  // Handle backdrop clicks outside modal bounding box
  const handleBackdropClick = (e: MouseEvent<HTMLDialogElement>) => {
    if (isDeleting) return;
    const dialog = dialogRef.current;
    if (!dialog || e.target !== dialog) return;

    const rect = dialog.getBoundingClientRect();
    const isOutside =
      e.clientX < rect.left ||
      e.clientX > rect.right ||
      e.clientY < rect.top ||
      e.clientY > rect.bottom;

    if (isOutside) {
      handleClose();
    }
  };

  const handleConfirm = async () => {
    if (isDeleting) return;
    await onConfirm();
  };

  return (
    <dialog
      ref={dialogRef}
      onCancel={handleDialogCancel}
      onClick={handleBackdropClick}
      aria-labelledby="delete-confirm-title"
      aria-describedby="delete-confirm-description"
      aria-modal="true"
      className={cn(
        'fixed inset-0 m-auto w-[calc(100%-2rem)] max-w-md max-h-[90vh] rounded-[32px] border border-carbon bg-paper p-6 sm:p-8 text-carbon',
        'backdrop:bg-black/50 backdrop:backdrop-blur-none',
        'flex flex-col items-center text-center overflow-hidden focus:outline-none shadow-none z-50'
      )}
    >
      {/* Circular Ember sticker badge */}
      <div className="flex justify-center mb-4">
        <Sticker name="exclamation" size={28} badge="ember" aria-hidden />
      </div>

      {/* Heading */}
      <h2
        id="delete-confirm-title"
        className="text-xl sm:text-2xl font-bold tracking-tight text-carbon"
      >
        Delete this opportunity?
      </h2>

      {/* Opportunity Title in Bold */}
      {opportunity?.title && (
        <p className="font-bold text-carbon text-base mt-2 px-2 break-words">
          &ldquo;{opportunity.title}&rdquo;
        </p>
      )}

      {/* Warning Copy */}
      <p
        id="delete-confirm-description"
        className="text-sm text-carbon/80 mt-3 leading-relaxed"
      >
        This action cannot be undone and will permanently remove the listing from the portal.
      </p>

      {/* Action Footer: Outlined Cancel (default focus) and black-filled Delete Opportunity */}
      <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 w-full">
        <OutlinedButton
          autoFocus
          onClick={handleClose}
          disabled={isDeleting}
          aria-label="Cancel deletion"
          className="w-full sm:w-auto min-w-[120px]"
        >
          CANCEL
        </OutlinedButton>
        <PrimaryButton
          onClick={handleConfirm}
          disabled={isDeleting}
          isLoading={isDeleting}
          loadingText="DELETING..."
          aria-label="Confirm permanent deletion of opportunity"
          className="w-full sm:w-auto min-w-[160px]"
        >
          DELETE OPPORTUNITY
        </PrimaryButton>
      </div>
    </dialog>
  );
}
