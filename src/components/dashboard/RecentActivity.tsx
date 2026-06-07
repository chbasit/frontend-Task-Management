'use client';

import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { Card } from '@/components/common';
import { projectService } from '@/services/projectService';
import { taskService } from '@/services/taskService';
import { colors } from '@/config/colors';
import { formatDate, getProjectStatusColor, getTaskStatusColor, capitalizeWords } from '@/utils/helpers';

export const RecentActivity = React.memo(() => {
  const [projects, setProjects] = useState<any[]>([]);
  const [tasks, setTasks] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = useCallback(async () => {
    try {
      const [projectsData, tasksData] = await Promise.all([
        projectService.getAll(),
        taskService.getAll(),
      ]);
      setProjects(projectsData.slice(0, 5));
      setTasks(tasksData.slice(0, 5));
    } catch (error) {
      console.error('Failed to fetch activity:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const projectsContent = useMemo(() => {
    return projects.map((project) => (
      <div
        key={project.id}
        className="flex items-center justify-between p-3 rounded-lg hover:shadow-md transition-shadow"
        style={{ backgroundColor: colors.neutral[50] }}
      >
        <div className="flex-1">
          <p className="font-medium text-sm" style={{ color: colors.text }}>
            {project.name}
          </p>
          <p className="text-xs" style={{ color: colors.textLight }}>
            {formatDate(project.createdDate)}
          </p>
        </div>
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
    ));
  }, [projects]);

  const tasksContent = useMemo(() => {
    return tasks.map((task) => (
      <div
        key={task.id}
        className="flex items-center justify-between p-3 rounded-lg hover:shadow-md transition-shadow"
        style={{ backgroundColor: colors.neutral[50] }}
      >
        <div className="flex-1">
          <p className="font-medium text-sm" style={{ color: colors.text }}>
            {task.title}
          </p>
          <p className="text-xs" style={{ color: colors.textLight }}>
            Due: {formatDate(task.dueDate)}
          </p>
        </div>
        <span
          className="px-2.5 py-1 rounded-full text-xs font-semibold"
          style={{
            backgroundColor: getTaskStatusColor(task.status) + '20',
            color: getTaskStatusColor(task.status),
          }}
        >
          {capitalizeWords(task.status)}
        </span>
      </div>
    ));
  }, [tasks]);

  if (isLoading) {
    return <div style={{ color: colors.textLight }}>Loading activity...</div>;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Recent Projects */}
      <Card padding="lg">
        <h3 className="text-lg font-semibold mb-4" style={{ color: colors.text }}>
          Recent Projects
        </h3>
        <div className="space-y-3">
          {projects.length === 0 ? (
            <p style={{ color: colors.textLight }}>No projects yet</p>
          ) : (
            projectsContent
          )}
        </div>
      </Card>

      {/* Recent Tasks */}
      <Card padding="lg">
        <h3 className="text-lg font-semibold mb-4" style={{ color: colors.text }}>
          Recent Tasks
        </h3>
        <div className="space-y-3">
          {tasks.length === 0 ? (
            <p style={{ color: colors.textLight }}>No tasks yet</p>
          ) : (
            tasksContent
          )}
        </div>
      </Card>
    </div>
  );
});

RecentActivity.displayName = 'RecentActivity';
