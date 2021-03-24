const common = require("../../common");
const {logConsole} = require("../utils/logFunctions");

common.data['webserver'].app.get('/', (req, res) => {
    res.send('Hello World!')
})
logConsole("Successfully initted HTTP/GET for route '/'", "RESTAPI/ROUTE", "");