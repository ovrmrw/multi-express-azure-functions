const createAzureFunctionHandler = require('azure-function-express').createAzureFunctionHandler;

import * as express from 'express';

// const express = require("express");

// Create express app as usual 
const app = express();
app.get('/foo/:foo/:bar', (req, res) => {
  res.json({
    foo: req.params.foo,
    bar: req.params.bar
  });
});

// Binds the express app to an Azure Function handler 
export default createAzureFunctionHandler(app);
