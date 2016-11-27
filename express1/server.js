"use strict";
require('dotenv').config();
var express = require("express");
var bodyParser = require("body-parser");
var jwt = require('express-jwt');
var routes_1 = require("./routes");
var const_1 = require("../lib/const");
var app = express();
var port = 0; // dynamic
var host = 'localhost';
var jwtCheck = jwt({
    secret: new Buffer(const_1.auth0ClientSecret, 'base64'),
    audience: const_1.auth0ClientId,
});
if (process.env.NODE_ENV === 'local') {
    console.log('\n=======================================');
    console.log('**  Authentication is now disabled.  **');
    console.log('=======================================\n');
}
else {
    app.use(jwtCheck.unless({ path: routes_1.unlockRoutes }));
}
app.use(bodyParser.json());
app.use(routes_1.routes);
app.use(function (req, res) {
    res.status(404).json({ error: 'Not found' });
});
app.use(function (err, req, res, next) {
    // console.log('error:', error);
    var message = String(err);
    res.status(err.status).json({ error: message });
});
exports.uriAsPromise = new Promise(function (resolve, reject) {
    var server = app.listen(port, host, function (err) {
        if (err) {
            reject(err);
        }
        var uri = 'http://' + server.address().address + ':' + server.address().port;
        console.log('Server running at:', uri);
        resolve(uri);
    });
});
