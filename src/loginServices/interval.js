const common = require("../../common");
const fs = require('fs')
const express = require('express')
const {logConsole} = require("../utils/logFunctions");

logConsole("Starting intervals...", "SERVICE/INFO", "");

fs.readdir('./src/thread/', (err, files) => {
    files.forEach((file) => {
        if (!file.endsWith(".js")) return;
        require('../thread/' + file);
    });
});

logConsole("Successfully started intervals", "SERVICE/INFO", "");