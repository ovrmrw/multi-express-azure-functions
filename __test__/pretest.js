const fs = require('fs-extra');
const path = require('path');
const child = require('child_process');
const appRoot = require('app-root-path').path;

const TEST_DIR = '.dest-test';


fs.emptyDirSync(TEST_DIR);

child.execSync('tsc --outDir ' + TEST_DIR);


const dirList = [
  // 'express1',
  // 'hapi1',
  // 'lodash',
  'secret-key',
];

dirList.forEach(dir => {
  fs.copySync(path.join(appRoot, dir), path.join(appRoot, TEST_DIR, dir), {
    filter: (filePath) => {
      if (filePath.match(/node_modules/) || filePath.match(/\.ts$/)) {
        return false;
      } else {
        return true;
      }
    }
  });
});
