'use client';

import { useEffect } from 'react';
import { useErrorHandler } from 'react-error-boundary';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';

export function FirebaseErrorListener() {
  const handleError = useErrorHandler();

  useEffect(() => {
    const handlePermissionError = (error: FirestorePermissionError) => {
      handleError(error);
    };

    errorEmitter.on('permission-error', handlePermissionError);

    return () => {
      errorEmitter.off('permission-error', handlePermissionError);
    };
  }, [handleError]);

  return null;
}
