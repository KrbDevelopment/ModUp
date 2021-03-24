const common = require("../../common");
const fs = require('fs')
const express = require('express')
const {logConsole} = require("../utils/logFunctions");

logConsole("Connecting to rest api server...", "SERVICE/INFO", "");
const app = express()

const port = common.data['config'].WEB_PORT;

common.data['webserver'] = {
    express: express,
    app: app
};

fs.readdir('./src/restapi/', (err, files) => {
    files.forEach((file) => {
        if (!file.endsWith(".js")) return;
        require('../restapi/' + file);
    });
});

app.listen(port, () => {
    logConsole(`Rest api listening at http://localhost:${port}`, "RESTAPI/INFO", "");
});

logConsole("Successfully connected to rest api server", "SERVICE/INFO", "");