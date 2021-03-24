const common = require("../../common");
const fs = require('fs')
const Discord = require("discord.js");
const client = new Discord.Client();
const {logConsole} = require("../utils/logFunctions")

logConsole("Connecting to discord...", "SERVICE/INFO", "");
client.login(common.data.config.BOT_TOKEN).then(() => {
    logConsole("Successfully connected to discord", "SERVICE/INFO", "");

    common.data['discord'] = {
        discord: Discord,
        client: client
    };

    fs.readdir('./src/events/', (err, files) => {
        files.forEach((file) => {
            if (!file.endsWith(".js")) return;
            require('../events/' + file);
        });
    });
});