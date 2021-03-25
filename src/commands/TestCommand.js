const {logConsole} = require("../utils/logFunctions");
logConsole('Initing discord command: Test...', "CMD/INFO", "");

const name = "test",
    category = "Testing",
    shortHelp = `The test command is designed to test, if the bot is replying. Also it's used for the developers to test new commands.`,
    longHelp = `The test command is designed to test, if the bot is replying. Also it's used for the developers to test new commands.`;


async function run(message, args) {
    message.channel.send("Test success").catch(console.error)
}

module.exports = {
    name,
    category,
    shortHelp,
    longHelp,
    run,
    permissions: []
}