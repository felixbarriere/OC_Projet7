// const mysql = require('mysql');
const mysql = require('mysql2');

require('dotenv').config();

const sql = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});

// const sql = mysql.createConnection({
//     host: "localhost",
//     user: "felix",
//     password: "openclassrooms",
//     database: "groupomania",
// });

sql.connect(function (err) {
    if (err) {
        return console.error('error: ' + err.message);
    }
    console.log('Connection à la base de donnée réussie !');
});

module.exports = sql;