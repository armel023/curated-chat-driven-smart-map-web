"use client";
import React, { createContext, useContext, useState, ReactNode } from 'react';

export type UserRole = 'admin' | 'user' | 'guest';

export interface User {
  id: string;
  email: string;
  role: UserRole;
  name: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string, name: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isUser: boolean;
  isGuest: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Mock login logic
    if (email === 'admin@example.com' && password === 'admin') {
      setUser({
        id: '1',
        email: 'admin@example.com',
        role: 'admin',
        name: 'Admin User',
      });
      return true;
    } else if (email && password) {
      setUser({
        id: '2',
        email: email,
        role: 'user',
        name: email.split('@')[0],
      });
      return true;
    }
    return false;
  };

  const register = async (email: string, password: string, name: string): Promise<boolean> => {
    // Mock registration
    if (email && password && name) {
      setUser({
        id: Math.random().toString(36),
        email,
        role: 'user',
        name,
      });
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  const value: AuthContextType = {
    user,
    login,
    register,
    logout,
    isAuthenticated: user !== null,
    isAdmin: user?.role === 'admin',
    isUser: user?.role === 'user',
    isGuest: user === null,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
