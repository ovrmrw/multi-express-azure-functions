const createAzureFunctionHandler = require('azure-function-express').createAzureFunctionHandler;

import * as express from 'express';

// const express = require("express");

// Create express app as usual 
const app = express();
app.get('/', (req, res) => {
  res.json({
    result: '[result]'
  });
});

// Binds the express app to an Azure Function handler 
export default createAzureFunctionHandler(app);
