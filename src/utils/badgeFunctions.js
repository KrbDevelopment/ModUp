const common = require("../../common");
const mysql = require("../loginServices/mysql");


function getMemberBadges(guild, userid) {
    return new Promise(function (resolve, reject) {
        mysql.queryAll("member_badges", ['guild = ' + guild, 'uuid = ' + userid]).then((res) => {
            resolve(res);
        });
    });
}

function getMemberBadge(guild, userid, identifier) {
    return new Promise(function (resolve, reject) {
        mysql.queryAll("member_badges", ['guild = ' + guild, 'uuid = ' + userid, 'identifier = "' + identifier + '"']).then((res) => {
            resolve(res[0]);
        });
    });
}

function getBadgeInfo(guild, identifier) {
    return new Promise(function (resolve, reject) {
        mysql.queryAll("badges", ['guild = ' + guild, 'identifier = "' + identifier + '"']).then((res) => {
            resolve(res[0]);
        });
    });
}

function giveMemberBadge(guild, userid, identifier) {
    return new Promise(function (resolve, reject) {
        mysql.addRow("member_badges", ["guild", "uuid", "identifier"], [guild, userid, identifier]).then((res) => {
            resolve(res);
        });
    }) ;
}

module.exports = {
    getMemberBadges,
    getMemberBadge,
    getBadgeInfo,
    giveMemberBadge
}