const auth0HookFunction = require('azure-functions-auth0');

import { NestedAzureFunction } from '../../types';
import { wrapper } from '../utils';
import { appSecretKeyJson } from '../const';

const clientId = appSecretKeyJson.auth0.clientId;
const clientSecret = appSecretKeyJson.auth0.clientSecret;
const domain = appSecretKeyJson.auth0.domain;

if ([clientId, clientSecret, domain].some(key => !key)) {
  throw new Error('Env keys for Auth0 are not collected.');
}


export let auth0AuthenticationHook: NestedAzureFunction;

require('dotenv').config();
if (process.env.NODE_ENV === 'local') {
  auth0AuthenticationHook = wrapper;
  console.info('======= auth0AuthenticationHook is now mocked. =======');
} else {
  auth0AuthenticationHook = auth0HookFunction({
    clientId,
    clientSecret,
    domain,
  });
}
