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
        listMsgs(message, args)
    } else if (args[0] === 'delete') {
        removeMsgs(message, args)
    } else {
        addMsgs(message, args)
    }
}

function listMsgs(message, args) {
    const embed = new common.data['discord'].discord.MessageEmbed();

    embed.setColor('#ff0000')
    embed.setTitle('Active leave messages:')
    embed.setFooter("For delete: " + common.data['config'].BOT_PREFIX + "setleavemessage delete [number]")
    embed.setTimestamp(Date.now())

    const positions = common.database['guild_messages'].filter(function (e) {
        return (e.guildId === message.guild.id && e.type === 'leave');
    })

    for (const position of positions) {
        let embedO = getEmbedFromCode(position.message);
        embed.addField(`#${position.gmId}`, embedO.title + ` (<#${position.channelId}>)`, false);
    }

    message.channel.send(embed)
}

function addMsgs(message, args) {
    const targetChannel = mentionF.getTextChannelFromMention(args[0]);
    if (!targetChannel) {
        message.channel.send(messageF.getErrorMessage('Please mention a channel as your first parameter.'));
        return;
    }

    if (args[1] == null) {
        message.channel.send(messageF.getErrorMessage('Please use a embed code as your second parameter.'));
        return;
    }

    var newElement = [common.database['guild_messages'].push({
        guildId: message.guild.id,
        creatorId: message.author.id,
        channelId: message.channel.id,
        type: 'leave',
        message: args[1]
    }) - 1];

    message.channel.send(messageF.getSuccessMessage('Successfully changed leave message', `You successfully changed the leave message`));
    mysql.addRow('guild_messages', ['guildId', 'creatorId', 'channelId', 'type', 'message'], [message.guild.id, message.author.id, message.channel.id, 'leave', args[1]]).then((res) => {
        newElement.id = res
    })
}

function removeMsgs(message, args) {
    if (args[1] === undefined || args[1] === null) {
        message.channel.send(getErrorMessage("Please enter a position as your first parameter"));
        return;
    }
    const positionInt = parseInt(args[1]);

    common.database['guild_messages'].filter(function (e) {
        return (e.gmId === positionInt);
    }).delete()

    message.channel.send(getSuccessMessage("Deleted Leave Message", "You successfully deleted the leave message " + positionInt));
    mysql.queryVoid("DELETE FROM guild_messages WHERE gmId = " + positionInt);
}

module.exports = {
    name,
    category,
    shortHelp,
    longHelp,
    run,
    permissions: ['MANAGE_GUILD']
}