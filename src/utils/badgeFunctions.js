const common = require("../../common");
const mysql = require("../loginServices/mysql");


function getMemberBadges(guild, userid) {
    return common.database['member_badges'].filter(function (e) {
       return (e.guild === guild && e.uuid === userid)
    });
}

function getMemberBadge(guild, userid, identifier) {
    return common.database['member_badges'].filter(function (e) {
        return (e.guild === guild && e.uuid === userid && e.identifier === identifier)
    })[0];
}

function getBadgeInfo(guild, identifier) {
    return common.database['badges'].filter(function (e) {
       return (e.guild === guild && e.identifier === identifier)
    })[0];
}

function giveMemberBadge(guild, userid, identifier) {
    var newElement = [common.database['member_badges'].push({
        guild,
        uuid: userid,
        identifier
    }) - 1]
    mysql.addRow("member_badges", ["guild", "uuid", "identifier"], [guild, userid, identifier]).then((res) => {
        newElement.id = res
    })
}

function removeMemberBadge(guild, userid, identifier) {
    common.database['badges'] = common.database['badges'].filter(function (e) {
        return (e.guild === guild && e.uuid === userid && e.identifier === identifier)
    })
    mysql.deleteRows("member_badges", [`guild = ${guild}`, `uuid = ${userid}`, `identifier = "${identifier}"`])
}

module.exports = {
    getMemberBadges,
    getMemberBadge,
    getBadgeInfo,
    giveMemberBadge,
    removeMemberBadge
}