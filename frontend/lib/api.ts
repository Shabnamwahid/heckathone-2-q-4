// lib/api.ts
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

// Helper function to get token from localStorage
const getToken = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('token');
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
    let errorMessage = `HTTP error! status: ${response.status}`;
    try {
      const errorData = await response.json();
      errorMessage = errorData.detail || errorData.message || errorMessage;
    } catch (e) {
      // If response is not JSON, use status text or default message
      errorMessage = response.statusText || errorMessage;
    }
    throw new Error(errorMessage);
  }

  return response.json();
};

// Auth API functions
export const authAPI = {
  login: async (email: string, password: string) => {
    return apiCall('/auth/login', {
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
    return apiCall(`/api/tasks/${taskId}/toggle`, {
      method: 'PATCH',
    });
  },
};