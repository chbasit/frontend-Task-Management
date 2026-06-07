import { AuthResponse, LoginRequest, RegisterRequest, User } from '@/types';

// Mock users database
const mockUsers: Record<string, User & { password: string }> = {
  'admin@example.com': {
    id: '1',
    email: 'admin@example.com',
    password: 'admin123',
    name: 'Admin User',
    role: 'admin',
    createdAt: new Date().toISOString(),
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Admin',
  },
  'manager@example.com': {
    id: '2',
    email: 'manager@example.com',
    password: 'manager123',
    name: 'Project Manager',
    role: 'manager',
    createdAt: new Date().toISOString(),
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Manager',
  },
  'user@example.com': {
    id: '3',
    email: 'user@example.com',
    password: 'user123',
    name: 'John Doe',
    role: 'user',
    createdAt: new Date().toISOString(),
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=User',
  },
};

const USERS_STORAGE_KEY = 'pm_registered_users';

const normalizeEmail = (email: string) => email.trim().toLowerCase();

const getStoredUsers = (): Record<string, User & { password: string }> => {
  if (typeof window === 'undefined') {
    return {};
  }

  try {
    return JSON.parse(localStorage.getItem(USERS_STORAGE_KEY) || '{}');
  } catch {
    return {};
  }
};

const saveStoredUsers = (users: Record<string, User & { password: string }>) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
  }
};

const getAllUsers = () => ({
  ...mockUsers,
  ...getStoredUsers(),
});

// Simulate API delay
const delay = (ms: number = 500) => new Promise((resolve) => setTimeout(resolve, ms));

const generateMockToken = (userId: string): string => {
  const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
  const payload = btoa(JSON.stringify({ sub: userId, iat: Date.now() }));
  const signature = btoa('mock-signature');
  return `${header}.${payload}.${signature}`;
};

export const authService = {
  async login(data: LoginRequest): Promise<AuthResponse> {
    await delay();

    const email = normalizeEmail(data.email);
    const user = getAllUsers()[email];
    if (!user || user.password !== data.password) {
      throw new Error('Invalid email or password');
    }

    const { password, ...userWithoutPassword } = user;
    const token = generateMockToken(user.id);

    return {
      token,
      user: userWithoutPassword,
    };
  },

  async register(data: RegisterRequest): Promise<AuthResponse> {
    await delay();

    const email = normalizeEmail(data.email);
    const users = getAllUsers();

    if (users[email]) {
      throw new Error('Email already exists');
    }

    if (data.password !== data.confirmPassword) {
      throw new Error('Passwords do not match');
    }

    if (data.password.length < 6) {
      throw new Error('Password must be at least 6 characters');
    }

    const newUser: User & { password: string } = {
      id: String(Object.keys(users).length + 1),
      email,
      password: data.password,
      name: data.name,
      role: 'user',
      createdAt: new Date().toISOString(),
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${data.name}`,
    };

    const storedUsers = getStoredUsers();
    storedUsers[email] = newUser;
    saveStoredUsers(storedUsers);
    const { password, ...userWithoutPassword } = newUser;
    const token = generateMockToken(newUser.id);

    return {
      token,
      user: userWithoutPassword,
    };
  },

  async resetPassword(email: string): Promise<void> {
    await delay();
    if (!getAllUsers()[normalizeEmail(email)]) {
      throw new Error('Email not found');
    }
    // Frontend demo only. A real reset email requires a backend email provider.
    console.log(`Reset link sent to ${email}`);
  },

  async emailExists(email: string): Promise<boolean> {
    await delay(150);
    return Boolean(getAllUsers()[normalizeEmail(email)]);
  },

  async getCurrentUser(): Promise<User> {
    await delay();
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    if (!token) {
      throw new Error('Not authenticated');
    }
    
    const userData = typeof window !== 'undefined' ? localStorage.getItem('user') : null;
    if (!userData) {
      throw new Error('User data not found');
    }
    
    return JSON.parse(userData);
  },
};
