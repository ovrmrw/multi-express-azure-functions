const path = require('path');
const del = require('delete');
const appRoot = require('app-root-path').path;


const dirList = [
  'hapi1',
  'express1',
  'lodash',
];

dirList.forEach(dir => {
  try {
    del.sync(path.join(appRoot, dir, '*.js.map'));
  } catch (err) {
    console.error('error:', err);
  }
});
