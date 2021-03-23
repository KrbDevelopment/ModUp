const common = require("../../common");
const fs = require('fs')
const mysql = require("../loginServices/mysql");
const {replaceArray} = require("../utils/genericFunctions");
const {getEmbedFromCode} = require("../utils/embedInterpreter");

console.log("=> Initing discord module: JoinListener...")

common.data['discord'].client.on('guildMemberAdd', (member) => {
    const replacements = {
        '$$MEMBER_NAME': member.displayName,
        '$$MEMBER_ID': member.id,
        '$$GUILD_NAME': member.guild.name,
        '$$GUILD_ID': member.guild.id
    }

    mysql.queryAll('guild_messages', ['guildId = ' + member.guild.id, 'type = \'join\'']).then((messages) => {
        messages.forEach((message) => {
            getEmbedFromCode(message.message).then((embed) => {
                embed.title = replaceArray(embed.title, replacements)
                embed.description = replaceArray(embed.description, replacements)

                if (Object.keys(embed.fields[0]).length > 0) {
                    embed.fields.forEach((field) => {
                        field.name = replaceArray(field.name, replacements)
                        field.value = replaceArray(field.value, replacements)
                    })
                } else {
                    embed.fields = []
                }

                common.data['discord'].client.channels.cache.get(message.channelId)?.send({embed: embed});
            });
        });
    });
});