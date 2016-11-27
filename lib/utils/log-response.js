"use strict";
function logResponse(context) {
    return ['\ncontext.res:', JSON.stringify(context.res, null, 2)];
}
exports.logResponse = logResponse;
