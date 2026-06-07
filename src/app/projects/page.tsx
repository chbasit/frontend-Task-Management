'use client';

import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { Header, Button } from '@/components/common';
import { ProjectList } from '@/components/projects/ProjectList';
import { ProjectForm } from '@/components/projects/ProjectForm';
import { projectService } from '@/services/projectService';
import { useProjectStore } from '@/store/projectStore';

export default function ProjectsPage() {
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const { deleteProject, projects } = useProjectStore();

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this project?')) {
      try {
        await projectService.delete(id);
        deleteProject(id);
      } catch (error) {
        console.error('Failed to delete project:', error);
      }
    }
  };

  const handleEdit = (id: string) => {
    setEditingId(id);
    setShowForm(true);
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingId(null);
  };

  const editingProject = editingId ? projects.find((p) => p.id === editingId) : null;

  return (
    <div>
      <Header
        title="Projects"
        subtitle="Manage all your projects in one place"
        actions={
          !showForm ? (
            <Button
              variant="primary"
              onClick={() => setShowForm(true)}
            >
              <Plus size={17} />
              New Project
            </Button>
          ) : undefined
        }
      />

      <div
        className="mx-auto max-w-[1440px] space-y-6"
        style={{ padding: '28px 32px' }}
      >
        {showForm ? (
          <ProjectForm
            initialData={editingProject}
            onSuccess={handleFormClose}
          />
        ) : (
          <ProjectList onEdit={handleEdit} onDelete={handleDelete} />
        )}
      </div>
    </div>
  );
}
