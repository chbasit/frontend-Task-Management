import { TaskPriority, TaskStatus, ProjectStatus } from '@/types';
import { colors } from '@/config/colors';

export const formatDate = (date: string | Date): string => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

export const formatDateTime = (date: string | Date): string => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const getTaskPriorityColor = (priority: TaskPriority): string => {
  const priorityColors: Record<TaskPriority, string> = {
    low: colors.info,
    medium: colors.warning,
    high: colors.danger,
    urgent: colors.danger,
  };
  return priorityColors[priority];
};

export const getTaskStatusColor = (status: TaskStatus): string => {
  const statusColors: Record<TaskStatus, string> = {
    todo: colors.neutral[400],
    'in-progress': colors.info,
    'in-review': colors.warning,
    completed: colors.success,
  };
  return statusColors[status];
};

export const getProjectStatusColor = (status: ProjectStatus): string => {
  const statusColors: Record<ProjectStatus, string> = {
    active: colors.success,
    completed: colors.info,
    'on-hold': colors.warning,
    cancelled: colors.danger,
  };
  return statusColors[status];
};

export const capitalizeWord = (word: string): string => {
  return word.charAt(0).toUpperCase() + word.slice(1);
};

export const capitalizeWords = (phrase: string): string => {
  return phrase
    .split('-')
    .map((word) => capitalizeWord(word))
    .join(' ');
};

export const cn = (...classes: (string | undefined | null | false)[]): string => {
  return classes.filter(Boolean).join(' ');
};

export const calculateDaysUntilDue = (dueDate: string): number => {
  const today = new Date();
  const due = new Date(dueDate);
  const diff = due.getTime() - today.getTime();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
};

export const isOverdue = (dueDate: string): boolean => {
  return calculateDaysUntilDue(dueDate) < 0;
};

export const isDueSoon = (dueDate: string): boolean => {
  const daysUntilDue = calculateDaysUntilDue(dueDate);
  return daysUntilDue >= 0 && daysUntilDue <= 3;
};
