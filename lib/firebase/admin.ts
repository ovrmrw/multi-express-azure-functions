const appRootDir = require('app-root-path').path;
const secretKeyDir = appRootDir + '/secret-key';

// import * as admin from 'firebase-admin';
const admin = require('firebase-admin');

import { appSecretKeyJson, serviceAccountKeyJson } from '../const';

const databaseURL = appSecretKeyJson.firebase.databaseUrl;

if ([databaseURL].some(key => !key)) {
  throw new Error('Env keys for Firebase are not collected.');
}


export const firebaseApp = admin.initializeApp({
  credential: admin.credential.cert(serviceAccountKeyJson),
  databaseURL,
});
