const {logConsole} = require("../utils/logFunctions");
const common = require("../../common");
const mysql = require("../loginServices/mysql");
const {getWarningMessage} = require("../utils/messageFunctions");
const {getMemberFromMention} = require("../utils/mentionFunctions");
const {getErrorMessage} = require("../utils/messageFunctions");

logConsole('Initing discord command: Kick...', "CMD/INFO", "");

const name = "kick",
    category = "Moderation",
    shortHelp = `Kick a specific player with automated kick message`,
    longHelp = `Kick a specific player with automated kick message
    
    Parameters
    kick <@User>
    kick <@User> <Reason>`;

async function run(message, args) {
    if (args.length <= 0) {
        message.channel.send(getErrorMessage("Please provide a mentioned user as first parameter."))
        return;
    }

    let member = getMemberFromMention(message.guild.id, args[0]);
    if (!member) {
        message.channel.send(getErrorMessage("Please provide a **valid** mentioned user as first parameter."))
        return;
    }

    if (!member.kickable) {
        message.channel.send(getErrorMessage("Member is not kickable."))
        return;
    }

    let reason = "- No Reason Provided -";
    if (args.length >= 2) {
        reason = args.splice(1, args.length).join(" ");
    }

    await member.send(getWarningMessage("You've been kicked", `${message.author.username} has kicked you from ${message.guild.name}. \n\nReason: ${reason}`))
    member.kick(reason)
    message.author.send(getWarningMessage("User has been kicked", `You successfully kicked ${member.username}`))
    let newElement = common.database['guild_kicks'][common.database['guild_kicks'].push({
        guild: message.guild.id,
        staff: message.author.id,
        member: member.id,
        reason
    }) - 1]

    mysql.addRow('guild_kicks', ['guild', 'staff', 'member', 'reason'], [message.guild.id, message.author.id, member.id, reason]).then((res) => {
        newElement.id = res
    })
}

module.exports = {
    name,
    category,
    shortHelp,
    longHelp,
    run,
    permissions: ["KICK_MEMBERS"]
}