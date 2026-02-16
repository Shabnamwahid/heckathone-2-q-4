"use client";

import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import axios from 'axios';
import { createAuthClient } from "better-auth/client";
import { jwtClient } from "better-auth/client/plugins";

// Initialize Better Auth client with JWT plugin
const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL || "http://127.0.0.1:3001",
  plugins: [
    jwtClient()
  ]
});

interface User {
  id: string;
  email: string;
  full_name?: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, fullName: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000',
});

// Attach token automatically
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

// Handle 401
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error)
  }
);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // Load user from localStorage
  useEffect(() => {
    const storedToken = localStorage.getItem('auth_token');
    const storedUser = localStorage.getItem('user');

    if (storedToken && storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setToken(storedToken);
        setUser(parsedUser);
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Error parsing stored user:', error);
        localStorage.removeItem('auth_token');
        localStorage.removeItem('user');
      }
    }
  }, []);

  // LOGIN function using Better Auth
  const login = async (email: string, password: string) => {
    try {
      // Sign in with Better Auth
      const signInResult = await authClient.signIn.email({
        username: email,
        password: password,
      });

      if (signInResult.error) {
        throw new Error(signInResult.error.message || "Login failed");
      }

      // Get JWT token from Better Auth
      const tokenResult = await authClient.token();
      if (tokenResult.error) {
        throw new Error(tokenResult.error.message || "Failed to get token");
      }

      const jwtToken = tokenResult.data?.token;

      // Get user info
      const sessionResult = await authClient.getSession();
      if (sessionResult.error) {
        throw new Error(sessionResult.error.message || "Failed to get session");
      }

      const userData = sessionResult.data?.user;
      if (!userData) {
        throw new Error("No user data received");
      }

      // Store token and user data
      localStorage.setItem("auth_token", jwtToken);
      const userObj = { 
        id: userData.id, 
        email: userData.email, 
        full_name: userData.name 
      };
      localStorage.setItem("user", JSON.stringify(userObj));
      
      setToken(jwtToken);
      setUser(userObj);
      setIsAuthenticated(true);
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };

  // REGISTER function using Better Auth
  const register = async (email: string, password: string, fullName: string) => {
    try {
      // Register with Better Auth
      const registerResult = await authClient.signUp.email({
        email,
        password,
        name: fullName,
      });

      if (registerResult.error) {
        throw new Error(registerResult.error.message || "Registration failed");
      }

      // Automatically login after registration
      await login(email, password);
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  };

  // LOGOUT function
  const logout = () => {
    // Sign out from Better Auth
    authClient.signOut();

    // Clear local storage
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user');
    
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{ user, token, isAuthenticated, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Hook to use auth
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider');
  }
  return context;
};
