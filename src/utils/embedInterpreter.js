const common = require("../../common");
const mysql = require("../loginServices/mysql");

async function getEmbedFromCode(code) {
    try {
        var embedStr = common.database['embeds'].filter(function (e) {
            return (e.identifier === code)
        })[0].code;
        var embedObj = JSON.parse(embedStr)

        const embedJS = new common.data['discord'].discord.MessageEmbed();

        embedObj.author.icon_url = embedObj.author.icon;
        embedObj.thumbnail = {};
        embedObj.thumbnail.url = embedObj.thumb_url;
        embedObj.image = {}
        embedObj.timestamp = new Date();
        embedObj.footer = {
            text: 'modup.pro',
            icon_url: ''
        }

        return embedObj
    } catch (e) {
        return {}
    }
}

module.exports = {
    getEmbedFromCode
}