const common = require("../../common");
const ranking = require("../utils/rankingFunctions");
const settings = require("../utils/settingsFunctions");
const {logConsole} = require("../utils/logFunctions");
logConsole('Initing discord command: Rank...', "CMD/INFO", "");

const name = "rank",
    category = "Generic",
    shortHelp = `We didn't set a message yet`,
    longHelp = `We didn't set a message yet`;

async function run(message, args) { //message = event | args = args
    const discord = common.data['discord'].discord
    let author = message.member

    var nickname = author.user.username

    const level = await ranking.getMemberLevel(message.guild.id, author.user.id);
    const points = await ranking.getMemberPoints(message.guild.id, author.user.id);
    const rank = await ranking.getMemberRank(message.guild.id, author.user.id);

    const bot_name = await settings.getServerSetting(message.guild.id, "bot_name");
    const bot_picture = await settings.getServerSetting(message.guild.id, "bot_picture");
    const bot_color = await settings.getServerSetting(message.guild.id, "bot_color");

    const rankbar = await ranking.getRankbar(message.guild.id, level, points)

    const RankCard = new discord.MessageEmbed()
        .setColor(bot_color)
        .setAuthor(bot_name, bot_picture)
        .setDescription("Your Rank")

        .addFields(
            { name: "Nickname", value: nickname, inline: false },

            { name: "Level", value: `Level ${level}`, inline: true },
            { name: "Points", value: `${points} Points`, inline: true },
            { name: "Rank", value: `#${rank}`, inline: true },


            { name: "Rank Progress", value: rankbar, inline: false },
        )

        .setTimestamp()
        .setFooter('modup.pro', 'https://i.imgur.com/VXk9cY8.png')

    message.channel.send(RankCard);

}

module.exports = {
    name,
    category,
    shortHelp,
    longHelp,
    run,
    permissions: ['MANAGE_MESSAGES']
}
