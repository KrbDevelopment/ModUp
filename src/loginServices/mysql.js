const common = require("../../common");
const fs = require('fs')
const mysql = require('mysql')

console.log("=> Connecting to mysql...");
const con = mysql.createConnection({
    connectionLimit: 100,
    host: common.data['config'].MYSQL_HOST,
    user: common.data['config'].MYSQL_USER,
    password: common.data['config'].MYSQL_PASS,
    database: common.data['config'].MYSQL_DB
});

/**
 * Add Row into table
 * @param table
 * @param cols
 * @param data
 * @returns {Promise<unknown>}
 */
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

/**
 * Query All
 * @param table
 * @param condition
 * @returns {Promise<unknown>}
 */
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

/**
 * Query Selected
 * @param table
 * @param select
 * @param condition
 * @returns {Promise<unknown>}
 */
async function querySelected(table, select, condition) {
    return new Promise(function (resolve, reject) {
        let whereCondition = condition.join((' AND '));
        let selectCondition = select.join((', '));
        let selectQuery = `SELECT ${selectCondition} FROM ${table} WHERE ${whereCondition};`;

        con.query(selectQuery, (err, res) => {
            if (err) {
                reject(err);
            }

            resolve(res);
        });
    });
}

async function deleteRows(table, condition) {
    return new Promise(function (resolve, reject) {
        let whereCondition = condition.join((' AND '));
        let selectQuery = `DELETE FROM ${table} WHERE ${whereCondition}`;

        con.query(selectQuery, (err, res) => {
            if (err) {
                reject(err);
            }

            resolve(res.affectedRows);
        });
    });
}