const common = require("../../common");
const badges = require("../utils/badgeFunctions");
const settings = require("../utils/settingsFunctions");
const {logConsole} = require("../utils/logFunctions");
logConsole('Initing discord command: Badges...', "CMD/INFO", "");

const name = "badges",
    category = "Generic",
    shortHelp = `We didn't set a message yet`,
    longHelp = `We didn't set a message yet`;

async function run(message, args) { //message = event | args = args
    const discord = common.data['discord'].discord
    let author = message.member


    if (message.mentions.users.size !== 0) {
        author = message.guild.member(message.mentions.users.first())
    }

    var nickname = author.user.username
    const guild = message.guild.id

    const bot_name = await settings.getServerSetting(guild, "bot_name");
    const bot_picture = await settings.getServerSetting(guild, "bot_picture");
    const bot_color = await settings.getServerSetting(guild, "bot_color");

    const member_badges = await badges.getMemberBadges(guild, author.id);

    console.log(member_badges.length)
    if (member_badges.length === 0) {
        const BadgeCard = new discord.MessageEmbed()
            .setColor(bot_color)
            .setAuthor(bot_name, bot_picture)
            .setDescription("Your Badges")

            .addField(":bookmark: Information", "You currently have no Badges", false)

            .setTimestamp()
            .setFooter('modup.pro', 'https://i.imgur.com/VXk9cY8.png')

        message.channel.send(BadgeCard);

    } else {
        const BadgeCard = new discord.MessageEmbed()
            .setColor(bot_color)
            .setAuthor(bot_name, bot_picture)
            .setDescription("Your Badges")

            .addField(":label: Nickname", nickname, false)

            .setTimestamp()
            .setFooter('modup.pro', 'https://i.imgur.com/VXk9cY8.png')

        for (const badge of member_badges) {
            const badge_info = badges.getBadgeInfo(guild, badge.identifier);
            BadgeCard.addField(badge_info.icon +"  "+ badge_info.name, badge_info.description, true)
        }

        message.channel.send(BadgeCard);
    }
}

module.exports = {
    name: name,
    run: run,
    permissions: ['MANAGE_MESSAGES']
}
