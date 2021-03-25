const common = require("../../common");
const badges = require("../utils/badgeFunctions");
const settings = require("../utils/settingsFunctions");
const {logConsole} = require("../utils/logFunctions");
logConsole('Initing discord command: Badge...', "CMD/INFO", "");

const name = "badge",
    category = "Generic",
    shortHelp = `We didn't set a message yet`,
    longHelp = `We didn't set a message yet`;

async function run(message, args) { //message = event | args = args
    const discord = common.data['discord'].discord
    let author = message.member

    if (args.length > 1) {
        console.log(message.mentions.users.size);
        if (message.mentions.users.size === 1) {
            author = message.guild.member(message.mentions.users.first())

            const bot_name = await settings.getServerSetting(message.guild.id, "bot_name");
            const bot_picture = await settings.getServerSetting(message.guild.id, "bot_picture");
            const bot_color = await settings.getServerSetting(message.guild.id, "bot_color");

            var nickname = author.user.username

            if (args[0] === "give") {
                if (args.length === 3) {
                    const member_badges = badges.getMemberBadges(message.guild.id, author.id);

                    if (member_badges.includes(args[2])) {
                        const giveBadgeCard = new discord.MessageEmbed()
                            .setColor(bot_color)
                            .setAuthor(bot_name, bot_picture)
                            .setDescription("Member Badges")

                            .addFields(
                                {name: ":white_check_mark: Successfull", value: `You gave <@!${author.id}> a new Badge.`, inline: false},
                                {name: ":military_medal: Added Badge", value: `'${args[2]}' Badge`, inline: false},
                                {name: ":pencil: Info", value: `The user have now ${member_badges.length + 1} Badges`, inline: false},
                            )

                            .setTimestamp()
                            .setFooter('modup.pro', 'https://i.imgur.com/VXk9cY8.png')

                        await badges.giveMemberBadge(message.guild.id, author.id, args[2]);

                        message.channel.send(giveBadgeCard);
                    } else {
                        message.channel.send("This member have already this badge");
                    }
                }
            }

            if (args[0] === "remove") {
                const member_badges = badges.getMemberBadges(message.guild.id, author.id);

                if (member_badges.includes(args[2])) {
                    const removeBadgeCard = new discord.MessageEmbed()
                        .setColor(bot_color)
                        .setAuthor(bot_name, bot_picture)
                        .setDescription("Member Badges")

                        .addFields(
                            {title: ":white_check_mark: Successfull", value: `You removed ${nickname} a Badge.`, inline: false},
                            {title: ":pencil: Info", value: `The user have now ${member_badges.length} Badges`, inline: false},
                        )

                        .setTimestamp()
                        .setFooter('modup.pro', 'https://i.imgur.com/VXk9cY8.png')


                    message.channel.send(removeBadgeCard);

                } else {
                    message.channel.send("This member doesn`t own this Badge!");
                }
            }
        }

    } else {
        return;
    }
}

module.exports = {
    name: name,
    run: run,
    permissions: ['MANAGE_MESSAGES']
}
