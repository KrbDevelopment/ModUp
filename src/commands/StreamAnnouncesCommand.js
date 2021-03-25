const common = require("../../common");
const mysql = require("../loginServices/mysql");
const {getSuccessMessage} = require("../utils/messageFunctions");
const {getErrorMessage} = require("../utils/messageFunctions");
const {getTextChannelFromMention} = require("../utils/mentionFunctions");
const {logConsole} = require("../utils/logFunctions");
logConsole('Initing discord command: StreamAnnounces...', "CMD/INFO", "");

const name = "streamannounces",
    category = "Generic",
    shortHelp = `We didn't set a message yet`,
    longHelp = `We didn't set a message yet`;

async function run(message, args) {
    switch (args[0]) {
        case 'add':
            await addStreamer(message, args)
            break;

        case 'remove':
            await removeStreamer(message, args)
            break;

        default:
        case null:
            await listStreamers(message, args)
            break;
    }
}

async function listStreamers(message, args) {
    let streamers = common.database['guild_streamers'].filter(function (e) {
        return (e.guildId === message.guild.id)
    })
    let streamerList = "";
    streamers.forEach((streamer) => {
        streamerList += `- ${streamer.twitchName} | <#${streamer.channelId}>\n`;
    });

    const embed = new common.data['discord'].discord.MessageEmbed();

    embed.setColor('#ff0000')
    embed.setTitle('Streamers to announce:')
    embed.setDescription(streamerList);
    message.channel.send(embed);
}

async function addStreamer(message, args) {
    if (!args[1]) {
        message.channel.send(getErrorMessage("Please mention a channel as a first parameter"))
        return;
    }

    if (!args[2]) {
        message.channel.send(getErrorMessage("Please use a twitch name as a second parameter"))
        return;
    }

    const channel = getTextChannelFromMention(args[1])
    const twitchName = args[2]

    common.database['guild_streamers'].push({
        guildId: message.guild.id,
        channelId: channel.id,
        creatorId: message.author.id,
        twitchName: twitchName
    })
    message.channel.send(getSuccessMessage("Streamer added", "You've successfully added a streamer to your announcements"))

    mysql.addRow('guild_streamers', ['guildId', 'channelId', 'creatorId', 'twitchName'], [message.guild.id, channel.id, message.author.id, twitchName])
}

async function removeStreamer(message, args) {
    if (!args[1]) {
        message.channel.send(getErrorMessage("Please mention a channel as a first parameter"))
        return;
    }

    if (!args[2]) {
        message.channel.send(getErrorMessage("Please use a twitch name as a second parameter"))
        return;
    }

    const channel = getTextChannelFromMention(args[1])
    const twitchName = args[2]

    common.database['guild_streamers'].filter(function (e) {
        return (e.guildId === message.guild.id && e.channelId === channel.id && e.twitchName === twitchName)
    }).delete()

    message.channel.send(getSuccessMessage("Streamer deleted", "You've successfully deleted a streamer from your announcements"))
    mysql.deleteRows('guild_streamers', [`guildId = '${message.guild.id}'`, `channelId = '${channel.id}'`, `twitchName = '${twitchName}'`])
}

module.exports = {
    name,
    category,
    shortHelp,
    longHelp,
    run,
    permissions: []
}