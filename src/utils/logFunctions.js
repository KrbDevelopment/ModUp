const common = require("../../common");

function logConsole(message, prefix, css="") {
    var date = new Date();
    var hour = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();
    var milliseconds = date.getMilliseconds();

    var timestamp = `${date.getUTCFullYear()}-${date.getUTCMonth()}-${date.getUTCDay()} ${hour}:${minutes}:${seconds}.${milliseconds}`;

    console.log(`%c[${timestamp}] [${prefix}] %s${message}`, 'css', css)
}

module.exports = {
    logConsole
}