import {
  useState,
  useEffect,
  useRef,
  type FormEvent,
  type MouseEvent,
  type SyntheticEvent,
} from 'react';
import {
  type Opportunity,
  type CreateOpportunityDTO,
  type UpdateOpportunityDTO,
  type OpportunityStatus,
} from '../../types/opportunity';
import { Input } from '../atoms/Input';
import { Textarea } from '../atoms/Textarea';
import { PrimaryButton } from '../atoms/PrimaryButton';
import { OutlinedButton } from '../atoms/OutlinedButton';
import { Sticker } from '../atoms/Sticker';
import { cn } from '../../lib/utils';

export interface OpportunityFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: Opportunity | null;
  onSubmit: (data: CreateOpportunityDTO | UpdateOpportunityDTO) => Promise<void>;
  fieldErrors?: Array<{ field?: string; message: string }>;
  serverErrors?: Array<{ field?: string; message: string }>;
  isSubmitting?: boolean;
}

interface FormState {
  title: string;
  description: string;
  area: string;
  faculty_name: string;
  department: string;
  required_skills: string;
  available_positions: number | string;
  deadline: string;
  status: OpportunityStatus;
}

const initialFormState: FormState = {
  title: '',
  description: '',
  area: '',
  faculty_name: '',
  department: '',
  required_skills: '',
  available_positions: 1,
  deadline: '',
  status: 'Open',
};

/**
 * OpportunityFormModal - Native HTML dialog supporting creation and editing
 * of research opportunities with complete WCAG accessibility, focus trapping,
 * and inline validation error mapping matching Stitch S6 and S7.
 */
