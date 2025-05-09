import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

// User API calls
export const userApi = {
    login: (email: string, password: string) => 
        axios.post(`${API_URL}/users/login`, { email, password }),
    
    register: (name: string, email: string, password: string) =>
        axios.post(`${API_URL}/users`, { name, email, password }),
    
    getUserProjects: (userId: number) =>
        axios.get(`${API_URL}/users/${userId}/projects`),
};

// Project API calls
export const projectApi = {
    createProject: (userId: number, name: string, status: string) =>
        axios.post(`${API_URL}/projects/user/${userId}`, { name, status }),
    
    getProjects: (userId: number) =>
        axios.get(`${API_URL}/projects/user/${userId}`),
    
    getProjectWithTasks: (projectId: number) =>
        axios.get(`${API_URL}/projects/${projectId}/tasks`),
    
    updateProject: (projectId: number, name: string, status: string) =>
        axios.put(`${API_URL}/projects/${projectId}`, { name, status }),
    
    deleteProject: (projectId: number) =>
        axios.delete(`${API_URL}/projects/${projectId}`),
};

// Task API calls
export const taskApi = {
    createTask: (projectId: number, task: {
        name: string,
        description: string,
        dueDate: string,
        status: string,
        priority: string
    }) =>
        axios.post(`${API_URL}/tasks/project/${projectId}`, task),
    
    getTasks: (projectId: number) =>
        axios.get(`${API_URL}/tasks/project/${projectId}`),
    
    getTasksByStatus: (projectId: number, status: string) =>
        axios.get(`${API_URL}/tasks/project/${projectId}/status/${status}`),
    
    getTasksByPriority: (projectId: number, priority: string) =>
        axios.get(`${API_URL}/tasks/project/${projectId}/priority/${priority}`),
    
    getDueTodayTasks: (projectId: number) =>
        axios.get(`${API_URL}/tasks/project/${projectId}/due-today`),
    
    getOverdueTasks: (projectId: number) =>
        axios.get(`${API_URL}/tasks/project/${projectId}/overdue`),
    
    updateTask: (taskId: number, task: {
        name: string,
        description: string,
        dueDate: string,
        status: string,
        priority: string
    }) =>
        axios.put(`${API_URL}/tasks/${taskId}`, task),
    
    deleteTask: (taskId: number) =>
        axios.delete(`${API_URL}/tasks/${taskId}`),
};
