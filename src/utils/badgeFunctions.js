const common = require("../../common");
const mysql = require("../loginServices/mysql");


function getMemberBadges(guild, userid) {
    return common.database['member_badges'].filter(function (e) {
        return (e.guild === guild && e.uuid === userid)
    });
}

function getMemberBadge(guild, userid, badge_name) {
    return common.database['member_badges'].filter(function (e) {
        return (e.guild === guild && e.uuid === userid && e.badge_name == badge_name)
    });
}

module.exports = {
    getMemberBadges,
    getMemberBadge
}