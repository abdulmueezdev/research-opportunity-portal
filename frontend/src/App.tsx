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
                className="absolute right-3 top-1/2 -translate-y-1/2 text-carbon/60 hover:text-carbon cursor-pointer focus-visible:outline-2 focus-visible:outline-voltage-violet rounded-full p-0.5"
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

      {/* Full-bleed Footer */}
      <footer className="w-full bg-concrete border-t border-carbon py-6 px-6 mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-sans font-medium text-sm text-carbon m-0">
            Built for CN Assignment #1 · Fall 2026
          </p>
          <a
            href="#"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-carbon bg-paper text-carbon text-sm font-medium hover:bg-soft-mist transition-colors focus-visible:outline-2 focus-visible:outline-voltage-violet no-underline"
          >
            <svg
              className="size-4 shrink-0"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
            </svg>
            <span>GitHub Repository</span>
          </a>
        </div>
      </footer>

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
