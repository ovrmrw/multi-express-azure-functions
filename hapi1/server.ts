import * as Hapi from 'hapi';
import * as Joi from 'joi';
const HapiAuthJwt = require('hapi-auth-jwt2');

import { firebaseApp } from '../lib/firebase';
import { appSecretKeyJson } from '../lib/const';

const clientId = appSecretKeyJson.auth0.clientId;
const clientSecret = appSecretKeyJson.auth0.clientSecret;
const domain = appSecretKeyJson.auth0.domain;
if ([clientId, clientSecret, domain].some(key => !key)) {
  console.error('Auth0 env keys:', { clientId, clientSecret, domain });
  throw new Error('Env keys for Auth0 is not collected.');
}


const server = new Hapi.Server();
server.connection({
  host: 'localhost'
});


server.register(HapiAuthJwt, (err) => {
  server.auth.strategy('token', 'jwt', true, {
    key: new Buffer(clientSecret, 'base64'),
    verifyOptions: {
      algorithms: ['HS256'],
      audience: clientId,
      issuer: 'https://' + domain + '/',
    },
    validateFunc: validate,
  });


  server.route({
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
      auth: false
    }
  });


  server.route({
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

});


export const uriAsPromise = new Promise<string>((resolve, reject) => {
  server.start((err) => {
    if (err) {
      reject(err);
      throw err;
    }
    console.log('Server running at:', server.info.uri);
    resolve(server.info.uri);
  });
});


function validate(decoded, request, callback) {
  console.log('\ndecoded:', JSON.stringify(decoded, null, 2));
  try {
    if (!decoded.sub) {
      return callback(null, false);
    } else {
      return callback(null, true);
    }
  } catch (err) {
    return callback(err, false);
  }
};
