'use server';

import { contactFormSchema, taskSchema, subscribeSchema } from '@/lib/schemas';
import { delay } from '@/lib/utils';
import { z } from 'zod';

export async function submitContactForm(
  data: unknown
): Promise<{ success: boolean; message: string; data?: unknown }> {
  try {
    // Validate input with Zod
    const validatedData = contactFormSchema.parse(data);

    // Simulate API delay
    await delay(1000);

    // Simulate success/failure
    if (validatedData.email.includes('error')) {
      throw new Error('Email validation failed');
    }

    console.log('Contact form submitted:', validatedData);

    return {
      success: true,
      message: `Thank you ${validatedData.name}, we received your message!`,
      data: validatedData,
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        message: `Validation error: ${error.errors[0].message}`,
      };
    }

    return {
      success: false,
      message: error instanceof Error ? error.message : 'An error occurred',
    };
  }
}

export async function createTask(
  data: unknown
): Promise<{ success: boolean; message: string; taskId?: string }> {
  try {
    const validatedData = taskSchema.parse(data);

    // Simulate API delay
    await delay(800);

    const taskId = `task-${Date.now()}`;

    console.log('Task created:', { ...validatedData, id: taskId });

    return {
      success: true,
      message: `Task "${validatedData.title}" created successfully!`,
      taskId,
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        message: `Validation error: ${error.errors[0].message}`,
      };
    }

    return {
      success: false,
      message: error instanceof Error ? error.message : 'Failed to create task',
    };
  }
}

export async function updateTask(
  taskId: string,
  status: string
): Promise<{ success: boolean; message: string }> {
  try {
    // Validate status
    const validStatuses = ['Todo', 'In Progress', 'Done'];
    if (!validStatuses.includes(status)) {
      throw new Error('Invalid status');
    }

    // Simulate API delay
    await delay(400);

    console.log('Task updated:', { taskId, status });

    return {
      success: true,
      message: `Task status updated to "${status}"!`,
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Failed to update task',
    };
  }
}

export async function subscribe(
  data: unknown
): Promise<{ success: boolean; message: string }> {
  try {
    const validatedData = subscribeSchema.parse(data);

    // Simulate API delay
    await delay(600);

    console.log('Subscription created:', validatedData);

    return {
      success: true,
      message: `You've subscribed to ${validatedData.frequency} updates!`,
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        message: `Validation error: ${error.errors[0].message}`,
      };
    }

    return {
      success: false,
      message: error instanceof Error ? error.message : 'Subscription failed',
    };
  }
}
