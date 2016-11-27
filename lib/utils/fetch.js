"use strict";
var fetch = require("isomorphic-fetch");
function createFetch(baseUri, req) {
    var query = Object.keys(req.query).reduce(function (p, key) {
        p.push(key + '=' + encodeURIComponent(req.query[key]));
        return p;
    }, []);
    var url = baseUri + (req.params.segments ? '/' + req.params.segments : '') + (query.length ? '?' + query.join('&') : '');
    var options = {
        method: req.method,
        headers: Object.assign({
            'Content-Type': 'application/json',
        }, req.headers),
        body: req.rawBody,
    };
    console.log('\nfetch url:', url);
    console.log('fetch options:', options);
    return fetch(url, options);
}
exports.createFetch = createFetch;
