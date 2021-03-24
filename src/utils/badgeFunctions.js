const common = require("../../common");
const mysql = require("../loginServices/mysql");


function getMemberBadges(guild, userid) {
    return new Promise(function (resolve, reject) {
        mysql.queryAll("member_badges", ['guild = ' + guild, 'uuid = ' + userid]).then((res) => {
            resolve(res);
        });
    });
}

function getMemberBadge(guild, userid, badge_name) {
    return new Promise(function (resolve, reject) {
        mysql.queryAll("member_badges", ['guild = ' + guild, 'uuid = ' + userid, 'badge_name = ' + badge_name]).then((res) => {
            resolve(res[0]);
        });
    });
}

module.exports = {
    getMemberBadges,
    getMemberBadge
}