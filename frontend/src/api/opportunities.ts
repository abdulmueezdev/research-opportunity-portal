import {
  isApiErrorEnvelope,
  type Opportunity,
  type CreateOpportunityDTO,
  type UpdateOpportunityDTO,
  type OpportunityFilter,
  type ApiEnvelope,
} from '../types/opportunity';

/**
 * Custom API Error representing validation, business logic, or network failures.
 */
export class ApiError extends Error {
  code: string;
  statusCode: number;
  details?: Array<{ field?: string; message: string }>;

  constructor(
    message: string,
    code = 'API_ERROR',
    statusCode = 500,
    details?: Array<{ field?: string; message: string }>
  ) {
    super(message);
    this.name = 'ApiError';
    this.code = code;
    this.statusCode = statusCode;
    this.details = details;
  }
}

export const BASE_URL = (import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000').replace(/\/+$/, '') + '/api/opportunities';

/**
 * Helper to execute fetch requests with JSON parsing and standardized ApiError handling.
 */
async function request<T>(endpoint: string, options?: RequestInit): Promise<T> {
  let response: Response;
  try {
    response = await fetch(endpoint, options);
  } catch (err) {
    if (err instanceof ApiError) {
      throw err;
    }
    const message = err instanceof Error ? err.message : 'Network request failed';
    throw new ApiError(message, 'NETWORK_ERROR', 0);
  }

  let json: unknown;
  try {
    json = await response.json();
  } catch {
    if (!response.ok) {
      throw new ApiError(
        response.statusText || 'Request failed',
        'HTTP_ERROR',
        response.status
      );
    }
    throw new ApiError('Invalid JSON response from server', 'INVALID_JSON', response.status);
  }

  // Handle error responses either by HTTP status or API envelope success flag
  const isSuccessFalse =
    typeof json === 'object' &&
    json !== null &&
    'success' in json &&
    (json as { success: unknown }).success === false;

  if (!response.ok || isSuccessFalse) {
    if (isApiErrorEnvelope(json)) {
      throw new ApiError(
        json.error.message,
        json.error.code,
        response.status,
        json.error.details
      );
    }

    const errObj =
      typeof json === 'object' && json !== null && 'error' in json
        ? (json as Record<string, unknown>).error
        : null;

    const code =
      typeof errObj === 'object' && errObj !== null && 'code' in errObj && typeof errObj.code === 'string'
        ? errObj.code
        : 'API_ERROR';

    const message =
      typeof errObj === 'object' && errObj !== null && 'message' in errObj && typeof errObj.message === 'string'
        ? errObj.message
        : typeof json === 'object' && json !== null && 'message' in json && typeof (json as Record<string, unknown>).message === 'string'
          ? (json as { message: string }).message
          : response.statusText || 'An unexpected error occurred';

    throw new ApiError(message, code, response.status);
  }

  const envelope = json as ApiEnvelope<T>;
  return envelope.data;
}

/**
 * Retrieves opportunities from the backend, optionally filtered by status.
 */
export async function getOpportunities(statusFilter?: OpportunityFilter): Promise<Opportunity[]> {
  const url =
    statusFilter && statusFilter !== 'All'
      ? `${BASE_URL}?status=${encodeURIComponent(statusFilter)}`
      : BASE_URL;

  const data = await request<Opportunity[]>(url, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
    },
  });

  const list = Array.isArray(data) ? data : [];

  if (statusFilter && statusFilter !== 'All') {
    return list.filter((item) => item.status === statusFilter);
  }

  return list;
}

/**
 * Retrieves a single opportunity by ID.
 */
export async function getOpportunityById(id: number): Promise<Opportunity> {
  return request<Opportunity>(`${BASE_URL}/${id}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
    },
  });
}

/**
 * Creates a new opportunity record.
 */
export async function createOpportunity(data: CreateOpportunityDTO): Promise<Opportunity> {
  return request<Opportunity>(BASE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(data),
  });
}

/**
 * Updates an existing opportunity record with partial or full attributes.
 */
export async function updateOpportunity(
  id: number,
  data: UpdateOpportunityDTO
): Promise<Opportunity> {
  return request<Opportunity>(`${BASE_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(data),
  });
}

/**
 * Deletes an opportunity by ID.
 */
export async function deleteOpportunity(id: number): Promise<{ id: number }> {
  return request<{ id: number }>(`${BASE_URL}/${id}`, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
    },
  });
}
