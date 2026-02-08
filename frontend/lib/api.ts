import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
interface RegisterData { full_name: string; email: string; password: string; }
interface LoginData { email: string; password: string; }

export const authAPI = {
  register: (data: RegisterData) => api.post('/auth/register', data),
  login: (data: LoginData) => api.post('/auth/login', data),
  logout: () => { localStorage.removeItem('token'); },
  getProfile: () => api.get('/auth/profile'),
};

// Tasks API
export const tasksAPI = {
  getTasks: () => api.get('/tasks'),
  createTask: (taskData: any) => api.post('/tasks', taskData),
  updateTask: (taskId: string, taskData: any) => api.put(`/tasks/${taskId}`, taskData),
  deleteTask: (taskId: string) => api.delete(`/tasks/${taskId}`),
  toggleTask: (taskId: string) => api.patch(`/tasks/${taskId}/toggle`),
};

export default api;
