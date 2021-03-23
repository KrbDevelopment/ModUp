const common = require("../../common");
const mysql = require("../loginServices/mysql");

function getMemberLevel(guild, userid) {
    return new Promise(function (resolve, reject) {
        mysql.querySelected("member", ["level"], ['guild = ' + guild, 'uuid = ' + userid]).then((res) => {
            resolve(res[0].level);
        });
    });
}


module.exports = {
    getMemberLevel
}