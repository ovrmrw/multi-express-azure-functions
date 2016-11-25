import * as admin from 'firebase-admin';

import { firebaseDatabaseURL, firebaseServiceAccountKeyJson } from '../const';


let firebaseApp: any;

export function firebaseFactory(instanceName: string): any {
  const name = instanceName || '__DEFAULT__';
  if (!firebaseApp) {
    firebaseApp = admin.initializeApp({
      credential: admin.credential.cert(firebaseServiceAccountKeyJson),
      databaseURL: firebaseDatabaseURL,
    }, name);
  }
  return firebaseApp;
}
