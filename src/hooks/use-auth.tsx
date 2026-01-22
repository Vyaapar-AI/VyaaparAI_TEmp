'use client';

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface User {
  uid: string;
  displayName: string;
  email: string;
  photoURL?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const mockUser: User = {
    uid: 'mock-user-id',
    displayName: 'John Doe',
    email: 'john.doe@example.com',
    photoURL: 'https://picsum.photos/seed/user/40/40'
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // In a real app, you'd check for a session token here
    setLoading(false);
  }, []);

  const login = () => {
    setLoading(true);
    // In a real app, you'd make an API call to your backend
    setTimeout(() => {
        setUser(mockUser);
        setLoading(false);
    }, 500);
  };

  const logout = () => {
    // In a real app, you'd make an API call to your backend
    setUser(null);
    router.push('/');
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
