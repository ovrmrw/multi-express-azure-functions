"use strict";
function createHelloMessage(name) {
    return 'Hello world, ' + (name || 'you') + '. ' + new Date().getTime();
}
exports.createHelloMessage = createHelloMessage;
function createWelcomeMessage() {
    return 'This is root. ' + new Date().getTime();
}
exports.createWelcomeMessage = createWelcomeMessage;
