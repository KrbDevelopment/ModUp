const common = require("../../common");
const mentionF = require("../utils/mentionFunctions")
const messageF = require("../utils/messageFunctions");
const mysql = require("../loginServices/mysql");
const {logConsole} = require("../utils/logFunctions");
const {getSuccessMessage, getErrorMessage} = require("../utils/messageFunctions");
const {getEmbedFromCode} = require("../utils/embedInterpreter");

logConsole('Initing discord command: SetLeaveMessage...', "CMD/INFO", "");

const name = "setleavemessage",
    category = "Generic",
    shortHelp = `We didn't set a message yet`,
    longHelp = `We didn't set a message yet`;

async function run(message, args) {
    if (args.length <= 0) {
        const embed = new common.data['discord'].discord.MessageEmbed();

        embed.setColor('#ff0000')
        embed.setTitle('Active leave messages:')
        embed.setFooter("For delete: " + common.data['config'].BOT_PREFIX + "setleavemessage delete [number]")
        embed.setTimestamp(Date.now())

        const positions = await mysql.queryStatement(`SELECT * FROM guild_messages WHERE guildId = ${message.guild.id} AND type = 'leave';`);

        for await (const position of positions) {
            let embedO = await getEmbedFromCode(position.message);
            await embed.addField(`#${position.gmId}`, embedO.title + ` (<#${position.channelId}>)`, false);
        }

        await message.channel.send(embed)
    } else if (args[0] === 'delete') {
        if (args[1] === undefined || args[1] === null) {
            message.channel.send(getErrorMessage("Please enter a position as your first parameter"));
            return;
        }
        const positionInt = parseInt(args[1]);

        mysql.queryVoid("DELETE FROM guild_messages WHERE gmId = " + positionInt);
        message.channel.send(getSuccessMessage("Deleted Leave Message", "You successfully deleted the leave message " + positionInt));
    } else {
        const targetChannel = mentionF.getTextChannelFromMention(args[0]);
        if (!targetChannel) {
            message.channel.send(messageF.getErrorMessage('Please mention a channel as your first parameter.'));
            return;
        }

        if (args[1] == null) {
            message.channel.send(messageF.getErrorMessage('Please use a embed code as your second parameter.'));
            return;
        }

        mysql.addRow('guild_messages', ['guildId', 'creatorId', 'channelId', 'type', 'message'], [message.guild.id, message.author.id, message.channel.id, 'leave', args[1]])
            .then((res) => {
                message.channel.send(messageF.getSuccessMessage('Successfully changed leave message', `You successfully changed the leave message`));
            })
            .catch((err) => {
                message.channel.send(messageF.getErrorMessage('We were unable to set your message. Please report this issue to a ModUp developer.'));
                logConsole(err.stack, "CMD/SET_LEAVE_MESSAGE", "");
            });
    }
}

module.exports = {
    name: name,
    run: run,
    permissions: ['MANAGE_GUILD']
}