const uuid = require('uuid');

import { firebaseFactory } from '../lib/firebase';

const firebaseApp = firebaseFactory(uuid());


export async function createCustomToken(user_id: string): Promise<string> {
  const customToken: string = await firebaseApp.auth().createCustomToken(user_id);
  return customToken;
}
