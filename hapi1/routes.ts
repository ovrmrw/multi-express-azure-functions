import * as Hapi from 'hapi';
import * as Joi from 'joi';

import { createCustomToken, createHelloMessage, createWelcomeMessage } from '../repository';

export const routes: Hapi.IRouteConfiguration[] = [];


routes.push({
  method: ['GET','POST'],
  path: '/',
  handler: (req, reply) => {
    try {
      const message = createWelcomeMessage();
      reply({ message });
    } catch (error) {
      reply({ error }).code(500);
    }
  },
  config: {
    auth: false
  }
});


routes.push({
  method: ['GET', 'POST'],
  path: '/hello',
  handler: (req, reply) => {
    try {
      const name = req.payload && req.payload.name ? req.payload.name : req.query.name;
      const message = createHelloMessage(name);
      reply({ message });
    } catch (error) {
      reply({ error }).code(500);
    }
  },
  config: {
    auth: false
  }
});


routes.push({
  method: 'POST',
  path: '/createCustomToken',
  handler: async (req, reply) => {
    // lazy loading for FAT Firebase library.
    // const firebaseFactory = require('../lib/firebase').firebaseFactory;
    // const firebaseApp = firebaseFactory('hapi1');
    try {
      const uid: string = req.payload.user_id;
      const customToken: string = await createCustomToken(uid);
      reply({ customToken });
    } catch (error) {
      reply({ error }).code(500);
    }
  },
  config: {
    validate: {
      payload: {
        user_id: Joi.string().min(1).required(),
      }
    }
  }
});
