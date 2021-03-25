const {logConsole} = require("../utils/logFunctions");
const axios = require('axios')
const common = require("../../common");
const mysql = require("../loginServices/mysql");
const {getSuccessMessage} = require("../utils/messageFunctions");
const {getErrorMessage} = require("../utils/messageFunctions");

logConsole('Initing discord command: WhitelistLink...', "CMD/INFO", "");

const name = "whitelistlink",
    category = "Generic",
    shortHelp = `Whitelist a specific link for your chat`,
    longHelp = `Whitelist a specific link for your chat
    
    Parameters:
    whitelistlink - Show all whitelisted links
    whitelistlink add <url>
    whitelistlink delete <id>`;

async function run(message, args) {
    if (args.length <= 0) {
        listLinks(message, args)
    } else if (args[0] === 'delete') {
        removeLink(message, args)
    } else if (args[0] === 'add') {
        addLink(message, args)
    } else {
        listLinks(message, args)
    }
}

function listLinks(message, args) {
    const embed = new common.data['discord'].discord.MessageEmbed();

    embed.setColor('#ff0000')
    embed.setTitle('Active link whitelists:')
    embed.setFooter("For delete: " + common.data['config'].BOT_PREFIX + "whitelist delete [id]")
    embed.setTimestamp(Date.now())

    const links = common.database['guild_whitelist_links'].filter(function (e) {
        return (e.guildId === message.guild.id);
    })

    for (const link of links) {
        embed.addField(`#${link.id}`, link.url, false);
    }

    message.channel.send(embed)
}

function removeLink(message, args) {
    if (args.length <= 1) {
        message.channel.send(getErrorMessage('Please provide a valid url id'))
    }

    common.database['guild_whitelist_links'] = common.database['guild_whitelist_links'].filter(function (e) {
        return (e.id !== parseInt(args[1]))
    })
    message.channel.send(getSuccessMessage("Whitelist deleted", "You've successfully deleted a link to your whitelist"))

    mysql.deleteRows('guild_whitelist_links', [`guildId = ${message.guild.id}`, `id = ${args[1]}`])
}

function addLink(message, args) {
    if (args.length <= 1) {
        message.channel.send(getErrorMessage('Please provide a valid url id'))
    }

    const newElement = common.database['guild_whitelist_links'][common.database['guild_whitelist_links'].push({
        guildId: message.guild.id,
        creatorId: message.author.id,
        url: args[1]
    }) - 1]

    message.channel.send(getSuccessMessage("Whitelist added", "You've successfully added a link to your whitelist"))

    mysql.addRow('guild_whitelist_links', ['guildId', 'creatorId', 'url'], [message.guild.id, message.author.id, args[1]]).then((res) => {
        newElement.id = res
    })
}

module.exports = {
    name,
    category,
    shortHelp,
    longHelp,
    run,
    permissions: []
}