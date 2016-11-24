require('dotenv').config();

import * as express from 'express';
import * as bodyParser from 'body-parser';
const jwt = require('express-jwt');

import { router, unlockPaths } from './routes';
import { auth0ClientId, auth0ClientSecret } from '../lib/const';


const app = express();

const port = 0; // dynamic
const host = 'localhost';


const jwtCheck = jwt({
  secret: new Buffer(auth0ClientSecret, 'base64'),
  audience: auth0ClientId,
});


if (process.env.NODE_ENV === 'local') {
  console.log('\n=======================================');
  console.log('**  Authentication is now disabled.  **');
  console.log('=======================================\n');
} else {
  app.use(jwtCheck.unless({ path: unlockPaths }));
}


app.use(bodyParser.json());


app.use('/', router);


export const uriAsPromise = new Promise<string>((resolve, reject) => {
  const server = app.listen(port, host, (err) => {
    if (err) {
      reject(err);
      throw err;
    }
    const uri = 'http://' + server.address().address + ':' + server.address().port;
    console.log('Server running at:', uri);
    resolve(uri);
  });
});
