const common = require("../../common");
const mentionF = require("../utils/mentionFunctions")
const messageF = require("../utils/messageFunctions");
const mysql = require("../loginServices/mysql");
const {logConsole} = require("../utils/logFunctions");
const {getSuccessMessage, getErrorMessage} = require("../utils/messageFunctions");
const {getEmbedFromCode} = require("../utils/embedInterpreter");

logConsole('Initing discord command: SetJoinMessage...', "CMD/INFO", "");

const name = "setjoinmessage",
    category = "Generic",
    shortHelp = `We didn't set a message yet`,
    longHelp = `We didn't set a message yet`;

async function run(message, args) {
    if (args.length <= 0) {
        const embed = new common.data['discord'].discord.MessageEmbed();

        embed.setColor('#ff0000')
        embed.setTitle('Active ĵoin messages:')
        embed.setFooter("For delete: " + common.data['config'].BOT_PREFIX + "setjoinmessage delete [number]")
        embed.setTimestamp(Date.now())

        const positions = common.database['guild_messages'].filter(function (e) {
            return (e.guildId === message.guild.id && e.type === 'join');
        })

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

        common.database['guild_messages'].filter(function (e) {
            return (e.gmId === positionInt);
        }).delete()

        message.channel.send(getSuccessMessage("Deleted Join Message", "You successfully deleted the join message " + positionInt));
        mysql.queryVoid("DELETE FROM guild_messages WHERE gmId = " + positionInt);
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

        common.database['guild_messages'].push({
            guildId: message.guild.id,
            creatorId: message.author.id,
            channelId: message.channel.id,
            type: 'join',
            message: args[1]
        });

        message.channel.send(messageF.getSuccessMessage('Successfully changed join message', `You successfully changed the join message`));
        mysql.addRow('guild_messages', ['guildId', 'creatorId', 'channelId', 'type', 'message'], [message.guild.id, message.author.id, message.channel.id, 'join', args[1]])
    }
}

module.exports = {
    name,
    category,
    shortHelp,
    longHelp,
    run,
    permissions: ['MANAGE_GUILD']
}