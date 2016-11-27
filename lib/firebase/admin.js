"use strict";
var admin = require("firebase-admin");
var uuid = require('uuid');
var const_1 = require("../const");
var firebaseApp;
function getFirebaseApp() {
    var name = uuid();
    if (!firebaseApp) {
        console.time('admin.initializeApp');
        firebaseApp = admin.initializeApp({
            credential: admin.credential.cert(const_1.firebaseServiceAccountKeyJson),
            databaseURL: const_1.firebaseDatabaseURL,
        }, name);
        console.timeEnd('admin.initializeApp');
    }
    return firebaseApp;
}
exports.getFirebaseApp = getFirebaseApp;
