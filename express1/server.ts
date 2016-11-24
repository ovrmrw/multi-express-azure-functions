require('dotenv').config();

import * as express from 'express';
import * as bodyParser from 'body-parser';
const jwt = require('express-jwt');

import { firebaseApp } from '../lib/firebase';
import { auth0ClientId, auth0ClientSecret, auth0Domain } from '../lib/const';


const app = express();
const port = 0; // dynamic
const host = 'localhost';


const jwtCheck = jwt({
  secret: new Buffer(auth0ClientSecret, 'base64'),
  audience: auth0ClientId,
  // issuer: 'https://' + auth0Domain + '/',
});

if (process.env.NODE_ENV === 'local') {
  console.log('\n=======================================');
  console.log('**  Authentication is now disabled.  **');
  console.log('=======================================\n');
} else {
  const unauthPaths = ['/hello'];
  app.use(jwtCheck.unless({ path: unauthPaths }));
}

app.use(bodyParser.json());


app.get('/hello', (req, res) => {
  try {
    const name = req.body && req.body.name ? req.body.name : req.query.name;
    res.json({ message: 'hello world, ' + name });
  } catch (error) {
    res.status(500).json({ error });
  }
});


app.post('/createCustomToken', async (req, res) => {
  try {
    const uid: string = req.body.user_id;
    const customToken: string = await firebaseApp.auth().createCustomToken(uid);
    res.json({ customToken });
  } catch (error) {
    res.status(500).json({ error });
  }
});


app.use((error, req, res, next) => {
  // console.log('error:', error);
  res.status(error.status).json({ error });
});


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
