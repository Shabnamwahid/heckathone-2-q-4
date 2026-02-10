import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add JWT token from localStorage
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
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
      // Clear auth token and redirect to login
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user_id');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Authentication API
export const authAPI = {
  login: (email: string, password: string) =>
    api.post('/auth/login', { username: email, password }),
  register: (fullName: string, email: string, password: string) =>
    api.post('/auth/register', { full_name: fullName, email, password }),
  getMe: () =>
    api.get('/auth/me'),
};

// Tasks API - Updated to use user_id in path
export const tasksAPI = {
  getTasks: (userId: string) => api.get(`/api/${userId}/tasks`),
  createTask: (userId: string, taskData: any) => api.post(`/api/${userId}/tasks`, taskData),
  updateTask: (userId: string, taskId: string, taskData: any) => api.put(`/api/${userId}/tasks/${taskId}`, taskData),
  deleteTask: (userId: string, taskId: string) => api.delete(`/api/${userId}/tasks/${taskId}`),
  toggleTask: (userId: string, taskId: string) => api.patch(`/api/${userId}/tasks/${taskId}/toggle`),
};

export default api;
