import { create } from 'zustand';
import { Project } from '@/types';

interface ProjectStore {
  projects: Project[];
  isLoading: boolean;
  error: string | null;
  setProjects: (projects: Project[]) => void;
  addProject: (project: Project) => void;
  updateProject: (id: string, project: Partial<Project>) => void;
  deleteProject: (id: string) => void;
  setIsLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useProjectStore = create<ProjectStore>((set) => ({
  projects: [],
  isLoading: false,
  error: null,
  
  setProjects: (projects) => set({ projects }),
  
  addProject: (project) =>
    set((state) => ({
      projects: [project, ...state.projects],
    })),
  
  updateProject: (id, updates) =>
    set((state) => ({
      projects: state.projects.map((project) =>
        project.id === id ? { ...project, ...updates } : project
      ),
    })),
  
  deleteProject: (id) =>
    set((state) => ({
      projects: state.projects.filter((project) => project.id !== id),
    })),
  
  setIsLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),
}));
