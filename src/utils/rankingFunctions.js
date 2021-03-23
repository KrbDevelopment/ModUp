const common = require("../../common");
const mysql = require("../loginServices/mysql");
const settings = require("../utils/settingsFunctions");

function getMemberLevel(guild, userid) {
    return new Promise(function (resolve, reject) {
        mysql.querySelected("member", ["level"], ['guild = ' + guild, 'uuid = ' + userid]).then((res) => {
            resolve(res[0].level);
        });
    });
}

function getMemberPoints(guild, userid) {
    return new Promise(function (resolve, reject) {
        mysql.querySelected("member", ["points"], ['guild = ' + guild, 'uuid = ' + userid]).then((res) => {
            resolve(res[0].points);
        });
    });
}


function getMemberRank(guild, userid) {
    return new Promise(function (resolve, reject) {
        mysql.queryStatement(`SELECT x.position FROM (SELECT t.id, t.uuid, t.guild, @rownum := @rownum + 1 AS position FROM member t JOIN (SELECT @rownum := 0) r ORDER BY t.level DESC) x WHERE x.uuid = ${userid} AND x.guild = ${guild}`).then((res) => {
            resolve(res[0].position);
        });
    });
}

function addMemberPoints(guild, userid, points) {
    return new Promise(function (resolve, reject) {
        mysql.updateRows("member", [`guild = ${guild}`, `uuid = ${userid}`], [`points = points + ${points}`])
            .then((res) => {
                resolve(res.affectedRows);
            });
    });
}

function MemberLevelup(guild, userid, level) {
    return new Promise(function (resolve, reject) {
        mysql.updateRows("member", [`guild = ${guild}`, `uuid = ${userid}`], [`level = ${level}`, `points = 0`])
            .then((res) => {
            resolve(res.affectedRows);
        });
    });
}

async function addMemberMessagePoints(guild, userid) {
    var ppm = parseInt(await settings.getServerSetting(guild, "rank_ppm"));
    var factor = parseInt(await settings.getServerSetting(guild, "rank_factor"));

    let level = await getMemberLevel(guild, userid)
    var points = await getMemberPoints(guild, userid)

    if (level * factor < points + ppm) {
        level += 1
        await MemberLevelup(guild, userid, level)

    } else {
        await addMemberPoints(guild, userid, ppm)

    }
}


module.exports = {
    getMemberLevel,
    getMemberPoints,
    getMemberRank,
    addMemberMessagePoints
}