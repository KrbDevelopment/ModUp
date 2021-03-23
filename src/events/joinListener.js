const common = require("../../common");
const fs = require('fs')
const mysql = require("../loginServices/mysql");

console.log("=> Initing discord module: JoinListener...")

common.data['discord'].client.on('guildMemberAdd', (member) => {
    mysql.queryAll('guild_messages', ['guildId = ' + member.guild.id, 'type = \'join\'']).then((messages) => {
        messages.forEach((message) => {
            common.data['discord'].client.channels.cache.get(message.channelId)?.send(message.message);
        });
    });
});