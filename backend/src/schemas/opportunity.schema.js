import { z } from 'zod';

const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

function isValidCalendarDate(dateStr) {
  if (!dateRegex.test(dateStr)) return false;
  const [year, month, day] = dateStr.split('-').map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));
  return (
    date.getUTCFullYear() === year &&
    date.getUTCMonth() === month - 1 &&
    date.getUTCDate() === day
  );
}

export const createSchema = z.object({
  title: z.string({ required_error: 'Title is required' })
    .trim()
    .min(1, 'Title cannot be empty')
    .max(255, 'Title exceeds maximum length of 255'),
  description: z.string({ required_error: 'Description is required' })
    .trim()
    .min(1, 'Description cannot be empty'),
  area: z.string({ required_error: 'Area is required' })
    .trim()
    .min(1, 'Area cannot be empty')
    .max(100, 'Area exceeds maximum length of 100'),
  faculty_name: z.string({ required_error: 'Faculty name is required' })
    .trim()
    .min(1, 'Faculty name cannot be empty')
    .max(100, 'Faculty name exceeds maximum length of 100'),
  department: z.string({ required_error: 'Department is required' })
    .trim()
    .min(1, 'Department cannot be empty')
    .max(100, 'Department exceeds maximum length of 100'),
  required_skills: z.string({ required_error: 'Required skills are required' })
    .trim()
    .min(1, 'Required skills cannot be empty')
    .max(255, 'Required skills exceeds maximum length of 255'),
  available_positions: z.number({ required_error: 'Available positions is required' })
    .int('Available positions must be an integer')
    .min(0, 'Available positions must be greater than or equal to 0'),
  deadline: z.string({ required_error: 'Deadline is required' })
    .refine(isValidCalendarDate, { message: 'Deadline must be a valid calendar date in YYYY-MM-DD format' }),
  status: z.enum(['Open', 'Closed'], {
    errorMap: () => ({ message: "Status must be either 'Open' or 'Closed'" }),
  }).default('Open').optional(),
}).strict({ message: 'Unrecognized field in request body' });

const updateFields = z.object({
  title: z.string()
    .trim()
    .min(1, 'Title cannot be empty')
    .max(255, 'Title exceeds maximum length of 255'),
  description: z.string()
    .trim()
    .min(1, 'Description cannot be empty'),
  area: z.string()
    .trim()
    .min(1, 'Area cannot be empty')
    .max(100, 'Area exceeds maximum length of 100'),
  faculty_name: z.string()
    .trim()
    .min(1, 'Faculty name cannot be empty')
    .max(100, 'Faculty name exceeds maximum length of 100'),
  department: z.string()
    .trim()
    .min(1, 'Department cannot be empty')
    .max(100, 'Department exceeds maximum length of 100'),
  required_skills: z.string()
    .trim()
    .min(1, 'Required skills cannot be empty')
    .max(255, 'Required skills exceeds maximum length of 255'),
  available_positions: z.number()
    .int('Available positions must be an integer')
    .min(0, 'Available positions must be greater than or equal to 0'),
  deadline: z.string()
    .refine(isValidCalendarDate, { message: 'Deadline must be a valid calendar date in YYYY-MM-DD format' }),
  status: z.enum(['Open', 'Closed'], {
    errorMap: () => ({ message: "Status must be either 'Open' or 'Closed'" }),
  }),
});

export const updateSchema = updateFields.partial().strict({ message: 'Unrecognized field in request body' }).refine(
  (data) => Object.keys(data).length > 0,
  { message: 'At least one field must be provided to update' }
);

export default {
  createSchema,
  updateSchema,
};
