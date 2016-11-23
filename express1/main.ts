import * as express from 'express';

const app = express();
app.get("/api/:foo", (req, res) => res.json({ foo: req.params.foo }));
app.get("/api/:foo/:bar", (req, res) => res.json({ foo: req.params.foo, bar: req.params.bar }));


import { AzureFunction } from '../types';
import { passedTimeMessage, logResponse } from '../lib/utils';


export const azureFunction: AzureFunction =
  async (context, req) => {
    const startTime = new Date().getTime();
    context.res = {
      status: 200,
      body: 'test is ok'
    };
    
    context.log(context);
    context.log(...logResponse(context));
    context.log(passedTimeMessage(startTime));
    context.done();
  };
