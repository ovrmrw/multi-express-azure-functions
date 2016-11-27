"use strict";
var appSecretKeyJson = require('../../secret-key/app.secret.json');
var firebaseServiceAccountKeyJson = require('../../secret-key/serviceAccountKey.json');
exports.firebaseServiceAccountKeyJson = firebaseServiceAccountKeyJson;
exports.auth0ClientId = appSecretKeyJson.auth0.clientId;
exports.auth0ClientSecret = appSecretKeyJson.auth0.clientSecret;
exports.auth0Domain = appSecretKeyJson.auth0.domain;
if ([exports.auth0ClientId, exports.auth0ClientSecret, exports.auth0Domain].some(function (key) { return !key; })) {
    console.error('Auth0 env keys:', { auth0ClientId: exports.auth0ClientId, auth0ClientSecret: exports.auth0ClientSecret, auth0Domain: exports.auth0Domain });
    throw new Error('Env keys for Auth0 is not collected.');
}
exports.firebaseDatabaseURL = appSecretKeyJson.firebase.databaseUrl;
if ([exports.firebaseDatabaseURL].some(function (key) { return !key; })) {
    console.error('Firebase env keys:', { firebaseDatabaseURL: exports.firebaseDatabaseURL });
    throw new Error('Env keys for Firebase are not collected.');
}
