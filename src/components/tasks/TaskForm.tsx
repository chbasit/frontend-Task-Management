'use client';

import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card, Button, Input, Textarea, Select } from '@/components/common';
import { taskSchema, TaskFormData } from '@/utils/validation';
import { taskService } from '@/services/taskService';
import { projectService } from '@/services/projectService';
import { useTaskStore } from '@/store/taskStore';
import { colors } from '@/config/colors';
import { Project, Task, User } from '@/types';

interface TaskFormProps {
  initialData?: Task | null;
  projectId?: string;
  onSuccess?: () => void;
}

const getErrorMessage = (error: unknown, fallback: string) => {
  return error instanceof Error ? error.message : fallback;
};

const taskPriorityOptions = [
  { value: 'low', label: 'Low' },
  { value: 'medium', label: 'Medium' },
  { value: 'high', label: 'High' },
  { value: 'urgent', label: 'Urgent' },
];

const taskStatusOptions = [
  { value: 'todo', label: 'To Do' },
  { value: 'in-progress', label: 'In Progress' },
  { value: 'in-review', label: 'In Review' },
  { value: 'completed', label: 'Completed' },
];

export const TaskForm = ({ initialData, projectId, onSuccess }: TaskFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const { addTask, updateTask } = useTaskStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TaskFormData>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      projectId: projectId || initialData?.projectId,
      status: initialData?.status || 'todo',
      priority: initialData?.priority || 'medium',
      title: initialData?.title,
      description: initialData?.description,
      dueDate: initialData?.dueDate ? initialData.dueDate.slice(0, 10) : undefined,
      assignedTo: initialData?.assignedTo.id,
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [projectsData, usersData] = await Promise.all([
          projectService.getAll(),
          taskService.getUsers(),
        ]);
        setProjects(projectsData);
        setUsers(usersData);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };

    fetchData();
  }, []);

  const onSubmit = async (data: TaskFormData) => {
    try {
      setIsLoading(true);
      setServerError(null);

      const assignedUser = users.find((u) => u.id === data.assignedTo);
      if (!assignedUser) {
        setServerError('Please select a valid user');
        return;
      }

      const taskData = {
        ...data,
        assignedTo: assignedUser,
      };

      if (initialData) {
        const updated = await taskService.update(initialData.id, taskData);
        updateTask(initialData.id, updated);
      } else {
        const created = await taskService.create({
          ...taskData,
          createdBy: '1', // Mock user ID
        });
        addTask(created);
      }

      onSuccess?.();
    } catch (error: unknown) {
      setServerError(getErrorMessage(error, 'Failed to save task'));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card padding="lg" className="max-w-2xl">
      <h2 className="text-2xl font-bold mb-6" style={{ color: colors.text }}>
        {initialData ? 'Edit Task' : 'Create New Task'}
      </h2>

      {serverError && (
        <div
          className="p-3 rounded-lg mb-4 text-sm font-medium"
          style={{
            backgroundColor: colors.dangerLight,
            color: colors.danger,
          }}
        >
          {serverError}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          label="Task Title"
          placeholder="Enter task title"
          {...register('title')}
          error={errors.title?.message}
        />

        <Textarea
          label="Description"
          placeholder="Describe the task"
          {...register('description')}
          error={errors.description?.message}
        />

        <div className="grid grid-cols-2 gap-4">
          <Select
            label="Priority"
            options={taskPriorityOptions}
            {...register('priority')}
            error={errors.priority?.message}
          />
          <Select
            label="Status"
            options={taskStatusOptions}
            {...register('status')}
            error={errors.status?.message}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Select
            label="Project"
            options={projects.map((p) => ({ value: p.id, label: p.name }))}
            {...register('projectId')}
            error={errors.projectId?.message}
          />
          <Select
            label="Assign To"
            options={users.map((u) => ({ value: u.id, label: u.name }))}
            {...register('assignedTo')}
            error={errors.assignedTo?.message}
          />
        </div>

        <Input
          label="Due Date"
          type="date"
          {...register('dueDate')}
          error={errors.dueDate?.message}
        />

        <div className="flex gap-3">
          <Button
            type="submit"
            variant="primary"
            size="md"
            isLoading={isLoading}
            className="flex-1"
          >
            {initialData ? 'Update Task' : 'Create Task'}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="md"
            className="flex-1"
            onClick={() => onSuccess?.()}
          >
            Cancel
          </Button>
        </div>
      </form>
    </Card>
  );
};
