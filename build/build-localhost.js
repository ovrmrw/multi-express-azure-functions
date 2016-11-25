const fs = require('fs-extra');
const path = require('path');
const child = require('child_process');
const appRoot = require('app-root-path').path;


const LOCALHOST = 'localhost';
const NODE_MODULES = 'node_modules';


fs.emptyDirSync(LOCALHOST);

child.execSync('tsc --outDir ' + LOCALHOST);

// child.execSync('npm run webpack');

const dirList = [
  'express1',
  'hapi1',
  'lodash',
  'secret-key',
];

dirList.forEach(dir => {
  fs.copySync(dir, LOCALHOST + '/' + dir, {
    filter: (filePath) => {
      if (filePath.match(/node_modules/) || filePath.match(/\.ts$/)) {
        return false;
      } else {
        return true;
      }
    }
  });
});

dirList.forEach(dir => {
  try {
    fs.symlinkSync(path.join(appRoot, dir, NODE_MODULES), path.join(appRoot, LOCALHOST, dir, NODE_MODULES), 'junction');
  } catch (err) {
    console.error(err.message);
  }
});


const fileList = [
  '.env',
];

fileList.forEach(file => {
  // fs.copy(file, LOCALHOST + '/' + file);
  try {
    fs.symlinkSync(path.join(appRoot, file), path.join(appRoot, LOCALHOST, file), 'file');
  } catch (err) {
    console.error(err.message);
  }
});


// const secretFileList = [
//   'app.secret.json',
//   'serviceAccountKey.json',
// ];

// secretFileList.forEach(file => {
//   fs.copySync('secret-key/' + file, LOCALHOST + '/hapi1/' + file);
// });




