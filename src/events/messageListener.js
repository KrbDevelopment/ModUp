const common = require("../../common");
const ranking = require("../utils/rankingFunctions");
console.log("=> Initing discord module: MessageListener...")

common.data['discord'].client.on('message', (message) => {
    if (message.author.bot) return;


    if (!message.content.startsWith(common.data['config'].BOT_PREFIX)) {
        var guild = message.guild.id
        var userid = message.member.id

        ranking.addMemberMessagePoints(guild, userid).then();

    }
});
