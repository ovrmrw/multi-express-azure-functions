const fs = require('fs-extra');
const path = require('path');
const child = require('child_process');
const appRoot = require('app-root-path').path;


const LOCALHOST = 'localhost';
const NODE_MODULES = 'node_modules';


fs.emptyDirSync(LOCALHOST);

child.execSync('tsc --outDir ' + LOCALHOST);


const dirList = [
  'express1',
  'hapi1',
  'lodash',
  'secret-key',
];

dirList.forEach(dir => {
  fs.copySync(path.join(appRoot, dir), path.join(appRoot, LOCALHOST, dir), {
    filter: (filePath) => {
      if (filePath.match(/node_modules/) || filePath.match(/\.ts$/)) {
        return false;
      } else {
        return true;
      }
    }
  });
});

// dirList.forEach(dir => {
//   try {
//     fs.symlinkSync(path.join(appRoot, dir, NODE_MODULES), path.join(appRoot, LOCALHOST, dir, NODE_MODULES), 'junction');
//   } catch (err) {
//     console.error(err.message);
//   }
// });


const fileList = [
  '.env',
];

fileList.forEach(file => {
  try {
    fs.copySync(path.join(appRoot, file), path.join(appRoot, LOCALHOST, file));
  } catch (err) {
    console.error(err.message);
  }
});


// child.execSync('npm run webpack');
// fs.copySync(path.join(appRoot, '.dest-webpack'), path.join(appRoot, LOCALHOST));
