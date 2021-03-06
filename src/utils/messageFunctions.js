const common = require("../../common");

function getErrorMessage(description) {
    const embed = new common.data['discord'].discord.MessageEmbed();

    embed.setColor('#ff0000')
    embed.setTitle('An error occurred')
    embed.setDescription(description)
    embed.setFooter('modup.pro', 'https://i.imgur.com/n6lYSjl.png')
    embed.setTimestamp(Date.now())

    return embed;
}

function getSuccessMessage(title, description) {
    const embed = new common.data['discord'].discord.MessageEmbed();

    embed.setColor('#1ba900')
    embed.setTitle(title)
    embed.setDescription(description)
    embed.setFooter('modup.pro', 'https://i.imgur.com/n6lYSjl.png')
    embed.setTimestamp(Date.now())

    return embed;
}

function getWarningMessage(title, description) {
    const embed = new common.data['discord'].discord.MessageEmbed();

    embed.setColor('#cf551c')
    embed.setTitle(title)
    embed.setDescription(description)
    embed.setFooter('modup.pro', 'https://i.imgur.com/n6lYSjl.png')
    embed.setTimestamp(Date.now())

    return embed;
}

module.exports = {
    getErrorMessage,
    getSuccessMessage,
    getWarningMessage
}