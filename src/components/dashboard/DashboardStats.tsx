'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { CheckCircle2, Clock3, FolderKanban, ListChecks } from 'lucide-react';
import { StatCard } from '@/components/common';
import { projectService } from '@/services/projectService';
import { taskService } from '@/services/taskService';
import { colors } from '@/config/colors';

interface StatsData {
  totalProjects: number;
  totalTasks: number;
  completedTasks: number;
  pendingTasks: number;
}

export const DashboardStats = React.memo(() => {
  const [stats, setStats] = useState<StatsData>({
    totalProjects: 0,
    totalTasks: 0,
    completedTasks: 0,
    pendingTasks: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  const fetchStats = useCallback(async () => {
    try {
      const [projects, tasks] = await Promise.all([
        projectService.getAll(),
        taskService.getAll(),
      ]);

      const completedTasks = tasks.filter((t) => t.status === 'completed').length;
      const pendingTasks = tasks.filter((t) => t.status !== 'completed').length;

      setStats({
        totalProjects: projects.length,
        totalTasks: tasks.length,
        completedTasks,
        pendingTasks,
      });
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        {[1, 2, 3, 4].map((item) => (
          <div key={item} className="h-36 animate-pulse rounded-xl border bg-white" />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
      <StatCard
        label="Total Projects"
        value={stats.totalProjects}
        icon={<FolderKanban size={22} />}
        color={colors.primary}
        trend={{ value: 12, isPositive: true }}
      />
      <StatCard
        label="Total Tasks"
        value={stats.totalTasks}
        icon={<ListChecks size={22} />}
        color={colors.secondary}
        trend={{ value: 8, isPositive: true }}
      />
      <StatCard
        label="Completed Tasks"
        value={stats.completedTasks}
        icon={<CheckCircle2 size={22} />}
        color={colors.success}
        trend={{ value: 15, isPositive: true }}
      />
      <StatCard
        label="Pending Tasks"
        value={stats.pendingTasks}
        icon={<Clock3 size={22} />}
        color={colors.warning}
        trend={{ value: 3, isPositive: false }}
      />
    </div>
  );
});

DashboardStats.displayName = 'DashboardStats';
