'use client';

import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { Header, Button } from '@/components/common';
import { TaskList } from '@/components/tasks/TaskList';
import { TaskForm } from '@/components/tasks/TaskForm';
import { taskService } from '@/services/taskService';
import { useTaskStore } from '@/store/taskStore';
import { TaskStatus } from '@/types';

export default function TasksPage() {
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const { deleteTask, tasks, updateTask } = useTaskStore();

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this task?')) {
      try {
        await taskService.delete(id);
        deleteTask(id);
      } catch (error) {
        console.error('Failed to delete task:', error);
      }
    }
  };

  const handleEdit = (id: string) => {
    setEditingId(id);
    setShowForm(true);
  };

  const handleStatusChange = async (id: string, status: TaskStatus) => {
    try {
      const task = tasks.find((t) => t.id === id);
      if (task) {
        await taskService.update(id, { status });
        updateTask(id, { status });
      }
    } catch (error) {
      console.error('Failed to update task status:', error);
    }
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingId(null);
  };

  const editingTask = editingId ? tasks.find((t) => t.id === editingId) : null;

  return (
    <div>
      <Header
        title="Tasks"
        subtitle="Manage all your tasks efficiently"
        actions={
          !showForm ? (
            <Button
              variant="primary"
              onClick={() => setShowForm(true)}
            >
              <Plus size={17} />
              New Task
            </Button>
          ) : undefined
        }
      />

      <div
        className="mx-auto max-w-[1440px] space-y-6"
        style={{ padding: '28px 32px' }}
      >
        {showForm ? (
          <TaskForm
            initialData={editingTask}
            onSuccess={handleFormClose}
          />
        ) : (
          <TaskList
            onEdit={handleEdit}
            onDelete={handleDelete}
            onStatusChange={handleStatusChange}
          />
        )}
      </div>
    </div>
  );
}
