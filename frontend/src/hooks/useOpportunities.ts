import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import {
  type Opportunity,
  type CreateOpportunityDTO,
  type UpdateOpportunityDTO,
  type OpportunityFilter,
} from '../types/opportunity';
import {
  ApiError,
  getOpportunities,
  createOpportunity,
  updateOpportunity,
  deleteOpportunity,
} from '../api/opportunities';

export interface OpportunityCounts {
  all: number;
  open: number;
  closed: number;
}

export interface UseOpportunitiesReturn {
  // Primary state & counts
  opportunities: Opportunity[];
  status: 'loading' | 'ready' | 'error';
  error: ApiError | null;
  counts: OpportunityCounts;

  // Filters & search
  filter: OpportunityFilter;
  setFilter: (f: OpportunityFilter) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  filteredOpportunities: Opportunity[];

  // Data fetching & mutations
  fetchOpportunities: () => Promise<void>;
  createItem: (data: CreateOpportunityDTO) => Promise<Opportunity>;
  updateItem: (id: number, data: UpdateOpportunityDTO) => Promise<Opportunity>;
  removeItem: (id: number) => Promise<void>;

  // Convenience aliases for atomic component consumption
  isLoading: boolean;
  refetch: () => Promise<void>;
  createOpportunity: (data: CreateOpportunityDTO) => Promise<Opportunity>;
  updateOpportunity: (id: number, data: UpdateOpportunityDTO) => Promise<Opportunity>;
  closeOpportunity: (id: number) => Promise<Opportunity>;
  deleteOpportunity: (id: number) => Promise<void>;
}

/**
 * React hook managing research opportunities state, filtering, search, and CRUD operations.
 */
export function useOpportunities(initialFilter: OpportunityFilter = 'All'): UseOpportunitiesReturn {
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading');
  const [error, setError] = useState<ApiError | null>(null);
  const [filter, setFilter] = useState<OpportunityFilter>(initialFilter);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const isMountedRef = useRef(true);

  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  const fetchOpportunities = useCallback(async (): Promise<void> => {
    setStatus('loading');
    setError(null);
    try {
      const data = await getOpportunities();
      if (isMountedRef.current) {
        setOpportunities(data);
        setStatus('ready');
      }
    } catch (err) {
      if (isMountedRef.current) {
        const apiError =
          err instanceof ApiError
            ? err
            : new ApiError(err instanceof Error ? err.message : 'Failed to fetch opportunities');
        setError(apiError);
        setStatus('error');
      }
    }
  }, []);

  // Fetch opportunities on initial mount
  useEffect(() => {
    void fetchOpportunities();
  }, [fetchOpportunities]);

  // Aggregate counts for All, Open, and Closed statuses
  const counts = useMemo<OpportunityCounts>(() => {
    let open = 0;
    let closed = 0;
    for (const item of opportunities) {
      if (item.status === 'Open') {
        open++;
      } else if (item.status === 'Closed') {
        closed++;
      }
    }
    return {
      all: opportunities.length,
      open,
      closed,
    };
  }, [opportunities]);

  // Filtered and searched opportunities memo
  const filteredOpportunities = useMemo<Opportunity[]>(() => {
    const query = searchQuery.trim().toLowerCase();

    return opportunities.filter((item) => {
      // Status filtering
      if (filter !== 'All' && item.status !== filter) {
        return false;
      }

      // Search query filtering across relevant text fields (using `area`, not `research_area`)
      if (query) {
        const matches =
          item.title.toLowerCase().includes(query) ||
          item.description.toLowerCase().includes(query) ||
          item.area.toLowerCase().includes(query) ||
          item.faculty_name.toLowerCase().includes(query) ||
          item.department.toLowerCase().includes(query) ||
          item.required_skills.toLowerCase().includes(query);

        if (!matches) {
          return false;
        }
      }

      return true;
    });
  }, [opportunities, filter, searchQuery]);

  const createItem = useCallback(
    async (data: CreateOpportunityDTO): Promise<Opportunity> => {
      const created = await createOpportunity(data);
      if (isMountedRef.current) {
        setOpportunities((prev) => [created, ...prev]);
      }
      return created;
    },
    []
  );

  const updateItem = useCallback(
    async (id: number, data: UpdateOpportunityDTO): Promise<Opportunity> => {
      const updated = await updateOpportunity(id, data);
      if (isMountedRef.current) {
        setOpportunities((prev) => prev.map((item) => (item.id === id ? updated : item)));
      }
      return updated;
    },
    []
  );

  const removeItem = useCallback(async (id: number): Promise<void> => {
    await deleteOpportunity(id);
    if (isMountedRef.current) {
      setOpportunities((prev) => prev.filter((item) => item.id !== id));
    }
  }, []);

  const closeOpportunityAction = useCallback(
    async (id: number): Promise<Opportunity> => {
      return updateItem(id, { status: 'Closed' });
    },
    [updateItem]
  );

  return {
    // Primary properties
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

    // Convenience aliases
    isLoading: status === 'loading',
    refetch: fetchOpportunities,
    createOpportunity: createItem,
    updateOpportunity: updateItem,
    closeOpportunity: closeOpportunityAction,
    deleteOpportunity: removeItem,
  };
}
