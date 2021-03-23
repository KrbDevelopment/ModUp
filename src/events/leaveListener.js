const common = require("../../common");
const fs = require('fs')
const mysql = require("../loginServices/mysql");

console.log("=> Initing discord module: LeaveListener...")

common.data['discord'].client.on('guildMemberRemove', (member) => {
    mysql.queryAll('guild_messages', ['guildId = ' + member.guild.id, 'type = \'leave\'']).then((messages) => {
        messages.forEach((message) => {
            common.data['discord'].client.channels.cache.get(message.channelId)?.send(message.message);
        });
    });
});