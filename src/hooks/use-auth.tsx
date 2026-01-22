'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import type { User } from '@/lib/types';
import { Loader2 } from 'lucide-react';

interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (name: string, email: string, password: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  const fetchUser = useCallback(async (authToken: string) => {
    try {
      const res = await fetch('/api/auth/user', {
        headers: { 'Authorization': `Bearer ${authToken}` }
      });
      if (res.ok) {
        const data = await res.json();
        setUser(data);
        setToken(authToken);
      } else {
        setUser(null);
        setToken(null);
        localStorage.removeItem('authToken');
      }
    } catch (error) {
      console.error('Failed to fetch user', error);
      setUser(null);
      setToken(null);
      localStorage.removeItem('authToken');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const storedToken = localStorage.getItem('authToken');
    if (storedToken) {
      fetchUser(storedToken);
    } else {
      setLoading(false);
    }
  }, [fetchUser]);

  const login = async (email: string, password: string) => {
    setLoading(true);
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (res.ok) {
      const { user: userData, token: authToken } = await res.json();
      setUser(userData);
      setToken(authToken);
      localStorage.setItem('authToken', authToken);

      const params = new URLSearchParams(window.location.search);
      const redirect = params.get('redirect');
      router.push(redirect || '/');
      router.refresh();
    } else {
        const error = await res.json();
        setLoading(false);
        throw new Error(error.message || 'Failed to log in');
    }
  };

  const register = async (name: string, email: string, password: string) => {
    setLoading(true);
    const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
    });

    if (res.ok) {
        const { user: userData, token: authToken } = await res.json();
        setUser(userData);
        setToken(authToken);
        localStorage.setItem('authToken', authToken);
        router.push('/');
        router.refresh();
    } else {
        const error = await res.json();
        setLoading(false);
        throw new Error(error.message || 'Failed to register');
    }
  };


  const logout = async () => {
    if (token) {
        await fetch('/api/auth/logout', { 
            method: 'POST',
            headers: { 'Authorization': `Bearer ${token}` }
        });
    }
    setUser(null);
    setToken(null);
    localStorage.removeItem('authToken');
    if (pathname === '/orders' || pathname === '/checkout') {
        router.push('/');
    } else {
        router.refresh();
    }
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, logout, register }}>
      {loading ? <div className="flex justify-center items-center h-screen"><Loader2 className="h-8 w-8 animate-spin" /></div> : children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
