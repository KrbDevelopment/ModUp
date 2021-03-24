const common = require("../../common");
const ranking = require("../utils/rankingFunctions");
const {isUrl, isBlacklistWord} = require("../utils/blacklistFunctions");
const {getWarningMessage} = require("../utils/messageFunctions");
const {logConsole} = require("../utils/logFunctions");

logConsole('Initing discord module: BlackListListener...', "EVENT/INFO", "");

common.data['discord'].client.on('message', async (message) => {
    if (message.author.bot) return;

    const message_parts = message.content.split(' ')
    for (const m in message_parts) {
        const msg = message_parts[m]

        // TODO: Add URL Whitelist
        if (await isUrl(msg, message.guild.id)) {
            message.delete()
            message.author.send(getWarningMessage("Links are prohibited", "You may not send links in public channels. Your message has been blocked. Further messages will be blocked too, you might get kicked or banned if you continue!"))

            return;
        }

        // TODO: Add Blacklist words
        if (await isBlacklistWord(msg, message.guild.id)) {
            message.delete()
            message.author.send(getWarningMessage("Links are prohibited", "You may not send insults in public channels. Your message has been blocked. Further messages will be blocked too, you might get kicked or banned if you continue!"))

            return;
        }
    }
});