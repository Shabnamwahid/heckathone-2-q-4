
'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { authAPI } from '@/lib/api';

type User = {
  id: string;
  email: string;
  full_name?: string;
};

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (fullName: string, email: string, password: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check if user is already logged in by checking for stored token
    const token = localStorage.getItem('auth_token');
    const storedUser = localStorage.getItem('user');
    
    if (token && storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error('Error parsing stored user:', error);
      }
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await authAPI.login(email, password);
      
      if (response.data.access_token) {
        // Store token and user info
        localStorage.setItem('auth_token', response.data.access_token);
        localStorage.setItem('user_id', response.data.user_id);
        
        const userData = {
          id: response.data.user_id,
          email: response.data.email,
          full_name: response.data.full_name
        };
        
        localStorage.setItem('user', JSON.stringify(userData));
        setUser(userData);
      } else {
        throw new Error('Login failed: No token received');
      }
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const register = async (fullName: string, email: string, password: string) => {
    try {
      const response = await authAPI.register(fullName, email, password);
      
      if (response.data.id) {
        // Auto-login after successful registration
        await login(email, password);
      } else {
        throw new Error('Registration failed');
      }
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  };

  const logout = () => {
    // Clear all stored auth data
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_id');
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used inside AuthProvider');
  }
  return ctx;
}
