import * as fetch from 'isomorphic-fetch';

import { AFRequest } from '../types';


export function createFetch(baseUri: string, req: AFRequest): Promise<IResponse> {
  const query = Object.keys(req.query).reduce((p, key) => {
    p.push(key + '=' + encodeURIComponent(req.query[key]));
    return p;
  }, [] as string[]);
  const url = baseUri + (req.params.segments ? '/' + req.params.segments : '') + (query.length ? '?' + query.join('&') : '');

  return fetch(url, {
    method: req.method,
    headers: req.headers,
    body: req.rawBody,
    mode: 'same-origin',
  });
}
