const common = require("../../common");
const fs = require('fs')
const mysql = require('mysql')

console.log("=> Connecting to mysql...");
const con = mysql.createConnection({
    connectionLimit: 100,
    host: 'dev-up.codes',
    user: 'JanKrb',
    password: 'DkFwe3mmXCxdJV6P',
    database: 'devup_bot'
});

function addRow(table, cols, data) {
    return new Promise(function (resolve, reject) {
        const colSeparated = cols.join(', ');
        let emptyPlaceholders = "";
        for (let i = 0; i < cols.length; i++) {
            emptyPlaceholders += "?, "
        }
        let insertQuery = `INSERT INTO ${table} (${colSeparated}) VALUES (${emptyPlaceholders})`;
        let query = mysql.format(insertQuery, data);
        con.query(query, (err, res) =>  {
           if (err) {
               reject(err);
               return 0;
           }

            console.log("Empty Insert")
            return res.insertId;
        });
    });
}

async function queryAll(table, condition) {
    return new Promise(function (resolve, reject) {
        let whereCondition = condition.join((' AND '));
        let selectQuery = `SELECT * FROM ${table} WHERE ${whereCondition};`;

        con.query(selectQuery, (err, res) => {
            if (err) {
                reject(err);
            }

            resolve(res);
        });
    });
}

// Testing
const where = ["id = 1"]
queryAll("member", where).then((res) => {
    console.log(res)
})