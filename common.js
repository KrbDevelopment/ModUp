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

const database = {
    "embeds": {},
    "failed_jobs": {},
    "guild_blacklist_words": {},
    "guild_messages": {},
    "guild_settings": {},
    "guild_streamers": {},
    "guild_whitelist_links": {},
    "guilds": {},
    "member": {},
    "member_badges": {},
    "migrations": {},
    "password_resets": {},
    "role_permissions": {},
    "roles": {},
    "statistics": {},
    "users": {},
    "badges": {},
}

module.exports = {
    translation: translations,
    getTranslationString,
    database,
    data: []
}