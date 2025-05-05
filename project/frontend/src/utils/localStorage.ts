import { Project, Task, User } from '../types';

// User storage
export const getUsers = (): User[] => {
  const users = localStorage.getItem('users');
  return users ? JSON.parse(users) : [];
};

export const saveUser = (user: User): void => {
  const users = getUsers();
  users.push(user);
  localStorage.setItem('users', JSON.stringify(users));
};

export const getUserByEmail = (email: string): User | undefined => {
  const users = getUsers();
  return users.find((user) => user.email === email);
};

// Authentication
export const saveAuth = (userId: string): void => {
  localStorage.setItem('currentUser', userId);
};

export const getCurrentUserId = (): string | null => {
  return localStorage.getItem('currentUser');
};

export const getCurrentUser = (): User | null => {
  const userId = getCurrentUserId();
  if (!userId) return null;
  
  const users = getUsers();
  return users.find((user) => user.id === userId) || null;
};

export const removeAuth = (): void => {
  localStorage.removeItem('currentUser');
};

// Projects
export const getProjects = (): Project[] => {
  const projects = localStorage.getItem('projects');
  return projects ? JSON.parse(projects) : [];
};

export const getUserProjects = (userId: string): Project[] => {
  const projects = getProjects();
  return projects.filter(project => project.userId === userId);
};

export const saveProject = (project: Project): void => {
  const projects = getProjects();
  projects.push(project);
  localStorage.setItem('projects', JSON.stringify(projects));
};

export const deleteProject = (projectId: string): void => {
  const projects = getProjects();
  const filteredProjects = projects.filter(project => project.id !== projectId);
  localStorage.setItem('projects', JSON.stringify(filteredProjects));
  
  // Also delete all tasks associated with this project
  const tasks = getTasks();
  const filteredTasks = tasks.filter(task => task.projectId !== projectId);
  localStorage.setItem('tasks', JSON.stringify(filteredTasks));
};

export const getProjectById = (projectId: string): Project | undefined => {
  const projects = getProjects();
  return projects.find(project => project.id === projectId);
};

// Tasks
export const getTasks = (): Task[] => {
  const tasks = localStorage.getItem('tasks');
  return tasks ? JSON.parse(tasks) : [];
};

export const getProjectTasks = (projectId: string): Task[] => {
  const tasks = getTasks();
  return tasks.filter(task => task.projectId === projectId);
};

export const saveTask = (task: Task): void => {
  const tasks = getTasks();
  const index = tasks.findIndex(t => t.id === task.id);
  
  if (index >= 0) {
    // Update existing task
    tasks[index] = task;
  } else {
    // Add new task
    tasks.push(task);
  }
  
  localStorage.setItem('tasks', JSON.stringify(tasks));
};

export const deleteTask = (taskId: string): void => {
  const tasks = getTasks();
  const filteredTasks = tasks.filter(task => task.id !== taskId);
  localStorage.setItem('tasks', JSON.stringify(filteredTasks));
};

// Generate a random ID
export const generateId = (): string => {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};