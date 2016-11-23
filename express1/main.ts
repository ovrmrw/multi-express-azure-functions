import * as express from 'express';
import * as http from 'http';

const app = express();
app.get('/foo', (req, res) => {

  res.json({ 'test': 'ok' })
});
app.get("/api/:foo", (req, res) => res.json({ foo: req.params.foo }));
app.get("/api/:foo/:bar", (req, res) => res.json({ foo: req.params.foo, bar: req.params.bar }));
// app.get('/express1/foo',(req,res)=>)

const server = http.createServer((context: any, req: any) => {
  return app.bind(app, req, context.res);
});
server.listen('/express1');


import { AzureFunction } from '../types';
import { passedTimeMessage, logResponse } from '../lib/utils';


export const azureFunction: AzureFunction =
  (context, req) => {
    const startTime = new Date().getTime();
    context.res = {
      status: 200,
      body: 'test is ok'
    };

    server.on('listening', () => {
      context.log('listing');
    });

    context.log('req.params.route', req.params.route);
    // context.log(context);
    context.log(...logResponse(context));
    context.log(passedTimeMessage(startTime));
    context.done();
  };
