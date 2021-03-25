const {logConsole} = require("../utils/logFunctions");
const axios = require('axios')
const common = require("../../common");

logConsole('Initing discord command: Meme...', "CMD/INFO", "");

const name = "meme",
    category = "Generic",
    shortHelp = `We didn't set a message yet`,
    longHelp = `We didn't set a message yet`;

async function run(message, args) {
    let meme = await axios.get("https://meme-api.herokuapp.com/gimme", {});
    meme = meme.data
    const embed = new common.data['discord'].discord.MessageEmbed();

    embed.setTitle(meme.title)
    embed.setURL(meme.postLink)
    embed.setAuthor(meme.author, null, null)

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