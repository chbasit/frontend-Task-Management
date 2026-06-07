'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { Edit3, Trash2 } from 'lucide-react';
import { useTaskStore } from '@/store/taskStore';
import { useAuthStore } from '@/store/authStore';
import { taskService } from '@/services/taskService';
import { Card } from '@/components/common';
import { colors } from '@/config/colors';
import { formatDate, capitalizeWords, getTaskStatusColor, getTaskPriorityColor } from '@/utils/helpers';
import { Task, TaskStatus } from '@/types';

interface TaskListProps {
  projectId?: string;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onStatusChange?: (id: string, status: TaskStatus) => void;
}

const taskStatusOptions: Array<{ value: TaskStatus; label: string }> = [
  { value: 'todo', label: 'To Do' },
  { value: 'in-progress', label: 'In Progress' },
  { value: 'in-review', label: 'In Review' },
  { value: 'completed', label: 'Completed' },
];

export const TaskList = ({
  projectId,
  onEdit,
  onDelete,
  onStatusChange,
}: TaskListProps) => {
  const { tasks, setTasks, isLoading, setIsLoading } = useTaskStore();
  const user = useAuthStore((state) => state.user);
  const [draggedTaskId, setDraggedTaskId] = useState<string | null>(null);
  const canManage = user?.role === 'admin' || user?.role === 'manager';

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setIsLoading(true);
        const data = await taskService.getAll();
        setTasks(data);
      } catch (error) {
        console.error('Failed to fetch tasks:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTasks();
  }, [setTasks, setIsLoading]);

  const filteredTasks = useMemo(
    () => (projectId ? tasks.filter((task) => task.projectId === projectId) : tasks),
    [projectId, tasks]
  );

  const tasksByStatus = useMemo(() => {
    return taskStatusOptions.reduce<Record<TaskStatus, Task[]>>((acc, status) => {
      acc[status.value] = filteredTasks.filter((task) => task.status === status.value);
      return acc;
    }, {
      todo: [],
      'in-progress': [],
      'in-review': [],
      completed: [],
    });
  }, [filteredTasks]);

  const handleDrop = (status: TaskStatus) => {
    if (draggedTaskId) {
      onStatusChange?.(draggedTaskId, status);
      setDraggedTaskId(null);
    }
  };

  if (isLoading) {
    return <div style={{ color: colors.textLight }}>Loading tasks...</div>;
  }

  if (filteredTasks.length === 0) {
    return (
      <Card padding="lg" className="text-center">
        <p style={{ color: colors.textLight }}>No tasks yet. Create one to get started.</p>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-5 xl:grid-cols-4">
      {taskStatusOptions.map((column) => (
        <section
          key={column.value}
          className="min-h-[420px] rounded-lg border bg-white p-4"
          style={{ borderColor: colors.border }}
          onDragOver={(event) => event.preventDefault()}
          onDrop={() => handleDrop(column.value)}
          aria-label={`${column.label} tasks`}
        >
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span
                className="h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: getTaskStatusColor(column.value) }}
              />
              <h3 className="text-sm font-bold text-slate-900">{column.label}</h3>
            </div>
            <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600">
              {tasksByStatus[column.value].length}
            </span>
          </div>

          <div className="space-y-3">
            {tasksByStatus[column.value].map((task) => (
              <article
                key={task.id}
                draggable
                onDragStart={() => setDraggedTaskId(task.id)}
                onDragEnd={() => setDraggedTaskId(null)}
                className="cursor-grab rounded-lg border bg-slate-50 p-4 shadow-sm transition hover:-translate-y-0.5 hover:bg-white hover:shadow-md active:cursor-grabbing"
                style={{ borderColor: colors.border }}
              >
                <div className="mb-3 flex items-start justify-between gap-3">
                  <h4 className="text-sm font-bold leading-5 text-slate-950">{task.title}</h4>
                  <span
                    className="shrink-0 rounded-full px-2 py-1 text-[11px] font-bold"
                    style={{
                      backgroundColor: `${getTaskPriorityColor(task.priority)}20`,
                      color: getTaskPriorityColor(task.priority),
                    }}
                  >
                    {capitalizeWords(task.priority)}
                  </span>
                </div>
                <p className="line-clamp-2 text-sm leading-6 text-slate-600">{task.description}</p>
                <div className="mt-4 space-y-1.5 text-xs font-medium text-slate-500">
                  <p>Assigned to {task.assignedTo.name}</p>
                  <p>Due {formatDate(task.dueDate)}</p>
                </div>

                <div className="mt-4 flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => onEdit?.(task.id)}
                    className="inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg text-slate-500 transition hover:bg-blue-50 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                    aria-label={`Edit ${task.title}`}
                  >
                    <Edit3 size={17} />
                  </button>
                  {canManage && (
                    <button
                      type="button"
                      onClick={() => onDelete?.(task.id)}
                      className="inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg text-slate-500 transition hover:bg-red-50 hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-red-500/30"
                      aria-label={`Delete ${task.title}`}
                    >
                      <Trash2 size={17} />
                    </button>
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
};
