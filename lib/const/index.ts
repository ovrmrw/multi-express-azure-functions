const appRootDir = require('app-root-path').path;

export const secretKeyDir = appRootDir + '/secret-key';

export const appSecretKeyJson = require(secretKeyDir + '/app.secret.json');

export const serviceAccountKeyJson = require(secretKeyDir + '/serviceAccountKey.json');
