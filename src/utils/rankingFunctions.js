const common = require("../../common");
const mysql = require("../loginServices/mysql");
const settings = require("../utils/settingsFunctions");
const discord = require("discord.js");


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
    var guildid = guild.id
    return new Promise(function (resolve, reject) {
        mysql.updateRows("member", [`guild = ${guildid}`, `uuid = ${userid}`], [`points = points + ${points}`])
            .then((res) => {
                resolve(res.affectedRows);
            });
    });
}


async function MemberLevelup(guild, userid, level) {
    return new Promise(function (resolve, reject) {
        console.log("levelup function")
        mysql.updateRows("member", [`guild = ${guild.id}`, `uuid = ${userid}`], [`level = ${level}`, `points = 0`])
            .then(async (res) => {

            const levelup_channel = "824025876723138570";
            console.log(levelup_channel)

            var channel = guild.channels.cache.get(levelup_channel)
            console.log(channel);

            const bot_name = await settings.getServerSetting(guild.id, "bot_name");
            const bot_picture = await settings.getServerSetting(guild.id, "bot_picture");
            const bot_color = await settings.getServerSetting(guild.id, "bot_color");

            console.log(bot_name + " | " + bot_picture + " | " + bot_color + " | ")

            const LevelupCard = new discord.MessageEmbed()
                .setColor(bot_color)
                .setAuthor(bot_name, bot_picture)
                .addField("New Levelup", "<@!"+ userid +">, you have reached a new Levelup!", false)
                .addField("Current Level", "Your new Level is now " + level, false)


            channel.send(LevelupCard);

            resolve(res.affectedRows);
        });
    });
}

async function addMemberMessagePoints(guild, userid) {
    var ppm = parseInt(await settings.getServerSetting(guild, "rank_ppm"));
    var factor = parseInt(await settings.getServerSetting(guild, "rank_factor"));

    var guildid = guild.id

    let level = await getMemberLevel(guildid, userid)
    var points = await getMemberPoints(guildid, userid)

    var rechnung = points + ppm
    console.log(rechnung)
    console.log(level * factor + " <= " +  rechnung)
    if (level * factor <= points + ppm) {
        level += 1

        console.log("a new Levelup registered")
        await MemberLevelup(guild, userid, level)


    } else {
        await addMemberPoints(guild, userid, ppm)

    }
}

async function getRankbar(guild, level, points) {
    var factor = parseInt(await settings.getServerSetting(guild, "rank_factor"));
    var percentage = parseFloat((points / (level * factor))) * 100;

    var count = 0;
    while (percentage >= 10) {
        count++;
        percentage -= 10;
    }

    var filled = ":blue_square:";
    var empty = ":white_large_square:";

    return filled.repeat(count) + empty.repeat(10-count);
}

module.exports = {
    getMemberLevel,
    getMemberPoints,
    getMemberRank,
    addMemberMessagePoints,
    getRankbar
}