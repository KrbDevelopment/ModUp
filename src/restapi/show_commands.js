const common = require("../../common");

common.data['webserver'].app.get('/commands/list', (req, res) => {
    res.send(JSON.stringify(common.data['discord'].commands))
})
console.log("=> Successfully initted HTTP/GET for route '/commands/list'");