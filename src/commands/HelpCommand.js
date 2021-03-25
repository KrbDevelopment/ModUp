const common = require("../../common");
const {getErrorMessage} = require("../utils/messageFunctions");
const {logConsole} = require("../utils/logFunctions");
logConsole('Initing discord command: Help...', "CMD/INFO", "");

const name = "help",
    category = "Generic",
    shortHelp = `The help command will show up all commands with the category and its possible parameters.`,
    longHelp = `The help command will show up all commands with the category and its possible parameters. 
    
    Parameters: 
    help <command> - Show detailed help message and permissions to command`;


async function run(message, args) {
    if (args[0] == null) {
        await listCommands(message, args)
    } else {
        showDetail(message, args)
    }
}

async function listCommands(message, args) {
    const embed = new common.data['discord'].discord.MessageEmbed();
    embed.setTitle('Here is a list with all commands:')
    embed.setFooter('modup.pro', 'https://i.imgur.com/n6lYSjl.png')

    Object.keys(common.data['discord'].commands).forEach(async (command_key) => {
        const command = common.data['discord'].commands[command_key];
        embed.addField(`${command.name} [${command.category}]`, command.shortHelp, false)
    });

    message.channel.send(embed)
}

async function showDetail(message, args) {
    const command = common.data['discord'].commands[args[0]]

    if (command == null) {
        message.channel.send(getErrorMessage("There are no details for this command."))
        return;
    }

    const embed = new common.data['discord'].discord.MessageEmbed();
    embed.setTitle('Here is a list with all commands:')
    embed.setFooter('modup.pro', 'https://i.imgur.com/n6lYSjl.png')
    embed.setDescription(command.longHelp)

    message.channel.send(embed)
}

module.exports = {
    name,
    category,
    shortHelp,
    longHelp,
    run,
    permissions: []
}