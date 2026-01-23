'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import type { User } from '@/lib/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getAuthUser } from '@/lib/api';

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  login: (credentials: { email: string, password: string }) => Promise<any>;
  logout: () => Promise<any>;
  register: (details: { name: string, email: string, password: string }) => Promise<any>;
  loginMutation: ReturnType<typeof useMutation>;
  registerMutation: ReturnType<typeof useMutation>;
  logoutMutation: ReturnType<typeof useMutation>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:9002';
const storeId = process.env.NEXT_PUBLIC_STORE_ID || 'default-store';

export function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();
  const [token, setToken] = useState<string | null>(() => {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('authToken');
  });

  const { data: user, isLoading: isUserLoading, isError } = useQuery({
    queryKey: ['user', token],
    queryFn: () => getAuthUser(token!),
    enabled: !!token,
    retry: 1,
  });

  useEffect(() => {
    if (isError) {
      setToken(null);
      localStorage.removeItem('authToken');
      queryClient.invalidateQueries({ queryKey: ['user'] });
    }
  }, [isError, queryClient]);


  const handleAuthSuccess = (data: { token: string, user: User }) => {
    setToken(data.token);
    localStorage.setItem('authToken', data.token);
    queryClient.setQueryData(['user', data.token], data.user);
    const redirect = searchParams.get('redirect');
    router.push(redirect || '/');
  };
  
  const loginMutation = useMutation({
    mutationFn: async (credentials: { email: string, password: string }) => {
      const res = await fetch(`${apiBaseUrl}/api/${storeId}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      });
      if (!res.ok) throw new Error((await res.json()).message || 'Login failed');
      return res.json();
    },
    onSuccess: handleAuthSuccess,
  });

  const registerMutation = useMutation({
    mutationFn: async (details: { name: string, email: string, password: string }) => {
       const res = await fetch(`${apiBaseUrl}/api/${storeId}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(details),
    });
      if (!res.ok) throw new Error((await res.json()).message || 'Registration failed');
      return res.json();
    },
    onSuccess: handleAuthSuccess,
  });

  const logoutMutation = useMutation({
    mutationFn: async () => {
      if (token) {
        try {
            await fetch(`${apiBaseUrl}/api/${storeId}/logout`, { 
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token })
            });
        } catch (e) { console.error('Logout failed on server', e) }
      }
    },
    onSuccess: () => {
      setToken(null);
      localStorage.removeItem('authToken');
      queryClient.clear(); // Clear all query data on logout
      router.push('/login');
    },
  });

  const value = {
    user: user ?? null,
    token,
    isLoading: isUserLoading,
    login: loginMutation.mutateAsync,
    logout: logoutMutation.mutateAsync,
    register: registerMutation.mutateAsync,
    loginMutation,
    registerMutation,
    logoutMutation
  };

  return (
    <AuthContext.Provider value={value}>
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
