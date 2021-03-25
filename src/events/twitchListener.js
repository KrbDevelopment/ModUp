const common = require("../../common");
const mysql = require("../loginServices/mysql");
const request = require('superagent')
const {logConsole} = require("../utils/logFunctions");

logConsole('Initing discord module: TwitchListener...', "EVENT/INFO", "");

const header = {
    'Client-ID': 'o41hsc6dmoqng2z16p0e4gnsbhbxs6',
    'Accept':    'application/vnd.twitchtv.v5+json'
};
const last_update = []

var minutes = 0.5;
setInterval(function() {
    checkTwitch()
}, minutes * 60 * 1000);

async function checkTwitch() {
    var lookup = common.database['guild_streamers'].filter(function (e) {
        return e.guildId != null
    });

    var streamerNames = lookup.map(function (streamer) {
        return streamer.twitchName
    });

    var url = 'https://api.twitch.tv/kraken/users?login=' + streamerNames.join(',')

    request.get(url).set(header).end((err, res) => {
        const content = JSON.parse(res.text);
        content.users.forEach((user) => {
            request.get('https://api.twitch.tv/kraken/streams/' + user._id).set(header).end((err2, res2) => {
                const stream = JSON.parse(res2.text).stream

                if (stream != null) {
                    if (last_update[user.name] == null || last_update[user.name] === false) {
                        const channels = lookup.filter(function (e) {
                            return e.twitchName === user.name
                        })

                        channels.forEach((channel) => {
                            const embed = new common.data['discord'].discord.MessageEmbed();
                            embed.setTitle(user.display_name)
                            embed.setDescription(`@${user.name} is live right now, check him out.`)
                            embed.setURL("https://twitch.tv/" + user.name);
                            embed.setThumbnail(user.logo);
                            common.data['discord'].client.channels.cache.get(channel.channelId).send(embed)
                        });

                        last_update[user.name] = true
                    }
                } else {
                    if (last_update[user.name] != null) {
                        last_update[user.name] = null
                    }
                }
            });
        });
    });
}

module.exports = {
    checkTwitch
}