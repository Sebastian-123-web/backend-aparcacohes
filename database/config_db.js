const mysql = require('mysql');

const db = mysql.createConnection({
    host     : process.env.HOST,
    user     : 'root',
    password : '411admi70@tsc',
    database : 'aparcamiento_db'
});

module.exports = db;