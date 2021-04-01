const common = require("../../common");
const ranking = require("../utils/rankingFunctions");
const {logConsole} = require("../utils/logFunctions");

logConsole('Initing discord module: MuteListener...', "EVENT/INFO", "");

common.data['discord'].client.on('message', (message) => {
    if (message.author.bot) return;

    if(common.database['guild_mutes'].filter(function (e) {
        return (e.guild === message.guild.id && e.member === message.member.id);
    }).length > 0) {
        message.delete();
    }
});
