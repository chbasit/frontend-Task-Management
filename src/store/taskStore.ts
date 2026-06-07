import { create } from 'zustand';
import { Task, TaskStatus } from '@/types';

interface TaskStore {
  tasks: Task[];
  isLoading: boolean;
  error: string | null;
  setTasks: (tasks: Task[]) => void;
  addTask: (task: Task) => void;
  updateTask: (id: string, task: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  getTasksByProject: (projectId: string) => Task[];
  getTasksByStatus: (status: TaskStatus) => Task[];
  setIsLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useTaskStore = create<TaskStore>((set, get) => ({
  tasks: [],
  isLoading: false,
  error: null,
  
  setTasks: (tasks) => set({ tasks }),
  
  addTask: (task) =>
    set((state) => ({
      tasks: [task, ...state.tasks],
    })),
  
  updateTask: (id, updates) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === id ? { ...task, ...updates } : task
      ),
    })),
  
  deleteTask: (id) =>
    set((state) => ({
      tasks: state.tasks.filter((task) => task.id !== id),
    })),
  
  getTasksByProject: (projectId) =>
    get().tasks.filter((task) => task.projectId === projectId),
  
  getTasksByStatus: (status) =>
    get().tasks.filter((task) => task.status === status),
  
  setIsLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),
}));
