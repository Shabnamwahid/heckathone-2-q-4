// lib/api.ts
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000';

// Helper function to get token from localStorage
const getToken = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('token'); // Using 'token' as stored in login page
  }
  return null;
};

// Generic API call function with error handling
const apiCall = async (endpoint: string, options: RequestInit = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const config: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
    ...options,
  };

  // Add authorization header if token exists
  const token = getToken();
  if (token) {
    (config.headers as Record<string, string>)['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(url, config);
  
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.detail || `HTTP error! status: ${response.status}`);
  }
  
  return response.json();
};

// Auth API functions
export const authAPI = {
  login: async (email: string, password: string) => {
    return apiCall('/auth/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  },

  register: async (email: string, password: string) => {
    return apiCall('/auth/auth/register', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  },
};

// Tasks API functions
export const tasksAPI = {
  getAll: async () => {
    return apiCall('/api/tasks');
  },

  create: async (taskData: { title: string; description?: string; completed?: boolean }) => {
    return apiCall('/api/tasks', {
      method: 'POST',
      body: JSON.stringify(taskData),
    });
  },

  update: async (taskId: string, taskData: Partial<{ title: string; description?: string; completed?: boolean }>) => {
    return apiCall(`/api/tasks/${taskId}`, {
      method: 'PUT',
      body: JSON.stringify(taskData),
    });
  },

  delete: async (taskId: string) => {
    return apiCall(`/api/tasks/${taskId}`, {
      method: 'DELETE',
    });
  },

  toggleComplete: async (taskId: string) => {
    return apiCall(`/api/tasks/${taskId}/complete`, {
      method: 'PATCH',
    });
  },
};