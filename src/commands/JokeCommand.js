const {logConsole} = require("../utils/logFunctions");
const axios = require('axios')
const common = require("../../common");

logConsole('Initing discord command: Joke...', "CMD/INFO", "");

const name = "joke",
    category = "Generic",
    shortHelp = `We didn't set a message yet`,
    longHelp = `We didn't set a message yet`;

async function run(message, args) {
    let joke = await axios.get("https://official-joke-api.appspot.com/random_joke", {});
    joke = joke.data
    const embed = new common.data['discord'].discord.MessageEmbed();

    embed.setTitle(joke.setup)
    embed.setDescription(joke.punchline)

    message.channel.send(embed)
}

module.exports = {
    name,
    category,
    shortHelp,
    longHelp,
    run,
    permissions: []
}