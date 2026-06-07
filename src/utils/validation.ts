import { z } from 'zod';

const emailSchema = z
  .string()
  .trim()
  .toLowerCase()
  .regex(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, 'Enter a valid email address');

export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const registerSchema = z
  .object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: emailSchema,
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export const forgotPasswordSchema = z.object({
  email: emailSchema,
});

export const projectSchema = z.object({
  name: z.string().min(2, 'Project name must be at least 2 characters').max(100),
  description: z.string().min(10, 'Description must be at least 10 characters').max(500),
  status: z.enum(['active', 'completed', 'on-hold', 'cancelled']),
});

export const taskSchema = z.object({
  title: z.string().min(3, 'Task title must be at least 3 characters').max(150),
  description: z.string().min(10, 'Description must be at least 10 characters').max(500),
  priority: z.enum(['low', 'medium', 'high', 'urgent']),
  dueDate: z.string().refine((date) => new Date(date) > new Date(), 'Due date must be in the future'),
  projectId: z.string().min(1, 'Project is required'),
  status: z.enum(['todo', 'in-progress', 'in-review', 'completed']),
  assignedTo: z.string().min(1, 'User assignment is required'),
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;
export type ProjectFormData = z.infer<typeof projectSchema>;
export type TaskFormData = z.infer<typeof taskSchema>;
