"use strict";
var auth0HookFunction = require('azure-functions-auth0');
var utils_1 = require("../utils");
var const_1 = require("../const");
require('dotenv').config();
if (process.env.NODE_ENV === 'local') {
    exports.auth0AuthenticationHook = utils_1.wrapper;
    console.info('======= auth0AuthenticationHook is now mocked. =======');
}
else {
    exports.auth0AuthenticationHook = auth0HookFunction({
        clientId: const_1.auth0ClientSecret,
        clientSecret: const_1.auth0ClientSecret,
        domain: const_1.auth0Domain,
    });
}
