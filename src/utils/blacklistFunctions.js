const common = require("../../common");
const mysql = require("../loginServices/mysql");

async function getBlacklistWords(guildId) {
    return new Promise(async function (resolve, reject) {
        mysql.querySelected('guild_blacklist_words', ['word'], ['guildId = \''+guildId+'\''])
            .then((res) => {
                resolve(res);
            })
            .catch((err) => {
                reject(err);
            })
    });
}

async function getWhitelistLinks(guildId) {
    return new Promise(async function (resolve, reject) {
        mysql.querySelected('guild_whitelist_links', ['url'], ['guildId = \''+guildId+'\''])
            .then((res) => {
                resolve(res);
            })
            .catch((err) => {
                reject(err);
            })
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