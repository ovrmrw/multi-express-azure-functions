import * as firebase from 'firebase';

import { firebaseDatabaseURL, firebaseServiceAccountKeyJson } from '../const';


let firebaseApp: firebase.app.App;

export function firebaseFactory(instanceName: string): firebase.app.App {
  const name = instanceName || '__DEFAULT__';
  if (!firebaseApp) {
    firebaseApp = firebase.initializeApp({
      serviceAccount: firebaseServiceAccountKeyJson,
      databaseURL: firebaseDatabaseURL,
    }, name);
  }
  return firebaseApp;
}
