import { z } from 'zod';

// Form Schemas
export const contactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(50),
  email: z.string().email('Invalid email address'),
  message: z.string().min(10, 'Message must be at least 10 characters').max(500),
  subject: z.enum(['General', 'Support', 'Feedback', 'Bug Report']),
});

export const taskSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters').max(100),
  description: z.string().optional(),
  priority: z.enum(['Low', 'Medium', 'High']),
  status: z.enum(['Todo', 'In Progress', 'Done']),
});

export const subscribeSchema = z.object({
  email: z.string().email('Invalid email address'),
  frequency: z.enum(['Daily', 'Weekly', 'Monthly']),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
export type TaskData = z.infer<typeof taskSchema>;
export type SubscribeData = z.infer<typeof subscribeSchema>;

// UI Component Types
export interface DialogState {
  isOpen: boolean;
  title: string;
  description?: string;
}

export interface ToastMessage {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
  duration?: number;
}
