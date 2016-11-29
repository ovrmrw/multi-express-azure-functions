const fs = require('fs-extra');
const path = require('path');
const child = require('child_process');
const appRoot = require('app-root-path').path;


const LOCALHOST = 'localhost';
const NODE_MODULES = 'node_modules';


fs.emptyDirSync(LOCALHOST);

child.execSync('tsc --outDir ' + LOCALHOST);


const fileList = [
  'function1',
  'express1',
  'hapi1',
  'lodash',
  'secret-key',
  '.env',
];

fileList.forEach(file => {
  fs.copySync(path.join(appRoot, file), path.join(appRoot, LOCALHOST, file), {
    filter: (filePath) => {
      if (filePath.match(/node_modules/) || filePath.match(/\.ts$/)) {
        return false;
      } else {
        return true;
      }
    }
  });
});


// child.execSync('npm run webpack');
// fs.copySync(path.join(appRoot, '.dest-webpack'), path.join(appRoot, LOCALHOST));
