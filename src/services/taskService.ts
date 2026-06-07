import { Task, User } from '@/types';

const mockUsers: User[] = [
  {
    id: '1',
    email: 'admin@example.com',
    name: 'Admin User',
    role: 'admin',
    createdAt: new Date().toISOString(),
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Admin',
  },
  {
    id: '2',
    email: 'manager@example.com',
    name: 'Project Manager',
    role: 'manager',
    createdAt: new Date().toISOString(),
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Manager',
  },
  {
    id: '3',
    email: 'user@example.com',
    name: 'John Doe',
    role: 'user',
    createdAt: new Date().toISOString(),
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=User',
  },
];

// Mock tasks database
const mockTasks: Task[] = [
  {
    id: '1',
    title: 'Design homepage mockups',
    description: 'Create high-fidelity mockups for the new homepage',
    priority: 'high',
    dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
    assignedTo: mockUsers[1],
    status: 'in-progress',
    projectId: '1',
    createdDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    updatedDate: new Date().toISOString(),
    createdBy: '1',
  },
  {
    id: '2',
    title: 'Implement user authentication',
    description: 'Add JWT-based authentication system',
    priority: 'urgent',
    dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
    assignedTo: mockUsers[2],
    status: 'todo',
    projectId: '1',
    createdDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    updatedDate: new Date().toISOString(),
    createdBy: '1',
  },
  {
    id: '3',
    title: 'Create database schema',
    description: 'Design and create all necessary database tables',
    priority: 'high',
    dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
    assignedTo: mockUsers[0],
    status: 'completed',
    projectId: '2',
    createdDate: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
    updatedDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    createdBy: '1',
  },
  {
    id: '4',
    title: 'Write API documentation',
    description: 'Document all API endpoints with examples',
    priority: 'medium',
    dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    assignedTo: mockUsers[1],
    status: 'in-review',
    projectId: '2',
    createdDate: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
    updatedDate: new Date().toISOString(),
    createdBy: '2',
  },
  {
    id: '5',
    title: 'Setup CI/CD pipeline',
    description: 'Configure GitHub Actions for automated testing and deployment',
    priority: 'high',
    dueDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString(),
    assignedTo: mockUsers[2],
    status: 'todo',
    projectId: '1',
    createdDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    updatedDate: new Date().toISOString(),
    createdBy: '1',
  },
];

const delay = (ms: number = 300) => new Promise((resolve) => setTimeout(resolve, ms));

export const taskService = {
  async getAll(): Promise<Task[]> {
    await delay();
    return mockTasks;
  },

  async getById(id: string): Promise<Task> {
    await delay();
    const task = mockTasks.find((t) => t.id === id);
    if (!task) {
      throw new Error('Task not found');
    }
    return task;
  },

  async getByProject(projectId: string): Promise<Task[]> {
    await delay();
    return mockTasks.filter((t) => t.projectId === projectId);
  },

  async create(data: Omit<Task, 'id' | 'createdDate' | 'updatedDate'>): Promise<Task> {
    await delay();
    
    const newTask: Task = {
      ...data,
      id: String(mockTasks.length + 1),
      createdDate: new Date().toISOString(),
      updatedDate: new Date().toISOString(),
    };
    
    mockTasks.push(newTask);
    return newTask;
  },

  async update(id: string, data: Partial<Task>): Promise<Task> {
    await delay();
    
    const index = mockTasks.findIndex((t) => t.id === id);
    if (index === -1) {
      throw new Error('Task not found');
    }

    const updatedTask: Task = {
      ...mockTasks[index],
      ...data,
      id: mockTasks[index].id,
      createdDate: mockTasks[index].createdDate,
      updatedDate: new Date().toISOString(),
    };

    mockTasks[index] = updatedTask;
    return updatedTask;
  },

  async delete(id: string): Promise<void> {
    await delay();
    
    const index = mockTasks.findIndex((t) => t.id === id);
    if (index === -1) {
      throw new Error('Task not found');
    }

    mockTasks.splice(index, 1);
  },

  async getStats() {
    await delay();
    return {
      total: mockTasks.length,
      todo: mockTasks.filter((t) => t.status === 'todo').length,
      inProgress: mockTasks.filter((t) => t.status === 'in-progress').length,
      inReview: mockTasks.filter((t) => t.status === 'in-review').length,
      completed: mockTasks.filter((t) => t.status === 'completed').length,
    };
  },

  async getUsers(): Promise<User[]> {
    await delay();
    return mockUsers;
  },
};
