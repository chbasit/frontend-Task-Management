'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card, Button, Input, Textarea, Select } from '@/components/common';
import { projectSchema, ProjectFormData } from '@/utils/validation';
import { projectService } from '@/services/projectService';
import { useProjectStore } from '@/store/projectStore';
import { colors } from '@/config/colors';
import { Project } from '@/types';

interface ProjectFormProps {
  initialData?: Project | null;
  onSuccess?: () => void;
}

const getErrorMessage = (error: unknown, fallback: string) => {
  return error instanceof Error ? error.message : fallback;
};

const projectStatusOptions = [
  { value: 'active', label: 'Active' },
  { value: 'on-hold', label: 'On Hold' },
  { value: 'completed', label: 'Completed' },
  { value: 'cancelled', label: 'Cancelled' },
];

export const ProjectForm = ({ initialData, onSuccess }: ProjectFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const { addProject, updateProject } = useProjectStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProjectFormData>({
    resolver: zodResolver(projectSchema),
    defaultValues: initialData || {
      status: 'active',
    },
  });

  const onSubmit = async (data: ProjectFormData) => {
    try {
      setIsLoading(true);
      setServerError(null);

      if (initialData) {
        const updated = await projectService.update(initialData.id, data);
        updateProject(initialData.id, updated);
      } else {
        const created = await projectService.create({
          ...data,
          createdBy: '1', // Mock user ID
        });
        addProject(created);
      }

      onSuccess?.();
    } catch (error: unknown) {
      setServerError(getErrorMessage(error, 'Failed to save project'));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card padding="lg" className="max-w-2xl">
      <h2 className="text-2xl font-bold mb-6" style={{ color: colors.text }}>
        {initialData ? 'Edit Project' : 'Create New Project'}
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
          label="Project Name"
          placeholder="Enter project name"
          {...register('name')}
          error={errors.name?.message}
        />

        <Textarea
          label="Description"
          placeholder="Describe your project"
          {...register('description')}
          error={errors.description?.message}
        />

        <Select
          label="Status"
          options={projectStatusOptions}
          {...register('status')}
          error={errors.status?.message}
        />

        <div className="flex gap-3">
          <Button
            type="submit"
            variant="primary"
            size="md"
            isLoading={isLoading}
            className="flex-1"
          >
            {initialData ? 'Update Project' : 'Create Project'}
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
