"use strict";
require('dotenv').config();
var Hapi = require("hapi");
var HapiAuthJwt = require('hapi-auth-jwt2');
var routes_1 = require("./routes");
var const_1 = require("../lib/const");
var server = new Hapi.Server();
server.connection({
    host: 'localhost'
});
server.register(HapiAuthJwt, function (err) {
    if (process.env.NODE_ENV === 'local') {
        console.log('\n=======================================');
        console.log('**  Authentication is now disabled.  **');
        console.log('=======================================\n');
    }
    else {
        server.auth.strategy('token', 'jwt', true, {
            key: new Buffer(const_1.auth0ClientSecret, 'base64'),
            verifyOptions: {
                algorithms: ['HS256'],
                audience: const_1.auth0ClientId,
            },
            validateFunc: function (decoded, request, callback) {
                return callback(null, true);
            }
        });
    }
    server.route(routes_1.routes);
});
exports.uriAsPromise = new Promise(function (resolve, reject) {
    server.start(function (err) {
        if (err) {
            reject(err);
        }
        console.log('Server running at:', server.info.uri);
        resolve(server.info.uri);
    });
});
