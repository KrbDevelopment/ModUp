const common = require("../../common");
const {logConsole} = require("../utils/logFunctions");

common.data['webserver'].app.get('/commands/list', (req, res) => {
    res.send(JSON.stringify(common.data['discord'].commands))
})
logConsole("Successfully initted HTTP/GET for route '/commands/list'", "RESTAPI/ROUTE", "");