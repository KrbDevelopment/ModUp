const common = require("../../common");

function getMemberFromMention(mention) {
    if (!mention) return;
    if (!mention.startsWith('<@') && !mention.endsWith('>')) return;
    mention = mention.slice(2, -1);

    if (mention.startsWith("!")) {
        mention = mention.slice(1);
    }

    return common.data['discord'].client.users.cache.get(mention);
}

function getTextChannelFromMention(mention) {
    if (!mention) return;
    if (!mention.startsWith('<#') && !mention.endsWith('>')) return;
    mention = mention.slice(2, -1);

    if (mention.startsWith("!")) {
        mention = mention.slice(1);
    }

    return common.data['discord'].client.channels.cache.get(mention);

}

module.exports = {
    getMemberFromMention,
    getTextChannelFromMention
}