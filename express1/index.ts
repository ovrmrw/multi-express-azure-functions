// const createAzureFunctionHandler = require('azure-function-express').createAzureFunctionHandler;

import * as express from 'express';

import { AFContext, AFRequest } from '../types';

// const express = require("express");

// Create express app as usual 
const app = express();
app.get("/api/:foo", (req, res) => res.json({ foo: req.params.foo }));
app.get("/api/:foo/:bar", (req, res) => res.json({ foo: req.params.foo, bar: req.params.bar }));

// Binds the express app to an Azure Function handler 
// export default createAzureFunctionHandler(app);

export default async (context: AFContext, req: AFRequest) => {
  context.res = {
    status: 200,
    body: context
  }
  context.done();
}
