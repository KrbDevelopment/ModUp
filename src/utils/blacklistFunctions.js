const common = require("../../common");
const mysql = require("../loginServices/mysql");

async function getBlacklistWords(guildId) {
    return common.database['guild_blacklist_words'].filter(function (e) {
        return (guildId === guildId)
    });
}

async function getWhitelistLinks(guildId) {
    return common.database['guild_whitelist_links'].filter(function (e) {
        return (guildId === guildId)
    });
}

async function isUrl(s, guildId) {
    const regexp = /(http|https):\/\/(\w+:?\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@\-\/]))?/;
    const whitelisted = await getWhitelistLinks(guildId);
    const links = whitelisted.map((link) => {
       return link.url
    });

    let allowed = false;
    links.forEach((link) => {
        const formatted = link?.replaceAll('https://').replaceAll('http://').replaceAll('www.')
        if (s.toLowerCase().startsWith(link))
            allowed = true;
    })

    return (regexp.test(s) && !allowed);
}

async function isBlacklistWord(s, guildId) {
    const blacklistWords = await getBlacklistWords(guildId);
    const words = blacklistWords.map((blacklist) => {
        return blacklist.word
    });
    return words.includes(s);
}

module.exports = {
    isUrl,
    isBlacklistWord
}