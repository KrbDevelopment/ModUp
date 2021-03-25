const {logConsole} = require("../utils/logFunctions");
const axios = require('axios')
const common = require("../../common");

logConsole('Initing discord command: Template...', "CMD/INFO", "");

const name = "template",
    category = "Testing",
    shortHelp = `We didn't set a message yet`,
    longHelp = `We didn't set a message yet`;

async function run(message, args) {

}

module.exports = {
    name,
    category,
    shortHelp,
    longHelp,
    run,
    permissions: []
}