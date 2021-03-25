const common = require("../../common");
const fs = require('fs')
const mysql = require('mysql')
const {logConsole} = require("../utils/logFunctions")

logConsole("Connecting to mysql...", "SERVICE/INFO", "");
const con = mysql.createConnection({
    connectionLimit: 100,
    host: common.data['config'].MYSQL_HOST,
    user: common.data['config'].MYSQL_USER,
    password: common.data['config'].MYSQL_PASS,
    database: common.data['config'].MYSQL_DB
});
logConsole("Successfully connected to mysql", "SERVICE/INFO", "");

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
        for (let i = 0; i < (cols.length - 1); i++) {
            emptyPlaceholders += "?, "
        }
        emptyPlaceholders += '?'
        let insertQuery = `INSERT INTO ${table} (${colSeparated}) VALUES (${emptyPlaceholders})`;
        let query = mysql.format(insertQuery, data);

        con.query(query, (err, res) =>  {
           if (err) {
               reject(err);
               return;
           }

            resolve(res.insertId);
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
                return;
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

/**
 * Delete rows by condition
 * @param table
 * @param condition
 * @returns {Promise<unknown>}
 */
async function deleteRows(table, condition) {
    return new Promise(function (resolve, reject) {
        let whereCondition = condition.join((' AND '));
        let selectQuery = `DELETE FROM ${table} WHERE ${whereCondition}`;

        con.query(selectQuery, (err, res) => {
            if (err) {
                reject(err);
                return;
            }

            resolve(res.affectedRows);
        });
    });
}

/**
 * Query a custom MySQL statement
 * @param statement
 * @returns {Promise<unknown>}
 */
async function queryStatement(statement) {
    return new Promise(function (resolve, reject) {
        con.query(statement, (err, res) => {
            if (err) {
                reject(err);
                return;
            }

            resolve(res);
        });
    });
}

/**
 * Update rows
 * @param table
 * @param condition
 * @param update
 * @returns {Promise<unknown>}
 */
async function updateRows(table, condition, update) {
    return new Promise(function (resolve, reject) {
        let updateCondition = update.join((', '));
        let whereCondition = condition.join((' AND '));
        let selectQuery = `UPDATE ${table} SET ${updateCondition} WHERE ${whereCondition}`;

        con.query(selectQuery, (err, res) => {
            if (err) {
                reject(err);
            }

            resolve(res.affectedRows);
        });
    });
}

/**
 * Custom query without return
 * @param statement
 * @returns {Promise<unknown>}
 */
async function queryVoid(statement) {
    return new Promise(function (resolve, reject) {
        con.query(statement, (err, res) => {
            if (err) {
                reject(err);
                return;
            }

            resolve(true);
        });
    });
}

async function queryAllNoCondi(table_name) {
    return new Promise(function (resolve, reject) {
        let selectQuery = `SELECT * FROM ${table_name};`;

        con.query(selectQuery, (err, res) => {
            if (err) {
                reject(err);
                return;
            }

            resolve(res);
        });
    });
}

///////
module.exports = {
    addRow,
    querySelected,
    queryAll,
    deleteRows,
    updateRows,
    queryStatement,
    queryVoid,
    queryAllNoCondi
}