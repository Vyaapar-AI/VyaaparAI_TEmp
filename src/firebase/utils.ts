import { useMemo } from 'react';
import {
  Query,
  DocumentReference,
  queryEqual,
  refEqual,
} from 'firebase/firestore';

type FirebaseRef = Query | DocumentReference;

let memoized: {
  deps: any[] | undefined;
  obj: FirebaseRef | null;
} = {
  deps: undefined,
  obj: null,
};

export function useMemoFirebase<T extends FirebaseRef | null>(
  factory: () => T,
  deps: any[]
) {
  return useMemo(() => {
    const newObj = factory();

    if (memoized.deps && newObj && memoized.obj && deps.every((d, i) => d === memoized.deps![i])) {
      if (
        (newObj instanceof Query &&
          memoized.obj instanceof Query &&
          queryEqual(newObj, memoized.obj)) ||
        (newObj instanceof DocumentReference &&
          memoized.obj instanceof DocumentReference &&
          refEqual(newObj, memoized.obj))
      ) {
        return memoized.obj as T;
      }
    }

    memoized.deps = deps;
    memoized.obj = newObj;

    return newObj;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
