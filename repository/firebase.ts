import { getFirebaseApp } from '../lib/firebase';


export async function createCustomToken(user_id: string): Promise<string> {
  const customToken: string = await getFirebaseApp().auth().createCustomToken(user_id);
  return customToken;
}
