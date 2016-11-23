import { AzureFunction } from '../types';
import { passedTimeMessage } from '../lib/utils';
import { server } from './server';
import { createFetch } from './utils';


export const azureFunction: AzureFunction =
  async (context, req) => {
    const startTime = new Date().getTime();
    console.log('segments:', req.params.segments);
    console.log('body:', req.body);
    console.log('query:', req.query);

    try {
      const result: any = await createFetch(server.info.uri, req)
        .then(res => res.json());

      if (result.error) {
        context.res = {
          status: result.statusCode,
          body: { error: result.error }
        }
      } else {
        context.res = {
          status: 200,
          body: { result },
        }
      }
    } catch (err) {
      context.res = {
        status: 500,
        body: err.message || err,
      }
    }
    console.log('context.res:', JSON.stringify(context.res, null, 2));
    console.log(passedTimeMessage(startTime));
  };
