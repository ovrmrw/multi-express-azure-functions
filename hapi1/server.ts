require('dotenv').config();

import * as Hapi from 'hapi';
const HapiAuthJwt = require('hapi-auth-jwt2');

import { routes } from './routes';
import { auth0ClientId, auth0ClientSecret } from '../lib/const';


const server = new Hapi.Server();
server.connection({
  host: 'localhost'
});


server.register(HapiAuthJwt, (err) => {
  if (process.env.NODE_ENV === 'local') {
    console.log('\n=======================================');
    console.log('**  Authentication is now disabled.  **');
    console.log('=======================================\n');
  } else {
    server.auth.strategy('token', 'jwt', true, {
      key: new Buffer(auth0ClientSecret, 'base64'),
      verifyOptions: {
        algorithms: ['HS256'],
        audience: auth0ClientId,
      },
      validateFunc: (decoded, request, callback) => {
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
      },
    });
  }

  server.route(routes);
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
