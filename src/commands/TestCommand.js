const {getTranslationString} = require("../../common");
const {logConsole} = require("../utils/logFunctions");
logConsole('Initing discord command: Test...', "CMD/INFO", "");

const name = getTranslationString('en-US', 'TestCMD_Name'),
    category = getTranslationString('en-US', 'TestCMD_Category'),
    shortHelp = getTranslationString('en-US', 'TestCMD_ShortHelp'),
    longHelp = getTranslationString('en-US', 'TestCMD_LongHelp');


async function run(message, args) {
    message.channel.send(getTranslationString('en-US', 'TestCMD_RunMessage')).catch(console.error)
}

module.exports = {
    name,
    category,
    shortHelp,
    longHelp,
    run,
    permissions: []
}