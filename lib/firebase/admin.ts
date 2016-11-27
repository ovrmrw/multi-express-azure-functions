import * as admin from 'firebase-admin';
const uuid = require('uuid');

import { firebaseDatabaseURL, firebaseServiceAccountKeyJson } from '../const';


let firebaseApp: any;

export function getFirebaseApp(): any {
  const name = uuid();
  if (!firebaseApp) {
    console.time('admin.initializeApp');
    firebaseApp = admin.initializeApp({
      credential: admin.credential.cert(firebaseServiceAccountKeyJson),
      databaseURL: firebaseDatabaseURL,
    }, name);
    console.timeEnd('admin.initializeApp');
  }
  return firebaseApp;
}
