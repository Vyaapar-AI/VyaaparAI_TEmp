'use client';
import {
  collection,
  onSnapshot,
  query,
  Query,
  DocumentData,
  FirestoreError,
  QuerySnapshot,
} from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useFirestore } from '../provider';
import { useMemoFirebase } from '../utils';

interface CollectionData<T> {
  data: T[];
  loading: boolean;
  error: FirestoreError | null;
}

export function useCollection<T>(pathOrQuery: string | Query | null): CollectionData<T> {
  const firestore = useFirestore();
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<FirestoreError | null>(null);

  const finalQuery = useMemoFirebase(() => {
    if (!firestore || !pathOrQuery) return null;
    if (typeof pathOrQuery === 'string') {
      return query(collection(firestore, pathOrQuery));
    }
    return pathOrQuery;
  }, [firestore, pathOrQuery]);

  useEffect(() => {
    if (!finalQuery) {
      // If there's no query (e.g., user not logged in), don't keep loading.
      setLoading(false);
      setData([]);
      return;
    }

    setLoading(true);
    const unsubscribe = onSnapshot(
      finalQuery,
      (snapshot: QuerySnapshot<DocumentData>) => {
        const result: T[] = [];
        snapshot.forEach((doc) => {
          result.push({ id: doc.id, ...doc.data() } as T);
        });
        setData(result);
        setLoading(false);
        setError(null);
      },
      (err: FirestoreError) => {
        console.error(err);
        setError(err);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [finalQuery]);

  return { data, loading, error };
}
