'use client';

import React, { useEffect } from 'react';
import { Edit3, Trash2 } from 'lucide-react';
import { useProjectStore } from '@/store/projectStore';
import { useAuthStore } from '@/store/authStore';
import { projectService } from '@/services/projectService';
import { Card } from '@/components/common';
import { colors } from '@/config/colors';
import { formatDate, capitalizeWords, getProjectStatusColor } from '@/utils/helpers';

interface ProjectListProps {
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export const ProjectList = ({ onEdit, onDelete }: ProjectListProps) => {
  const { projects, setProjects, isLoading, setIsLoading } = useProjectStore();
  const user = useAuthStore((state) => state.user);
  const canDelete = user?.role === 'admin';

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setIsLoading(true);
        const data = await projectService.getAll();
        setProjects(data);
      } catch (error) {
        console.error('Failed to fetch projects:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, [setProjects, setIsLoading]);

  if (isLoading) {
    return <div style={{ color: colors.textLight }}>Loading projects...</div>;
  }

  if (projects.length === 0) {
    return (
      <Card padding="lg" className="text-center">
        <p style={{ color: colors.textLight }}>No projects yet. Create one to get started!</p>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project) => (
        <Card key={project.id} padding="lg" className="flex flex-col">
          <div className="flex-1 mb-4">
            <div className="flex items-start justify-between mb-2">
              <h3 className="font-semibold text-lg" style={{ color: colors.text }}>
                {project.name}
              </h3>
              <span
                className="px-2.5 py-1 rounded-full text-xs font-semibold"
                style={{
                  backgroundColor: getProjectStatusColor(project.status) + '20',
                  color: getProjectStatusColor(project.status),
                }}
              >
                {capitalizeWords(project.status)}
              </span>
            </div>
            <p className="text-sm mb-3" style={{ color: colors.textLight }}>
              {project.description}
            </p>
            <div className="flex gap-4 text-sm">
              <div>
                <p style={{ color: colors.textLight }}>Tasks</p>
                <p className="font-semibold" style={{ color: colors.text }}>
                  {project.completedTaskCount}/{project.taskCount}
                </p>
              </div>
              <div>
                <p style={{ color: colors.textLight }}>Created</p>
                <p className="font-semibold text-xs" style={{ color: colors.text }}>
                  {formatDate(project.createdDate)}
                </p>
              </div>
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              className="inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg text-slate-500 transition hover:bg-blue-50 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
              onClick={() => onEdit?.(project.id)}
              aria-label={`Edit ${project.name}`}
            >
              <Edit3 size={17} />
            </button>
            {canDelete && (
              <button
                type="button"
                className="inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg text-slate-500 transition hover:bg-red-50 hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-red-500/30"
                onClick={() => onDelete?.(project.id)}
                aria-label={`Delete ${project.name}`}
              >
                <Trash2 size={17} />
              </button>
            )}
          </div>
        </Card>
      ))}
    </div>
  );
};
