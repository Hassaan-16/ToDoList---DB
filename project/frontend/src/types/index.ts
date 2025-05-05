export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

export interface Project {
  id: string;
  name: string;
  userId: string;
  createdAt: string;
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
  register: (userData: Omit<User, 'id'> & { password: string }) => Promise<void>;
  logout: () => void;
}