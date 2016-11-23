import { AFContext } from '../../types';

export function logResponse(context: AFContext): string[] {
  return ['\ncontext.res:', JSON.stringify(context.res, null, 2)];
}
