const common = require("../../common");
const ranking = require("../utils/rankingFunctions");
const settings = require("../utils/settingsFunctions");
const {logConsole} = require("../utils/logFunctions");
logConsole('Initing discord command: UserInfo...', "CMD/INFO", "");

const name = "userinfo",
    category = "Generic",
    shortHelp = `We didn't set a message yet`,
    longHelp = `We didn't set a message yet`;

async function run(message, args) { //message = event | args = args
    const discord = common.data['discord'].discord
    let author = message.member

    if (message.mentions.users.size !== 0) {
        author = message.guild.member(message.mentions.users.first())
    }

    var options = { weekday: 'short', year: 'numeric', month: 'numeric', day: 'numeric' };

    var nickname = author.user.username
    var usertag = nickname + "#" + author.user.discriminator
    var role = author.roles.highest

    var join_date = author.joinedAt.toLocaleDateString("en-US", options) + " " + author.joinedAt.toTimeString("it-IT").slice(0, 5)
    var create_date = author.user.createdAt.toLocaleDateString("en-US", options) + " " + author.user.createdAt.toTimeString("it-IT").slice(0, 5)
    var status = ""

    if (author.premiumSince === null) {
        status = "Member"
    } else {
        status = "Server Booster"
    }

    const level = await ranking.getMemberLevel(message.guild.id, author.user.id);
    const points = await ranking.getMemberPoints(message.guild.id, author.user.id);
    const rank = await ranking.getMemberRank(message.guild.id, author.user.id);

    const bot_name = await settings.getServerSetting(message.guild.id, "bot_name");
    const bot_picture = await settings.getServerSetting(message.guild.id, "bot_picture");
    const bot_color = await settings.getServerSetting(message.guild.id, "bot_color");

    const UserinfoEmbed = new discord.MessageEmbed()
        .setColor(bot_color)
        .setAuthor(bot_name, bot_picture)
        .setDescription("Userinfo about <@!"+ author.user.id +">")

        .addFields(
            { name: "Nickname", value: nickname, inline: true },
                { name: "Usertag", value: usertag, inline: true },
                { name: "Server Role", value: role, inline: true },

                { name: "Level", value: `Level ${level}`, inline: true },
                { name: "Points", value: `${points} Points`, inline: true },
                { name: "Rank", value: `#${rank}`, inline: true },

                { name: "Joined Server", value: join_date, inline: true },
                { name: "Created Account", value: create_date, inline: true },
                { name: "Boost Status", value: status, inline: true },
        )

        .setTimestamp()
        .setFooter('modup.pro', 'https://i.imgur.com/VXk9cY8.png')

    message.channel.send(UserinfoEmbed);
}

module.exports = {
    name,
    category,
    shortHelp,
    longHelp,
    run,
    permissions: ['MANAGE_MESSAGES']
}