export function OpportunityFormModal({
  isOpen,
  onClose,
  initialData,
  onSubmit,
  fieldErrors,
  serverErrors,
  isSubmitting = false,
}: OpportunityFormModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [formData, setFormData] = useState<FormState>(initialFormState);

  const isEdit = Boolean(initialData);
  const errors = fieldErrors ?? serverErrors ?? [];

  // Reset or populate form state on modal open / initialData change
  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setFormData({
          title: initialData.title ?? '',
          description: initialData.description ?? '',
          area: initialData.area ?? '',
          faculty_name: initialData.faculty_name ?? '',
          department: initialData.department ?? '',
          required_skills: initialData.required_skills ?? '',
          available_positions: initialData.available_positions ?? 1,
          deadline: initialData.deadline ? initialData.deadline.slice(0, 10) : '',
          status: initialData.status ?? 'Open',
        });
      } else {
        setFormData(initialFormState);
      }
    }
  }, [isOpen, initialData]);

  // Synchronize native dialog state with React isOpen prop
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      if (!dialog.open) {
        dialog.showModal();
      }
    } else {
      if (dialog.open) {
        dialog.close();
      }
    }
  }, [isOpen]);

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
    if (isSubmitting) return;
    onClose();
  };

  // Handle backdrop clicks outside modal bounding box
  const handleBackdropClick = (e: MouseEvent<HTMLDialogElement>) => {
    if (isSubmitting) return;
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

  // Maps backend/client validation errors by field name (handling both `area` and `research_area`)
  const getFieldError = (fieldName: string): string | undefined => {
    const found = errors.find((e) => {
      if (!e.field) return false;
      if (e.field === fieldName) return true;
      if (fieldName === 'area' && (e.field === 'research_area' || e.field === 'area')) return true;
      return false;
    });
    return found?.message;
  };

  // Identify any general errors not bound to specific inputs
  const generalErrors = errors.filter(
    (e) =>
      !e.field ||
      ![
        'title',
        'description',
        'area',
        'research_area',
        'faculty_name',
        'department',
        'required_skills',
        'available_positions',
        'deadline',
        'status',
      ].includes(e.field)
  );

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitting) return;

    const payload: CreateOpportunityDTO | UpdateOpportunityDTO = {
      title: formData.title.trim(),
      description: formData.description.trim(),
      area: formData.area.trim(),
      faculty_name: formData.faculty_name.trim(),
      department: formData.department.trim(),
      required_skills: formData.required_skills.trim(),
      available_positions:
        typeof formData.available_positions === 'number'
          ? formData.available_positions
          : parseInt(formData.available_positions, 10) || 0,
      deadline: formData.deadline,
      ...(isEdit ? { status: formData.status } : {}),
    };

    await onSubmit(payload);
  };

  return (
    <dialog
      ref={dialogRef}
      onCancel={handleCancel}
      onClick={handleBackdropClick}
      aria-labelledby="opportunity-form-title"
      aria-modal="true"
      className={cn(
        'fixed inset-0 m-auto w-[calc(100%-2rem)] max-w-2xl max-h-[90vh] rounded-[32px] border border-carbon bg-paper p-0 text-carbon',
        'backdrop:bg-black/50 backdrop:backdrop-blur-none',
        'flex flex-col overflow-hidden focus:outline-none shadow-none z-50'
      )}
    >
      {/* Header: Lavender strip with title and close button */}
      <header className="bg-lavender border-b border-carbon px-6 py-5 sm:px-8 sm:py-6 flex items-center justify-between gap-4 shrink-0">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-carbon/70">
            {isEdit ? 'EDIT LISTING' : 'NEW OPPORTUNITY'}
          </span>
          <h2
            id="opportunity-form-title"
            className="text-xl sm:text-2xl font-bold tracking-tight text-carbon leading-tight"
          >
            {isEdit ? 'Edit Research Opportunity' : 'Post Research Opportunity'}
          </h2>
        </div>
        <OutlinedButton
          type="button"
          onClick={onClose}
          disabled={isSubmitting}
          aria-label="Close modal"
          className="shrink-0 text-xs px-4 py-1.5 min-h-9"
          leftIcon={<Sticker name="close" size={14} aria-hidden />}
        >
          CLOSE
        </OutlinedButton>
      </header>

      {/* Form Content */}
      <form onSubmit={handleSubmit} className="flex flex-col flex-1 overflow-hidden" noValidate>
        <div className="p-6 sm:p-8 space-y-5 overflow-y-auto max-h-[calc(90vh-180px)] flex-1">
          {/* General unmapped error alerts */}
          {generalErrors.map((err, idx) => (
            <div
              key={idx}
              role="alert"
              className="flex items-center gap-2 p-3.5 rounded-2xl border-2 border-ember bg-paper text-carbon text-sm font-semibold"
            >
              <Sticker name="exclamation" size={16} badge="ember" aria-hidden />
              <span>{err.message}</span>
            </div>
          ))}

          {/* Title input */}
          <div className="space-y-1.5">
            <label
              htmlFor="form-title"
              className="text-xs font-bold uppercase tracking-wider text-carbon flex items-center"
            >
              Title
              <span className="inline-block size-1.5 rounded-full bg-ember ml-1" aria-hidden="true" />
            </label>
            <Input
              id="form-title"
              name="title"
              type="text"
              required
              aria-required="true"
              placeholder="e.g. Distributed Consensus in Edge Networks"
              value={formData.title}
              onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
              isInvalid={Boolean(getFieldError('title'))}
              aria-describedby={getFieldError('title') ? 'form-title-error' : undefined}
              disabled={isSubmitting}
            />
            {getFieldError('title') && (
              <p
                id="form-title-error"
                role="alert"
                className="flex items-center gap-1.5 text-xs font-bold text-carbon mt-1"
              >
                <Sticker name="exclamation" size={14} badge="ember" aria-hidden />
                <span>{getFieldError('title')}</span>
              </p>
            )}
          </div>

          {/* Description textarea */}
          <div className="space-y-1.5">
            <label
              htmlFor="form-description"
              className="text-xs font-bold uppercase tracking-wider text-carbon flex items-center"
            >
              Description
              <span className="inline-block size-1.5 rounded-full bg-ember ml-1" aria-hidden="true" />
            </label>
            <Textarea
              id="form-description"
              name="description"
              rows={4}
              required
              aria-required="true"
              placeholder="Describe the research objectives, methodology, expectations, and student responsibilities..."
              value={formData.description}
              onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
              isInvalid={Boolean(getFieldError('description'))}
              aria-describedby={getFieldError('description') ? 'form-description-error' : undefined}
              disabled={isSubmitting}
            />
            {getFieldError('description') && (
              <p
                id="form-description-error"
                role="alert"
                className="flex items-center gap-1.5 text-xs font-bold text-carbon mt-1"
              >
                <Sticker name="exclamation" size={14} badge="ember" aria-hidden />
                <span>{getFieldError('description')}</span>
              </p>
            )}
          </div>

          {/* Research Area & Faculty Name (2 columns on sm+) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Research Area */}
            <div className="space-y-1.5">
              <label
                htmlFor="form-area"
                className="text-xs font-bold uppercase tracking-wider text-carbon flex items-center"
              >
                Research Area
                <span className="inline-block size-1.5 rounded-full bg-ember ml-1" aria-hidden="true" />
              </label>
              <Input
                id="form-area"
                name="area"
                type="text"
                required
                aria-required="true"
                placeholder="e.g. Distributed Systems"
                value={formData.area}
                onChange={(e) => setFormData((prev) => ({ ...prev, area: e.target.value }))}
                isInvalid={Boolean(getFieldError('area'))}
                aria-describedby={getFieldError('area') ? 'form-area-error' : undefined}
                disabled={isSubmitting}
              />
              {getFieldError('area') && (
                <p
                  id="form-area-error"
                  role="alert"
                  className="flex items-center gap-1.5 text-xs font-bold text-carbon mt-1"
                >
                  <Sticker name="exclamation" size={14} badge="ember" aria-hidden />
                  <span>{getFieldError('area')}</span>
                </p>
              )}
            </div>

            {/* Faculty Name */}
            <div className="space-y-1.5">
              <label
                htmlFor="form-faculty_name"
                className="text-xs font-bold uppercase tracking-wider text-carbon flex items-center"
              >
                Faculty Name
                <span className="inline-block size-1.5 rounded-full bg-ember ml-1" aria-hidden="true" />
              </label>
              <Input
                id="form-faculty_name"
                name="faculty_name"
                type="text"
                required
                aria-required="true"
                placeholder="e.g. Dr. Ada Lovelace"
                value={formData.faculty_name}
                onChange={(e) => setFormData((prev) => ({ ...prev, faculty_name: e.target.value }))}
                isInvalid={Boolean(getFieldError('faculty_name'))}
                aria-describedby={getFieldError('faculty_name') ? 'form-faculty_name-error' : undefined}
                disabled={isSubmitting}
              />
              {getFieldError('faculty_name') && (
                <p
                  id="form-faculty_name-error"
                  role="alert"
                  className="flex items-center gap-1.5 text-xs font-bold text-carbon mt-1"
                >
                  <Sticker name="exclamation" size={14} badge="ember" aria-hidden />
                  <span>{getFieldError('faculty_name')}</span>
                </p>
              )}
            </div>
          </div>

          {/* Department & Required Skills (2 columns on sm+) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Department */}
            <div className="space-y-1.5">
              <label
                htmlFor="form-department"
                className="text-xs font-bold uppercase tracking-wider text-carbon flex items-center"
              >
                Department
                <span className="inline-block size-1.5 rounded-full bg-ember ml-1" aria-hidden="true" />
              </label>
              <select
                id="form-department"
                name="department"
                required
                aria-required="true"
                value={formData.department}
                onChange={(e) => setFormData((prev) => ({ ...prev, department: e.target.value }))}
                aria-invalid={Boolean(getFieldError('department')) ? 'true' : undefined}
                aria-describedby={getFieldError('department') ? 'form-department-error' : undefined}
                disabled={isSubmitting}
                className={cn(
                  'w-full min-h-11 px-4 py-2.5 rounded-2xl bg-paper text-carbon text-sm font-medium',
                  'transition-colors cursor-pointer appearance-none bg-[url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'currentColor\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3e%3cpolyline points=\'6 9 12 15 18 9\'%3e%3c/polyline%3e%3c/svg%3e")] bg-[length:1em_1em] bg-[right_1rem_center] bg-no-repeat pr-10',
                  getFieldError('department')
                    ? 'border-2 border-ember focus:outline-2 focus:outline-ember focus:outline-offset-2'
                    : 'border border-carbon focus:outline-2 focus:outline-voltage-violet focus:outline-offset-2',
                  'disabled:bg-soft-mist disabled:cursor-not-allowed disabled:opacity-70'
                )}
              >
                <option value="" disabled>Select department...</option>
                <option value="Computer Science">Computer Science</option>
                <option value="Software Engineering">Software Engineering</option>
                <option value="Cyber Security">Cyber Security</option>
                <option value="Physics">Physics</option>
                <option value="Electrical Engineering">Electrical Engineering</option>
                <option value="Mathematics">Mathematics</option>
                {formData.department && ![
                  'Computer Science',
                  'Software Engineering',
                  'Cyber Security',
                  'Physics',
                  'Electrical Engineering',
                  'Mathematics',
                  ''
                ].includes(formData.department) && (
                  <option value={formData.department}>{formData.department}</option>
                )}
              </select>
              {getFieldError('department') && (
                <p
                  id="form-department-error"
                  role="alert"
                  className="flex items-center gap-1.5 text-xs font-bold text-carbon mt-1"
                >
                  <Sticker name="exclamation" size={14} badge="ember" aria-hidden />
                  <span>{getFieldError('department')}</span>
                </p>
              )}
            </div>

            {/* Required Skills */}
            <div className="space-y-1.5">
              <label
                htmlFor="form-required_skills"
                className="text-xs font-bold uppercase tracking-wider text-carbon flex items-center"
              >
                Required Skills
                <span className="inline-block size-1.5 rounded-full bg-ember ml-1" aria-hidden="true" />
              </label>
              <Input
                id="form-required_skills"
                name="required_skills"
                type="text"
                list="skills-list"
                required
                aria-required="true"
                placeholder="e.g. Python, React, MySQL"
                value={formData.required_skills}
                onChange={(e) => setFormData((prev) => ({ ...prev, required_skills: e.target.value }))}
                isInvalid={Boolean(getFieldError('required_skills'))}
                aria-describedby={
                  getFieldError('required_skills')
                    ? 'form-required_skills-error form-required_skills-helper'
                    : 'form-required_skills-helper'
                }
                disabled={isSubmitting}
              />
              <datalist id="skills-list">
                <option value="C++" />
                <option value="Java" />
                <option value="MySQL" />
                <option value="Python" />
                <option value="React" />
                <option value="Node.js" />
                <option value="Data Structures" />
                <option value="Machine Learning" />
              </datalist>
              <p id="form-required_skills-helper" className="text-[11px] text-carbon/70">
                Comma-separated (e.g. Python, PyTorch, C++)
              </p>
              {getFieldError('required_skills') && (
                <p
                  id="form-required_skills-error"
                  role="alert"
                  className="flex items-center gap-1.5 text-xs font-bold text-carbon mt-1"
                >
                  <Sticker name="exclamation" size={14} badge="ember" aria-hidden />
                  <span>{getFieldError('required_skills')}</span>
                </p>
              )}
            </div>
          </div>

          {/* Available Positions & Application Deadline (2 columns on sm+) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Available Positions */}
            <div className="space-y-1.5">
              <label
                htmlFor="form-available_positions"
                className="text-xs font-bold uppercase tracking-wider text-carbon flex items-center"
              >
                Available Positions
                <span className="inline-block size-1.5 rounded-full bg-ember ml-1" aria-hidden="true" />
              </label>
              <Input
                id="form-available_positions"
                name="available_positions"
                type="number"
                min="0"
                step="1"
                required
                aria-required="true"
                value={formData.available_positions}
                onChange={(e) => {
                  const val = e.target.value;
                  setFormData((prev) => ({
                    ...prev,
                    available_positions: val === '' ? '' : Math.max(0, parseInt(val, 10) || 0),
                  }));
                }}
                isInvalid={Boolean(getFieldError('available_positions'))}
                aria-describedby={
                  getFieldError('available_positions') ? 'form-available_positions-error' : undefined
                }
                disabled={isSubmitting}
              />
              {getFieldError('available_positions') && (
                <p
                  id="form-available_positions-error"
                  role="alert"
                  className="flex items-center gap-1.5 text-xs font-bold text-carbon mt-1"
                >
                  <Sticker name="exclamation" size={14} badge="ember" aria-hidden />
                  <span>{getFieldError('available_positions')}</span>
                </p>
              )}
            </div>

            {/* Application Deadline */}
            <div className="space-y-1.5">
              <label
                htmlFor="form-deadline"
                className="text-xs font-bold uppercase tracking-wider text-carbon flex items-center"
              >
                Application Deadline
                <span className="inline-block size-1.5 rounded-full bg-ember ml-1" aria-hidden="true" />
              </label>
              <Input
                id="form-deadline"
                name="deadline"
                type="date"
                required
                aria-required="true"
                value={formData.deadline}
                onChange={(e) => setFormData((prev) => ({ ...prev, deadline: e.target.value }))}
                isInvalid={Boolean(getFieldError('deadline'))}
                aria-describedby={getFieldError('deadline') ? 'form-deadline-error' : undefined}
                disabled={isSubmitting}
              />
              {getFieldError('deadline') && (
                <p
                  id="form-deadline-error"
                  role="alert"
                  className="flex items-center gap-1.5 text-xs font-bold text-carbon mt-1"
                >
                  <Sticker name="exclamation" size={14} badge="ember" aria-hidden />
                  <span>{getFieldError('deadline')}</span>
                </p>
              )}
            </div>
          </div>

          {/* Edit Mode: Status Toggle */}
          {isEdit && (
            <div className="space-y-1.5 pt-2">
              <label
                id="status-toggle-label"
                className="text-xs font-bold uppercase tracking-wider text-carbon block"
              >
                Listing Status
              </label>
              <div
                role="radiogroup"
                aria-labelledby="status-toggle-label"
                className="inline-flex rounded-full border border-carbon p-1 bg-paper gap-1"
              >
                <button
                  type="button"
                  role="radio"
                  aria-checked={formData.status === 'Open'}
                  disabled={isSubmitting}
                  onClick={() => setFormData((prev) => ({ ...prev, status: 'Open' }))}
                  className={cn(
                    'px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-colors',
                    formData.status === 'Open'
                      ? 'bg-lavender text-carbon border border-carbon'
                      : 'bg-paper text-carbon hover:bg-soft-mist'
                  )}
                >
                  OPEN
                </button>
                <button
                  type="button"
                  role="radio"
                  aria-checked={formData.status === 'Closed'}
                  disabled={isSubmitting}
                  onClick={() => setFormData((prev) => ({ ...prev, status: 'Closed' }))}
                  className={cn(
                    'px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-colors',
                    formData.status === 'Closed'
                      ? 'bg-soft-mist text-carbon border border-carbon'
                      : 'bg-paper text-carbon hover:bg-soft-mist'
                  )}
                >
                  CLOSED
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer: Outlined Cancel and Black-filled Save Opportunity */}
        <footer className="border-t border-carbon bg-paper px-6 py-4 sm:px-8 flex items-center justify-end gap-3 shrink-0">
          <OutlinedButton
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            aria-label="Cancel and close form"
          >
            CANCEL
          </OutlinedButton>
          <PrimaryButton
            type="submit"
            disabled={isSubmitting}
            isLoading={isSubmitting}
            loadingText="SAVING..."
            aria-label={isEdit ? 'Save opportunity changes' : 'Create research opportunity'}
          >
            SAVE OPPORTUNITY
          </PrimaryButton>
        </footer>
      </form>
    </dialog>
  );
}
