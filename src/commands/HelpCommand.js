const common = require("../../common");
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
    const commands = {}

    console.log(common.data['discord'].commands)
}

async function showDetail(message, args) {

}

module.exports = {
    name: name,
    run: run,
    permissions: []
}