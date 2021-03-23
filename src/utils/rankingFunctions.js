const common = require("../../common");
const mysql = require("../loginServices/mysql");

async function getMemberLevel(guild, userid) {


    const userdata = mysql.querySelected("member", ["level"], ['guild = ' + guild, 'uuid = ' + userid])
    userdata.then((res) => {
        return res[0].level;
    });

}


module.exports = {
    getMemberLevel
}