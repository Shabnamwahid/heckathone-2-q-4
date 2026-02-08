import axios from 'axios';
import { authClient } from './auth-client';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add Better Auth token
api.interceptors.request.use(
  async (config) => {
    const session = await authClient.getSession();
    if (session?.session?.token) {
      config.headers.Authorization = `Bearer ${session.session.token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Sign out user if unauthorized
      authClient.signOut();
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Tasks API - Updated to use user_id in path
export const tasksAPI = {
  getTasks: (userId: string) => api.get(`/api/${userId}/tasks`),
  createTask: (userId: string, taskData: any) => api.post(`/api/${userId}/tasks`, taskData),
  updateTask: (userId: string, taskId: string, taskData: any) => api.put(`/api/${userId}/tasks/${taskId}`, taskData),
  deleteTask: (userId: string, taskId: string) => api.delete(`/api/${userId}/tasks/${taskId}`),
  toggleTask: (userId: string, taskId: string) => api.patch(`/api/${userId}/tasks/${taskId}/toggle`),
};

export default api;
