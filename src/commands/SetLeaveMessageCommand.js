const common = require("../../common");
const mentionF = require("../utils/mentionFunctions")
const messageF = require("../utils/messageFunctions");
const mysql = require("../loginServices/mysql");

console.log("=> Initing discord command: SetLeaveMessage")

const name = "setleavemessage"

function run(message, args) {
    if (args.length <= 0) {
        const messages = mysql.queryAll('guild_messages', ['guildId = ' + message.guild.id, 'channelId = ' + message.channel.id, 'type = \'leave\''])
        const embed = new common.data['discord'].discord.MessageEmbed();

        embed.setColor('#ff0000')
        embed.setTitle('Active leave messages:')
        embed.setFooter("For delete: " + common.data['config'].BOT_PREFIX + "setleavemessage delete [number]")
        embed.setTimestamp(Date.now())

        messages.then((res) => {
            let description = ""

            for (let i = 0; i < res.length; i++) {
                description += `${i+1}.) ${res[i].message}\n`;
            }

            embed.setDescription(description)
            message.channel.send(embed)
        });
    } else if (args[0] === 'delete') {
        const targetChannel = mentionF.getTextChannelFromMention(args[1]);
        if (!targetChannel) {
            message.channel.send(messageF.getErrorMessage('Please mention a channel as your first parameter.'));
            return;
        }

        // TODO: Delete
    } else {
        const targetChannel = mentionF.getTextChannelFromMention(args[0]);
        if (!targetChannel) {
            message.channel.send(messageF.getErrorMessage('Please mention a channel as your first parameter.'));
            return;
        }

        args = args.slice(1)
        const leaveMessage = args.join(' ')
        mysql.addRow('guild_messages', ['guildId', 'creatorId', 'channelId', 'type', 'message'], [message.guild.id, message.author.id, message.channel.id, 'leave', leaveMessage])
            .then((res) => {
                message.channel.send(messageF.getSuccessMessage('Successfully changed leave message', `You successfully changed the leave message into: ${leaveMessage}`));
            })
            .catch((err) => {
                message.channel.send(messageF.getErrorMessage('We were unable to set your message. Please report this issue to a ModUp developer.'));
                console.log(err.stack)
            });
    }
}

module.exports = {
    name: name,
    run: run,
    permissions: ['MANAGE_GUILD']
}