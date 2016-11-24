import * as Hapi from 'hapi';
import * as Joi from 'joi';

import { firebaseApp } from '../lib/firebase';


export const routes: Hapi.IRouteConfiguration[] = [];


routes.push({
  method: ['GET', 'POST'],
  path: '/hello',
  handler: (req, reply) => {
    // console.log('body:', request.payload);
    // console.log('query:', request.query);
    // console.log('params:', request.params);
    // console.log('headers:', request.headers);
    const name = req.payload && req.payload.name ? req.payload.name : req.query.name;
    reply({ message: 'hello world, ' + name });
  },
  config: {
    auth: false,
  }
});


routes.push({
  method: 'POST',
  path: '/createCustomToken',
  handler: async (req, reply) => {
    const uid: string = req.payload.user_id;
    const customToken: string = await firebaseApp.auth().createCustomToken(uid);
    reply({ customToken });
  },
  config: {
    validate: {
      payload: {
        user_id: Joi.string().min(1).required(),
      }
    }
  }
});
