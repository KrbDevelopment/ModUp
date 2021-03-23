const common = require("../../common");
const fs = require('fs')

console.log("=> Initing discord module: CommandListener...")

common.data['discord'].client.on('message', async (message) => {
    if (message.author.bot) return;
    if (!message.content.startsWith(common.data['config'].BOT_PREFIX)) return;

    const args = message.content.slice(common.data['config'].BOT_PREFIX.length).trim().split(' ');
    const command = args.shift().toLowerCase();

    const cmd = common.data['discord'].commands[command];
    if (!cmd) return;
    if (!message.member.hasPermission(cmd.permissions)) return;

    await cmd.run(message, args);
});

common.data['discord'].commands = {};

fs.readdir('./src/commands/', (err, files) => {
    files.forEach((file) => {
        if (!file.endsWith(".js")) return;
        var command = require('../commands/' + file);
        common.data['discord'].commands[command.name] = command;
    });
});