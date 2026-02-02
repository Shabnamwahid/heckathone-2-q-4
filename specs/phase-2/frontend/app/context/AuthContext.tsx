'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';

interface User {
  id: string;
  email: string;
  first_name?: string;
  last_name?: string;
  is_active: boolean;
  is_verified: boolean;
  created_at: string;
  updated_at: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, firstName?: string, lastName?: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check for existing token and user on initial load
    const storedToken = localStorage.getItem('jwt_token');
    if (storedToken) {
      setToken(storedToken);
      // In a real app, we would fetch user info from the backend here
      // For now, we'll just set isAuthenticated to true
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      // In a real app, we would call the backend login API
      // For now, we'll simulate the login process
      const response = {
        data: {
          access_token: 'fake-jwt-token-for-demo',
          user: {
            id: '1',
            email,
            is_active: true,
            is_verified: true,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          }
        }
      };

      const jwtToken = response.data.access_token;
      localStorage.setItem('jwt_token', jwtToken);
      setToken(jwtToken);
      setUser(response.data.user);
      
      router.push('/dashboard');
    } catch (error: any) {
      throw new Error(error.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const register = async (email: string, password: string, firstName?: string, lastName?: string) => {
    setLoading(true);
    try {
      // In a real app, we would call the backend register API
      // For now, we'll simulate the registration process
      const response = {
        data: {
          access_token: 'fake-jwt-token-for-demo',
          user: {
            id: '1',
            email,
            first_name: firstName,
            last_name: lastName,
            is_active: true,
            is_verified: false, // New users are not verified initially
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          }
        }
      };

      const jwtToken = response.data.access_token;
      localStorage.setItem('jwt_token', jwtToken);
      setToken(jwtToken);
      setUser(response.data.user);
      
      router.push('/auth/login');
    } catch (error: any) {
      throw new Error(error.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('jwt_token');
    setToken(null);
    setUser(null);
    router.push('/auth/login');
  };

  const isAuthenticated = !!token;

  const value = {
    user,
    token,
    loading,
    login,
    register,
    logout,
    isAuthenticated
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}