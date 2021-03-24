const {logConsole} = require("../utils/logFunctions");
logConsole('Initing discord command: Clear...', "CMD/INFO", "");

const name = "clear"

async function run(message, args) {
    const count = parseInt(args[0]);

    if (count) {
        if (count >= 1 && count <= 100) {
            message.channel.bulkDelete(count)
                .then(messages => message.channel.send(`${messages.size} messages has been deleted.`))
                .catch(err => {
                    message.channel.send(`An unknown error has occured: ${err.name}`)
                    logConsole(err.stack, "CMD/CLEAR", "");
                });
        } else {
            message.channel.send("Count can be only between 1 and 100");
        }
    } else {
        message.channel.messages.fetch().then(async messages => {
            for (const message of messages.array()) {
                await message.delete();
            }
        });
    }
}

module.exports = {
    name: name,
    run: run,
    permissions: ['MANAGE_MESSAGES']
}