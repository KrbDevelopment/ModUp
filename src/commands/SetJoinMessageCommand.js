const common = require("../../common");
const mentionF = require("../utils/mentionFunctions")
const messageF = require("../utils/messageFunctions");
const mysql = require("../loginServices/mysql");

console.log("=> Initing discord command: SetJoinMessage")

const name = "setjoinmessage"

function run(message, args) {
    const targetChannel = mentionF.getTextChannelFromMention(args[0]);
    if (!targetChannel) {
        message.channel.send(messageF.getErrorMessage('Please mention a channel as your first parameter.'));
        return;
    }
    args = args.slice(1)
    const joinMessage = args.join(' ')
    mysql.addRow('guild_messages', ['guildId', 'creatorId', 'message'], [message.guild.id, message.author.id, joinMessage])
        .then((res) => {
            message.channel.send(messageF.getSuccessMessage('Successfully changed join message', `You successfully changed the join message into: ${joinMessage}`));
        })
        .catch((err) => {

            message.channel.send(messageF.getErrorMessage('We were unable to set your message. Please report this issue to a ModUp developer.'));
            console.log(err.stack)
        });
}

module.exports = {
    name: name,
    run: run,
    permissions: ['MANAGE_GUILD']
}