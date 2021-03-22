const common = require("../../common");
const fs = require('fs')
const Discord = require("discord.js");
const client = new Discord.Client();

console.log("=> Connecting to discord...");
client.login(common.data.config.BOT_TOKEN);
console.log("=> Successfully connected to discord");

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