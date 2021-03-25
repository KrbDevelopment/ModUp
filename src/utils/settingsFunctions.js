const common = require("../../common");
const mysql = require("../loginServices/mysql");

function getServerSetting(guild, setting) {
    return common.database['guild_settings'].filter(function (e) {
        return (e.guild === guild && e.setting === setting)
    })[0].value;
}

module.exports = {
    getServerSetting
}