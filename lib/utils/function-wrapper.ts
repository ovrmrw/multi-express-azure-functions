import { AzureFunction, AFContext, AFRequest } from '../../types';


export function wrapper(azureFunction: AzureFunction): AzureFunction {
  return async (context: AFContext, req: AFRequest): Promise<void> => {
    return await azureFunction(context, req);
  }
}
