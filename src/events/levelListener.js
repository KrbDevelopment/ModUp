const common = require("../../common");
const ranking = require("../utils/rankingFunctions");
const {logConsole} = require("../utils/logFunctions");

logConsole('Initing discord module: LevelListener...', "EVENT/INFO", "");

common.data['discord'].client.on('message', (message) => {
    if (message.author.bot) return;

    if (!message.content.startsWith(common.data['config'].BOT_PREFIX)) {
        var guild = message.guild
        var userid = message.member.id

        ranking.addMemberMessagePoints(guild, userid).then(
            console.log(message.member.user.username + " recieved a point!")
        );
    }
});
