import { Router } from 'express';
const router = Router();

import { createCustomToken, createHelloMessage, createWelcomeMessage } from '../repository';


export const unlockRoutes: string[] = [
  '/',
  '/hello',
];


router.all('/', (req, res) => {
  try {
    const message = createWelcomeMessage();
    res.json({ message });
  } catch (error) {
    res.status(500).json({ error });
  }
});


router.all('/hello', (req, res) => {
  try {
    const name = req.body && req.body.name ? req.body.name : req.query.name;
    const message = createHelloMessage(name);
    res.json({ message });
  } catch (error) {
    res.status(500).json({ error });
  }
});


router.post('/createCustomToken', async (req, res) => {
  // lazy loading for FAT Firebase library.
  // const firebaseFactory = require('../lib/firebase').firebaseFactory;
  // const firebaseApp = firebaseFactory('express1');
  try {
    const uid: string = req.body.user_id;
    const customToken: string = await createCustomToken(uid);
    res.json({ customToken });
  } catch (error) {
    res.status(500).json({ error });
  }
});


export const routes = router;
