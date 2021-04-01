const {logConsole} = require("../utils/logFunctions");
const common = require("../../common");
const mysql = require("../loginServices/mysql");

logConsole('Initing discord command: UpdateDB...', "CMD/INFO", "");

const name = "updatedb",
    category = "Development",
    shortHelp = `We didn't set a message yet`,
    longHelp = `We didn't set a message yet`;

async function run(message, args) {
    Object.keys(common.database).forEach(async (table_name) => {
        logConsole(`Loading table ${table_name}...`, "DATABASE/LOAD", "");
        const data = await mysql.queryAllNoCondi(table_name)
        common.database[table_name] = data;
        logConsole(`Successfully loaded table ${table_name} with ${data.length} entry's`, "DATABASE/LOAD", "");
    })
}

module.exports = {
    name,
    category,
    shortHelp,
    longHelp,
    run,
    permissions: []
}