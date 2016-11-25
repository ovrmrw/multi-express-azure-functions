const fs = require('fs-extra');
const path = require('path');
const appRoot = require('app-root-path').path;


fs.copySync(path.join(appRoot,'.dest-webpack'), appRoot);
