import * as Hapi from 'hapi';
import * as fetch from 'isomorphic-fetch';

import { AzureFunction } from '../types';
import { passedTimeMessage, logResponse } from '../lib/utils';


const server = new Hapi.Server();
server.connection({
  // host: '0.0.0.0',
  // port: 20000
});

server.route({
  method: 'GET',
  path: '/hello',
  handler: function (request, reply) {
    return reply('hello world');
  }
});

server.start((err) => {
  if (err) {
    throw err;
  }
  console.log('Server running at:', server.info.uri);
});

export const azureFunction: AzureFunction =
  async (context, req) => {
    const result = await fetch(server.info.uri + '/hello')
      .then(res => res.text());
    // server.stop();
    context.log(req.params);

    context.res = {
      status: 200,
      body: result,
    }
    context.done();
  };
