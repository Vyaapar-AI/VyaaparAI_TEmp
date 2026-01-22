'use client';
import React, { useMemo } from 'react';
import { FirebaseProvider } from './provider';
import { initializeFirebase } from './index';

export const FirebaseClientProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const firebaseContext = useMemo(() => {
    try {
      return initializeFirebase();
    } catch (e) {
      console.error('Failed to initialize Firebase. Please check your .env file.', e);
      return { firebaseApp: null, auth: null, firestore: null };
    }
  }, []);

  return (
    <FirebaseProvider value={firebaseContext}>{children}</FirebaseProvider>
  );
};
