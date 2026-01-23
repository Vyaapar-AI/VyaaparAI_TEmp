'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { useRouter } from 'next/navigation';
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
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || '';
  const storeId = process.env.NEXT_PUBLIC_STORE_ID;

  const getUrlWithStore = useCallback((path: string) => {
    if (!storeId) {
      throw new Error("Store ID is not configured. Please set NEXT_PUBLIC_STORE_ID in your .env file.");
    }
    const newPath = path.replace('/api/', `/api/${storeId}/`);
    return `${apiBaseUrl}${newPath}`;
  }, [apiBaseUrl, storeId]);

  useEffect(() => {
    const checkLoggedInUser = async () => {
        const storedToken = localStorage.getItem('authToken');
        if (storedToken) {
            const url = getUrlWithStore('/api/user');
            try {
              const res = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token: storedToken }),
              });
              if (res.ok) {
                const data = await res.json();
                setUser(data);
                setToken(storedToken);
              } else {
                console.error(`Failed to verify token. Status: ${res.status}`);
                setUser(null);
                setToken(null);
                localStorage.removeItem('authToken');
              }
            } catch (error) {
              console.error(`Failed to fetch user from ${url}. This is often a CORS issue or the backend server may not be running. Please check your backend's logs.`, error);
              setUser(null);
              setToken(null);
              localStorage.removeItem('authToken');
            } finally {
              setLoading(false);
            }
        } else {
            setLoading(false);
        }
    };
    checkLoggedInUser();
  }, [getUrlWithStore]);

  const login = async (email: string, password: string) => {
    const res = await fetch(getUrlWithStore('/api/login'), {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
      },
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
    } else {
        const error = await res.json();
        throw new Error(error.message || 'Failed to log in');
    }
  };

  const register = async (name: string, email: string, password: string) => {
    const res = await fetch(getUrlWithStore('/api/register'), {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
    });

    if (res.ok) {
        const { user: userData, token: authToken } = await res.json();
        setUser(userData);
        setToken(authToken);
        localStorage.setItem('authToken', authToken);
        router.push('/');
    } else {
        const error = await res.json();
        throw new Error(error.message || 'Failed to register');
    }
  };


  const logout = async () => {
    if (token) {
        try {
            await fetch(getUrlWithStore('/api/logout'), { 
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token })
            });
        } catch (e) {
            console.error('Logout failed', e)
        }
    }
    setUser(null);
    setToken(null);
    localStorage.removeItem('authToken');
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, logout, register }}>
      {children}
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
