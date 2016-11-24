import { Router } from 'express';

import { firebaseApp } from '../lib/firebase';


export const router = Router();

export const unlockPaths: string[] = [
  '/hello',
];


router.all('/hello', async (req, res) => {
  try {
    const name = req.body && req.body.name ? req.body.name : req.query.name;
    res.json({ message: 'hello world, ' + name });
  } catch (error) {
    res.status(500).json({ error });
  }
});


router.post('/createCustomToken', async (req, res) => {
  try {
    const uid: string = req.body.user_id;
    const customToken: string = await firebaseApp.auth().createCustomToken(uid);
    res.json({ customToken });
  } catch (error) {
    res.status(500).json({ error });
  }
});


router.use((error, req, res, next) => {
  // console.log('error:', error);
  res.status(error.status).json({ error });
});
