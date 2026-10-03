import { useState, useMemo } from 'react';
import { useOpportunities } from './hooks/useOpportunities';
import { useToast } from './hooks/useToast';
import {
  type Opportunity,
  type CreateOpportunityDTO,
  type UpdateOpportunityDTO,
} from './types/opportunity';
import { ApiError } from './api/opportunities';
import { Input } from './components/atoms/Input';
import { Sticker } from './components/atoms/Sticker';
import { FilterPills } from './components/molecules/FilterPills';
import {
  MarqueeBanner,
  NavBar,
  Hero,
  OpportunityGrid,
  LoadingSkeleton,
  EmptyState,
  ErrorState,
  ToastContainer,
} from './components/organisms';
import { OpportunityDetailModal } from './components/organisms/OpportunityDetailModal';
import { OpportunityFormModal } from './components/organisms/OpportunityFormModal';
import { DeleteConfirmModal } from './components/organisms/DeleteConfirmModal';

export default function App() {
  const {
    opportunities,
    status,
    error,
    counts,
    filter,
    setFilter,
    searchQuery,
    setSearchQuery,
    filteredOpportunities,
    fetchOpportunities,
    createItem,
    updateItem,
    removeItem,
    closeOpportunity,
  } = useOpportunities();

  const { toasts, showSuccess, showError, removeToast } = useToast();

  // Modal states
  const [selectedOppId, setSelectedOppId] = useState<number | null>(null);
  const [formModalState, setFormModalState] = useState<{
    isOpen: boolean;
    mode: 'create' | 'edit';
    initialData: Opportunity | null;
  }>({
    isOpen: false,
    mode: 'create',
    initialData: null,
  });
  const [deleteModalState, setDeleteModalState] = useState<{
    isOpen: boolean;
    opportunity: Opportunity | null;
  }>({
    isOpen: false,
    opportunity: null,
  });
  const [fieldErrors, setFieldErrors] = useState<Array<{ field?: string; message: string }>>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // Active opportunity for detail view
  const selectedOpportunity = useMemo(
    () => opportunities.find((opp) => opp.id === selectedOppId) ?? null,
    [opportunities, selectedOppId]
  );

  // Modal open handlers
  const handleOpenCreate = () => {
    setFieldErrors([]);
    setFormModalState({
      isOpen: true,
      mode: 'create',
      initialData: null,
    });
  };

  const handleViewDetails = (id: number) => {
    setSelectedOppId(id);
  };

  const handleOpenEdit = (opp: Opportunity) => {
    setFieldErrors([]);
    setFormModalState({
      isOpen: true,
      mode: 'edit',
      initialData: opp,
    });
  };

  const handleCloseOpportunity = async (id: number) => {
    try {
      await closeOpportunity(id);
      showSuccess('Opportunity closed successfully');
    } catch (err) {
      showError(err instanceof Error ? err.message : 'Failed to close opportunity');
    }
  };

  const handleOpenDelete = (opp: Opportunity) => {
    setDeleteModalState({
      isOpen: true,
      opportunity: opp,
    });
  };

  const handleConfirmDelete = async () => {
    if (!deleteModalState.opportunity) return;
    setIsDeleting(true);
    try {
      await removeItem(deleteModalState.opportunity.id);
      showSuccess('Opportunity deleted successfully');
      setDeleteModalState({ isOpen: false, opportunity: null });
      if (selectedOppId === deleteModalState.opportunity.id) {
        setSelectedOppId(null);
      }
    } catch (err) {
      showError(err instanceof Error ? err.message : 'Failed to delete opportunity');
    } finally {
      setIsDeleting(false);
    }
  };

  const handleFormSubmit = async (data: CreateOpportunityDTO | UpdateOpportunityDTO) => {
    setIsSubmitting(true);
    try {
      if (formModalState.mode === 'create') {
        await createItem(data as CreateOpportunityDTO);
        showSuccess('Opportunity posted successfully');
      } else if (formModalState.initialData) {
        await updateItem(formModalState.initialData.id, data as UpdateOpportunityDTO);
        showSuccess('Opportunity updated successfully');
      }
      setFormModalState({ isOpen: false, mode: 'create', initialData: null });
      setFieldErrors([]);
    } catch (err) {
      if (err instanceof ApiError && (err.statusCode === 400 || err.code === 'VALIDATION_ERROR' || err.details)) {
        setFieldErrors(err.details || [{ message: err.message }]);
      } else {
        showError(err instanceof Error ? err.message : 'An error occurred while saving the opportunity');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-dvh bg-paper text-carbon flex flex-col font-sans">
      <MarqueeBanner />
      <NavBar
        onPostClick={handleOpenCreate}
        totalCount={counts.all}
        openCount={counts.open}
      />
      <Hero />
      <main className="max-w-7xl mx-auto px-6 py-10 w-full flex-1">
        {/* Filter controls & search bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-8">
          <FilterPills
            filter={filter}
            onFilterChange={setFilter}
            counts={counts}
          />
          <div className="relative w-full sm:w-72">
            <label htmlFor="search-input" className="sr-only">
              Search opportunities
            </label>
            <Input
              id="search-input"
              type="search"
              placeholder="Search opportunities..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                aria-label="Clear search"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-carbon/60 hover:text-carbon cursor-pointer"
              >
                <Sticker name="close" size={14} aria-hidden />
              </button>
            )}
          </div>
        </div>

        {/* State views */}
        {status === 'loading' && <LoadingSkeleton />}
        {status === 'error' && (
          <ErrorState
            onRetry={fetchOpportunities}
            message={error?.message}
          />
        )}
        {status === 'ready' && opportunities.length === 0 && (
          <EmptyState onPostClick={handleOpenCreate} />
        )}
        {status === 'ready' && opportunities.length > 0 && filteredOpportunities.length === 0 && (
          <EmptyState
            isFiltered
            onPostClick={handleOpenCreate}
            onResetFilters={() => {
              setFilter('All');
              setSearchQuery('');
            }}
          />
        )}
        {status === 'ready' && filteredOpportunities.length > 0 && (
          <OpportunityGrid
            opportunities={filteredOpportunities}
            onView={handleViewDetails}
            onEdit={handleOpenEdit}
            onCloseListing={handleCloseOpportunity}
            onDelete={handleOpenDelete}
          />
        )}
      </main>

      <ToastContainer toasts={toasts} onDismiss={removeToast} />

      {/* Modals rendered when active */}
      {selectedOppId !== null && (
        <OpportunityDetailModal
          isOpen={true}
          onClose={() => setSelectedOppId(null)}
          opportunity={selectedOpportunity}
          onEdit={(opp) => {
            setSelectedOppId(null);
            handleOpenEdit(opp);
          }}
          onCloseListing={handleCloseOpportunity}
        />
      )}

      {formModalState.isOpen && (
        <OpportunityFormModal
          isOpen={true}
          onClose={() => {
            setFormModalState((prev) => ({ ...prev, isOpen: false }));
            setFieldErrors([]);
          }}
          initialData={formModalState.initialData}
          onSubmit={handleFormSubmit}
          fieldErrors={fieldErrors}
          isSubmitting={isSubmitting}
        />
      )}

      {deleteModalState.isOpen && (
        <DeleteConfirmModal
          isOpen={true}
          onClose={() => setDeleteModalState({ isOpen: false, opportunity: null })}
          opportunity={deleteModalState.opportunity}
          onConfirm={handleConfirmDelete}
          isDeleting={isDeleting}
        />
      )}
    </div>
  );
}
