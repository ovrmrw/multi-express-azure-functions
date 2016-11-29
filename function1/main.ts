import { AzureFunction } from '../types';


export const azureFunction: AzureFunction =
  async (context, req) => {
    context.res = {
      status: 200,
      body: {
        context: JSON.parse(JSON.stringify(context)),
      }
    };
    // context.done();
  };
