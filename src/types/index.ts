export type UserRole = 'admin' | 'manager' | 'user';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
  createdAt: string;
}

export type ProjectStatus = 'active' | 'completed' | 'on-hold' | 'cancelled';
export type TaskStatus = 'todo' | 'in-progress' | 'in-review' | 'completed';
export type TaskPriority = 'low' | 'medium' | 'high' | 'urgent';

export interface Project {
  id: string;
  name: string;
  description: string;
  status: ProjectStatus;
  createdDate: string;
  updatedDate: string;
  createdBy: string;
  taskCount?: number;
  completedTaskCount?: number;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  priority: TaskPriority;
  dueDate: string;
  assignedTo: User;
  status: TaskStatus;
  projectId: string;
  createdDate: string;
  updatedDate: string;
  createdBy: string;
}

export interface DashboardStats {
  totalProjects: number;
  totalTasks: number;
  completedTasks: number;
  pendingTasks: number;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  name: string;
  confirmPassword: string;
}

export interface ForgotPasswordRequest {
  email: string;
}
