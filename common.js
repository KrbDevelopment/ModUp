const fs = require('fs')
const translations = {}

fs.readdir('./translations', (err, files) => {
    files.forEach((file) => {
        if (!file.endsWith(".json")) return;
        translations[file.replace('.json', '')] = require('./translations/' + file);
    })
});

function getTranslationString(lang, name) {
    const translation = translations[lang]?.translations[name];
    return translations ? translation : `Translation ${name} doesn't exists for language ${lang}`
}

module.exports = {
    translation: translations,
    getTranslationString,
    data: []
}