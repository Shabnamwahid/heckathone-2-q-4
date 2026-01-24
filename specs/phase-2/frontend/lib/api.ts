import axios from 'axios';

// Create axios instance with base configuration
const apiClient = axios.create({
  baseURL: 'http://localhost:8000',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add JWT token to requests
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('jwt_token');
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
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid, redirect to login
      localStorage.removeItem('jwt_token');
      window.location.href = '/auth/login';
    }
    return Promise.reject(error);
  }
);

export default apiClient;

// Define API methods
export const authAPI = {
  login: (email: string, password: string) => 
    apiClient.post('/auth/login', { email, password }),
  
  register: (email: string, password: string, name: string) => 
    apiClient.post('/auth/register', { email, password, name }),
  
  logout: () => {
    localStorage.removeItem('jwt_token');
  },
  
  getCurrentUser: () => 
    apiClient.get('/auth/me'),
};

export const tasksAPI = {
  getAll: () => 
    apiClient.get('/api/tasks'),
  
  getById: (id: string) => 
    apiClient.get(`/api/tasks/${id}`),
  
  create: (data: { title: string; description?: string; completed?: boolean }) => 
    apiClient.post('/api/tasks', data),
  
  update: (id: string, data: Partial<{ title: string; description?: string; completed?: boolean }>) => 
    apiClient.put(`/api/tasks/${id}`, data),
  
  delete: (id: string) => 
    apiClient.delete(`/api/tasks/${id}`),
  
  toggleComplete: (id: string) => 
    apiClient.patch(`/api/tasks/${id}/complete`),
};