const common = require("../../common");
const mysql = require("../loginServices/mysql");
const settings = require("../utils/settingsFunctions");
const discord = require("discord.js");


function getMemberLevel(guild, userid) {
    return common.database['member'].filter(function (e) {
       return (e.guild === guild && e.uuid === userid)
    })[0].level;
}

function getMemberPoints(guild, userid) {
    return common.database['member'].filter(function (e) {
        return (e.guild === guild && e.uuid === userid)
    })[0].points;
}


function getMemberRank(guild, userid) {
    return common.database['member'].filter(function (e) {
        return (e.guild === guild)
    }).sort((a, b) => (a.level < b.level) ? 1 : -1).findIndex(x => x.uuid === userid) + 1
}

function addMemberPoints(guild, userid, points) {
    common.database['member'].filter(function (e) {
        return (e.guild === guild.id && e.uuid === userid)
    })[0].points += points;

    mysql.updateRows("member", [`guild = ${guild.id}`, `uuid = ${userid}`], [`points = points + ${points}`])
}


async function MemberLevelup(guild, userid, level) {
    const member = common.database['member'].filter(function (e) {
        return (e.guild === guild.id && e.uuid === userid)
    })[0];
    member.points = 0;
    member.level = level;

    const levelup_channel = "824025876723138570"; // TODO: Changeable
    var channel = guild.channels.cache.get(levelup_channel)

    const bot_name = await settings.getServerSetting(guild.id, "bot_name");
    const bot_picture = await settings.getServerSetting(guild.id, "bot_picture");
    const bot_color = await settings.getServerSetting(guild.id, "bot_color");

    const LevelupCard = new discord.MessageEmbed()
        .setColor(bot_color)
        .setAuthor(bot_name, bot_picture)
        .addField("New Levelup", "<@!"+ userid +">, you have reached a new Levelup!", false)
        .addField("Current Level", "Your new Level is now " + level, false)


    channel.send(LevelupCard);

    mysql.updateRows("member", [`guild = ${guild.id}`, `uuid = ${userid}`], [`level = ${level}`, `points = 0`])
}

async function addMemberMessagePoints(guild, userid) {
    var guildid = guild.id
    var ppm = parseInt(await settings.getServerSetting(guildid, "rank_ppm"));
    var factor = parseInt(await settings.getServerSetting(guildid, "rank_factor"));


    let level = await getMemberLevel(guildid, userid)
    var points = await getMemberPoints(guildid, userid)

    var rechnung = points + ppm
    if (level * factor <= points + ppm) {
        level += 1

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