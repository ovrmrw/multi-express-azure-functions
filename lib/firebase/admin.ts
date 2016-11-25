// const appRootDir = require('app-root-path').path;
// const secretKeyDir = appRootDir + '/secret-key';

// import * as admin from 'firebase-admin';
const admin = require('firebase-admin');

import { firebaseDatabaseURL, firebaseServiceAccountKeyJson } from '../const';


export const firebaseApp = admin.initializeApp({
  credential: admin.credential.cert(firebaseServiceAccountKeyJson),
  databaseURL: firebaseDatabaseURL,
});
