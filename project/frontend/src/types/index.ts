export interface User {
  id: string;
  name: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  confirmPassword?: string; // Optional for compatibility
}

export interface Project {
  id: string;
  name: string;
  userId: string;
  createdAt: string;
  startDate: string;
  endDate: string;
  description: string;
}

export type TaskPriority = 'low' | 'medium' | 'high';
export type TaskStatus = 'backlog' | 'in-progress' | 'done';

export interface Task {
  id: string;
  title: string;
  description?: string;
  projectId: string;
  dueDate: string;
  priority: TaskPriority;
  status: TaskStatus;
  createdAt: string;
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: Omit<User, 'id'> & { password: string; confirmPassword: string }) => Promise<void>;
  logout: () => void;
}