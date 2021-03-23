const common = require("../../common");

function replaceArray(str, replacements) {
    Object.keys(replacements).forEach((key) => {
        let value = replacements[key];
        str = str.replaceAll(key, value);
    });

    return str;
}

module.exports = {
    replaceArray
}