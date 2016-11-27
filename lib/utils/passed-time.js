"use strict";
function passedTimeMessage(startTime) {
    var passedTime = new Date().getTime() - startTime;
    return "passed time: " + passedTime + "ms " + passedTime / 1000 + "s";
}
exports.passedTimeMessage = passedTimeMessage;
