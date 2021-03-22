const common = require("../../common");
const fs = require('fs')
const express = require('express')

console.log("=> Connecting to rest api server...");
const app = express()
console.log("=> Successfully connected to rest api server");

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
    console.log(`=> Rest api listening at http://localhost:${port}`)
});