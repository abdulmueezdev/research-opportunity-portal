/**
 * Research Opportunity Portal - TypeScript Contracts
 * 
 * Strict type definitions aligning frontend components, DTOs, and API envelopes
 * with backend/src/schemas/opportunity.schema.js and database/schema.sql.
 * 
 * CRITICAL NOTE:
 * Database column and backend schema property is `area` (VARCHAR(100)),
 * NOT `research_area`.
 */

export type OpportunityStatus = 'Open' | 'Closed';

export type OpportunityFilter = 'All' | OpportunityStatus;

/**
 * Core Opportunity entity interface representing the persistent record
 * in MySQL database and full JSON object returned by the API.
 */
export interface Opportunity {
  id: number;
  title: string;
  description: string;
  area: string;
  faculty_name: string;
  department: string;
  required_skills: string;
  available_positions: number;
  deadline: string; // ISO format calendar date: YYYY-MM-DD
  status: OpportunityStatus;
  created_at: string; // ISO-8601 timestamp string
  updated_at: string; // ISO-8601 timestamp string
}

/**
 * Data Transfer Object for creating an opportunity.
 * Excludes server-generated fields: id, created_at, and updated_at.
 * status is optional (defaults to 'Open' on backend if omitted).
 */
export type CreateOpportunityDTO = Omit<Opportunity, 'id' | 'created_at' | 'updated_at' | 'status'> & {
  status?: OpportunityStatus;
};

/**
 * Data Transfer Object for updating an existing opportunity.
 * All fields from CreateOpportunityDTO are optional for partial updates.
 */
export type UpdateOpportunityDTO = Partial<CreateOpportunityDTO>;

/**
 * Standard API success response envelope.
 */
export interface ApiEnvelope<T> {
  success: boolean;
  data: T;
  message?: string;
  count?: number;
}

/**
 * Individual field validation issue matching backend Zod validator.
 */
export interface ApiFieldError {
  field?: string;
  message: string;
}

/**
 * Standard API error response envelope.
 */
export interface ApiErrorEnvelope {
  success: false;
  error: {
    code: string;
    message: string;
    details?: Array<{ field?: string; message: string }>;
  };
}

/**
 * Discriminated union of API envelope responses for type-safe client calls.
 */
export type ApiResponse<T> = ApiEnvelope<T> | ApiErrorEnvelope;

/**
 * Type guard for detecting ApiErrorEnvelope.
 */
export function isApiErrorEnvelope(res: unknown): res is ApiErrorEnvelope {
  if (typeof res !== 'object' || res === null) {
    return false;
  }
  const candidate = res as Record<string, unknown>;
  return candidate.success === false && typeof candidate.error === 'object' && candidate.error !== null;
}
