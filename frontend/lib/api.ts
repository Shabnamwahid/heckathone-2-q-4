// lib/api.ts
import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle token expiration
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear token and redirect to login
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;

// Auth API functions
export const authAPI = {
  register: (userData: { full_name: string; email: string; password: string }) =>
    api.post('/auth/register', userData),

  login: (credentials: { email: string; password: string }) =>
    api.post('/auth/login', credentials),

  logout: () => {
    localStorage.removeItem('token');
  },

  getProfile: () => api.get('/auth/profile'),
};

// Tasks API functions
export const tasksAPI = {
  getTasks: () => api.get('/api/tasks'),

  createTask: (taskData: { title: string; description: string }) =>
    api.post('/api/tasks', taskData),

  updateTask: (taskId: string, taskData: { title?: string; description?: string }) =>
    api.put(`/api/tasks/${taskId}`, taskData),

  deleteTask: (taskId: string) => api.delete(`/api/tasks/${taskId}`),

  toggleTask: (taskId: string) => api.patch(`/api/tasks/${taskId}/toggle`),
};