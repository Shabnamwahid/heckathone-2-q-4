'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { authClient } from '../lib/auth-client';

interface User {
  id: string;
  email: string;
  full_name: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (fullName: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Load token & user from Better Auth on mount
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const session = await authClient.getSession();
        if (session?.session) {
          setToken(session.session.token);
          setUser({
            id: session.user.id,
            email: session.user.email,
            full_name: session.user.name || session.user.email,
          });
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  // ✅ LOGIN FUNCTION
  const login = async (email: string, password: string) => {
    try {
      const response = await authClient.signIn.email({
        email,
        password,
        callbackURL: '/dashboard',
      });

      if (response?.session) {
        setToken(response.session.token);
        setUser({
          id: response.user.id,
          email: response.user.email,
          full_name: response.user.name || response.user.email,
        });
      }
    } catch (error: any) {
      console.error('Login error:', error);
      throw error;
    }
  };

  // ✅ REGISTER FUNCTION (auto login)
  const register = async (fullName: string, email: string, password: string) => {
    try {
      const response = await authClient.signUp.email({
        email,
        password,
        name: fullName,
        callbackURL: '/dashboard',
      });

      if (response?.session) {
        setToken(response.session.token);
        setUser({
          id: response.user.id,
          email: response.user.email,
          full_name: response.user.name || response.user.email,
        });
      }
    } catch (error: any) {
      console.error('Registration error:', error);
      throw error;
    }
  };

  // ✅ LOGOUT
  const logout = async () => {
    try {
      await authClient.signOut();
      setToken(null);
      setUser(null);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const isAuthenticated = !!token;

  if (loading) return <div>Loading...</div>;

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};
