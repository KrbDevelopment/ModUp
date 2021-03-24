const {logConsole} = require("../utils/logFunctions");
logConsole('Initing discord command: Test...', "CMD/INFO", "");

const name = "test"

async function run(message, args) {
    message.channel.send("Test success").catch(console.error)
}

module.exports = {
    name: name,
    run: run,
    permissions: []
}