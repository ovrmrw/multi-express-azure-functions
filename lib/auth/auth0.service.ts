const auth0HookFunction = require('azure-functions-auth0');

import { NestedAzureFunction } from '../../types';
import { wrapper } from '../utils';
import { auth0ClientId, auth0ClientSecret, auth0Domain } from '../const';


export let auth0AuthenticationHook: NestedAzureFunction;

require('dotenv').config();
if (process.env.NODE_ENV === 'local') {
  auth0AuthenticationHook = wrapper;
  console.info('======= auth0AuthenticationHook is now mocked. =======');
} else {
  auth0AuthenticationHook = auth0HookFunction({
    clientId: auth0ClientSecret,
    clientSecret: auth0ClientSecret,
    domain: auth0Domain,
  });
}
