import { initializeApp, getApps, FirebaseApp } from 'firebase/app';
import { getFirebaseConfig } from './config';

import {
  useFirebaseApp,
  useFirestore,
  useAuth,
} from './provider';

import { useUser } from './auth/use-user';
import { useCollection } from './firestore/use-collection';
import { useDoc } from './firestore/use-doc';

function initializeFirebase(): FirebaseApp {
  const apps = getApps();
  if (apps.length > 0) {
    return apps[0];
  }
  const firebaseConfig = getFirebaseConfig();
  return initializeApp(firebaseConfig);
}

export {
  initializeFirebase,
  useFirebaseApp,
  useFirestore,
  useAuth,
  useUser,
  useCollection,
  useDoc
};
