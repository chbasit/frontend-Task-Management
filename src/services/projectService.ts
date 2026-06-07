import { Project } from '@/types';

const mockProjects: Project[] = [
  {
    id: '1',
    name: 'Mobile App Redesign',
    description: 'Complete redesign of the mobile application with new UI/UX',
    status: 'active',
    createdDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    updatedDate: new Date().toISOString(),
    createdBy: '1',
    taskCount: 12,
    completedTaskCount: 5,
  },
  {
    id: '2',
    name: 'API Enhancement',
    description: 'Enhance existing REST API with new endpoints and features',
    status: 'active',
    createdDate: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
    updatedDate: new Date().toISOString(),
    createdBy: '1',
    taskCount: 8,
    completedTaskCount: 4,
  },
  {
    id: '3',
    name: 'Database Migration',
    description: 'Migrate from SQL to NoSQL database',
    status: 'completed',
    createdDate: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
    updatedDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    createdBy: '1',
    taskCount: 10,
    completedTaskCount: 10,
  },
  {
    id: '4',
    name: 'Security Audit',
    description: 'Comprehensive security audit and vulnerability assessment',
    status: 'on-hold',
    createdDate: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
    updatedDate: new Date().toISOString(),
    createdBy: '2',
    taskCount: 15,
    completedTaskCount: 3,
  },
];

const delay = (ms: number = 300) => new Promise((resolve) => setTimeout(resolve, ms));

export const projectService = {
  async getAll(): Promise<Project[]> {
    await delay();
    return mockProjects;
  },

  async getById(id: string): Promise<Project> {
    await delay();
    const project = mockProjects.find((p) => p.id === id);
    if (!project) {
      throw new Error('Project not found');
    }
    return project;
  },

  async create(data: Omit<Project, 'id' | 'createdDate' | 'updatedDate'>): Promise<Project> {
    await delay();
    
    const newProject: Project = {
      ...data,
      id: String(mockProjects.length + 1),
      createdDate: new Date().toISOString(),
      updatedDate: new Date().toISOString(),
      taskCount: 0,
      completedTaskCount: 0,
    };
    
    mockProjects.push(newProject);
    return newProject;
  },

  async update(id: string, data: Partial<Project>): Promise<Project> {
    await delay();
    
    const index = mockProjects.findIndex((p) => p.id === id);
    if (index === -1) {
      throw new Error('Project not found');
    }

    const updatedProject: Project = {
      ...mockProjects[index],
      ...data,
      id: mockProjects[index].id, 
      createdDate: mockProjects[index].createdDate,
      updatedDate: new Date().toISOString(),
    };

    mockProjects[index] = updatedProject;
    return updatedProject;
  },

  async delete(id: string): Promise<void> {
    await delay();
    
    const index = mockProjects.findIndex((p) => p.id === id);
    if (index === -1) {
      throw new Error('Project not found');
    }

    mockProjects.splice(index, 1);
  },

  async getStats() {
    await delay();
    return {
      total: mockProjects.length,
      active: mockProjects.filter((p) => p.status === 'active').length,
      completed: mockProjects.filter((p) => p.status === 'completed').length,
      onHold: mockProjects.filter((p) => p.status === 'on-hold').length,
    };
  },
};
