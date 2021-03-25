const common = require("../../common");
const mysql = require("../loginServices/mysql");

function getServerSetting(guild, setting) {
    return common.database['guild_settings'].filter(function (e) {
        return (e.guild === guild.id && e.setting === setting)
    })[0].value;
}




function createServerSettings(guild) {
    // Sense?
    return common.database['guild_settings'].push({
        bot_name: "modup.pro",
        bot_picture: "https://i.imgur.com/5MMGPRO.png",
        bot_color: "#3498DB",
        description: "modup.pro",
        rank_ppm: "1",
        rank_factor: "3"
    });
}



module.exports = {
    getServerSetting
}