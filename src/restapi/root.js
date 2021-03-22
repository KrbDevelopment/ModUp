const common = require("../../common");

common.data['webserver'].app.get('/', (req, res) => {
    res.send('Hello World!')
})
console.log("=> Successfully initted HTTP/GET for route '/'");