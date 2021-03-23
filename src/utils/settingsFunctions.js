const common = require("../../common");
const mysql = require("../loginServices/mysql");

function getServerSetting(guild, setting) {
    return new Promise(function (resolve, reject) {
        mysql.querySelected("guild_settings", ["value"], ['guild = ' + guild, 'setting = "' + setting + '"']).then((res) => {
            resolve(res[0].value);
        });
    });
}




function createServerSettings(guild) {
    mysql.addRow("guilds_settings", ["bot_name", "bot_picture", "bot_color", "description", "rank_ppm", "rank_factor"], ["modup.pro", "https://i.imgur.com/5MMGPRO.png", "#3498DB", "modup.pro", "1", "3"])
}



module.exports = {
    getServerSetting
}